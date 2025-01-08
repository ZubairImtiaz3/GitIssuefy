"use server";
import { createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import { listDocuments, createDocument, updateDocument } from "@/lib/db/utils";
import { getUserRepos, getUserNotifications } from "@/lib/db/dashboard";
import axios from "axios";

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        return await account.get();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function SignOutUser() {
    try {
        const { account } = await createSessionClient();
        cookies().delete("gitissuefy-session");
        await account.deleteSession("current");
        return null;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function getUserIdentity(provider: "github" | "discord") {
    try {
        const { account } = await createSessionClient();
        const identities = await account.listIdentities([
            Query.equal('provider', provider)
        ]);

        return identities.identities[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getUserProfile = async () => {
    return listDocuments(
        process.env.GITISSUEFYDB_ID!,
        process.env.USER_COLLECTION_ID!,
    );
};

export const updateOrCreateUser = async () => {
    try {
        const loggedInUser = await getUserIdentity('github');

        if (loggedInUser) {
            const { userId, providerAccessToken, providerAccessTokenExpiry, providerEmail } = loggedInUser;

            const user = await getUserProfile();

            if (user.total > 0) {
                // User exists, update the existing
                const userDocument = user.documents[0];

                await updateDocument(
                    process.env.GITISSUEFYDB_ID!,
                    process.env.USER_COLLECTION_ID!,
                    userDocument.$id,
                    {
                        github_access_token: providerAccessToken,
                        github_token_expiry: providerAccessTokenExpiry
                    }
                );

            } else {
                // User does not exist, create a new
                const user = await getLoggedInUser();

                await createDocument(
                    process.env.GITISSUEFYDB_ID!,
                    process.env.USER_COLLECTION_ID!,
                    ID.custom(userId),
                    {
                        github_access_token: providerAccessToken,
                        email: providerEmail,
                        username: user?.name,
                        github_token_expiry: providerAccessTokenExpiry,
                    },
                );
            }
        }
    } catch (error) {
        console.error("Error creating or updating user:", error);
    }
};

export const updateUserDiscordId = async () => {
    try {
        const loggedInUser = await getUserIdentity('discord');

        if (loggedInUser) {
            const { providerUid, userId } = loggedInUser;

            await updateDocument(
                process.env.GITISSUEFYDB_ID!,
                process.env.USER_COLLECTION_ID!,
                userId,
                {
                    discord_id: providerUid,
                }
            );
        }
    } catch (error) {
        console.error("Error creating or updating user discord Id:", error);
    }
};

export const userDashboard = async () => {
    try {
        const [repos, notifications] = await Promise.all([
            getUserRepos(),
            getUserNotifications([Query.equal('status', 'sent')])
        ]);

        const totalRepos = repos?.documents?.filter(repo => repo.status === 'active')?.length || 0;
        const totalNotifications = notifications?.total

        return {
            repos,
            totalRepos,
            totalNotifications
        };
    } catch (error) {
        console.error("Error fetching dashboard analytics:", error);
    }
};

export const getUserGuildStatus = async () => {
    try {
        const profile = await getUserProfile();

        const discordId = profile?.documents[0]?.discord_id;
        if (!discordId) {
            return {
                discordId: null,
                guildStatus: false,
                message: "User hasn't connected their Discord yet."
            };
        }

        const response = await axios.post(
            process.env.GUILD_STATUS_URL!,
            { userDiscordId: discordId }
        );

        console.log({
            discordId,
            guildStatus: response.data.success,
        })

        return {
            discordId,
            guildStatus: response.data.success,
        };
    } catch (error) {
        console.error("Error getting user guild status:", error);
        return {
            discordId: null,
            guildStatus: false,
            message: "An error occurred while fetching guild status."
        };
    }
};
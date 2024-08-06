"use server";
import { createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { Permission, Query, Role } from "node-appwrite";
import { listDocuments, createDocument, updateDocument } from "@/lib/db/utils";
import { getUserRepos, getUserSentNotifications } from "@/lib/db/dashboard";

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
        cookies().delete("my-custom-session");
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

export const getUserProfile = async (query?: any[]) => {
    return listDocuments(
        process.env.NEXT_GITISSUEFYDB_ID!,
        process.env.NEXT_USER_COLLECTION_ID!,
        query
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
                    process.env.NEXT_GITISSUEFYDB_ID!,
                    process.env.NEXT_USER_COLLECTION_ID!,
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
                    process.env.NEXT_GITISSUEFYDB_ID!,
                    process.env.NEXT_USER_COLLECTION_ID!,
                    userId,
                    {
                        github_access_token: providerAccessToken,
                        email: providerEmail,
                        username: user?.name,
                        github_token_expiry: providerAccessTokenExpiry,
                    },
                    [
                        Permission.write(Role.user(userId)),
                        Permission.read(Role.user(userId)),
                        Permission.update(Role.user(userId)),
                        Permission.delete(Role.user(userId))
                    ]
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
                process.env.NEXT_GITISSUEFYDB_ID!,
                process.env.NEXT_USER_COLLECTION_ID!,
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

export const userDashboard = async (query?: any[]) => {
    try {
        const [repos, notifications] = await Promise.all([
            getUserRepos(query),
            getUserSentNotifications([Query.equal('status', 'sent')])
        ]);

        const totalRepos = repos?.total
        const totalNotifications = notifications?.total

        return {
            totalRepos,
            totalNotifications
        };
    } catch (error) {
        console.error("Error fetching dashboard analytics:", error);
    }
};
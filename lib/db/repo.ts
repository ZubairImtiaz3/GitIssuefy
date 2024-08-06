"use server";
import { getLoggedInUser } from "@/lib/db/user";
import { ID, Permission, Query, Role } from "node-appwrite";
import { listDocuments, createDocument } from "./utils";
import { revalidatePath } from "next/cache";

export const getWatchRepositories = async (query?: any[]) => {
    return listDocuments(
        process.env.NEXT_GITISSUEFYDB_ID!,
        process.env.NEXT_WATCHED_REPOSITORIES_ID!,
        query
    );
};

export const watchRepository = async (
    labels: { id: number, text: string }[],
    watched_repo: string,
) => {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            console.warn("No logged-in user found.");
            return;
        }

        const userId = user?.$id;
        const labelStrings = labels.map(label => label.text);

        // Check if the repository is already watched
        const query = [Query.equal("watched_repo", watched_repo)];
        const existingRepos = await listDocuments(
            process.env.NEXT_GITISSUEFYDB_ID!,
            process.env.NEXT_WATCHED_REPOSITORIES_ID!,
            query
        );

        if (existingRepos.total > 0) {
            return { error: "This repository is already in your watched list." };
        }

        await createDocument(
            process.env.NEXT_GITISSUEFYDB_ID!,
            process.env.NEXT_WATCHED_REPOSITORIES_ID!,
            ID.unique(),
            {
                user_id: userId,
                labels: labelStrings,
                watched_repo: watched_repo,
            },
            [
                Permission.write(Role.user(userId)),
                Permission.read(Role.user(userId)),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId))
            ]
        );

        revalidatePath('/dashboard')

        return { message: "Repository successfully added to your watch list." };

    } catch (error) {
        console.error("Error creating or updating user:", error);
    }
};

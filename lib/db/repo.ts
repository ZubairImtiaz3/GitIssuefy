"use server";
import { getLoggedInUser } from "@/lib/db/user";
import { ID, Query, } from "node-appwrite";
import { listDocuments, createDocument, updateDocument, deleteDocument } from "./utils";
import { revalidatePath } from "next/cache";

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
            process.env.GITISSUEFYDB_ID!,
            process.env.WATCHED_REPOSITORIES_ID!,
            query
        );

        if (existingRepos.total > 0) {
            return { error: "This repository is already in your watched list." };
        }

        await createDocument(
            process.env.GITISSUEFYDB_ID!,
            process.env.WATCHED_REPOSITORIES_ID!,
            ID.unique(),
            {
                user_id: userId,
                labels: labelStrings,
                watched_repo: watched_repo,
            },
        );

        revalidatePath('/dashboard')

        return { message: "Repository successfully added to your watch list." };

    } catch (error) {
        console.error("Error creating or updating user:", error);
    }
};

export const updateRepositoryLabels = async (
    repoId: string,
    labels: { id: number, text: string }[]
) => {
    try {
        const labelStrings = labels.map(label => label.text);

        await updateDocument(
            process.env.GITISSUEFYDB_ID!,
            process.env.WATCHED_REPOSITORIES_ID!,
            repoId,
            {
                labels: labelStrings,
            }
        );

        revalidatePath('/dashboard');

        return { message: "Repository successfully updated." };
    } catch (error) {
        console.error("Error updating repository:", error);
        return { error: "An error occurred while updating the repository." };
    }
};

export const updateRepositoryStatus = async (
    id: string,
    state: 'active' | 'deactivate'
) => {
    try {
        await updateDocument(
            process.env.GITISSUEFYDB_ID!,
            process.env.WATCHED_REPOSITORIES_ID!,
            id,
            {
                status: state,
            },
        );

        revalidatePath('/dashboard');

        return { message: `Repository status successfully updated to ${state}.` };

    } catch (error) {
        console.error("Error updating repository status:", error);
    }
};

export const deleteRepository = async (
    id: string,
) => {
    try {
        await deleteDocument(
            process.env.GITISSUEFYDB_ID!,
            process.env.WATCHED_REPOSITORIES_ID!,
            id
        );

        revalidatePath('/dashboard');

        return { message: `Repository successfully deleted.` };

    } catch (error) {
        console.error("Error deleting repository:", error);
    }
};
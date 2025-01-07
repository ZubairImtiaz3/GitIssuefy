import { listDocuments } from "@/lib/db/utils";

export const getUserRepos = async (query?: string[]) => {
    try {
        return await listDocuments(
            process.env.NEXT_GITISSUEFYDB_ID!,
            process.env.NEXT_WATCHED_REPOSITORIES_ID!,
            query
        );
    } catch (error) {
        console.error("Error fetching user repositories:", error);
    }
};

export const getUserSentNotifications = async (query?: string[]) => {
    try {
        return await listDocuments(
            process.env.NEXT_GITISSUEFYDB_ID!,
            process.env.NEXT_NOTIFICATION_COLLECTION_ID!,
            query
        );
    } catch (error) {
        console.error("Error fetching user sent notifications:", error);
    }
};

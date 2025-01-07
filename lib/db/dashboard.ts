import { listDocuments } from "@/lib/db/utils";

export const getUserRepos = async (query?: string[]) => {
    try {
        return await listDocuments(
            process.env.GITISSUEFYDB_ID!,
            process.env.WATCHED_REPOSITORIES_ID!,
            query
        );
    } catch (error) {
        console.error("Error fetching user repositories:", error);
    }
};

export const getUserNotifications = async (query?: string[]) => {
    try {
        return await listDocuments(
            process.env.GITISSUEFYDB_ID!,
            process.env.NOTIFICATION_COLLECTION_ID!,
            query
        );
    } catch (error) {
        console.error("Error fetching user sent notifications:", error);
    }
};

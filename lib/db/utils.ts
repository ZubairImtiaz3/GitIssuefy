import { createSessionClient } from "@/lib/server/appwrite";

export const listDocuments = async (databaseId: string, collectionId: string, query?: any[]) => {
    try {
        const { databases } = await createSessionClient();
        const result = await databases.listDocuments(databaseId, collectionId, query);
        return result;
    } catch (error) {
        console.error("Error listing documents:", error);
        throw error;
    }
};

export const createDocument = async (databaseId: string, collectionId: string, documentId: string, data: any, permissions: string[]) => {
    try {
        const { databases } = await createSessionClient();
        const result = await databases.createDocument(databaseId, collectionId, documentId, data, permissions);
        return result;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
};

export const updateDocument = async (databaseId: string, collectionId: string, documentId: string, data: any) => {
    try {
        const { databases } = await createSessionClient();
        const result = await databases.updateDocument(databaseId, collectionId, documentId, data);
        return result;
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
};

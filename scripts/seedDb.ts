import '@/lib/envConfig'
import { createAdminClient } from "@/lib/server/appwrite";
import { collections } from "@/lib/db/collections";
import { ID } from "node-appwrite";

async function setupDB() {
    let databaseId: string | undefined;

    try {
        const { databases } = await createAdminClient();
        try {
            const createdDatabase = await databases.create(ID.unique(), "GitIssuefyDb");
            databaseId = createdDatabase.$id;
            console.log(`✅ Database created successfully with id: ${databaseId}`);
        } catch (error: any) {
            console.error(error);
            return;
        }

        if (!databaseId) {
            console.error('Database ID is undefined');
            return;
        }

        for (const collection of collections) {
            try {
                const createdCollection = await databases.createCollection(
                    databaseId,
                    ID.unique(),
                    collection.name,
                    undefined,
                    true,  // Enable document security
                    true   // Enable collection
                );

                // Create attributes for the collection
                for (const attribute of collection.attributes) {
                    if (attribute.type === 'string') {
                        await databases.createStringAttribute(
                            databaseId,
                            createdCollection.$id,
                            attribute.name,
                            attribute.size as number,
                            attribute.required,
                            undefined, // Default value (optional)
                            attribute.array || false,
                        );
                    } else if (attribute.type === 'email') {
                        await databases.createEmailAttribute(
                            databaseId,
                            createdCollection.$id,
                            attribute.name,
                            attribute.required,
                        );
                    } else if (attribute.type === 'datetime') {
                        await databases.createDatetimeAttribute(
                            databaseId,
                            createdCollection.$id,
                            attribute.name,
                            attribute.required,
                        );
                    }
                }

                console.log(`✅ ${collection.name} collection created successfully with id:${createdCollection.$id}`);
            } catch (error: any) {
                if (error.code !== 409) {
                    throw error;
                }
                console.log(`ℹ️ ${collection.name} collection already exists`);
            }
        }

        console.log('✅ Setup Database completed successfully');
    } catch (error) {
        console.error('Error setting up Database:', error);
        process.exit(1);
    }
}

setupDB().catch(console.error);
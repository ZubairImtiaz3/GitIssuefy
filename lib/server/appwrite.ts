"use server";
import { Client, Account, Query } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = cookies().get("my-custom-session");
    if (!session || !session.value) {
        throw new Error("No session");
    }

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        .setKey(process.env.NEXT_APPWRITE_KEY!);

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        return await account.get();
    } catch (error) {
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

export async function getGithubIdentity() {
    try {
        const { account } = await createSessionClient();
        const identities = await account.listIdentities([
            Query.equal('provider', 'github')
        ]);

        return identities.identities[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}
"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

type Provider = "github" | "discord";

const providerMap: Record<Provider, OAuthProvider> = {
    github: OAuthProvider.Github,
    discord: OAuthProvider.Discord,
};

export async function signUpWithProvider(provider: Provider) {
    const { account } = await createAdminClient();

    const origin = headers().get("origin");

    const oauthProvider = providerMap[provider];
    if (!oauthProvider) {
        throw new Error("Unsupported provider");
    }

    const redirectUrl = await account.createOAuth2Token(
        oauthProvider,
        `${origin}/oauth?provider=${provider}`,
        `${origin}/signup` // Todo: Handle Failure Exception
    );

    return redirect(redirectUrl);
}
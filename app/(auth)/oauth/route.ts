import { updateOrCreateUser, updateUserDiscordId } from "@/lib/db/user";
import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get("userId");
    const secret = request.nextUrl.searchParams.get("secret");
    const provider = request.nextUrl.searchParams.get("provider");

    if (!userId || !secret || !provider) {
        return NextResponse.redirect(`${request.nextUrl.origin}/error?message=Missing userId, secret, or provider`);
    }

    const { account } = await createAdminClient();
    const session = await account.createSession(userId, secret);

    cookies().set("gitissuefy-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
    });

    if (provider === "github") {
        await updateOrCreateUser();
    } else if (provider === "discord") {
        await updateUserDiscordId();
    } else {
        return NextResponse.redirect(`${request.nextUrl.origin}/error?message=Unknown provider`);
    }

    return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`);
}
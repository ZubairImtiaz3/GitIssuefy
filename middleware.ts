import { NextResponse, type NextRequest } from 'next/server'
import { getLoggedInUser } from '@/lib/server/appwrite';

export async function middleware(request: NextRequest) {
    const user = await getLoggedInUser();

    // Restrict dashboard from unauthorized
    if (request.nextUrl.pathname.startsWith('/dashboard') && user === null) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
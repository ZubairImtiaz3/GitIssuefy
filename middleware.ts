import { NextResponse, type NextRequest } from 'next/server'
import { getLoggedInUser } from '@/lib/db/user';

export async function middleware(request: NextRequest) {
    const user = await getLoggedInUser();

    // Restrict dashboard from unauthorized
    if (user === null) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
}
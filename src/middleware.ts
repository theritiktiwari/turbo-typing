import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;
    const url = req.nextUrl.clone();

    const protectedRoutes = ['/account', '/admin'];
    const authRestrictedRoutes = ['/auth'];

    if (isAuthenticated && authRestrictedRoutes.some(route => url.pathname.startsWith(route))) {
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    if (!isAuthenticated && protectedRoutes.some(route => url.pathname.startsWith(route))) {
        url.pathname = '/auth';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

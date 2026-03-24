import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export const runtime = 'nodejs'; 

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const pathname = req.nextUrl.pathname;

    const isPublicRoute = 
        pathname === '/' || 
        pathname.startsWith('/community') ||
        pathname.startsWith('/api') ||
        pathname === '/sign-in' ||
        pathname === '/sign-up';

    if (!isPublicRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    return NextResponse.next();
}) 

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
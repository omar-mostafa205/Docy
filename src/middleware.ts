import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export const runtime = 'nodejs'; 

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isProtectedRoutes = [req.nextUrl.pathname.startsWith('/dashboard') ,  req.nextUrl.pathname.startsWith('/docs') , req.nextUrl.pathname.startsWith('/upload-repo')]
    const isProtectedRoute = isProtectedRoutes.some(Boolean) 

    // if (isProtectedRoute && !isLoggedIn) {
    //     return NextResponse.redirect(new URL('/sign-in', req.url))
    // }

    return NextResponse.next();
}) 

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
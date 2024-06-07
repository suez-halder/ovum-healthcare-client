import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = [
    "/dashboard",
    "/dashboard/change-password",
    "/doctors",
];
const roleBasedPrivateRoutes = {
    PATIENT: [/^\/dashboard\/patient/],
    DOCTOR: [/^\/dashboard\/doctor/],
    ADMIN: [/^\/dashboard\/admin/],
    SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (accessToken && commonPrivateRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    let decodedData = null;
    if (accessToken) {
        decodedData = jwtDecode(accessToken) as any;
    }

    const role = decodedData?.role;

    // if (role === "ADMIN" && pathname.startsWith("/dashboard/admin")) {
    //     return NextResponse.next();
    // }

    if (
        role &&
        roleBasedPrivateRoutes[role as keyof typeof roleBasedPrivateRoutes]
    ) {
        const routes =
            roleBasedPrivateRoutes[role as keyof typeof roleBasedPrivateRoutes];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: "/dashboard/:page*",
};

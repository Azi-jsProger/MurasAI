import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://muras-server.onrender.com";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { authenticated?: boolean };
    return Boolean(data.authenticated);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/login" || pathname.startsWith("/login/");

  const authenticated = await isAuthenticated(request);

  if (!authenticated && !isLoginPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (authenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/schedule",
    "/schedule/:path*",
    "/chat",
    "/chat/:path*",
    "/personal",
    "/personal/:path*",
    "/analytics",
    "/analytics/:path*",
    "/tests",
    "/tests/:path*",
    "/webtest",
    "/webtest/:path*",
    "/plan",
    "/plan/:path*",
    "/admin",
    "/admin/:path*",
    "/director",
    "/director/:path*",
    "/teacher",
    "/teacher/:path*",
    "/login",
    "/login/:path*",
  ],
};

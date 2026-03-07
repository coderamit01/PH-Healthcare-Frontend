/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from "./lib/authUtils";
import { getNewTokensWithRefreshToken, getUserInfo } from "./services/auth.service";
import { isTokenExpiringSoon } from "./lib/tokenUtils";

// Helper: Unify admin roles
const normalizeUserRole = (role: UserRole | null): UserRole | null => {
  return role === "SUPER_ADMIN" ? "ADMIN" : role;
};

// Helper: Authenticate and get user role
const authenticate = (accessToken: string | undefined) => {
  if (!accessToken) return { isValid: false, role: null };

  const verified = jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string);
  if (!verified.success || !verified.data) return { isValid: false, role: null };

  return { isValid: true, role: normalizeUserRole(verified.data.role as UserRole) };
};

// Helper: Redirect URL builder
const createRedirectUrl = (pathname: string, baseUrl: string, email?: string) => {
  const url = new URL(pathname, baseUrl);
  if (email) url.searchParams.set("email", email);
  return url;
};

// Helper: Handle required user statuses (email verification, password change)
async function handleUserStatuses(
  userInfo: any,
  userRole: UserRole | null,
  pathname: string,
  baseUrl: string
) {
  // Enforce email verification
  if (!userInfo.emailVerified) {
    if (pathname !== "/verify-email") {
      return NextResponse.redirect(createRedirectUrl("/verify-email", baseUrl, userInfo.email));
    }
    return NextResponse.next();
  }

  // Allow leaving verify-email once verified
  if (userInfo.emailVerified && pathname === "/verify-email") {
    return NextResponse.redirect(createRedirectUrl(getDefaultDashboardRoute(userRole as UserRole), baseUrl));
  }

  // Enforce password change
  if (userInfo.needPasswordChange) {
    if (pathname !== "/reset-password") {
      return NextResponse.redirect(createRedirectUrl("/reset-password", baseUrl, userInfo.email));
    }
    return NextResponse.next();
  }

  // Allow leaving reset-password once password changed
  if (!userInfo.needPasswordChange && pathname === "/reset-password") {
    return NextResponse.redirect(createRedirectUrl(getDefaultDashboardRoute(userRole as UserRole), baseUrl));
  }

  return null;
}

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const { isValid: isValidAccessToken, role: userRole } = authenticate(accessToken);
    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // 1. Refresh token if expiring soon
    if (isValidAccessToken && refreshToken && (await isTokenExpiringSoon(accessToken as string))) {
      await getNewTokensWithRefreshToken(refreshToken);
    }

    // 2. Redirect authenticated users away from auth routes
    if (isAuth && isValidAccessToken) {
      return NextResponse.redirect(createRedirectUrl(getDefaultDashboardRoute(userRole as UserRole), request.url));
    }

    // 3. Handle reset password page special cases
    if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");

      if (accessToken && email) {
        const userInfo = await getUserInfo();
        if (!userInfo?.needPasswordChange) {
          return NextResponse.redirect(createRedirectUrl(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }
      } else if (!email) {
        const loginUrl = createRedirectUrl("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    // 4. Handle user status checks (email verification, password change)
    if (accessToken) {
      const userInfo = await getUserInfo();
      if (userInfo) {
        const statusResponse = await handleUserStatuses(userInfo, userRole, pathname, request.url);
        if (statusResponse) return statusResponse;
      }
    }

    // 5. Allow access to common unprotected routes
    if (routeOwner === null) {
      return NextResponse.next();
    }

    // 6. Protect role-based routes
    if (["ADMIN", "PATIENT", "DOCTOR"].includes(routeOwner || "")) {
      if (routeOwner !== userRole) {
        return NextResponse.redirect(createRedirectUrl(getDefaultDashboardRoute(userRole as UserRole), request.url));
      }
    }

    return NextResponse.next();
  } catch (error: any) {
    console.error("Error in proxy function:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from "./lib/authUtils";
import { getNewTokensWithRefreshToken } from "./services/auth.service";
import { isTokenExpiringSoon } from "./lib/tokenUtils";
import { headers } from "next/headers";

async function refreshTokenMiddleware (refreshToken : string) : Promise<boolean> {
    try {
        const refresh = await getNewTokensWithRefreshToken(refreshToken);
        if(!refresh){
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error refreshing token in middleware:", error);
        return false;   
    }
}

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const decodedAccessToken = accessToken && jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).data;
    const isValidAccessToken = accessToken && jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).success;

    let userRole: UserRole | null = null;

    if (decodedAccessToken) {
      userRole = decodedAccessToken.role as UserRole;
    }

    const routeOwner = getRouteOwner(pathname);

    const unifyAdminSuperAdminRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;
    userRole = unifyAdminSuperAdminRole;

    const isAuth = isAuthRoute(pathname);

//     if(isValidAccessToken && refreshToken && (await isTokenExpiringSoon(accessToken))) {
//       const requestHeaders = new Headers(request.headers);
//       const response = NextResponse.next({
//         request: {
//           headers: requestHeaders,
//         }
//       })
//       try {
//         const refreshed = await refreshTokenMiddleware(refreshToken);
// 
//         if(refreshed){
//             requestHeaders.set("x-token-refreshed", "1");
//         }
// 
//         return NextResponse.next(
//             {
//                 request: {
//                     headers : requestHeaders
//                 },
//                 headers : response.headers
//             }
//         )
//     } catch (error) {
//         console.error("Error refreshing token:", error);
// 
//     }
// 
//     return response;
//     }

    if(isAuth && isValidAccessToken){
      return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole),request.url));
    }

    if(routeOwner === null){
      return NextResponse.next();
    }
    

  } catch (error: any) {
    console.error("Error in proxy function:", error);
  }
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};

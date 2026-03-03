
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'DOCTOR' | 'PATIENT';

export const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'];

export const isAuthRoute = (path: string) => {
  return authRoutes.some((route: string) => path.includes(route))
}

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
}

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/change-password", "/my-profile"],
  pattern: []
}

export const doctorProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/doctor\/dashboard/]
}

export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/admin\/dashboard/]
}

export const patientProtectedRoutes: RouteConfig = {
  exact: ['/payment/success'],
  pattern: [/^\/dashboard/]
}

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
}

export const getRouteOwner = (pathname: string): 'SUPER_ADMIN' | 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'COMMON' | null => {
  if (isRouteMatches(pathname, doctorProtectedRoutes)) {
    return 'DOCTOR';
  }
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return 'ADMIN';
  }
  if (isRouteMatches(pathname, patientProtectedRoutes)) {
    return 'PATIENT';
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return 'COMMON';
  }
  return null;
}
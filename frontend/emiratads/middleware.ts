import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userCookie = request.cookies.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  const isClientRoute = request.nextUrl.pathname.startsWith("/client");
  const isEmployeeRoute = request.nextUrl.pathname.startsWith("/employee");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/authentication");
  const isRootRoute = request.nextUrl.pathname === "/";

  if (!token || !user) {
    if(!isAuthRoute) {
     return redirectToLogin(request);
    }
  } else {
    return handleAuthenticatedUser(user, isClientRoute, isEmployeeRoute, isRootRoute, request);
  }
}

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL("/authentication/login", request.url));
}

function handleAuthenticatedUser(
  user: any,
  isClientRoute: boolean,
  isEmployeeRoute: boolean,
  isRootRoute: boolean,
  request: NextRequest
) {
  const userType = user?.tipo;

  if (userType === "CLIENTE" && isEmployeeRoute) {
    return NextResponse.redirect(new URL("/client/home", request.url));
  }

  if (userType === "FUNCIONARIO" && isClientRoute) {
    return NextResponse.redirect(new URL("/employee/home", request.url));
  }

  if (isRootRoute) {
    return redirectToHome(userType, request);
  }

  return NextResponse.next();
}

function redirectToHome(userType: string, request: NextRequest) {
  if (userType === "CLIENTE") {
    return NextResponse.redirect(new URL("/client/home", request.url));
  } else if (userType === "FUNCIONARIO") {
    return NextResponse.redirect(new URL("/employee/home", request.url));
  }
}

export const config = {
  matcher: ["/", "/mileage/:path", "/customer/:path*","/client/:path*", "/employee/:path*", "/authentication/:path*"],
};
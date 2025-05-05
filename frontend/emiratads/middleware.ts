import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userCookie = request.cookies.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  const isClientRoute = request.nextUrl.pathname.startsWith("/client");
  const isEmployeeRoute = request.nextUrl.pathname.startsWith("/employee");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/authentication");

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  if (user) {
    const userType = user.tipo;

    if (userType === "CLIENTE" && isEmployeeRoute) {
      return NextResponse.redirect(new URL("/client/home", request.url));
    }

    if (userType === "FUNCIONARIO" && isClientRoute) {
      console.log("Redirecting employee to home page");
      return NextResponse.redirect(new URL("/employee/home", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/client/:path*", "/employee/:path*", "/authentication/:path*"],
};
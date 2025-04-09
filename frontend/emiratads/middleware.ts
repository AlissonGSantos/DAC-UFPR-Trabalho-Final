import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {


  const isAuthorizedRoute = !request.nextUrl.pathname.startsWith("/authentication");
  const token = request.cookies.get("token")?.value

  if(!token && isAuthorizedRoute) {
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  if(!isAuthorizedRoute){
    const isLoginPage = request.nextUrl.pathname.startsWith("/authentication/login");
    const isRegisterPage = request.nextUrl.pathname.startsWith("/authentication/register");

    if(token && (isLoginPage || isRegisterPage)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
  }
  export const config = {
    matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
  };
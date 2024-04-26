// src/middleware.ts

/*
implements middleware to manage authentication redirects based on cookie-stored access tokens. Here's the structured explanation:

Middleware Setup: We import NextResponse and NextRequest from next/server, along with cookies from next/headers, enabling us to manipulate responses, requests, and cookies in our Next.js middleware.
Access Token Retrieval: A cookieStore is created using the cookies() method, from which we try to retrieve an "accessToken". This token is key to determining the user's authentication status. Notice that here, we are not using the methods we have written to retrieve tokens from the cookies using js-cookie. This is because we js-cookie is a function that runs on the client side, and the middleware feature of Next.js runs on the server side. Thankfully, cookies are sent to the server, thus allowing us to do some checks and ensure the user is authenticated.
Unauthenticated User Redirect: In the absence of an access token, and if the request's pathname is not the login page (/), we redirect the user to the login page. This mechanism prevents unauthenticated access to protected routes, directing users without an access token to the login or home page.
Middleware Configuration: The config section with a matcher pattern specifies the routes this middleware applies to, explicitly excluding paths like API, static files, and images. This configuration ensures the middleware is only active on relevant paths, optimizing the application's performance and user flow. We ensure that in this matcher pattern, we ignoring the auth pages such as the registration page and reset password pages.

*/

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|.*\\.png$).*)"],
};
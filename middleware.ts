import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/home",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const url = new URL(request.url);
  const path = url.pathname;

  if (isPublicRoute(request)) {
    if (path === "/") {
      return NextResponse.rewrite(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  const response = await fetch(url.origin + path, { method: "HEAD" }); // validating route
  if (response.status !== 404) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

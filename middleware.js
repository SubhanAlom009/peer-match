import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Skip middleware for auth pages and API routes
    if (
      pathname.startsWith("/auth/") ||
      pathname.startsWith("/api/") ||
      pathname === "/" ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon")
    ) {
      return;
    }

    // If user is authenticated but not onboarded, redirect to onboarding
    if (token && !token.isOnboarded && pathname !== "/onboarding") {
      const url = req.nextUrl.clone();
      url.pathname = "/onboarding";
      return Response.redirect(url);
    }

    // REMOVED THE BLOCKING: Allow onboarded users to access onboarding for profile editing
    // This line was preventing profile updates:
    // if (token && token.isOnboarded && pathname === "/onboarding") {
    //   const url = req.nextUrl.clone();
    //   url.pathname = "/dashboard";
    //   return Response.redirect(url);
    // }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to public pages
        if (pathname === "/" || pathname.startsWith("/auth/")) {
          return true;
        }

        // Require authentication for protected pages
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

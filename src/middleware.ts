import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/**
 * 1. createRouteMatcher(['/protected'])
 *      - createRouteMatcher is a function from clerk(in
 *      their Next.js middleware utils)
 *      - You pass it a list of route patterns
 *      - What it returns is another function
 *
 *      so, isProtectedRoute is now a function, not a
 *      boolean
 *
 * 2. clerkMiddleware(...)
 *      clerkMiddleware is a wrapper around your
 *      middleware logic
 *
 *      - It takes a function (auth,req) => {...}
 *      - auth is a clerk helper object
 *      - req is the actual request object
 *      So, inside your callback you can check req and
 *      apply auth rules
 *
 * 3. if(isProtectedRoute(req))
 *      This works because:
 *      - isProtectedRoute is a function returned from
 *      createRouteMatcher
 *      - It expects a request object
 *      - When you call isProtectedRoute(req), it
 *      internally checks if req's path matches
 *
 * 4. What happens overall
 *      - Every request hits the middleware
 *      - If the request path matches /protected, then
 *      isProtectedRoute(req) returns true
 *      - That triggers auth.protect(), which forces
 *      authentication
 *      - otherwise it lets the request pass through
 *      without enforcing auth
 *
 */

/**
 * /protected vs /protected(.*)
 * ".*" is regex which means it matches anything/nothing
 * after protected
 *
 * . -> any character
 * * -> 0 or more times
 *
 */
const isProtectedRoute = createRouteMatcher(['/protected(.*)']);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};

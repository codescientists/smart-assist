import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isChatbotRoute = createRouteMatcher(['/chatbots(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware((auth, req) => {
  // Restrict admin route to users with specific role
  if (isAdminRoute(req)) auth().protect({ role: 'org:admin' });

  // Restrict dashboard routes to signed in users
  if (isChatbotRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
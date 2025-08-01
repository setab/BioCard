import { Suspense } from "react";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  // redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Skeleton } from "@/components/ui/skeleton";
import type { IsAuthContext } from "@/components/AuthProvider";
// import { fetchSessionUser } from "@/hooks/authApi";
import { useAuth } from "@/hooks/useAuth";

interface RootRouterContext {
  auth: IsAuthContext;
}

export const Route = createRootRouteWithContext<RootRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Suspense
        fallback={
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        }
      >
        <TanStackRouterDevtools position="bottom-left" initialIsOpen={false} />
      </Suspense>
    </>
  ),

  notFoundComponent: () => {
    const auth = useAuth();
    // const user = await fetchSessionUser();

    let dashboardRoute = "/login"; // fallback if not logged in
    if (auth.user) {
      if (auth.user.role === "admin") dashboardRoute = "/admin/dashboard";
      else if (auth.user.role === "doctor")
        dashboardRoute = "/doctor/dashboard";
      else if (auth.user.role === "patient")
        dashboardRoute = "/patient/dashboard";
    }
    return (
      <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl transition-transform hover:scale-110">
              404
            </h1>
            <p className="text-gray-500">
              Looks like you've ventured into the unknown digital realm.
            </p>
          </div>
          <Link
            to={dashboardRoute}
            className="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            Return to website
          </Link>
        </div>
      </div>
    );
  },
});

// function RootComponent() {
//   return (
//     <React.Fragment>
//       <div>Hello "__root"!</div>
//       <Link to="/" className="[&.active]:font-bold">
//         Home
//       </Link>{" "}
//       <Outlet />
//     </React.Fragment>
//   );
// }

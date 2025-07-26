import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { fetchSessionUser } from "@/hooks/authApi";
import AppDrawer from "@/components/AppDrawer";

export const Route = createFileRoute("/doctor")({
  beforeLoad: async ({ location }) => {
    const user = await fetchSessionUser();
    console.log(JSON.stringify(location));
    if (!user || user.role !== "doctor") {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* <div>Hello "/doctor"!</div> */}
      <AppDrawer navLinks={[]} />
      <Outlet />
    </>
  );
}

import { fetchSessionUser } from "@/hooks/authApi";
import { useAuth } from "@/hooks/useAuth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/doctor/dashboard")({
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
  const auth = useAuth();

  return (
    <div className="dashboard-container">
      <h1>Doctor Dashboard</h1>
      <div className="dashboard-welcome">
        Welcome, {auth.user?.name || "Doctor"}!
      </div>
      {/* Add more dashboard widgets/components here as needed */}
    </div>
  );
}

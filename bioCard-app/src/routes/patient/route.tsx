import { createFileRoute, Outlet } from "@tanstack/react-router";
// import { fetchSessionUser } from "@/hooks/authApi";
import AppDrawer from "@/components/AppDrawer";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/patient")({
  // beforeLoad: async ({ location }) => {
  //   const user = await fetchSessionUser();
  //   console.log(`patient route: ${JSON.stringify(location)}`);
  //   if (!user || user.role !== "patient") {
  //     throw redirect({
  //       to: "/login",
  //       search: {
  //         redirect: location.href,
  //       },
  //     });
  //   }
  // },
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  return (
    <>
      <AppDrawer
        navLinks={[
          { label: "Dashboard", to: "/patient/dashboard" },
          { label: "Appointments", to: "/patient/appoinments" },
          { label: "Health Records", to: "/patient/healthRecords" },
          { label: "Prescriptions", to: "/patient/prescriptions" },
          {
            label: "Patient Details",
            to: "/patient/$id",
            params: { id: auth.user?.uuid || "" },
          },
        ]}
      />
      <Outlet />
    </>
  );
}

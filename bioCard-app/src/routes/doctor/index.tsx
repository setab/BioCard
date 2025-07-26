import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/doctor/")({
  beforeLoad: () => {
    throw redirect({
      to: "/doctor/dashboard",
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/doctor/"!</div>;
}

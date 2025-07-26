import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/doctor/paitents")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/doctor/paitents"!</div>;
}

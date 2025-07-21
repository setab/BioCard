import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/patient/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/patient/dashboard"!</div>
}

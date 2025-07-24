import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/patient/healthRecords')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/patient/healthRecords"!</div>
}

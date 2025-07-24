import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/patient/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: Route.fullPath });

  const { data, isLoading, error } = useQuery({
    queryKey: ["patient", id],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/${id}`
      );
      if (!res.ok) throw new Error("Patient not Found");
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Patient not found</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Patient Details</h2>
      <div className="bg-gray-100 p-4 rounded shadow">
        <div>
          <span className="font-medium">ID:</span> {data.id}
        </div>
        <div>
          <span className="font-medium">Name:</span> {data.name}
        </div>
        <div>
          <span className="font-medium">Email:</span> {data.email}
        </div>
        <div>
          <span className="font-medium">Role:</span> {data.role}
        </div>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
}

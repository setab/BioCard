import { fetchSessionUser } from "@/hooks/authApi";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/patient/$id")({
  beforeLoad: async ({ location, params }) => {
    const user = await fetchSessionUser();
    if (!user || user.role !== "patient" || user.uuid !== params.id) {
      throw redirect({
        to: `/patient/dashboard`,
        search: {
          redirect: location.href,
          unauthorized: params.id,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: Route.fullPath });
  // const search = useSearch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["patient", id],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/${id}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Patient not Found");
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Patient not found</div>;

  return (
    <>
      <div className="max-w-xl mx-auto mt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Patient Details</h2>
          <p className="text-muted-foreground text-sm">
            Comprehensive patient information
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">
              Patient ID
            </span>
            <span className="font-mono">{data.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">Name</span>
            <span>{data.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">Email</span>
            <span>{data.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">Role</span>
            <span className="capitalize">{data.role}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">NFC UID</span>
            <span className="font-mono">{data.nfc_uid}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">
              Blood Type
            </span>
            <span>{data.blood_type}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">Allergies</span>
            <span>
              {data.allergies || (
                <span className="italic text-muted-foreground">None</span>
              )}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">
              Last Visit
            </span>
            <span>
              {data.last_visit ? (
                new Date(data.last_visit).toLocaleString()
              ) : (
                <span className="italic text-muted-foreground">N/A</span>
              )}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">
              Created At
            </span>
            <span>
              {data.created_at ? (
                new Date(data.created_at).toLocaleString()
              ) : (
                <span className="italic text-muted-foreground">N/A</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

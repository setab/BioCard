import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LogOut, User, Calendar, HeartPulse, FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "@/components/DashBoardCard";

export const Route = createFileRoute("/patient/dashboard")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated || context.auth.user?.role !== "patient")
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", auth.user?.uid],
    queryFn: async () => {
      const token = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY)
        ? JSON.parse(
            localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY)!
          ).token
        : null;

      return await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/${auth.user?.uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch Users");
        return res.json();
      });
    },
    enabled: !!auth.user?.uid,
  });

  return (
    <div className="min-h-screen mt-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-black">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <User className="text-black" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-black">
                Patient Dashboard
              </h1>
              <p className="text-gray-700 text-sm">
                Welcome, {data?.name || auth.user?.name || "       Patient"}
              </p>
            </div>
          </div>
          <Link to="/login">
            <Button
              // variant="outline"
              onClick={auth?.logout}
              // className="flex items-center gap-2 border-black text-black hover:bg-gray-100"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            icon={<Calendar className="text-black" size={28} />}
            title="Appointments"
            description="View upcoming and past appointments."
            to="/patient/appointments"
          />
          <DashboardCard
            icon={<HeartPulse className="text-black" size={28} />}
            title="Health Records"
            description="Access your health history and vitals."
            to="/patient/records"
          />
          <DashboardCard
            icon={<FileText className="text-black" size={28} />}
            title="Prescriptions"
            description="See your current and past prescriptions."
            to="/patient/prescriptions"
          />
        </div>

        <div>
          {isLoading && (
            <div className="text-gray-500 text-center py-4">
              Loading user data...
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center py-4">
              Error: {error.message}
            </div>
          )}
          {data && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-inner border border-black">
              <div className="font-semibold text-black mb-4 text-lg">
                Your Profile
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black text-sm">
                <div>
                  <span className="font-medium">Name:</span> {data.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {data.email}
                </div>
                <div>
                  <span className="font-medium">Role:</span> {data.role}
                </div>
                <div>
                  <span className="font-medium">Created At:</span>{" "}
                  {new Date(data.created_at).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Blood Type:</span>{" "}
                  {data.blood_type || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Allergies:</span>{" "}
                  {data.allergies || "N/A"}
                </div>
                <div>
                  <span className="font-medium">NFC UID:</span>{" "}
                  {data.nfc_uid || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Last Visit:</span>{" "}
                  {data.last_visit
                    ? new Date(data.last_visit).toLocaleString()
                    : "N/A"}
                </div>
                <div>
                  <span className="font-medium">Department:</span>{" "}
                  {data.department || "N/A"}
                </div>
                <div>
                  <span className="font-medium">License Number:</span>{" "}
                  {data.license_number || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Token Version:</span>{" "}
                  {data.token_version}
                </div>
                {/* Add more fields as needed */}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* {JSON.stringify(data)} */}
    </div>
  );
}

import {
  createFileRoute,
  redirect,
  Link,
  useSearch,
  useNavigate,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LogOut, User, Calendar, HeartPulse, FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "@/components/DashBoardCard";
import { fetchSessionUser } from "@/hooks/authApi";
import { useState } from "react";

type searchProp = {
  redirect?: string;
  unauthorized?: string;
};

export const Route = createFileRoute("/patient/dashboard")({
  beforeLoad: async ({ location }) => {
    const user = await fetchSessionUser();
    if (!user || user.role !== "patient") {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
    return { user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  const navigate = useNavigate({ from: Route.fullPath });
  const search = useSearch({ from: Route.fullPath }) as searchProp;
  const [showUnauthorized, setShowUnauthorized] = useState(
    !!search.unauthorized
  );
  // console.log("search: " + JSON.stringify(search));

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", auth.user?.uuid],
    queryFn: async () => {
      return await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/${auth.user?.uuid}`,
        {
          credentials: "include",
        }
      ).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch Users");
        return res.json();
      });
    },
    enabled: !!auth.user?.uuid,
  });
  const handleCloseUnauthorized = () => {
    setShowUnauthorized(false);
    navigate({
      search: (prev: searchProp) => {
        const { unauthorized, redirect, ...rest } = prev;
        return rest;
      },
      replace: true,
    });
  };

  return (
    <>
      {/* <div>what is this:{auth.isLoading ? "true" : "false"}</div> */}

      <div>
        {showUnauthorized && search.unauthorized && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 flex items-center justify-between">
            <span>
              Unauthorized access to patient ID: {search.unauthorized}
            </span>
            <button
              className="ml-4 px-2 py-1 bg-red-200 rounded hover:bg-red-300"
              onClick={handleCloseUnauthorized}
            >
              x
            </button>
          </div>
        )}
      </div>
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
              to="/patient/appoinments"
            />
            <DashboardCard
              icon={<HeartPulse className="text-black" size={28} />}
              title="Health Records"
              description="Access your health history and vitals."
              to="/patient/healthRecords"
            />
            <DashboardCard
              icon={<FileText className="text-black" size={28} />}
              title="Prescriptions"
              description="See your current and past prescriptions."
              to="/patient/prescriptions"
            />
            <DashboardCard
              icon={<FileText className="text-black" size={28} />}
              title="Patient-Details"
              description="Full Details of Paitient"
              to={`/patient/${auth.user?.uuid}`}
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

                  {/* Add more fields as needed */}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* {JSON.stringify(data)} */}
      </div>
    </>
  );
}

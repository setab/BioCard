import {
  createFileRoute,
  useSearch,
  useNavigate,
} from "@tanstack/react-router";
import { User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
// import { useQuery } from "@tanstack/react-query";
// import DashboardCard from "@/components/DashBoardCard";
import { useState } from "react";

export type searchProp = {
  redirect?: string;
  unauthorized?: string;
};

export const Route = createFileRoute("/patient/dashboard")({
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

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["user", auth.user?.uuid],
  //   queryFn: async () => {
  //     return await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/user/${auth.user?.uuid}`,
  //       {
  //         credentials: "include",
  //       }
  //     ).then((res) => {
  //       if (!res.ok) throw new Error("Failed to fetch Users");
  //       return res.json();
  //     });
  //   },
  //   enabled: !!auth.user?.uuid,
  // });
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
                  Welcome, {auth.user?.name || "Patient"}
                </p>
              </div>
            </div>
          </div>

          <div>
            {auth.user && (
              <div className="bg-gray-100 p-6 rounded-lg shadow-inner border border-black">
                <div className="font-semibold text-black mb-4 text-lg">
                  Your Profile
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black text-sm">
                  <div>
                    <span className="font-medium">Name:</span> {auth.user.name}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    {auth.user.email}
                  </div>
                  <div>
                    <span className="font-medium">Role:</span> {auth.user.role}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

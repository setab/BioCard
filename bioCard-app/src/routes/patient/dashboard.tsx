import {
  createFileRoute,
  useSearch,
  useNavigate,
} from "@tanstack/react-router";
// import { User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import type { userType } from "@/types/user";
import { Button } from "../../components/ui/button";
import { LogOut } from "lucide-react";

import { PersonalInfoCard } from "@/components/PersonalInfoCard";
import AppointmentsCard from "@/components/AppointmentsCard";
import MedicalRecordsCard from "@/components/MedicalRecordsCard";

export type searchProp = {
  redirect?: string;
  unauthorized?: string;
};

type TopBarProps = {
  user: userType;
  onLogout: () => void;
};

function TopBar({ user, onLogout }: TopBarProps) {
  return (
    <div className="bg-gray-700 text-primary-foreground flex justify-between items-center px-8 py-4 shadow">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl">MediCard</span>
        <span className="ml-6 text-base">My Records</span>
      </div>
      <div className="flex items-center gap-4">
        <span>
          Welcome, {user?.name} ({user?.role})
        </span>
        <Button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-full bg-white text-black border border-gray-300 shadow-sm transition-colors duration-200
            hover:bg-primary hover:text-white hover:border-primary"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </div>
  );
}

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

  // Logout handler: call auth.logout then navigate to login
  const handleLogout = () => {
    auth.logout();
    navigate({ to: "/login" });
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
      <div className="bg-background min-h-screen">
        {auth.user && <TopBar user={auth.user} onLogout={handleLogout} />}

        <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-8 md:col-span-1">
            <PersonalInfoCard userId={auth.user?.uuid ?? ""} />
            <AppointmentsCard userId={auth.user?.uuid ?? ""} />
          </div>
          <div className="md:col-span-2">
            <MedicalRecordsCard userId={auth.user?.uuid ?? ""} />
          </div>
        </div>
      </div>
    </>
  );
}

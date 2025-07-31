import {
  createFileRoute,
  useSearch,
  useNavigate,
} from "@tanstack/react-router";
// import { User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import type { userType } from "@/types/user";
import {
  // User,
  Calendar,
  Phone,
  MapPin,
  Droplet,
  AlertCircle,
  FileText,
} from "lucide-react";
import { PersonalInfoCard } from "@/components/PersonalInfoCard";

export type searchProp = {
  redirect?: string;
  unauthorized?: string;
};

function TopBar({ user }: { user: userType }) {
  return (
    <div className="bg-primary text-primary-foreground flex justify-between items-center px-8 py-4 shadow">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl">MediCard</span>
        <span className="ml-6 text-base">My Records</span>
      </div>
      <div className="flex items-center gap-4">
        <span>
          Welcome, {user?.name} ({user?.role})
        </span>
        <button className="flex items-center gap-1 hover:underline">
          <span>Logout</span>
        </button>
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
  // Example data, replace with real data
  const appointments = [
    {
      doctor: "Dr. Sarah Johnson",
      reason: "Regular Checkup",
      time: "10:00 AM",
      date: "2/15/2024",
    },
    {
      doctor: "Dr. Michael Brown",
      reason: "Follow-up",
      time: "2:30 PM",
      date: "2/22/2024",
    },
  ];

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
      <div className="bg-background min-h-screen">
        {auth.user && <TopBar user={auth.user} />}

        <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Personal Info Card */}
          <PersonalInfoCard userId={auth.user?.uuid ?? ""} />
          {/* <div className="bg-card rounded-lg shadow p-6 flex flex-col gap-4">
            <h2 className="font-bold text-lg mb-2">Personal Information</h2>
            <div className="flex items-center gap-2">
              <Calendar className="text-primary" size={18} />
              <span>Date of Birth</span>
              <span className="font-bold ml-auto">11/5/1992</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-primary" size={18} />
              <span>Phone</span>
              <span className="ml-auto">+1-555-0789</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-primary" size={18} />
              <span>Address</span>
              <span className="ml-auto">789 Pine St, City, State 12345</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplet className="text-destructive" size={18} />
              <span>Blood Type</span>
              <span className="ml-auto font-bold">B+</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="text-warning" size={18} />
              <span>Allergies</span>
              <span className="ml-auto">No known allergies</span>
            </div>
          </div> */}

          {/* Medical Records Card */}
          <div className="bg-card rounded-lg shadow p-6 flex flex-col gap-4 col-span-1 md:col-span-2">
            <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
              <FileText className="text-primary" size={20} />
              My Medical Records
            </h2>
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <FileText size={32} />
              <span>No medical records available.</span>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-card rounded-lg shadow p-6 flex flex-col gap-4 mt-8 md:mt-0">
            <h2 className="font-bold text-lg mb-2">Upcoming Appointments</h2>
            {appointments.map((appt, idx) => (
              <div key={idx} className="border rounded p-3 mb-2 flex flex-col">
                <span className="font-semibold">{appt.doctor}</span>
                <span className="text-sm text-muted-foreground">
                  {appt.reason}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="text-primary" size={16} />
                  <span>{appt.date}</span>
                  <span className="ml-auto">{appt.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

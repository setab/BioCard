import { useAuth } from "@/hooks/useAuth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import TopBar from "@/components/TopBar";
import TodaysAppointments from "@/components/TodaysAppointments";
import QuickNote from "@/components/QuickNote";
import RecentNotes from "@/components/RecentNotes";
import NFClookUp from "@/components/NFClookUp";

export const Route = createFileRoute("/doctor/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  const navigate = useNavigate();

  const recentPatients = [
    { name: "Emily Rodriguez", lastVisit: "1/15/2024", bloodType: "A+" },
    { name: "Michael Chen", lastVisit: "1/10/2024", bloodType: "O-" },
    { name: "Sarah Williams", lastVisit: "1/8/2024", bloodType: "B+" },
  ];

  const handleLogout = () => {
    auth.logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {auth.user && <TopBar user={auth.user} onLogout={handleLogout} />}
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-1 text-black">Doctor Dashboard</h1>
        <p className="text-gray-700 mb-6">
          Welcome back, Dr. {auth.user?.name || "Doctor"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <NFClookUp />
          <QuickNote userId={auth.user?.uuid ?? ""} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <TodaysAppointments userId={auth.user?.uuid ?? ""} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="font-semibold text-lg mb-4">Recent Patients</div>
            <ul>
              {recentPatients.map((p, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                >
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-gray-500">
                      Last visit: {p.lastVisit}
                    </div>
                  </div>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">
                    {p.bloodType}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <RecentNotes userId={auth.user?.uuid ?? ""} />
        </div>
      </div>
    </div>
  );
}

import { useAuth } from "@/hooks/useAuth";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Calendar, Users } from "lucide-react";
import TopBar from "@/components/TopBar";
import TodaysAppointments from "@/components/TodaysAppointments";
import QuickNote from "@/components/QuickNote";
import ActionCard from "@/components/ActionCard";

export const Route = createFileRoute("/doctor/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();

  // Dummy data for demonstration
  const stats = [
    {
      icon: <Calendar className="text-blue-600" />,
      title: "Today's Appointments",
      value: 5,
    },
    {
      icon: <Users className="text-green-600" />,
      title: "Total Patients",
      value: 3,
    },
    // {
    //   icon: <FileText className="text-emerald-600" />,
    //   title: "Pending Reviews",
    //   value: 3,
    // },
    // {
    //   icon: <Clock className="text-purple-600" />,
    //   title: "Avg. Visit Time",
    //   value: "25m",
    // },
  ];

  const recentPatients = [
    { name: "Emily Rodriguez", lastVisit: "1/15/2024", bloodType: "A+" },
    { name: "Michael Chen", lastVisit: "1/10/2024", bloodType: "O-" },
    { name: "Sarah Williams", lastVisit: "1/8/2024", bloodType: "B+" },
  ];

  const recentNotes = [
    {
      doctor: "Dr. Sarah Johnson",
      note: "Regular checkup. Patient reports feeling well.",
      date: "1/15/2024",
      tags: ["Healthy"],
    },
    {
      doctor: "Dr. Michael Brown",
      note: "Follow-up for hypertension management.",
      date: "12/1/2023",
      tags: ["Hypertension - controlled"],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {auth.user && <TopBar user={auth.user} onLogout={() => {}} />}
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Welcome Section */}
        <h1 className="text-3xl font-bold mb-1 text-black">Doctor Dashboard</h1>
        <p className="text-gray-700 mb-6">
          Welcome back, Dr. {auth.user?.name || "Doctor"}
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ActionCard
            icon={<Search size={32} />}
            title="NFC Patient Lookup"
            subtitle="Scan or search for patients"
            color="bg-blue-600"
            className=""
          />
          {/* <ActionCard
            icon={<Plus size={32} />}
            title="Quick Note"
            subtitle="Add medical notes quickly"
            color="bg-emerald-600"
          /> */}
          <QuickNote />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))} */}
          <TodaysAppointments userId={auth.user?.uuid ?? ""} />
        </div>

        {/* Recent Patients & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Patients */}
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
          {/* Recent Notes */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="font-semibold text-lg mb-4">Recent Notes</div>
            <ul>
              {recentNotes.map((n, idx) => (
                <li key={idx} className="py-2 border-b last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{n.doctor}</div>
                    <div className="text-xs text-gray-500">{n.date}</div>
                  </div>
                  <div className="text-sm text-gray-700">{n.note}</div>
                  <div className="mt-1 flex gap-2">
                    {n.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

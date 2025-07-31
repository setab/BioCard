import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export type Appointment = {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_time: string;
  reason?: string;
  status?: string;
  notes?: string;
  created_at?: string;
  department: string;
  license_number: string;
  doctor_name: string;
};

export type AppointmentsCardProps = {
  appointments: Appointment[];
};

export default function AppointmentsCard({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Appointments", userId],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getPatientAppointments/${userId}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    },
    enabled: !!userId,
  });

  if (isLoading)
    return (
      <Card sx={{ minWidth: 320, boxShadow: 3, borderRadius: 2, p: 2 }}>
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  if (error || !data)
    return (
      <Card sx={{ minWidth: 320, boxShadow: 3, borderRadius: 2, p: 2 }}>
        <CardContent>
          <Typography color="error" align="center">
            Error loading Upcoming Appointments
          </Typography>
        </CardContent>
      </Card>
    );
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        maxWidth: "400px",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>Upcoming Appointments</h2>
      {data.length === 0 ? (
        <div>No upcoming appointments.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {data.map((appt: Appointment) => (
            <li
              key={appt.id}
              style={{
                marginBottom: "12px",
                borderBottom: "1px solid #f0f0f0",
                paddingBottom: "8px",
              }}
            >
              <div>
                <strong>{appt.doctor_name}</strong>
              </div>
              <div>
                {new Date(appt.appointment_time).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>
              {appt.reason && (
                <div style={{ color: "#666" }}>{appt.reason}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

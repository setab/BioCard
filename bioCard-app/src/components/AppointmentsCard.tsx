import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Calendar, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
    // refetchInterval: 10000,
  });

  const [expanded, setExpanded] = useState(false);

  // Only show first 2 appointments unless expanded
  const visibleAppointments = expanded ? data : data?.slice(0, 1);

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
    <Card
      sx={{
        minWidth: 320,
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        ...(!expanded && {
          "&:hover": {
            boxShadow: 6,
            transform: "scale(1.03)",
          },
        }),
        ...(expanded && {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1300,
          borderRadius: 0,
          boxShadow: 12,
          background: "#fff",
          overflowY: "auto",
          p: { xs: 1, md: 6 },
          cursor: "default",
        }),
      }}
      onClick={() => !expanded && setExpanded(true)}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Upcoming Appointments
          </Typography>
          {expanded && (
            <IconButton
              aria-label="close"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
              sx={{ ml: 2 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />
        {data.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No upcoming appointments.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {(expanded ? data : visibleAppointments).map(
              (appt: Appointment) => (
                <Box
                  key={appt.id}
                  sx={{
                    borderBottom: "1px solid #f0f0f0",
                    pb: 2,
                    mb: 2,
                    "&:last-child": { borderBottom: "none", mb: 0, pb: 0 },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <User size={18} style={{ color: "#2563eb" }} />
                    <Typography variant="body2" fontWeight={500}>
                      Doctor
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      sx={{ ml: "auto" }}
                    >
                      {appt.doctor_name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <Calendar size={18} style={{ color: "#2563eb" }} />
                    <Typography variant="body2" fontWeight={500}>
                      Date & Time
                    </Typography>
                    <Typography variant="body2" sx={{ ml: "auto" }}>
                      {new Date(appt.appointment_time).toLocaleString(
                        undefined,
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }
                      )}
                    </Typography>
                  </Box>
                  {appt.reason && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Reason: {appt.reason}
                    </Typography>
                  )}
                  {appt.status && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Status: {appt.status}
                    </Typography>
                  )}
                </Box>
              )
            )}
            {!expanded && data.length > 2 && (
              <Typography align="center" color="primary" sx={{ mt: 1 }}>
                Click to show all appointments
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

import { useQuery } from "@tanstack/react-query";
import StatCard from "./StateCard";
import { Users, Calendar } from "lucide-react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function TodaysAppointments({ userId }: { userId: string }) {
  const [expanded, setExpanded] = useState(false);

  const patientData = useQuery({
    queryKey: ["patients", userId],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getPatientCountForDoctorWithId/${userId}`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to fetch patient count");
      return res.json();
    },
    enabled: !!userId,
  });

  const appointmentsQuery = useQuery({
    queryKey: ["appointments", userId],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getPatientInfoWithDoctorId/${userId}`,
        { credentials: "include" }
      );
      return res.json();
    },
    enabled: expanded && !!userId,
  });

  const count =
    typeof patientData.data === "number"
      ? patientData.data
      : (patientData.data ?? 0);

  if (patientData.isLoading) {
    return (
      <StatCard
        icon={<Users className="text-green-600" />}
        title="Total Patients"
        value="Loading..."
      />
    );
  }

  if (patientData.isError) {
    return (
      <StatCard
        icon={<Users className="text-green-600" />}
        title="Total Patients"
        value="Error"
      />
    );
  }

  return (
    <>
      <Box
        onClick={() => setExpanded(true)}
        sx={{
          cursor: "pointer",
          transition: "all 0.15s",
          "&:hover": {
            boxShadow: 4,
            transform: "scale(1.04)",
            background: "#f3f4f6",
          },
          borderRadius: 2,
          boxShadow: 1,
          mb: 2,
        }}
      >
        <StatCard
          icon={<Users className="text-green-600" />}
          title="Total Patients"
          value={count}
        />
      </Box>
      <Dialog
        open={expanded}
        onClose={() => setExpanded(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, background: "#f8fafc" },
        }}
      >
        <Box sx={{ position: "relative", p: 3 }}>
          <IconButton
            onClick={() => setExpanded(false)}
            sx={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" fontWeight={700} mb={2} color="primary">
            Appointment History
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {appointmentsQuery.isLoading && (
            <Typography color="text.secondary" align="center" py={2}>
              Loading appointments...
            </Typography>
          )}
          {appointmentsQuery.isError && (
            <Typography color="error" align="center" py={2}>
              Error loading appointments.
            </Typography>
          )}
          {appointmentsQuery.data && appointmentsQuery.data.length === 0 && (
            <Typography color="text.secondary" align="center" py={2}>
              No appointments found.
            </Typography>
          )}
          {appointmentsQuery.data && appointmentsQuery.data.length > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {appointmentsQuery.data.map((appt: any) => (
                <Box
                  key={appt.appointment_id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    background: "#fff",
                    transition: "box-shadow 0.2s, background 0.2s",
                    "&:hover": {
                      boxShadow: 6,
                      background: "#f3f4f6",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Calendar size={20} style={{ color: "#2563eb" }} />
                    <Typography variant="body1" fontWeight={500}>
                      {new Date(appt.appointment_time).toLocaleString(
                        undefined,
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        ml: "auto",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: "0.9em",
                        background: "#e0e7ff",
                        color: "#3730a3",
                        textTransform: "capitalize",
                      }}
                    >
                      {appt.status}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: "flex", gap: 4 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="text.secondary"
                      >
                        Patient
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {appt.patient_name}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="text.secondary"
                      >
                        Doctor
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {appt.doctor_name}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    <strong>Reason:</strong> {appt.reason}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  );
}

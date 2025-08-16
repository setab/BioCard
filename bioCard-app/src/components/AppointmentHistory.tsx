import { Box, Dialog, Typography } from "@mui/material";
import { useState } from "react";
import ActionCard from "./ActionCard";
import { Calendar, FileText, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export type AppointmentHistoryProps = {
  id: string;
  appointment_time: string;
  reason: string;
  status: string;
  notes: string | null;
  doctor_name: string;
};
export default function AppointmentHistory({ nfcUID }: { nfcUID: string }) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery<AppointmentHistoryProps[]>({
    queryKey: ["nfc Appointment History", nfcUID],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getAppointmentDataByNFCUID/${nfcUID}`
      );
      return res.json();
    },
    enabled: !!nfcUID,
  });

  if (isLoading)
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (error || !data)
    return (
      <div className="p-8 text-center text-red-600">
        Appointments not found.
      </div>
    );

  return (
    <>
      <Box onClick={() => setExpanded(true)}>
        {" "}
        <ActionCard
          icon={
            <div className="transition-transform duration-200 group-hover:scale-125">
              <Calendar size={32} />
            </div>
          }
          title="Appoint History"
          subtitle="Patients all appointment History"
          color="bg-green-600"
          className="group cursor-pointer hover:shadow-xl hover:scale-[1.03] hover:bg-green-700 transition-all duration-200"
        />
      </Box>
      <Dialog
        open={expanded}
        onClose={() => setExpanded(false)}
        maxWidth="sm"
        fullWidth
      >
        {/* {JSON.stringify(data)} */}
        <Box p={4}>
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <FileText size={32} />
              <span>No appointment history available.</span>
            </div>
          ) : (
            <Box display="flex" flexDirection="column" gap={2}>
              {data.map((app: AppointmentHistoryProps, idx: number) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 1,
                    bgcolor: "#f9fafb",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <User size={20} />
                    <Typography fontWeight={600}>{app.doctor_name}</Typography>
                    <Typography
                      variant="caption"
                      color={
                        app.status === "completed"
                          ? "success.main"
                          : app.status === "pending"
                            ? "warning.main"
                            : "error.main"
                      }
                      sx={{ ml: 2 }}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Reason:</strong> {app.reason}
                  </Typography>
                  {app.notes && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Notes:</strong> {app.notes}
                    </Typography>
                  )}
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Calendar size={18} />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(app.appointment_time).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  );
}

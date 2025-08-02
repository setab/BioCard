import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Calendar, User, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ExpandableImage } from "./ExpandableImage";

export type MedicalRecord = {
  id: string;
  patient_id: string;
  doctor_id: string;
  diagnosis: string;
  created_at: string;
  date: string;
  doctor_name: string;
  notes?: string | null;
  prescriptions?: string | null;
  procedures?: string | null;
  follow_up?: string | null;
  images?: string[] | null;
};

export default function MedicalRecordsCard({ userId }: { userId: string }) {
  const [expanded, setExpanded] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["medicalRecords", userId],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getMedicalRecordById/${userId}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: !!userId,
  });

  // Only show first 2 records unless expanded
  const visibleRecords = expanded ? data : data?.slice(0, 2);

  if (isLoading)
    return (
      <div className="bg-card rounded-lg shadow p-6 flex flex-col gap-4 col-span-1 md:col-span-2">
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <CircularProgress />
          <span>Loading medical records...</span>
        </div>
      </div>
    );
  if (error || !data)
    return (
      <div className="bg-card rounded-lg shadow p-6 flex flex-col gap-4 col-span-1 md:col-span-2">
        <div className="flex flex-col items-center justify-center h-40 text-red-600">
          <span>Error loading medical records.</span>
        </div>
      </div>
    );

  return (
    <div
      className={`bg-card rounded-lg shadow p-6 flex flex-col gap-4 col-span-1 md:col-span-2 transition-all duration-200 ${
        expanded
          ? "fixed inset-0 z-[1300] rounded-none shadow-2xl bg-white overflow-y-auto px-4 md:px-24 py-10"
          : "cursor-pointer hover:shadow-2xl hover:scale-[1.03]"
      }`}
      onClick={() => !expanded && setExpanded(true)}
      style={expanded ? { minWidth: "320px" } : undefined}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
          <FileText className="text-primary" size={20} />
          Medical Records
        </h2>
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
      </div>
      <Divider className="mb-2" />
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <FileText size={32} />
          <span>No medical records available.</span>
        </div>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {(expanded ? data : visibleRecords).map((record: MedicalRecord) => (
            <Box
              key={record.id}
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
                  {record.doctor_name}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <Calendar size={18} style={{ color: "#2563eb" }} />
                <Typography variant="body2" fontWeight={500}>
                  Date
                </Typography>
                <Typography variant="body2" sx={{ ml: "auto" }}>
                  {new Date(record.date).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <FileText size={18} style={{ color: "#2563eb" }} />
                <Typography variant="body2" fontWeight={500}>
                  Diagnosis
                </Typography>
                <Typography variant="body2" sx={{ ml: "auto" }}>
                  {record.diagnosis}
                </Typography>
              </Box>
              {record.notes && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Notes: {record.notes}
                </Typography>
              )}
              {record.prescriptions && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Prescriptions: {record.prescriptions}
                </Typography>
              )}
              {record.procedures && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Procedures: {record.procedures}
                </Typography>
              )}
              {record.follow_up && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Follow-up: {new Date(record.follow_up).toLocaleDateString()}
                </Typography>
              )}
              {record.images && record.images.length > 0 && (
                <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {record.images?.map((img, i) => (
                    <ExpandableImage
                      key={i}
                      src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${record.id}/${img}`}
                    />
                  ))}
                </Box>
              )}
            </Box>
          ))}
          {!expanded && data.length > 2 && (
            <Typography align="center" color="primary" sx={{ mt: 1 }}>
              Click to show all medical records
            </Typography>
          )}
        </Box>
      )}
    </div>
  );
}

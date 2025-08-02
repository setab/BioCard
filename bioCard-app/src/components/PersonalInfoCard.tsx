import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Calendar, Phone, MapPin, Droplet, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type UserInfoProps = {
  id: string;
  name: string;
  email: string;
  role: string;
  token_version: number;
  created_at: string;
  nfc_uid: string;
  blood_type: string;
  allergies: string;
  last_visit: string;
  department: string | null;
  license_number: string | null;
  address?: string | null;
  date_of_birth?: string | null;
  phone?: string | null;
};

export function PersonalInfoCard({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery<UserInfoProps>({
    queryKey: ["personalInfo", userId],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: !!userId,
  });

  const [expanded, setExpanded] = useState(false);

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
            Error loading user info
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
            Personal Information
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Always show these fields */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Calendar size={18} style={{ color: "#2563eb" }} />
            <Typography variant="body2" fontWeight={500}>
              Date of Birth
            </Typography>
            <Typography variant="body2" fontWeight={700} sx={{ ml: "auto" }}>
              {data.date_of_birth
                ? new Date(data.date_of_birth).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Phone size={18} style={{ color: "#2563eb" }} />
            <Typography variant="body2" fontWeight={500}>
              Phone
            </Typography>
            <Typography variant="body2" sx={{ ml: "auto" }}>
              {data.phone ? data.phone : "N/A"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MapPin size={18} style={{ color: "#2563eb" }} />
            <Typography variant="body2" fontWeight={500}>
              Address
            </Typography>
            <Typography variant="body2" sx={{ ml: "auto" }}>
              {data.address ? data.address : "N/A"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Droplet size={18} style={{ color: "#ef4444" }} />
            <Typography variant="body2" fontWeight={500}>
              Blood Type
            </Typography>
            <Typography
              variant="body2"
              fontWeight={700}
              sx={{ ml: "auto", color: "#ef4444" }}
            >
              {data.blood_type ? data.blood_type : "N/A"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AlertCircle size={18} style={{ color: "#fbbf24" }} />
            <Typography variant="body2" fontWeight={500}>
              Allergies
            </Typography>
            <Typography variant="body2" sx={{ ml: "auto" }}>
              {data.allergies && data.allergies !== "None"
                ? data.allergies
                : "No known allergies"}
            </Typography>
          </Box>
          {/* Show full info only when expanded */}
          {expanded && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" fontWeight={500}>
                Name: <span style={{ fontWeight: 700 }}>{data.name}</span>
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                Email: <span style={{ fontWeight: 700 }}>{data.email}</span>
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                Role: <span style={{ fontWeight: 700 }}>{data.role}</span>
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                NFC UID: <span style={{ fontWeight: 700 }}>{data.nfc_uid}</span>
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                Last Visit:{" "}
                <span style={{ fontWeight: 700 }}>
                  {data.last_visit
                    ? new Date(data.last_visit).toLocaleDateString()
                    : "N/A"}
                </span>
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                Created:{" "}
                <span style={{ fontWeight: 700 }}>
                  {data.created_at
                    ? new Date(data.created_at).toLocaleDateString()
                    : "N/A"}
                </span>
              </Typography>
              {data.department && (
                <Typography variant="body2" fontWeight={500}>
                  Department:{" "}
                  <span style={{ fontWeight: 700 }}>{data.department}</span>
                </Typography>
              )}
              {data.license_number && (
                <Typography variant="body2" fontWeight={500}>
                  License #:{" "}
                  <span style={{ fontWeight: 700 }}>{data.license_number}</span>
                </Typography>
              )}
            </>
          )}
        </Box>
        {!expanded && (
          <Typography align="center" color="primary" sx={{ mt: 5 }}>
            Click to show all appointments
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

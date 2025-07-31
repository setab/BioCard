import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { Calendar, Phone, MapPin, Droplet, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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
};

export function PersonalInfoCard({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery<UserInfoProps>({
    queryKey: ["personalInfo", userId],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}`,
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
            Error loading user info
          </Typography>
        </CardContent>
      </Card>
    );

  return (
    <Card sx={{ minWidth: 320, boxShadow: 3, borderRadius: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Personal Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Calendar size={18} style={{ color: "#2563eb" }} />
            <Typography variant="body2" fontWeight={500}>
              Date of Birth
            </Typography>
            <Typography variant="body2" fontWeight={700} sx={{ ml: "auto" }}>
              {/* Replace with actual DOB if available */}
              {data.created_at
                ? new Date(data.created_at).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Phone size={18} style={{ color: "#2563eb" }} />
            <Typography variant="body2" fontWeight={500}>
              Phone
            </Typography>
            <Typography variant="body2" sx={{ ml: "auto" }}>
              {/* Replace with actual phone if available */}
              +1-555-0789
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
        </Box>
      </CardContent>
    </Card>
  );
}

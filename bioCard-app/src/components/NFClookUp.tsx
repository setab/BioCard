import ActionCard from "@/components/ActionCard";
import { Search } from "lucide-react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { useQuery } from "@tanstack/react-query";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export type NfcLogEntry = {
  id: string;
  device_id: string;
  nfc_uid: string;
  logged_at: string; // ISO string like "2025-08-16T19:11:25.333Z"
};

const FRESH_WINDOW_MS = 3000;

function pickLatest(entryOrList: any): NfcLogEntry | null {
  if (!entryOrList) return null;
  const list: NfcLogEntry[] = Array.isArray(entryOrList)
    ? entryOrList
    : [entryOrList];
  if (list.length === 0) return null;

  // pick the item with the most recent logged_at
  return list.reduce((latest, curr) => {
    const lt = Date.parse(latest.logged_at);
    const ct = Date.parse(curr.logged_at);
    return ct > lt ? curr : latest;
  });
}

function isFresh(iso: string | undefined): boolean {
  if (!iso) return false;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return false;
  const delta = Math.abs(Date.now() - t);
  return delta <= FRESH_WINDOW_MS;
}

export default function NFClookUp() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const { data, error, isFetching } = useQuery({
    queryKey: ["nfc-patient-lookup"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/biocard/scan`
      );
      if (!res.ok) throw new Error("Fetch failed");
      const json = await res.json();
      return pickLatest(json); // always return the newest entry (or null)
    },
    enabled: expanded,
    refetchInterval: expanded ? 1000 : false, // poll each second while open
    refetchOnWindowFocus: false,
  });

  const freshEntry = data && isFresh(data.logged_at) ? data : null;

  return (
    <>
      <div onClick={() => setExpanded(true)}>
        <ActionCard
          icon={
            <div className="transition-transform duration-200 group-hover:scale-125">
              <Search size={32} />
            </div>
          }
          title="NFC Patient Lookup"
          subtitle="Scan or search for patients"
          color="bg-blue-600"
          className="group cursor-pointer hover:shadow-xl hover:scale-[1.03] hover:bg-blue-700 transition-all duration-200"
        />
      </div>

      <Dialog
        open={expanded}
        onClose={() => setExpanded(false)}
        maxWidth="sm"
        fullWidth
      >
        <div className="p-4">
          <Typography variant="h6">NFC Scan</Typography>

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              Error loading scans
            </Typography>
          )}

          {!freshEntry && (
            <Typography sx={{ mt: 2 }} color="text.secondary" align="center">
              {isFetching ? "Scanning..." : "Please swipe your card to scan"}
            </Typography>
          )}

          {freshEntry && (
            <div className="mt-3 space-y-1">
              <Typography>✅ Card scanned within 3s</Typography>
              <Typography>ID: {freshEntry.id}</Typography>
              <Typography>Device: {freshEntry.device_id}</Typography>
              <Typography>UID: {freshEntry.nfc_uid}</Typography>
              <Typography>
                Time: {new Date(freshEntry.logged_at).toLocaleString()}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => {
                  navigate({ to: `/doctor/patientInfo/${data?.nfc_uid}` });
                }}
              >
                View Patient Profile
              </Button>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
}

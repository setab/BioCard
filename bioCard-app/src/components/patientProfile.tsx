import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Mail, Phone, Plus, User } from "lucide-react";
import Box from "@mui/material/Box";
import ActionCard from "./ActionCard";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";

type PatientProfileProps = {
  patient_id: string;
  blood_type: string;
  allergies: string;
  last_visit: string;
  name: string;
  email: string;
  gender: string | null | undefined;
  date_of_birth: string | null;
  phone: string | null;
  emergency_contact_name: string;
  emergency_contact_relation: string;
  emergency_contact_phone: string;
};

export default function PatientProfile({ nfcUID }: { nfcUID: string }) {
  const [expanded, setExpanded] = useState(false);

  const { data, isLoading, error } = useQuery<PatientProfileProps>({
    queryKey: ["patientProfile", nfcUID],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/patientInfoByNFCUID/${nfcUID}`
      );
      //   console.log(res.json());
      return res.json();
    },
    enabled: !!nfcUID,
  });

  if (isLoading)
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (error || !data)
    return (
      <div className="p-8 text-center text-red-600">Patient not found.</div>
    );

  return (
    <>
      <Box onClick={() => setExpanded(true)}>
        {" "}
        <ActionCard
          icon={
            <div className="transition-transform duration-200 group-hover:scale-125">
              <User size={32} />
            </div>
          }
          title="Basic Information"
          subtitle="Add medical notes quickly"
          color="bg-blue-600"
          className="group cursor-pointer hover:shadow-xl hover:scale-[1.03] hover:bg-blue-700 transition-all duration-200"
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
          <div className="flex items-center gap-4 mb-4">
            <User size={40} className="text-blue-600" />
            <div>
              <div className="text-xl font-semibold">{data.name}</div>
              <div className="text-gray-500">
                {data.gender} •{" "}
                {data.date_of_birth
                  ? data.date_of_birth
                  : "Contect number: N/A"}
              </div>
            </div>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <Mail size={18} className="text-gray-500" />
            <span>{data.email}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <Phone size={18} className="text-gray-500" />
            <span>{data.phone ? data.phone : "N/A"}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <AlertCircle size={18} className="text-red-500" />
            <span>Allergies: {data.allergies || "None"}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-medium">Blood Type:</span>
            <span>{data.blood_type}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-medium">Last Visit:</span>
            <span>{data.last_visit}</span>
          </div>
          <div className="mt-4 border-t pt-4">
            <div className="font-semibold mb-2">Emergency Contact</div>
            <div className="flex flex-col gap-1">
              <span>
                Name:{" "}
                {data.emergency_contact_name
                  ? data.emergency_contact_name
                  : "N/A"}
              </span>
              <span>
                Relation:{" "}
                {data.emergency_contact_relation
                  ? data.emergency_contact_relation
                  : "N/A"}
              </span>
              <span>
                Phone:{" "}
                {data.emergency_contact_phone
                  ? data.emergency_contact_phone
                  : "N/A"}
              </span>
            </div>
          </div>
        </Box>
      </Dialog>
    </>
  );
}

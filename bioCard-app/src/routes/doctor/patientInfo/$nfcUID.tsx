import { useParams, createFileRoute } from "@tanstack/react-router";
import PatientProfile from "@/components/patientProfile";
import MedicalHistory from "@/components/MedicalHistory";
import AppointmentHistory from "@/components/AppointmentHistory";

export const Route = createFileRoute("/doctor/patientInfo/$nfcUID")({
  component: RouteComponent,
});

function RouteComponent() {
  const { nfcUID } = useParams({ from: Route.fullPath });

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["patientInfo", nfcUID],
  //   queryFn: async () => {
  //     const res = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/getMedicalHistoryById/${nfcUID}`
  //     );
  //     return res.json();
  //   },
  //   enabled: !!nfcUID,
  // });

  // const {
  //   name,
  //   gender,
  //   date_of_birth,
  //   blood_type,
  //   allergies,
  //   email,
  //   phone,
  //   last_visit,
  //   medical_history = [],
  //   doctor_notes = [],
  //   appointments = [],
  //   emergency_contact,
  // } = data;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Patient Profile */}
      <PatientProfile nfcUID={nfcUID} />
      {/* Medical History */}
      <MedicalHistory nfcUID={nfcUID} />
      {/* Doctor Notes */}
      {/* <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-200 p-6 group">
        <div className="flex items-center gap-2 mb-2">
          <FileText
            size={22}
            className="text-purple-600 group-hover:scale-110 transition-transform"
          />
          <span className="text-lg font-semibold text-gray-800">
            Doctor Notes
          </span>
        </div>
        {doctor_notes.length === 0 ? (
          <div className="text-gray-400">No doctor notes found.</div>
        ) : (
          <ul className="space-y-3">
            {doctor_notes.map((note: any, i: number) => (
              <li
                key={i}
                className="p-4 rounded hover:bg-purple-50 border border-gray-100 transition"
              >
                <div className="font-semibold text-gray-800">{note.note}</div>
                <div className="text-xs text-gray-500 mb-1">
                  {note.created_at &&
                    new Date(note.created_at).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Status: {note.status}
                </div>
                {note.images && note.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {note.images.map((img: string, idx: number) => (
                      <img
                        key={idx}
                        src={img}
                        alt="note"
                        className="w-16 h-16 object-cover rounded border hover:scale-105 transition"
                      />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div> */}
      {/* Appointments */}
      <AppointmentHistory nfcUID={nfcUID} />{" "}
    </div>
  );
}

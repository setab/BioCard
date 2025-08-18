import { useParams, createFileRoute } from "@tanstack/react-router";
import PatientProfile from "@/components/patientProfile";
import MedicalHistory from "@/components/MedicalHistory";
import AppointmentHistory from "@/components/AppointmentHistory";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/doctor/patientInfo/$nfcUID")({
  component: RouteComponent,
});

function RouteComponent() {
  const { nfcUID } = useParams({ from: Route.fullPath });
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Patient Profile */}
      <PatientProfile nfcUID={nfcUID} />
      {/* Medical History */}
      <MedicalHistory nfcUID={nfcUID} />
      {/* Appointments */}
      <AppointmentHistory nfcUID={nfcUID} />
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => navigate({ to: "/doctor/dashboard" })}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

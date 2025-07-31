export type Appointment = {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_time: string;
  reason?: string;
  status?: string;
  notes?: string;
  created_at?: string;
};

export type AppointmentsCardProps = {
  appointments: Appointment[];
};

export default function AppointmentsCard({ userId }: { userId: string }) {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        maxWidth: "400px",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <div>No upcoming appointments.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {appointments.map((appt) => (
            <li
              key={appt.id}
              style={{
                marginBottom: "12px",
                borderBottom: "1px solid #f0f0f0",
                paddingBottom: "8px",
              }}
            >
              <div>
                <strong>{appt.patient}</strong>
              </div>
              <div>
                {appt.date} at {appt.time}
              </div>
              {appt.description && (
                <div style={{ color: "#666" }}>{appt.description}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

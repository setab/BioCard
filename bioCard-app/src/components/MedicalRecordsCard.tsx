import React from "react";

type MedicalRecord = {
  id: string;
  patient_id: string;
  doctor_id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  notes?: string;
  prescriptions?: string;
  procedures?: string;
  follow_up?: string;
  images?: string[];
  created_at: string;
};

type MedicalRecordsCardProps = {
  records: MedicalRecord[];
};

const MedicalRecordsCard: React.FC<MedicalRecordsCardProps> = ({ records }) => {
  return (
    <div
      className="medical-records-card"
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        background: "#fff",
        maxWidth: 600,
      }}
    >
      <h2>Medical Records</h2>
      {records.length === 0 ? (
        <p>No medical records available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {records.map((record) => (
            <li
              key={record.id}
              style={{
                marginBottom: 16,
                borderBottom: "1px solid #eee",
                paddingBottom: 8,
              }}
            >
              <div>
                <strong>Date:</strong> {record.date}
              </div>
              <div>
                <strong>Doctor:</strong> {record.doctor}
              </div>
              <div>
                <strong>Diagnosis:</strong> {record.diagnosis}
              </div>
              {record.notes && (
                <div>
                  <strong>Notes:</strong> {record.notes}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicalRecordsCard;

// TypeScript interfaces for your database models

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "doctor" | "patient";
  token_version: number;
  created_at: string; // ISO date string
}

export interface Patient {
  id: string;
  user_id: string;
  nfc_uid: string;
  blood_type: string | null;
  allergies: string | null;
  last_visit: string | null; // ISO date string or null
}

export interface Doctor {
  id: string;
  user_id: string;
  department: string | null;
  license_number: string | null;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  doctor_id: string;
  note: string;
  created_at: string; // ISO date string
}

export interface RefreshToken {
  id: string;
  user_id: string;
  jti: string;
  expires_at: string; // ISO date string
  created_at: string; // ISO date string
}

// Joined user type for profile queries
export interface UserProfile extends User {
  nfc_uid?: string | null;
  blood_type?: string | null;
  allergies?: string | null;
  last_visit?: string | null;
  department?: string | null;
  license_number?: string | null;
}

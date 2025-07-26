import type { userType } from "@/types/user";

export async function fetchSessionUser() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/getProfile`,
    { credentials: "include" }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data as userType;
}

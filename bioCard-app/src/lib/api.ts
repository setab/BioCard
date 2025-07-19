import { env } from "@/lib/env";

// API client configuration
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = env.VITE_API_BASE_URL;
  }

  async login(email: string, password: string) {
    const response = await fetch(`${this.baseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  }

  async register(userData: { email: string; password: string }) {
    const response = await fetch(`${this.baseUrl}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();

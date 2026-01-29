import { api } from "@/lib/api";
import { LoginRequest, LoginResponse } from "@/models/auth";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  //const res = await api.post<LoginResponse>("/auth/login", data);
  //return res.data;
  await delay(300);
  return {
    token: "jwt-token-67890",
  };
};

export const logoutApi = async (): Promise<void> => {
  //await api.post("/auth/logout");
  await delay(300);
  console.log("Sessione terminata");
};

export const refreshTokenApi = async (refreshToken: string) => {
  //const res = await api.post("/auth/refresh", { refreshToken });
  //return res.data;
  await delay(300);
  return {
    token: "new-fake-jwt-token-67890",
  };
};

export const getUserProfile = async () => {
  // const res = await api.get("/auth/me");
  // return res.data;
  await delay(600);
  return {
    id: "1",
    email: "user@example.com",
    name: "Mario Rossi",
    role: "admin",
  };
};
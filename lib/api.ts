import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.143:3000";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Interceptor per aggiungere automaticamente il token a ogni richiesta
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token"); // token salvato in SecureStore
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor per gestione errori globale
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("Axios error:", error.message);
    // opzionale: puoi aggiungere redirect su 401, logout, ecc.
    return Promise.reject(error);
  }
);

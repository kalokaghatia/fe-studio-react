import { create } from "zustand";
import { router } from "expo-router";
import { secureStorage } from "@/utils/secureStoreManager";
import { loginApi, logoutApi } from "@/services/auth.service";
import { LoginRequest } from "@/models/auth";

interface AuthStore {
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  
  initializeAuth: () => Promise<void>;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: (skipRedirect?: boolean) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  isLoggedIn: false,
  isLoading: true,

  initializeAuth: async () => {
    set({ isLoading: true });
    const token = await secureStorage.getItem("TOKEN");
    set({
      token,
      isLoggedIn: !!token,
      isLoading: false,
    });
  },

  login: async (credentials: LoginRequest) => {
    try {
      const response = await loginApi(credentials);
      await secureStorage.setItem("TOKEN", response.token);
      
      set({ token: response.token, isLoggedIn: true });
    } catch (error) {
      throw error;
    }
  },

  logout: async (skipRedirect = false) => {
    try {
      // 1. Chiama API logout (opzionale)
      await logoutApi();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      await secureStorage.removeItem("TOKEN");
      
      set({ token: null, isLoggedIn: false });
      
      if (!skipRedirect) router.replace("/profile/login");
    }
  },
}));
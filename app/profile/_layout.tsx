import { Stack, useRouter } from "expo-router";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";

export default function ProfileLayout() {
  const { isLoggedIn, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/profile/login");
    }
  }, [isLoggedIn, isLoading, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: "Il mio Profilo" }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ title: "Login Profilo" }} 
      />
      <Stack.Screen 
        name="profile-features" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}

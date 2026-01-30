import { Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Benvenuto nella Home",
            headerShown: true
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profilo",
            headerShown: false
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}

import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";

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

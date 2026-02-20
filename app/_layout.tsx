import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import "../global.css";

import { ThemeDialog } from "@/components/features/themeDialog";
import { Icon } from "@/components/ui/icon";
import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { Home, User } from "lucide-react-native";

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { isDark } = useTheme();

  return (
    <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Tabs
          screenOptions={{
            tabBarStyle: { height: 70 },
            tabBarIconStyle: { flex: 1 },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Benvenuto nella Home",  
              tabBarLabel: "Home",
              headerShown: true,
              headerRight: () => <ThemeDialog />,
              tabBarIcon: ({ color }) => (
                <Icon as={Home} size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profilo",
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Icon as={User} size={28} color={color} />
              ),
            }}
          />
        </Tabs>
        <PortalHost />
      </QueryClientProvider>
    </NavThemeProvider>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
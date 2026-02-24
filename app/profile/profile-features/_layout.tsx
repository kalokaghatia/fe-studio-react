import { Stack } from "expo-router";

export default function ProfileFeatureLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
            }}
        >
            <Stack.Screen name="addresses" options={{ title: "Indirizzo" }} />
            <Stack.Screen name="edit" options={{ title: "Modifica Profilo" }} />
        </Stack>
    );
}

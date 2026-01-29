import { View, Text, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "expo-router";

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoggedIn } = useAuthStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isLoggedIn) {
            router.replace("/profile");
        }
    }, [isLoggedIn, router]);

    const handleLogin = async () => {
        const email = "email";
        const password = "password";
        await login({ email, password });
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text>Email:</Text>
            <TextInput
                style={{ borderWidth: 1, width: "100%", marginBottom: 10, padding: 8 }}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <Text>Password:</Text>
            <TextInput
                style={{ borderWidth: 1, width: "100%", marginBottom: 10, padding: 8 }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

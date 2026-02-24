import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "expo-router";
import { Eye, EyeOff, User } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useAuthStore } from "@/stores/auth.store";
import { triggerHaptic } from '@/utils/tirggerHaptic';

// Schema di validazione Zod
const loginSchema = z.object({
  email: z.string().min(1, 'Email richiesta').email('Formato email non valido'),
  password: z.string().min(1, 'Password richiesta'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/profile");
    }
  }, [isLoggedIn, router]);

  const onValid = async (data: LoginForm) => {
    try {
      await triggerHaptic('success');
      await login({ email: data.email, password: data.password });
    } catch (error) {
      await triggerHaptic('error');
      console.error("Login failed", error);
    }
  };

  const onInvalid = async () => {
    await triggerHaptic('error');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
      >
        <Card className="w-full max-w-sm self-center">
          <CardHeader className="items-center">           
            <Icon as={User} size={80} />
            <CardTitle>Accedi al tuo account</CardTitle> 
          </CardHeader>

          <CardContent className="gap-4"> 
            <View className="gap-1.5">
              <Label nativeID="email-label">Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="esempio@email.it"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoComplete="email"
                  />
                )}
              />
              {errors.email && (
                <Text className="text-destructive text-xs ml-1">{errors.email.message}</Text>
              )}
            </View>
 
            <View className="gap-1.5">
              <Label nativeID="password-label">Password</Label>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View style={{ position: 'relative' }}>
                    <Input
                      placeholder="La tua password"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                      textContentType="password"
                      autoComplete="password"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: 12, top: 12 }}
                    >
                      <Icon 
                        as={showPassword ? EyeOff : Eye} 
                        size={20} 
                        className="text-muted-foreground" 
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text className="text-destructive text-xs ml-1">{errors.password.message}</Text>
              )}
            </View>

            <Button 
              className="mt-2" 
              onPress={handleSubmit(onValid, onInvalid)}
            >
              <Text>Entra</Text>
            </Button>
          </CardContent>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
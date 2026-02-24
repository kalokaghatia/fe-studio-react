import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { editProfileSchema } from '@/schemas/editProfileSchema';
import { triggerHaptic } from '@/utils/tirggerHaptic';
import React, { useState } from 'react';
import z from 'zod';

type EditProfileForm = z.infer<typeof editProfileSchema>;

export default function EditProfile() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');

  const passwordRequirements = [
    { label: 'Almeno 8 caratteri', test: (p: string) => p.length >= 8 },
    { label: 'Massimo 20 caratteri', test: (p: string) => p.length <= 20 },
    { label: 'Almeno una lettera maiuscola', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'Almeno una lettera minuscola', test: (p: string) => /[a-z]/.test(p) },
    { label: 'Almeno un numero', test: (p: string) => /[0-9]/.test(p) },
    { label: 'Almeno un carattere speciale (!@#$%^&*)', test: (p: string) => /[!@#$%^&*]/.test(p) },
  ];
  const onValid = async (data: EditProfileForm) => {
    await triggerHaptic('success');
    console.log('Dati validi:', data);
  };

  const onInvalid = async () => {
    await triggerHaptic('error');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
    >
      <ScrollView
        style={{ flex: 1 }} 
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          marginTop:20
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Card className="w-full max-w-sm">
          <CardHeader className="items-center">
            <CardTitle>Campi Modificabili</CardTitle>
          </CardHeader>

          <CardContent className="gap-3">
            <Label>Nome</Label>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="words"
                  textContentType="name"
                  autoComplete="name"
                  placeholder="Nome"
                />
              )}
            />
            {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}

            <Label>Cognome</Label>
            <Controller
              control={control}
              name="surname"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="words"
                  textContentType="familyName"
                  autoComplete="name-family"
                  placeholder="Cognome"
                />
              )}
            />
            {errors.surname && <Text style={{ color: 'red' }}>{errors.surname.message}</Text>}

            <Label>Email</Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoComplete="email"
                  placeholder="Email"
                />
              )}
            />
            {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

            <Label>Password</Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View style={{ position: 'relative', width: '100%' }}>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                    textContentType="newPassword"
                    autoComplete="password-new"
                    placeholder="Password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(prev => !prev)}
                    style={{ position: 'absolute', right: 10, top: 12 }}
                  >
                    <Icon as={showPassword ? EyeOff : Eye} size={24} className="text-gray-400" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <View style={{ gap: 2 }}>
              {(() => {
                const allPassed = passwordRequirements.every(req => req.test(password));
                if (allPassed && password.length > 0) {
                  return (
                    <Text style={{ color: 'green', fontSize: 12 }}>✓ Password valida</Text>
                  );
                }
                return passwordRequirements.map((req, i) => {
                  const passed = req.test(password);
                  return (
                    <Text key={i} style={{ color: passed ? 'green' : 'red', fontSize: 12 }}>
                      {passed ? '✓' : '✗'} {req.label}
                    </Text>
                  );
                });
              })()}
            </View>

            <Label>Conferma Password</Label>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <View style={{ position: 'relative', width: '100%' }}>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showConfirmPassword}
                    textContentType="password"
                    autoComplete="password"
                    placeholder="Conferma Password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(prev => !prev)}
                    style={{ position: 'absolute', right: 10, top: 12 }}
                  >
                    <Icon as={showConfirmPassword ? EyeOff : Eye} size={24} className="text-gray-400" />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.confirmPassword && (
              <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>
            )}

            <Button className="mt-4 border" onPress={handleSubmit(onValid, onInvalid)}>
              <Text>Salva</Text>
            </Button>
          </CardContent>
        </Card>
      </ScrollView>

    </KeyboardAvoidingView>
  );
}
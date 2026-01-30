import { View, Text, Pressable, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/auth.store';

export default function ProfileScreen() {
  const router = useRouter();
  
  const { logout } = useAuthStore();
  const handleLogout = async () => {
    await logout();
    router.replace('/profile/login');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Benvenuto!</Text>

      <Pressable onPress={() => router.push('/profile/profile-features/addresses')} style={{ padding: 15, backgroundColor: '#eee', marginBottom: 10 }}>
        <Text>Gestisci Indirizzi</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/profile/profile-features/edit')} style={{ padding: 15, backgroundColor: '#eee' }}>
        <Text>Modifica Dati</Text>
      </Pressable>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
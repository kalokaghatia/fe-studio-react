import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/profile/login');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant={'h1'}>Benvenuto!</Text>

      <Button
        onPress={() => router.push('/profile/profile-features/addresses')}
        className="my-3"        
        variant="outline"
      >
        <Text variant={'h3'}>Gestisci Indirizzi</Text>
      </Button>

      <Button
        onPress={() => router.push('/profile/profile-features/edit')}
        className="mb-3"
        variant="outline"
      >
        <Text variant={'h3'}>Modifica Dati</Text>
      </Button>

      <Button
        onPress={handleLogout}
        variant="destructive"
      >
        <Text variant={'h3'}>Logout</Text>
      </Button>
    </View>
  );
}
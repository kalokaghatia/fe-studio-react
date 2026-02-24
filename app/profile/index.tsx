import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useAuthStore } from '@/stores/auth.store';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Platform } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/profile/login');
  };

  const handleEditPress = async (): Promise<void> => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    router.push('/profile/profile-features/edit');
  };
  return (
    <Card className="w-[90%] max-w-sm self-center mt-4">
      <CardHeader className="items-center">
        <CardTitle>Benvenuto!</CardTitle>
      </CardHeader>

      <CardContent className="gap-4">

        <Button
          onPress={() => router.push('/profile/profile-features/addresses')}
          className="my-3"
          variant="outline"
        >
          <Text variant={'h3'}>Gestisci Indirizzi</Text>
        </Button>

        <Button
          onPress={handleEditPress}
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
      </CardContent>
    </Card>
  );
}
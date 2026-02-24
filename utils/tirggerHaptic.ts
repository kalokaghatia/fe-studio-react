import * as Haptics from 'expo-haptics';
import { Platform } from "react-native";

export const triggerHaptic = async (type: 'error' | 'success') => {
    if (Platform.OS === 'web') return;
    await Haptics.notificationAsync(
      type === 'error'
        ? Haptics.NotificationFeedbackType.Error
        : Haptics.NotificationFeedbackType.Success
    );
  };
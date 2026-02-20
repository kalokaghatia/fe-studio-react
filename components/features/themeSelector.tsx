import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun, SunMoon } from 'lucide-react-native';
import { View } from 'react-native';
import { Icon } from '../ui/icon';

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <View className="p-4 gap-3">
      <ToggleGroup
        type="single"
        value={theme}
        onValueChange={(value) => {
          if (value) setTheme(value as 'light' | 'dark' | 'system');
        }}
        className="flex-row gap-2 justify-start"
      >
        <ToggleGroupItem value="light">
          <Icon as={Sun} size={18} />
        </ToggleGroupItem>

        <ToggleGroupItem value="dark">
          <Icon as={Moon} size={18} />
        </ToggleGroupItem>

        <ToggleGroupItem value="system">
          <Icon as={SunMoon} size={18} />
        </ToggleGroupItem>
      </ToggleGroup>
    </View>
  );
}
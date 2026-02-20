import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativeWindScheme } from 'nativewind';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type ThemeMode = 'system' | 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  isDark: false,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { setColorScheme } = useNativeWindScheme();
 
  const systemScheme = useSystemColorScheme();

  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const applyTheme = useCallback(
  (mode: ThemeMode) => {
    const dark =
      mode === 'dark' ||
      (mode === 'system' && systemScheme === 'dark');

    setIsDark(dark); 
    setColorScheme(mode === 'system' ? 'system' : mode);
  },
  [systemScheme, setColorScheme]
);
 
  useEffect(() => {
    const init = async () => {
      const saved = (await AsyncStorage.getItem('theme')) as ThemeMode | null;
      const mode = saved ?? 'system';

      setThemeState(mode);
      setIsLoading(false);
    };

    init();
  }, []);
 
  useEffect(() => {
    if (!isLoading) {
      applyTheme(theme);
    }
  }, [systemScheme, theme, isLoading]);

  const setTheme = useCallback(async (mode: ThemeMode) => {
    setThemeState(mode);
    await AsyncStorage.setItem('theme', mode);
  }, []);

  if (isLoading) return null;

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
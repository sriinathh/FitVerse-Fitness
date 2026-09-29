import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, type AppColors, type ThemeMode } from './theme';
import type { UserProfile } from './types';

interface AppContextValue {
  colors: AppColors;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  profile: UserProfile | null;
  setProfile: (p: UserProfile) => void;
  isOnboarded: boolean;
  completeOnboarding: (p: UserProfile) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = 'fitverse_profile';
const THEME_KEY = 'fitverse_theme';

export function AppProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [profile, setProfileState] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProfileState(JSON.parse(stored));
      const storedTheme = localStorage.getItem(THEME_KEY) as ThemeMode | null;
      if (storedTheme) setThemeMode(storedTheme);
      else setThemeMode(systemScheme === 'light' ? 'light' : 'dark');
    } catch {
      // SSR or no storage
    }
  }, [systemScheme]);

  const toggleTheme = () => {
    const next = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* noop */ }
  };

  const completeOnboarding = (p: UserProfile) => {
    setProfileState(p);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* noop */ }
  };

  const setProfile = (p: UserProfile) => {
    setProfileState(p);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* noop */ }
  };

  const colors = themeMode === 'dark' ? darkColors : lightColors;

  return (
    <AppContext.Provider value={{
      colors,
      themeMode,
      toggleTheme,
      profile,
      setProfile,
      isOnboarded: profile?.onboarded ?? false,
      completeOnboarding,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

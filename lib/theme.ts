import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export type ThemeMode = 'light' | 'dark';

export interface AppColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  success: string;
  warning: string;
  danger: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  card: string;
  cardGradient: string[];
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  overlay: string;
  glassBg: string;
  glassBorder: string;
  chartColors: string[];
}

export const lightColors: AppColors = {
  primary: '#2563EB',
  primaryLight: '#60A5FA',
  primaryDark: '#1D4ED8',
  secondary: '#7C3AED',
  secondaryLight: '#A78BFA',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F5F9',
  card: '#FFFFFF',
  cardGradient: ['#2563EB', '#1D4ED8'],
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  overlay: 'rgba(15, 23, 42, 0.05)',
  glassBg: 'rgba(255, 255, 255, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.5)',
  chartColors: ['#2563EB', '#7C3AED', '#22C55E', '#F59E0B', '#EF4444'],
};

export const darkColors: AppColors = {
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  primaryDark: '#2563EB',
  secondary: '#8B5CF6',
  secondaryLight: '#A78BFA',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceAlt: '#1E293B',
  card: '#1E293B',
  cardGradient: ['#3B82F6', '#2563EB'],
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  border: '#334155',
  overlay: 'rgba(0, 0, 0, 0.3)',
  glassBg: 'rgba(30, 41, 59, 0.7)',
  glassBorder: 'rgba(148, 163, 184, 0.2)',
  chartColors: ['#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B', '#EF4444'],
};

export const navDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0F172A',
    card: '#1E293B',
    text: '#F8FAFC',
    border: '#334155',
    primary: '#3B82F6',
  },
};

export const navLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#0F172A',
    border: '#E2E8F0',
    primary: '#2563EB',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const typography = {
  title: { fontFamily: 'Inter-Bold', fontSize: 28, lineHeight: 34 },
  h1: { fontFamily: 'Inter-Bold', fontSize: 24, lineHeight: 30 },
  h2: { fontFamily: 'Inter-Bold', fontSize: 20, lineHeight: 26 },
  h3: { fontFamily: 'Inter-Semi', fontSize: 18, lineHeight: 24 },
  body: { fontFamily: 'Inter-Regular', fontSize: 16, lineHeight: 24 },
  bodyMedium: { fontFamily: 'Inter-Medium', fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: 'Inter-Regular', fontSize: 14, lineHeight: 20 },
  small: { fontFamily: 'Inter-Regular', fontSize: 12, lineHeight: 16 },
  stat: { fontFamily: 'Inter-Bold', fontSize: 32, lineHeight: 38 },
  statMd: { fontFamily: 'Inter-Bold', fontSize: 24, lineHeight: 30 },
};

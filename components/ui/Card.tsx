import { View, Text, StyleSheet, ViewStyle, type StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/lib/AppContext';
import { radii, spacing } from '@/lib/theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  gradient?: string[];
  glass?: boolean;
  padded?: boolean;
}

export function Card({ children, style, gradient, glass, padded = true }: CardProps) {
  const { colors } = useApp();

  if (gradient) {
    return (
      <LinearGradient
        colors={gradient as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, padded && styles.padded, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  if (glass) {
    return (
      <View style={[styles.glass, padded && styles.padded, { backgroundColor: colors.glassBg, borderColor: colors.glassBorder }, style]}>
        {children}
      </View>
    );
  }

  return (
    <View style={[styles.card, padded && styles.padded, { backgroundColor: colors.card, borderColor: colors.border }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  glass: {
    borderRadius: radii.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  padded: {
    padding: spacing.md,
  },
});

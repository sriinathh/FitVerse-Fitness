import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useApp } from '@/lib/AppContext';

export default function IndexRedirect() {
  const router = useRouter();
  const { isOnboarded, colors } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOnboarded) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isOnboarded, router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

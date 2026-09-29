import { View, StyleSheet } from 'react-native';
import { radii } from '@/lib/theme';

interface SkeletonProps {
  width?: import('react-native').DimensionValue;
  height?: number;
  radius?: number;
}

export function Skeleton({ width = '100%', height = 16, radius = radii.sm }: SkeletonProps) {
  return (
    <View
      style={[styles.skeleton, { width, height, borderRadius: radius }]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: 'rgba(148,163,184,0.15)',
  },
});

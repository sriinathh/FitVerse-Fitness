import { View, StyleSheet } from 'react-native';
import { radii } from '@/lib/theme';

interface ProgressBarProps {
  progress: number; // 0-1
  color: string;
  trackColor?: string;
  height?: number;
}

export function ProgressBar({ progress, color, trackColor, height = 6 }: ProgressBarProps) {
  const pct = Math.min(Math.max(progress, 0), 1);
  return (
    <View style={[styles.track, { height, backgroundColor: trackColor ?? 'rgba(148,163,184,0.2)' }]}>
      <View style={[styles.fill, { width: `${pct * 100}%`, height, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: radii.pill,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    borderRadius: radii.pill,
  },
});

import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useApp } from '@/lib/AppContext';
import { typography } from '@/lib/theme';

interface RingProgressProps {
  progress: number; // 0-1
  size?: number;
  stroke?: number;
  color: string;
  label?: string;
  value?: string;
}

export function RingProgress({ progress, size = 100, stroke = 8, color, label, value }: RingProgressProps) {
  const { colors } = useApp();
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - Math.min(progress, 1) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.border}
          strokeWidth={stroke}
          fill="none"
          opacity={0.3}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.center}>
        {value && <Text style={[styles.value, { color: colors.text }]}>{value}</Text>}
        {label && <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    ...typography.statMd,
  },
  label: {
    ...typography.small,
    marginTop: 2,
  },
});

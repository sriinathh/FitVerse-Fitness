import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '@/lib/AppContext';
import { spacing, typography } from '@/lib/theme';

interface BarChartProps {
  data: { label: string; value: number }[];
  max?: number;
  color: string;
  height?: number;
}

export function BarChart({ data, max, color, height = 140 }: BarChartProps) {
  const { colors } = useApp();
  const maxValue = max ?? Math.max(...data.map(d => d.value));

  return (
    <View style={styles.container}>
      <View style={[styles.chart, { height }]}>
        {data.map((item, i) => {
          const barHeight = (item.value / maxValue) * (height - 28);
          return (
            <View key={i} style={styles.barCol}>
              <View style={[styles.barTrack, { height: height - 28 }]}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: Math.max(barHeight, 4),
                      backgroundColor: color,
                      borderTopLeftRadius: 6,
                      borderTopRightRadius: 6,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.label, { color: colors.textMuted }]}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  barTrack: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '70%',
  },
  label: {
    ...typography.small,
  },
});

import { View, StyleSheet } from 'react-native';
import { useApp } from '@/lib/AppContext';
import { spacing, typography } from '@/lib/theme';
import Svg, { Polyline, Line, Circle, Text as SvgText, Path } from 'react-native-svg';

interface LineChartProps {
  data: number[];
  labels: string[];
  color: string;
  height?: number;
  width?: number;
}

export function LineChart({ data, labels, color, height = 160, width = 320 }: LineChartProps) {
  const { colors } = useApp();
  const padding = { top: 20, right: 16, bottom: 28, left: 36 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((value - min) / range) * chartHeight;
    return { x, y, value };
  });

  const linePoints = points.map(p => `${p.x},${p.y}`).join(' ');
  const areaPath = `M ${points[0].x} ${padding.top + chartHeight} L ${points.map(p => `${p.x} ${p.y}`).join(' L ')} L ${points[points.length - 1].x} ${padding.top + chartHeight} Z`;

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = padding.top + chartHeight * t;
          const val = Math.round(max - (range * t));
          return (
            <View key={i}>
              <Line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke={colors.border}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <SvgText
                x={padding.left - 6}
                y={y + 3}
                fontSize={9}
                fill={colors.textMuted}
                textAnchor="end"
              >
                {val}
              </SvgText>
            </View>
          );
        })}
        <Path d={areaPath} fill={color} opacity={0.08} />
        <Polyline
          points={linePoints}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={3.5} fill={color} />
        ))}
        {labels.map((label, i) => (
          <SvgText
            key={i}
            x={points[i].x}
            y={height - 8}
            fontSize={9}
            fill={colors.textMuted}
            textAnchor="middle"
          >
            {label}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
});

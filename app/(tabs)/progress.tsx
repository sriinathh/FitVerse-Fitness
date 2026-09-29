import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { TrendingUp, Flame, Dumbbell, Scale, Award, Target } from 'lucide-react-native';
import { useApp } from '@/lib/AppContext';
import { spacing, radii, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { RingProgress } from '@/components/charts/RingProgress';
import { weightProgress } from '@/lib/data';

const screenWidth = Dimensions.get('window').width;

export default function ProgressScreen() {
  const { colors } = useApp();
  const [tab, setTab] = useState<'weight' | 'calories' | 'workouts'>('weight');

  const currentWeight = weightProgress[weightProgress.length - 1].weight;
  const startWeight = weightProgress[0].weight;
  const weightChange = (currentWeight - startWeight).toFixed(1);

  const chartData = {
    weight: { data: weightProgress.map(p => p.weight), labels: weightProgress.map(p => p.date.replace('Week ', 'W')), color: colors.primary },
    calories: { data: weightProgress.map(p => p.calories), labels: weightProgress.map(p => p.date.replace('Week ', 'W')), color: colors.danger },
    workouts: { data: weightProgress.map(p => p.workouts), labels: weightProgress.map(p => p.date.replace('Week ', 'W')), color: colors.success },
  };

  const personalRecords = [
    { label: 'Longest Streak', value: '12 days', icon: Flame, color: colors.danger },
    { label: 'Best 5K Time', value: '24:30', icon: TrendingUp, color: colors.primary },
    { label: 'Max Push-ups', value: '45', icon: Dumbbell, color: colors.secondary },
    { label: 'Total Workouts', value: '87', icon: Award, color: colors.success },
  ];

  const bodyMetrics = [
    { label: 'Weight', value: '75.2', unit: 'kg', progress: 0.75, color: colors.primary },
    { label: 'BMI', value: '24.6', unit: 'normal', progress: 0.62, color: colors.success },
    { label: 'Body Fat', value: '18.5', unit: '%', progress: 0.55, color: colors.warning },
    { label: 'Muscle', value: '38.2', unit: 'kg', progress: 0.70, color: colors.secondary },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={[styles.pageTitle, { color: colors.text }]}>Progress</Text>
      <Text style={[styles.pageSub, { color: colors.textMuted }]}>Track your fitness journey</Text>

      {/* Overview Cards */}
      <View style={styles.overviewRow}>
        <Card style={styles.overviewCard}>
          <View style={[styles.overviewIcon, { backgroundColor: colors.primary + '20' }]}>
            <Scale color={colors.primary} size={20} />
          </View>
          <Text style={[styles.overviewValue, { color: colors.text }]}>{currentWeight}</Text>
          <Text style={[styles.overviewLabel, { color: colors.textMuted }]}>Current Weight</Text>
          <Text style={[styles.overviewChange, { color: parseFloat(weightChange) < 0 ? colors.success : colors.danger }]}>
            {parseFloat(weightChange) < 0 ? '↓' : '↑'} {Math.abs(parseFloat(weightChange))} kg
          </Text>
        </Card>
        <Card style={styles.overviewCard}>
          <View style={[styles.overviewIcon, { backgroundColor: colors.success + '20' }]}>
            <Flame color={colors.success} size={20} />
          </View>
          <Text style={[styles.overviewValue, { color: colors.text }]}>3,770</Text>
          <Text style={[styles.overviewLabel, { color: colors.textMuted }]}>Total Calories</Text>
          <Text style={[styles.overviewChange, { color: colors.success }]}>↑ 15% this week</Text>
        </Card>
      </View>

      {/* Chart Tabs */}
      <Card style={styles.chartCard}>
        <View style={styles.chartTabRow}>
          {([
            { key: 'weight', label: 'Weight' },
            { key: 'calories', label: 'Calories' },
            { key: 'workouts', label: 'Workouts' },
          ] as const).map(t => (
            <TouchableOpacity
              key={t.key}
              onPress={() => setTab(t.key)}
              style={[
                styles.chartTab,
                { backgroundColor: tab === t.key ? colors.primary : 'transparent' },
              ]}
            >
              <Text style={{ color: tab === t.key ? '#fff' : colors.textSecondary, fontFamily: 'Inter-Medium', fontSize: 13 }}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <LineChart
          data={chartData[tab].data}
          labels={chartData[tab].labels}
          color={chartData[tab].color}
          width={screenWidth - 80}
          height={170}
        />
      </Card>

      {/* Body Metrics */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Body Metrics</Text>
        <View style={styles.metricsGrid}>
          {bodyMetrics.map(m => (
            <Card key={m.label} style={styles.metricCard}>
              <View style={styles.metricTopRow}>
                <Text style={[styles.metricLabel, { color: colors.textMuted }]}>{m.label}</Text>
                <RingProgress progress={m.progress} size={36} stroke={4} color={m.color} />
              </View>
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {m.value}<Text style={[styles.metricUnit, { color: colors.textMuted }]}> {m.unit}</Text>
              </Text>
            </Card>
          ))}
        </View>
      </View>

      {/* Personal Records */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Records</Text>
        <View style={styles.prGrid}>
          {personalRecords.map(pr => {
            const Icon = pr.icon;
            return (
              <Card key={pr.label} style={styles.prCard}>
                <View style={[styles.prIcon, { backgroundColor: pr.color + '20' }]}>
                  <Icon color={pr.color} size={20} />
                </View>
                <Text style={[styles.prValue, { color: colors.text }]}>{pr.value}</Text>
                <Text style={[styles.prLabel, { color: colors.textMuted }]}>{pr.label}</Text>
              </Card>
            );
          })}
        </View>
      </View>

      {/* Workout Frequency */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Workout Frequency</Text>
        <Card>
          <BarChart
            data={weightProgress.slice(-4).map(p => ({ label: p.date.replace('Week ', 'W'), value: p.workouts }))}
            color={colors.success}
            height={120}
          />
        </Card>
      </View>

      {/* Goals */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Goals</Text>
        <Card style={styles.goalCard}>
          <View style={[styles.goalIcon, { backgroundColor: colors.primary + '20' }]}>
            <Target color={colors.primary} size={20} />
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={[styles.goalTitle, { color: colors.text }]}>Lose 5kg in 3 months</Text>
            <Text style={[styles.goalSub, { color: colors.textMuted }]}>3.3 kg lost · 1.7 kg to go</Text>
          </View>
          <Text style={[styles.goalPct, { color: colors.primary }]}>66%</Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  pageTitle: { ...typography.h1, fontFamily: 'Inter-Bold', fontSize: 26 },
  pageSub: { ...typography.caption, marginBottom: spacing.xs },
  overviewRow: { flexDirection: 'row', gap: spacing.md },
  overviewCard: { flex: 1, gap: 6 },
  overviewIcon: { width: 36, height: 36, borderRadius: radii.sm, justifyContent: 'center', alignItems: 'center' },
  overviewValue: { ...typography.statMd, fontFamily: 'Inter-Bold', fontSize: 26 },
  overviewLabel: { ...typography.small, fontSize: 12 },
  overviewChange: { ...typography.small, fontSize: 12, fontFamily: 'Inter-Medium' },
  chartCard: { gap: spacing.sm },
  chartTabRow: { flexDirection: 'row', gap: 6, backgroundColor: 'rgba(148,163,184,0.1)', padding: 4, borderRadius: radii.md },
  chartTab: { flex: 1, paddingVertical: 8, borderRadius: radii.sm, alignItems: 'center' },
  section: { gap: spacing.sm },
  sectionTitle: { ...typography.h3, fontFamily: 'Inter-Semi' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  metricCard: { width: '48%', flex: 1, minWidth: '48%', gap: 8 },
  metricTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricLabel: { ...typography.small, fontSize: 13 },
  metricValue: { ...typography.statMd, fontFamily: 'Inter-Bold', fontSize: 22 },
  metricUnit: { fontSize: 13, fontFamily: 'Inter-Regular' },
  prGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  prCard: { width: '48%', flex: 1, minWidth: '48%', gap: 6, alignItems: 'center' },
  prIcon: { width: 40, height: 40, borderRadius: radii.sm, justifyContent: 'center', alignItems: 'center' },
  prValue: { ...typography.statMd, fontFamily: 'Inter-Bold', fontSize: 20 },
  prLabel: { ...typography.small, fontSize: 12, textAlign: 'center' },
  goalCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  goalIcon: { width: 44, height: 44, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center' },
  goalTitle: { fontFamily: 'Inter-Semi', fontSize: 15 },
  goalSub: { ...typography.small, fontSize: 12 },
  goalPct: { fontFamily: 'Inter-Bold', fontSize: 18 },
});

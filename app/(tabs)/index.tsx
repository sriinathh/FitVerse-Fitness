import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Flame, Footprints, Droplets, Moon, Activity, Bell, ChevronRight,
  Dumbbell, Play, Zap, TrendingUp,
} from 'lucide-react-native';
import { useApp } from '@/lib/AppContext';
import { spacing, radii, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { RingProgress } from '@/components/charts/RingProgress';
import { BarChart } from '@/components/charts/BarChart';
import { todayStats, weeklyProgress, motivationalQuotes, workouts } from '@/lib/data';

const iconMap: Record<string, any> = {
  calories: Flame, steps: Footprints, water: Droplets, sleep: Moon, active: Activity,
};

export default function HomeScreen() {
  const router = useRouter();
  const { colors, profile } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const quote = motivationalQuotes[new Date().getDate() % motivationalQuotes.length];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const statCards = [
    { id: 'calories', label: 'Calories', value: todayStats.caloriesBurned, goal: todayStats.caloriesGoal, unit: 'kcal', icon: 'calories', color: colors.danger },
    { id: 'steps', label: 'Steps', value: todayStats.steps, goal: todayStats.stepsGoal, unit: '', icon: 'steps', color: colors.primary },
    { id: 'water', label: 'Water', value: todayStats.water, goal: todayStats.waterGoal, unit: 'L', icon: 'water', color: '#06B6D4' },
    { id: 'sleep', label: 'Sleep', value: todayStats.sleep, goal: todayStats.sleepGoal, unit: 'h', icon: 'sleep', color: colors.secondary },
  ];

  const todayWorkout = workouts[0];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textMuted }]}>Welcome back,</Text>
          <Text style={[styles.name, { color: colors.text }]}>{profile?.name || 'Athlete'}</Text>
        </View>
        <TouchableOpacity onPress={() => {}} style={[styles.bellBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Bell color={colors.textSecondary} size={20} />
          <View style={[styles.badge, { backgroundColor: colors.danger }]} />
        </TouchableOpacity>
      </View>

      {/* Quote */}
      <Card glass style={styles.quoteCard}>
        <Text style={[styles.quoteText, { color: colors.text }]}>"{quote.text}"</Text>
        <Text style={[styles.quoteAuthor, { color: colors.textMuted }]}>— {quote.author}</Text>
      </Card>

      {/* Today's Workout Hero */}
      <TouchableOpacity onPress={() => router.push('/workout/w1')} activeOpacity={0.9}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroTop}>
            <View style={styles.heroLabelRow}>
              <Zap color="#fff" size={16} />
              <Text style={styles.heroLabel}>Today's Workout</Text>
            </View>
            <View style={[styles.heroDifficulty, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <Text style={styles.heroDifficultyText}>{todayWorkout.difficulty}</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>{todayWorkout.title}</Text>
          <View style={styles.heroMetaRow}>
            <View style={styles.heroMetaItem}>
              <Dumbbell color="rgba(255,255,255,0.8)" size={16} />
              <Text style={styles.heroMetaText}>{todayWorkout.duration} min</Text>
            </View>
            <View style={styles.heroMetaItem}>
              <Flame color="rgba(255,255,255,0.8)" size={16} />
              <Text style={styles.heroMetaText}>{todayWorkout.calories} kcal</Text>
            </View>
            <View style={styles.heroPlayBtn}>
              <Play color={colors.primary} size={18} fill={colors.primary} />
              <Text style={[styles.heroPlayText, { color: colors.primary }]}>Start</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Activity Ring */}
      <Card style={styles.ringCard}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Daily Activity</Text>
          <TrendingUp color={colors.textMuted} size={18} />
        </View>
        <View style={styles.ringRow}>
          <RingProgress
            progress={todayStats.caloriesBurned / todayStats.caloriesGoal}
            size={110}
            color={colors.danger}
            value={`${todayStats.caloriesBurned}`}
            label="kcal"
          />
          <RingProgress
            progress={todayStats.steps / todayStats.stepsGoal}
            size={110}
            color={colors.primary}
            value={`${(todayStats.steps / 1000).toFixed(1)}K`}
            label="steps"
          />
          <RingProgress
            progress={todayStats.activeMinutes / todayStats.activeGoal}
            size={110}
            color={colors.success}
            value={`${todayStats.activeMinutes}`}
            label="min"
          />
        </View>
      </Card>

      {/* Stat Cards Grid */}
      <View style={styles.statGrid}>
        {statCards.map(s => {
          const Icon = iconMap[s.icon];
          return (
            <Card key={s.id} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: s.color + '20' }]}>
                <Icon color={s.color} size={18} />
              </View>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>{s.label}</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {s.value}{s.unit && <Text style={[styles.statUnit, { color: colors.textMuted }]}> {s.unit}</Text>}
              </Text>
              <ProgressBar
                progress={s.value / s.goal}
                color={s.color}
                height={4}
              />
              <Text style={[styles.statGoal, { color: colors.textMuted }]}>
                Goal: {s.goal}{s.unit}
              </Text>
            </Card>
          );
        })}
      </View>

      {/* Weekly Progress Chart */}
      <Card style={styles.chartCard}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Weekly Progress</Text>
          <Text style={[styles.cardSub, { color: colors.textMuted }]}>Last 7 days</Text>
        </View>
        <BarChart data={weeklyProgress.map(d => ({ label: d.day, value: d.value }))} color={colors.primary} height={130} />
      </Card>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickRow}>
          <TouchableOpacity onPress={() => router.push('/workout/w1')} style={{ flex: 1 }}>
            <Card style={styles.quickCard}>
              <LinearGradient colors={[colors.primary + '20', colors.primary + '05']} style={styles.quickGrad}>
                <Dumbbell color={colors.primary} size={24} />
                <Text style={[styles.quickLabel, { color: colors.text }]}>Start Workout</Text>
              </LinearGradient>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/nutrition')} style={{ flex: 1 }}>
            <Card style={styles.quickCard}>
              <LinearGradient colors={[colors.success + '20', colors.success + '05']} style={styles.quickGrad}>
                <Flame color={colors.success} size={24} />
                <Text style={[styles.quickLabel, { color: colors.text }]}>Log Meal</Text>
              </LinearGradient>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/progress')} style={{ flex: 1 }}>
            <Card style={styles.quickCard}>
              <LinearGradient colors={[colors.secondary + '20', colors.secondary + '05']} style={styles.quickGrad}>
                <TrendingUp color={colors.secondary} size={24} />
                <Text style={[styles.quickLabel, { color: colors.text }]}>Progress</Text>
              </LinearGradient>
            </Card>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Workouts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recommended Workouts</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/workouts')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md, paddingRight: spacing.lg }}>
          {workouts.slice(0, 4).map(w => (
            <TouchableOpacity key={w.id} onPress={() => router.push(`/workout/${w.id}`)}>
              <Card style={styles.workoutRecCard}>
                <LinearGradient
                  colors={[colors.cardGradient[0] + '30', colors.cardGradient[1] + '10']}
                  style={styles.workoutRecIcon}
                >
                  <Dumbbell color={colors.primary} size={22} />
                </LinearGradient>
                <Text style={[styles.workoutRecTitle, { color: colors.text }]} numberOfLines={1}>{w.title}</Text>
                <Text style={[styles.workoutRecMeta, { color: colors.textMuted }]}>{w.category} · {w.duration} min</Text>
                <View style={styles.workoutRecRow}>
                  <Flame color={colors.danger} size={13} />
                  <Text style={[styles.workoutRecCal, { color: colors.textSecondary }]}>{w.calories} kcal</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { ...typography.caption },
  name: { ...typography.h1 },
  bellBtn: { width: 44, height: 44, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  badge: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4 },
  quoteCard: { marginTop: 4 },
  quoteText: { ...typography.body, fontStyle: 'italic', fontFamily: 'Inter-Regular' },
  quoteAuthor: { ...typography.small, marginTop: 4 },
  heroCard: { borderRadius: radii.xl, padding: spacing.lg, gap: 10 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  heroLabel: { color: '#fff', fontFamily: 'Inter-Medium', fontSize: 13 },
  heroDifficulty: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radii.pill },
  heroDifficultyText: { color: '#fff', fontFamily: 'Inter-Semi', fontSize: 12 },
  heroTitle: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 22, lineHeight: 28 },
  heroMetaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  heroMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  heroMetaText: { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontFamily: 'Inter-Regular' },
  heroPlayBtn: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill },
  heroPlayText: { fontFamily: 'Inter-Bold', fontSize: 14 },
  ringCard: { gap: spacing.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { ...typography.h3, fontFamily: 'Inter-Semi' },
  cardSub: { ...typography.small },
  ringRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  statCard: { width: '48%', flex: 1, minWidth: '48%', gap: 6 },
  statIcon: { width: 36, height: 36, borderRadius: radii.sm, justifyContent: 'center', alignItems: 'center' },
  statLabel: { ...typography.small, fontSize: 12 },
  statValue: { ...typography.statMd, fontFamily: 'Inter-Bold', fontSize: 22 },
  statUnit: { fontSize: 13, fontFamily: 'Inter-Regular' },
  statGoal: { ...typography.small, fontSize: 11 },
  chartCard: { gap: spacing.sm },
  section: { gap: spacing.sm },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { ...typography.h3, fontFamily: 'Inter-Semi' },
  seeAll: { fontFamily: 'Inter-Medium', fontSize: 14 },
  quickRow: { flexDirection: 'row', gap: spacing.md },
  quickCard: { padding: 0, overflow: 'hidden' },
  quickGrad: { padding: spacing.md, alignItems: 'center', gap: 8, minHeight: 90, justifyContent: 'center' },
  quickLabel: { fontFamily: 'Inter-Medium', fontSize: 13, textAlign: 'center' },
  workoutRecCard: { width: 160, gap: 8 },
  workoutRecIcon: { width: 48, height: 48, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center' },
  workoutRecTitle: { fontFamily: 'Inter-Semi', fontSize: 15 },
  workoutRecMeta: { ...typography.small, fontSize: 12 },
  workoutRecRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  workoutRecCal: { fontSize: 12, fontFamily: 'Inter-Regular' },
});

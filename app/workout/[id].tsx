import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dumbbell, Flame, Clock, ChevronLeft, Play, Target, Zap,
  Dumbbell as DumbbellIcon, ListChecks, PlayCircle,
} from 'lucide-react-native';
import { useApp } from '@/lib/AppContext';
import { spacing, radii, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { workouts } from '@/lib/data';

export default function WorkoutDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useApp();

  const workout = workouts.find(w => w.id === id) || workouts[0];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft color="#fff" size={24} />
          </TouchableOpacity>
          <View style={[styles.diffBadge, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
            <Text style={styles.diffText}>{workout.difficulty}</Text>
          </View>
        </View>
        <View style={styles.heroIcon}>
          <Dumbbell color="#fff" size={48} />
        </View>
        <Text style={styles.heroCategory}>{workout.category}</Text>
        <Text style={styles.heroTitle}>{workout.title}</Text>
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Clock color="rgba(255,255,255,0.9)" size={18} />
            <Text style={styles.heroStatValue}>{workout.duration}</Text>
            <Text style={styles.heroStatLabel}>min</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Flame color="rgba(255,255,255,0.9)" size={18} />
            <Text style={styles.heroStatValue}>{workout.calories}</Text>
            <Text style={styles.heroStatLabel}>kcal</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <ListChecks color="rgba(255,255,255,0.9)" size={18} />
            <Text style={styles.heroStatValue}>{workout.exercises.length}</Text>
            <Text style={styles.heroStatLabel}>exercises</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Muscle Groups */}
        <Card style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Muscle Groups</Text>
          <View style={styles.tagRow}>
            {workout.muscleGroups.map(m => (
              <View key={m} style={[styles.tag, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30' }]}>
                <Target color={colors.primary} size={13} />
                <Text style={[styles.tagText, { color: colors.primary }]}>{m}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Equipment */}
        <Card style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Equipment</Text>
          <View style={styles.tagRow}>
            {workout.equipment.map(e => (
              <View key={e} style={[styles.tag, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}>
                <DumbbellIcon color={colors.textSecondary} size={13} />
                <Text style={[styles.tagText, { color: colors.textSecondary }]}>{e}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Instructions */}
        <Card style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Instructions</Text>
          {workout.instructions.map((ins, i) => (
            <View key={i} style={styles.instructionRow}>
              <View style={[styles.instructionNum, { backgroundColor: colors.primary }]}>
                <Text style={styles.instructionNumText}>{i + 1}</Text>
              </View>
              <Text style={[styles.instructionText, { color: colors.textSecondary }]}>{ins}</Text>
            </View>
          ))}
        </Card>

        {/* Exercises */}
        {workout.exercises.length > 0 && (
          <Card style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Exercises</Text>
            {workout.exercises.map((ex, i) => (
              <View key={i} style={[styles.exerciseRow, i < workout.exercises.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={[styles.exerciseName, { color: colors.text }]}>{ex.name}</Text>
                  <Text style={[styles.exerciseDetail, { color: colors.textMuted }]}>
                    {ex.sets} sets × {ex.reps} reps · {ex.restSeconds}s rest
                  </Text>
                  <Text style={[styles.exerciseMuscle, { color: colors.textSecondary }]}>{ex.targetMuscle} · {ex.equipment}</Text>
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* Start Button */}
        <TouchableOpacity
          onPress={() => router.push('/workout-session')}
          activeOpacity={0.8}
          style={{ marginTop: spacing.sm }}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startBtn}
          >
            <PlayCircle color="#fff" size={24} />
            <Text style={styles.startBtnText}>Start Workout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { paddingTop: Platform.OS === 'web' ? 24 : 56, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, borderBottomLeftRadius: radii.xl, borderBottomRightRadius: radii.xl },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  diffBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.pill },
  diffText: { color: '#fff', fontFamily: 'Inter-Semi', fontSize: 13 },
  heroIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: spacing.md },
  heroCategory: { color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter-Medium', fontSize: 14, textAlign: 'center', marginTop: spacing.md },
  heroTitle: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 26, textAlign: 'center', marginTop: 4 },
  heroStats: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: spacing.lg, gap: spacing.md },
  heroStat: { alignItems: 'center', gap: 2 },
  heroStatValue: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 22 },
  heroStatLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: 'Inter-Regular' },
  heroStatDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.3)' },
  content: { padding: spacing.lg, gap: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.xxl },
  sectionCard: { gap: spacing.sm },
  sectionTitle: { ...typography.h3, fontFamily: 'Inter-Semi' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 8, borderRadius: radii.pill, borderWidth: 1 },
  tagText: { fontFamily: 'Inter-Medium', fontSize: 13 },
  instructionRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  instructionNum: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  instructionNumText: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 12 },
  instructionText: { flex: 1, fontSize: 14, fontFamily: 'Inter-Regular', lineHeight: 22 },
  exerciseRow: { paddingVertical: spacing.sm },
  exerciseName: { fontFamily: 'Inter-Semi', fontSize: 15 },
  exerciseDetail: { ...typography.small, fontSize: 13 },
  exerciseMuscle: { fontSize: 12, fontFamily: 'Inter-Regular' },
  startBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingVertical: 16, borderRadius: radii.md },
  startBtnText: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 17 },
});

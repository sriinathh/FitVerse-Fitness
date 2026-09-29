import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dumbbell, Flame, Clock, ChevronLeft, Play, Pause, RotateCcw, Check,
  Target, Zap, ChevronRight, X,
} from 'lucide-react-native';
import { useApp } from '@/lib/AppContext';
import { spacing, radii, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { workouts } from '@/lib/data';

export default function WorkoutSessionScreen() {
  const router = useRouter();
  const { colors } = useApp();
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const workout = workouts[0];

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [running]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const toggleExercise = (i: number) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const progress = workout.exercises.length > 0 ? completed.size / workout.exercises.length : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <X color={colors.text} size={22} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{workout.title}</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Timer Hero */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.timerHero}
      >
        <Text style={styles.timerLabel}>Workout Time</Text>
        <Text style={styles.timerValue}>{formatTime(elapsed)}</Text>
        <View style={styles.timerControls}>
          <TouchableOpacity onPress={() => { setElapsed(0); setRunning(false); }} style={styles.timerBtn}>
            <RotateCcw color="#fff" size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRunning(!running)}
            style={[styles.timerPlayBtn, { backgroundColor: '#fff' }]}
          >
            {running ? <Pause color={colors.primary} size={28} fill={colors.primary} /> : <Play color={colors.primary} size={28} fill={colors.primary} />}
          </TouchableOpacity>
          <View style={[styles.timerBtn, { opacity: 0 }]}>
            <RotateCcw color="#fff" size={22} />
          </View>
        </View>
        <Text style={styles.progressLabel}>
          {completed.size}/{workout.exercises.length} exercises completed
        </Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
      </LinearGradient>

      {/* Exercise List */}
      <ScrollView contentContainerStyle={styles.exerciseList} showsVerticalScrollIndicator={false}>
        {workout.exercises.map((ex, i) => {
          const isDone = completed.has(i);
          return (
            <TouchableOpacity key={i} onPress={() => toggleExercise(i)}>
              <Card style={[styles.exerciseCard, isDone && { borderColor: colors.success, backgroundColor: colors.success + '10' }]}>
                <View style={[styles.exerciseNum, { backgroundColor: isDone ? colors.success : colors.primary + '20' }]}>
                  {isDone ? <Check color="#fff" size={16} /> : <Text style={[styles.exerciseNumText, { color: isDone ? '#fff' : colors.primary }]}>{i + 1}</Text>}
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={[styles.exerciseName, { color: colors.text }]}>{ex.name}</Text>
                  <Text style={[styles.exerciseMeta, { color: colors.textMuted }]}>
                    {ex.sets} sets × {ex.reps} reps · {ex.restSeconds}s rest
                  </Text>
                  <Text style={[styles.exerciseMuscle, { color: colors.textSecondary }]}>Target: {ex.targetMuscle}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}

        {/* Instructions */}
        <Card style={styles.instructionsCard}>
          <Text style={[styles.instructionsTitle, { color: colors.text }]}>Workout Instructions</Text>
          {workout.instructions.map((ins, i) => (
            <View key={i} style={styles.instructionRow}>
              <View style={[styles.instructionDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.instructionText, { color: colors.textSecondary }]}>{ins}</Text>
            </View>
          ))}
        </Card>

        {/* Finish Button */}
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.8}
          style={styles.finishBtn}
        >
          <LinearGradient
            colors={[colors.success, '#16A34A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.finishBtnGrad}
          >
            <Check color="#fff" size={22} />
            <Text style={styles.finishBtnText}>Finish Workout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingTop: Platform.OS === 'web' ? 16 : 56, paddingBottom: spacing.md, borderBottomWidth: 1 },
  headerBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontFamily: 'Inter-Bold', fontSize: 18 },
  timerHero: { padding: spacing.xl, alignItems: 'center', gap: 10 },
  timerLabel: { color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter-Medium', fontSize: 14 },
  timerValue: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 56, lineHeight: 62 },
  timerControls: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginTop: 8 },
  timerBtn: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)' },
  timerPlayBtn: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center' },
  progressLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontFamily: 'Inter-Regular', marginTop: 8 },
  progressBarTrack: { width: '100%', height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)', overflow: 'hidden' },
  progressBarFill: { height: 6, borderRadius: 3, backgroundColor: '#fff' },
  exerciseList: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  exerciseCard: { flexDirection: 'row', gap: spacing.md, alignItems: 'center', borderWidth: 1.5 },
  exerciseNum: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  exerciseNumText: { fontFamily: 'Inter-Bold', fontSize: 16 },
  exerciseName: { fontFamily: 'Inter-Semi', fontSize: 16 },
  exerciseMeta: { ...typography.small, fontSize: 13 },
  exerciseMuscle: { fontSize: 12, fontFamily: 'Inter-Regular' },
  instructionsCard: { gap: 10 },
  instructionsTitle: { fontFamily: 'Inter-Semi', fontSize: 16 },
  instructionRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  instructionDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
  instructionText: { flex: 1, fontSize: 14, fontFamily: 'Inter-Regular', lineHeight: 22 },
  finishBtn: { marginTop: spacing.sm },
  finishBtnGrad: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingVertical: 16, borderRadius: radii.md },
  finishBtnText: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 16 },
});

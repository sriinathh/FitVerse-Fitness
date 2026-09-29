import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Search, Dumbbell, Filter } from 'lucide-react-native';
import { useApp } from '@/lib/AppContext';
import { spacing, radii, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { exercises } from '@/lib/data';

const allExercises = [
  ...exercises,
  { id: 'e7', name: 'Deadlift', sets: 4, reps: 8, equipment: 'Barbell', targetMuscle: 'Back', instructions: 'Keep back straight, lift barbell from ground to hip level.', restSeconds: 90 },
  { id: 'e8', name: 'Bench Press', sets: 4, reps: 10, equipment: 'Barbell', targetMuscle: 'Chest', instructions: 'Lower barbell to chest, press up explosively.', restSeconds: 60 },
  { id: 'e9', name: 'Pull-ups', sets: 3, reps: 8, equipment: 'Bar', targetMuscle: 'Back', instructions: 'Hang from bar, pull body up until chin clears bar.', restSeconds: 60 },
  { id: 'e10', name: 'Shoulder Press', sets: 3, reps: 12, equipment: 'Dumbbells', targetMuscle: 'Shoulders', instructions: 'Press dumbbells overhead from shoulder height.', restSeconds: 45 },
  { id: 'e11', name: 'Bicep Curls', sets: 3, reps: 12, equipment: 'Dumbbells', targetMuscle: 'Biceps', instructions: 'Curl dumbbells from extended arms to shoulders.', restSeconds: 30 },
  { id: 'e12', name: 'Russian Twists', sets: 3, reps: 20, equipment: 'Weight', targetMuscle: 'Core', instructions: 'Sit with knees bent, twist torso side to side with weight.', restSeconds: 30 },
  { id: 'e13', name: 'Jump Rope', sets: 4, reps: 1, equipment: 'Rope', targetMuscle: 'Cardio', instructions: 'Jump rope continuously for 60 seconds per set.', restSeconds: 30 },
  { id: 'e14', name: 'Glute Bridge', sets: 3, reps: 15, equipment: 'None', targetMuscle: 'Glutes', instructions: 'Lie on back, lift hips by squeezing glutes.', restSeconds: 45 },
  { id: 'e15', name: 'Tricep Dips', sets: 3, reps: 12, equipment: 'Bench', targetMuscle: 'Triceps', instructions: 'Support body on bench behind you, lower and push up.', restSeconds: 45 },
];

const muscleFilters = ['All', 'Chest', 'Back', 'Legs', 'Core', 'Shoulders', 'Cardio'];

export default function ExerciseLibraryScreen() {
  const router = useRouter();
  const { colors } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = allExercises.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || e.targetMuscle === filter || e.targetMuscle.includes(filter);
    return matchesSearch && matchesFilter;
  });

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <ChevronLeft color={colors.text} size={22} />
        </TouchableOpacity>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Exercise Library</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Search */}
      <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Search color={colors.textMuted} size={18} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search exercises..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filter Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.xs }}>
        {muscleFilters.map(m => {
          const active = filter === m;
          return (
            <TouchableOpacity
              key={m}
              onPress={() => setFilter(m)}
              style={[
                styles.filterPill,
                { backgroundColor: active ? colors.primary : colors.card, borderColor: active ? colors.primary : colors.border },
              ]}
            >
              <Text style={{ color: active ? '#fff' : colors.textSecondary, fontFamily: 'Inter-Medium', fontSize: 13 }}>{m}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Exercise List */}
      <Text style={[styles.resultCount, { color: colors.textMuted }]}>{filtered.length} exercises</Text>

      {filtered.map(ex => (
        <Card key={ex.id} style={styles.exerciseCard}>
          <View style={[styles.exerciseIcon, { backgroundColor: colors.primary + '15' }]}>
            <Dumbbell color={colors.primary} size={22} />
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={[styles.exerciseName, { color: colors.text }]}>{ex.name}</Text>
            <Text style={[styles.exerciseMeta, { color: colors.textMuted }]}>
              {ex.sets} sets × {ex.reps} reps · {ex.equipment}
            </Text>
            <View style={styles.muscleTagRow}>
              <View style={[styles.muscleTag, { backgroundColor: colors.secondary + '15' }]}>
                <Text style={[styles.muscleTagText, { color: colors.secondary }]}>{ex.targetMuscle}</Text>
              </View>
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: Platform.OS === 'web' ? 0 : 20 },
  backBtn: { width: 44, height: 44, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  pageTitle: { ...typography.h1, fontFamily: 'Inter-Bold', fontSize: 22 },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 12 },
  searchInput: { flex: 1, fontSize: 15, fontFamily: 'Inter-Regular' },
  filterPill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, borderWidth: 1 },
  resultCount: { ...typography.small, fontSize: 13 },
  exerciseCard: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  exerciseIcon: { width: 48, height: 48, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center' },
  exerciseName: { fontFamily: 'Inter-Semi', fontSize: 16 },
  exerciseMeta: { ...typography.small, fontSize: 13 },
  muscleTagRow: { flexDirection: 'row', gap: 6 },
  muscleTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: radii.sm },
  muscleTagText: { fontFamily: 'Inter-Medium', fontSize: 11 },
});

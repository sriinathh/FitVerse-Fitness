import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Dumbbell, Flame, Clock, Search, Layers, Zap, Home, Heart, Footprints, Bike,
  ChevronRight, Sparkles,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/lib/AppContext';
import { spacing, radii, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { workouts, workoutPlans } from '@/lib/data';
import type { WorkoutCategory } from '@/lib/types';

const categories: { key: WorkoutCategory | 'All'; icon: any }[] = [
  { key: 'All', icon: Layers },
  { key: 'Strength', icon: Dumbbell },
  { key: 'Cardio', icon: Heart },
  { key: 'HIIT', icon: Zap },
  { key: 'Yoga', icon: Sparkles },
  { key: 'Running', icon: Footprints },
  { key: 'Cycling', icon: Bike },
];

const planIcons: Record<string, any> = {
  Sparkles, Flame, Dumbbell, Home, Layers, Zap,
};

export default function WorkoutsScreen() {
  const router = useRouter();
  const { colors } = useApp();
  const [activeCategory, setActiveCategory] = useState<WorkoutCategory | 'All'>('All');
  const [search, setSearch] = useState('');

  const filtered = workouts.filter(w => {
    const matchesCat = activeCategory === 'All' || w.category === activeCategory;
    const matchesSearch = w.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={[styles.pageTitle, { color: colors.text }]}>Workouts</Text>
      <Text style={[styles.pageSub, { color: colors.textMuted }]}>Find your perfect workout</Text>

      {/* Search */}
      <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Search color={colors.textMuted} size={18} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search workouts..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.xs }}>
        {categories.map(c => {
          const Icon = c.icon;
          const active = activeCategory === c.key;
          return (
            <TouchableOpacity
              key={c.key}
              onPress={() => setActiveCategory(c.key)}
              style={[
                styles.catPill,
                { backgroundColor: active ? colors.primary : colors.card, borderColor: active ? colors.primary : colors.border },
              ]}
            >
              <Icon color={active ? '#fff' : colors.textSecondary} size={16} />
              <Text style={{ color: active ? '#fff' : colors.textSecondary, fontFamily: 'Inter-Medium', fontSize: 13 }}>
                {c.key}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Workout Plans */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Workout Plans</Text>
          <TouchableOpacity onPress={() => router.push('/workout-plans')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
          {workoutPlans.slice(0, 3).map(p => {
            const Icon = planIcons[p.icon] || Dumbbell;
            return (
              <TouchableOpacity key={p.id} onPress={() => router.push('/workout-plans')}>
                <Card style={{ width: 220, padding: 0, overflow: 'hidden' }}>
                  <LinearGradient
                    colors={[p.color + '30', p.color + '08']}
                    style={styles.planCardTop}
                  >
                    <View style={[styles.planIcon, { backgroundColor: p.color }]}>
                      <Icon color="#fff" size={22} />
                    </View>
                    <View style={[styles.planLevel, { backgroundColor: p.color + '25' }]}>
                      <Text style={[styles.planLevelText, { color: p.color }]}>{p.level}</Text>
                    </View>
                  </LinearGradient>
                  <View style={{ padding: spacing.md, gap: 6 }}>
                    <Text style={[styles.planTitle, { color: colors.text }]}>{p.title}</Text>
                    <Text style={[styles.planDesc, { color: colors.textMuted }]} numberOfLines={2}>{p.description}</Text>
                    <View style={styles.planMetaRow}>
                      <Text style={[styles.planMeta, { color: colors.textSecondary }]}>{p.duration}</Text>
                      <Text style={[styles.planMeta, { color: colors.textMuted }]}>·</Text>
                      <Text style={[styles.planMeta, { color: colors.textSecondary }]}>{p.workoutsPerWeek}x/week</Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Workout List */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {activeCategory === 'All' ? 'All Workouts' : activeCategory} ({filtered.length})
        </Text>
        <View style={{ gap: spacing.md }}>
          {filtered.map(w => (
            <TouchableOpacity key={w.id} onPress={() => router.push(`/workout/${w.id}`)}>
              <Card style={styles.workoutCard}>
                <View style={[styles.workoutIcon, { backgroundColor: colors.primary + '15' }]}>
                  <Dumbbell color={colors.primary} size={24} />
                </View>
                <View style={styles.workoutInfo}>
                  <Text style={[styles.workoutTitle, { color: colors.text }]}>{w.title}</Text>
                  <Text style={[styles.workoutCat, { color: colors.textMuted }]}>{w.category} · {w.difficulty}</Text>
                  <View style={styles.workoutMetaRow}>
                    <View style={styles.workoutMetaItem}>
                      <Clock color={colors.textMuted} size={13} />
                      <Text style={[styles.workoutMetaText, { color: colors.textSecondary }]}>{w.duration} min</Text>
                    </View>
                    <View style={styles.workoutMetaItem}>
                      <Flame color={colors.danger} size={13} />
                      <Text style={[styles.workoutMetaText, { color: colors.textSecondary }]}>{w.calories} kcal</Text>
                    </View>
                  </View>
                </View>
                <ChevronRight color={colors.textMuted} size={20} />
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  pageTitle: { ...typography.h1, fontFamily: 'Inter-Bold', fontSize: 26 },
  pageSub: { ...typography.caption, marginBottom: spacing.xs },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 12 },
  searchInput: { flex: 1, fontSize: 15, fontFamily: 'Inter-Regular' },
  catPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: radii.pill, borderWidth: 1 },
  section: { gap: spacing.sm },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { ...typography.h3, fontFamily: 'Inter-Semi' },
  seeAll: { fontFamily: 'Inter-Medium', fontSize: 14 },
  planCardTop: { padding: spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  planIcon: { width: 44, height: 44, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center' },
  planLevel: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radii.pill },
  planLevelText: { fontFamily: 'Inter-Semi', fontSize: 12 },
  planTitle: { fontFamily: 'Inter-Semi', fontSize: 16 },
  planDesc: { ...typography.small, fontSize: 13, lineHeight: 18 },
  planMetaRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  planMeta: { fontSize: 12, fontFamily: 'Inter-Regular' },
  workoutCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  workoutIcon: { width: 52, height: 52, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center' },
  workoutInfo: { flex: 1, gap: 4 },
  workoutTitle: { fontFamily: 'Inter-Semi', fontSize: 16 },
  workoutCat: { ...typography.small, fontSize: 13 },
  workoutMetaRow: { flexDirection: 'row', gap: spacing.md, marginTop: 2 },
  workoutMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  workoutMetaText: { fontSize: 12, fontFamily: 'Inter-Regular' },
});

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Dumbbell, Flame, Home, Layers, Zap, Sparkles, Clock, TrendingUp } from 'lucide-react-native';
import { useApp } from '@/lib/AppContext';
import { spacing, radii, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { workoutPlans } from '@/lib/data';

const planIcons: Record<string, any> = {
  Sparkles, Flame, Dumbbell, Home, Layers, Zap,
};

export default function WorkoutPlansScreen() {
  const router = useRouter();
  const { colors } = useApp();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <ChevronLeft color={colors.text} size={22} />
        </TouchableOpacity>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Workout Plans</Text>
        <View style={{ width: 44 }} />
      </View>

      <Text style={[styles.pageSub, { color: colors.textMuted }]}>Choose a plan that fits your goals</Text>

      {workoutPlans.map(p => {
        const Icon = planIcons[p.icon] || Dumbbell;
        return (
          <TouchableOpacity key={p.id} onPress={() => router.push('/(tabs)/workouts')}>
            <Card style={styles.planCard}>
              <LinearGradient
                colors={[p.color + '25', p.color + '05']}
                style={styles.planCardIcon}
              >
                <View style={[styles.planIconCircle, { backgroundColor: p.color }]}>
                  <Icon color="#fff" size={24} />
                </View>
              </LinearGradient>
              <View style={{ flex: 1, gap: 6 }}>
                <View style={styles.planTitleRow}>
                  <Text style={[styles.planTitle, { color: colors.text }]}>{p.title}</Text>
                  <View style={[styles.planLevelBadge, { backgroundColor: p.color + '20' }]}>
                    <Text style={[styles.planLevelText, { color: p.color }]}>{p.level}</Text>
                  </View>
                </View>
                <Text style={[styles.planDesc, { color: colors.textMuted }]}>{p.description}</Text>
                <View style={styles.planMetaRow}>
                  <View style={styles.planMetaItem}>
                    <Clock color={colors.textMuted} size={13} />
                    <Text style={[styles.planMetaText, { color: colors.textSecondary }]}>{p.duration}</Text>
                  </View>
                  <View style={styles.planMetaItem}>
                    <TrendingUp color={colors.textMuted} size={13} />
                    <Text style={[styles.planMetaText, { color: colors.textSecondary }]}>{p.workoutsPerWeek}x/week</Text>
                  </View>
                  <View style={styles.planMetaItem}>
                    <Dumbbell color={colors.textMuted} size={13} />
                    <Text style={[styles.planMetaText, { color: colors.textSecondary }]}>{p.category}</Text>
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: Platform.OS === 'web' ? 0 : 20 },
  backBtn: { width: 44, height: 44, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  pageTitle: { ...typography.h1, fontFamily: 'Inter-Bold', fontSize: 22 },
  pageSub: { ...typography.caption, marginBottom: spacing.xs },
  planCard: { flexDirection: 'row', gap: spacing.md, padding: 0, overflow: 'hidden' },
  planCardIcon: { width: 80, justifyContent: 'center', alignItems: 'center' },
  planIconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  planTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  planTitle: { fontFamily: 'Inter-Bold', fontSize: 17 },
  planLevelBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: radii.pill },
  planLevelText: { fontFamily: 'Inter-Semi', fontSize: 11 },
  planDesc: { ...typography.small, fontSize: 13, lineHeight: 18 },
  planMetaRow: { flexDirection: 'row', gap: spacing.md, flexWrap: 'wrap' },
  planMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  planMetaText: { fontSize: 12, fontFamily: 'Inter-Regular' },
});

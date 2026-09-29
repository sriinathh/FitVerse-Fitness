import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Apple, Coffee, Sun, Moon, Cookie, Plus, Droplets, Flame, Beef, Wheat, Droplet } from 'lucide-react-native';
import { useApp } from '@/lib/AppContext';
import { spacing, radii, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { nutritionEntries, todayStats } from '@/lib/data';
import type { NutritionEntry } from '@/lib/types';

const mealIcons: Record<string, any> = {
  Breakfast: Coffee, Lunch: Sun, Dinner: Moon, Snacks: Cookie,
};

const mealColors: Record<string, string> = {
  Breakfast: '#F59E0B', Lunch: '#22C55E', Dinner: '#7C3AED', Snacks: '#06B6D4',
};

export default function NutritionScreen() {
  const { colors } = useApp();
  const [entries, setEntries] = useState<NutritionEntry[]>(nutritionEntries);

  const totals = entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const calorieGoal = 2200;
  const proteinGoal = 150;
  const carbsGoal = 250;
  const fatGoal = 70;

  const meals: NutritionEntry['meal'][] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={[styles.pageTitle, { color: colors.text }]}>Nutrition</Text>
      <Text style={[styles.pageSub, { color: colors.textMuted }]}>Track your daily meals</Text>

      {/* Calorie Hero */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.calorieHero}
      >
        <View style={styles.calorieTopRow}>
          <Flame color="rgba(255,255,255,0.9)" size={20} />
          <Text style={styles.calorieHeroLabel}>Daily Calories</Text>
        </View>
        <Text style={styles.calorieHeroValue}>{totals.calories}</Text>
        <Text style={styles.calorieHeroGoal}>of {calorieGoal} kcal</Text>
        <View style={styles.calorieBarTrack}>
          <View style={[styles.calorieBarFill, { width: `${Math.min((totals.calories / calorieGoal) * 100, 100)}%` }]} />
        </View>
        <Text style={styles.calorieRemaining}>
          {calorieGoal - totals.calories} kcal remaining
        </Text>
      </LinearGradient>

      {/* Macros */}
      <View style={styles.macrosRow}>
        {[
          { label: 'Protein', value: totals.protein, goal: proteinGoal, unit: 'g', icon: Beef, color: colors.danger },
          { label: 'Carbs', value: totals.carbs, goal: carbsGoal, unit: 'g', icon: Wheat, color: colors.warning },
          { label: 'Fat', value: totals.fat, goal: fatGoal, unit: 'g', icon: Droplet, color: colors.primary },
        ].map(m => {
          const Icon = m.icon;
          return (
            <Card key={m.label} style={styles.macroCard}>
              <View style={[styles.macroIcon, { backgroundColor: m.color + '20' }]}>
                <Icon color={m.color} size={16} />
              </View>
              <Text style={[styles.macroValue, { color: colors.text }]}>{m.value}<Text style={[styles.macroUnit, { color: colors.textMuted }]}>/{m.goal}{m.unit}</Text></Text>
              <Text style={[styles.macroLabel, { color: colors.textMuted }]}>{m.label}</Text>
              <ProgressBar progress={m.value / m.goal} color={m.color} height={4} />
            </Card>
          );
        })}
      </View>

      {/* Water */}
      <Card style={styles.waterCard}>
        <View style={styles.waterTopRow}>
          <View style={[styles.waterIcon, { backgroundColor: '#06B6D4' + '20' }]}>
            <Droplets color="#06B6D4" size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.waterTitle, { color: colors.text }]}>Water Intake</Text>
            <Text style={[styles.waterSub, { color: colors.textMuted }]}>{todayStats.water}L of {todayStats.waterGoal}L</Text>
          </View>
          <Text style={[styles.waterPct, { color: '#06B6D4' }]}>{Math.round((todayStats.water / todayStats.waterGoal) * 100)}%</Text>
        </View>
        <View style={styles.waterGlassesRow}>
          {Array.from({ length: 8 }).map((_, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.waterGlass,
                {
                  backgroundColor: i < Math.round((todayStats.water / todayStats.waterGoal) * 8) ? '#06B6D4' : colors.surfaceAlt,
                  borderColor: i < Math.round((todayStats.water / todayStats.waterGoal) * 8) ? '#06B6D4' : colors.border,
                },
              ]}
            >
              <Droplets color={i < Math.round((todayStats.water / todayStats.waterGoal) * 8) ? '#fff' : colors.textMuted} size={14} />
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Meals */}
      {meals.map(meal => {
        const mealEntries = entries.filter(e => e.meal === meal);
        const mealCalories = mealEntries.reduce((sum, e) => sum + e.calories, 0);
        const Icon = mealIcons[meal];
        const color = mealColors[meal];

        return (
          <View key={meal} style={styles.mealSection}>
            <View style={styles.mealHeader}>
              <View style={[styles.mealIcon, { backgroundColor: color + '20' }]}>
                <Icon color={color} size={18} />
              </View>
              <Text style={[styles.mealTitle, { color: colors.text }]}>{meal}</Text>
              <Text style={[styles.mealCals, { color: colors.textMuted }]}>{mealCalories} kcal</Text>
              <TouchableOpacity style={[styles.addBtn, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <Plus color={colors.primary} size={16} />
              </TouchableOpacity>
            </View>
            {mealEntries.length > 0 ? (
              <View style={{ gap: 8 }}>
                {mealEntries.map(e => (
                  <Card key={e.id} style={styles.foodCard}>
                    <View style={styles.foodInfo}>
                      <Text style={[styles.foodName, { color: colors.text }]}>{e.name}</Text>
                      <Text style={[styles.foodServing, { color: colors.textMuted }]}>{e.serving} · P{e.protein} C{e.carbs} F{e.fat}</Text>
                    </View>
                    <Text style={[styles.foodCals, { color: colors.text }]}>{e.calories} kcal</Text>
                  </Card>
                ))}
              </View>
            ) : (
              <TouchableOpacity>
                <Card style={[styles.emptyMeal, { borderColor: colors.border }]}>
                  <Text style={[styles.emptyMealText, { color: colors.textMuted }]}>No items logged. Tap + to add food.</Text>
                </Card>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  pageTitle: { ...typography.h1, fontFamily: 'Inter-Bold', fontSize: 26 },
  pageSub: { ...typography.caption, marginBottom: spacing.xs },
  calorieHero: { borderRadius: radii.xl, padding: spacing.lg, gap: 6 },
  calorieTopRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  calorieHeroLabel: { color: '#fff', fontFamily: 'Inter-Medium', fontSize: 14 },
  calorieHeroValue: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 40, lineHeight: 44 },
  calorieHeroGoal: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontFamily: 'Inter-Regular' },
  calorieBarTrack: { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.25)', overflow: 'hidden', marginTop: 8 },
  calorieBarFill: { height: 8, borderRadius: 4, backgroundColor: '#fff' },
  calorieRemaining: { color: 'rgba(255,255,255,0.9)', fontSize: 13, fontFamily: 'Inter-Regular', marginTop: 4 },
  macrosRow: { flexDirection: 'row', gap: spacing.sm },
  macroCard: { flex: 1, gap: 6 },
  macroIcon: { width: 32, height: 32, borderRadius: radii.sm, justifyContent: 'center', alignItems: 'center' },
  macroValue: { fontFamily: 'Inter-Bold', fontSize: 16 },
  macroUnit: { fontSize: 11, fontFamily: 'Inter-Regular' },
  macroLabel: { ...typography.small, fontSize: 11 },
  waterCard: { gap: spacing.sm },
  waterTopRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  waterIcon: { width: 40, height: 40, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center' },
  waterTitle: { fontFamily: 'Inter-Semi', fontSize: 16 },
  waterSub: { ...typography.small, fontSize: 12 },
  waterPct: { fontFamily: 'Inter-Bold', fontSize: 18 },
  waterGlassesRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  waterGlass: { width: 36, height: 36, borderRadius: radii.sm, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  mealSection: { gap: 8 },
  mealHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mealIcon: { width: 36, height: 36, borderRadius: radii.sm, justifyContent: 'center', alignItems: 'center' },
  mealTitle: { fontFamily: 'Inter-Semi', fontSize: 16, flex: 1 },
  mealCals: { fontSize: 13, fontFamily: 'Inter-Regular' },
  addBtn: { width: 32, height: 32, borderRadius: radii.sm, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  foodCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.sm },
  foodInfo: { flex: 1, gap: 2 },
  foodName: { fontFamily: 'Inter-Medium', fontSize: 14 },
  foodServing: { ...typography.small, fontSize: 11 },
  foodCals: { fontFamily: 'Inter-Bold', fontSize: 14 },
  emptyMeal: { borderWidth: 1, borderStyle: 'dashed', alignItems: 'center', padding: spacing.md },
  emptyMealText: { ...typography.small, fontSize: 13 },
});

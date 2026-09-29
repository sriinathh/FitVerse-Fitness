import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Animated, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Dumbbell, ChevronRight, ChevronLeft, User, Target, Activity, Heart, Check, Flame } from 'lucide-react-native';
import { useApp } from '@/lib/AppContext';
import { spacing, radii, typography } from '@/lib/theme';
import type { UserProfile } from '@/lib/types';

const TOTAL_STEPS = 4;

export default function OnboardingScreen() {
  const router = useRouter();
  const { colors, completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [form, setForm] = useState<Partial<UserProfile>>({
    name: '',
    age: 25,
    gender: 'male' as const,
    height: 175,
    weight: 75,
    goal: 'stay_fit' as const,
    activityLevel: 'moderate' as const,
    preferredWorkout: 'strength' as const,
  });

  const fadeTo = (newStep: number) => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
      setStep(newStep);
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    });
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) fadeTo(step + 1);
    else finish();
  };

  const prev = () => {
    if (step > 0) fadeTo(step - 1);
  };

  const finish = () => {
    completeOnboarding({ ...(form as UserProfile), onboarded: true });
    router.replace('/(tabs)');
  };

  const canProceed = step === 0 ? (form.name?.length ?? 0) > 0 : true;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.background, colors.surfaceAlt]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <View style={styles.logoRow}>
          <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.logoBadge}>
            <Dumbbell color="#fff" size={22} />
          </LinearGradient>
          <Text style={[styles.logoText, { color: colors.text }]}>FitVerse</Text>
        </View>
        <Text style={[styles.tagline, { color: colors.textMuted }]}>Train Smarter. Live Stronger.</Text>

        <View style={styles.dotsRow}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i <= step ? colors.primary : colors.border, width: i === step ? 24 : 8 },
              ]}
            />
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
          {step === 0 && (
            <StepPersonal form={form} setForm={setForm} colors={colors} />
          )}
          {step === 1 && (
            <StepBody form={form} setForm={setForm} colors={colors} />
          )}
          {step === 2 && (
            <StepGoal form={form} setForm={setForm} colors={colors} />
          )}
          {step === 3 && (
            <StepActivity form={form} setForm={setForm} colors={colors} />
          )}
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        {step > 0 && (
          <TouchableOpacity onPress={prev} style={[styles.navBtn, { borderColor: colors.border }]}>
            <ChevronLeft color={colors.text} size={22} />
            <Text style={[styles.navBtnText, { color: colors.text }]}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={next}
          disabled={!canProceed}
          style={[styles.navBtnPrimary, !canProceed && { opacity: 0.4 }]}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.navBtnGrad}
          >
            <Text style={styles.navBtnPrimaryText}>
              {step === TOTAL_STEPS - 1 ? 'Get Started' : 'Continue'}
            </Text>
            <ChevronRight color="#fff" size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StepPersonal({ form, setForm, colors }: any) {
  const genders: { key: string; label: string }[] = [
    { key: 'male', label: 'Male' },
    { key: 'female', label: 'Female' },
    { key: 'other', label: 'Other' },
  ];

  return (
    <View style={styles.step}>
      <View style={[styles.stepIcon, { backgroundColor: colors.primary + '20' }]}>
        <User color={colors.primary} size={28} />
      </View>
      <Text style={[styles.stepTitle, { color: colors.text }]}>Tell us about you</Text>
      <Text style={[styles.stepSub, { color: colors.textMuted }]}>Let's start with the basics</Text>

      <View style={styles.field}>
        <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Full Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          placeholder="Enter your name"
          placeholderTextColor={colors.textMuted}
          value={form.name ?? ''}
          onChangeText={(v) => setForm({ ...form, name: v })}
        />
      </View>

      <View style={styles.field}>
        <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Age</Text>
        <View style={styles.stepperRow}>
          <TouchableOpacity
            style={[styles.stepperBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
            onPress={() => setForm({ ...form, age: Math.max(13, form.age - 1) })}
          >
            <Text style={{ color: colors.text, fontSize: 20 }}>−</Text>
          </TouchableOpacity>
          <Text style={[styles.stepperValue, { color: colors.text }]}>{form.age}</Text>
          <TouchableOpacity
            style={[styles.stepperBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
            onPress={() => setForm({ ...form, age: Math.min(100, form.age + 1) })}
          >
            <Text style={{ color: colors.text, fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Gender</Text>
        <View style={styles.optionsRow}>
          {genders.map(g => (
            <TouchableOpacity
              key={g.key}
              onPress={() => setForm({ ...form, gender: g.key })}
              style={[
                styles.optionPill,
                {
                  borderColor: form.gender === g.key ? colors.primary : colors.border,
                  backgroundColor: form.gender === g.key ? colors.primary + '15' : colors.card,
                },
              ]}
            >
              <Text style={{ color: form.gender === g.key ? colors.primary : colors.textSecondary, fontFamily: 'Inter-Medium', fontSize: 14 }}>
                {g.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

function StepBody({ form, setForm, colors }: any) {
  return (
    <View style={styles.step}>
      <View style={[styles.stepIcon, { backgroundColor: colors.secondary + '20' }]}>
        <Heart color={colors.secondary} size={28} />
      </View>
      <Text style={[styles.stepTitle, { color: colors.text }]}>Body Metrics</Text>
      <Text style={[styles.stepSub, { color: colors.textMuted }]}>Used to calculate your targets</Text>

      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.metricLabel, { color: colors.textMuted }]}>Height</Text>
          <Text style={[styles.metricValue, { color: colors.text }]}>{form.height}</Text>
          <Text style={[styles.metricUnit, { color: colors.textMuted }]}>cm</Text>
          <View style={styles.metricSliderRow}>
            <TouchableOpacity onPress={() => setForm({ ...form, height: Math.max(120, form.height - 1) })} style={[styles.stepperBtn, { borderColor: colors.border }]}>
              <Text style={{ color: colors.text }}>−</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setForm({ ...form, height: Math.min(250, form.height + 1) })} style={[styles.stepperBtn, { borderColor: colors.border }]}>
              <Text style={{ color: colors.text }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.metricLabel, { color: colors.textMuted }]}>Weight</Text>
          <Text style={[styles.metricValue, { color: colors.text }]}>{form.weight}</Text>
          <Text style={[styles.metricUnit, { color: colors.textMuted }]}>kg</Text>
          <View style={styles.metricSliderRow}>
            <TouchableOpacity onPress={() => setForm({ ...form, weight: Math.max(30, form.weight - 1) })} style={[styles.stepperBtn, { borderColor: colors.border }]}>
              <Text style={{ color: colors.text }}>−</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setForm({ ...form, weight: Math.min(300, form.weight + 1) })} style={[styles.stepperBtn, { borderColor: colors.border }]}>
              <Text style={{ color: colors.text }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={[styles.bmiCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30' }]}>
        <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Your BMI</Text>
        <Text style={[styles.bmiValue, { color: colors.primary }]}>
          {(form.weight / Math.pow(form.height / 100, 2)).toFixed(1)}
        </Text>
        <Text style={[styles.metricUnit, { color: colors.textMuted }]}>
          {(() => {
            const bmi = form.weight / Math.pow(form.height / 100, 2);
            if (bmi < 18.5) return 'Underweight';
            if (bmi < 25) return 'Normal weight';
            if (bmi < 30) return 'Overweight';
            return 'Obese';
          })()}
        </Text>
      </View>
    </View>
  );
}

function StepGoal({ form, setForm, colors }: any) {
  const goals: { key: string; label: string; desc: string; icon: any }[] = [
    { key: 'lose_weight', label: 'Lose Weight', desc: 'Burn fat and get leaner', icon: Flame },
    { key: 'build_muscle', label: 'Build Muscle', desc: 'Gain strength and size', icon: Dumbbell },
    { key: 'stay_fit', label: 'Stay Fit', desc: 'Maintain overall health', icon: Heart },
    { key: 'improve_endurance', label: 'Improve Endurance', desc: 'Boost stamina and energy', icon: Activity },
  ];

  return (
    <View style={styles.step}>
      <View style={[styles.stepIcon, { backgroundColor: colors.success + '20' }]}>
        <Target color={colors.success} size={28} />
      </View>
      <Text style={[styles.stepTitle, { color: colors.text }]}>What's your goal?</Text>
      <Text style={[styles.stepSub, { color: colors.textMuted }]}>We'll personalize your plan</Text>

      {goals.map(g => {
        const Icon = g.icon;
        const selected = form.goal === g.key;
        return (
          <TouchableOpacity
            key={g.key}
            onPress={() => setForm({ ...form, goal: g.key })}
            style={[
              styles.goalCard,
              {
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? colors.primary + '10' : colors.card,
              },
            ]}
          >
            <View style={[styles.goalIcon, { backgroundColor: selected ? colors.primary : colors.surfaceAlt }]}>
              <Icon color={selected ? '#fff' : colors.textSecondary} size={20} />
            </View>
            <View style={styles.goalText}>
              <Text style={[styles.goalLabel, { color: colors.text }]}>{g.label}</Text>
              <Text style={[styles.goalDesc, { color: colors.textMuted }]}>{g.desc}</Text>
            </View>
            {selected && (
              <View style={[styles.checkCircle, { backgroundColor: colors.primary }]}>
                <Check color="#fff" size={16} />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function StepActivity({ form, setForm, colors }: any) {
  const levels: { key: string; label: string; desc: string }[] = [
    { key: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
    { key: 'light', label: 'Light', desc: '1-3 days per week' },
    { key: 'moderate', label: 'Moderate', desc: '3-5 days per week' },
    { key: 'active', label: 'Active', desc: '6-7 days per week' },
    { key: 'very_active', label: 'Very Active', desc: 'Twice per day' },
  ];

  const workouts: { key: string; label: string }[] = [
    { key: 'strength', label: 'Strength' },
    { key: 'cardio', label: 'Cardio' },
    { key: 'yoga', label: 'Yoga' },
    { key: 'hiit', label: 'HIIT' },
    { key: 'running', label: 'Running' },
    { key: 'cycling', label: 'Cycling' },
  ];

  return (
    <View style={styles.step}>
      <View style={[styles.stepIcon, { backgroundColor: colors.warning + '20' }]}>
        <Activity color={colors.warning} size={28} />
      </View>
      <Text style={[styles.stepTitle, { color: colors.text }]}>Activity & Preferences</Text>
      <Text style={[styles.stepSub, { color: colors.textMuted }]}>Almost there!</Text>

      <Text style={[styles.fieldLabel, { color: colors.textSecondary, marginBottom: spacing.sm }]}>Activity Level</Text>
      {levels.map(l => {
        const selected = form.activityLevel === l.key;
        return (
          <TouchableOpacity
            key={l.key}
            onPress={() => setForm({ ...form, activityLevel: l.key })}
            style={[
              styles.goalCard,
              {
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? colors.primary + '10' : colors.card,
              },
            ]}
          >
            <View style={styles.goalText}>
              <Text style={[styles.goalLabel, { color: colors.text }]}>{l.label}</Text>
              <Text style={[styles.goalDesc, { color: colors.textMuted }]}>{l.desc}</Text>
            </View>
            {selected && <Check color={colors.primary} size={20} />}
          </TouchableOpacity>
        );
      })}

      <Text style={[styles.fieldLabel, { color: colors.textSecondary, marginTop: spacing.md, marginBottom: spacing.sm }]}>Preferred Workout Type</Text>
      <View style={styles.wrapRow}>
        {workouts.map(w => {
          const selected = form.preferredWorkout === w.key;
          return (
            <TouchableOpacity
              key={w.key}
              onPress={() => setForm({ ...form, preferredWorkout: w.key })}
              style={[
                styles.optionPill,
                {
                  borderColor: selected ? colors.primary : colors.border,
                  backgroundColor: selected ? colors.primary + '15' : colors.card,
                },
              ]}
            >
              <Text style={{ color: selected ? colors.primary : colors.textSecondary, fontFamily: 'Inter-Medium', fontSize: 14 }}>
                {w.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: Platform.OS === 'web' ? 24 : 56, paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoBadge: { width: 40, height: 40, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center' },
  logoText: { ...typography.h1, fontFamily: 'Inter-Bold' },
  tagline: { ...typography.caption, marginTop: 4 },
  dotsRow: { flexDirection: 'row', gap: 8, marginTop: spacing.md },
  dot: { height: 8, borderRadius: 4 },
  scroll: { paddingHorizontal: spacing.lg, flexGrow: 1 },
  step: { gap: spacing.md, paddingBottom: spacing.xl },
  stepIcon: { width: 56, height: 56, borderRadius: radii.lg, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.xs },
  stepTitle: { ...typography.h1 },
  stepSub: { ...typography.caption, marginTop: -8 },
  field: { gap: 8 },
  fieldLabel: { ...typography.bodyMedium, fontFamily: 'Inter-Medium', fontSize: 15 },
  input: { borderRadius: radii.md, borderWidth: 1, paddingHorizontal: spacing.md, paddingVertical: 14, fontSize: 16, fontFamily: 'Inter-Regular' },
  stepperRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  stepperBtn: { width: 44, height: 44, borderRadius: radii.md, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  stepperValue: { ...typography.statMd, fontFamily: 'Inter-Bold', fontSize: 28, minWidth: 60, textAlign: 'center' },
  optionsRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  wrapRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  optionPill: { paddingHorizontal: spacing.md, paddingVertical: 10, borderRadius: radii.pill, borderWidth: 1 },
  metricsRow: { flexDirection: 'row', gap: spacing.md },
  metricCard: { flex: 1, borderRadius: radii.lg, borderWidth: 1, padding: spacing.md, alignItems: 'center', gap: 4 },
  metricLabel: { ...typography.caption, fontSize: 13 },
  metricValue: { ...typography.stat, fontFamily: 'Inter-Bold', fontSize: 28 },
  metricUnit: { ...typography.small, fontSize: 13 },
  metricSliderRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  bmiCard: { borderRadius: radii.lg, borderWidth: 1, padding: spacing.md, alignItems: 'center', gap: 4 },
  bmiValue: { ...typography.stat, fontFamily: 'Inter-Bold', fontSize: 36 },
  goalCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderWidth: 1.5, borderRadius: radii.lg, padding: spacing.md },
  goalIcon: { width: 44, height: 44, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center' },
  goalText: { flex: 1, gap: 2 },
  goalLabel: { ...typography.bodyMedium, fontFamily: 'Inter-Medium', fontSize: 15 },
  goalDesc: { ...typography.small, fontSize: 13 },
  checkCircle: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: Platform.OS === 'web' ? 24 : 40, gap: spacing.md },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: spacing.md, paddingVertical: 12, borderRadius: radii.md, borderWidth: 1 },
  navBtnText: { fontFamily: 'Inter-Medium', fontSize: 15 },
  navBtnPrimary: { flex: 1 },
  navBtnGrad: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, paddingVertical: 14, borderRadius: radii.md },
  navBtnPrimaryText: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 16 },
});

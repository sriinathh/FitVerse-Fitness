export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  goal: 'lose_weight' | 'build_muscle' | 'stay_fit' | 'improve_endurance';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  preferredWorkout: 'strength' | 'cardio' | 'yoga' | 'hiit' | 'running' | 'cycling';
  onboarded: boolean;
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  unit: string;
  icon: string;
  color: string;
  progress: number; // 0-1
}

export interface Workout {
  id: string;
  title: string;
  category: WorkoutCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // minutes
  calories: number;
  equipment: string[];
  muscleGroups: string[];
  instructions: string[];
  exercises: Exercise[];
  imageQuery: string;
}

export type WorkoutCategory = 'Strength' | 'Cardio' | 'Yoga' | 'HIIT' | 'Stretching' | 'Running' | 'Cycling';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  equipment: string;
  targetMuscle: string;
  instructions: string;
  restSeconds: number;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  workoutsPerWeek: number;
  category: string;
  color: string;
  icon: string;
}

export interface NutritionEntry {
  id: string;
  meal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  daysTotal: number;
  daysCompleted: number;
  reward: string;
  icon: string;
  color: string;
  joined: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  date?: string;
  progress: number;
}

export interface ProgressEntry {
  date: string;
  weight: number;
  calories: number;
  workouts: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: 'workout' | 'water' | 'challenge' | 'streak' | 'achievement';
  time: string;
  read: boolean;
}

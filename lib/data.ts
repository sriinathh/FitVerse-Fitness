import type {
  Workout,
  WorkoutPlan,
  NutritionEntry,
  Challenge,
  Achievement,
  ProgressEntry,
  NotificationItem,
  Exercise,
} from './types';

export const motivationalQuotes = [
  { text: 'The only bad workout is the one that didn\'t happen.', author: 'Unknown' },
  { text: 'Push harder than yesterday if you want a different tomorrow.', author: 'Unknown' },
  { text: 'Your body can stand almost anything. It\'s your mind you have to convince.', author: 'Unknown' },
  { text: 'Success isn\'t always about greatness. It\'s about consistency.', author: 'Dwayne Johnson' },
  { text: 'The pain you feel today will be the strength you feel tomorrow.', author: 'Unknown' },
];

export const todayStats = {
  caloriesBurned: 487,
  caloriesGoal: 600,
  steps: 7432,
  stepsGoal: 10000,
  water: 1.5,
  waterGoal: 2.5,
  sleep: 7.5,
  sleepGoal: 8,
  activeMinutes: 42,
  activeGoal: 60,
};

export const weeklyProgress = [
  { day: 'Mon', value: 65 },
  { day: 'Tue', value: 80 },
  { day: 'Wed', value: 45 },
  { day: 'Thu', value: 90 },
  { day: 'Fri', value: 55 },
  { day: 'Sat', value: 100 },
  { day: 'Sun', value: 70 },
];

export const weightProgress: ProgressEntry[] = [
  { date: 'Week 1', weight: 78.5, calories: 320, workouts: 3 },
  { date: 'Week 2', weight: 78.1, calories: 410, workouts: 4 },
  { date: 'Week 3', weight: 77.6, calories: 380, workouts: 4 },
  { date: 'Week 4', weight: 77.0, calories: 520, workouts: 5 },
  { date: 'Week 5', weight: 76.5, calories: 480, workouts: 5 },
  { date: 'Week 6', weight: 76.0, calories: 550, workouts: 6 },
  { date: 'Week 7', weight: 75.8, calories: 500, workouts: 5 },
  { date: 'Week 8', weight: 75.2, calories: 610, workouts: 6 },
];

export const exercises: Exercise[] = [
  { id: 'e1', name: 'Push-ups', sets: 3, reps: 15, equipment: 'None', targetMuscle: 'Chest', instructions: 'Keep your body straight, lower until chest nearly touches the floor, push back up.', restSeconds: 45 },
  { id: 'e2', name: 'Squats', sets: 4, reps: 12, equipment: 'None', targetMuscle: 'Legs', instructions: 'Feet shoulder-width apart, lower hips until thighs are parallel, keep chest up.', restSeconds: 60 },
  { id: 'e3', name: 'Plank', sets: 3, reps: 1, equipment: 'None', targetMuscle: 'Core', instructions: 'Hold body straight on forearms and toes for 60 seconds.', restSeconds: 30 },
  { id: 'e4', name: 'Lunges', sets: 3, reps: 10, equipment: 'None', targetMuscle: 'Legs', instructions: 'Step forward, lower back knee toward floor, alternate legs.', restSeconds: 45 },
  { id: 'e5', name: 'Burpees', sets: 3, reps: 12, equipment: 'None', targetMuscle: 'Full Body', instructions: 'Squat, kick feet back to plank, return, jump up explosively.', restSeconds: 60 },
  { id: 'e6', name: 'Mountain Climbers', sets: 3, reps: 20, equipment: 'None', targetMuscle: 'Core/Cardio', instructions: 'From plank, drive knees to chest alternately at speed.', restSeconds: 30 },
];

export const workouts: Workout[] = [
  {
    id: 'w1',
    title: 'Full Body Power',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: 35,
    calories: 320,
    equipment: ['Dumbbells', 'Mat'],
    muscleGroups: ['Chest', 'Legs', 'Core', 'Back'],
    instructions: [
      'Warm up for 5 minutes with light cardio',
      'Perform each exercise for the prescribed sets and reps',
      'Rest between sets as indicated',
      'Cool down with stretching for 5 minutes',
    ],
    exercises: exercises.slice(0, 4),
    imageQuery: 'gym workout strength training',
  },
  {
    id: 'w2',
    title: 'HIIT Fat Burner',
    category: 'HIIT',
    difficulty: 'Advanced',
    duration: 25,
    calories: 400,
    equipment: ['Mat'],
    muscleGroups: ['Full Body', 'Cardio'],
    instructions: [
      '40 seconds work, 20 seconds rest',
      'Complete all exercises for 4 rounds',
      'Push hard during work intervals',
      'Stay hydrated between rounds',
    ],
    exercises: [exercises[4], exercises[5], exercises[0], exercises[2]],
    imageQuery: 'HIIT workout intense exercise',
  },
  {
    id: 'w3',
    title: 'Morning Yoga Flow',
    category: 'Yoga',
    difficulty: 'Beginner',
    duration: 30,
    calories: 150,
    equipment: ['Mat'],
    muscleGroups: ['Flexibility', 'Core'],
    instructions: [
      'Start with breathing exercises',
      'Flow through sun salutations',
      'Hold each pose for 5 breaths',
      'End with meditation',
    ],
    exercises: [],
    imageQuery: 'yoga meditation peaceful',
  },
  {
    id: 'w4',
    title: '5K Running Plan',
    category: 'Running',
    difficulty: 'Beginner',
    duration: 28,
    calories: 280,
    equipment: ['Running Shoes'],
    muscleGroups: ['Legs', 'Cardio'],
    instructions: [
      'Start with a 5-minute walk',
      'Alternate 1 min jog / 1 min walk for 15 min',
      'Jog continuously for 8 min',
      'Cool down with stretching',
    ],
    exercises: [],
    imageQuery: 'running outdoor morning',
  },
  {
    id: 'w5',
    title: 'Core Crusher',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: 20,
    calories: 210,
    equipment: ['Mat'],
    muscleGroups: ['Core', 'Abs'],
    instructions: [
      'Perform exercises back to back',
      '30 seconds rest between exercises',
      'Complete 3 full rounds',
      'Focus on form over speed',
    ],
    exercises: [exercises[2], exercises[5], exercises[3]],
    imageQuery: 'core abs workout fitness',
  },
  {
    id: 'w6',
    title: 'Cycling Endurance',
    category: 'Cycling',
    difficulty: 'Intermediate',
    duration: 45,
    calories: 450,
    equipment: ['Bike'],
    muscleGroups: ['Legs', 'Cardio'],
    instructions: [
      '10 minute warm-up at easy pace',
      '30 minutes at moderate intensity',
      '5 minute cool down',
      'Stay hydrated throughout',
    ],
    exercises: [],
    imageQuery: 'cycling road bike fitness',
  },
  {
    id: 'w7',
    title: 'Deep Stretch Recovery',
    category: 'Stretching',
    difficulty: 'Beginner',
    duration: 15,
    calories: 80,
    equipment: ['Mat'],
    muscleGroups: ['Flexibility'],
    instructions: [
      'Hold each stretch for 30 seconds',
      'Breathe deeply throughout',
      'Don\'t force beyond comfort',
      'Focus on major muscle groups',
    ],
    exercises: [],
    imageQuery: 'stretching recovery flexibility',
  },
  {
    id: 'w8',
    title: 'Cardio Blast',
    category: 'Cardio',
    difficulty: 'Intermediate',
    duration: 30,
    calories: 350,
    equipment: ['None'],
    muscleGroups: ['Full Body', 'Cardio'],
    instructions: [
      '30 seconds work, 15 seconds rest',
      '5 exercises, 3 rounds',
      'Maintain steady intensity',
      'Cool down with walking',
    ],
    exercises: [exercises[4], exercises[5], exercises[1]],
    imageQuery: 'cardio workout fitness gym',
  },
];

export const workoutPlans: WorkoutPlan[] = [
  { id: 'p1', title: 'Beginner 30 Days', description: 'Start your fitness journey with daily low-impact workouts', duration: '30 Days', level: 'Beginner', workoutsPerWeek: 4, category: 'Full Body', color: '#2563EB', icon: 'Sparkles' },
  { id: 'p2', title: 'Weight Loss', description: 'High-intensity workouts designed to burn maximum calories', duration: '8 Weeks', level: 'Intermediate', workoutsPerWeek: 5, category: 'HIIT + Cardio', color: '#EF4444', icon: 'Flame' },
  { id: 'p3', title: 'Muscle Gain', description: 'Progressive strength training to build lean muscle mass', duration: '12 Weeks', level: 'Intermediate', workoutsPerWeek: 5, category: 'Strength', color: '#7C3AED', icon: 'Dumbbell' },
  { id: 'p4', title: 'Home Workout', description: 'No equipment needed - train anywhere with bodyweight exercises', duration: '4 Weeks', level: 'Beginner', workoutsPerWeek: 4, category: 'Bodyweight', color: '#22C55E', icon: 'Home' },
  { id: 'p5', title: 'Push Pull Legs', description: 'Classic 6-day split for serious strength and hypertrophy', duration: '12 Weeks', level: 'Advanced', workoutsPerWeek: 6, category: 'Strength', color: '#F59E0B', icon: 'Layers' },
  { id: 'p6', title: 'Full Body Blast', description: 'Compound movements targeting every major muscle group', duration: '6 Weeks', level: 'Intermediate', workoutsPerWeek: 4, category: 'Strength', color: '#06B6D4', icon: 'Zap' },
];

export const nutritionEntries: NutritionEntry[] = [
  { id: 'n1', meal: 'Breakfast', name: 'Oatmeal with Berries', calories: 320, protein: 12, carbs: 54, fat: 6, serving: '1 bowl' },
  { id: 'n2', meal: 'Breakfast', name: 'Greek Yogurt', calories: 150, protein: 17, carbs: 9, fat: 4, serving: '1 cup' },
  { id: 'n3', meal: 'Lunch', name: 'Grilled Chicken Salad', calories: 450, protein: 38, carbs: 22, fat: 18, serving: '1 plate' },
  { id: 'n4', meal: 'Lunch', name: 'Brown Rice & Veg', calories: 220, protein: 5, carbs: 45, fat: 2, serving: '1 cup' },
  { id: 'n5', meal: 'Dinner', name: 'Salmon & Sweet Potato', calories: 520, protein: 35, carbs: 38, fat: 22, serving: '1 plate' },
  { id: 'n6', meal: 'Snacks', name: 'Protein Shake', calories: 180, protein: 25, carbs: 8, fat: 3, serving: '1 shake' },
  { id: 'n7', meal: 'Snacks', name: 'Mixed Nuts', calories: 200, protein: 7, carbs: 7, fat: 18, serving: '30g' },
];

export const challenges: Challenge[] = [
  { id: 'c1', title: '10,000 Steps Daily', description: 'Walk 10,000 steps every day for 30 days', participants: 12453, daysTotal: 30, daysCompleted: 18, reward: 'Step Master Badge', icon: 'Footprints', color: '#2563EB', joined: true },
  { id: 'c2', title: '30-Day Fitness', description: 'Complete a workout every day for 30 days', participants: 8721, daysTotal: 30, daysCompleted: 12, reward: 'Fitness Warrior Badge', icon: 'Flame', color: '#EF4444', joined: true },
  { id: 'c3', title: 'Weekly Running', description: 'Run 25km in one week', participants: 5402, daysTotal: 7, daysCompleted: 4, reward: 'Runner Badge', icon: 'PersonSimpleRun', color: '#22C55E', joined: true },
  { id: 'c4', title: 'Push-up Challenge', description: 'Do 100 push-ups every day for 14 days', participants: 9234, daysTotal: 14, daysCompleted: 0, reward: 'Iron Chest Badge', icon: 'Dumbbell', color: '#7C3AED', joined: false },
  { id: 'c5', title: 'Hydration Hero', description: 'Drink 2.5L water daily for 21 days', participants: 6789, daysTotal: 21, daysCompleted: 0, reward: 'Hydration Badge', icon: 'Droplets', color: '#06B6D4', joined: false },
];

export const achievements: Achievement[] = [
  { id: 'a1', title: 'First Workout', description: 'Complete your first workout', icon: 'Trophy', color: '#2563EB', unlocked: true, date: 'Aug 2026', progress: 1 },
  { id: 'a2', title: '7-Day Streak', description: 'Workout 7 days in a row', icon: 'Flame', color: '#EF4444', unlocked: true, date: 'Aug 2026', progress: 1 },
  { id: 'a3', title: 'Marathon Runner', description: 'Run 42km total distance', icon: 'PersonSimpleRun', color: '#22C55E', unlocked: false, progress: 0.68 },
  { id: 'a4', title: 'Calorie Crusher', description: 'Burn 10,000 total calories', icon: 'Zap', color: '#F59E0B', unlocked: false, progress: 0.82 },
  { id: 'a5', title: 'Goal Achiever', description: 'Reach your fitness goal', icon: 'Target', color: '#7C3AED', unlocked: false, progress: 0.45 },
  { id: 'a6', title: 'Consistency King', description: '30-day workout streak', icon: 'Crown', color: '#F59E0B', unlocked: false, progress: 0.6 },
  { id: 'a7', title: 'Early Bird', description: 'Workout before 7 AM 10 times', icon: 'Sunrise', color: '#06B6D4', unlocked: true, date: 'Sep 2026', progress: 1 },
  { id: 'a8', title: 'Strength Master', description: 'Complete 50 strength workouts', icon: 'Dumbbell', color: '#2563EB', unlocked: false, progress: 0.34 },
];

export const notifications: NotificationItem[] = [
  { id: 'nf1', title: 'Workout Reminder', body: 'Time for your Full Body Power session!', type: 'workout', time: '2h ago', read: false },
  { id: 'nf2', title: 'Water Reminder', body: 'You\'ve only had 1.5L of water today. Stay hydrated!', type: 'water', time: '4h ago', read: false },
  { id: 'nf3', title: 'Streak Alert', body: 'You\'re on a 12-day streak! Keep it going!', type: 'streak', time: '6h ago', read: true },
  { id: 'nf4', title: 'Achievement Unlocked', body: 'You earned the Early Bird badge!', type: 'achievement', time: '1d ago', read: true },
  { id: 'nf5', title: 'Challenge Update', body: 'You completed 18/30 days in 10K Steps Challenge', type: 'challenge', time: '1d ago', read: true },
];

export const leaderboard = [
  { rank: 1, name: 'Sarah K.', points: 4820, workouts: 42, avatar: '#2563EB' },
  { rank: 2, name: 'Mike R.', points: 4350, workouts: 38, avatar: '#7C3AED' },
  { rank: 3, name: 'Emma L.', points: 4100, workouts: 35, avatar: '#22C55E' },
  { rank: 4, name: 'You', points: 3840, workouts: 31, avatar: '#F59E0B' },
  { rank: 5, name: 'David M.', points: 3650, workouts: 29, avatar: '#EF4444' },
  { rank: 6, name: 'Lisa P.', points: 3400, workouts: 27, avatar: '#06B6D4' },
  { rank: 7, name: 'James W.', points: 3200, workouts: 25, avatar: '#EC4899' },
];

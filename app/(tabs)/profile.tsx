import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import {
  User, Settings, Moon, Sun, Bell, Shield, CircleHelp, ChevronRight,
  Trophy, Flame, Target, Crown, Zap, Footprints, Dumbbell, Droplets,
  Sunrise, LogOut, Star, Award, Medal, Activity,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/lib/AppContext';
import { spacing, radii, typography } from '@/lib/theme';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { challenges, achievements, leaderboard, notifications } from '@/lib/data';

const challengeIcons: Record<string, any> = {
  Footprints, Flame, Activity, Dumbbell, Droplets,
};

const achievementIcons: Record<string, any> = {
  Trophy, Flame, Activity, Zap, Target, Crown, Sunrise, Dumbbell,
};

export default function ProfileScreen() {
  const router = useRouter();
  const { colors, themeMode, toggleTheme, profile, completeOnboarding } = useApp();

  const joinedChallenges = challenges.filter(c => c.joined);
  const unlockedAchievements = achievements.filter(a => a.unlocked);

  const menuItems = [
    { icon: Bell, label: 'Notifications', color: colors.primary, action: () => {} },
    { icon: Shield, label: 'Privacy & Security', color: colors.success, action: () => {} },
    { icon: CircleHelp, label: 'Help & Support', color: colors.warning, action: () => {} },
    { icon: Star, label: 'Rate FitVerse', color: colors.secondary, action: () => {} },
  ];

  const resetApp = () => {
    completeOnboarding({} as any);
    router.replace('/onboarding');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileHeader}
      >
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <User color="#fff" size={36} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>{profile?.name || 'Athlete'}</Text>
            <Text style={styles.profileSub}>
              {profile?.goal?.replace('_', ' ') || 'Fitness Enthusiast'} · Level 8
            </Text>
            <View style={styles.xpBar}>
              <View style={styles.xpFill} />
            </View>
            <Text style={styles.xpText}>3,840 XP · 660 to Level 9</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>87</Text>
            <Text style={styles.profileStatLabel}>Workouts</Text>
          </View>
          <View style={styles.profileStatDivider} />
          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>12</Text>
            <Text style={styles.profileStatLabel}>Streak</Text>
          </View>
          <View style={styles.profileStatDivider} />
          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>5</Text>
            <Text style={styles.profileStatLabel}>Badges</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Challenges */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Challenges</Text>
        {joinedChallenges.map(c => {
          const Icon = challengeIcons[c.icon] || Trophy;
          return (
            <Card key={c.id} style={styles.challengeCard}>
              <View style={[styles.challengeIcon, { backgroundColor: c.color + '20' }]}>
                <Icon color={c.color} size={22} />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={[styles.challengeTitle, { color: colors.text }]}>{c.title}</Text>
                <Text style={[styles.challengeSub, { color: colors.textMuted }]}>
                  {c.daysCompleted}/{c.daysTotal} days · {c.participants.toLocaleString()} joined
                </Text>
                <ProgressBar progress={c.daysCompleted / c.daysTotal} color={c.color} height={5} />
              </View>
            </Card>
          );
        })}
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Achievements</Text>
        <View style={styles.achievementGrid}>
          {achievements.map(a => {
            const Icon = achievementIcons[a.icon] || Award;
            return (
              <View key={a.id} style={[styles.achievementItem, { opacity: a.unlocked ? 1 : 0.4 }]}>
                <View style={[styles.achievementBadge, { backgroundColor: a.unlocked ? a.color + '20' : colors.surfaceAlt, borderColor: a.unlocked ? a.color : colors.border }]}>
                  <Icon color={a.unlocked ? a.color : colors.textMuted} size={26} />
                </View>
                <Text style={[styles.achievementTitle, { color: colors.text }]} numberOfLines={1}>{a.title}</Text>
                {a.unlocked ? (
                  <Text style={[styles.achievementDate, { color: colors.textMuted }]}>{a.date}</Text>
                ) : (
                  <Text style={[styles.achievementProgress, { color: colors.textMuted }]}>{Math.round(a.progress * 100)}%</Text>
                )}
              </View>
            );
          })}
        </View>
      </View>

      {/* Leaderboard */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Leaderboard</Text>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {leaderboard.map((u, i) => (
            <View
              key={u.rank}
              style={[
                styles.leaderboardRow,
                { backgroundColor: u.name === 'You' ? colors.primary + '10' : 'transparent' },
                i < leaderboard.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
            >
              <View style={[styles.rankBadge, u.rank <= 3 && { backgroundColor: u.rank === 1 ? '#F59E0B' : u.rank === 2 ? '#94A3B8' : '#F97316' }]}>
                <Text style={[styles.rankText, { color: u.rank <= 3 ? '#fff' : colors.textMuted }]}>{u.rank}</Text>
              </View>
              <View style={[styles.leaderAvatar, { backgroundColor: u.avatar }]}>
                <Text style={styles.leaderAvatarText}>{u.name.charAt(0)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.leaderName, { color: u.name === 'You' ? colors.primary : colors.text, fontFamily: u.name === 'You' ? 'Inter-Bold' : 'Inter-Medium' }]}>
                  {u.name}
                </Text>
                <Text style={[styles.leaderWorkouts, { color: colors.textMuted }]}>{u.workouts} workouts</Text>
              </View>
              <Text style={[styles.leaderPoints, { color: colors.text }]}>{u.points.toLocaleString()}</Text>
              {u.rank <= 3 && <Medal color={u.rank === 1 ? '#F59E0B' : u.rank === 2 ? '#94A3B8' : '#F97316'} size={16} />}
            </View>
          ))}
        </Card>
      </View>

      {/* Theme Toggle */}
      <Card style={styles.themeCard}>
        <View style={styles.themeRow}>
          {themeMode === 'dark' ? <Moon color={colors.secondary} size={20} /> : <Sun color={colors.warning} size={20} />}
          <Text style={[styles.themeLabel, { color: colors.text }]}>Dark Mode</Text>
          <Switch
            value={themeMode === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.surfaceAlt, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </Card>

      {/* Menu */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={i}
              onPress={item.action}
              style={[
                styles.menuRow,
                i < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                <Icon color={item.color} size={18} />
              </View>
              <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
              <ChevronRight color={colors.textMuted} size={18} />
            </TouchableOpacity>
          );
        })}
      </Card>

      {/* Reset / Start Over */}
      <TouchableOpacity onPress={resetApp} activeOpacity={0.7}>
        <Card style={[styles.resetCard, { borderColor: colors.danger + '30' }]}>
          <LogOut color={colors.danger} size={18} />
          <Text style={[styles.resetText, { color: colors.danger }]}>Start Over (Reset Onboarding)</Text>
        </Card>
      </TouchableOpacity>

      <Text style={[styles.version, { color: colors.textMuted }]}>FitVerse v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  profileHeader: { borderRadius: radii.xl, padding: spacing.lg, gap: spacing.md },
  avatarRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.25)', justifyContent: 'center', alignItems: 'center' },
  profileName: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 22 },
  profileSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontFamily: 'Inter-Regular', textTransform: 'capitalize' },
  xpBar: { height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)', marginTop: 8, overflow: 'hidden' },
  xpFill: { height: 6, borderRadius: 3, backgroundColor: '#fff', width: '85%' },
  xpText: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontFamily: 'Inter-Regular', marginTop: 4 },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  profileStat: { alignItems: 'center', gap: 2 },
  profileStatValue: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 20 },
  profileStatLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: 'Inter-Regular' },
  profileStatDivider: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.3)' },
  section: { gap: spacing.sm },
  sectionTitle: { ...typography.h3, fontFamily: 'Inter-Semi' },
  challengeCard: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  challengeIcon: { width: 48, height: 48, borderRadius: radii.md, justifyContent: 'center', alignItems: 'center' },
  challengeTitle: { fontFamily: 'Inter-Semi', fontSize: 15 },
  challengeSub: { ...typography.small, fontSize: 12 },
  achievementGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  achievementItem: { width: '31%', alignItems: 'center', gap: 4, flex: 1, minWidth: '31%' },
  achievementBadge: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', borderWidth: 2 },
  achievementTitle: { fontFamily: 'Inter-Medium', fontSize: 11, textAlign: 'center' },
  achievementDate: { fontSize: 10, fontFamily: 'Inter-Regular' },
  achievementProgress: { fontSize: 10, fontFamily: 'Inter-Regular' },
  leaderboardRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: spacing.md },
  rankBadge: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
  rankText: { fontFamily: 'Inter-Bold', fontSize: 14 },
  leaderAvatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  leaderAvatarText: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 16 },
  leaderName: { fontSize: 14 },
  leaderWorkouts: { fontSize: 11, fontFamily: 'Inter-Regular' },
  leaderPoints: { fontFamily: 'Inter-Bold', fontSize: 15 },
  themeCard: { padding: spacing.md },
  themeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  themeLabel: { flex: 1, fontFamily: 'Inter-Medium', fontSize: 15 },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  menuIcon: { width: 36, height: 36, borderRadius: radii.sm, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, fontFamily: 'Inter-Medium', fontSize: 15 },
  resetCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderWidth: 1 },
  resetText: { fontFamily: 'Inter-Medium', fontSize: 15 },
  version: { textAlign: 'center', fontFamily: 'Inter-Regular', fontSize: 12, marginTop: spacing.sm },
});

import React from 'react';
import {
  Award,
  Flame,
  CheckCircle2,
  Circle,
  Trophy,
  Star,
  FileSpreadsheet,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
} from 'lucide-react';
import { MutabaahItem, GamificationProfile } from '../types';
import { exportMutabaahCSV } from '../utils/export';

interface GamifikasiMutabaahProps {
  mutabaahList: MutabaahItem[];
  profile: GamificationProfile;
  onToggleMutabaah: (id: string) => void;
  onRewardPoints: (points: number, reason: string) => void;
}

export const GamifikasiMutabaah: React.FC<GamifikasiMutabaahProps> = ({
  mutabaahList,
  profile,
  onToggleMutabaah,
  onRewardPoints,
}) => {
  const completedCount = mutabaahList.filter((m) => m.isCompletedToday).length;
  const percentage = Math.round((completedCount / mutabaahList.length) * 100);

  const leaderboardUsers = [
    { rank: 1, name: 'Abdullah Santoso', points: 3450, streak: 45, level: 'Duta Ukhuwah' },
    { rank: 2, name: 'Aisyah Clara', points: 3120, streak: 38, level: 'Duta Ukhuwah' },
    { rank: 3, name: 'Ibrahim Kevin', points: 2890, streak: 31, level: 'Sahabat Hijrah' },
    { rank: 4, name: 'Siti Maryam W.', points: 2450, streak: 26, level: 'Sahabat Hijrah' },
    { rank: profile.rankPosition, name: 'Anda (Sahabat Mualaf)', points: profile.points, streak: profile.streakDays, level: profile.currentLevelTitle, isUser: true },
    { rank: 43, name: 'Yusuf Tanudidjaja', points: 1190, streak: 12, level: 'Penuntut Ilmu' },
  ];

  const allBadges = [
    { title: 'Syahadat Pertama', desc: 'Memulai langkah ikrar suci', icon: '✨', unlocked: true },
    { title: 'Konsisten 7 Hari Subuh', desc: 'Menjaga sholat subuh 7 hari beruntun', icon: '🌅', unlocked: true },
    { title: 'Lulus Iqro Jilid 1', desc: 'Menguasai huruf hijaiyah dasar', icon: '📖', unlocked: true },
    { title: 'Tamu Hidayah Terverifikasi', desc: 'Menyelesaikan sesi bimbingan rumah', icon: '🏡', unlocked: true },
    { title: 'Kontributor Forum Aktif', desc: 'Membantu menjawab di forum ukhuwah', icon: '💬', unlocked: true },
    { title: 'Pejuang Tahajjud', desc: 'Menunaikan qiyamul lail 3 malam berturut', icon: '🌙', unlocked: false },
    { title: 'Khatam Juz 30', desc: 'Membaca tuntas juz amma dengan tajwid', icon: '🏆', unlocked: false },
    { title: 'Duta Syiar Digital', desc: 'Mengajak 5 sahabat bergabung di t.me/MualafCity', icon: '🤝', unlocked: false },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Gamification Progress Hero */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              Sistem Motivasi & Pembiasaan Istiqomah
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Mutaba'ah Yaumiyah & Poin Berkah
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
              "Amalan yang paling dicintai Allah adalah yang berkelanjutan meskipun sedikit." Catat ibadah harian Anda, pertahankan hari istiqomah (streak), dan tingkatkan derajat ilmu.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/10 text-center min-w-[110px]">
              <div className="flex items-center justify-center gap-1.5 text-amber-300 mb-1">
                <Flame className="w-5 h-5 fill-current animate-bounce" />
                <span className="text-2xl font-black">{profile.streakDays}</span>
              </div>
              <span className="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold">
                Hari Istiqomah
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/10 text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-emerald-300 mb-1">
                <Award className="w-5 h-5" />
                <span className="text-2xl font-black">{profile.points}</span>
              </div>
              <span className="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold">
                Poin Berkah
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/10 text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-sky-300 mb-1">
                <Trophy className="w-5 h-5" />
                <span className="text-2xl font-black">#{profile.rankPosition}</span>
              </div>
              <span className="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold">
                Peringkat Kota
              </span>
            </div>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mt-6 pt-6 border-t border-emerald-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-2">
              <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-black text-[10px]">
                LEVEL {profile.levelNumber}
              </span>
              <span>{profile.currentLevelTitle}</span>
            </span>
            <span className="text-emerald-300">
              Target Level 3: 2000 Poin ({profile.points}/2000)
            </span>
          </div>
          <div className="w-full h-3 bg-slate-950/60 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${Math.min(100, (profile.points / 2000) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Today's Checklist Progress & Actions */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Lembar Mutaba'ah Hari Ini
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tercapai {completedCount} dari {mutabaahList.length} amalan ({percentage}%)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportMutabaahCSV(mutabaahList, profile)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition border border-slate-200 dark:border-slate-700"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Ekspor Mutaba'ah (CSV)</span>
            </button>
          </div>
        </div>

        {/* Progress Bar Today */}
        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* Mutabaah Checklist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mutabaahList.map((item) => (
            <div
              key={item.id}
              onClick={() => onToggleMutabaah(item.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                item.isCompletedToday
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4
                    className={`font-bold text-xs sm:text-sm ${
                      item.isCompletedToday
                        ? 'line-through text-emerald-900 dark:text-emerald-200'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {item.label}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
                <span className="inline-block text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                  +{item.rewardPoints} Poin Berkah
                </span>
              </div>

              <div className="shrink-0">
                {item.isCompletedToday ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Koleksi Lencana Pencapaian Ukhuwah
            </h2>
            <p className="text-xs text-slate-500">
              {profile.badgesUnlocked.length} dari {allBadges.length} lencana telah terbuka
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {allBadges.map((badge, idx) => {
            const isUnlocked = profile.badgesUnlocked.includes(badge.title) || badge.unlocked;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl text-center space-y-2 border transition ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-amber-50/60 to-white dark:from-slate-800 dark:to-slate-900 border-amber-300 dark:border-amber-700/60 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 opacity-50 grayscale'
                }`}
              >
                <div className="text-3xl">{badge.icon}</div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {badge.title}
                </h4>
                <p className="text-[10px] text-slate-500 leading-tight line-clamp-2">
                  {badge.desc}
                </p>
                <div className="pt-1">
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      isUnlocked
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-200 text-slate-500 dark:bg-slate-700'
                    }`}
                  >
                    {isUnlocked ? 'Tercapai' : 'Terkunci'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Community Leaderboard */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Papan Peringkat Ukhuwah & Istiqomah
            </h2>
            <p className="text-xs text-slate-500">
              Saling berlomba-lomba dalam kebaikan (Fastabiqul Khairat)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Peringkat</th>
                <th className="py-3 px-4">Nama Saudara</th>
                <th className="py-3 px-4">Tingkat Ilmu</th>
                <th className="py-3 px-4">Streak Harian</th>
                <th className="py-3 px-4 text-right">Poin Berkah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {leaderboardUsers.map((u) => (
                <tr
                  key={u.rank}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/60 transition ${
                    u.isUser
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/40 font-bold border-l-4 border-emerald-600'
                      : ''
                  }`}
                >
                  <td className="py-3 px-4 font-bold">
                    {u.rank === 1 ? '🥇 #1' : u.rank === 2 ? '🥈 #2' : u.rank === 3 ? '🥉 #3' : `#${u.rank}`}
                  </td>
                  <td className="py-3 px-4 text-slate-900 dark:text-white">
                    {u.name} {u.isUser && <span className="text-emerald-600">(Anda)</span>}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{u.level}</td>
                  <td className="py-3 px-4 text-amber-600 dark:text-amber-400 font-semibold">
                    🔥 {u.streak} Hari
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {u.points.toLocaleString('id-ID')} Poin
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

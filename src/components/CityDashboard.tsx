import React from 'react';
import {
  Compass,
  Users,
  Bot,
  MessageSquare,
  Award,
  Calendar,
  Sparkles,
  ExternalLink,
  Send,
  Radio,
  Play,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Shield,
  HeartHandshake,
  Clock,
  BookOpen,
} from 'lucide-react';
import { TokohMualaf, Tutor, HomeBooking, MutabaahItem, GamificationProfile } from '../types';

interface CityDashboardProps {
  onNavigate: (tab: string) => void;
  tokohList: TokohMualaf[];
  tutors: Tutor[];
  bookings: HomeBooking[];
  mutabaahList: MutabaahItem[];
  profile: GamificationProfile;
}

export const CityDashboard: React.FC<CityDashboardProps> = ({
  onNavigate,
  tokohList,
  tutors,
  bookings,
  mutabaahList,
  profile,
}) => {
  const completedHabits = mutabaahList.filter((m) => m.isCompletedToday).length;
  const dondyTan = tokohList.find((t) => t.name.includes('Dondy Tan')) || tokohList[0];
  const zakirNaik = tokohList.find((t) => t.name.includes('Zakir Naik')) || tokohList[1];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Smart City Hub */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white p-6 sm:p-10 shadow-2xl border border-emerald-700/40">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Platform Infrastruktur Digital Terpusat
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-400/30">
              <Send className="w-3 h-3 text-sky-400" />
              t.me/MualafCity
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">MualafCity</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
            Infrastruktur cerdas terintegrasi untuk pendampingan mualaf seluruh dunia. Menghadirkan asatidz profesional ke rumah Anda, konsultasi AI 24/7, kurikulum kristologi & tauhid dari <strong>Koh Dondy Tan</strong> dan <strong>Dr. Zakir Naik</strong>, serta ukhuwah digital yang aman dan inklusif.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('hidayah-rumah')}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-2xl text-xs sm:text-sm font-black shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Pesan Bimbingan Tatap Muka ke Rumah</span>
            </button>

            <button
              onClick={() => onNavigate('ai-consultant')}
              className="px-5 py-3 bg-emerald-800/90 hover:bg-emerald-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md transition border border-emerald-600/40 flex items-center gap-2 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-emerald-300" />
              <span>Tanya AI Pembimbing Mualaf</span>
            </button>
          </div>

          {/* Quick links banner */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-emerald-800/60 text-xs text-emerald-200">
            <a
              href="http://f.mualaf.islamicity.tv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition underline underline-offset-4 decoration-emerald-500"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Portal Resmi: f.mualaf.islamicity.tv</span>
            </a>
            <span className="text-emerald-700">•</span>
            <a
              href="https://t.me/MualafCity"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition underline underline-offset-4 decoration-sky-500"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Komunitas Telegram: t.me/MualafCity (28,500+ Member)</span>
            </a>
          </div>
        </div>

        {/* Ambient geometry */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <Compass className="w-96 h-96 text-emerald-300" />
        </div>
      </div>

      {/* Real-time Smart City Pulse Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              14,280+
            </div>
            <p className="text-xs text-slate-500 font-medium">Mualaf Terdaftar</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              4,890+
            </div>
            <p className="text-xs text-slate-500 font-medium">Sesi Rumah Terlaksana</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 flex items-center justify-center shrink-0">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              28,540+
            </div>
            <p className="text-xs text-slate-500 font-medium">Warga t.me/MualafCity</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              342
            </div>
            <p className="text-xs text-slate-500 font-medium">Asatidz Tersertifikasi</p>
          </div>
        </div>
      </div>

      {/* Main 4 Action Gateways */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gateway 1 */}
        <div
          onClick={() => onNavigate('hidayah-rumah')}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 hover:shadow-md transition cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
              Hidayah Datang ke Rumah
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Pesan pengajar profesional ke rumah Anda secara aman. Dilengkapi verifikasi KTP/MUI dan pelacakan PIN kedatangan.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-emerald-700 dark:text-emerald-400 gap-1 pt-2">
            <span>Pesan Tutor Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Gateway 2 */}
        <div
          onClick={() => onNavigate('tokoh')}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 hover:shadow-md transition cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
              Tokoh & Da'i Mualaf
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Akses rekaman kajian dan buku ilmiah dari Koh Dondy Tan, Dr. Zakir Naik, Alm. Koh Steven (MCI), dan Felix Siauw.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-teal-700 dark:text-teal-400 gap-1 pt-2">
            <span>Buka Direktori Kajian</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Gateway 3 */}
        <div
          onClick={() => onNavigate('ai-consultant')}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 hover:shadow-md transition cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition">
              Tanya AI Pembimbing
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Konsultasi fiqh sholat, wudhu, dan kiat berkomunikasi dengan keluarga tanpa rasa takut atau canggung.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-sky-700 dark:text-sky-400 gap-1 pt-2">
            <span>Mulai Konsultasi AI</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Gateway 4 */}
        <div
          onClick={() => onNavigate('mutabaah')}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 hover:shadow-md transition cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
              Mutaba'ah & Poin Berkah
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Pantau {completedHabits} dari {mutabaahList.length} amalan hari ini. Jaga streak {profile.streakDays} hari dan naikkan tingkat level Anda.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-amber-600 dark:text-amber-400 gap-1 pt-2">
            <span>Buka Lembar Mutaba'ah</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>

      {/* Featured Scholars Spotlight: Dondy Tan & Zakir Naik */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Kajian Pilihan Tokoh Mualaf & Da'i Komparasi
            </h2>
            <p className="text-xs text-slate-500">
              Materi pembelajaran pilihan untuk memperkokoh akidah dan pemahaman ilmiah
            </p>
          </div>
          <button
            onClick={() => onNavigate('tokoh')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Semua Tokoh & Video ({tokohList.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dondy Tan Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={dondyTan.avatar}
                alt={dondyTan.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{dondyTan.name}</h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">{dondyTan.role}</p>
                <p className="text-[11px] text-slate-500">{dondyTan.organization}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
              {dondyTan.bio}
            </p>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">Video Utama:</span>
              {dondyTan.popularVideos.slice(0, 1).map((v) => (
                <div
                  key={v.id}
                  onClick={() => onNavigate('tokoh')}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 cursor-pointer hover:border-emerald-500 transition"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{v.title}</p>
                      <p className="text-[10px] text-slate-400">{v.duration} • {v.views} views</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dr. Zakir Naik Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={zakirNaik.avatar}
                alt={zakirNaik.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{zakirNaik.name}</h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">{zakirNaik.role}</p>
                <p className="text-[11px] text-slate-500">{zakirNaik.organization}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
              {zakirNaik.bio}
            </p>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">Video Utama:</span>
              {zakirNaik.popularVideos.slice(0, 1).map((v) => (
                <div
                  key={v.id}
                  onClick={() => onNavigate('tokoh')}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 cursor-pointer hover:border-emerald-500 transition"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{v.title}</p>
                      <p className="text-[10px] text-slate-400">{v.duration} • {v.views} views</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

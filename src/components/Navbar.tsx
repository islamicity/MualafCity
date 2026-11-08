import React from 'react';
import {
  Compass,
  Home,
  Users,
  Bot,
  MessageSquare,
  Award,
  Calendar,
  BarChart3,
  ShieldCheck,
  Bell,
  Sun,
  Moon,
  Globe,
  Radio,
  ExternalLink,
  Send,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  isOnline: boolean;
  unreadNotifsCount: number;
  onOpenNotifications: () => void;
  onOpenSecurity: () => void;
  points: number;
  streak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  isDark,
  setIsDark,
  isOnline,
  unreadNotifsCount,
  onOpenNotifications,
  onOpenSecurity,
  points,
  streak,
}) => {
  const t = getTranslation(lang);

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'hidayah-rumah', label: t.navHomeVisit, icon: Compass, badge: 'Layanan Rumah' },
    { id: 'tokoh', label: t.navTokoh, icon: Users },
    { id: 'ai-consultant', label: t.navAi, icon: Bot, badge: 'AI Cerdas' },
    { id: 'forum', label: t.navForum, icon: MessageSquare },
    { id: 'mutabaah', label: t.navMutabaah, icon: Award },
    { id: 'hijriah', label: t.navHijriah, icon: Calendar },
    { id: 'analytics', label: t.navAnalytics, icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-emerald-100 dark:border-slate-800 transition-colors duration-200">
      {/* Official Community Integration Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-700/60 text-emerald-200 px-2 py-0.5 rounded-full font-medium">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              Sistem Terpusat MualafCity
            </span>
            <span className="hidden sm:inline text-emerald-200/80">
              Integrasi Data Real-time & Komunitas Terverifikasi
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {/* Link to f.mualaf.islamicity.tv */}
            <a
              href="http://f.mualaf.islamicity.tv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 px-2.5 py-0.5 rounded transition text-[11px] font-medium border border-emerald-600/30 shadow-sm"
              title="Akses Portal Edukasi f.mualaf.islamicity.tv"
            >
              <ExternalLink className="w-3 h-3 text-emerald-300" />
              <span>f.mualaf.islamicity.tv</span>
            </a>

            {/* Link to t.me/MualafCity */}
            <a
              href="https://t.me/MualafCity"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white px-2.5 py-0.5 rounded transition text-[11px] font-medium shadow-sm"
              title="Gabung Diskusi t.me/MualafCity Telegram"
            >
              <Send className="w-3 h-3" />
              <span>t.me/MualafCity</span>
              <span className="bg-sky-700 px-1 rounded text-[10px] font-semibold">28.5k</span>
            </a>

            {/* Connection Status */}
            <div className="flex items-center gap-1 pl-2 border-l border-emerald-800">
              {isOnline ? (
                <span className="flex items-center gap-1 text-emerald-300 text-[11px]" title="Koneksi real-time aktif">
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span className="hidden md:inline">Online</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-300 text-[11px]" title="Data tersimpan di penyimpanan lokal">
                  <WifiOff className="w-3 h-3 text-amber-400" />
                  <span className="hidden md:inline">Offline</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Mualaf<span className="text-emerald-700 dark:text-emerald-400 font-extrabold">City</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded border border-emerald-300 dark:border-emerald-700">
                  v2.8 Smart
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block truncate max-w-xs">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Quick Stats Badges */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>{streak} Hari Istiqomah</span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>{points} Poin Berkah</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs">
              <Globe className="w-3.5 h-3.5 ml-1.5 text-slate-400 hidden sm:inline" />
              {(['id', 'en', 'ar'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded text-xs font-semibold uppercase transition-all ${
                    lang === l
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
              aria-label="Toggle Dark Mode"
              title={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Security & Cloud Vault Button */}
            <button
              onClick={onOpenSecurity}
              className="p-2 rounded-lg text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 transition flex items-center gap-1"
              title="Status Keamanan, 2FA & Pencadangan Cloud"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden xl:inline text-xs font-medium">Vault 2FA</span>
            </button>

            {/* Notifications Button */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
              title="Pemberitahuan & Pengingat Harian"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {unreadNotifsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-100 dark:border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-emerald-700 dark:hover:text-emerald-400'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-emerald-900 text-emerald-200'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

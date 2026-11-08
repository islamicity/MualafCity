import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CityDashboard } from './components/CityDashboard';
import { HidayahRumah } from './components/HidayahRumah';
import { TokohOrganisasi } from './components/TokohOrganisasi';
import { AiConsultant } from './components/AiConsultant';
import { ForumKomunitas } from './components/ForumKomunitas';
import { GamifikasiMutabaah } from './components/GamifikasiMutabaah';
import { HijriahJadwal } from './components/HijriahJadwal';
import { LaporanAnalitik } from './components/LaporanAnalitik';
import { PrintableReport } from './components/PrintableReport';
import { KeamananBackupModal } from './components/KeamananBackupModal';
import { NotificationCenter } from './components/NotificationCenter';

import {
  initialTokoh,
  initialOrganisasi,
  initialTutors,
  initialBookings,
  initialForumPosts,
  initialMutabaahList,
  initialGamification,
  initialHijriInfo,
  initialNotifications,
} from './data/mockData';
import {
  loadStoredData,
  saveStoredData,
  STORAGE_KEYS,
  defaultSecurityState,
} from './utils/storage';
import {
  Language,
  HomeBooking,
  ForumPost,
  ForumReply,
  MutabaahItem,
  GamificationProfile,
  SecurityState,
  NotificationItem,
} from './types';
import {
  ExternalLink,
  Send,
  ShieldCheck,
  Compass,
  Heart,
  Globe,
  Radio,
  CheckCircle,
} from 'lucide-react';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    return loadStoredData<boolean>(STORAGE_KEYS.THEME, true);
  });

  // Language state
  const [lang, setLang] = useState<Language>(() => {
    return loadStoredData<Language>(STORAGE_KEYS.LANG, 'id');
  });

  // Current tab
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Network status
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // App persistent states
  const [bookings, setBookings] = useState<HomeBooking[]>(() => {
    return loadStoredData<HomeBooking[]>(STORAGE_KEYS.BOOKINGS, initialBookings);
  });

  const [mutabaahList, setMutabaahList] = useState<MutabaahItem[]>(() => {
    return loadStoredData<MutabaahItem[]>(STORAGE_KEYS.MUTABAAH, initialMutabaahList);
  });

  const [profile, setProfile] = useState<GamificationProfile>(() => {
    return loadStoredData<GamificationProfile>(STORAGE_KEYS.GAMIFICATION, initialGamification);
  });

  const [securityState, setSecurityState] = useState<SecurityState>(() => {
    return loadStoredData<SecurityState>(STORAGE_KEYS.SECURITY, defaultSecurityState);
  });

  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => {
    return loadStoredData<ForumPost[]>(STORAGE_KEYS.FORUM_POSTS, initialForumPosts);
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    return loadStoredData<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
  });

  // Modal visibility states
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  // Toast banner for gamification rewards
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Play audio chime using Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      // Audio not permitted or supported
    }
  };

  // Sync dark class on documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveStoredData(STORAGE_KEYS.THEME, isDark);
  }, [isDark]);

  // Sync language
  useEffect(() => {
    saveStoredData(STORAGE_KEYS.LANG, lang);
  }, [lang]);

  // Network listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    saveStoredData(STORAGE_KEYS.BOOKINGS, bookings);
  }, [bookings]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.MUTABAAH, mutabaahList);
  }, [mutabaahList]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.GAMIFICATION, profile);
  }, [profile]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.SECURITY, securityState);
  }, [securityState]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.FORUM_POSTS, forumPosts);
  }, [forumPosts]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }, [notifications]);

  // Reward points helper
  const handleRewardPoints = (pointsToAdd: number, reason: string) => {
    setProfile((prev) => {
      const nextPoints = prev.points + pointsToAdd;
      let nextLevel = prev.levelNumber;
      let nextTitle = prev.currentLevelTitle;

      if (nextPoints >= 2000 && prev.levelNumber < 3) {
        nextLevel = 3;
        nextTitle = 'Sahabat Hijrah Teruji';
      } else if (nextPoints >= 3500 && prev.levelNumber < 4) {
        nextLevel = 4;
        nextTitle = 'Duta Ukhuwah MualafCity';
      }

      return {
        ...prev,
        points: nextPoints,
        levelNumber: nextLevel,
        currentLevelTitle: nextTitle,
      };
    });

    playChime();
    setToastMessage(`+${pointsToAdd} Poin Berkah! (${reason})`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Mutaba'ah Toggle
  const handleToggleMutabaah = (id: string) => {
    setMutabaahList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.isCompletedToday;
          if (nextState) {
            handleRewardPoints(item.rewardPoints, `Menyelesaikan ${item.label}`);
          }
          return { ...item, isCompletedToday: nextState };
        }
        return item;
      })
    );
  };

  // Add Home Booking
  const handleAddBooking = (newBooking: HomeBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
    // Add notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Jadwal Bimbingan Rumah Dikonfirmasi',
      message: `Sesi bersama ${newBooking.tutorName} pada ${newBooking.scheduledDate} (${newBooking.scheduledTime}) siap. PIN kedatangan: #${newBooking.checkinPin}.`,
      time: 'Baru saja',
      type: 'session',
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
    handleRewardPoints(50, 'Menjadwalkan Bimbingan Hidayah ke Rumah');
  };

  // Update Booking Status
  const handleUpdateBookingStatus = (
    id: string,
    status: HomeBooking['status'],
    report?: HomeBooking['teacherReport']
  ) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            status,
            teacherReport: report || b.teacherReport,
          };
        }
        return b;
      })
    );
    if (status === 'completed') {
      handleRewardPoints(50, 'Menyelesaikan Sesi Bimbingan Tatap Muka');
    }
  };

  // Forum Handlers
  const handleAddPost = (newPost: ForumPost) => {
    setForumPosts((prev) => [newPost, ...prev]);
  };

  const handleLikePost = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = p.isLikedByUser;
          return {
            ...p,
            likes: isLiked ? p.likes - 1 : p.likes + 1,
            isLikedByUser: !isLiked,
          };
        }
        return p;
      })
    );
  };

  const handleAddReply = (postId: string, reply: ForumReply) => {
    setForumPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            replies: [...p.replies, reply],
          };
        }
        return p;
      })
    );
  };

  // Notifications
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleAddTestNotification = () => {
    playChime();
    const testNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Pengingat Waktu Kajian t.me/MualafCity',
      message: 'Kajian malam ini bersama Koh Dondy Tan dimulai dalam 30 menit. Siapkan catatan Anda!',
      time: 'Baru saja',
      type: 'reminder',
      read: false,
    };
    setNotifications((prev) => [testNotif, ...prev]);
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Toast Reward Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-2.5 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-300" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        setIsDark={setIsDark}
        isOnline={isOnline}
        unreadNotifsCount={unreadNotifsCount}
        onOpenNotifications={() => setIsNotifModalOpen(true)}
        onOpenSecurity={() => setIsSecurityModalOpen(true)}
        points={profile.points}
        streak={profile.streakDays}
      />

      {/* Offline Status Warning Bar if disconnected */}
      {!isOnline && (
        <div className="bg-amber-500 text-slate-950 text-xs py-2 px-4 text-center font-bold flex items-center justify-center gap-2">
          <span>Anda sedang dalam Mode Offline. Semua perubahan tersimpan secara lokal dan otomatis disinkronkan saat terhubung kembali.</span>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'home' && (
          <CityDashboard
            onNavigate={(tab) => setCurrentTab(tab)}
            tokohList={initialTokoh}
            tutors={initialTutors}
            bookings={bookings}
            mutabaahList={mutabaahList}
            profile={profile}
          />
        )}

        {currentTab === 'hidayah-rumah' && (
          <HidayahRumah
            tutors={initialTutors}
            bookings={bookings}
            onAddBooking={handleAddBooking}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            lang={lang}
          />
        )}

        {currentTab === 'tokoh' && (
          <TokohOrganisasi
            tokohList={initialTokoh}
            organisasiList={initialOrganisasi}
            onRewardPoints={handleRewardPoints}
          />
        )}

        {currentTab === 'ai-consultant' && (
          <AiConsultant
            gamification={profile}
            mutabaahList={mutabaahList}
            bookings={bookings}
            onRewardPoints={handleRewardPoints}
          />
        )}

        {currentTab === 'forum' && (
          <ForumKomunitas
            posts={forumPosts}
            onAddPost={handleAddPost}
            onLikePost={handleLikePost}
            onAddReply={handleAddReply}
            onRewardPoints={handleRewardPoints}
          />
        )}

        {currentTab === 'mutabaah' && (
          <GamifikasiMutabaah
            mutabaahList={mutabaahList}
            profile={profile}
            onToggleMutabaah={handleToggleMutabaah}
            onRewardPoints={handleRewardPoints}
          />
        )}

        {currentTab === 'hijriah' && (
          <HijriahJadwal
            hijriInfo={initialHijriInfo}
            onRewardPoints={handleRewardPoints}
          />
        )}

        {currentTab === 'analytics' && (
          <LaporanAnalitik
            bookings={bookings}
            mutabaahList={mutabaahList}
            profile={profile}
            onOpenPdfModal={() => setIsPdfModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 transition-colors duration-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base text-slate-900 dark:text-white">
                  Mualaf<span className="text-emerald-600 dark:text-emerald-400">City</span>
                </span>
                <p className="text-xs text-slate-500">
                  Infrastruktur Platform Cerdas Komunitas Mualaf Terpusat
                </p>
              </div>
            </div>

            {/* Direct Links to f.mualaf.islamicity.tv and t.me/MualafCity */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="http://f.mualaf.islamicity.tv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>f.mualaf.islamicity.tv</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://t.me/MualafCity"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-semibold border border-sky-200 dark:border-sky-800 hover:bg-sky-100 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>t.me/MualafCity</span>
              </a>

              <button
                onClick={() => setIsSecurityModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Enkripsi AES-256 (Aktif)</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <p>
              © 2026 MualafCity. Menghubungkan hidayah, pembimbing terverifikasi, dan komunitas digital global.
            </p>
            <p className="flex items-center gap-1">
              Dibina bersama Dewan Asatidz MCI & Komunitas Dakwah Sahabat Hijrah
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrintableReport
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        bookings={bookings}
        mutabaahList={mutabaahList}
        profile={profile}
      />

      <KeamananBackupModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        securityState={securityState}
        onUpdateSecurityState={setSecurityState}
        onRewardPoints={handleRewardPoints}
      />

      <NotificationCenter
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllRead}
        onAddTestNotification={handleAddTestNotification}
      />
    </div>
  );
}

export type Language = 'id' | 'en' | 'ar';

export interface Tutor {
  id: string;
  name: string;
  title: string;
  photo: string;
  gender: 'ikhwan' | 'akhwat';
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  certificationBadge: string;
  specializations: string[];
  bio: string;
  feeType: 'Baitul Mal (Gratis)' | 'Infaq Sukarela' | 'Bisyarah Standar';
  bisyarahNominal: number;
  city: string;
  distanceKm: number;
  availableDays: string[];
  availableHours: string;
  phone: string;
  completedVisits: number;
}

export interface HomeBooking {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorPhoto: string;
  studentName: string;
  studentPhone: string;
  address: string;
  city: string;
  scheduledDate: string;
  scheduledTime: string;
  topic: string;
  studentNotes?: string;
  feeType: string;
  status: 'pending' | 'confirmed' | 'on_the_way' | 'in_progress' | 'completed' | 'cancelled';
  checkinPin: string;
  gpsTrackStatus?: string;
  teacherReport?: {
    materialCovered: string;
    readingProgress: string;
    nextSteps: string;
    attendanceStatus: 'Hadir Tepat Waktu' | 'Izin Terlambat' | 'Selesai';
    score: number;
    completedAt: string;
  };
  ratingGiven?: number;
  reviewGiven?: string;
  createdAt: string;
}

export interface TokohMualaf {
  id: string;
  name: string;
  role: string;
  avatar: string;
  organization: string;
  originCountry: string;
  bio: string;
  expertise: string[];
  totalLectures: number;
  popularVideos: {
    id: string;
    title: string;
    duration: string;
    views: string;
    topic: string;
    isPremium: boolean;
    thumbnail: string;
  }[];
}

export interface OrganisasiMualaf {
  id: string;
  name: string;
  acronym: string;
  logo: string;
  focus: string;
  location: string;
  contact: string;
  website: string;
  programs: string[];
  description: string;
  verifiedMembers: number;
}

export interface ForumReply {
  id: string;
  authorName: string;
  authorRole: 'Mualaf Baru' | 'Pembimbing Bersertifikat' | 'Alumni' | 'Tokoh Dakwah';
  authorAvatar: string;
  content: string;
  timestamp: string;
  isMentor: boolean;
  upvotes: number;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorRole: 'Mualaf Baru' | 'Pembimbing' | 'Alumni' | 'Tokoh Dakwah';
  authorAvatar: string;
  category: 'Akidah Dasar' | 'Bimbingan Sholat' | 'Keluarga & Transisi' | 'Fiqh Muamalah' | 'Kisah Inspiratif';
  title: string;
  content: string;
  tags: string[];
  timestamp: string;
  likes: number;
  isLikedByUser?: boolean;
  hasMentorAnswer: boolean;
  replies: ForumReply[];
}

export interface MutabaahItem {
  id: string;
  key: string;
  label: string;
  description: string;
  rewardPoints: number;
  category: 'sholat' | 'quran' | 'dzikir' | 'amal' | 'kajian';
  isCompletedToday: boolean;
}

export interface GamificationProfile {
  points: number;
  streakDays: number;
  currentLevelTitle: string;
  levelNumber: number;
  badgesUnlocked: string[];
  rankPosition: number;
}

export interface HijriDayInfo {
  hijriDate: string;
  gregorianDate: string;
  prayerTimes: {
    subuh: string;
    terbit: string;
    dzuhur: string;
    ashar: string;
    maghrib: string;
    isya: string;
  };
  events: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'reminder' | 'session' | 'community' | 'system';
  read: boolean;
}

export interface SecurityState {
  twoFactorEnabled: boolean;
  cloudBackupProvider: 'Google Drive' | 'Dropbox' | 'MualafCity Cloud Vault';
  autoSyncEnabled: boolean;
  lastBackupDate: string;
  isEncrypted: boolean;
  offlineMode: boolean;
}

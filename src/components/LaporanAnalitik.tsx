import React, { useState } from 'react';
import {
  BarChart3,
  FileText,
  FileSpreadsheet,
  Download,
  Printer,
  Users,
  Compass,
  TrendingUp,
  Award,
  CheckCircle,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { HomeBooking, MutabaahItem, GamificationProfile } from '../types';
import { exportBookingsCSV, exportMutabaahCSV, triggerPrint } from '../utils/export';

interface LaporanAnalitikProps {
  bookings: HomeBooking[];
  mutabaahList: MutabaahItem[];
  profile: GamificationProfile;
  onOpenPdfModal: () => void;
}

export const LaporanAnalitik: React.FC<LaporanAnalitikProps> = ({
  bookings,
  mutabaahList,
  profile,
  onOpenPdfModal,
}) => {
  const [activeReportTab, setActiveReportTab] = useState<'admin' | 'user'>('admin');
  const [selectedMonth, setSelectedMonth] = useState('November 2026');

  // Community admin statistics
  const adminStats = {
    totalRegisteredMualaf: 14280,
    monthlyGrowthPercent: '+18.4%',
    verifiedTutors: 342,
    homeVisitsCompleted: 4890,
    averageRating: 4.94,
    questionsAnswered: 18240,
    topTopics: [
      { name: 'Koreksi Gerakan & Bacaan Sholat', count: 1890, percent: 38 },
      { name: 'Iqro & Tahsin Dasar Huruf Hijaiyah', count: 1240, percent: 25 },
      { name: 'Dialog Santun dengan Keluarga Non-Muslim', count: 980, percent: 20 },
      { name: 'Fiqh Halal & Muamalah Pekerjaan', count: 520, percent: 11 },
      { name: 'Konseling Transisi & Perlindungan', count: 260, percent: 6 },
    ],
    regionDistribution: [
      { name: 'Jabodetabek', count: 4920, bar: '80%' },
      { name: 'Jawa Barat & Banten', count: 3210, bar: '60%' },
      { name: 'Jawa Tengah & DIY', count: 2140, bar: '45%' },
      { name: 'Jawa Timur & Bali', count: 1980, bar: '40%' },
      { name: 'Luar Jawa & Mancanegara', count: 2030, bar: '42%' },
    ],
  };

  const completedHabitsCount = mutabaahList.filter((m) => m.isCompletedToday).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700/50">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            Pusat Analitik & Pelaporan Resmi
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dashboard Analitik & Ekspor Laporan Bulanan
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Pantau pertumbuhan warga mualaf, efektivitas bimbingan tatap muka ke rumah, indeks kepuasan, serta unduh rekapitulasi progres bulanan dalam format PDF siap cetak dan file CSV.
          </p>
        </div>

        {/* Action Buttons for PDF & CSV */}
        <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
          <button
            onClick={onOpenPdfModal}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-2xl text-xs font-extrabold shadow-md transition"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Unduh Laporan PDF</span>
          </button>
          <button
            onClick={() => exportBookingsCSV(bookings)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-2xl text-xs font-bold transition shadow-md border border-emerald-600"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Tab Switcher: Admin Analytics vs User Personal Productivity */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveReportTab('admin')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeReportTab === 'admin'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Dasbor Analitik Komunitas & Admin
          </button>
          <button
            onClick={() => setActiveReportTab('user')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeReportTab === 'user'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Statistik Produktivitas Pribadi Anda
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Periode Laporan:</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 font-semibold"
          >
            <option value="November 2026">November 2026</option>
            <option value="Oktober 2026">Oktober 2026</option>
            <option value="September 2026">September 2026</option>
          </select>
        </div>
      </div>

      {/* VIEW 1: ADMIN COMMUNITY ANALYTICS */}
      {activeReportTab === 'admin' && (
        <div className="space-y-6">
          {/* Key KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-medium">Total Warga Mualaf Terdata</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {adminStats.totalRegisteredMualaf.toLocaleString('id-ID')}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  {adminStats.monthlyGrowthPercent}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Verifikasi KTP & Akta Syahadat</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-medium">Sesi "Hidayah Datang ke Rumah"</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {adminStats.homeVisitsCompleted.toLocaleString('id-ID')}
                </span>
                <span className="text-xs font-bold text-sky-600 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-full">
                  Selesai
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Tersebar di 38 Kota/Kabupaten</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-medium">Tutor & Asatidz Terverifikasi</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {adminStats.verifiedTutors}
                </span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                  Aktif
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Tersertifikasi MCI & MUI</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-medium">Indeks Kepuasan Bimbingan</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  ★ {adminStats.averageRating}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  98.8% Puas
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Dari ulasan transparan siswa</p>
            </div>
          </div>

          {/* Topics Requested Breakdown & Geographic Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Topic Distribution */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Materi Bimbingan Paling Banyak Dibutuhkan
              </h3>
              <div className="space-y-4">
                {adminStats.topTopics.map((top, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-slate-800 dark:text-slate-200">{top.name}</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {top.count} sesi ({top.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${top.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Spread */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center justify-between">
                <span>Distribusi Wilayah Komunitas MualafCity</span>
                <span className="text-xs font-normal text-slate-400">Data Real-time</span>
              </h3>
              <div className="space-y-4">
                {adminStats.regionDistribution.map((reg, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {reg.name}
                      </span>
                      <span className="font-mono text-slate-600 dark:text-slate-300">
                        {reg.count.toLocaleString('id-ID')} Jiwa
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-600 rounded-full"
                        style={{ width: reg.bar }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: USER PERSONAL PRODUCTIVITY */}
      {activeReportTab === 'user' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-medium">Hari Istiqomah Beruntun</span>
              <div className="text-3xl font-black text-amber-500 flex items-center gap-2">
                <span>{profile.streakDays}</span>
                <span className="text-sm font-bold text-slate-500">Hari</span>
              </div>
              <p className="text-[11px] text-slate-400">Tidak pernah terputus bulan ini</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-medium">Akumulasi Poin Berkah</span>
              <div className="text-3xl font-black text-emerald-600 flex items-center gap-2">
                <span>{profile.points}</span>
                <span className="text-sm font-bold text-slate-500">Poin</span>
              </div>
              <p className="text-[11px] text-slate-400">Tingkat: {profile.currentLevelTitle}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-medium">Sesi Tatap Muka Rumah Diikuti</span>
              <div className="text-3xl font-black text-sky-600 flex items-center gap-2">
                <span>{bookings.length}</span>
                <span className="text-sm font-bold text-slate-500">Sesi</span>
              </div>
              <p className="text-[11px] text-slate-400">Dengan asatidz terverifikasi</p>
            </div>
          </div>

          {/* User History Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Riwayat Sesi Pembelajaran & Nilai Guru
              </h3>
              <button
                onClick={() => exportBookingsCSV(bookings)}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Riwayat (.CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Tanggal & Jam</th>
                    <th className="py-3 px-4">Tutor Pembimbing</th>
                    <th className="py-3 px-4">Fokus Materi</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Nilai Pemahaman</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        {b.scheduledDate} ({b.scheduledTime})
                      </td>
                      <td className="py-3 px-4">{b.tutorName}</td>
                      <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-medium">
                        {b.topic}
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                          {b.status === 'completed' ? 'Selesai' : b.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                        {b.teacherReport ? `${b.teacherReport.score} / 100` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

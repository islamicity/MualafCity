import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Compass,
  Bell,
  CheckCircle,
  ExternalLink,
  Download,
  Share2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { HijriDayInfo } from '../types';

interface HijriahJadwalProps {
  hijriInfo: HijriDayInfo;
  onRewardPoints: (points: number, reason: string) => void;
}

export const HijriahJadwal: React.FC<HijriahJadwalProps> = ({
  hijriInfo,
  onRewardPoints,
}) => {
  const [selectedCity, setSelectedCity] = useState('Jakarta & Sekitarnya (WIB)');
  const [notificationSettings, setNotificationSettings] = useState({
    subuh: true,
    dzuhur: true,
    ashar: true,
    maghrib: true,
    isya: true,
    kajianLive: true,
  });

  const [syncSuccessMsg, setSyncSuccessMsg] = useState<string | null>(null);

  const toggleNotif = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExportICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MualafCity//Hijriah Calendar//ID
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Jadwal Kajian MualafCity & Sholat
BEGIN:VEVENT
SUMMARY:Kajian Akbar MualafCity (t.me/MualafCity)
DESCRIPTION:Kajian rutin live bersama Koh Dondy Tan & Tim Asatidz MCI
DTSTART:20261108T130000Z
DTEND:20261108T143000Z
LOCATION:Online Telegram t.me/MualafCity
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
SUMMARY:Bimbingan Sholat Tatap Muka
DESCRIPTION:Sesi bimbingan Hidayah Datang ke Rumah
DTSTART:20261109T090000Z
DTEND:20261109T103000Z
LOCATION:Rumah Siswa
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Jadwal_MualafCity_Hijriah.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSyncSuccessMsg('File kalender .ICS berhasil diunduh! Siap diimpor ke Google Calendar / Apple Calendar.');
    onRewardPoints(15, 'Sinkronisasi Kalender Hijriah');
    setTimeout(() => setSyncSuccessMsg(null), 5000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hijri Header Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700/50">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            Kalender Hijriah & Penjadwalan Cerdas
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-arabic">
            {hijriInfo.hijriDate}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            {hijriInfo.gregorianDate} • Terhubung dengan waktu hisab Kementerian Agama RI & Kalender Islam Global
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
          <button
            onClick={handleExportICS}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold transition shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Sinkron Google Calendar / iCal (.ics)</span>
          </button>
        </div>
      </div>

      {syncSuccessMsg && (
        <div className="bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 p-4 rounded-2xl text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{syncSuccessMsg}</span>
        </div>
      )}

      {/* Prayer Times Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Jadwal Sholat 5 Waktu Hari Ini
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5"
            >
              <option value="Jakarta & Sekitarnya (WIB)">Jakarta & Sekitarnya (WIB)</option>
              <option value="Bandung & Jabar (WIB)">Bandung & Jabar (WIB)</option>
              <option value="Surabaya & Jatim (WIB)">Surabaya & Jatim (WIB)</option>
              <option value="Medan & Sumut (WIB)">Medan & Sumut (WIB)</option>
              <option value="Makassar & Sulsel (WITA)">Makassar & Sulsel (WITA)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'Subuh', time: hijriInfo.prayerTimes.subuh, icon: '🌅', key: 'subuh' as const },
            { name: 'Terbit', time: hijriInfo.prayerTimes.terbit, icon: '☀️', key: null },
            { name: 'Dzuhur', time: hijriInfo.prayerTimes.dzuhur, icon: '☀️', key: 'dzuhur' as const },
            { name: 'Ashar', time: hijriInfo.prayerTimes.ashar, icon: '🌤️', key: 'ashar' as const },
            { name: 'Maghrib', time: hijriInfo.prayerTimes.maghrib, icon: '🌇', key: 'maghrib' as const },
            { name: 'Isya', time: hijriInfo.prayerTimes.isya, icon: '🌙', key: 'isya' as const },
          ].map((pt, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border text-center space-y-2 transition ${
                pt.name === 'Maghrib'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="text-xl">{pt.icon}</div>
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">{pt.name}</h4>
              <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
                {pt.time}
              </div>

              {pt.key && (
                <button
                  onClick={() => toggleNotif(pt.key!)}
                  className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full transition font-semibold ${
                    notificationSettings[pt.key]
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-200 text-slate-500 dark:bg-slate-700'
                  }`}
                  title="Klik untuk ubah alarm pengingat adzan"
                >
                  <Bell className="w-3 h-3" />
                  <span>{notificationSettings[pt.key] ? 'Aktif' : 'Mati'}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Events & Kajian Live */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Agenda Kajian & Kegiatan Komunitas Terjadwal
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {hijriInfo.events.map((ev, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{ev}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Pengingat Aktif
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

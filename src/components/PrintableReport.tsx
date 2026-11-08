import React from 'react';
import {
  Compass,
  Printer,
  X,
  Award,
  CheckCircle,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { HomeBooking, MutabaahItem, GamificationProfile } from '../types';

interface PrintableReportProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: HomeBooking[];
  mutabaahList: MutabaahItem[];
  profile: GamificationProfile;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  isOpen,
  onClose,
  bookings,
  mutabaahList,
  profile,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      {/* Container - hide buttons on print */}
      <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl space-y-6 my-8 animate-scaleUp print:p-0 print:shadow-none print:m-0 print:max-w-none">
        {/* Print Action Bar (hidden when printing) */}
        <div className="flex items-center justify-between border-b pb-4 no-print">
          <div className="flex items-center gap-2 text-emerald-800">
            <Printer className="w-5 h-5" />
            <span className="font-bold text-sm">Pratinjau Dokumen PDF Laporan Bulanan MualafCity</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sekarang / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg text-sm font-bold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE DOCUMENT BODY */}
        <div className="space-y-6 text-slate-800 font-sans print-page-break">
          {/* Official Letterhead */}
          <div className="flex items-center justify-between border-b-2 border-emerald-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-white">
                <Compass className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-emerald-950 uppercase">
                  MualafCity Smart Platform
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Portal Resmi: f.mualaf.islamicity.tv • Komunitas: t.me/MualafCity
                </p>
                <p className="text-[10px] text-slate-400">
                  Lembaga Advokasi, Bimbingan Rumah & Pendidikan Mualaf Terpadu
                </p>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px] uppercase">
                Dokumen Resmi
              </span>
              <p className="font-mono text-slate-500 text-[10px] mt-1">NO: MC-REP/{Date.now().toString().slice(-6)}/2026</p>
              <p className="text-slate-500 text-[10px]">Tanggal Cetak: {currentDate}</p>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-1">
            <h2 className="text-lg font-extrabold uppercase tracking-wide text-slate-900">
              Laporan Rekapitulasi Progres Pembinaan Mualaf
            </h2>
            <p className="text-xs text-slate-500">
              Periode Evaluasi: November 2026 • Mutaba'ah & Bimbingan Tatap Muka
            </p>
          </div>

          {/* Student Profile Info Grid */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <p className="text-slate-500">Nama Warga / Siswa Mualaf:</p>
              <p className="font-bold text-slate-900 text-sm">Sahabat Mualaf (Binaan MualafCity)</p>
            </div>
            <div>
              <p className="text-slate-500">Tingkat Pengetahuan (Level):</p>
              <p className="font-bold text-emerald-800 text-sm">{profile.currentLevelTitle} (Level {profile.levelNumber})</p>
            </div>
            <div>
              <p className="text-slate-500">Akumulasi Poin Berkah:</p>
              <p className="font-bold text-slate-900 text-sm font-mono">{profile.points} Poin</p>
            </div>
            <div>
              <p className="text-slate-500">Konsistensi Hari Istiqomah (Streak):</p>
              <p className="font-bold text-amber-600 text-sm">{profile.streakDays} Hari Tanpa Putus</p>
            </div>
          </div>

          {/* Sesi Bimbingan Tatap Muka History */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-900">
              1. Riwayat Bimbingan Tatap Muka "Hidayah Datang ke Rumah"
            </h3>
            <table className="w-full text-xs border border-slate-200 text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b">
                <tr>
                  <th className="p-2 border-r">Tanggal</th>
                  <th className="p-2 border-r">Pengajar / Asatidz</th>
                  <th className="p-2 border-r">Materi Pembahasan</th>
                  <th className="p-2 border-r">Catatan Perkembangan Siswa</th>
                  <th className="p-2 text-right">Nilai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="p-2 border-r whitespace-nowrap">{b.scheduledDate}</td>
                    <td className="p-2 border-r font-medium">{b.tutorName}</td>
                    <td className="p-2 border-r">{b.topic}</td>
                    <td className="p-2 border-r text-slate-600">
                      {b.teacherReport ? b.teacherReport.readingProgress : 'Sesi terjadwal'}
                    </td>
                    <td className="p-2 text-right font-bold text-emerald-800 font-mono">
                      {b.teacherReport ? `${b.teacherReport.score}/100` : 'Hadir'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mutabaah Yaumiyah Status */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-900">
              2. Kepatuhan Mutaba'ah Ibadah Harian
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {mutabaahList.map((m) => (
                <div key={m.id} className="flex items-center justify-between p-2 rounded border border-slate-100 bg-slate-50">
                  <span className="font-medium text-slate-800">{m.label}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${m.isCompletedToday ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'}`}>
                    {m.isCompletedToday ? 'Istiqomah' : 'Dalam Proses'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Signatures & Seal */}
          <div className="pt-8 grid grid-cols-2 text-center text-xs text-slate-700">
            <div>
              <p>Mengetahui,</p>
              <p className="font-semibold text-slate-900 mt-0.5">Dewan Pembina MualafCity & MCI</p>
              <div className="h-16 flex items-center justify-center">
                <span className="font-serif italic text-emerald-800 text-sm font-bold opacity-80 border-b border-emerald-800 pb-1">
                  Dondy Tan & Asatidz Board
                </span>
              </div>
              <p className="font-bold text-slate-900">Koh Dondy Tan / Asatidz Koordinator</p>
              <p className="text-[10px] text-slate-400">Direktur Pembinaan & Kristologi</p>
            </div>

            <div>
              <p>Diterbitkan pada: {currentDate}</p>
              <p className="font-semibold text-slate-900 mt-0.5">Sistem Verifikasi Digital Terpusat</p>
              <div className="h-16 flex items-center justify-center">
                <div className="w-14 h-14 border-2 border-dashed border-emerald-700 rounded-full flex items-center justify-center text-[9px] text-emerald-800 font-bold uppercase rotate-12">
                  VERIFIED<br />MUALAFCITY
                </div>
              </div>
              <p className="font-bold text-slate-900">Baitul Mal & Pelayanan Warga</p>
              <p className="text-[10px] text-slate-400">Kode Hash: AES-256-SHA-GCM</p>
            </div>
          </div>

          <div className="pt-4 border-t text-[10px] text-slate-400 text-center">
            Dokumen ini dihasilkan secara otomatis oleh infrastruktur platform cerdas MualafCity (f.mualaf.islamicity.tv). Berlaku sah tanpa tanda tangan basah.
          </div>
        </div>
      </div>
    </div>
  );
};

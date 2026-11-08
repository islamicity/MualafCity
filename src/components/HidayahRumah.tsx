import React, { useState } from 'react';
import {
  Compass,
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Phone,
  User,
  FileText,
  Navigation,
  KeyRound,
  PlusCircle,
  Award,
  AlertCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Tutor, HomeBooking, Language } from '../types';
import { getTranslation } from '../data/translations';

interface HidayahRumahProps {
  tutors: Tutor[];
  bookings: HomeBooking[];
  onAddBooking: (newBooking: HomeBooking) => void;
  onUpdateBookingStatus: (id: string, status: HomeBooking['status'], report?: HomeBooking['teacherReport']) => void;
  lang: Language;
}

export const HidayahRumah: React.FC<HidayahRumahProps> = ({
  tutors,
  bookings,
  onAddBooking,
  onUpdateBookingStatus,
  lang,
}) => {
  const t = getTranslation(lang);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [filterSpecialty, setFilterSpecialty] = useState<string>('semua');
  const [filterGender, setFilterGender] = useState<'semua' | 'ikhwan' | 'akhwat'>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Booking Form State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Jakarta Selatan');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('16:00 WIB');
  const [topic, setTopic] = useState('Bimbingan Sholat dari Nol & Tahsin Al-Fatihah');
  const [studentNotes, setStudentNotes] = useState('');
  const [feeType, setFeeType] = useState('Baitul Mal (Gratis)');

  // Teacher Report Modal State
  const [reportingBooking, setReportingBooking] = useState<HomeBooking | null>(null);
  const [materialCovered, setMaterialCovered] = useState('');
  const [readingProgress, setReadingProgress] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState<'Hadir Tepat Waktu' | 'Izin Terlambat' | 'Selesai'>('Hadir Tepat Waktu');
  const [score, setScore] = useState(90);

  // Filter tutors
  const filteredTutors = tutors.filter((tutor) => {
    const matchSpecialty =
      filterSpecialty === 'semua' ||
      tutor.specializations.some((s) => s.toLowerCase().includes(filterSpecialty.toLowerCase()));
    const matchGender = filterGender === 'semua' || tutor.gender === filterGender;
    const matchSearch =
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tutor.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSpecialty && matchGender && matchSearch;
  });

  const handleOpenBooking = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setFeeType(tutor.feeType);
    setIsBookingModalOpen(true);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTutor || !studentName || !address || !scheduledDate) return;

    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const newBooking: HomeBooking = {
      id: `bk-${Date.now()}`,
      tutorId: selectedTutor.id,
      tutorName: selectedTutor.name,
      tutorPhoto: selectedTutor.photo,
      studentName,
      studentPhone: studentPhone || '+62 812-0000-0000',
      address,
      city,
      scheduledDate,
      scheduledTime,
      topic,
      studentNotes,
      feeType,
      status: 'confirmed',
      checkinPin: randomPin,
      gpsTrackStatus: 'Tutor telah mengkonfirmasi jadwal. Menunggu jam keberangkatan.',
      createdAt: new Date().toLocaleString('id-ID'),
    };

    onAddBooking(newBooking);
    setIsBookingModalOpen(false);
    // Reset fields
    setStudentName('');
    setStudentPhone('');
    setAddress('');
    setStudentNotes('');
  };

  const handleOpenTeacherReport = (booking: HomeBooking) => {
    setReportingBooking(booking);
    setMaterialCovered(booking.teacherReport?.materialCovered || 'Pembahasan rukun sholat & makharijul huruf');
    setReadingProgress(booking.teacherReport?.readingProgress || 'Iqro Jilid 2 halaman 14 lancar');
    setNextSteps(booking.teacherReport?.nextSteps || 'Latihan mandiri surat Al-Ikhlas dan posisi tasyahhud');
    setScore(booking.teacherReport?.score || 92);
  };

  const handleSaveTeacherReport = () => {
    if (!reportingBooking) return;
    const report: HomeBooking['teacherReport'] = {
      materialCovered,
      readingProgress,
      nextSteps,
      attendanceStatus,
      score,
      completedAt: new Date().toLocaleString('id-ID'),
    };
    onUpdateBookingStatus(reportingBooking.id, 'completed', report);
    setReportingBooking(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner: Hidayah Datang ke Rumah */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-700/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Layanan Bimbingan Privat Tatap Muka
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Hidayah Datang ke Rumah Anda
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Tidak perlu khawatir atau merasa sungkan. Hadirkan pembimbing & asatidz terverifikasi MUI dan Mualaf Center ke kediaman Anda secara privat, nyaman, dan aman. Mulai dari belajar wudhu, sholat bertahap, membaca Al-Quran, hingga konseling keluarga pasca syahadat.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" /> Verifikasi Identitas Ketat (KTP & Sertifikasi)
            </span>
            <span className="flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-emerald-400" /> Pelacakan Kehadiran Real-time & PIN
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Tersedia Opsi Gratis Subsidi Baitul Mal
            </span>
          </div>
        </div>

        {/* Ambient watermark pattern */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <Compass className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Booking Tracker & Active Sessions Alert */}
      {bookings.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Status Bimbingan Rumah Anda ({bookings.length} Sesi Terdata)
              </h2>
            </div>
            <span className="text-xs text-slate-500">Otomatis Tersinkronisasi</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={b.tutorPhoto}
                      alt={b.tutorName}
                      className="w-12 h-12 rounded-full object-cover border border-emerald-500"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{b.tutorName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Siswa: {b.studentName}</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{b.topic}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      b.status === 'on_the_way'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse'
                        : b.status === 'in_progress'
                        ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                        : b.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {b.status === 'on_the_way'
                      ? 'Menuju Lokasi'
                      : b.status === 'in_progress'
                      ? 'Sedang Belajar'
                      : b.status === 'completed'
                      ? 'Sesi Selesai'
                      : 'Terkonfirmasi'}
                  </span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 bg-white dark:bg-slate-900/80 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Waktu Jadwal:</span>
                    <span className="font-semibold">{b.scheduledDate} ({b.scheduledTime})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Alamat:</span>
                    <span className="truncate max-w-[200px]" title={b.address}>{b.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">PIN Konfirmasi Kedatangan:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm tracking-wider">
                      #{b.checkinPin}
                    </span>
                  </div>
                  {b.gpsTrackStatus && (
                    <div className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <Navigation className="w-3 h-3 shrink-0" />
                      <span>{b.gpsTrackStatus}</span>
                    </div>
                  )}
                </div>

                {/* Teacher report summary if completed */}
                {b.teacherReport && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-emerald-800 dark:text-emerald-300">
                      <span>Laporan Evaluasi Pembimbing:</span>
                      <span className="bg-emerald-200 dark:bg-emerald-900 px-1.5 py-0.5 rounded text-[10px]">
                        Nilai: {b.teacherReport.score}/100
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500">Materi:</span> {b.teacherReport.materialCovered}</p>
                    <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500">Progres Baca:</span> {b.teacherReport.readingProgress}</p>
                    <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500">Rekomendasi:</span> {b.teacherReport.nextSteps}</p>
                  </div>
                )}

                {/* Session Action Controls */}
                <div className="flex items-center justify-between pt-1 gap-2">
                  {b.status === 'on_the_way' && (
                    <button
                      onClick={() => onUpdateBookingStatus(b.id, 'in_progress')}
                      className="w-full py-1.5 px-3 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg transition"
                    >
                      Konfirmasi Tutor Sudah Tiba (Mulai Sesi)
                    </button>
                  )}
                  {b.status === 'in_progress' && (
                    <button
                      onClick={() => handleOpenTeacherReport(b)}
                      className="w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Input Laporan Otomatis Guru & Selesaikan Sesi
                    </button>
                  )}
                  {b.status === 'completed' && !b.ratingGiven && (
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Sesi Selesai & Terverifikasi</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Directory of Verified Tutors */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Daftar Asatidz & Pembimbing Mualaf Terverifikasi
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pilih pengajar profesional yang paling sesuai dengan kebutuhan bimbingan Anda di rumah
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value as any)}
              className="text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5"
            >
              <option value="semua">Semua Gender (Ikhwan & Akhwat)</option>
              <option value="ikhwan">Ustadz / Ikhwan</option>
              <option value="akhwat">Ustadzah / Akhwat</option>
            </select>

            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5"
            >
              <option value="semua">Semua Spesialisasi</option>
              <option value="sholat">Bimbingan Sholat</option>
              <option value="tahsin">Iqro & Tahsin</option>
              <option value="akidah">Akidah Mualaf</option>
              <option value="keluarga">Konseling Keluarga</option>
            </select>
          </div>
        </div>

        {/* Tutor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <img
                    src={tutor.photo}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600/40 shadow-sm shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-bold text-slate-900 dark:text-white text-base truncate">
                        {tutor.name}
                      </h3>
                      {tutor.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          Terverifikasi
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tutor.title}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {tutor.rating} ({tutor.reviewsCount} ulasan)
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        {tutor.city} ({tutor.distanceKm} km)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badge Note */}
                <div className="text-[11px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{tutor.certificationBadge}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {tutor.bio}
                </p>

                {/* Specializations Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {tutor.specializations.map((spec, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Schedule & Booking Button */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Metode Pembiayaan:</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {tutor.feeType === 'Baitul Mal (Gratis)' ? (
                      <span className="text-emerald-600 dark:text-emerald-400">Gratis (Subsidi Baitul Mal)</span>
                    ) : tutor.feeType === 'Infaq Sukarela' ? (
                      <span>Infaq Sukarela</span>
                    ) : (
                      <span>Bisyarah Standar (Rp {tutor.bisyarahNominal.toLocaleString('id-ID')})</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenBooking(tutor)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Pesan ke Rumah
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedTutor.photo}
                  alt={selectedTutor.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Pesan Sesi Rumah: {selectedTutor.name}
                  </h3>
                  <p className="text-xs text-emerald-600">{selectedTutor.city} • {selectedTutor.certificationBadge}</p>
                </div>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitBooking} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Nama Anda / Siswa Mualaf <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Contoh: Budi Hartono (Nama Hijrah: Abdullah)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="+62 812-xxxx-xxxx"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Kota / Wilayah
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Jakarta Barat">Jakarta Barat</option>
                    <option value="Jakarta Pusat">Jakarta Pusat</option>
                    <option value="Jakarta Timur">Jakarta Timur</option>
                    <option value="Jakarta Utara">Jakarta Utara</option>
                    <option value="Tangerang & Tangsel">Tangerang & Tangsel</option>
                    <option value="Bekasi">Bekasi</option>
                    <option value="Depok & Bogor">Depok & Bogor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Alamat Lengkap Rumah / Lokasi Bimbingan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, RT/RW, patokan lokasi yang mudah ditemukan pengajar..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Pilih Tanggal Sesi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Pilih Jam
                  </label>
                  <select
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="09:00 WIB (Pagi)">09:00 WIB (Pagi)</option>
                    <option value="13:30 WIB (Siang)">13:30 WIB (Siang)</option>
                    <option value="16:00 WIB (Sore - Ashar)">16:00 WIB (Sore - Ashar)</option>
                    <option value="19:30 WIB (Malam - Isya)">19:30 WIB (Malam - Isya)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Materi Fokus yang Ingin Dipelajari
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Bimbingan Sholat dari Nol & Tahsin Al-Fatihah">Bimbingan Sholat dari Nol & Tahsin Al-Fatihah</option>
                  <option value="Belajar Membaca Iqro Dasar Huruf Hijaiyah">Belajar Membaca Iqro Dasar Huruf Hijaiyah</option>
                  <option value="Konseling Menghadapi Ujian Keluarga Pasca Syahadat">Konseling Menghadapi Ujian Keluarga Pasca Syahadat</option>
                  <option value="Pendalaman Akidah Tauhid & Pembersihan Syirik">Pendalaman Akidah Tauhid & Pembersihan Syirik</option>
                  <option value="Fiqh Bersuci (Thaharah), Mandi Wajib & Wudhu">Fiqh Bersuci (Thaharah), Mandi Wajib & Wudhu</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Metode Bisyarah / Pembiayaan
                </label>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>{selectedTutor.feeType}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Bagi mualaf yang membutuhkan, seluruh biaya perjalanan dan bimbingan guru ditanggung penuh oleh Baitul Mal MualafCity. Tidak ada beban biaya wajib.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition"
                >
                  Konfirmasi & Terbitkan PIN Kedatangan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Report Modal */}
      {reportingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Sistem Pelaporan Otomatis Guru & Asatidz
                </h3>
              </div>
              <button
                onClick={() => setReportingBooking(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Sesi untuk siswa: <span className="font-bold text-slate-800 dark:text-slate-200">{reportingBooking.studentName}</span> • Tutor: {reportingBooking.tutorName}
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Materi yang Telah Disampaikan
                </label>
                <textarea
                  rows={2}
                  value={materialCovered}
                  onChange={(e) => setMaterialCovered(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Perkembangan Bacaan / Praktik Siswa
                </label>
                <input
                  type="text"
                  value={readingProgress}
                  onChange={(e) => setReadingProgress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Rekomendasi Latihan / PR Tindak Lanjut
                </label>
                <input
                  type="text"
                  value={nextSteps}
                  onChange={(e) => setNextSteps(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Status Kehadiran
                  </label>
                  <select
                    value={attendanceStatus}
                    onChange={(e) => setAttendanceStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Hadir Tepat Waktu">Hadir Tepat Waktu</option>
                    <option value="Izin Terlambat">Izin Terlambat</option>
                    <option value="Selesai">Selesai Normal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Skor Pemahaman Siswa ({score}/100)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setReportingBooking(null)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveTeacherReport}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition"
                >
                  Simpan Laporan & Berikan +50 Poin Berkah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

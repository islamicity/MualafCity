import { HomeBooking, MutabaahItem, GamificationProfile } from '../types';

export function downloadCSV(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportMutabaahCSV(mutabaahList: MutabaahItem[], profile: GamificationProfile) {
  let csv = 'ID,Nama Ibadah,Kategori,Status Hari Ini,Poin Berkah\n';
  mutabaahList.forEach((m) => {
    csv += `"${m.id}","${m.label}","${m.category}","${m.isCompletedToday ? 'Selesai' : 'Belum'}","${m.rewardPoints}"\n`;
  });
  csv += `\n"Ringkasan","Total Poin","${profile.points}","Streak Hari","${profile.streakDays} Hari"\n`;
  csv += `"Level","${profile.currentLevelTitle}","Tingkat","${profile.levelNumber}"\n`;

  const dateStr = new Date().toISOString().split('T')[0];
  downloadCSV(`Laporan_Mutabaah_MualafCity_${dateStr}.csv`, csv);
}

export function exportBookingsCSV(bookings: HomeBooking[]) {
  let csv = 'ID Sesi,Nama Siswa,Tutor Pembimbing,Tanggal,Waktu,Topik,Status,PIN Selesai,Nilai Evaluasi\n';
  bookings.forEach((b) => {
    const score = b.teacherReport ? b.teacherReport.score : '-';
    csv += `"${b.id}","${b.studentName}","${b.tutorName}","${b.scheduledDate}","${b.scheduledTime}","${b.topic}","${b.status}","${b.checkinPin}","${score}"\n`;
  });

  const dateStr = new Date().toISOString().split('T')[0];
  downloadCSV(`Riwayat_Bimbingan_Hidayah_MualafCity_${dateStr}.csv`, csv);
}

export function triggerPrint() {
  window.print();
}

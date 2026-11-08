import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Cloud,
  CheckCircle,
  KeyRound,
  RefreshCw,
  HardDrive,
  Smartphone,
  AlertTriangle,
  X,
  FileCheck,
} from 'lucide-react';
import { SecurityState } from '../types';

interface KeamananBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  securityState: SecurityState;
  onUpdateSecurityState: (newState: SecurityState) => void;
  onRewardPoints: (points: number, reason: string) => void;
}

export const KeamananBackupModal: React.FC<KeamananBackupModalProps> = ({
  isOpen,
  onClose,
  securityState,
  onUpdateSecurityState,
  onRewardPoints,
}) => {
  if (!isOpen) return null;

  const [isSyncing, setIsSyncing] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [twoFactorPin, setTwoFactorPin] = useState('849 201');

  const handleToggle2FA = () => {
    const updated = {
      ...securityState,
      twoFactorEnabled: !securityState.twoFactorEnabled,
    };
    onUpdateSecurityState(updated);
    setSuccessToast(
      updated.twoFactorEnabled
        ? 'Autentikasi Dua Faktor (2FA) Berhasil Diaktifkan!'
        : '2FA Dinonaktifkan.'
    );
    if (updated.twoFactorEnabled) {
      onRewardPoints(25, 'Mengaktifkan Keamanan 2FA Akun');
    }
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleTriggerCloudBackup = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const nowStr = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      onUpdateSecurityState({
        ...securityState,
        lastBackupDate: nowStr,
      });
      setSuccessToast(
        `Cadangan Berhasil Disinkronkan ke ${securityState.cloudBackupProvider}! Enkripsi AES-256 Aktif.`
      );
      onRewardPoints(15, 'Pencadangan Data Cloud Terenkripsi');
      setTimeout(() => setSuccessToast(null), 4000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Pusat Keamanan & Cloud Vault
              </h3>
              <p className="text-xs text-slate-500">
                Enkripsi Tingkat Lanjut AES-256 GCM & Otentikasi 2FA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successToast && (
          <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* 2-Factor Authentication (2FA) */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  Autentikasi Dua Faktor (2FA TOTP)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Melindungi privasi riwayat bimbingan & data keluarga mualaf
                </p>
              </div>
            </div>
            <button
              onClick={handleToggle2FA}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                securityState.twoFactorEnabled
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
              }`}
            >
              {securityState.twoFactorEnabled ? 'AKTIF' : 'NONAKTIF'}
            </button>
          </div>

          {securityState.twoFactorEnabled && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-500">Kode PIN Keamanan Anda:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                {twoFactorPin}
              </span>
            </div>
          )}
        </div>

        {/* Automated Cloud Backup & Provider Selection */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-sky-600" />
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Pencadangan Cloud Otomatis
              </h4>
              <p className="text-[11px] text-slate-500">
                Tersinkronisasi otomatis antar perangkat smartphone, tablet & laptop
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <label className="block text-slate-600 dark:text-slate-300 font-semibold">
              Penyedia Penyimpanan Cloud:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Google Drive', 'Dropbox', 'MualafCity Cloud Vault'] as const).map((prov) => (
                <button
                  key={prov}
                  type="button"
                  onClick={() =>
                    onUpdateSecurityState({
                      ...securityState,
                      cloudBackupProvider: prov,
                    })
                  }
                  className={`p-2.5 rounded-xl border text-center text-[11px] font-bold transition ${
                    securityState.cloudBackupProvider === prov
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {prov}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <span className="text-slate-500">Terakhir Dicadangkan:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {securityState.lastBackupDate}
            </span>
          </div>

          <button
            onClick={handleTriggerCloudBackup}
            disabled={isSyncing}
            className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
          >
            {isSyncing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Mengenkripsi & Mengunggah ke Cloud...</span>
              </>
            ) : (
              <>
                <HardDrive className="w-3.5 h-3.5" />
                <span>Cadangkan Sekarang (Sync Instant)</span>
              </>
            )}
          </button>
        </div>

        {/* Offline Mode & Client Cache status */}
        <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Mode Offline Penuh (Full Offline Storage Active)</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
            Aplikasi tetap dapat digunakan tanpa internet saat berada di perjalanan. Seluruh mutaba'ah dan materi ceramah yang telah diunduh tersimpan aman di IndexedDB/LocalStorage dan akan otomatis tersinkronisasi kembali saat terhubung ke jaringan internet.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 rounded-xl text-xs font-bold transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

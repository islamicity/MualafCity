import React from 'react';
import {
  Bell,
  CheckCheck,
  Compass,
  Calendar,
  Users,
  ShieldAlert,
  X,
  Volume2,
  Sparkles,
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onAddTestNotification: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onAddTestNotification,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Pusat Notifikasi Push & Pengingat
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick action bar */}
        <div className="flex items-center justify-between text-xs pt-1">
          <button
            onClick={onMarkAllAsRead}
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Tandai Semua Dibaca</span>
          </button>

          <button
            onClick={onAddTestNotification}
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-medium flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg"
            title="Kirim pengingat uji coba"
          >
            <Volume2 className="w-3 h-3 text-amber-500" />
            <span>Tes Push Pengingat</span>
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              Belum ada notifikasi baru hari ini.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-2xl border transition space-y-1.5 ${
                  notif.read
                    ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-75'
                    : 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {notif.type === 'session' && (
                      <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {notif.type === 'reminder' && (
                      <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    {notif.type === 'community' && (
                      <Users className="w-4 h-4 text-sky-500 shrink-0" />
                    )}
                    {notif.type === 'system' && (
                      <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0" />
                    )}
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      {notif.title}
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {notif.message}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold rounded-xl transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Users,
  Search,
  Video,
  Download,
  Lock,
  Play,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Filter,
  Sparkles,
  Award,
  Globe,
  Radio,
  Share2,
} from 'lucide-react';
import { TokohMualaf, OrganisasiMualaf } from '../types';

interface TokohOrganisasiProps {
  tokohList: TokohMualaf[];
  organisasiList: OrganisasiMualaf[];
  onRewardPoints: (points: number, reason: string) => void;
}

export const TokohOrganisasi: React.FC<TokohOrganisasiProps> = ({
  tokohList,
  organisasiList,
  onRewardPoints,
}) => {
  const [activeTab, setActiveTab] = useState<'tokoh' | 'organisasi' | 'kajian'>('tokoh');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('semua');
  const [selectedTopic, setSelectedTopic] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<{
    id: string;
    title: string;
    speaker: string;
    views: string;
    topic: string;
    thumbnail: string;
  } | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState<boolean>(false);

  // Collect all videos from tokohList
  const allVideos = tokohList.flatMap((t) =>
    t.popularVideos.map((v) => ({
      ...v,
      speaker: t.name,
      speakerAvatar: t.avatar,
      speakerOrg: t.organization,
    }))
  );

  const filteredVideos = allVideos.filter((v) => {
    const matchSpeaker = selectedSpeaker === 'semua' || v.speaker.includes(selectedSpeaker);
    const matchTopic = selectedTopic === 'semua' || v.topic.toLowerCase().includes(selectedTopic.toLowerCase());
    const matchSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSpeaker && matchTopic && matchSearch;
  });

  const handlePlayVideo = (vid: any) => {
    if (vid.isPremium && !isPremiumUnlocked) {
      setShowSubscriptionModal(true);
      return;
    }
    setActiveVideo(vid);
    onRewardPoints(25, `Menyimak kajian: ${vid.title}`);
  };

  const handleDownloadOffline = (vidId: string) => {
    if (!downloadedIds.includes(vidId)) {
      setDownloadedIds([...downloadedIds, vidId]);
      onRewardPoints(10, 'Mengunduh materi untuk akses offline');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section with Portal & Telegram banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700/50">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            Pusat Pengetahuan & Kajian Tokoh Mualaf
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Direktori Tokoh, Da'i & Organisasi Mualaf Dunia
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Akses kurikulum kajian mendalam dari tokoh-tokoh pembina mualaf terkemuka seperti <strong>Koh Dondy Tan</strong>, <strong>Dr. Zakir Naik</strong>, <strong>Koh Steven Indra Wibowo (MCI)</strong>, dan para asatidz berpengalaman. Terintegrasi langsung dengan portal resmi dan grup diskusi.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
          <a
            href="http://f.mualaf.islamicity.tv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition shadow-md border border-emerald-500/40 text-center"
          >
            <Globe className="w-4 h-4" />
            <span>Kunjungi f.mualaf.islamicity.tv</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
          </a>
          <a
            href="https://t.me/MualafCity"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition shadow-md text-center"
          >
            <Share2 className="w-4 h-4" />
            <span>Gabung t.me/MualafCity (28k+)</span>
          </a>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('tokoh')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'tokoh'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Tokoh & Da'i Mualaf ({tokohList.length})
          </button>
          <button
            onClick={() => setActiveTab('kajian')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'kajian'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Perpustakaan Video & Ceramah ({allVideos.length})
          </button>
          <button
            onClick={() => setActiveTab('organisasi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'organisasi'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Lembaga & Safe House ({organisasiList.length})
          </button>
        </div>

        {/* Premium pass indicator */}
        <div className="flex items-center gap-2">
          {isPremiumUnlocked ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-full text-xs font-semibold border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Member VIP Aktif (Semua Materi Terbuka)
            </span>
          ) : (
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-xl text-xs font-extrabold shadow-sm transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Langganan Akses Eksklusif & Offline
            </button>
          )}
        </div>
      </div>

      {/* Active Video Player Simulator */}
      {activeVideo && (
        <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4 border border-emerald-800/60 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Memutar Kajian MualafCity HD
              </span>
            </div>
            <button
              onClick={() => setActiveVideo(null)}
              className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg"
            >
              Tutup Pemutar ✕
            </button>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center group shadow-inner">
            <img
              src={activeVideo.thumbnail}
              alt={activeVideo.title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-300"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition cursor-pointer">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <p className="text-xs text-slate-300 max-w-md">
                Klik play untuk streaming audio/video. Tersedia transkrip teks dan ringkasan intisari otomatis.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold">{activeVideo.title}</h3>
              <p className="text-xs text-emerald-300">
                Pembicara: {activeVideo.speaker} • Topik: {activeVideo.topic} • {activeVideo.views} Penonton
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownloadOffline(activeVideo.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  downloadedIds.includes(activeVideo.id)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadedIds.includes(activeVideo.id) ? 'Tersimpan Offline' : 'Unduh Offline'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: TOKOH & DA'I */}
      {activeTab === 'tokoh' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokohList.map((tokoh) => (
            <div
              key={tokoh.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={tokoh.avatar}
                    alt={tokoh.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600 shadow-sm"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {tokoh.name}
                    </h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                      {tokoh.role}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {tokoh.organization} ({tokoh.originCountry})
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {tokoh.bio}
                </p>

                {/* Expertise tags */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Fokus Pembinaan:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {tokoh.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-medium border border-emerald-100 dark:border-emerald-800/40"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Popular Videos List Preview */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Materi Populer:</span>
                    <span className="text-[10px] text-slate-400 font-normal">{tokoh.totalLectures}+ Rekaman</span>
                  </span>
                  <div className="space-y-1.5">
                    {tokoh.popularVideos.slice(0, 2).map((vid) => (
                      <div
                        key={vid.id}
                        onClick={() => handlePlayVideo({ ...vid, speaker: tokoh.name, thumbnail: vid.thumbnail })}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 transition cursor-pointer flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Play className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate text-slate-800 dark:text-slate-200 font-medium">
                            {vid.title}
                          </span>
                        </div>
                        {vid.isPremium && (
                          <span title="Materi Eksklusif">
                            <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedSpeaker(tokoh.name.split(' ')[1] || tokoh.name);
                  setActiveTab('kajian');
                }}
                className="w-full py-2 bg-slate-100 hover:bg-emerald-700 hover:text-white dark:bg-slate-800 dark:hover:bg-emerald-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition text-center"
              >
                Lihat Semua Rekaman Ceramah →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: PERPUSTAKAAN KAJIAN & SMART SEARCH */}
      {activeTab === 'kajian' && (
        <div className="space-y-6">
          {/* Smart Search & Filters Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pencarian cerdas: judul ceramah, topik kristologi, akidah, atau nama tokoh..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
                className="text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-2"
              >
                <option value="semua">Semua Pembicara</option>
                <option value="Dondy Tan">Koh Dondy Tan</option>
                <option value="Zakir Naik">Dr. Zakir Naik</option>
                <option value="Steven">Koh Steven (MCI)</option>
                <option value="Felix Siauw">Ustadz Felix Siauw</option>
                <option value="Hanny Kristianto">Koh Hanny Kristianto</option>
                <option value="Kainama">Ustadz Kainama</option>
              </select>

              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-2"
              >
                <option value="semua">Semua Topik</option>
                <option value="akidah">Akidah & Tauhid</option>
                <option value="komparasi">Komparasi Agama & Kristologi</option>
                <option value="keluarga">Keluarga & Transisi</option>
                <option value="logika">Logika & Sains</option>
              </select>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((vid) => (
              <div
                key={vid.id}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div
                    className="relative aspect-video overflow-hidden bg-slate-950 cursor-pointer"
                    onClick={() => handlePlayVideo(vid)}
                  >
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-3">
                      <span className="text-[11px] font-semibold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        {vid.duration}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {vid.isPremium && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                            <Lock className="w-3 h-3" /> Eksklusif
                          </span>
                        )}
                        <span className="w-8 h-8 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-md">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">{vid.topic}</span>
                      <span>{vid.views} Ditonton</span>
                    </div>

                    <h3
                      onClick={() => handlePlayVideo(vid)}
                      className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition cursor-pointer line-clamp-2"
                    >
                      {vid.title}
                    </h3>

                    <div className="flex items-center gap-2 pt-1">
                      <img
                        src={vid.speakerAvatar}
                        alt={vid.speaker}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate">
                        {vid.speaker}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handlePlayVideo(vid)}
                    className="flex-1 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition text-center"
                  >
                    Tonton Sekarang
                  </button>
                  <button
                    onClick={() => handleDownloadOffline(vid.id)}
                    className={`p-2 rounded-xl border text-xs font-medium transition ${
                      downloadedIds.includes(vid.id)
                        ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-600'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title="Simpan untuk Akses Offline"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ORGANISASI MUALAF & SAFE HOUSE */}
      {activeTab === 'organisasi' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {organisasiList.map((org) => (
            <div
              key={org.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={org.logo}
                  alt={org.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600/40"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base truncate">
                      {org.name}
                    </h3>
                    <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                      {org.acronym}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{org.location}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                    {org.verifiedMembers.toLocaleString('id-ID')} Anggota & Relawan
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {org.description}
              </p>

              <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Layanan & Program Utama:
                </span>
                <ul className="text-xs text-slate-700 dark:text-slate-200 space-y-1">
                  {org.programs.map((prog, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500 font-mono">{org.contact}</span>
                <a
                  href={org.website.startsWith('http') ? org.website : `https://${org.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition"
                >
                  <span>Kunjungi Portal / Hubungi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subscription Modal for Exclusive & Offline Content */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Akses Eksklusif & Mode Unduh Offline
                </h3>
              </div>
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-3">
              <p>
                Dapatkan akses tanpa batas ke masterclass komparasi agama tingkat lanjut dari Koh Dondy Tan & Dr. Zakir Naik, serta fitur unduh offline penuh.
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/60 space-y-2">
                <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center justify-between">
                  <span>Infaq Keanggotaan Khusus</span>
                  <span className="text-base text-emerald-600 dark:text-emerald-400">Gratis / Sukarela</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Didanai penuh oleh wakaf donatur MualafCity. Tekan tombol aktivasi di bawah untuk membuka semua akses materi premium sekarang.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubscriptionModal(false)}
                className="px-4 py-2 text-slate-500 text-xs font-semibold"
              >
                Nanti Saja
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPremiumUnlocked(true);
                  setShowSubscriptionModal(false);
                  onRewardPoints(50, 'Aktivasi Akses Eksklusif MualafCity');
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition"
              >
                Aktifkan Hak Akses Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

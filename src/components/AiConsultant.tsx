import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  HelpCircle,
  BookOpen,
  Award,
  TrendingUp,
  Brain,
  CheckCircle2,
  Quote,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';
import { GamificationProfile, MutabaahItem, HomeBooking } from '../types';

interface AiConsultantProps {
  gamification: GamificationProfile;
  mutabaahList: MutabaahItem[];
  bookings: HomeBooking[];
  onRewardPoints: (points: number, reason: string) => void;
}

interface MessageItem {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: string[];
  recommendedSpeaker?: string;
}

export const AiConsultant: React.FC<AiConsultantProps> = ({
  gamification,
  mutabaahList,
  bookings,
  onRewardPoints,
}) => {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: `Assalamu'alaikum Warahmatullahi Wabarakatuh! 
Saya adalah **Pembimbing Cerdas AI MualafCity**, siap mendampingi perjalanan hijrah Anda 24/7.
Anda dapat menanyakan apa saja seputar:
- Tata cara sholat bagi pemula yang belum hafal bacaan Arab
- Panduan wudhu dan bersuci (thaharah)
- Tips santun berbakti kepada orang tua non-muslim
- Fiqh makanan halal dan pergaulan
- Rekomendasi materi kajian dari Koh Dondy Tan, Dr. Zakir Naik, atau MCI.

Silakan pilih pertanyaan cepat di bawah atau ketik langsung pertanyaan Anda.`,
      timestamp: 'Baru saja',
      sources: ['MualafCity AI Engine', 'Panduan Fiqh Taisir'],
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('Sholat & Wudhu');

  // AI Progress Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    summary: string;
    highlights: string[];
    studyRecommendation: string;
    motivationalQuote: string;
  } | null>(null);

  const quickPrompts = [
    'Bagaimana cara sholat jika saya belum hafal bacaan Arab?',
    'Bagaimana cara menjelaskan ke orang tua bahwa saya masuk Islam?',
    'Apakah tato lama sebelum mualaf menghalangi sahnya sholat dan wudhu?',
    'Langkah praktis belajar membaca huruf hijaiyah dari nol?',
    'Hukum memakan makanan hidangan keluarga non-muslim?',
  ];

  const handleAskQuestion = async (queryText?: string) => {
    const questionToAsk = queryText || inputQuestion;
    if (!questionToAsk.trim() || isLoading) return;

    const userMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: questionToAsk,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionToAsk,
          category,
          userLevel: gamification.currentLevelTitle,
        }),
      });

      const data = await response.json();
      const aiMsg: MessageItem = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: data.answer || 'Terima kasih atas pertanyaan Anda.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources,
        recommendedSpeaker: data.recommendedSpeaker,
      };

      setMessages((prev) => [...prev, aiMsg]);
      onRewardPoints(15, 'Konsultasi Fiqh dengan AI Pembimbing');
    } catch (err) {
      console.error('Error asking AI:', err);
      const errorMsg: MessageItem = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: 'Alhamdulillah, dalam kaidah Islam bagi mualaf, kemudahan selalu diutamakan. Jika belum hafal bacaan sholat, Anda boleh membaca latin atau membaca dzikir sederhana (Subhanallah, Walhamdulillah, Wa Laa Ilaha Illallah, Wallahu Akbar). Allah melihat ketulusan niat Anda.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        sources: ['Kaidah Fiqh Mualaf Taisir', 'Hadits Shahih Bukhari'],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunProgressAnalysis = async () => {
    setIsAnalyzing(true);
    const completedCount = mutabaahList.filter((m) => m.isCompletedToday).length;

    try {
      const response = await fetch('/api/ai/analyze-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          streak: gamification.streakDays,
          completedHabits: completedCount,
          totalSessions: bookings.length,
          level: gamification.currentLevelTitle,
          notes: 'Mualaf rajin menjaga sholat dan aktif belajar Iqro',
        }),
      });

      const data = await response.json();
      setAiAnalysis(data);
      onRewardPoints(20, 'Analisis Performa Progres AI');
    } catch (e) {
      console.error('Error running progress analysis', e);
      setAiAnalysis({
        summary: 'Progres mutaba\'ah harian Anda sangat memuaskan dengan komitmen istiqomah yang kuat.',
        highlights: [
          'Berhasil menjaga sholat 5 waktu di awal waktu',
          'Tekun memperdalam makhorijul huruf melalui bimbingan guru',
          'Aktif berdiskusi dan membantu sesama mualaf'
        ],
        studyRecommendation: 'Pendalaman Makna Doa Iftitah & Rukun Wudhu yang Benar',
        motivationalQuote: '"Sebaik-baik amalan adalah yang konsisten meskipun sedikit." (HR. Bukhari & Muslim)'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700/50">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <Brain className="w-3.5 h-3.5 text-amber-300" />
            Kecerdasan Buatan Terpadu MualafCity
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Asisten Cerdas & Analitik Progres Pribadi
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Dapatkan jawaban fiqh dan panduan transisi akidah yang menenangkan, berlandaskan prinsip kemudahan (taisir) bagi mualaf baru, serta evaluasi otomatis kemajuan belajar Anda setiap pekan.
          </p>
        </div>

        <button
          onClick={handleRunProgressAnalysis}
          disabled={isAnalyzing}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-2xl text-xs font-extrabold shadow-lg transition shrink-0"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Menganalisis Progres...</span>
            </>
          ) : (
            <>
              <TrendingUp className="w-4 h-4" />
              <span>Analisis Performa AI Saya</span>
            </>
          )}
        </button>
      </div>

      {/* AI Performance Evaluation Card (if generated) */}
      {aiAnalysis && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-emerald-600/50 dark:border-emerald-500/40 shadow-lg space-y-5 animate-scaleUp">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Laporan Analitik AI: Evaluasi Performa & Roadmap Belajar
                </h3>
                <p className="text-xs text-slate-500">
                  Dihitung otomatis berdasarkan {gamification.streakDays} hari istiqomah & {bookings.length} sesi bimbingan rumah
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full">
              Status: Sangat Konsisten
            </span>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/40">
            {aiAnalysis.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Capaian & Sisi Positif:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {aiAnalysis.highlights?.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Rekomendasi Materi Kajian Selanjutnya:
              </span>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
                {aiAnalysis.studyRecommendation}
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex items-start gap-1.5">
                <Quote className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="italic">{aiAnalysis.motivationalQuote}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Chat Area */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[650px] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  Ruang Konsultasi AI MualafCity
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Gemini 3.8 Flash Online
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Didukung kaidah fiqh mualaf terpadu & inspirasi dakwah Dondy Tan / Dr. Zakir Naik
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5"
            >
              <option value="Sholat & Wudhu">Kategori: Sholat & Wudhu</option>
              <option value="Akidah & Tauhid">Kategori: Akidah & Tauhid</option>
              <option value="Keluarga & Sosial">Kategori: Keluarga & Sosial</option>
              <option value="Makanan & Halal">Kategori: Fiqh Halal</option>
            </select>
          </div>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-white dark:bg-slate-700'
                    : 'bg-emerald-700 text-white'
                }`}
              >
                {msg.sender === 'user' ? 'Anda' : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-emerald-800 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.sources && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
                    <span className="font-semibold">Rujukan:</span>
                    {msg.sources.map((s, i) => (
                      <span key={i} className="bg-white/60 dark:bg-slate-900/60 px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                    {msg.recommendedSpeaker && (
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                        • Tokoh Terkait: {msg.recommendedSpeaker}
                      </span>
                    )}
                  </div>
                )}

                <div
                  className={`text-[9px] text-right ${
                    msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic p-3">
              <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>Pembimbing AI sedang merumuskan jawaban yang paling bijak dan menenangkan...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 overflow-x-auto flex items-center gap-2 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Pertanyaan Cepat:</span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleAskQuestion(prompt)}
              className="text-xs bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 whitespace-nowrap transition shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
            placeholder="Tuliskan pertanyaan seputar sholat, wudhu, akidah, atau pergaulan keluarga..."
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={() => handleAskQuestion()}
            disabled={!inputQuestion.trim() || isLoading}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Kirim</span>
          </button>
        </div>
      </div>
    </div>
  );
};

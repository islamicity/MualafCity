import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  MessageCircle,
  CheckCircle,
  PlusCircle,
  Search,
  Filter,
  Share2,
  Award,
  Sparkles,
  Send,
} from 'lucide-react';
import { ForumPost, ForumReply } from '../types';

interface ForumKomunitasProps {
  posts: ForumPost[];
  onAddPost: (post: ForumPost) => void;
  onLikePost: (postId: string) => void;
  onAddReply: (postId: string, reply: ForumReply) => void;
  onRewardPoints: (points: number, reason: string) => void;
}

export const ForumKomunitas: React.FC<ForumKomunitasProps> = ({
  posts,
  onAddPost,
  onLikePost,
  onAddReply,
  onRewardPoints,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // New Post Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('Bimbingan Sholat');
  const [newTags, setNewTags] = useState('Sholat, Pemula');

  const filteredPosts = posts.filter((p) => {
    const matchCat = selectedCategory === 'semua' || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      authorName: 'Sahabat Mualaf (Anda)',
      authorRole: 'Mualaf Baru',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      category: newCategory,
      title: newTitle,
      content: newContent,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      timestamp: 'Baru saja',
      likes: 1,
      hasMentorAnswer: false,
      replies: [],
    };

    onAddPost(newPost);
    setIsNewPostModalOpen(false);
    setNewTitle('');
    setNewContent('');
    onRewardPoints(20, 'Membuat Diskusi Baru di Forum Ukhuwah');
  };

  const handleSendReply = (postId: string) => {
    if (!replyText.trim()) return;

    const newReply: ForumReply = {
      id: `rep-${Date.now()}`,
      authorName: 'Sahabat Mualaf (Anda)',
      authorRole: 'Mualaf Baru',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      content: replyText,
      timestamp: 'Baru saja',
      isMentor: false,
      upvotes: 0,
    };

    onAddReply(postId, newReply);
    setReplyText('');
    setActiveReplyPostId(null);
    onRewardPoints(10, 'Menjawab pertanyaan saudara di forum');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700/50">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            Ruang Diskusi & Q&A Terverifikasi
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Forum Ukhuwah & Tanya Jawab Mualaf
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Berbagi pengalaman, bertanya tentang tantangan hijrah, dan dapatkan jawaban langsung dari asatidz tersertifikasi, alumni mualaf berpengalaman, serta mentor Dondy Tan Academy.
          </p>
        </div>

        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tulis Pertanyaan / Diskusi Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik diskusi, tag, atau kata kunci..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto scrollbar-none">
          {['semua', 'Akidah Dasar', 'Bimbingan Sholat', 'Keluarga & Transisi', 'Fiqh Muamalah', 'Kisah Inspiratif'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat === 'semua' ? 'Semua Topik' : cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800/80 transition space-y-4"
          >
            {/* Post Author Bar */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-500"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {post.authorName}
                    </h4>
                    <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                      {post.authorRole}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{post.timestamp}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {post.category}
                </span>
                {post.hasMentorAnswer && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2.5 py-1 rounded-full border border-amber-300 dark:border-amber-700">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
                    Dijawab Pembimbing
                  </span>
                )}
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onLikePost(post.id)}
                  className={`flex items-center gap-1.5 font-semibold transition ${
                    post.isLikedByUser
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-500 hover:text-emerald-600'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes} Dukungan</span>
                </button>

                <button
                  onClick={() =>
                    setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)
                  }
                  className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 font-semibold transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.replies.length} Tanggapan</span>
                </button>
              </div>

              <button
                onClick={() =>
                  setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)
                }
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                {activeReplyPostId === post.id ? 'Tutup Kolom Balasan' : 'Beri Tanggapan'}
              </button>
            </div>

            {/* Replies List */}
            {post.replies.length > 0 && (
              <div className="space-y-3 pt-3 pl-3 sm:pl-6 border-l-2 border-emerald-500/30">
                {post.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className={`p-4 rounded-2xl text-xs space-y-2 ${
                      reply.isMentor
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={reply.authorAvatar}
                          alt={reply.authorName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {reply.authorName}
                          </span>
                          {reply.isMentor && (
                            <span className="ml-2 inline-flex items-center gap-0.5 text-[9px] bg-emerald-700 text-white px-1.5 py-0.2 rounded font-bold uppercase">
                              <Award className="w-2.5 h-2.5" /> Pembimbing Resmi
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{reply.timestamp}</span>
                    </div>

                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                      {reply.content}
                    </p>

                    <div className="flex items-center justify-end text-[10px] text-slate-400 gap-1">
                      <ThumbsUp className="w-3 h-3 text-emerald-600" />
                      <span>{reply.upvotes} terbantu</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input Box */}
            {activeReplyPostId === post.id && (
              <div className="pt-2 flex items-center gap-2 animate-fadeIn">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendReply(post.id)}
                  placeholder="Tuliskan tanggapan atau masukan untuk saudara kita..."
                  className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={() => handleSendReply(post.id)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Mulai Diskusi Baru di Forum Ukhuwah
                </h3>
              </div>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Kategori Diskusi
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Bimbingan Sholat">Bimbingan Sholat</option>
                  <option value="Akidah Dasar">Akidah Dasar</option>
                  <option value="Keluarga & Transisi">Keluarga & Transisi</option>
                  <option value="Fiqh Muamalah">Fiqh Muamalah</option>
                  <option value="Kisah Inspiratif">Kisah Inspiratif</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Judul Pertanyaan / Pembahasan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Bagaimana cara menghafal doa ruku' dengan mudah?"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Penjelasan / Cerita Lengkap <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Ceritakan kendala atau pertanyaan yang ingin Anda diskusikan secara santun..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Tag Kata Kunci (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="sholat, hafalan, pemula"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition"
                >
                  Publikasikan (+20 Poin Berkah)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Mail, Image as ImageIcon, Film, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Hero({ onOpenCinemaModal, onOpenScratchModal }) {
  const [stats, setStats] = useState({
    daysTogether: 365,
    hoursTogether: 8760,
    totalPhotoLikes: 1564,
    totalLoveNotes: 3,
    loveLevel: '1000% Permanen ❤️',
  });

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.stats) {
          setStats(data.stats);
        }
      })
      .catch((err) => console.error('Error fetching stats:', err));
  }, []);

  const shootHearts = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#ffd700'],
    });
  };

  return (
    <section className="text-center pt-8 pb-6 relative">
      {/* Badge */}
      <div
        onClick={shootHearts}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/50 text-rose-200 text-xs sm:text-sm font-semibold mb-6 animate-float cursor-pointer hover:bg-rose-500/25 transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
        <span>Spesial National Girlfriend Day 2026 buat Kamu 🌹</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
        Happy Girlfriend Day,<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200">
          Sinta Nuriya
        </span>{' '}
        ❤️
      </h1>

      {/* Human Copywriting Subtitle */}
      <p className="text-base sm:text-xl text-rose-100/90 max-w-2xl mx-auto font-light leading-relaxed mb-8">
        Dari aku, <span class="font-semibold text-rose-300">Maulana Rifki Fadhilla (Rifki)</span> buat cewek paling spesial dan paling sabar ngadepin aku. Makasih ya udah selalu nemenin dari zaman absurd sampai sekarang!
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-rose-500/30 text-center card-tilt">
          <span className="block text-2xl sm:text-3xl font-bold text-rose-300">
            {stats.daysTogether}+
          </span>
          <span className="text-xs text-rose-200/70 uppercase tracking-wider font-semibold">
            Hari Bareng Kamu
          </span>
        </div>
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-rose-500/30 text-center card-tilt">
          <span className="block text-2xl sm:text-3xl font-bold text-rose-300">
            {stats.totalPhotoLikes}
          </span>
          <span className="text-xs text-rose-200/70 uppercase tracking-wider font-semibold">
            Total Likes Foto
          </span>
        </div>
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-rose-500/30 text-center card-tilt">
          <span className="block text-2xl sm:text-3xl font-bold text-rose-300">
            ∞
          </span>
          <span className="text-xs text-rose-200/70 uppercase tracking-wider font-semibold">
            Sabarnya Kamu
          </span>
        </div>
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-rose-500/30 text-center card-tilt">
          <span className="block text-2xl sm:text-3xl font-bold text-rose-300">
            1000%
          </span>
          <span className="text-xs text-rose-200/70 uppercase tracking-wider font-semibold">
            Sayangku ke Kamu
          </span>
        </div>
      </div>

      {/* Interactive Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <button
          onClick={onOpenCinemaModal}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold shadow-lg shadow-rose-500/40 hover:shadow-rose-500/60 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <Film className="w-5 h-5" />
          <span>🎬 Tonton Cinema Reel Kita</span>
        </button>

        <button
          onClick={onOpenScratchModal}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <Gift className="w-5 h-5" />
          <span>✨ Gosok Hadiah Cinta</span>
        </button>

        <a
          href="#surat"
          className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-rose-400 text-rose-200 font-semibold transition-all flex items-center gap-2"
        >
          <Mail className="w-5 h-5 text-rose-400" />
          <span>💌 Baca Surat Maaf Rifki</span>
        </a>

        <a
          href="#galeri"
          className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-rose-500/40 text-rose-200 font-semibold transition-all flex items-center gap-2"
        >
          <ImageIcon className="w-5 h-5 text-rose-400" />
          <span>📸 Galeri Kita</span>
        </a>
      </div>
    </section>
  );
}

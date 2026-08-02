import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Play, Pause } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CinemaReelModal({ isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const stories = [
    {
      id: 'IMG-20260709-WA0014.jpg',
      title: 'Tunangan Kita yang Manis ❤️',
      caption: 'Momen pas kita resmi tunangan. Cincin di jari kamu bukti kalau aku serius banget sama kamu, Sinta ~',
      badge: '💍 Happy Engagement',
    },
    {
      id: 'IMG-20260702-WA0016.jpg',
      title: 'Versi Anime Pelindungmu 💪',
      caption: 'Edit versi berotot biar kelihatan garang jagain kamu! Tapi aslinya hati tetap lembut buat kamu doang wkwk.',
      badge: '💪 Siap Jagain Sinta',
    },
    {
      id: 'IMG-20260630-WA0013.jpg',
      title: 'Menatap Samudra Bersamamu 🌊',
      caption: 'Lihat lautan luas bikin tenang, sama persis pas aku ada di dekat kamu. Seluas itu juga rasa sayangku.',
      badge: '🌊 Tenang & Bahagia',
    },
    {
      id: 'IMG-20260503-WA0106.jpg',
      title: 'Foto Gemes Masa Kecil 🎓',
      caption: 'Dari kecil kita udah imut banget! Bukti kalau kita emang jodoh yang lucu dari dulu sampai sekarang.',
      badge: '👶 Nostalgia Gemoy',
    },
    {
      id: 'IMG-20260715-WA0065.jpg',
      title: 'Meme Legendaris: KU TUMBUK KAUU 😂🍌',
      caption: 'Kumis palsu & pisang! Maafin ya kalau aku suka absurd dan random, tapi janji ini demi bikin kamu ketawa!',
      badge: '🍌 Kelakuan Absurd',
    },
    {
      id: 'IMG-20260613-WA0014.jpg',
      title: 'Filter Lebah Kocak 🐝💛',
      caption: 'Bahkan pas pakai filter lebah bengkak begini pun kamu tetep gemesin abis! Nggak bosen ketawa bareng kamu.',
      badge: '🐝 Filter Kocak',
    },
    {
      id: 'IMG-20260311-WA0001.jpg',
      title: 'Zaman Sekolah & Squidward 🎨',
      caption: 'Masa-masa sekolah dengan lukisan Squidward dan stiker wajah lucu! Banyak banget kenangan seru kita.',
      badge: '🎨 Zaman Sekolah',
    },
    {
      id: 'IMG-20260617-WA0031.jpg',
      title: 'Doodle Abstrak Kita 🖊️',
      caption: 'Coretan seni sederhana yang jadi bukti kalau hal-hal kecil bareng kamu selalu terasa bermakna dan seru.',
      badge: '🖊️ Seni Cerita Kita',
    },
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === stories.length - 1) {
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
          return 0;
        }
        return prev + 1;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, stories.length]);

  if (!isOpen) return null;

  const current = stories[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center animate-fadeIn">
      <div className="relative max-w-sm w-full h-[85vh] sm:h-[90vh] bg-black rounded-3xl overflow-hidden border border-rose-500/40 shadow-2xl flex flex-col justify-between">
        {/* Top Instagram/TikTok Story Bars */}
        <div className="absolute top-3 left-3 right-3 z-20 space-y-2">
          <div className="flex gap-1">
            {stories.map((s, idx) => (
              <div
                key={s.id}
                className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full bg-rose-500 transition-all duration-300 ${
                    idx < currentIndex
                      ? 'w-full'
                      : idx === currentIndex
                      ? 'w-full animate-pulse'
                      : 'w-0'
                  }`}
                ></div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-rose-300 text-xs font-semibold">
              {current.badge}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Story Image View with Ken Burns smooth animation */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/80">
          <img
            src={`/images/${current.id}`}
            alt={current.title}
            className="w-full h-full object-cover object-top scale-105 animate-pulse"
          />

          {/* Left / Right touch zones */}
          <div
            onClick={handlePrev}
            className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer z-10"
          ></div>
          <div
            onClick={handleNext}
            className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer z-10"
          ></div>
        </div>

        {/* Bottom Story Caption Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
          <h4 className="font-serif font-bold text-white text-lg mb-1">
            {current.title}
          </h4>
          <p className="text-xs text-rose-200/90 leading-relaxed">
            &quot;{current.caption}&quot;
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-rose-300/70">
            <span>
              Story {currentIndex + 1} dari {stories.length}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Sinta & Rifki</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

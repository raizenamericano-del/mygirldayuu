import React, { useState, useEffect, useRef } from 'react';
import { Heart, Music, Volume2, Rocket, Lock, Gift, Film, Disc } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Navbar({
  onOpenAudioModal,
  onOpenVercelModal,
  onOpenVaultModal,
  onOpenScratchModal,
  onOpenCinemaModal,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  const songs = [
    {
      title: 'Sheila On 7 - Anugerah Terindah',
      src: '/audio/musik-romantis.mp3',
    },
    {
      title: 'Sheila On 7 - Hingga Ujung Waktu',
      src: '/audio/hingga-ujung-waktu.mp3',
    },
  ];

  const toggleMusic = () => {
    let audio = audioRef.current;
    if (!audio) {
      audio = document.getElementById('global-bg-music');
      audioRef.current = audio;
    }

    if (!audio) return;

    if (!isPlaying) {
      audio.src = songs[currentSongIndex].src;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          confetti({ particleCount: 25, spread: 50, origin: { y: 0.1 } });
        })
        .catch((err) => {
          console.error('Audio play error:', err);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const nextSong = (e) => {
    e.stopPropagation();
    let audio = audioRef.current || document.getElementById('global-bg-music');
    if (!audio) return;
    const nextIdx = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIdx);
    audio.src = songs[nextIdx].src;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        confetti({ particleCount: 20, spread: 40, origin: { y: 0.1 } });
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {/* Hidden HTML5 Audio Player */}
      <audio id="global-bg-music" loop preload="auto">
        <source src={songs[currentSongIndex].src} type="audio/mpeg" />
      </audio>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-rose-500/30 py-3 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-400 group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
            </span>
            <span className="font-script text-2xl text-rose-300 font-bold tracking-wide">
              Sinta & Rifki
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-5 text-sm font-medium text-rose-100">
            <a href="#surat" className="hover:text-rose-400 transition-colors">Surat Maaf</a>
            <a href="#galeri" className="hover:text-rose-400 transition-colors">Galeri Foto</a>
            <a href="#alasan" className="hover:text-rose-400 transition-colors">Alasan Kamu Spesial</a>
            <a href="#compatibility" className="hover:text-rose-400 transition-colors">Kalkulator Kompak</a>
            <a href="#guestbook" className="hover:text-rose-400 transition-colors">Balasan Kamu</a>
            <a href="#sertifikat" className="hover:text-rose-400 transition-colors">Sertifikat</a>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Cinema Reel Button */}
            <button
              onClick={onOpenCinemaModal}
              className="px-2.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400 text-rose-200 flex items-center gap-1 transition-all"
              title="Putar Cinema Reel Story Kita"
            >
              <Film className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden md:inline">Cinema Reel</span>
            </button>

            {/* Scratch Card Button */}
            <button
              onClick={onOpenScratchModal}
              className="px-2.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-300 flex items-center gap-1 transition-all"
              title="Gosok Kartu Hadiah Cinta"
            >
              <Gift className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline">Kartu Gosok</span>
            </button>

            {/* Secret Vault Button */}
            <button
              onClick={onOpenVaultModal}
              className="px-2.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 border border-amber-400/50 text-amber-300 flex items-center gap-1 transition-all"
              title="Buka Brankas Rahasia Kita (0208)"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Vault</span>
            </button>

            {/* Real Indonesian MP3 Music Player Button */}
            <button
              onClick={toggleMusic}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-all shadow-md ${
                isPlaying
                  ? 'bg-rose-500 border-rose-400 text-white animate-pulse'
                  : 'bg-white/10 border-rose-400 text-rose-200 hover:bg-rose-500/30'
              }`}
              title="Putar Lagu Romantis Indo (Sheila On 7)"
            >
              <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
              <span>
                {isPlaying ? 'SO7 - Anugerah Terindah 🎵' : '🎵 Putar Lagu SO7'}
              </span>
            </button>

            {/* Audio Modal Voiceover Button */}
            <button
              onClick={onOpenAudioModal}
              className="px-2.5 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-md flex items-center gap-1 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5 animate-bounce" />
              <span className="hidden sm:inline">Voice</span>
            </button>

            <button
              onClick={onOpenVercelModal}
              className="hidden sm:flex px-2 py-1.5 rounded-full text-xs font-medium bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/50 text-amber-300 items-center gap-1 transition-colors"
            >
              <Rocket className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

import React, { useState } from 'react';
import { X, Volume2, Upload, Music, Disc } from 'lucide-react';

export default function AudioModal({ isOpen, onClose }) {
  const [activeTrack, setActiveTrack] = useState('/audio/pesan-cinta.mp3');
  const [trackName, setTrackName] = useState('Pesan Suara Asli Rifki ❤️');

  if (!isOpen) return null;

  const selectTrack = (src, name) => {
    setActiveTrack(src);
    setTrackName(name);
    const audioEl = document.getElementById('modal-audio-player');
    if (audioEl) {
      audioEl.src = src;
      audioEl.play().catch(() => {});
    }
  };

  const handleCustomAudio = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    selectTrack(url, file.name);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative max-w-lg w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-500/40 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-500/50">
          <Volume2 className="w-8 h-8 text-white animate-pulse" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mb-1">
          🎵 Pemutar Musik Indo & Suara Rifki
        </h3>
        <p className="text-xs text-rose-300/90 mb-6">
          Pilih lagu romantis Indonesia favoritmu atau dengerin pesan suara asli dariku ~
        </p>

        {/* Track Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
          <button
            onClick={() =>
              selectTrack('/audio/musik-romantis.mp3', 'Sheila On 7 - Anugerah Terindah')
            }
            className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTrack === '/audio/musik-romantis.mp3'
                ? 'bg-rose-500 border-rose-400 text-white shadow-lg'
                : 'bg-white/5 border-rose-500/30 text-rose-200 hover:bg-rose-500/20'
            }`}
          >
            <Disc className="w-4 h-4 shrink-0" />
            <span>SO7 - Anugerah Terindah</span>
          </button>

          <button
            onClick={() =>
              selectTrack('/audio/hingga-ujung-waktu.mp3', 'Sheila On 7 - Hingga Ujung Waktu')
            }
            className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTrack === '/audio/hingga-ujung-waktu.mp3'
                ? 'bg-rose-500 border-rose-400 text-white shadow-lg'
                : 'bg-white/5 border-rose-500/30 text-rose-200 hover:bg-rose-500/20'
            }`}
          >
            <Music className="w-4 h-4 shrink-0" />
            <span>SO7 - Hingga Ujung Waktu</span>
          </button>

          <button
            onClick={() => selectTrack('/audio/pesan-cinta.mp3', 'Pesan Suara Asli Rifki ❤️')}
            className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTrack === '/audio/pesan-cinta.mp3'
                ? 'bg-rose-500 border-rose-400 text-white shadow-lg'
                : 'bg-white/5 border-rose-500/30 text-rose-200 hover:bg-rose-500/20'
            }`}
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span>Suara Asli Rifki</span>
          </button>
        </div>

        {/* Audio Player */}
        <div className="bg-black/50 p-4 rounded-2xl border border-rose-500/30 mb-4">
          <span className="text-xs text-amber-300 font-semibold block mb-2">
            Sedang Memutar: {trackName}
          </span>
          <audio
            id="modal-audio-player"
            controls
            autoPlay
            src={activeTrack}
            className="w-full"
          >
            Browser kamu tidak mendukung pemutar audio.
          </audio>
        </div>

        <div className="text-xs text-rose-200/80 italic mb-6">
          &quot;Kau anugerah terindah yang pernah kumiliki... Selamat Hari Girlfriend Day Sinta Nuriya!&quot;
        </div>

        {/* Custom audio upload */}
        <div className="border-t border-rose-500/20 pt-4 flex flex-col items-center gap-2">
          <span className="text-xs text-rose-300">
            Atau pilih file MP3 lagu kalian sendiri dari HP / Laptop:
          </span>
          <label className="px-4 py-2 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/50 text-rose-200 text-xs font-medium cursor-pointer transition-colors inline-flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Pilih File Lagu (.mp3)</span>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleCustomAudio}
            />
          </label>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold transition-colors"
          >
            Tutup & Kembali
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveMeterQuiz() {
  const [loveVal, setLoveVal] = useState(500);
  const [answered, setAnswered] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSlider = (val) => {
    setLoveVal(val);
    if (val >= 1000) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#f43f5e', '#ffffff'],
      });
    }
  };

  const explode = () => {
    setLoveVal(1000);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ffd700', '#f43f5e', '#ffffff'],
    });
  };

  const answerQuestion = (qNum) => {
    const updated = { ...answered, [qNum]: true };
    setAnswered(updated);
    if (Object.keys(updated).length === 3) {
      setShowResult(true);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <section id="love-meter" className="scroll-mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Love Meter */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-500/30">
          <div className="text-center mb-6">
            <span className="text-rose-400 font-script text-2xl">
              Pengukur Sayang & Maaf
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mt-1">
              Seberapa Sayang Rifki ke Sinta?
            </h3>
            <p className="text-xs text-rose-300/70 mt-1">
              Geser slider di bawah ini sampai maksimal!
            </p>
          </div>

          <div className="text-center my-8">
            <span className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">
              {loveVal}%
            </span>
            <span
              className={`block text-sm sm:text-base mt-2 font-medium ${
                loveVal >= 1000 ? 'text-amber-300 font-bold' : 'text-rose-200'
              }`}
            >
              {loveVal >= 1000
                ? '🔥 1000% - CINTA TAK TERBATAS BUAT SINTA! 💥'
                : loveVal >= 600
                ? 'Sayang Banget & Setia Selamanya ❤️'
                : 'Cinta Manis Sehari-hari 💕'}
            </span>
          </div>

          <div className="space-y-4">
            <input
              type="range"
              min="100"
              max="1000"
              value={loveVal}
              onChange={(e) => handleSlider(Number(e.target.value))}
              className="w-full h-3 bg-rose-900/50 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-xs text-rose-300/60 font-semibold">
              <span>100% (Biasa)</span>
              <span>500% (Sayang Banget)</span>
              <span>1000% (UNLIMITED LOVE! 💥)</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-rose-500/20 text-center">
            <button
              onClick={explode}
              className="px-6 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/50 text-rose-200 text-sm font-medium transition-colors inline-flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Test Ledakan Cinta 1000%</span>
            </button>
          </div>
        </div>

        {/* Right: Quiz */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-500/30">
          <div className="text-center mb-6">
            <span className="text-rose-400 font-script text-2xl">
              Kuis Spesial Hari Ini
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mt-1">
              Seberapa Kompak Kita? 💑
            </h3>
            <p className="text-xs text-rose-300/70 mt-1">
              Jawab 3 pertanyaan simpel ini untuk klaim Sertifikat!
            </p>
          </div>

          <div className="space-y-6">
            {/* Q1 */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-rose-100">
                1. Siapa cowok yang paling sayang dan selalu memperjuangkan
                Sinta?
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => answerQuestion(1)}
                  className={`text-left px-3 py-2 rounded-xl border text-xs sm:text-sm transition-colors ${
                    answered[1]
                      ? 'bg-rose-500 border-rose-400 text-white'
                      : 'bg-white/5 hover:bg-rose-500/20 border-white/10 text-rose-200'
                  }`}
                >
                  A. Maulana Rifki Fadhilla ❤️
                </button>
                <button
                  onClick={() => answerQuestion(1)}
                  className={`text-left px-3 py-2 rounded-xl border text-xs sm:text-sm transition-colors ${
                    answered[1]
                      ? 'bg-rose-500 border-rose-400 text-white'
                      : 'bg-white/5 hover:bg-rose-500/20 border-white/10 text-rose-200'
                  }`}
                >
                  B. Rifki Sayangku 😘
                </button>
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-rose-100">
                2. Kalau Rifki bikin kesalahan kecil atau random, apa solusinya?
              </p>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => answerQuestion(2)}
                  className={`text-left px-3 py-2 rounded-xl border text-xs sm:text-sm transition-colors ${
                    answered[2]
                      ? 'bg-rose-500 border-rose-400 text-white'
                      : 'bg-white/5 hover:bg-rose-500/20 border-white/10 text-rose-200'
                  }`}
                >
                  A. Dimaafin dong + traktir es krim / makanan favorit! 🍦
                </button>
                <button
                  onClick={() => answerQuestion(2)}
                  className={`text-left px-3 py-2 rounded-xl border text-xs sm:text-sm transition-colors ${
                    answered[2]
                      ? 'bg-rose-500 border-rose-400 text-white'
                      : 'bg-white/5 hover:bg-rose-500/20 border-white/10 text-rose-200'
                  }`}
                >
                  B. Langsung senyum lagi karena sayang Rifki 💕
                </button>
              </div>
            </div>

            {/* Q3 */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-rose-100">
                3. Siapa perempuan yang paling berhak dapat gelar Best Girlfriend
                2026?
              </p>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => answerQuestion(3)}
                  className={`text-left px-3 py-2 rounded-xl border text-xs sm:text-sm transition-colors ${
                    answered[3]
                      ? 'bg-rose-500 border-rose-400 text-white'
                      : 'bg-white/5 hover:bg-rose-500/20 border-white/10 text-rose-200'
                  }`}
                >
                  A. Sinta Nuriya Tanpa Tanding! 🌹
                </button>
              </div>
            </div>
          </div>

          {showResult && (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-rose-500/20 to-amber-500/20 border border-amber-400/40 text-center animate-bounce">
              <span className="block text-amber-300 font-bold text-lg mb-1">
                🎉 100/100 - Jawaban Sempurna!
              </span>
              <p className="text-xs text-rose-200">
                Sinta Nuriya resmi menjadi kekasih terbaik sepanjang masa!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { X, Lock, Unlock, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SecretVaultModal({ isOpen, onClose }) {
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [claimed, setClaimed] = useState(false);

  if (!isOpen) return null;

  const handleDigit = (digit) => {
    if (code.length < 4) {
      const newCode = code + digit;
      setCode(newCode);
      setError(false);
      if (newCode.length === 4) {
        verifyCode(newCode);
      }
    }
  };

  const verifyCode = (inputCode) => {
    // 0208 (2 Agustus - Girlfriend Day), 1000 (1000% love), 2026
    if (inputCode === '0208' || inputCode === '1000' || inputCode === '2026') {
      setUnlocked(true);
      setError(false);
      // Mega VIP explosion
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#f43f5e', '#a855f7', '#06b6d4', '#ffffff'],
      });
    } else {
      setError(true);
      setTimeout(() => {
        setCode('');
        setError(false);
      }, 1000);
    }
  };

  const handleClear = () => {
    setCode('');
    setError(false);
  };

  const handleClaim = () => {
    setClaimed(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#10b981', '#ffd700', '#f43f5e'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-400/50 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!unlocked ? (
          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/40 animate-pulse">
              <Lock className="w-8 h-8 text-white" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-1">
              🔐 Brankas Rahasia Sinta & Rifki
            </h3>
            <p className="text-xs text-rose-300/80 mb-6">
              Masukkan 4 Digit Kode Spesial (Petunjuk: Tanggal Hari Ini <strong className="text-amber-300">0208</strong> atau <strong className="text-amber-300">1000</strong>)
            </p>

            {/* Code Display */}
            <div
              className={`w-48 mx-auto py-3 px-6 rounded-2xl bg-black/50 border text-2xl font-mono tracking-widest mb-6 ${
                error
                  ? 'border-red-500 text-red-400 animate-shake'
                  : 'border-amber-400/50 text-amber-300'
              }`}
            >
              {code.padEnd(4, '•')}
            </div>

            {error && (
              <p className="text-xs text-red-400 mb-4 animate-bounce">
                ❌ Kode salah! Coba masukkan 0208 atau 1000
              </p>
            )}

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleDigit(String(num))}
                  className="py-3 rounded-xl bg-white/10 hover:bg-rose-500/40 border border-white/10 text-lg font-bold text-white transition-all active:scale-95"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="py-3 rounded-xl bg-white/5 hover:bg-white/20 border border-white/10 text-xs font-semibold text-rose-300 transition-all"
              >
                Hapus
              </button>
              <button
                onClick={() => handleDigit('0')}
                className="py-3 rounded-xl bg-white/10 hover:bg-rose-500/40 border border-white/10 text-lg font-bold text-white transition-all active:scale-95"
              >
                0
              </button>
              <button
                onClick={() => code.length === 4 && verifyCode(code)}
                className="py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-xs font-bold text-white transition-all shadow-md"
              >
                Buka
              </button>
            </div>
          </div>
        ) : (
          /* VIP Unlocked Screen */
          <div className="py-2 space-y-6 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-emerald-400 to-amber-300 flex items-center justify-center shadow-lg shadow-emerald-500/50">
              <Unlock className="w-10 h-10 text-black animate-bounce" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                ✨ VIP LOVE VAULT UNLOCKED ✨
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Voucher Kencan Spesial dari Rifki! 🎟️
              </h3>
              <p className="text-xs text-rose-200 mt-2">
                Hadiah eksklusif Hari National Girlfriend Day untuk Sinta Nuriya
              </p>
            </div>

            {/* Voucher Card */}
            <div className="bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-pink-500/20 p-5 rounded-2xl border-2 border-dashed border-amber-400 text-left relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
                <span className="font-script text-2xl text-amber-300 font-bold">
                  Sinta & Rifki Love Coupon
                </span>
                <Gift className="w-6 h-6 text-amber-300" />
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-rose-100 font-medium">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Berlaku 1x Makan Enak / Resto Favorit Sinta 🍜</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Traktir Es Krim / Dessert Spesial 🍦</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Dipeluk & Didengarkan Ceritanya Seharian Tanpa Ngeluh 🤗</span>
                </li>
              </ul>

              <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-xs text-amber-200/80">
                <span>Kode Voucher: <strong>GFDAY-SINTA-2026</strong></span>
                <span>Masa Berlaku: Selamanya ❤️</span>
              </div>
            </div>

            {!claimed ? (
              <button
                onClick={handleClaim}
                className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/40 flex items-center justify-center gap-2 transition-all"
              >
                <Gift className="w-4 h-4" />
                <span>Klaim Voucher Sekarang! 🎁</span>
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-sm font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Voucher Resmi Diklaim! Tunjukkan Screenshot Ini ke Rifki! 📸</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

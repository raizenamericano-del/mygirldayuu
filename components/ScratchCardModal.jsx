import React, { useState, useEffect, useRef } from 'react';
import { X, Gift, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScratchCardModal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 320;
    canvas.height = 180;

    // Fill gold foil glitter background
    const grad = ctx.createLinearGradient(0, 0, 320, 180);
    grad.addColorStop(0, '#d4af37');
    grad.addColorStop(0.5, '#f59e0b');
    grad.addColorStop(1, '#b45309');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 320, 180);

    // Add glitter pattern dots
    ctx.fillStyle = '#fef08a';
    for (let i = 0; i < 100; i++) {
      ctx.fillRect(Math.random() * 320, Math.random() * 180, 2, 2);
    }

    // Add instructions text on foil
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ GOSOK DI SINI BUAT LIAT HADIAH ✨', 160, 95);
  }, [isOpen]);

  const getPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratch = (e) => {
    if (!isDrawing || isRevealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getPosition(e);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let cleared = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) cleared++;
    }

    const percent = Math.round((cleared / (pixels.length / 4)) * 100);
    setScratchedPercent(percent);

    if (percent > 45 && !isRevealed) {
      setIsRevealed(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#f43f5e', '#10b981'],
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative max-w-md w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-400/60 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/40 animate-pulse">
          <Gift className="w-8 h-8 text-white" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mb-1">
          ✨ Kartu Gosok Hadiah Cinta
        </h3>
        <p className="text-xs text-rose-300/90 mb-5">
          Gosok lapisan emas di bawah ini pakai mouse atau jarimu ya sayang!
        </p>

        {/* Scratch Area Wrapper */}
        <div className="relative w-[320px] h-[180px] mx-auto rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl bg-gradient-to-r from-rose-950 via-black to-rose-950 flex items-center justify-center p-4">
          {/* Hidden Gift Content inside */}
          <div className="text-center space-y-2 select-none">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold">
              🎟️ SPECIAL VOUCHER RIFKI 2026
            </span>
            <h4 className="font-serif text-lg text-white font-bold">
              Bebas Ngambek + Makan Enak!
            </h4>
            <p className="text-[11px] text-rose-200 leading-snug">
              Berlaku buat 1x Traktir Makan Enak favorit Sinta, Es Krim, dan Dipeluk Rifki seharian tanpa boleh ngeluh! ❤️
            </p>
            <div className="text-[10px] text-amber-300/80 font-mono pt-1">
              KODE: GFDAY-SINTA-2026
            </div>
          </div>

          {/* Foil Canvas on top */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              onMouseDown={() => setIsDrawing(true)}
              onMouseUp={() => setIsDrawing(false)}
              onMouseMove={scratch}
              onTouchStart={() => setIsDrawing(true)}
              onTouchEnd={() => setIsDrawing(false)}
              onTouchMove={scratch}
              className="absolute inset-0 cursor-pointer z-10 touch-none"
            />
          )}
        </div>

        <div className="mt-6">
          {isRevealed ? (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4" />
              <span>Hadiah Terbuka! Screenshot & minta klaim ke Rifki sekarang! 📸</span>
            </div>
          ) : (
            <p className="text-xs text-rose-300/70 italic">
              Progres Gosok: {scratchedPercent}% (Gosok minimal 50% buat membuka)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

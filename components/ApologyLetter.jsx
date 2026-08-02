import React, { useState, useEffect } from 'react';
import { HeartHandshake, Unlock, Heart, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ApologyLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [forgiven, setForgiven] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noBtnStyle, setNoBtnStyle] = useState({});
  const [btnText, setBtnText] = useState('Nggak Mau / Masih Ngambek 😜');

  useEffect(() => {
    fetch('/api/apology')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.apologyStatus?.forgiven) {
          setForgiven(true);
        }
      })
      .catch((err) => console.error('Error fetching apology status:', err));
  }, []);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#ffd700'],
      });
    }
  };

  const handleDodge = () => {
    const count = dodgeCount + 1;
    setDodgeCount(count);
    const x = (Math.random() - 0.5) * 260;
    const y = (Math.random() - 0.5) * 140;
    setNoBtnStyle({
      transform: `translate(${x}px, ${y}px)`,
      transition: 'all 0.3s ease',
    });

    if (count === 1) {
      setBtnText('Eits meleset wkwk 😜');
    } else if (count === 3) {
      setBtnText('Yah ga kena dong~ 😂');
    } else if (count === 5) {
      setBtnText('Udah maafin aja sayang, ntar tak traktir es krim! 🍦');
    } else if (count > 7) {
      setBtnText('Ayo klik tombol Maafin Dong aja sayang ~ ❤️');
    }
  };

  const handleForgive = async () => {
    setForgiven(true);

    try {
      await fetch('/api/apology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forgiven: true }),
      });
    } catch (err) {
      console.error('Error saving forgiveness status:', err);
    }

    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#f43f5e', '#ffd700'] });
    fire(0.2, { spread: 60, colors: ['#fb7185', '#ffffff'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <section id="surat" className="scroll-mt-28">
      <div className="text-center mb-10">
        <span className="text-rose-400 font-script text-3xl block mb-1">
          Surat Jujur dari Rifki
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Maaf & Sayangnya Aku Buat Kamu ❤️
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-2">
          Coba klik amplop di bawah ini buat baca pesanku ya sayang
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div
          className={`bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-10 border transition-all ${
            isOpen ? 'border-rose-400 aurora-border' : 'border-rose-500/30'
          } shadow-2xl relative overflow-hidden`}
        >
          {/* Sealed Cover */}
          {!isOpen && (
            <div
              className="text-center py-10 cursor-pointer group"
              onClick={handleOpenEnvelope}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-500/40 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-serif text-rose-200 font-semibold mb-2">
                Buat Kesayanganku: Sinta Nuriya ❤️
              </h3>
              <p className="text-sm text-rose-300/80 mb-6">
                Surat Resmi Bersegel • Klik atau tap buat buka
              </p>
              <button className="px-5 py-2 rounded-full bg-rose-500/20 border border-rose-400 text-rose-200 text-sm font-medium hover:bg-rose-500/30 transition-colors inline-flex items-center gap-2">
                <Unlock className="w-4 h-4" />
                <span>Buka Surat dari Rifki</span>
              </button>
            </div>
          )}

          {/* Open Letter - AUTHENTIC HUMAN COPYWRITING */}
          {isOpen && (
            <div className="transition-all duration-700">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="text-xs text-rose-300/70 ml-2 font-mono">
                    surat-buat-sinta.md
                  </span>
                </div>
                <span className="text-xs text-rose-300/70">
                  2 Agustus 2026 • Girlfriend Day
                </span>
              </div>

              <div className="space-y-4 text-rose-100/95 leading-relaxed font-normal text-base sm:text-lg">
                <p className="font-script text-3xl text-rose-300">
                  Hai Sinta Sayangku,
                </p>

                <p>
                  Selamat <span className="text-rose-300 font-semibold">Hari Girlfriend Day yaa</span>! Hari ini aku mau bikin sesuatu yang khusus buat ngerayain kamu yang udah selalu ada di hidupku.
                </p>

                <p>
                  Jujur deh, aku mungkin bukan cowok yang paling romantis di dunia. Kadang kelakuanku suka random, absurd, atau malah ngeselin (apalagi pas bercanda tiba-tiba bilang <span className="text-amber-300 font-semibold">&apos;KU TUMBUK KAUU&apos;</span> wkwk). Tapi sumpah deh, dari awal kita kenal sampai momen tunangan kita kemarin, kamu tuh bener-bener rumah dan tempat pulangkahku yang paling nyaman.
                </p>

                <div className="p-4 rounded-2xl bg-rose-500/10 border-l-4 border-rose-400 my-4 text-rose-200 italic">
                  &quot;Aku mau minta maaf ya sayang kalau selama ini sering bikin kamu kesel, ngambek, cemberut, atau bercandaku suka kelewatan. Makasih banget udah selalu sabar ngadepin aku. Aku bakal terus belajar buat jadi pasangan terbaik buat kamu.&quot;
                </div>

                <p>
                  Kamu adalah cewek terhebat, terindah, dan paling spesial. Jangan pernah ragu sama rasa sayangku ke kamu ya. Semoga kita selalu sekompak ini, saling melengkapi, dan bahagia terus sampai hari-hari indah kita berikutnya.
                </p>

                <p className="pt-4 font-script text-3xl text-right text-rose-300">
                  I Love You 1000%, Sinta!
                  <br />
                  <span className="text-lg font-sans text-rose-200/80 font-normal block mt-1">
                    — Maulana Rifki Fadhilla (Rifki)
                  </span>
                </p>
              </div>

              {/* Interactive Minigame */}
              <div className="mt-10 pt-8 border-t border-rose-500/20 text-center">
                <h4 className="text-xl font-serif text-white mb-2">
                  Jadi... Sinta Maafin Rifki Nggak Nih? 🥺👉👈
                </h4>
                <p className="text-xs sm:text-sm text-rose-300/80 mb-6">
                  Pilih jawabanmu dengan hati yang damai ya sayang ~
                </p>

                {!forgiven ? (
                  <div className="flex flex-wrap items-center justify-center gap-4 relative min-h-[70px]">
                    <button
                      onClick={handleForgive}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-base shadow-lg shadow-rose-500/40 transform hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <Heart className="w-5 h-5 fill-white" />
                      <span>Maafin Dong, Rifki! ❤️</span>
                    </button>

                    <button
                      onMouseOver={handleDodge}
                      onClick={handleDodge}
                      style={noBtnStyle}
                      className="px-6 py-3 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300 font-medium text-sm border border-gray-600 transition-all duration-300"
                    >
                      <span>{btnText}</span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-rose-500/20 border border-emerald-400/40 text-emerald-300 font-bold flex items-center justify-center gap-2 animate-bounce">
                    <Smile className="w-5 h-5" />
                    <span>
                      🎉 YEYYY! Makasih Sayangku Sinta! Resmi Dimaafkan 100%! Aku Janji Makin Sayang! 💕
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, Heart, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveGuestbook() {
  const [messages, setMessages] = useState([]);
  const [author, setAuthor] = useState('Sinta Nuriya');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMessages = () => {
    fetch('/api/messages')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.messages) {
          setMessages(data.messages);
        }
      })
      .catch((err) => console.error('Error fetching guestbook:', err));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !text.trim()) {
      setError('Tulis balasan atau pesan cintamu dulu ya sayang ~');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: author || 'Sinta Nuriya',
          text: text.trim(),
          avatar: author.toLowerCase().includes('rifki') ? '🤴' : '👸',
        }),
      });

      const data = await res.json();
      if (data && data.success) {
        setMessages(data.messages);
        setText('');
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      } else {
        setError(data.error || 'Gagal mengirim pesan');
      }
    } catch (err) {
      console.error('Error submitting message:', err);
      setError('Terjadi kesalahan koneksi server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="guestbook" className="scroll-mt-28">
      <div className="text-center mb-10">
        <span className="text-rose-400 font-script text-3xl block mb-1">
          Tanda Tangan & Balasan Kamu
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Dinding Pesan Kita 💬
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-2">
          Tulis balasan surat, ucapan sayang, atau maaf langsung di sini (langsung tersimpan real-time di server lho!)
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="md:col-span-5 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-500/30 h-fit card-tilt">
          <div className="flex items-center gap-2 text-rose-300 font-serif font-bold text-xl mb-4">
            <MessageSquareHeart className="w-6 h-6 text-rose-400" />
            <span>Tulis Balasan Kamu</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                Nama Kamu:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-rose-300 absolute left-3 top-3" />
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Sinta Nuriya atau Rifki"
                  className="w-full bg-black/40 border border-rose-500/30 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                Pesan / Balasan:
              </label>
              <textarea
                rows="4"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Contoh: Iya Rifki sayang, aku udah maafin kamu kok! ❤️"
                className="w-full bg-black/40 border border-rose-500/30 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-400 resize-none"
              />
            </div>

            {error && (
              <p className="text-xs text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/30">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Mengirim ke Server...' : 'Kirim Balasan Sekarang ❤️'}</span>
            </button>
          </form>
        </div>

        {/* Messages List Column */}
        <div className="md:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {messages && messages.length > 0 ? (
            messages.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-rose-500/20 hover:border-rose-400/40 transition-all card-tilt"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center text-lg">
                      {item.avatar || '💕'}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-white text-base">
                        {item.author}
                      </h4>
                      <span className="text-xs text-rose-300/60 block">
                        {item.timestamp}
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{item.likes || 1}</span>
                  </span>
                </div>
                <p className="text-rose-100/90 text-sm sm:text-base leading-relaxed pl-1">
                  &quot;{item.text}&quot;
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white/5 backdrop-blur-md rounded-2xl border border-rose-500/20">
              <MessageSquareHeart className="w-10 h-10 text-rose-400/50 mx-auto mb-2" />
              <p className="text-sm text-rose-300/70">
                Belum ada pesan. Tulis balasan atau ucapan sayang pertamamu!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { Heart, Maximize2, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PhotoGallery() {
  const [filter, setFilter] = useState('semua');
  const [likes, setLikes] = useState({});
  const [lightbox, setLightbox] = useState({
    open: false,
    src: '',
    title: '',
    story: '',
  });

  const photos = [
    {
      id: 'IMG-20260709-WA0014.jpg',
      category: 'romantis',
      title: 'Tunangan Kita yang Manis ❤️',
      badge: '💍 Happy Engagement',
      badgeColor: 'bg-rose-500/90',
      caption:
        'Momen pas kita resmi tunangan. Cincin di jari kamu bukti kalau aku serius banget sama kamu, Sinta ~',
      story:
        'Dari awal kita kenal sampai akhirnya bisa sampai tahap tunangan ini, rasanya bersyukur banget punya kamu. Cincin ini saksi kalau cintaku ke kamu itu beneran tulus dan serius abis!',
    },
    {
      id: 'IMG-20260702-WA0016.jpg',
      category: 'romantis',
      title: 'Versi Anime Pelindungmu 💪',
      badge: '💪 Siap Jagain Sinta',
      badgeColor: 'bg-emerald-600/90',
      caption:
        'Edit versi berotot biar kelihatan garang jagain kamu! Tapi aslinya hati tetap lembut buat kamu doang wkwk.',
      story:
        'Foto tunangan versi buff/anime hero biar kelihatan tangguh siap jagain Sinta dari segala bahaya wkwk! Walaupun fotonya lucu-lucuan, tapi niat melindungimu 1000% serius!',
    },
    {
      id: 'IMG-20260630-WA0013.jpg',
      category: 'romantis',
      title: 'Menatap Samudra Bersamamu 🌊',
      caption:
        'Lihat lautan luas bikin tenang, sama persis pas aku ada di dekat kamu. Seluas itu juga rasa sayangku.',
      story:
        'Melihat laut yang luas bikin damai banget. Seluas itu juga rasa sayang, rasa bersyukur, dan harapanku buat masa depan kita nanti bareng kamu, Sinta.',
    },
    {
      id: 'IMG-20260503-WA0106.jpg',
      category: 'kecil',
      title: 'Foto Gemes Masa Kecil 🎓',
      badge: '👶 Nostalgia Gemoy',
      badgeColor: 'bg-amber-500/90',
      caption:
        'Dari kecil kita udah imut banget! Bukti kalau kita emang jodoh yang lucu dari dulu sampai sekarang.',
      story:
        'Foto wisuda kecil dan bersandar manis! Lihat foto masa kecil ini bikin senyum sendiri. Bukti kalau dari dulu kita udah ditakdirkan gemes dan cocok bareng.',
    },
    {
      id: 'IMG-20260715-WA0065.jpg',
      category: 'kocak',
      title: "'KU TUMBUK KAUU' 😂🍌",
      badge: '🍌 Kelakuan Absurd',
      badgeColor: 'bg-yellow-500/90 text-black',
      caption:
        'Kumis palsu & pisang! Maafin ya kalau aku suka absurd dan random, tapi janji ini demi bikin kamu ketawa!',
      story:
        'Salah satu kelakuan random paling ikonis wkwk! Pakai kumis palsu dan pisang Lego. Maafin ya sayang kalau aku suka absurd, tapi semua ini biar kamu gak pernah bosen bareng aku!',
    },
    {
      id: 'IMG-20260613-WA0014.jpg',
      category: 'kocak',
      title: 'Filter Lebah Kocak 🐝💛',
      badge: '🐝 Filter Kocak',
      badgeColor: 'bg-amber-500/90',
      caption:
        'Bahkan pas pakai filter lebah bengkak begini pun kamu tetep gemesin abis! Nggak bosen ketawa bareng kamu.',
      story:
        'Bahkan pas pakai filter lebah kocak begini kamu tetep keliatan lucu dan gemes! Kita nggak pernah ragu buat konyol bareng, itu yang bikin hubungan ini asik banget.',
    },
    {
      id: 'IMG-20260311-WA0001.jpg',
      category: 'kocak',
      title: 'Zaman Sekolah & Squidward 🎨',
      badge: '🎨 Zaman Sekolah',
      badgeColor: 'bg-purple-500/90',
      caption:
        'Masa-masa sekolah dengan lukisan Squidward dan stiker wajah lucu! Banyak banget kenangan seru kita.',
      story:
        'Kenangan zaman sekolah lengkap dengan lukisan Squidward dan stiker troll face wkwk! Perjalanan kita udah melewati banyak babak yang ngangenin dari zaman remaja sampai sekarang.',
    },
    {
      id: 'IMG-20260617-WA0031.jpg',
      category: 'kocak',
      title: 'Doodle Abstrak Kita 🖊️',
      badge: '🖊️ Seni Cerita Kita',
      badgeColor: 'bg-gray-500/90',
      caption:
        'Coretan seni sederhana yang jadi bukti kalau hal-hal kecil bareng kamu selalu terasa bermakna dan seru.',
      story:
        'Doodle lucu dan unik ini sama kayak cerita kita: nggak harus selalu biasa aja, tapi selalu punya warna, tawa, dan keindahannya sendiri.',
    },
  ];

  useEffect(() => {
    fetch('/api/like')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.likes) {
          setLikes(data.likes);
        }
      })
      .catch((err) => console.error('Error fetching likes:', err));
  }, []);

  const handleLike = async (photoId) => {
    setLikes((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));

    confetti({ particleCount: 15, spread: 35, origin: { y: 0.8 } });

    try {
      const res = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId }),
      });
      const data = await res.json();
      if (data && data.success && data.likes) {
        setLikes(data.likes);
      }
    } catch (err) {
      console.error('Error updating like count:', err);
    }
  };

  const openLightbox = (photo) => {
    setLightbox({
      open: true,
      src: `/images/${photo.id}`,
      title: photo.title,
      story: photo.story,
    });
  };

  const filteredPhotos = photos.filter((p) => {
    if (filter === 'semua') return true;
    return p.category === filter;
  });

  return (
    <section id="galeri" className="scroll-mt-28">
      <div className="text-center mb-8">
        <span className="text-rose-400 font-script text-3xl block mb-1">
          Foto-Foto Kita dari Manis sampai Absurd
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Galeri Cerita Sinta & Rifki 📸
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-2">
          Pilih kategori foto di bawah atau klik fotonya buat baca cerita seru di baliknya!
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setFilter('semua')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all ${
              filter === 'semua'
                ? 'bg-rose-500/40 border-rose-400 text-white shadow-lg'
                : 'bg-white/5 border-rose-500/20 text-rose-200 hover:bg-rose-500/20'
            }`}
          >
            ✨ Semua Kenangan (8)
          </button>
          <button
            onClick={() => setFilter('romantis')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all ${
              filter === 'romantis'
                ? 'bg-rose-500/40 border-rose-400 text-white shadow-lg'
                : 'bg-white/5 border-rose-500/20 text-rose-200 hover:bg-rose-500/20'
            }`}
          >
            💍 Romantis & Tunangan (3)
          </button>
          <button
            onClick={() => setFilter('kecil')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all ${
              filter === 'kecil'
                ? 'bg-rose-500/40 border-rose-400 text-white shadow-lg'
                : 'bg-white/5 border-rose-500/20 text-rose-200 hover:bg-rose-500/20'
            }`}
          >
            👶 Nostalgia Masa Kecil (2)
          </button>
          <button
            onClick={() => setFilter('kocak')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all ${
              filter === 'kocak'
                ? 'bg-rose-500/40 border-rose-400 text-white shadow-lg'
                : 'bg-white/5 border-rose-500/20 text-rose-200 hover:bg-rose-500/20'
            }`}
          >
            😂 Kocak & Meme Absurd (3)
          </button>
        </div>
      </div>

      {/* Grid with 3D Tilt hover animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-rose-500/30 card-tilt group"
          >
            <div className="relative h-72 overflow-hidden bg-black/40">
              <img
                src={`/images/${photo.id}`}
                alt={photo.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className={`absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-md text-white text-xs font-semibold ${photo.badgeColor}`}
              >
                {photo.badge}
              </div>
              <button
                onClick={() => openLightbox(photo)}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5 text-rose-400" /> Story
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif font-bold text-lg text-white">
                  {photo.title}
                </h3>
                <button
                  onClick={() => handleLike(photo.id)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold">{likes[photo.id] || 0}</span>
                </button>
              </div>
              <p className="text-rose-200/80 text-sm leading-relaxed">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightbox.open && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-rose-500/40 shadow-2xl max-h-[90vh] flex flex-col md:flex-row">
            <button
              onClick={() => setLightbox({ ...lightbox, open: false })}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-3/5 bg-black/60 flex items-center justify-center p-4 max-h-[50vh] md:max-h-[85vh]">
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
              />
            </div>

            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Cerita Dibalik Foto Ini</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-4">
                  {lightbox.title}
                </h3>
                <p className="text-rose-200/90 text-sm sm:text-base leading-relaxed">
                  {lightbox.story}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-rose-500/20 flex items-center justify-between">
                <span className="text-xs text-rose-300/70">
                  Sinta & Rifki Memories 2026
                </span>
                <button
                  onClick={() => setLightbox({ ...lightbox, open: false })}
                  className="px-5 py-2 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 text-xs font-semibold transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

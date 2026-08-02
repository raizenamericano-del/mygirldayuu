import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Award, Laugh } from 'lucide-react';

export default function LiveToast() {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);

  const notifications = [
    {
      icon: <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />,
      text: '💬 Rifki baru saja mengirim 1000% rasa sayang untuk Sinta...',
      time: 'Baru saja',
    },
    {
      icon: <Sparkles className="w-4 h-4 text-amber-300" />,
      text: '💍 Status Tunangan: Aktif & Terlindungi oleh Versi Buff Rifki 💪',
      time: '1m lalu',
    },
    {
      icon: <Laugh className="w-4 h-4 text-yellow-300" />,
      text: '🍌 Meme KU TUMBUK KAUU sedang membuat Sinta tersenyum 😂',
      time: '2m lalu',
    },
    {
      icon: <Award className="w-4 h-4 text-purple-400" />,
      text: '🌹 Hari ini 2 Agustus 2026 adalah Hari Sinta Nuriya Sedunia!',
      time: 'Baru saja',
    },
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setToast(notifications[index]);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 4000);

      index = (index + 1) % notifications.length;
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  if (!toast || !visible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-xs bg-black/80 backdrop-blur-md border border-rose-500/40 rounded-2xl p-3.5 shadow-2xl flex items-center gap-3 animate-slideUp">
      <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-400/50 flex items-center justify-center shrink-0">
        {toast.icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-rose-100 leading-snug">
          {toast.text}
        </p>
        <span className="text-[10px] text-rose-300/60 block mt-0.5">
          {toast.time} • Live Notification
        </span>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import ParticleCanvas from '@/components/ParticleCanvas';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ApologyLetter from '@/components/ApologyLetter';
import PhotoGallery from '@/components/PhotoGallery';
import LoveReasons from '@/components/LoveReasons';
import LoveCompatibility from '@/components/LoveCompatibility';
import LoveMeterQuiz from '@/components/LoveMeterQuiz';
import LoveGuestbook from '@/components/LoveGuestbook';
import CertificateModal from '@/components/CertificateModal';
import AudioModal from '@/components/AudioModal';
import VercelModal from '@/components/VercelModal';
import SecretVaultModal from '@/components/SecretVaultModal';
import ScratchCardModal from '@/components/ScratchCardModal';
import CinemaReelModal from '@/components/CinemaReelModal';
import LiveToast from '@/components/LiveToast';

export default function Home() {
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [vercelModalOpen, setVercelModalOpen] = useState(false);
  const [vaultModalOpen, setVaultModalOpen] = useState(false);
  const [scratchModalOpen, setScratchModalOpen] = useState(false);
  const [cinemaModalOpen, setCinemaModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative font-sans">
      {/* Background HTML5 Canvas Particle Engine (Heart Mouse Trail + Petals) */}
      <ParticleCanvas />

      {/* Floating Instagram/TikTok style Live Activity Toast */}
      <LiveToast />

      {/* Top Navigation */}
      <Navbar
        onOpenAudioModal={() => setAudioModalOpen(true)}
        onOpenVercelModal={() => setVercelModalOpen(true)}
        onOpenVaultModal={() => setVaultModalOpen(true)}
        onOpenScratchModal={() => setScratchModalOpen(true)}
        onOpenCinemaModal={() => setCinemaModalOpen(true)}
      />

      {/* Main Container */}
      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto space-y-24">
        {/* 1. Hero Section (fetches /api/stats) */}
        <Hero
          onOpenCinemaModal={() => setCinemaModalOpen(true)}
          onOpenScratchModal={() => setScratchModalOpen(true)}
        />

        {/* 2. Interactive Apology Letter & Minigame (/api/apology) */}
        <ApologyLetter />

        {/* 3. Filterable Photo Gallery with Live Likes API (/api/like) */}
        <PhotoGallery />

        {/* 4. 6 Reasons Sinta is Special (3D Flip Cards) */}
        <LoveReasons />

        {/* 5. Sci-Fi Love Compatibility Scanner (1000% Jodoh) */}
        <LoveCompatibility />

        {/* 6. Love Meter Slider & Quiz */}
        <LoveMeterQuiz />

        {/* 7. FULL-STACK Interactive Love Guestbook / Message Wall (/api/messages) */}
        <LoveGuestbook />

        {/* 8. Printable Digital Best Girlfriend Certificate */}
        <CertificateModal />

        {/* 9. Full-Stack Footer Banner with Vercel Deploy Guide */}
        <section className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-500/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 text-rose-300 font-semibold mb-2">
                <span>🎵 Musik & Suara Rifki</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed">
                Aplikasi ini dilengkapi dengan{' '}
                <strong className="text-rose-300">
                  Lofi Romantic Synthesizer
                </strong>{' '}
                dan rekaman suara asli Rifki yang romantis & santai.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setAudioModalOpen(true)}
                  className="px-5 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <span>🔊 Buka Pemutar Suara Rifki</span>
                </button>
                <button
                  onClick={() => setScratchModalOpen(true)}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 shadow-md"
                >
                  <span>✨ Gosok Kartu Hadiah</span>
                </button>
                <button
                  onClick={() => setVaultModalOpen(true)}
                  className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-amber-400 text-amber-300 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2"
                >
                  <span>🔐 Vault Rahasia (0208)</span>
                </button>
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-rose-500/20 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2 text-amber-300 font-semibold mb-2">
                <span>🚀 Siap Deploy ke Vercel Full-Stack</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed mb-4">
                Proyek <strong className="text-white">Next.js 14 Full-Stack</strong> ini langsung nyambung ke Serverless API Vercel. Tinggal upload GitHub, 40 detik live!
              </p>
              <button
                onClick={() => setVercelModalOpen(true)}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium inline-flex items-center gap-2 transition-all"
              >
                <span>Lihat Cara Deploy Vercel</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-rose-500/20 py-8 px-4 text-center text-xs text-rose-300/70">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-medium text-rose-200">
            Created with 1000% Love using <span className="text-rose-400 font-semibold">React & Next.js Full-Stack</span> by{' '}
            <span className="text-rose-400 font-semibold">Maulana Rifki Fadhilla (Rifki)</span>{' '}
            for <span className="text-rose-400 font-semibold">Sinta Nuriya</span> ❤️
          </p>
          <p>
            Celebrating National Girlfriend Day 2026 • Powered by Vercel Serverless API • Interactive Experience
          </p>
        </div>
      </footer>

      {/* Interactive Modals */}
      <AudioModal isOpen={audioModalOpen} onClose={() => setAudioModalOpen(false)} />
      <VercelModal isOpen={vercelModalOpen} onClose={() => setVercelModalOpen(false)} />
      <SecretVaultModal isOpen={vaultModalOpen} onClose={() => setVaultModalOpen(false)} />
      <ScratchCardModal isOpen={scratchModalOpen} onClose={() => setScratchModalOpen(false)} />
      <CinemaReelModal isOpen={cinemaModalOpen} onClose={() => setCinemaModalOpen(false)} />
    </div>
  );
}

import React from 'react';
import { X, Rocket } from 'lucide-react';

export default function VercelModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-400/40 shadow-2xl text-left max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center border border-amber-400/40 text-amber-300">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Panduan Deploy Full-Stack Next.js ke Vercel
            </h3>
            <p className="text-xs text-rose-300/80">
              Web ini adalah proyek Full-Stack Next.js 14 asli dengan Serverless
              API!
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-rose-100/90 leading-relaxed">
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-rose-500/20">
            <h4 className="font-bold text-white mb-1">
              Mengapa Next.js Sangat Cocok di Vercel?
            </h4>
            <p className="text-rose-200/80">
              Vercel adalah pencipta Next.js. Saat kamu mengupload repo ini ke
              Vercel, Vercel secara otomatis mengelola frontend React kamu dan
              mengubah endpoint di <code className="text-amber-300">pages/api/*</code>{' '}
              menjadi <strong>Vercel Serverless Functions</strong> yang cepat dan
              handal!
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-rose-500/20">
            <h4 className="font-bold text-white mb-1">
              Cara 1: Deploy via GitHub (Paling Direkomendasikan!)
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-rose-200/80">
              <li>Upload seluruh folder proyek ini ke akun GitHub kamu.</li>
              <li>
                Buka <strong className="text-white">vercel.com/new</strong> dan
                pilih repositori tersebut.
              </li>
              <li>
                Vercel otomatis mendeteksi framework <strong className="text-white">Next.js</strong>. Klik <strong className="text-white">Deploy</strong>.
              </li>
              <li>
                Dalam hitungan detik, web Full-Stack kamu tayang dengan domain
                khusus!
              </li>
            </ol>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-rose-500/20">
            <h4 className="font-bold text-white mb-1">
              Cara 2: Deploy dari Terminal via Vercel CLI
            </h4>
            <p className="text-rose-200/80 mb-2">
              Buka terminal di komputer kamu yang berisi folder ini:
            </p>
            <pre className="bg-black/60 p-3 rounded-lg text-amber-300 font-mono text-xs overflow-x-auto">
              npm install -g vercel{"\n"}
              cd folder-project-ini{"\n"}
              vercel --prod
            </pre>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-md"
          >
            Mengerti, Siap Deploy! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

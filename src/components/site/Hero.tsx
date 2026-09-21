import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Eye, MapPin, X } from 'lucide-react';
import { contact, asset } from '@/data/portfolio';
import Photo from './Photo';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

export default function Hero() {
  const [cvOpen, setCvOpen] = useState(false);
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="pt-28 md:pt-36 pb-14">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-12 gap-10 items-start">
        {/* Left copy */}
        <motion.div {...fadeUp} className="md:col-span-7">
          <p className="inline-block text-xs font-bold tracking-[0.18em] uppercase border border-ink/20 rounded-full px-4 py-1.5 bg-card">
            Portofolio 2026, Nganjuk, Indonesia
          </p>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Portofolio Simple Saya.
          </h1>
          <p className="mt-5 text-lg text-muted leading-relaxed max-w-xl">
            Saya <span className="font-semibold text-ink">Muhammad Angga Choirul</span>,
            mahasiswa D4 Teknik Informatika Politeknik Negeri Jember (IPK 3.65). Fokus saya{' '}
            <span className="font-semibold text-ink">Machine Learning</span> untuk skripsi
            dan <span className="font-semibold text-ink">Flutter</span> untuk produk mobile,
            didukung pengalaman backend Laravel &amp; Android.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => go('projects')}
              className="inline-flex items-center gap-2 bg-ink text-paper font-semibold px-6 py-3 rounded-full hover:bg-accent transition-colors"
            >
              Lihat Proyek <ArrowRight size={17} />
            </button>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-ink/25 font-semibold px-6 py-3 rounded-full hover:border-ink hover:bg-card transition-colors"
            >
              LinkedIn Saya
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 max-w-md divide-x divide-line border-y border-line">
            {[
              ['3.65', 'IPK / 4.00'],
              ['5+', 'Proyek PBL'],
              ['2', 'Fokus utama'],
            ].map(([v, l]) => (
              <div key={l} className="px-4 py-4">
                <dt className="sr-only">{l}</dt>
                <dd className="text-2xl font-extrabold">{v}</dd>
                <dd className="text-xs text-muted mt-1">{l}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Right profile card */}
        <motion.aside
          {...fadeUp}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="md:col-span-5"
        >
          <div className="bg-card border border-ink/15 rounded-2xl p-6 shadow-hard">
            <div className="flex items-center gap-4">
              <Photo
                src={asset('foto-profil.png')}
                alt="Foto formal Muhammad Angga Choirul"
                className="w-16 h-16 rounded-full object-cover border border-ink/15"
                fallbackClassName="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center text-2xl font-extrabold"
              />
              <div>
                <p className="font-extrabold text-lg leading-tight">Muhammad Angga Choirul</p>
                <p className="text-sm text-muted">ML × Flutter Developer</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted flex items-center gap-1.5">
              <MapPin size={14} /> {contact.location}
            </p>
            <div className="mt-4 border-t border-line pt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-paper border border-line rounded-xl p-3">
                <p className="text-xs text-muted">Pendidikan</p>
                <p className="font-semibold mt-0.5">D4 TI Politeknik Negeri Jember</p>
              </div>
              <div className="bg-paper border border-line rounded-xl p-3">
                <p className="text-xs text-muted">Program AI</p>
                <p className="font-semibold mt-0.5">Pijak × IBM &amp; Dicoding</p>
              </div>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="mt-4 block text-center bg-accent text-white font-semibold py-3 rounded-xl hover:bg-accent-dark transition-colors"
            >
              {contact.email}
            </a>
            <button
              onClick={() => setCvOpen(true)}
              className="mt-2.5 flex w-full items-center justify-center gap-2 bg-ink text-paper font-semibold py-3 rounded-xl hover:bg-accent transition-colors text-sm"
            >
              <Eye size={16} /> Lihat CV Saya
            </button>
          </div>
          <div className="mt-4 bg-mustard border border-ink/15 rounded-2xl p-5 flex gap-4 items-start">
            <span className="text-2xl" aria-hidden>
              ✎
            </span>
            <p className="text-sm leading-relaxed">
              <span className="font-bold">Fokus saat ini:</span> skripsi ensemble SVM + KNN
              untuk klasifikasi gula darah, sambil memperdalam Flutter &amp; konsumsi REST API.
            </p>
          </div>
        </motion.aside>
      </div>
      {cvOpen && <CvViewer onClose={() => setCvOpen(false)} />}
    </section>
  );
}

function CvViewer({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] bg-ink/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card border border-ink/15 rounded-2xl w-full max-w-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-line">
          <p className="font-extrabold text-sm">CV, Muhammad Angga Choirul</p>
          <div className="flex gap-2">
            <a
              href={asset(contact.cvUrl)}
              download
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-ink text-paper px-4 py-2 rounded-full hover:bg-accent transition-colors"
            >
              <Download size={14} /> Unduh
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-bold border border-ink/20 px-4 py-2 rounded-full hover:border-ink transition-colors"
            >
              <X size={14} /> Tutup
            </button>
          </div>
        </div>
        <iframe src={asset(contact.cvUrl)} title="Pratinjau CV" className="w-full h-[75vh] bg-paper" />
      </div>
    </div>
  );
}

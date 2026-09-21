import { motion } from 'framer-motion';
import { experiences as seedExperiences, asset } from '@/data/portfolio';
import { useLocal } from '@/data/store';
import Photo from './Photo';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

export function About() {
  return (
    <section id="about" className="py-16 bg-card border-y border-line">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-12 gap-10">
        <motion.div {...fadeUp} className="md:col-span-4">
          <div className="bg-paper border border-ink/15 rounded-2xl p-3 shadow-hard rotate-[-1.5deg]">
            <Photo
              src={asset('foto-tentang.jpg')}
              alt="Foto Muhammad Angga Choirul"
              className="w-full aspect-[3/4] object-cover rounded-xl"
              fallbackClassName="w-full aspect-[3/4] rounded-xl bg-ink text-paper flex items-center justify-center text-6xl font-extrabold"
            />
            <p className="text-center text-sm font-bold py-3">Muhammad Angga Choirul</p>
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.45, delay: 0.05 }} className="md:col-span-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-extrabold tracking-[0.18em] text-accent">05</span>
            <span className="h-px flex-1 bg-line" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-muted">Tentang</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Halo, saya Angga.
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Mahasiswa D4 Teknik Informatika di{' '}
            <span className="font-semibold text-ink">Politeknik Negeri Jember (2023 sampai sekarang, IPK 3.65/4.00)</span>{' '}
            yang senang belajar dan berkembang di dunia teknologi. Saya terbiasa kerja kolaboratif,
            bertanggung jawab, dan rapi dalam dokumentasi teknis.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            Saya aktif di program <span className="font-semibold text-ink">Pijak × IBM SkillsBuild &amp; Dicoding</span>{' '}
            (fundamental AI, Generative AI, AI Ethics) dan sedang menyusun skripsi tentang ensemble
            SVM + KNN untuk klasifikasi gula darah.
          </p>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.45, delay: 0.1 }} className="md:col-span-4 grid sm:grid-cols-1 gap-4 content-start">
          {[
            ['Pendidikan', 'D4 Teknik Informatika\nPoliteknik Negeri Jember'],
            ['Fokus', 'Machine Learning\nFlutter / Dart'],
            ['Cara kerja', 'Kolaboratif & rapi\nTrello, GitHub, docs'],
            ['Bahasa', 'Indonesia (fasih)\nInggris (dasar)'],
          ].map(([t, d]) => (
            <div key={t} className="bg-paper border border-line rounded-2xl p-5">
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-accent">{t}</p>
              <p className="mt-2 text-sm font-semibold whitespace-pre-line leading-relaxed">{d}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function Experience() {
  const [experiences] = useLocal('angga-experiences', seedExperiences);
  return (
    <section id="experience" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-extrabold tracking-[0.18em] text-accent">06</span>
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-muted">Pengalaman</span>
        </div>
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Perjalanan proyek saya
        </motion.h2>
        <div className="mt-8 border-t border-line">
          {experiences.map((e, i) => (
            <motion.div
              key={`${e.role}-${i}`}
              {...fadeUp}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}
              className="grid md:grid-cols-12 gap-2 md:gap-6 py-6 border-b border-line"
            >
              <p className="md:col-span-3 text-sm font-semibold text-muted">{e.period}</p>
              <div className="md:col-span-9">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold">{e.role}</h3>
                  <span className="text-xs font-bold bg-sage border border-ink/10 rounded-full px-3 py-1">
                    {e.tag}
                  </span>
                </div>
                <p className="text-sm text-accent font-semibold mt-1">{e.org}</p>
                <ul className="mt-2 space-y-1">
                  {e.points.map((p) => (
                    <li key={p} className="text-sm text-muted leading-relaxed">• {p}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Current() {
  return (
    <section id="current" className="py-16 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-extrabold tracking-[0.18em] text-mustard">12</span>
          <span className="h-px flex-1 bg-paper/20" />
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-paper/60">Fokus Saat Ini</span>
        </div>
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Dua hal yang sedang saya dalami
        </motion.h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <motion.div {...fadeUp} className="bg-paper text-ink rounded-2xl p-6">
            <p className="text-xs font-extrabold tracking-[0.14em] uppercase text-accent">Skripsi: ML</p>
            <h3 className="mt-2 font-extrabold text-xl">Ensemble SVM + KNN untuk gula darah</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Meneliti penggabungan dua algoritma klasifikasi agar skrining awal diabetes
              lebih stabil dan akurat. Detail lengkap ada di naskah skripsi.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.45, delay: 0.1 }} className="border border-paper/25 rounded-2xl p-6">
            <p className="text-xs font-extrabold tracking-[0.14em] uppercase text-mustard">Produk: Flutter</p>
            <h3 className="mt-2 font-extrabold text-xl">Aplikasi mobile yang rapi</h3>
            <p className="mt-2 text-sm text-paper/70 leading-relaxed">
              Memperdalam Flutter: state management, konsumsi REST API + auth, dan widget
              yang bisa dipakai ulang, termasuk menampilkan hasil model ML.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

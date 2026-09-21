import { motion } from 'framer-motion';
import { Award, ExternalLink, FileText } from 'lucide-react';
import { certificates as seedCertificates, asset } from '@/data/portfolio';
import { useLocal } from '@/data/store';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

export default function Certificates() {
  const [certificates] = useLocal('angga-certificates', seedCertificates);
  return (
    <section id="sertifikat" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-extrabold tracking-[0.18em] text-accent">07</span>
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-muted">Sertifikat</span>
        </div>
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Bukti belajar yang terverifikasi
        </motion.h2>
        <p className="mt-3 text-muted max-w-2xl">
          Delapan kelas Dicoding (AI, ML, deep learning, Python, Git) + program Pijak × IBM SkillsBuild.
          Klik untuk buka PDF atau verifikasi ke Dicoding.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((c, i) => (
            <motion.article
              key={c.title}
              {...fadeUp}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}
              className={`rounded-2xl p-5 border flex flex-col ${
                c.highlight ? 'bg-ink text-paper border-ink' : 'bg-card border-ink/15'
              }`}
            >
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.highlight ? 'bg-paper/15' : 'bg-accent-soft'}`}>
                <Award size={19} className={c.highlight ? '' : 'text-accent'} />
              </span>
              <h3 className="mt-3 font-extrabold leading-snug">{c.title}</h3>
              <p className={`mt-1 text-xs ${c.highlight ? 'text-paper/60' : 'text-muted'}`}>{c.issuer}</p>
              <p className={`mt-0.5 text-xs font-semibold ${c.highlight ? 'text-paper/60' : 'text-muted'}`}>{c.date}</p>
              <div className="mt-4 pt-4 border-t border-line/40 flex gap-2 mt-auto">
                {(c.fileData || c.fileUrl !== '#') && (
                  <a
                    href={c.fileData ? c.fileData : encodeURI(asset(c.fileUrl))}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-colors ${
                      c.highlight ? 'bg-paper text-ink hover:bg-mustard' : 'bg-ink text-paper hover:bg-accent'
                    }`}
                  >
                    <FileText size={14} /> Buka PDF
                  </a>
                )}
                {c.verifyUrl && (
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition-colors ${
                      c.highlight ? 'border-paper/30 hover:border-paper' : 'border-ink/20 hover:border-ink'
                    }`}
                  >
                    <ExternalLink size={14} /> Verifikasi
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

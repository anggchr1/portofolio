import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { faqs, services, testimonials as seedTestimonials } from '@/data/portfolio';
import { useLocal } from '@/data/store';
import { go } from './Navbar';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

function Eyebrow({ no, title }: { no: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xs font-extrabold tracking-[0.18em] text-accent">{no}</span>
      <span className="h-px flex-1 bg-line" />
      <span className="text-xs font-bold tracking-[0.18em] uppercase text-muted">{title}</span>
    </div>
  );
}

export function Services() {
  return (
    <section id="layanan" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Eyebrow no="09" title="Layanan" />
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Bisa bantu apa?
        </motion.h2>
        <p className="mt-3 text-muted max-w-2xl">
          Konsultasi awal gratis. Estimasi waktu dan biaya dibahas setelah kebutuhan jelas, tanpa komitmen.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card border border-ink/15 rounded-2xl p-6 flex flex-col"
            >
              <p className="text-sm font-extrabold text-ink/25">0{i + 1}</p>
              <h3 className="mt-1 font-extrabold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.desc}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2"><span className="text-accent font-bold">✓</span><span>{p}</span></li>
                ))}
              </ul>
              <button
                onClick={() => go('contact')}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent mt-auto pt-4"
              >
                Diskusikan kebutuhan <ArrowRight size={15} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [testimonials] = useLocal('angga-testimonials', seedTestimonials);
  return (
    <section id="testimoni" className="py-16 bg-cream/60 border-y border-line">
      <div className="mx-auto max-w-6xl px-4">
        <Eyebrow no="10" title="Testimoni" />
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Kata mereka yang pernah kerja bareng
        </motion.h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card border border-ink/15 rounded-2xl p-6"
            >
              <p className="text-4xl text-accent font-extrabold" aria-hidden>“</p>
              <blockquote className="text-muted leading-relaxed -mt-2">{t.quote}</blockquote>
              <figcaption className="mt-4 border-t border-line pt-4">
                <p className="font-bold text-sm">{t.name}</p>
                <p className="text-xs text-muted">{t.context}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <Eyebrow no="13" title="FAQ" />
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight text-center">
          Sering ditanyakan
        </motion.h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`bg-card border rounded-2xl overflow-hidden ${isOpen ? 'border-ink' : 'border-ink/15'}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-bold"
                >
                  {f.q}
                  <span className="shrink-0 w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>
                {isOpen && <p className="px-5 pb-5 text-sm text-muted leading-relaxed">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

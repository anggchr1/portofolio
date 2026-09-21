import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Smartphone, Server, Plus, Minus, ArrowUpRight, Star } from 'lucide-react';
import { projects, repos, skills as seedSkills, tools, type Repo } from '@/data/portfolio';
import { useLocal } from '@/data/store';
import { openProject } from './ProjectPage';

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

export function ToolsStrip() {
  return (
    <div className="border-y border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-wrap items-center gap-x-8 gap-y-2">
        <span className="text-xs font-bold tracking-[0.18em] uppercase text-muted">
          Terbiasa memakai
        </span>
        {tools.map((t) => (
          <span key={t} className="text-sm font-semibold text-ink/70">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Focus() {
  const items = [
    {
      icon: BrainCircuit,
      title: 'Machine Learning',
      desc: 'Topik skripsi saya: menggabungkan dua algoritma klasifikasi untuk skrining awal gula darah yang lebih stabil.',
      tags: ['Python', 'Machine Learning', 'Penelitian'],
    },
    {
      icon: Smartphone,
      title: 'Flutter Development',
      desc: 'Aplikasi mobile Dart yang rapi, state management, konsumsi REST API, dan UI konsisten.',
      tags: ['Dart', 'Flutter', 'REST API'],
    },
    {
      icon: Server,
      title: 'Backend Pendukung',
      desc: 'Fondasi server Laravel/MySQL dan backend mobile Android agar fitur tersambung ke data dengan aman.',
      tags: ['Laravel', 'MySQL', 'Android'],
    },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Eyebrow no="01" title="Bidang Fokus" />
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Apa yang saya kerjakan
        </motion.h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.article
              key={it.title}
              {...fadeUp}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-card border border-ink/15 rounded-2xl p-6 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-start justify-between">
                <span className="w-11 h-11 rounded-xl bg-ink text-paper flex items-center justify-center">
                  <it.icon size={20} />
                </span>
                <span className="text-sm font-extrabold text-ink/25">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-extrabold text-lg">{it.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{it.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {it.tags.map((t) => (
                  <span key={t} className="text-xs font-semibold bg-paper border border-line rounded-full px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const [expanded, setExpanded] = useState<number | null>(1);
  return (
    <section id="projects" className="py-16 bg-cream/60 border-y border-line">
      <div className="mx-auto max-w-6xl px-4">
        <Eyebrow no="02" title="Proyek Pilihan" />
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Hasil kerja nyata, bukan sekadar tugas
        </motion.h2>
        <p className="mt-3 text-muted max-w-2xl">
          Enam proyek: <span className="font-semibold text-ink">skripsi ensemble SVM + KNN</span> sebagai
          unggulan, plus lima proyek PBL dari dokumentasi hingga ML. Klik tiap baris untuk cerita di baliknya.
        </p>
        <div className="mt-8 space-y-4">
          {projects.map((p, i) => {
            const open = expanded === p.id;
            return (
              <motion.article
                key={p.id}
                {...fadeUp}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.2) }}
                className={`bg-card border rounded-2xl overflow-hidden transition-colors ${
                  open ? 'border-ink' : 'border-ink/15'
                }`}
              >
                <button
                  onClick={() => setExpanded(open ? null : p.id)}
                  className="w-full text-left p-5 md:p-6 flex gap-4 md:gap-6 items-start"
                >
                  <span className={`w-12 h-12 shrink-0 rounded-xl ${p.swatch} border border-ink/15 flex items-center justify-center text-2xl`}>
                    {p.emoji}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-muted">
                      {String(i + 1).padStart(2, '0')} • {p.period}
                    </span>
                    <span className="block font-extrabold text-lg leading-snug mt-0.5">{p.title}</span>
                    <span className="block text-sm text-accent font-semibold mt-0.5">{p.role}</span>
                    <span className="block text-sm text-muted mt-2 leading-relaxed">{p.description}</span>
                    <span className="mt-3 flex flex-wrap gap-2">
                      {p.technologies.map((t) => (
                        <span key={t} className="text-xs font-semibold bg-paper border border-line rounded-full px-3 py-1">
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="shrink-0 w-9 h-9 rounded-full border border-ink/20 flex items-center justify-center">
                    {open ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {open && (
                  <div className="px-5 md:px-6 pb-6 md:pl-[5.5rem]">
                    <p className="text-sm leading-relaxed bg-paper border border-line rounded-xl p-4">
                      <span className="font-bold">Di balik proyek ini: </span>
                      {p.longDescription}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); openProject(p.id); }}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-accent"
                    >
                      Buka halaman lengkap <ArrowUpRight size={15} />
                    </button>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>

        <LiveRepos />
      </div>
    </section>
  );
}

function LiveRepos() {
  const [items, setItems] = useState<Repo[]>(repos);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('https://api.github.com/users/anggchr1/repos?per_page=100&sort=updated')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Array<{ name: string; description: string | null; language: string | null; html_url: string; stargazers_count: number; fork: boolean }>) => {
        if (cancelled) return;
        const wanted = new Set(repos.map((r) => r.name));
        const merged: Repo[] = data
          .filter((g) => wanted.has(g.name))
          .map((g) => {
            const fallback = repos.find((r) => r.name === g.name)!;
            return {
              name: g.name,
              description: g.description || fallback.description,
              language: `${g.language ?? fallback.language} ★ ${g.stargazers_count}`,
              url: g.html_url,
            };
          });
        if (merged.length > 0) {
          const ordered = repos
            .map((r) => merged.find((m) => m.name === r.name) ?? r)
            .filter(Boolean) as Repo[];
          setItems(ordered);
          setLive(true);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="mt-12">
      <h3 className="font-extrabold text-xl">Repo open-source di GitHub</h3>
      <p className="mt-1 text-sm text-muted">
        Kode yang bisa dilihat publik, paling aktif di ML dan Flutter.{' '}
        <a href="https://github.com/anggchr1" target="_blank" rel="noreferrer" className="font-semibold text-accent underline underline-offset-2">
          Lihat semua di github.com/anggchr1
        </a>
        {live && <span className="ml-2 text-xs font-bold bg-sage border border-ink/10 rounded-full px-2.5 py-0.5">● live dari GitHub</span>}
      </p>
      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        {items.map((r) => (
          <a
            key={r.name}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="block bg-card border border-ink/15 rounded-2xl p-5 hover:border-ink hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-sm break-all">{r.name}</p>
              <ArrowUpRight size={16} className="shrink-0 text-muted" />
            </div>
            <p className="mt-2 text-sm text-muted leading-relaxed">{r.description}</p>
            <p className="mt-3 text-xs font-bold text-accent inline-flex items-center gap-1.5">
              {live && <Star size={12} />} {r.language}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const [skills] = useLocal('angga-skills', seedSkills);
  return (
    <section id="skills" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Eyebrow no="04" title="Keahlian" />
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Alat yang saya kuasai
        </motion.h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              {...fadeUp}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}
              className="bg-card border border-ink/15 rounded-2xl p-5"
            >
              <div className="flex items-baseline justify-between">
                <p className="font-bold">{s.name}</p>
                <p className="text-sm font-extrabold text-accent">{s.level}%</p>
              </div>
              <div className="mt-3 h-2 rounded-full bg-paper border border-line overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="h-full bg-ink rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects, type Project } from '@/data/portfolio';

export function openProject(id: number) {
  window.location.hash = `#/proyek/${id}`;
}

function backToProjects() {
  window.location.hash = '#/';
  setTimeout(() => document.getElementById('projects')?.scrollIntoView(), 120);
}

export default function ProjectPage({ project }: { project: Project }) {
  const idx = projects.findIndex((p) => p.id === project.id);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="mx-auto max-w-3xl px-4">
        <button
          onClick={backToProjects}
          className="inline-flex items-center gap-2 text-sm font-bold border border-ink/20 rounded-full px-4 py-2 hover:border-ink transition-colors"
        >
          <ArrowLeft size={15} /> Semua proyek
        </button>

        <div className={`mt-8 ${project.swatch} border border-ink/15 rounded-2xl h-44 flex items-center justify-center text-7xl`}>
          {project.emoji}
        </div>

        <p className="mt-6 text-xs font-bold text-muted">{project.period}</p>
        <h1 className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{project.title}</h1>
        <p className="mt-2 text-accent font-bold">{project.role}</p>
        <p className="mt-4 text-muted leading-relaxed">{project.description}</p>

        <h2 className="mt-8 font-extrabold text-xl">Di balik proyek ini</h2>
        <p className="mt-3 text-muted leading-relaxed bg-card border border-line rounded-2xl p-5">
          {project.longDescription}
        </p>

        <h2 className="mt-8 font-extrabold text-xl">Teknologi</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span key={t} className="text-sm font-semibold bg-card border border-line rounded-full px-4 py-1.5">{t}</span>
          ))}
        </div>

        <div className="mt-10 bg-ink text-paper rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <p className="font-bold">Punya proyek sejenis? Mari diskusi.</p>
          <button
            onClick={() => { window.location.hash = '#/'; setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 120); }}
            className="inline-flex items-center gap-2 bg-paper text-ink font-bold px-5 py-2.5 rounded-full text-sm hover:bg-mustard transition-colors shrink-0"
          >
            Hubungi saya <ArrowRight size={15} />
          </button>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {[
            { p: prev, label: '← Proyek sebelumnya' },
            { p: next, label: 'Proyek berikutnya →' },
          ].map(({ p, label }) => (
            <button
              key={p.id}
              onClick={() => openProject(p.id)}
              className="text-left border border-ink/15 rounded-2xl p-4 hover:border-ink transition-colors bg-card"
            >
              <p className="text-xs text-muted font-bold">{label}</p>
              <p className="mt-1 font-bold text-sm leading-snug">{p.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

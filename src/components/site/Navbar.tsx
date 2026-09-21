import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { navItems } from '@/data/portfolio';

export const labels: Record<string, string> = {
  home: 'Beranda',
  projects: 'Proyek',
  demo: 'Demo ML',
  skills: 'Keahlian',
  about: 'Tentang',
  experience: 'Pengalaman',
  sertifikat: 'Sertifikat',
  blog: 'Blog',
  layanan: 'Layanan',
  testimoni: 'Testimoni',
  komentar: 'Komentar',
  current: 'Fokus',
  faq: 'FAQ',
  contact: 'Kontak',
};

export function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };
  return { dark, toggle };
}

export function go(id: string, setOpen?: (v: boolean) => void) {
  if (window.location.hash.startsWith('#/')) {
    window.location.hash = '#/';
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120);
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
  setOpen?.(false);
}

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('main section[id]');
      let cur = 'home';
      sections.forEach((s) => {
        const el = s as HTMLElement;
        if (window.scrollY >= el.offsetTop - 140) cur = el.id;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <button onClick={() => go('home', setOpen)} className="flex items-center gap-2">
          <span className="w-7 h-7 bg-accent rounded-md inline-block" aria-hidden />
          <span className="font-extrabold tracking-tight text-lg">
            angga<span className="text-accent">.</span>choirul
          </span>
        </button>

        <div className="hidden md:flex items-center gap-5">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => go(item, setOpen)}
              className={`text-sm font-medium transition-colors ${
                active === item ? 'text-accent' : 'text-ink/70 hover:text-ink'
              }`}
            >
              {labels[item] ?? item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Ganti mode gelap/terang"
            className="w-9 h-9 rounded-full border border-ink/20 flex items-center justify-center hover:border-ink transition-colors"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => go('contact', setOpen)}
            className="hidden sm:inline-block bg-ink text-paper text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-accent transition-colors"
          >
            Hubungi Saya
          </button>
          <button
            className="md:hidden p-2"
            aria-label="menu"
            onClick={() => setOpen(!open)}
          >
            <div className={`w-6 h-0.5 bg-ink transition-transform ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-6 h-0.5 bg-ink my-1.5 ${open ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-ink transition-transform ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-paper border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => go(item, setOpen)}
                className={`text-left py-2.5 text-sm font-medium border-b border-line/60 last:border-0 ${
                  active === item ? 'text-accent' : 'text-ink/70'
                }`}
              >
                {labels[item] ?? item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

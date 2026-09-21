import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { FORMSPREE_ENDPOINT, contact, asset } from '@/data/portfolio';
import { allSections } from '@/data/portfolio';
import { labels, go } from './Navbar';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Isi nama, email, dan pesan dulu ya!');
      return;
    }
    // Kalau Formspree belum diisi (lihat src/data/portfolio.ts),
    // fallback: buka aplikasi email pengunjung dengan pesan terisi.
    if (!FORMSPREE_ENDPOINT) {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        `Portfolio: pesan dari ${form.name}`,
      )}&body=${encodeURIComponent(`${form.message}\n\nDari: ${form.name} (${form.email})`)}`;
      setSent(true);
      return;
    }
    setSending(true);
    setError('');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (!res.ok) throw new Error('gagal');
      setSent(true);
    } catch {
      setError('Pengiriman gagal. Coba lagi atau hubungi via email langsung.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-extrabold tracking-[0.18em] text-accent">14</span>
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-muted">Kontak</span>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Mari diskusi proyek ML / Flutter.
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Terbuka untuk kolaborasi, freelance, dan riset. Punya pertanyaan? Sapa saja,
              saya usahakan membalas secepatnya.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href={`mailto:${contact.email}`} className="flex items-center justify-between bg-card border border-ink/15 rounded-xl px-5 py-4 hover:border-ink transition-colors">
                <span><span className="block text-xs text-muted">Email</span><span className="font-bold">{contact.email}</span></span>
                <ArrowUpRight size={18} />
              </a>
              <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-card border border-ink/15 rounded-xl px-5 py-4 hover:border-ink transition-colors">
                <span><span className="block text-xs text-muted">GitHub</span><span className="font-bold">{contact.githubLabel}</span></span>
                <ArrowUpRight size={18} />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-ink text-paper rounded-xl px-5 py-4 hover:bg-accent transition-colors">
                <span><span className="block text-xs text-paper/60">LinkedIn</span><span className="font-bold text-sm break-all">{contact.linkedinLabel}</span></span>
                <ArrowUpRight size={18} />
              </a>
              <p className="text-xs text-muted pt-1">{contact.location}</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.45, delay: 0.1 }} className="bg-card border border-ink/15 rounded-2xl p-6">
            {!sent ? (
              <form
                className="space-y-4"
                onSubmit={submit}
              >
                <div>
                  <label htmlFor="name" className="text-sm font-bold">Nama</label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nama kamu"
                    className="mt-1.5 w-full rounded-xl border border-ink/20 bg-paper px-4 py-3 text-sm placeholder:text-muted/70 focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-bold">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="mt-1.5 w-full rounded-xl border border-ink/20 bg-paper px-4 py-3 text-sm placeholder:text-muted/70 focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-bold">Pesan</label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Ceritakan kebutuhan proyekmu…"
                    rows={5}
                    className="mt-1.5 w-full rounded-xl border border-ink/20 bg-paper px-4 py-3 text-sm placeholder:text-muted/70 focus:outline-none focus:border-ink"
                  />
                </div>
                <button type="submit" disabled={sending} className="w-full bg-ink text-paper font-bold py-3.5 rounded-xl hover:bg-accent transition-colors disabled:opacity-60">
                  {sending ? 'Mengirim…' : 'Kirim Pesan'}
                </button>
                {error && <p className="text-xs text-center font-semibold text-accent">{error}</p>}
                <p className="text-xs text-muted text-center">
                  {FORMSPREE_ENDPOINT
                    ? 'Pesan terkirim langsung ke email saya.'
                    : 'Tanpa backend: tombol ini membuka aplikasi email dengan pesan terisi otomatis.'}
                </p>
              </form>
            ) : (
              <div className="text-center py-12">
                <p className="text-5xl">✉</p>
                <h3 className="mt-4 font-extrabold text-xl">Terima kasih, {form.name.split(' ')[0] || 'kawan'}!</h3>
                <p className="mt-2 text-sm text-muted">Pesanmu tercatat (simulasi). Saya akan membalas via email.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  className="mt-6 border border-ink/25 font-bold px-6 py-2.5 rounded-full hover:border-ink transition-colors text-sm"
                >
                  Tulis lagi
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper mt-4">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <button
            onClick={() => { window.location.hash = '#/admin'; }}
            className="font-extrabold text-lg text-left hover:opacity-80 transition-opacity"
            title="Area admin"
          >
            angga<span className="text-mustard">.</span>choirul
          </button>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {allSections.map((item) => (
              <button key={item} onClick={() => go(item)} className="text-sm text-paper/70 hover:text-paper transition-colors capitalize">
                {labels[item] ?? item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-paper/15 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <p className="text-xs text-paper/50">© {new Date().getFullYear()} Muhammad Angga Choirul, Nganjuk, ID</p>
          <a
            href={asset(contact.cvUrl)}
            download
            className="inline-flex items-center gap-2 text-xs font-bold border border-paper/30 rounded-full px-4 py-2 hover:border-paper transition-colors w-fit"
          >
            <Download size={14} /> Unduh CV
          </a>
        </div>
      </div>
    </footer>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { fmtDate, uid, useLocal, type Comment } from '@/data/store';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

export default function Comments() {
  const [items, setItems] = useLocal<Comment[]>('angga-comments', []);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim().slice(0, 40);
    const m = message.trim().slice(0, 300);
    if (!n || !m) {
      setNotice('Isi nama dan komentar dulu ya.');
      return;
    }
    setItems((prev) => [{ id: uid(), name: n, message: m, at: Date.now() }, ...prev]);
    setName('');
    setMessage('');
    setNotice('Komentar terkirim, terima kasih sudah mampir.');
  };

  const loop = items.length > 0 ? [...items, ...items] : [];

  return (
    <section id="komentar" className="py-16 bg-card border-y border-line">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-extrabold tracking-[0.18em] text-accent">11</span>
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-muted">Komentar</span>
        </div>
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Buku tamu pengunjung
        </motion.h2>
        <p className="mt-3 text-muted max-w-2xl">
          Pernah kerja bareng, punya masukan, atau sekadar say hi? Tulis di sini, komentar
          langsung tampil di bawah.
        </p>

        <motion.form
          {...fadeUp}
          onSubmit={submit}
          className="mt-8 bg-paper border border-ink/15 rounded-2xl p-6 grid md:grid-cols-[1fr_2fr_auto] gap-4 items-end"
        >
          <label className="block text-sm font-bold">Nama
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama kamu"
              maxLength={40}
              className="mt-1.5 w-full rounded-xl border border-ink/20 bg-card px-4 py-2.5 text-sm font-normal placeholder:text-muted/70 focus:outline-none focus:border-ink"
            />
          </label>
          <label className="block text-sm font-bold">Komentar
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis kesan atau pesan (maks 300 karakter)"
              maxLength={300}
              className="mt-1.5 w-full rounded-xl border border-ink/20 bg-card px-4 py-2.5 text-sm font-normal placeholder:text-muted/70 focus:outline-none focus:border-ink"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-ink text-paper font-bold px-6 py-2.5 rounded-xl hover:bg-accent transition-colors text-sm"
          >
            <Send size={15} /> Kirim
          </button>
        </motion.form>
        {notice && <p className="mt-3 text-sm font-semibold text-accent">{notice}</p>}

        <div className="mt-8 overflow-hidden">
          {loop.length === 0 ? (
            <div className="border border-dashed border-ink/25 rounded-2xl p-8 text-center text-sm text-muted">
              Belum ada komentar. Jadilah yang pertama menulis.
            </div>
          ) : (
            <div className="flex gap-4 w-max animate-marquee-ltr hover:[animation-play-state:paused]">
              {loop.map((c, i) => (
                <figure
                  key={`${c.id}-${i}`}
                  aria-hidden={i >= items.length}
                  className="w-72 shrink-0 bg-paper border border-ink/15 rounded-2xl p-5"
                >
                  <MessageCircle size={18} className="text-accent" />
                  <blockquote className="mt-2 text-sm leading-relaxed line-clamp-4">{c.message}</blockquote>
                  <figcaption className="mt-3 pt-3 border-t border-line">
                    <p className="font-bold text-sm">{c.name}</p>
                    <p className="text-xs text-muted">{fmtDate(c.at)}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
        <p className="mt-4 text-xs text-muted">Arahkan kursor ke kartu untuk menghentikan putaran.</p>
      </div>
    </section>
  );
}

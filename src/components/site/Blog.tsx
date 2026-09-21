import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { posts, type Post } from '@/data/portfolio';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

export function openPost(slug: string) {
  window.location.hash = `#/blog/${slug}`;
}

export default function Blog() {
  return (
    <section id="blog" className="py-16 bg-card border-y border-line">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-extrabold tracking-[0.18em] text-accent">08</span>
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-muted">Blog</span>
        </div>
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Catatan belajar
        </motion.h2>
        <p className="mt-3 text-muted max-w-2xl">
          Saya menulis agar paham lebih dalam, dan agar orang lain bisa ikut belajar.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <motion.button
              key={p.slug}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => openPost(p.slug)}
              className="text-left bg-paper border border-ink/15 rounded-2xl p-6 hover:border-ink hover:-translate-y-1 transition-all group"
            >
              <p className="text-xs font-bold text-muted">{p.date}</p>
              <h3 className="mt-2 font-extrabold text-lg leading-snug group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">
                Baca <ArrowUpRight size={15} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PostPage({ post }: { post: Post }) {
  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="mx-auto max-w-2xl px-4">
        <button
          onClick={() => { window.location.hash = '#/'; setTimeout(() => document.getElementById('blog')?.scrollIntoView(), 120); }}
          className="inline-flex items-center gap-2 text-sm font-bold border border-ink/20 rounded-full px-4 py-2 hover:border-ink transition-colors"
        >
          <ArrowLeft size={15} /> Kembali
        </button>
        <p className="mt-8 text-xs font-bold tracking-[0.14em] uppercase text-muted">{post.date}</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{post.title}</h1>
        <div className="mt-3 flex gap-2">
          {post.tags.map((t) => (
            <span key={t} className="text-xs font-bold bg-cream border border-line rounded-full px-3 py-1">{t}</span>
          ))}
        </div>
        <div className="mt-8 space-y-5">
          {post.body.map((par, i) => (
            <p key={i} className="text-muted leading-relaxed">{par}</p>
          ))}
        </div>
        <div className="mt-10 border-t border-line pt-6 text-sm text-muted">
          Ditulis oleh <span className="font-bold text-ink">Muhammad Angga Choirul</span> • Ada koreksi atau diskusi? Hubungi saya lewat halaman kontak.
        </div>
      </div>
    </div>
  );
}

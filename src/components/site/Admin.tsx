import { useState } from 'react';
import { ArrowLeft, LogOut, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  ADMIN_USER,
  checkPass,
  fmtDate,
  isAuthed,
  setAuthed,
  useLocal,
  type Comment,
} from '@/data/store';
import {
  certificates as seedCerts,
  experiences as seedExp,
  skills as seedSkills,
  testimonials as seedTesti,
  type Certificate,
  type Experience,
  type Testimonial,
} from '@/data/portfolio';

type Tab = 'komentar' | 'testimoni' | 'sertifikat' | 'pengalaman' | 'keahlian';

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'komentar', label: 'Komentar' },
  { id: 'testimoni', label: 'Testimoni' },
  { id: 'sertifikat', label: 'Sertifikat' },
  { id: 'pengalaman', label: 'Pengalaman' },
  { id: 'keahlian', label: 'Keahlian' },
];

const inputCls =
  'mt-1 w-full rounded-xl border border-ink/20 bg-paper px-4 py-2.5 text-sm focus:outline-none focus:border-ink';
const btnPrimary =
  'inline-flex items-center gap-2 bg-ink text-paper font-bold px-5 py-2.5 rounded-xl hover:bg-accent transition-colors text-sm';
const btnDanger =
  'inline-flex items-center gap-1.5 text-xs font-bold border border-accent/40 text-accent rounded-full px-3.5 py-1.5 hover:bg-accent hover:text-white transition-colors';
const btnGhost =
  'inline-flex items-center gap-1.5 text-xs font-bold border border-ink/20 rounded-full px-3.5 py-1.5 hover:border-ink transition-colors';

function toHome() {
  window.location.hash = '#/';
}

export default function Admin() {
  const [logged, setLogged] = useState(() => isAuthed());
  if (!logged) return <LoginGate onOk={() => setLogged(true)} />;
  return <Dashboard onOut={() => setLogged(false)} />;
}

function LoginGate({ onOk }: { onOk: () => void }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && checkPass(pass)) {
      setAuthed(true);
      onOk();
    } else {
      setErr('Username atau password salah.');
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-sm px-4">
        <button
          onClick={toHome}
          className="inline-flex items-center gap-2 text-sm font-bold border border-ink/20 rounded-full px-4 py-2 hover:border-ink transition-colors"
        >
          <ArrowLeft size={15} /> Kembali ke situs
        </button>
        <div className="mt-6 bg-card border border-ink/15 rounded-2xl p-6 shadow-hard-sm">
          <h1 className="font-extrabold text-xl">Area Admin</h1>
          <p className="mt-1 text-sm text-muted">Khusus pemilik situs. Sesi berakhir saat tab ditutup.</p>
          <form onSubmit={submit} className="mt-5 space-y-4">
            <label className="block text-sm font-bold">Username
              <input value={user} onChange={(e) => setUser(e.target.value)} autoComplete="username" className={inputCls} />
            </label>
            <label className="block text-sm font-bold">Password
              <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password" className={inputCls} />
            </label>
            {err && <p className="text-sm font-bold text-accent">{err}</p>}
            <button type="submit" className="w-full bg-ink text-paper font-bold py-3 rounded-xl hover:bg-accent transition-colors text-sm">
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onOut }: { onOut: () => void }) {
  const [tab, setTab] = useState<Tab>('komentar');
  const logout = () => {
    setAuthed(false);
    onOut();
    toHome();
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Panel Admin</h1>
            <p className="text-sm text-muted">Perubahan tersimpan di browser ini dan langsung tampil di situs.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={toHome} className={btnGhost}>
              <ArrowLeft size={14} /> Lihat situs
            </button>
            <button onClick={logout} className={btnGhost}>
              <LogOut size={14} /> Keluar
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`text-sm font-bold px-4 py-2 rounded-full border transition-colors ${
                tab === t.id ? 'bg-ink text-paper border-ink' : 'border-ink/20 hover:border-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === 'komentar' && <TabComments />}
          {tab === 'testimoni' && <TabTestimonials />}
          {tab === 'sertifikat' && <TabCertificates />}
          {tab === 'pengalaman' && <TabExperience />}
          {tab === 'keahlian' && <TabSkills />}
        </div>
      </div>
    </div>
  );
}

function confirmDelete(label: string) {
  return window.confirm(`Hapus "${label}"? Tindakan ini tidak bisa dibatalkan.`);
}

function TabComments() {
  const [items, setItems] = useLocal<Comment[]>('angga-comments', []);
  if (items.length === 0) return <p className="text-sm text-muted">Belum ada komentar masuk.</p>;
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">{items.length} komentar. Hapus yang kasar atau spam agar tidak tampil.</p>
      {items.map((c) => (
        <div key={c.id} className="bg-card border border-ink/15 rounded-2xl p-4 flex gap-4 justify-between">
          <div className="min-w-0">
            <p className="font-bold text-sm">{c.name} <span className="font-normal text-muted text-xs">• {fmtDate(c.at)}</span></p>
            <p className="mt-1 text-sm text-muted leading-relaxed break-words">{c.message}</p>
          </div>
          <button onClick={() => { if (confirmDelete(c.message.slice(0, 30))) setItems((p) => p.filter((x) => x.id !== c.id)); }} className={`${btnDanger} self-start shrink-0`}>
            <Trash2 size={13} /> Hapus
          </button>
        </div>
      ))}
    </div>
  );
}

function TabTestimonials() {
  const [items, setItems] = useLocal<Testimonial[]>('angga-testimonials', seedTesti);
  const [quote, setQuote] = useState('');
  const [name, setName] = useState('');
  const [context, setContext] = useState('');
  const [editing, setEditing] = useState<number | null>(null);

  const reset = () => { setQuote(''); setName(''); setContext(''); setEditing(null); };
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote.trim() || !name.trim()) return;
    if (editing === null) {
      setItems((p) => [...p, { quote: quote.trim(), name: name.trim(), context: context.trim() || 'Testimoni pengunjung' }]);
    } else {
      setItems((p) => p.map((t, i) => (i === editing ? { quote: quote.trim(), name: name.trim(), context: context.trim() } : t)));
    }
    reset();
  };
  const edit = (i: number) => {
    setQuote(items[i].quote); setName(items[i].name); setContext(items[i].context);
    setEditing(i);
  };

  return (
    <div>
      <form onSubmit={save} className="bg-card border border-ink/15 rounded-2xl p-5 space-y-3">
        <p className="font-extrabold">{editing === null ? 'Tambah testimoni' : 'Ubah testimoni'}</p>
        <textarea value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Isi kutipan" rows={3} className={inputCls} />
        <div className="grid sm:grid-cols-2 gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama / peran" className={inputCls} />
          <input value={context} onChange={(e) => setContext(e.target.value)} placeholder="Keterangan (misal: Rekan PBL Klinik)" className={inputCls} />
        </div>
        <div className="flex gap-2">
          <button type="submit" className={btnPrimary}><Plus size={15} /> {editing === null ? 'Tambah' : 'Simpan'}</button>
          {editing !== null && <button type="button" onClick={reset} className={btnGhost}>Batal</button>}
        </div>
      </form>
      <div className="mt-4 space-y-3">
        {items.map((t, i) => (
          <div key={i} className="bg-card border border-ink/15 rounded-2xl p-4">
            <p className="text-sm leading-relaxed">“{t.quote}”</p>
            <p className="mt-2 text-sm font-bold">{t.name}</p>
            <p className="text-xs text-muted">{t.context}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => edit(i)} className={btnGhost}><Pencil size={13} /> Ubah</button>
              <button onClick={() => { if (confirmDelete(t.name)) setItems((p) => p.filter((_, x) => x !== i)); }} className={btnDanger}><Trash2 size={13} /> Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabCertificates() {
  const [items, setItems] = useLocal<Certificate[]>('angga-certificates', seedCerts);
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');
  const [verifyUrl, setVerifyUrl] = useState('');
  const [fileData, setFileData] = useState('');
  const [fileName, setFileName] = useState('');
  const [editing, setEditing] = useState<number | null>(null);

  const reset = () => { setTitle(''); setIssuer(''); setDate(''); setVerifyUrl(''); setFileData(''); setFileName(''); setEditing(null); };

  const onFile = (f: File | undefined) => {
    if (!f) return;
    if (f.size > 2.5 * 1024 * 1024) {
      alert('Ukuran PDF maksimal 2,5 MB agar muat di penyimpanan browser.');
      return;
    }
    const r = new FileReader();
    r.onload = () => { setFileData(String(r.result)); setFileName(f.name); };
    r.readAsDataURL(f);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) return;
    const entry: Certificate = {
      title: title.trim(),
      issuer: issuer.trim(),
      date: date.trim() || '2026',
      verifyUrl: verifyUrl.trim() || undefined,
      fileUrl: editing !== null ? items[editing].fileUrl : '#',
      fileData: fileData || (editing !== null ? items[editing].fileData : undefined),
    };
    if (editing === null) setItems((p) => [entry, ...p]);
    else setItems((p) => p.map((c, i) => (i === editing ? entry : c)));
    reset();
  };

  const edit = (i: number) => {
    const c = items[i];
    setTitle(c.title); setIssuer(c.issuer); setDate(c.date);
    setVerifyUrl(c.verifyUrl ?? ''); setFileData(''); setFileName('');
    setEditing(i);
  };

  return (
    <div>
      <form onSubmit={save} className="bg-card border border-ink/15 rounded-2xl p-5 space-y-3">
        <p className="font-extrabold">{editing === null ? 'Tambah sertifikat' : 'Ubah sertifikat'}</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul sertifikat" className={inputCls} />
        <div className="grid sm:grid-cols-2 gap-3">
          <input value={issuer} onChange={(e) => setIssuer(e.target.value)} placeholder="Penerbit" className={inputCls} />
          <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Tanggal (cth: 07 Jun 2026)" className={inputCls} />
        </div>
        <input value={verifyUrl} onChange={(e) => setVerifyUrl(e.target.value)} placeholder="Link verifikasi (opsional)" className={inputCls} />
        <label className="block text-sm font-bold">File PDF (opsional, maks 2,5 MB)
          <input type="file" accept="application/pdf" onChange={(e) => onFile(e.target.files?.[0])} className={`${inputCls} file:mr-3 file:font-bold file:border-0 file:bg-paper file:px-3 file:py-1.5 file:rounded-lg`} />
        </label>
        {fileName && <p className="text-xs font-semibold text-accent">Terpilih: {fileName}</p>}
        <div className="flex gap-2">
          <button type="submit" className={btnPrimary}><Plus size={15} /> {editing === null ? 'Tambah' : 'Simpan'}</button>
          {editing !== null && <button type="button" onClick={reset} className={btnGhost}>Batal</button>}
        </div>
      </form>
      <div className="mt-4 space-y-3">
        {items.map((c, i) => (
          <div key={i} className="bg-card border border-ink/15 rounded-2xl p-4 flex gap-3 justify-between">
            <div className="min-w-0">
              <p className="font-bold text-sm">{c.title}</p>
              <p className="text-xs text-muted">{c.issuer} • {c.date}{c.fileData ? ' • PDF terunggah' : ''}</p>
            </div>
            <div className="flex gap-2 self-start shrink-0">
              <button onClick={() => edit(i)} className={btnGhost}><Pencil size={13} /> Ubah</button>
              <button onClick={() => { if (confirmDelete(c.title)) setItems((p) => p.filter((_, x) => x !== i)); }} className={btnDanger}><Trash2 size={13} /> Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabExperience() {
  const [items, setItems] = useLocal<Experience[]>('angga-experiences', seedExp);
  const [role, setRole] = useState('');
  const [org, setOrg] = useState('');
  const [period, setPeriod] = useState('');
  const [tag, setTag] = useState('');
  const [points, setPoints] = useState('');
  const [editing, setEditing] = useState<number | null>(null);

  const reset = () => { setRole(''); setOrg(''); setPeriod(''); setTag(''); setPoints(''); setEditing(null); };
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !org.trim()) return;
    const entry: Experience = {
      role: role.trim(), org: org.trim(), period: period.trim(),
      tag: tag.trim() || 'Pengalaman',
      points: points.split('\n').map((s) => s.trim()).filter(Boolean),
    };
    if (editing === null) setItems((p) => [entry, ...p]);
    else setItems((p) => p.map((x, i) => (i === editing ? entry : x)));
    reset();
  };
  const edit = (i: number) => {
    const x = items[i];
    setRole(x.role); setOrg(x.org); setPeriod(x.period); setTag(x.tag);
    setPoints(x.points.join('\n')); setEditing(i);
  };

  return (
    <div>
      <form onSubmit={save} className="bg-card border border-ink/15 rounded-2xl p-5 space-y-3">
        <p className="font-extrabold">{editing === null ? 'Tambah pengalaman' : 'Ubah pengalaman'}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Peran" className={inputCls} />
          <input value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Organisasi / proyek" className={inputCls} />
          <input value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="Periode" className={inputCls} />
          <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Label" className={inputCls} />
        </div>
        <textarea value={points} onChange={(e) => setPoints(e.target.value)} placeholder="Poin pencapaian, satu baris satu poin" rows={3} className={inputCls} />
        <div className="flex gap-2">
          <button type="submit" className={btnPrimary}><Plus size={15} /> {editing === null ? 'Tambah' : 'Simpan'}</button>
          {editing !== null && <button type="button" onClick={reset} className={btnGhost}>Batal</button>}
        </div>
      </form>
      <div className="mt-4 space-y-3">
        {items.map((x, i) => (
          <div key={i} className="bg-card border border-ink/15 rounded-2xl p-4 flex gap-3 justify-between">
            <div className="min-w-0">
              <p className="font-bold text-sm">{x.role}</p>
              <p className="text-xs text-muted">{x.org} • {x.period}</p>
            </div>
            <div className="flex gap-2 self-start shrink-0">
              <button onClick={() => edit(i)} className={btnGhost}><Pencil size={13} /> Ubah</button>
              <button onClick={() => { if (confirmDelete(x.role)) setItems((p) => p.filter((_, n) => n !== i)); }} className={btnDanger}><Trash2 size={13} /> Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabSkills() {
  const [items, setItems] = useLocal<Array<{ name: string; level: number }>>('angga-skills', seedSkills);
  const [name, setName] = useState('');
  const [level, setLevel] = useState('70');

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((p) => [...p, { name: name.trim(), level: Math.max(0, Math.min(100, Number(level) || 0)) }]);
    setName(''); setLevel('70');
  };

  return (
    <div>
      <p className="text-sm text-muted">Geser atau ketik angka untuk mengubah level. Perubahan langsung tampil di section Keahlian.</p>
      <div className="mt-3 space-y-3">
        {items.map((s, i) => (
          <div key={i} className="bg-card border border-ink/15 rounded-2xl p-4 flex flex-wrap items-center gap-3">
            <input
              value={s.name}
              onChange={(e) => setItems((p) => p.map((x, n) => (n === i ? { ...x, name: e.target.value } : x)))}
              className="font-bold text-sm bg-transparent border-b border-transparent hover:border-ink/30 focus:border-ink focus:outline-none flex-1 min-w-32"
            />
            <input
              type="range" min={0} max={100}
              value={s.level}
              onChange={(e) => setItems((p) => p.map((x, n) => (n === i ? { ...x, level: Number(e.target.value) } : x)))}
              className="flex-1 min-w-32 accent-[#d9480f]"
            />
            <input
              type="number" min={0} max={100}
              value={s.level}
              onChange={(e) => setItems((p) => p.map((x, n) => (n === i ? { ...x, level: Math.max(0, Math.min(100, Number(e.target.value) || 0)) } : x)))}
              className="w-16 rounded-lg border border-ink/20 bg-paper px-2 py-1.5 text-sm text-center focus:outline-none focus:border-ink"
            />
            <button onClick={() => { if (confirmDelete(s.name)) setItems((p) => p.filter((_, n) => n !== i)); }} className={btnDanger}><Trash2 size={13} /> Hapus</button>
          </div>
        ))}
      </div>
      <form onSubmit={add} className="mt-4 bg-card border border-dashed border-ink/30 rounded-2xl p-4 flex flex-wrap gap-3 items-end">
        <label className="text-sm font-bold flex-1 min-w-40">Keahlian baru
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="cth: Docker" className={inputCls} />
        </label>
        <label className="text-sm font-bold">Level
          <input type="number" min={0} max={100} value={level} onChange={(e) => setLevel(e.target.value)} className={`${inputCls} w-24`} />
        </label>
        <button type="submit" className={btnPrimary}><Plus size={15} /> Tambah</button>
      </form>
    </div>
  );
}

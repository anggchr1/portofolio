import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

const INFO: Record<string, { title: string; body: string }> = {
  gender: { title: 'Jenis kelamin', body: 'Prevalensi diabetes bisa berbeda antara laki-laki dan perempuan karena faktor hormonal dan distribusi lemak tubuh.' },
  age: { title: 'Usia', body: 'Risiko diabetes tipe 2 naik seiring usia, terutama di atas 45 tahun karena sensitivitas insulin menurun.' },
  hypertension: { title: 'Hipertensi', body: 'Tekanan darah tinggi dan diabetes sering muncul bersamaan dan saling memperburuk.' },
  heart: { title: 'Penyakit jantung', body: 'Penderita diabetes punya risiko penyakit jantung 2–4x lebih tinggi.' },
  smoking: { title: 'Riwayat merokok', body: 'Merokok menaikkan resistensi insulin dan risiko diabetes tipe 2.' },
  bmi: { title: 'BMI', body: 'Berat (kg) dibagi tinggi kuadrat (m²). Normal 18,5–24,9. ≥30 masuk obesitas, berkorelasi kuat dengan risiko diabetes.' },
  hba1c: { title: 'HbA1c (%)', body: 'Rata-rata gula darah 2–3 bulan terakhir. Normal <5,7%. Pre-diabetes 5,7–6,4%. Diabetes ≥6,5%.' },
  glucose: { title: 'Gula darah (mg/dL)', body: 'Puasa normal 70–99. Pre-diabetes 100–125. Diabetes ≥126 (puasa) atau ≥200 (2 jam setelah makan).' },
};

// Skoring heuristik transparan untuk demo edukasi.
// BUKAN model skripsi (SVM+KNN), hanya ilustrasi cara kerja skrining berbasis aturan.
function scoreRisk(v: {
  age: number; hypertension: boolean; heart: boolean; smoking: string;
  bmi: number; hba1c: number; glucose: number;
}) {
  let s = 0;
  const notes: string[] = [];
  if (v.glucose >= 126) { s += 4; notes.push('Gula darah ≥126 mg/dL (ambang diabetes puasa)'); }
  else if (v.glucose >= 100) { s += 2; notes.push('Gula darah 100–125 mg/dL (rentang pre-diabetes)'); }
  if (v.hba1c >= 6.5) { s += 4; notes.push('HbA1c ≥6,5% (ambang diabetes)'); }
  else if (v.hba1c >= 5.7) { s += 2; notes.push('HbA1c 5,7–6,4% (rentang pre-diabetes)'); }
  if (v.bmi >= 30) { s += 2; notes.push('BMI ≥30 (obesitas)'); }
  else if (v.bmi >= 25) { s += 1; notes.push('BMI 25–29,9 (overweight)'); }
  else if (v.bmi < 18.5) { s += 1; notes.push('BMI di bawah normal'); }
  if (v.age >= 45) { s += 1; notes.push('Usia ≥45 tahun'); }
  if (v.hypertension) { s += 1; notes.push('Ada hipertensi'); }
  if (v.heart) { s += 1; notes.push('Ada riwayat penyakit jantung'); }
  if (v.smoking === 'current') { s += 1; notes.push('Merokok aktif'); }
  else if (v.smoking === 'formerly' || v.smoking === 'ever') { s += 0.5; notes.push('Pernah merokok'); }
  const level = s < 3 ? 'Rendah' : s <= 5.5 ? 'Sedang' : 'Tinggi';
  return { score: s, level, notes };
}

const inputCls =
  'mt-1.5 w-full rounded-xl border border-ink/20 bg-paper px-4 py-2.5 text-sm focus:outline-none focus:border-ink';

export default function Demo() {
  const [gender, setGender] = useState('Female');
  const [age, setAge] = useState('45');
  const [hyper, setHyper] = useState('0');
  const [heart, setHeart] = useState('0');
  const [smoking, setSmoking] = useState('never');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [hba1c, setHba1c] = useState('5.5');
  const [glucose, setGlucose] = useState('120');
  const [tip, setTip] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof scoreRisk> | null>(null);

  const bmi =
    weight && height && Number(height) > 0
      ? Math.round((Number(weight) / (Number(height) / 100) ** 2) * 10) / 10
      : 25;

  const run = () => {
    setResult(
      scoreRisk({
        age: Number(age) || 0,
        hypertension: hyper === '1',
        heart: heart === '1',
        smoking,
        bmi,
        hba1c: Number(hba1c) || 0,
        glucose: Number(glucose) || 0,
      }),
    );
  };

  const barColor = result
    ? result.level === 'Rendah'
      ? 'bg-ink'
      : result.level === 'Sedang'
        ? 'bg-mustard'
        : 'bg-accent'
    : 'bg-ink';
  const barPct = result ? Math.min(100, Math.round((result.score / 12) * 100)) : 0;

  return (
    <section id="demo" className="py-16 bg-cream/60 border-y border-line">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-extrabold tracking-[0.18em] text-accent">03</span>
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-muted">Demo Mini</span>
        </div>
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Coba simulasi skrining gula darah
        </motion.h2>
        <p className="mt-3 text-muted max-w-2xl">
          Terinspirasi dari web interface skripsi saya (Flask + model ensemble). Versi di sini memakai{' '}
          <span className="font-semibold text-ink">aturan sederhana yang transparan</span>, cukup isi
          data, lihat cara kerja skrining berbasis skor.
        </p>

        <div className="mt-8 grid lg:grid-cols-2 gap-5">
          <motion.div {...fadeUp} className="bg-card border border-ink/15 rounded-2xl p-6">
            <p className="font-extrabold flex items-center gap-2">
              <FlaskConical size={18} /> Input data
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
              <label className="block">Jenis kelamin
                <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputCls}>
                  <option value="Female">Perempuan</option>
                  <option value="Male">Laki-laki</option>
                </select>
              </label>
              <label className="block">Usia (tahun)
                <input type="number" min={0} max={120} value={age} onChange={(e) => setAge(e.target.value)} className={inputCls} />
              </label>
              <label className="block">Hipertensi
                <select value={hyper} onChange={(e) => setHyper(e.target.value)} className={inputCls}>
                  <option value="0">Tidak</option>
                  <option value="1">Ya</option>
                </select>
              </label>
              <label className="block">Penyakit jantung
                <select value={heart} onChange={(e) => setHeart(e.target.value)} className={inputCls}>
                  <option value="0">Tidak</option>
                  <option value="1">Ya</option>
                </select>
              </label>
              <label className="block sm:col-span-2">Riwayat merokok
                <select value={smoking} onChange={(e) => setSmoking(e.target.value)} className={inputCls}>
                  <option value="never">Tidak pernah</option>
                  <option value="formerly">Pernah (berhenti)</option>
                  <option value="ever">Pernah</option>
                  <option value="current">Aktif merokok</option>
                </select>
              </label>
              <label className="block">Berat (kg)
                <input type="number" placeholder="cth: 65" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputCls} />
              </label>
              <label className="block">Tinggi (cm)
                <input type="number" placeholder="cth: 165" value={height} onChange={(e) => setHeight(e.target.value)} className={inputCls} />
              </label>
              <label className="block">HbA1c (%)
                <input type="number" step="0.1" value={hba1c} onChange={(e) => setHba1c(e.target.value)} className={inputCls} />
              </label>
              <label className="block">Gula darah (mg/dL)
                <input type="number" value={glucose} onChange={(e) => setGlucose(e.target.value)} className={inputCls} />
              </label>
            </div>
            <p className="mt-3 text-sm text-muted">BMI terhitung: <span className="font-bold text-ink">{bmi}</span></p>
            <button onClick={run} className="mt-4 w-full bg-ink text-paper font-bold py-3 rounded-xl hover:bg-accent transition-colors">
              Jalankan Simulasi
            </button>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.keys(INFO).map((k) => (
                <button
                  key={k}
                  onClick={() => setTip(tip === k ? null : k)}
                  className={`text-xs font-semibold border rounded-full px-3 py-1 transition-colors ${
                    tip === k ? 'border-ink bg-ink text-paper' : 'border-ink/20 hover:border-ink'
                  }`}
                >
                  {INFO[k].title}?
                </button>
              ))}
            </div>
            {tip && (
              <p className="mt-3 text-sm bg-paper border border-line rounded-xl p-4 leading-relaxed">
                <span className="font-bold">{INFO[tip].title}: </span>{INFO[tip].body}
              </p>
            )}
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.45, delay: 0.1 }} className="bg-card border border-ink/15 rounded-2xl p-6">
            <p className="font-extrabold">Hasil simulasi</p>
            {!result ? (
              <p className="mt-4 text-sm text-muted leading-relaxed">
                Belum ada hasil. Isi data di samping lalu tekan <span className="font-semibold text-ink">Jalankan Simulasi</span>. Skor dihitung dari ambang klinis umum (puasa ≥126, HbA1c ≥6,5, dan seterusnya).
              </p>
            ) : (
              <div className="mt-4">
                <div className={`rounded-xl border border-ink/15 p-5 text-center ${result.level === 'Tinggi' ? 'bg-accent-soft' : result.level === 'Sedang' ? 'bg-cream' : 'bg-sage'}`}>
                  <p className="text-xs font-bold tracking-[0.14em] uppercase text-muted">Tingkat risiko</p>
                  <p className="text-4xl font-extrabold mt-1">{result.level}</p>
                  <p className="text-sm text-muted mt-1">Skor {result.score} dari 12</p>
                </div>
                <div className="mt-4 h-2.5 rounded-full bg-paper border border-line overflow-hidden">
                  <div className={`h-full ${barColor} transition-all duration-700`} style={{ width: `${barPct}%` }} />
                </div>
                <ul className="mt-4 space-y-1.5">
                  {result.notes.length === 0 && (
                    <li className="text-sm text-muted">Semua indikator dalam rentang normal. Pertahankan!</li>
                  )}
                  {result.notes.map((n) => (
                    <li key={n} className="text-sm bg-paper border border-line rounded-lg px-3 py-2">• {n}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted leading-relaxed border-t border-line pt-4">
                  Demo edukasi, <span className="font-semibold">bukan diagnosis medis</span> dan{' '}
                  <span className="font-semibold">bukan model skripsi asli</span>. Untuk kepastian,
                  periksa ke fasilitas kesehatan.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

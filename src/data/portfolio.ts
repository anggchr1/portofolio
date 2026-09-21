export type Project = {
  id: number;
  title: string;
  role: string;
  period: string;
  description: string;
  longDescription: string;
  technologies: string[];
  swatch: string;
  emoji: string;
};

export type Experience = {
  role: string;
  org: string;
  period: string;
  points: string[];
  tag: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Skripsi: Ensemble SVM + KNN untuk Klasifikasi Status Gula Darah',
    role: 'ML Research (Skripsi)',
    period: 'Jul 2026 – Nov 2026 • Skripsi',
    description:
      'Penelitian skripsi: menggabungkan dua algoritma klasifikasi untuk skrining awal kadar gula darah yang lebih stabil.',
    longDescription:
      'Skripsi saya meneliti penggabungan algoritma SVM dan KNN dengan teknik ensemble untuk klasifikasi status gula darah sebagai instrumen skrining awal diabetes. Fokus penelitian: akurasi klasifikasi, stabilitas model, dan interpretabilitas hasil. Saya membangun pipeline preprocessing data, eksperimen hyperparameter tuning, dan evaluasi model dengan metrik yang relevan.',
    technologies: ['Python', 'Scikit-learn', 'Machine Learning'],
    swatch: 'bg-accent-soft',
    emoji: '🩸',
  },
  {
    id: 2,
    title: 'Hydrosee: IoT & AI Monitoring System',
    role: 'ML Engineer',
    period: 'Okt 2025 – Des 2025 • PBL',
    description:
      'Sistem monitoring berbasis ESP32-CAM untuk deteksi dan pengusiran hama belalang secara real-time dengan model image classification.',
    longDescription:
      'Proyek PBL IoT + AI: saya membangun model image classification dengan Python untuk identifikasi hama belalang, lalu mengintegrasikannya ke backend sistem. Di sisi IoT, ESP32-CAM streaming untuk deteksi real-time dan trigger pengusiran hama. Fokus: akurasi model, latency inferensi, dan integrasi hardware–software.',
    technologies: ['Python', 'TensorFlow/Keras', 'ESP32-CAM', 'IoT', 'REST API'],
    swatch: 'bg-sage',
    emoji: '🦗',
  },
  {
    id: 3,
    title: 'Website Nganjuk Ekraf',
    role: 'Back-End Web Developer',
    period: 'Feb 2025 – Mei 2025 • PBL',
    description:
      'Sisi server website ekonomi kreatif Nganjuk dengan Laravel + MySQL: autentikasi, relasi database, dan optimasi performa.',
    longDescription:
      'Mengembangkan backend Laravel: routing, controller, Eloquent ORM, autentikasi pengguna, dan optimasi query MySQL. Menghubungkan fitur aplikasi dengan database agar listing pelaku ekraf, galeri, dan agenda tetap cepat.',
    technologies: ['PHP', 'Laravel', 'MySQL', 'REST API'],
    swatch: 'bg-cream',
    emoji: '🎨',
  },
  {
    id: 4,
    title: 'Aplikasi Klinik DKT',
    role: 'Back-End Mobile Developer',
    period: 'Sep 2024 – Jan 2025 • PBL',
    description:
      'Back-end aplikasi mobile klinik dengan Android Studio (Java) dan integrasi API untuk pertukaran data medis yang aman dan efisien.',
    longDescription:
      'Merancang struktur data pasien, jadwal, dan rekam medis. Membangun layer network di Android Studio (Java), mengelola integrasi API agar data medis tersinkron dinamis, plus validasi keamanan dasar untuk data sensitif.',
    technologies: ['Java', 'Android Studio', 'REST API', 'MySQL'],
    swatch: 'bg-accent-soft',
    emoji: '🏥',
  },
  {
    id: 5,
    title: 'Aplikasi Kasir Toko Roti Latanza',
    role: 'Project Manager & Tester',
    period: 'Feb 2024 – Jun 2024 • PBL',
    description:
      'Memimpin tim kasir roti: pembagian tugas, scheduling, testing menyeluruh, dan feedback debugging.',
    longDescription:
      'Belajar non-teknis yang penting: memimpin tim, membagi task di Trello, mengatur jadwal, lalu melakukan pengujian fungsi menyeluruh. Setiap bug saya catat hasil ujinya dan saya teruskan ke developer sebagai umpan balik debugging yang jelas.',
    technologies: ['Java', 'SQLite', 'Trello', 'Manual Testing'],
    swatch: 'bg-cream',
    emoji: '🥐',
  },
  {
    id: 6,
    title: 'Aplikasi Kasir WW',
    role: 'Technical Documentation',
    period: 'Sep 2023 – Jan 2024 • PBL',
    description:
      'Dokumen teknis: user requirement, laporan pengujian, dan laporan akhir proyek sesuai standar stakeholder.',
    longDescription:
      'Proyek pertama saya. Saya memastikan seluruh dokumentasi tersusun rapi dan informatif: kebutuhan pengguna, skenario uji, hasil pengujian, sampai laporan akhir. Fondasi komunikasi teknis dan kerja tim saya.',
    technologies: ['Documentation', 'Testing', 'Figma'],
    swatch: 'bg-cream',
    emoji: '🧾',
  },
];

export const experiences: Experience[] = [
  {
    role: 'AI Course Student',
    org: 'Pijak x IBM SkillsBuild & Dicoding',
    period: 'Feb 2026 – Sekarang',
    tag: 'AI / Generative AI',
    points: [
      'Mempelajari fundamental AI dan implementasi Generative AI untuk produktivitas.',
      'Praktik solusi berbasis AI + AI Ethics untuk teknologi yang bertanggung jawab.',
    ],
  },
  {
    role: 'ML Engineer',
    org: 'Hydrosee: IoT & AI Monitoring System (PBL)',
    period: 'Okt 2025 – Des 2025',
    tag: 'Machine Learning • IoT',
    points: [
      'ESP32-CAM untuk deteksi & pengusiran hama belalang real-time.',
      'Image classification Python, integrasi model ke backend.',
    ],
  },
  {
    role: 'Back-End Web Developer',
    org: 'Website Nganjuk Ekraf (PBL)',
    period: 'Feb 2025 – Mei 2025',
    tag: 'Laravel • MySQL',
    points: [
      'Backend Laravel + MySQL, autentikasi & optimasi performa.',
      'Integrasi fitur–database untuk konten ekraf.',
    ],
  },
  {
    role: 'Back-End Mobile Developer',
    org: 'Aplikasi Klinik DKT (PBL)',
    period: 'Sep 2024 – Jan 2025',
    tag: 'Android • API',
    points: [
      'Backend mobile Java (Android Studio), integrasi API data medis.',
      'Fokus keamanan & efisiensi pertukaran data.',
    ],
  },
  {
    role: 'Project Manager & Tester',
    org: 'Aplikasi Kasir Toko Roti Latanza (PBL)',
    period: 'Feb 2024 – Jun 2024',
    tag: 'Leadership • QA',
    points: ['Bagi tugas & scheduling tim.', 'Testing menyeluruh + feedback debugging.'],
  },
];

export const skills = [
  { name: 'Python (ML)', level: 85 },
  { name: 'Dart (Flutter)', level: 82 },
  { name: 'PHP (Laravel)', level: 80 },
  { name: 'Java', level: 80 },
  { name: 'MySQL', level: 78 },
  { name: 'Android Studio', level: 80 },
  { name: 'C++', level: 65 },
  { name: 'JavaScript', level: 68 },
  { name: 'GitHub', level: 80 },
  { name: 'Figma', level: 75 },
];

export const tools = ['VS Code', 'GitHub', 'Trello', 'Figma', 'Canva', 'Scikit-learn'];

export type Repo = {
  name: string;
  description: string;
  language: string;
  url: string;
};

export const repos: Repo[] = [
  {
    name: 'teman-masak-modeldata',
    description:
      'Klasifikasi & rekomendasi resep multibahasa (ID/EN): hybrid TF-IDF + fine-tuned IndoBERT/BERT dengan neural network classifier dan cosine-similarity recommendation.',
    language: 'Python',
    url: 'https://github.com/anggchr1/teman-masak-modeldata',
  },
  {
    name: 'Membangun-Sistem-Machine-Learning',
    description:
      'Praktik end-to-end membangun sistem ML dengan notebook: eksperimen, training, dan evaluasi model.',
    language: 'Jupyter Notebook',
    url: 'https://github.com/anggchr1/Membangun-Sistem-Machine-Learning',
  },
  {
    name: 'Eksperimen_SML_Muhammad-Angga-Choirul',
    description: 'Eksperimen systematic machine learning: preprocessing, baseline model, dan tuning.',
    language: 'Jupyter Notebook',
    url: 'https://github.com/anggchr1/Eksperimen_SML_Muhammad-Angga-Choirul',
  },
  {
    name: 'flutterbkpm',
    description: 'Latihan dan eksplorasi aplikasi Flutter dengan Dart.',
    language: 'Dart',
    url: 'https://github.com/anggchr1/flutterbkpm',
  },
];

export const navItems = ['home', 'projects', 'demo', 'sertifikat', 'blog', 'layanan', 'komentar', 'contact'];

export const allSections = [
  'home',
  'projects',
  'demo',
  'skills',
  'about',
  'experience',
  'sertifikat',
  'blog',
  'layanan',
  'testimoni',
  'komentar',
  'current',
  'faq',
  'contact',
];

export const roles = ['ML Engineer', 'Flutter Developer', 'Back-End Developer', 'AI Enthusiast'];

// Prefix asset public/ dengan base path Vite (penting untuk GitHub Pages,
// misal repo portfolio -> /portfolio/foto-profil.png). Pakai untuk semua
// file di public/: asset('foto-profil.png').
export const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

export const contact = {
  location: 'Nganjuk, Jawa Timur, Indonesia',
  email: 'anggachoirulll@gmail.com',
  linkedin: 'https://www.linkedin.com/in/muhammad-angga-choirul-a27014331',
  linkedinLabel: 'muhammad-angga-choirul-a27014331',
  github: 'https://github.com/anggchr1',
  githubLabel: 'github.com/anggchr1',
  cvUrl: 'CV-Muhammad-Angga-Choirul.pdf',
};

// Kosongkan (= '') sampai kamu punya Formspree ID gratis.
// Cara isi: daftar di formspree.io → buat form → dapat ID seperti 'abcdwxyz',
// lalu tulis di sini 'https://formspree.io/f/abcdwxyz'. Selama kosong, form
// otomatis membuka aplikasi email pengunjung (mailto), tetap berfungsi.
export const FORMSPREE_ENDPOINT = '';

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
  fileUrl: string;
  fileData?: string;
  highlight?: boolean;
};

export const certificates: Certificate[] = [
  {
    title: 'Membangun Sistem Machine Learning',
    issuer: 'Dicoding • 90 jam • MLOps (MLflow, Docker)',
    date: '07 Jun 2026',
    verifyUrl: 'https://dicoding.com/certificates/JLX1VE60NZ72',
    fileUrl: 'sertifikat/sertifikat_course_713_5453969_070626202822.pdf',
    highlight: true,
  },
  {
    title: 'Belajar Fundamental Deep Learning',
    issuer: 'Dicoding • 110 jam • NLP, CV, Generative AI',
    date: '11 Mei 2026',
    verifyUrl: 'https://dicoding.com/certificates/MRZMWWQ0NPYQ',
    fileUrl: 'sertifikat/sertifikat_course_185_5453969_110526222047.pdf',
    highlight: true,
  },
  {
    title: 'Belajar Machine Learning untuk Pemula',
    issuer: 'Dicoding • 90 jam • Klasifikasi, regresi, clustering',
    date: '30 Mar 2026',
    verifyUrl: 'https://dicoding.com/certificates/EYX4QY315PDL',
    fileUrl: 'sertifikat/sertifikat_course_184_5453969_300326082319.pdf',
    highlight: true,
  },
  {
    title: 'Belajar Dasar AI',
    issuer: 'Dicoding • 10 jam',
    date: '10 Feb 2026',
    verifyUrl: 'https://dicoding.com/certificates/ERZRL90R2ZYV',
    fileUrl: 'sertifikat/sertifikat_course_653_5453969_100226231319.pdf',
  },
  {
    title: 'Memulai Pemrograman dengan Python',
    issuer: 'Dicoding • 60 jam',
    date: '24 Feb 2026',
    verifyUrl: 'https://dicoding.com/certificates/QLZ99K1N7Z5D',
    fileUrl: 'sertifikat/sertifikat_course_86_5453969_240226210951.pdf',
  },
  {
    title: 'Belajar Dasar Git dengan GitHub',
    issuer: 'Dicoding • 15 jam',
    date: '24 Jan 2026',
    verifyUrl: 'https://dicoding.com/certificates/6RPNGM4W9Z2M',
    fileUrl: 'sertifikat/sertifikat_course_317_5453969_050226211454.pdf',
  },
  {
    title: 'Pengenalan ke Logika Pemrograman',
    issuer: 'Dicoding • 6 jam',
    date: '24 Jan 2026',
    verifyUrl: 'https://dicoding.com/certificates/EYX4KDY66PDL',
    fileUrl: 'sertifikat/sertifikat_course_302_5453969_050226211311.pdf',
  },
  {
    title: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
    issuer: 'Dicoding • 9 jam • Nilai 91',
    date: '20 Jan 2026',
    verifyUrl: 'https://dicoding.com/certificates/JLX15NWLNZ72',
    fileUrl: 'sertifikat/sertifikat_course_237_5453969_050226211137.pdf',
  },
  {
    title: 'Sertifikat Lulus Penuh Pijak 2026',
    issuer: 'Pijak in Collaboration with IBM SkillsBuild & Dicoding',
    date: '2026',
    fileUrl: 'sertifikat/[PIJAK] Sertifikat Lulus Penuh - Muhammad Angga Choirul.pdf',
    highlight: true,
  },
  {
    title: 'Transkrip Akhir Pijak 2026',
    issuer: 'Pijak • APC129D6Y0524',
    date: '2026',
    fileUrl: 'sertifikat/Pijak - Transkrip Akhir - Muhammad Angga Choirul - APC129D6Y0524.pdf',
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  context: string;
  placeholder?: boolean;
};

// TODO: ganti kutipan contoh di bawah dengan testimoni asli (dosen/rekan PBL)
// sebelum portfolio dipublikasikan ke umum.
export const testimonials: Testimonial[] = [
  {
    quote:
      'Angga rapi dalam dokumentasi dan selalu menyelesaikan bagiannya tepat waktu selama proyek klinik.',
    name: 'Contoh: Rekan PBL Klinik DKT',
    context: 'Ganti dengan testimoni asli',
    placeholder: true,
  },
  {
    quote:
      'Waktu mimpin tim kasir, pembagian tugasnya jelas dan hasil testing-nya terdokumentasi dengan baik.',
    name: 'Contoh: Rekan PBL Kasir Latanza',
    context: 'Ganti dengan testimoni asli',
    placeholder: true,
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: string[];
};

export const posts: Post[] = [
  {
    slug: 'smote-data-tidak-seimbang',
    title: 'Data Tidak Seimbang? Kenalan dengan SMOTE',
    date: 'Agu 2026',
    excerpt:
      'Kasus positif cuma <10% dari dataset? Model jadi malas dan selalu menebak kelas mayoritas. Ini catatan saya tentang cara kerja SMOTE secara intuitif.',
    tags: ['Machine Learning', 'Data'],
    body: [
      'Masalah klasik di klasifikasi medis: data pasien berisiko (kelas minoritas) jauh lebih sedikit daripada data pasien sehat. Kalau model dilatih apa adanya, ia bisa dapat akurasi 90% hanya dengan selalu menebak "sehat", angka yang menipu.',
      'SMOTE (Synthetic Minority Oversampling Technique) mengatasi ini bukan dengan menduplikasi data, melainkan menciptakan titik data sintetis baru di antara sampel minoritas yang berdekatan. Hasilnya: batas keputusan model jadi lebih adil dan tidak condong ke kelas mayoritas.',
      'Pelajaran terbesar saya: jangan pernah menilai model imbalance hanya dari akurasi. Selalu lihat precision, recall, dan F1-score per kelas. Di situlah kebenaran performa model terlihat.',
    ],
  },
  {
    slug: 'flutter-rest-api-klinik',
    title: 'Menghubungkan Flutter ke REST API: Pelajaran dari Aplikasi Klinik',
    date: 'Jan 2025',
    excerpt:
      'Data medis harus tersinkron dinamis, aman, dan efisien. Tiga hal yang saya pelajari saat membangun layer network aplikasi klinik.',
    tags: ['Flutter', 'Backend'],
    body: [
      'Di proyek klinik, tugas saya adalah memastikan data pasien, jadwal, dan rekam medis mengalir dengan benar antara aplikasi dan server. Tantangannya bukan sekadar "bisa GET data", tapi menangani loading, error jaringan, dan validasi input.',
      'Pelajaran pertama: pisahkan layer network dari UI sejak awal. Ketika endpoint berubah, yang diperbaiki cuma satu tempat. Pelajaran kedua: jangan pernah percaya input. Validasi di client dan di server.',
      'Pelajaran ketiga, yang paling penting untuk data sensitif seperti rekam medis: pikirkan keamanan sejak desain struktur data, bukan ditempel belakangan.',
    ],
  },
  {
    slug: 'dari-dokumentasi-ke-ml-engineer',
    title: 'Dari Dokumentasi sampai ML Engineer: 5 PBL, 5 Peran Berbeda',
    date: 'Jun 2026',
    excerpt:
      'Setiap semester PBL saya pegang peran berbeda, dokumentasi, PM/QA, backend mobile, backend web, ML engineer. Ternyata itu jalur belajar yang bagus.',
    tags: ['Karier', 'Refleksi'],
    body: [
      'Semester awal saya kebagian dokumentasi teknis. Waktu itu terasa "kurang ngoding", tapi ternyata kemampuan menulis requirement dan laporan uji adalah fondasi komunikasi teknis yang kepakai di semua proyek berikutnya.',
      'Lalu saya memimpin tim sebagai PM sekaligus tester. Di sini saya belajar bahwa bug yang dilaporkan dengan jelas (langkah reproduksi + hasil yang diharapkan) menghemat waktu debugging berkali-kali lipat.',
      'Dua PBL backend (klinik dan ekraf) mengajarkan saya cara berpikir soal data: struktur, relasi, autentikasi, performa query. Dan PBL Hydrosee mempertemukan semuanya dengan machine learning.',
      'Saran saya untuk adik tingkat: jangan menolak peran non-coding. Cara kamu memahami proyek dari sisi dokumentasi dan manajemen akan membuat kodemu lebih baik.',
    ],
  },
];

export type Service = {
  title: string;
  desc: string;
  points: string[];
};

export const services: Service[] = [
  {
    title: 'Prototype Machine Learning',
    desc: 'Eksperimen klasifikasi pada data tabular sampai jadi notebook + ringkasan hasil yang rapi.',
    points: ['Preprocessing & baseline model', 'Evaluasi jujur (bukan sekadar akurasi)', 'Notebook + laporan singkat'],
  },
  {
    title: 'Aplikasi Flutter',
    desc: 'Aplikasi mobile Dart dengan UI rapi yang terhubung ke REST API.',
    points: ['UI responsif & reusable widget', 'Integrasi API + autentikasi', 'Siap rilis internal / demo'],
  },
  {
    title: 'Backend & API',
    desc: 'Server Laravel/MySQL atau backend mobile yang aman dan terdokumentasi.',
    points: ['Desain database & relasi', 'Autentikasi pengguna', 'Optimasi query dasar'],
  },
];

export const faqs = [
  {
    q: 'Apakah menerima freelance / kolaborasi?',
    a: 'Ya, untuk proyek prototype ML, aplikasi Flutter, dan backend. Ceritakan kebutuhanmu lewat form kontak atau email, saya balas secepatnya.',
  },
  {
    q: 'Bagaimana cara menghubungi yang paling cepat?',
    a: 'Email ke anggachoirulll@gmail.com atau pesan via LinkedIn. Form di halaman ini juga bisa dipakai.',
  },
  {
    q: 'Apakah kode proyek PBL bisa dilihat?',
    a: 'Sebagian repo pembelajaran saya publik di github.com/anggchr1 (misalnya eksperimen ML dan Flutter). Kode proyek PBL kampus mengikuti aturan tim dan kampus.',
  },
  {
    q: 'Fokus utama saat ini apa?',
    a: 'Menyelesaikan skripsi ensemble SVM + KNN untuk klasifikasi gula darah, sambil memperdalam Flutter dan MLOps.',
  },
  {
    q: 'Bersedia kerja remote?',
    a: 'Bersedia, selama komunikasi jelas (jadwal, deliverable, dan kanal diskusi disepakati di awal).',
  },
];

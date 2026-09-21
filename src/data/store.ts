import { useEffect, useState } from 'react';

export type Comment = {
  id: string;
  name: string;
  message: string;
  at: number;
};

// Username admin. Password TIDAK disimpan di sini, yang disimpan hanya
// hash-nya, jadi password asli tidak bisa dibaca dari View Source.
// Ganti password: minta hash baru ke saya (atau hitung cyrb53 dari
// 'angga-admin::' + password barumu), lalu ganti ADMIN_PASS_HASH.
// Catatan jujur: ini menghentikan pembaca iseng, bukan peretas serius,
// karena flag login tetap bisa ditulis manual via console. Untungnya
// situs ini tanpa server: admin hanya mengubah localStorage di browser
// masing-masing, jadi tidak ada data pengunjung lain yang bisa dirusak.
export const ADMIN_USER = 'admin';
const ADMIN_PASS_HASH = '12c0a99a4a1f7';

function cyrb53(str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

export function checkPass(pass: string) {
  return cyrb53('angga-admin::' + pass) === ADMIN_PASS_HASH;
}

export function isAuthed() {
  try {
    return sessionStorage.getItem('angga-admin') === '1';
  } catch {
    return false;
  }
}

export function setAuthed(v: boolean) {
  try {
    if (v) sessionStorage.setItem('angga-admin', '1');
    else sessionStorage.removeItem('angga-admin');
  } catch {
    /* abaikan */
  }
}

export const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

// Hook penyimpanan lokal: baca sekali, tulis tiap ada perubahan.
// Data tersimpan di browser pengunjung (localStorage), jadi tanpa backend.
export function useLocal<T>(key: string, seed: T) {
  const [value, setValue] = useState<T>(() => read<T>(key) ?? seed);

  useEffect(() => {
    if (read(key) === null) {
      try {
        localStorage.setItem(key, JSON.stringify(seed));
      } catch {
        /* abaikan */
      }
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setValue(read<T>(key) ?? seed);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  const save = (next: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const v = typeof next === 'function' ? (next as (prev: T) => T)(prev) : next;
      try {
        localStorage.setItem(key, JSON.stringify(v));
      } catch {
        /* abaikan */
      }
      return v;
    });
  };

  return [value, save] as const;
}

export const fmtDate = (at: number) => {
  try {
    return new Date(at).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
};

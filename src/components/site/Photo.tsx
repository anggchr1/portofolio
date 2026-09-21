import { useState } from 'react';

// Foto dengan fallback inisial kalau file belum dipasang.
// Simpan fotomu di folder public/, misal public/foto-profil.jpg
export default function Photo({
  src,
  alt,
  className,
  fallbackClassName,
  fallbackText,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  fallbackText?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={fallbackClassName ?? className} role="img" aria-label={alt}>
        {fallbackText ?? 'AC'}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

'use client';
import { useState, useEffect } from 'react';

export default function SaleBanner() {
  const [banner, setBanner] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (!data.banner?.enabled) return;
        // Check if expired
        if (data.banner.expiresAt && new Date(data.banner.expiresAt) < new Date()) return;
        setBanner(data.banner);
      })
      .catch(() => {});
  }, []);

  if (!banner || dismissed) return null;

  return (
    <div
      style={{ background: banner.bgColor || '#FF2200', color: banner.textColor || '#080808' }}
      className="fixed top-14 left-0 right-0 z-40 flex items-center justify-between px-6 py-2"
    >
      <div className="flex-1 text-center">
        <span className="font-display text-base tracking-widest">{banner.text}</span>
        {banner.subtext && (
          <span className="font-mono text-[11px] ml-4 opacity-70">{banner.subtext}</span>
        )}
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="font-mono text-xs opacity-60 hover:opacity-100 transition-opacity ml-4 flex-shrink-0"
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  );
}

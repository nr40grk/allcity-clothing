'use client';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

const PAGES = [
  { slug: 'imprint', en: 'Legal Notice', el: 'Νομικές Πληροφορίες' },
  { slug: 'terms', en: 'Terms of Service', el: 'Όροι Χρήσης' },
  { slug: 'privacy-policy', en: 'Privacy Policy', el: 'Πολιτική Απορρήτου' },
  { slug: 'cookies', en: 'Cookie Policy', el: 'Πολιτική Cookies' },
  { slug: 'returns', en: 'Returns & Refunds', el: 'Επιστροφές & Επιστροφές Χρημάτων' },
];

export default function LegalLayout({ title, lastUpdated, children }) {
  const { lang } = useLanguage();
  return (
    <div className="pt-20">
      <div className="px-6 pt-16 pb-10 border-b border-[#1a1a1a] max-w-[1400px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#FF2200]/60 mb-4">
          {lang === 'el' ? 'Νομικά' : 'Legal'}
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-[#F0EDE8] tracking-tight leading-none whitespace-pre-line">
          {title}
        </h1>
        {lastUpdated && (
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/30 mt-6">
            {lang === 'el' ? 'Τελευταία ενημέρωση' : 'Last updated'}: {lastUpdated}
          </p>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-14 grid md:grid-cols-[220px_1fr] gap-12 lg:gap-20">
        {/* Sidebar nav */}
        <aside className="md:sticky md:top-28 self-start">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 mb-4">
            {lang === 'el' ? 'Νομικά Έγγραφα' : 'Legal Documents'}
          </p>
          <nav className="flex flex-col gap-3 border-l border-[#1a1a1a] pl-4">
            {PAGES.map(p => (
              <Link
                key={p.slug}
                href={`/legal/${p.slug}`}
                className="font-mono text-xs text-[#F0EDE8]/50 hover:text-[#FF2200] transition-colors"
              >
                {lang === 'el' ? p.el : p.en}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <article className="max-w-[760px] font-mono text-sm text-[#F0EDE8]/70 leading-relaxed legal-body">
          {children}
        </article>
      </div>

      <style jsx global>{`
        .legal-body h2 {
          font-family: var(--font-display, 'PP Neue Machina', sans-serif);
          font-size: 1.75rem;
          letter-spacing: 0.02em;
          color: #FF2200;
          text-transform: uppercase;
          margin: 3rem 0 1.25rem;
          line-height: 1.1;
        }
        .legal-body h2:first-child { margin-top: 0; }
        .legal-body h3 {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          color: rgba(240, 237, 232, 0.5);
          text-transform: uppercase;
          margin: 2rem 0 0.75rem;
        }
        .legal-body p { margin: 0 0 1rem; }
        .legal-body ul, .legal-body ol {
          margin: 0 0 1.25rem;
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .legal-body li { color: rgba(240, 237, 232, 0.6); }
        .legal-body li::marker { color: #FF2200; }
        .legal-body a { color: #FF2200; text-decoration: none; border-bottom: 1px solid rgba(255, 34, 0, 0.3); transition: border-color .15s; }
        .legal-body a:hover { border-color: #FF2200; }
        .legal-body strong { color: #F0EDE8; font-weight: 500; }
        .legal-body .callout {
          border: 1px solid #1a1a1a;
          background: #0d0d0d;
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
          font-size: 0.8rem;
          color: rgba(240, 237, 232, 0.55);
        }
        .legal-body .callout-red {
          border-color: rgba(255, 34, 0, 0.4);
          background: rgba(255, 34, 0, 0.04);
        }
        .legal-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0 1.5rem;
          font-size: 0.78rem;
        }
        .legal-body th, .legal-body td {
          border: 1px solid #1a1a1a;
          padding: 0.75rem 1rem;
          text-align: left;
          vertical-align: top;
        }
        .legal-body th {
          color: rgba(240, 237, 232, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.7rem;
          background: #0d0d0d;
        }
      `}</style>
    </div>
  );
}

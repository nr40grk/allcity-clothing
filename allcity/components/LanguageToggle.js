'use client';
import { useLanguage } from './LanguageProvider';
export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-1 border border-[#1a1a1a] overflow-hidden">
      {['en', 'el'].map(l => (
        <button key={l} onClick={() => setLang(l)}
          className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 transition-colors ${lang === l ? 'bg-[#FF2200] text-[#080808]' : 'text-[#F0EDE8]/30 hover:text-[#F0EDE8]/60'}`}>
          {l === 'en' ? 'EN' : 'GR'}
        </button>
      ))}
    </div>
  );
}

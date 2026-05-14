'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useT } from './LanguageProvider';

export default function Footer() {
  const t = useT();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // '' | 'loading' | 'success' | 'error' | 'exists'

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) { setStatus('success'); setEmail(''); }
      else if (data.message === 'Already subscribed.') setStatus('exists');
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  return (
    <footer className="border-t border-[#1a1a1a] mt-24">
      <div className="border-b border-[#1a1a1a] py-10 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="font-mono text-xs uppercase tracking-widest text-[#F0EDE8]/50">{t('footer.subscribe')}</p>
          <div className="w-full max-w-sm">
            <form onSubmit={handleSubscribe} className="flex gap-0">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 bg-[#1a1a1a] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20 disabled:opacity-40"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="bg-[#FF2200] text-[#080808] font-mono text-xs uppercase tracking-widest px-5 py-3 hover:bg-[#F0EDE8] transition-colors disabled:opacity-40"
              >
                {status === 'loading' ? '...' : '→'}
              </button>
            </form>
            {status === 'success' && <p className="font-mono text-[11px] text-[#FF2200] mt-2 uppercase tracking-widest">You're in. Welcome to the crew.</p>}
            {status === 'exists' && <p className="font-mono text-[11px] text-[#F0EDE8]/30 mt-2 uppercase tracking-widest">Already subscribed.</p>}
            {status === 'error' && <p className="font-mono text-[11px] text-[#FF2200]/60 mt-2 uppercase tracking-widest">Something went wrong. Try again.</p>}
          </div>
        </div>
      </div>

      <div className="py-8 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Left — contact */}
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[11px] text-[#F0EDE8]/40 uppercase tracking-widest">{t('footer.storeLocation')}</p>
            <a href="https://www.instagram.com/allcity_clothing" target="_blank" rel="noreferrer" className="font-mono text-xs text-[#F0EDE8]/70 hover:text-[#FF2200] transition-colors">@allcity_clothing</a>
            <a href="mailto:allcityclo@gmail.com" className="font-mono text-xs text-[#F0EDE8]/70 hover:text-[#FF2200] transition-colors">allcityclo@gmail.com</a>
            <div className="flex items-center gap-5 mt-2">
              <a href="https://www.instagram.com/allcity_clothing" target="_blank" rel="noreferrer" className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 hover:text-[#FF2200] transition-colors">Instagram</a>
              <Link href="/shipping" className="font-mono text-[11px] uppercase tracking-widest text-[#F0EDE8]/40 hover:text-[#FF2200] transition-colors">{t('nav.shipping')}</Link>
            </div>
          </div>

          {/* Center — dev terminal */}
          <div style={{ border:'1px solid #222', padding:'16px 20px', fontFamily:'"Courier New",Courier,monospace', backgroundColor:'#0a0a0a', minWidth:'240px' }}>
            <p style={{ color:'rgba(255,34,0,0.4)', fontSize:'10px', letterSpacing:'.15em', textTransform:'uppercase', margin:'0 0 8px' }}>build.info</p>
            <div style={{ borderTop:'1px solid #1a1a1a', paddingTop:'10px', display:'flex', flexDirection:'column', gap:'5px' }}>
              <p style={{ color:'rgba(240,237,232,0.25)', fontSize:'12px', margin:0 }}>
                <span style={{ color:'#FF2200' }}>$</span> whoami
              </p>
              <p style={{ margin:0, fontSize:'12px' }}>
                <span style={{ color:'rgba(240,237,232,0.25)' }}>&gt; </span>
                <a href="https://nik.helpmarq.com/" target="_blank" rel="noopener"
                  style={{ color:'rgba(240,237,232,0.65)', textDecoration:'none', transition:'color .18s, border-color .18s', borderBottom:'1px solid transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.color='#FF2200'; e.currentTarget.style.borderColor='#FF2200'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='rgba(240,237,232,0.65)'; e.currentTarget.style.borderColor='transparent'; }}>
                  Nikolas Sapalidis
                </a>
              </p>
              <p style={{ color:'rgba(240,237,232,0.15)', fontSize:'11px', margin:'2px 0 0' }}>// developed this site</p>
            </div>
          </div>

          {/* Right — payment + copyright */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              {['VISA','MC','AMEX','GPAY'].map(c => <span key={c} className="font-mono text-[9px] border border-[#333] px-2 py-1 text-[#F0EDE8]/30">{c}</span>)}
            </div>
            <p className="font-mono text-[11px] text-[#F0EDE8]/20">© {new Date().getFullYear()}, ALLCITY</p>
          </div>

        </div>
      </div>
    </footer>
  );
}

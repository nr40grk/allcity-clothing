'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  async function handleLogin(e) {
    e.preventDefault(); setError('');
    const res = await fetch('/api/admin', { headers: { 'x-admin-token': password } });
    if (res.ok) { sessionStorage.setItem('admin_token', password); router.push('/admin/products'); }
    else setError('Wrong password.');
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808]">
      <div className="w-full max-w-sm px-6">
        <h1 className="font-display text-5xl text-[#F0EDE8] mb-2 tracking-tight">ADMIN</h1>
        <p className="font-mono text-xs text-[#F0EDE8]/30 mb-10 uppercase tracking-widest">Allcity Panel</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} autoFocus className="bg-[#111] border border-[#333] text-[#F0EDE8] font-mono text-xs px-4 py-3 outline-none focus:border-[#FF2200] transition-colors placeholder-[#F0EDE8]/20" />
          {error && <p className="font-mono text-xs text-[#FF2200]">{error}</p>}
          <button type="submit" className="font-mono text-xs uppercase tracking-widest bg-[#F0EDE8] text-[#080808] py-3 hover:bg-[#FF2200] transition-colors">Enter →</button>
        </form>
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const STATUS_COLORS = {
  pending: { bg: '#FF8800', text: '#080808' },
  shipped: { bg: '#FF2200', text: '#080808' },
  fulfilled: { bg: '#22c55e', text: '#080808' },
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function AdminSales() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const t = sessionStorage.getItem('admin_token');
    if (!t) { router.push('/admin'); return; }
    setToken(t);
  }, [router]);

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const res = await fetch('/api/orders', { headers: { 'x-admin-token': token } });
    if (res.status === 401) { router.push('/admin'); return; }
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  }, [token, router]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  function flash(text) { setMsg(text); setTimeout(() => setMsg(''), 3000); }

  async function updateStatus(id, status) {
    const res = await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      flash('Status updated.');
    }
  }

  const pending = orders.filter(o => o.status === 'pending');
  const shipped = orders.filter(o => o.status === 'shipped');
  const fulfilled = orders.filter(o => o.status === 'fulfilled');

  return (
    <div className="min-h-screen bg-[#080808] pt-20 px-6 pb-20">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl text-[#F0EDE8] tracking-tight">ADMIN PANEL</h1>
            <p className="font-mono text-[11px] text-[#F0EDE8]/30 uppercase tracking-widest mt-1">Sales & Orders</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/products" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors">Products</Link>
            <Link href="/admin/settings" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors">Settings</Link>
            <Link href="/admin/emails" className="font-mono text-xs uppercase tracking-widest border border-[#333] text-[#F0EDE8]/50 px-4 py-2 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors">Emails</Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[['Pending', pending.length, '#FF8800'], ['Shipped', shipped.length, '#FF2200'], ['Fulfilled', fulfilled.length, '#22c55e']].map(([label, count, color]) => (
            <div key={label} className="border border-[#1a1a1a] p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/30 mb-1">{label}</p>
              <p className="font-display text-4xl tracking-tight" style={{ color }}>{count}</p>
            </div>
          ))}
        </div>

        {msg && <div className="mb-6 font-mono text-xs text-[#F0EDE8]/70 border border-[#333] px-4 py-3">{msg}</div>}

        {loading ? (
          <p className="font-mono text-xs text-[#F0EDE8]/30">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="font-mono text-xs text-[#F0EDE8]/20">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {orders.map(order => {
              const sc = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
              const isOpen = expanded === order.id;
              return (
                <div key={order.id} className="border border-[#1a1a1a] hover:border-[#333] transition-colors">
                  <div
                    className="flex items-center gap-4 px-4 py-3 cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : order.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-[#F0EDE8]/80">{order.name}</p>
                      <p className="font-mono text-[11px] text-[#F0EDE8]/30">{order.email} · {formatDate(order.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-mono text-xs text-[#F0EDE8]/60">
                        \u20ac{order.total?.toFixed(2)}
                      </span>
                      <span
                        className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5"
                        style={{ background: sc.bg, color: sc.text }}
                      >
                        {order.status}
                      </span>
                      <span className="font-mono text-[11px] text-[#F0EDE8]/20">{isOpen ? '\u25b4' : '\u25be'}</span>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-[#1a1a1a] px-4 py-4 bg-[#0d0d0d] flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/30 mb-2">Customer</p>
                          <p className="font-mono text-xs text-[#F0EDE8]/70">{order.name}</p>
                          <p className="font-mono text-xs text-[#F0EDE8]/50">{order.email}</p>
                          <p className="font-mono text-xs text-[#F0EDE8]/50">{order.phone}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/30 mb-2">Delivery</p>
                          <p className="font-mono text-xs text-[#F0EDE8]/70 uppercase">{order.deliveryMethod === 'boxnow' ? 'BoxNow Locker' : 'Home Delivery'}</p>
                          {order.deliveryMethod !== 'boxnow' && (
                            <p className="font-mono text-xs text-[#F0EDE8]/50">{order.address}, {order.city} {order.postalCode}</p>
                          )}
                          {order.deliveryMethod === 'boxnow' && order.boxnowAddress && (
                            <p className="font-mono text-xs text-[#F0EDE8]/50">{order.boxnowAddress}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/30 mb-2">Items</p>
                        {(order.items || []).map((item, i) => (
                          <div key={i} className="flex justify-between font-mono text-xs text-[#F0EDE8]/60 mb-1">
                            <span>{item.name} — {item.size} x{item.qty}</span>
                            <span>\u20ac{(item.price * item.qty).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-mono text-xs text-[#F0EDE8]/80 border-t border-[#1a1a1a] pt-2 mt-2">
                          <span>Total</span>
                          <span>\u20ac{order.total?.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-[#1a1a1a]">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-[#F0EDE8]/30 self-center mr-2">Mark as:</p>
                        {['pending', 'shipped', 'fulfilled'].map(s => (
                          <button
                            key={s}
                            onClick={() => updateStatus(order.id, s)}
                            disabled={order.status === s}
                            className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 border border-[#333] text-[#F0EDE8]/40 hover:border-[#FF2200] hover:text-[#FF2200] transition-colors disabled:opacity-20 disabled:cursor-default"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { offers } from '../data/offersData';
import { useCart } from '../hooks/useCart';
import { Copy, Check } from 'lucide-react';

const Offers = () => {
  const { applyCoupon, cartSubtotal, appliedCoupon } = useCart();
  const [copiedId, setCopiedId] = useState(null);
  const [message, setMessage] = useState('Select a coupon to apply during checkout.');

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApply = (code) => {
    const response = applyCoupon(code);
    setMessage(response.success ? response.message : response.message);
  };

  return (
    <main className="space-y-12 pb-24 pt-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Offers</p>
            <h1 className="mt-4 text-5xl font-black text-slate-900">Unlock savings on your next order.</h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">Choose from exclusive promos designed for Rhino Flame guests. Minimum order requirements are clearly shown for each offer.</p>
          </div>
          <div className="rounded-[2rem] bg-slate-50 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Cart total</p>
            <p className="mt-4 text-4xl font-black text-slate-900">₹{cartSubtotal}</p>
            <p className="mt-3 text-sm text-slate-600">Applied coupon: {appliedCoupon || 'None'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {offers.map((offer) => (
          <article key={offer.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="text-4xl">{offer.icon}</div>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-orange-500">{offer.title}</p>
            <h2 className="mt-3 text-2xl font-black text-slate-900">{offer.code}</h2>
            <p className="mt-3 text-slate-600">{offer.description}</p>
            <div className="mt-5 text-sm text-slate-500">
              <p>Min order: ₹{offer.minOrder}</p>
              <p>Max discount: ₹{offer.maxDiscount}</p>
              <p>Expires: {offer.expiry}</p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button onClick={() => handleApply(offer.code)} className="rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110">
                Apply
              </button>
              <button onClick={() => handleCopyCode(offer.code, offer.id)} className="rounded-3xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                {copiedId === offer.id ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </article>
        ))}
      </section>

      <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-slate-700">
        <p>{message}</p>
      </div>
    </main>
  );
};

export default Offers;

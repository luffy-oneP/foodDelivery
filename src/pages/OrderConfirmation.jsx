import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const statusSteps = ['Order placed', 'Preparing', 'Out for delivery', 'Delivered'];

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { orderComplete, lastOrder, resetOrder } = useCart();

  useEffect(() => {
    if (!orderComplete || !lastOrder) {
      navigate('/menu', { replace: true });
    }
  }, [lastOrder, navigate, orderComplete]);

  if (!lastOrder) {
    return null;
  }

  return (
    <main className="pb-24 pt-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Order Confirmation</p>
            <h1 className="mt-4 text-5xl font-black text-slate-900">Your order is on the way.</h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">Thank you for ordering from Rhino Flame. Your food prep has started and delivery is being arranged.</p>
          </div>
          <div className="rounded-[2rem] bg-slate-50 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Order ID</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{lastOrder.id}</p>
            <p className="mt-4 text-sm text-slate-600">Estimated delivery in 30-40 minutes.</p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Order progress</h2>
          <div className="mt-6 space-y-4">
            {statusSteps.map((step, index) => {
              const active = index === 1;
              return (
                <div key={step} className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${index <= 1 ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{step}</p>
                    <p className="text-sm text-slate-500">{index === 1 ? 'Your meal is being prepared by the kitchen team.' : 'Estimated arrival is in progress.'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="rounded-[2rem] bg-slate-50 p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Order summary</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            {lastOrder.items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 border-b border-slate-200 pb-3">
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  {item.customization && Object.keys(item.customization).length > 0 && (
                    <p className="text-xs text-slate-500">Customization: {Object.values(item.customization).join(', ')}</p>
                  )}
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
            <div className="border-t border-slate-200 pt-4">
              <div className="flex justify-between text-sm text-slate-600"><span>Subtotal</span><span>₹{lastOrder.subtotal}</span></div>
              <div className="flex justify-between text-sm text-slate-600"><span>Tax</span><span>₹{lastOrder.tax}</span></div>
              <div className="flex justify-between text-sm text-slate-600"><span>Delivery</span><span>₹{lastOrder.deliveryFee}</span></div>
              <div className="flex justify-between text-sm text-emerald-600"><span>Discount</span><span>-₹{lastOrder.discount}</span></div>
              <div className="mt-4 flex justify-between text-base font-bold text-slate-900"><span>Total</span><span>₹{lastOrder.total}</span></div>
            </div>
          </div>
          <button onClick={() => { resetOrder(); navigate('/'); }} className="mt-8 w-full rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:brightness-110">
            Back to Home
          </button>
        </aside>
      </section>
    </main>
  );
};

export default OrderConfirmation;

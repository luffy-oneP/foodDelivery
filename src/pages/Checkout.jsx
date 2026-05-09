import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartSubtotal,
    taxAmount,
    deliveryFee,
    discountAmount,
    totalAmount,
    updateQuantity,
    removeFromCart,
    appliedCoupon,
    applyCoupon,
    customerInfo,
    setCustomerInfo,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/menu', { replace: true });
    }
  }, [cart.length, navigate]);

  const handleCoupon = () => {
    const response = applyCoupon(couponCode);
    setFeedback(response.message);
  };

  const handleContinue = (event) => {
    event.preventDefault();
    if (!customerInfo.name || !customerInfo.address || !customerInfo.phone) {
      setFeedback('Please fill in your delivery details first.');
      return;
    }
    navigate('/payment');
  };

  return (
    <main className="pb-24 pt-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.9fr] xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Checkout</p>
            <h1 className="mt-4 text-5xl font-black text-slate-900">Review your order</h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">Confirm delivery details and apply a coupon before payment.</p>
          </div>

          <div className="rounded-[2rem] bg-slate-50 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Need help?</p>
            <p className="mt-4 text-slate-600">We can reserve your favorite dishes for pickup or delivery. Contact us for group orders.</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Cart Summary</h2>
          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-200 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-3xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm">−</button>
                    <span className="min-w-[2rem] text-center font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-3xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-sm font-semibold text-red-600 hover:text-red-700">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">Delivery Details</h2>
            <form className="space-y-4" onSubmit={handleContinue}>
              <input
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                placeholder="Full name"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
              <input
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                placeholder="Phone number"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
              <input
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                placeholder="Delivery address"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
                <button type="button" onClick={handleCoupon} className="rounded-3xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
                  Apply Coupon
                </button>
              </div>
              <button type="submit" className="w-full rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4 text-sm font-semibold text-white transition hover:brightness-110">
                Continue to Payment
              </button>
            </form>
            {feedback && <p className="mt-4 text-sm text-slate-600">{feedback}</p>}
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">Order Summary</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{cartSubtotal}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>₹{taxAmount}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>₹{deliveryFee}</span></div>
              {discountAmount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-₹{discountAmount}</span></div>}
              <div className="border-t border-slate-200 pt-4 flex justify-between font-bold text-slate-900"><span>Total</span><span>₹{totalAmount}</span></div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Checkout;

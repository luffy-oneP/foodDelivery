import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const paymentMethods = [
  { id: 'esewa', label: 'eSewa', description: 'Nepal’s popular mobile wallet.' },
  { id: 'khalti', label: 'Khalti', description: 'Secure digital payments.' },
  { id: 'imepayme', label: 'IME Pay', description: 'Fast wallet transfers.' },
  { id: 'connectips', label: 'ConnectIPS', description: 'Bank-level payment gateway.' },
  { id: 'cod', label: 'Cash on Delivery', description: 'Pay once your order arrives.' },
];

const Payment = () => {
  const navigate = useNavigate();
  const { cart, customerInfo, paymentMethod, setPaymentMethod, completeOrder, orderComplete } = useCart();

  useEffect(() => {
    if (orderComplete) {
      navigate('/order-confirmation', { replace: true });
      return;
    }

    if (cart.length === 0 || customerInfo.name === '') {
      navigate('/checkout', { replace: true });
    }
  }, [cart.length, customerInfo.name, navigate, orderComplete]);

  const handlePay = () => {
    const orderReference = completeOrder();
    if (orderReference) {
      navigate('/order-confirmation');
    }
  };

  return (
    <main className="pb-24 pt-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Payment</p>
            <h1 className="mt-4 text-5xl font-black text-slate-900">Choose your payment method.</h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">Select the best payment option for you and finalize your order securely.</p>
          </div>
          <div className="rounded-[2rem] bg-slate-50 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Delivery contact</p>
            <p className="mt-4 text-slate-700">{customerInfo.name || 'Name pending'}</p>
            <p className="text-slate-500">{customerInfo.phone || 'Phone pending'}</p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Payment methods</h2>
          <div className="mt-6 space-y-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full rounded-3xl border px-6 py-5 text-left transition ${
                  paymentMethod === method.id ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <p className="text-lg font-semibold text-slate-900">{method.label}</p>
                <p className="mt-2 text-sm text-slate-600">{method.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Ready to place your order?</h2>
          <p className="mt-4 text-slate-600">Confirm payment and finalize your order. A tracking summary will appear on the next screen.</p>
          <button onClick={handlePay} className="mt-8 w-full rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:brightness-110">
            Confirm Payment
          </button>
        </div>
      </section>
    </main>
  );
};

export default Payment;

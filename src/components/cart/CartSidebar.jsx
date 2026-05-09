import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { ShoppingCart, Trash2 } from 'lucide-react';

const CartSidebar = () => {
  const {
    cart,
    cartItems,
    cartSubtotal,
    taxAmount,
    deliveryFee,
    discountAmount,
    totalAmount,
    updateQuantity,
    removeFromCart,
  } = useCart();

  return (
    <aside className="hidden xl:block fixed right-0 top-24 w-96 h-[calc(100vh-7rem)] overflow-y-auto border-l border-slate-200 bg-white/95 backdrop-blur py-6 px-5">
      <div className="sticky top-0 bg-white/95 pb-4 mb-4 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-red-600 text-white rounded-2xl p-3"><ShoppingCart size={20} /></span>
          <div>
            <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Your Cart</p>
            <p className="text-xl font-black text-slate-900">{cartItems} item{cartItems !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-slate-600">Your cart is empty. Add a dish from the menu to get started.</p>
          <Link to="/menu" className="inline-flex mt-4 items-center justify-center rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition">
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="rounded-3xl border border-slate-200 p-4 bg-slate-50">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">₹{item.price} × {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-500 hover:text-red-600 transition">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:bg-slate-100 transition">−</button>
                <span className="min-w-[2rem] text-center font-semibold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:bg-slate-100 transition">+</button>
              </div>
            </div>
          ))}

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 space-y-3">
            <div className="flex justify-between text-sm text-slate-600"><span>Subtotal</span><span>₹{cartSubtotal}</span></div>
            <div className="flex justify-between text-sm text-slate-600"><span>Tax</span><span>₹{taxAmount}</span></div>
            <div className="flex justify-between text-sm text-slate-600"><span>Delivery</span><span>₹{deliveryFee}</span></div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm text-emerald-600"><span>Discount</span><span>-₹{discountAmount}</span></div>
            )}
            <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-slate-900">
              <span>Total</span><span>₹{totalAmount}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="block rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-4 text-center font-semibold text-white shadow-lg shadow-red-500/20 transition hover:brightness-110"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </aside>
  );
};

export default CartSidebar;

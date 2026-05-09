import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About' },
  { path: '/offers', label: 'Offers' },
  { path: '/reservations', label: 'Reservations' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-slate-900 transition hover:opacity-90">
          <span className="text-3xl">🦏</span>
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-orange-500">Rhino Flame</p>
            <p className="text-lg font-black text-slate-900">Kitchen & Bar</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-semibold transition ${
                isActive(item.path) ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-slate-700 hover:text-red-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/checkout" className="relative inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm transition hover:border-red-500 hover:text-red-600">
            <ShoppingCart size={20} />
            {cartItems > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-bold text-white">
                {cartItems}
              </span>
            )}
          </Link>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-800 transition hover:border-red-500 md:hidden">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white/98 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                  isActive(item.path) ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

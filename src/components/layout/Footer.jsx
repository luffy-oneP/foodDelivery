import { Link } from 'react-router-dom';
import { contactInfo, locationInfo, restaurantInfo } from '../../data/restaurantData';

const Footer = () => (
  <footer className="bg-slate-950 text-slate-200 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🦏</span>
            <div>
              <h2 className="text-2xl font-black text-red-500">{restaurantInfo.name}</h2>
              <p className="text-sm text-slate-400">{restaurantInfo.tagline}</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Premium Nepalese and Chitwan-inspired flavors crafted for delivery, takeaway, and dining.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/menu" className="hover:text-white transition">Menu</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/offers" className="hover:text-white transition">Offers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>{contactInfo.phone}</li>
              <li>{contactInfo.email}</li>
              <li>{locationInfo.street}</li>
              <li>{locationInfo.city}, {locationInfo.district}</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Newsletter</h3>
          <p className="text-sm text-slate-400">
            Stay updated with limited-time offers, chef specials, and order alerts from Rhino Flame.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-red-500"
            />
            <button className="rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-500">
        © 2026 {restaurantInfo.name}. Designed for delivery growth in Nepal.
      </div>
    </div>
  </footer>
);

export default Footer;

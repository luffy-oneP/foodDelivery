import { restaurantInfo } from '../data/restaurantData';

export const Hero = ({ onOrderClick, onReservationClick }) => {
  return (
    <div id="home" className="relative overflow-hidden py-20 bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-72 h-72 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center md:text-left">
            {/* Logo & Name */}
            <div className="space-y-4">
              <div className="text-8xl inline-block">🦏</div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Rhino Flame
              </h1>
              <h2 className="text-2xl md:text-3xl text-orange-600 font-bold">Kitchen & Bar</h2>
            </div>

            {/* Tagline */}
            <div className="space-y-3">
              <p className="text-xl md:text-2xl text-red-600 italic font-semibold">
                "{restaurantInfo.tagline}"
              </p>
              <p className="text-gray-700 text-lg leading-relaxed max-w-lg">
                Experience authentic Nepali, Tharu, and BBQ specialties cooked over firewood. A premium dining destination in the heart of Gaindakot.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <button
                onClick={onOrderClick}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-xl transition-all transform hover:scale-105 text-lg shadow-lg"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                🍽️ Order Now
              </button>
              <button
                onClick={onReservationClick}
                className="px-8 py-4 border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold rounded-xl transition-all text-lg"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                📅 Book Table
              </button>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6 pt-8 justify-center md:justify-start">
              <div className="text-center">
                <p className="text-2xl font-black text-red-600">4.8⭐</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
              <div className="border-l border-gray-300"></div>
              <div className="text-center">
                <p className="text-2xl font-black text-orange-600">1K+</p>
                <p className="text-sm text-gray-600">Orders</p>
              </div>
              <div className="border-l border-gray-300"></div>
              <div className="text-center">
                <p className="text-2xl font-black text-green-600">30m</p>
                <p className="text-sm text-gray-600">Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Side - Food Showcase */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: '🍖', name: 'BBQ Sekuwa', price: '₹549' },
              { emoji: '🥟', name: 'Buff Mo:Mo', price: '₹279' },
              { emoji: '🍕', name: 'Firewood Pizza', price: '₹499' },
              { emoji: '☕', name: 'Himalayan Coffee', price: '₹149' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100"
              >
                <div className="text-6xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <p className="text-orange-600 font-bold text-lg mt-2">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

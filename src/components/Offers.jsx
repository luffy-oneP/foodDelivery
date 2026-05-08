import { offers } from '../data/offersData';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export const Offers = ({ onApplyCoupon }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="offers" className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            🎉 Special Offers & Discounts
          </h2>
          <p className="text-gray-600 text-lg">Enjoy exclusive deals on your favorite dishes</p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-orange-200 hover:border-red-600"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{offer.icon}</div>

              {/* Code */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-1">Coupon Code</p>
                <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between group cursor-pointer">
                  <code className="font-bold text-gray-900">{offer.code}</code>
                  <button
                    onClick={() => handleCopyCode(offer.code, offer.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedId === offer.id ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <Copy size={18} className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-gray-900 mb-1">{offer.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{offer.description}</p>

              {/* Details */}
              <div className="space-y-2 mb-4 text-xs text-gray-700">
                <p>Min Order: <span className="font-bold">₹{offer.minOrder}</span></p>
                <p>Max Discount: <span className="font-bold">₹{offer.maxDiscount}</span></p>
              </div>

              {/* Expiry */}
              <p className="text-xs text-orange-600 font-semibold mb-4">Valid till {offer.expiry}</p>

              {/* Apply Button */}
              <button
                onClick={() => onApplyCoupon(offer.code)}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-lg transition-all text-sm"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* Terms */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-700">
            <span className="font-bold">Terms & Conditions:</span> Coupons can be applied at checkout. Only one coupon per order. Minimum order value must be met for coupon validation. Cannot be combined with other offers.
          </p>
        </div>
      </div>
    </section>
  );
};

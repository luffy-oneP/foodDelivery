import { testimonials } from '../data/testimonials';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            What Our Guests Say
          </h2>
          <p className="text-gray-600 text-lg">Join thousands of satisfied customers enjoying Rhino Flame</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-6 line-clamp-4 italic">"{testimonial.review}"</p>

              {/* Author Info */}
              <div className="flex items-center gap-3 border-t pt-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-xl transition-all transform hover:scale-105 text-lg">
            Share Your Experience ⭐
          </button>
        </div>
      </div>
    </section>
  );
};

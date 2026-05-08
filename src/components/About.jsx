import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import { restaurantInfo, contactInfo, locationInfo, businessHours } from '../data/restaurantData';

export const About = () => {
  const hoursArray = Object.entries(businessHours);

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Image/Emoji */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-orange-200 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative text-9xl">🏞️</div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Story */}
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Our Story
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {restaurantInfo.description}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Every dish at Rhino Flame is prepared with passion and authenticity, honoring the culinary traditions of Nepal while embracing modern dining excellence. Our firewood grills and traditional cooking methods ensure that every meal is a memorable experience.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Phone size={24} className="text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-bold text-gray-900">{contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={24} className="text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-bold text-gray-900">{contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin size={24} className="text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-bold text-gray-900">{locationInfo.street}, {locationInfo.city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={contactInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-xl transition-all transform hover:scale-105"
            >
              Visit Our Website →
            </a>
          </div>
        </div>

        {/* Hours & Location Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Business Hours */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Clock size={28} className="text-orange-600" />
              Opening Hours
            </h3>
            <div className="space-y-2">
              {hoursArray.slice(0, 3).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="font-semibold text-gray-700 capitalize">{day}</span>
                  <span className="text-gray-600">{hours}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                {hoursArray.slice(3).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="font-semibold text-gray-700 capitalize">{day}</span>
                    <span className="text-gray-600">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map & Location */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <MapPin size={28} className="text-red-600" />
              Location
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-semibold">📍 {locationInfo.street}</span>
              </p>
              <p className="text-gray-700">
                {locationInfo.city}, {locationInfo.district}, {locationInfo.province}
              </p>
              <p className="text-gray-700">{locationInfo.postalCode}, {locationInfo.country}</p>
              <p className="text-sm text-gray-600 italic">Near {locationInfo.landmark}</p>
              <a
                href={locationInfo.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-600 transition-all"
              >
                View on Google Maps 🗺️
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

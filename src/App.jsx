import { useState, useMemo } from 'react';
import { ShoppingCart, X, Clock, Star, Search, ArrowRight } from 'lucide-react';
import './index.css'

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { Testimonials } from './components/Testimonials';
import { About } from './components/About';
import { Offers } from './components/Offers';

// Data
import { menuData } from './data/menuData';
import { offers, freeDeliveryThreshold } from './data/offersData';
import { restaurantInfo, contactInfo, locationInfo } from './data/restaurantData';

const App = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [customization, setCustomization] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStage, setOrderStage] = useState('menu'); // menu, checkout, payment, confirmation
  const [selectedPayment, setSelectedPayment] = useState('esewa');
  const [customerInfo, setCustomerInfo] = useState({ name: '', address: '', phone: '' });
  const [orderId, setOrderId] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [filters, setFilters] = useState({
    dietType: null,
    sortBy: 'newest',
    maxPrice: 1000,
    minRating: 0,
    maxPrepTime: 60,
  });
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservation, setReservation] = useState({
    name: '',
    guests: 2,
    date: '',
    time: '',
    phone: '',
    specialRequest: '',
  });

  // Mock food data with detailed information
  const foodItems = useMemo(() => menuData, []);

  const categories = [
    { id: 'all', name: 'All Dishes', icon: '🍽️' },
    { id: 'nepali', name: 'Nepali', icon: '🇳🇵' },
    { id: 'tharu', name: 'Tharu Food', icon: '🥘' },
    { id: 'bbq', name: 'BBQ & Sekuwa', icon: '🔥' },
    { id: 'pizza', name: 'Firewood Pizza', icon: '🍕' },
    { id: 'momo', name: 'Mo:Mo', icon: '🥟' },
    { id: 'coffee', name: 'Coffee', icon: '☕' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
  ];

  const paymentMethods = [
    { id: 'esewa', name: 'eSewa', icon: '📱' },
    { id: 'khalti', name: 'Khalti', icon: '💳' },
    { id: 'imepayme', name: 'IME Pay', icon: '💰' },
    { id: 'connectips', name: 'ConnectIPS', icon: '🏦' },
    { id: 'card', name: 'Card', icon: '💳' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
  ];

  // Calculate cart totals
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  // Filter dishes based on category, diet type, and search with advanced filters
  const filteredDishes = useMemo(() => {
    let result = foodItems.filter(dish => {
      const matchesCategory = activeTab === 'all' || dish.category === activeTab;
      const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDiet = !filters.dietType || dish.type === filters.dietType;
      const matchesPrice = dish.price <= filters.maxPrice;
      const matchesRating = dish.rating >= filters.minRating;
      const matchesPrepTime = dish.prepTime <= filters.maxPrepTime;
      
      return matchesCategory && matchesSearch && matchesDiet && matchesPrice && matchesRating && matchesPrepTime;
    });

    // Apply sorting
    if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'priceLow') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'priceHigh') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'popular') {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [activeTab, searchTerm, filters, foodItems]);

  // Calculate discount based on applied coupon
  const getDiscountAmount = () => {
    if (!appliedCoupon) return 0;
    const coupon = offers.find(o => o.code === appliedCoupon);
    if (!coupon || cartTotal < coupon.minOrder) return 0;
    
    if (coupon.type === 'percentage') {
      return Math.min(Math.round(cartTotal * coupon.discount / 100), coupon.maxDiscount);
    } else if (coupon.type === 'flat') {
      return coupon.discount;
    } else if (coupon.type === 'delivery') {
      return coupon.discount;
    }
    return 0;
  };

  const discountAmount = useMemo(() => getDiscountAmount(), [appliedCoupon, cartTotal]);
  const deliveryCharge = cartTotal >= freeDeliveryThreshold ? 0 : 50;
  const finalTotal = cartTotal + Math.round(cartTotal * 0.05) + deliveryCharge - discountAmount;

  const handleApplyCoupon = (code) => {
    const coupon = offers.find(o => o.code === code);
    if (coupon && cartTotal >= coupon.minOrder) {
      setAppliedCoupon(code);
      alert(`✅ Coupon ${code} applied! Saving ₹${getDiscountAmount()}`);
    } else {
      alert(`❌ Coupon not applicable. Minimum order: ₹${coupon?.minOrder || 0}`);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleReservation = () => {
    if (reservation.name && reservation.date && reservation.time && reservation.phone) {
      alert(`✅ Reservation confirmed for ${reservation.guests} guests on ${reservation.date} at ${reservation.time}`);
      setShowReservationModal(false);
      setReservation({ name: '', guests: 2, date: '', time: '', phone: '', specialRequest: '' });
    } else {
      alert('❌ Please fill all required fields');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'menu') {
      setOrderStage('menu');
    }
  };

  const addToCart = (dish) => {
    const existingItem = cart.find(item => item.id === dish.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...dish, quantity: 1 }]);
    }
  };

  const removeFromCart = (dishId) => {
    setCart(cart.filter(item => item.id !== dishId));
  };

  const updateQuantity = (dishId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
    } else {
      setCart(cart.map(item =>
        item.id === dishId ? { ...item, quantity } : item
      ));
    }
  };

  const openDishModal = (dish) => {
    setSelectedDish(dish);
    setCustomization({});
  };

  const closeDishModal = () => {
    setSelectedDish(null);
    setCustomization({});
  };

  const addCustomizedDish = () => {
    if (selectedDish) {
      addToCart({ ...selectedDish, customization });
      closeDishModal();
    }
  };

  const proceedToCheckout = () => {
    setOrderStage('checkout');
  };

  const proceedToPayment = () => {
    if (customerInfo.name && customerInfo.address && customerInfo.phone) {
      setOrderStage('payment');
    }
  };

  const processPayment = () => {
    setOrderId(Math.random().toString(36).substr(2, 9).toUpperCase());
    setOrderStage('confirmation');
  };

  // Rendering functions
  const renderMenu = () => (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero 
        onOrderClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
        onReservationClick={() => setShowReservationModal(true)}
      />

      {/* Filter Bar */}
      <FilterBar
        activeCategory={activeTab}
        onCategoryChange={setActiveTab}
        onFilterChange={handleFilterChange}
        categories={categories}
        filters={filters}
      />

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto relative">
          <Search className="absolute left-6 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition"
            style={{ fontFamily: "'Segoe UI', sans-serif" }}
          />
        </div>
      </div>

      {/* Dishes Grid */}
      <div className="bg-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map(dish => (
              <div
                key={dish.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:scale-102 border border-gray-100 cursor-pointer"
                onClick={() => openDishModal(dish)}
              >
                {/* Image Section */}
                <div className="relative bg-gradient-to-br from-red-100 to-orange-100 h-48 flex items-center justify-center overflow-hidden">
                  <div className="text-8xl group-hover:scale-125 transition-transform duration-300">
                    {dish.image}
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <div className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-orange-600">
                      {dish.type === 'veg' ? '🌱 Veg' : '🍖 Non-Veg'}
                    </div>
                    {dish.isBestSeller && (
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        ⭐ Best Seller
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {dish.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">{dish.description}</p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">{dish.rating}</span>
                      <span className="text-gray-500 text-xs">({dish.reviews})</span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={14} />
                      {dish.prepTime}m
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-2xl font-black text-red-600">₹{dish.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDishModal(dish);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDishes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No dishes found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Offers Section */}
      <Offers onApplyCoupon={handleApplyCoupon} />

      {/* About Section */}
      <About />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-3xl">🦏</span>
                <h3 className="text-2xl font-black text-red-500">{restaurantInfo.name.split(' ')[0]}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">
                {restaurantInfo.tagline}
              </p>
              <div className="flex space-x-4">
                <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                  <span className="text-2xl">📘</span>
                </a>
                <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                  <span className="text-2xl">📷</span>
                </a>
                <a href={contactInfo.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                  <span className="text-2xl">🎵</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-red-500">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#menu" className="text-gray-300 hover:text-white transition-colors">Menu</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#offers" className="text-gray-300 hover:text-white transition-colors">Offers</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-red-500">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300">📞 {contactInfo.phone}</li>
                <li className="text-gray-300">✉️ {contactInfo.email}</li>
                <li className="text-gray-300">📍 {locationInfo.city}, {locationInfo.district}</li>
                <li><a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">💬 WhatsApp</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-red-500">Stay Updated</h4>
              <p className="text-gray-300 text-sm">Subscribe for latest offers</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400 text-sm"
                />
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg font-semibold transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
              <div className="text-gray-400">
                © 2026 {restaurantInfo.name}. All rights reserved.
              </div>
              <div className="flex space-x-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  const renderDishModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {selectedDish.name}
          </h2>
          <button
            onClick={closeDishModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl h-64 flex items-center justify-center">
            <div className="text-9xl">{selectedDish.image}</div>
          </div>

          {/* Description & Stats */}
          <div>
            <p className="text-gray-700 text-lg mb-4">{selectedDish.description}</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-orange-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-black text-orange-600">{selectedDish.rating}</div>
                <div className="text-xs text-gray-600">Rating</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-black text-orange-600">{selectedDish.prepTime}m</div>
                <div className="text-xs text-gray-600">Prep Time</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-black text-orange-600">{selectedDish.calories}</div>
                <div className="text-xs text-gray-600">Calories</div>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedDish.ingredients.map((ing, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  ✓ {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Customization Options */}
          {selectedDish.customizable.length > 0 && (
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Customize Your Order
              </h3>
              <div className="space-y-4">
                {selectedDish.customizable.map((option) => (
                  <div key={option} className="border border-gray-200 rounded-lg p-4">
                    <label className="font-semibold text-gray-700 block mb-3">{option}</label>
                    <select
                      value={customization[option] || ''}
                      onChange={(e) => setCustomization({ ...customization, [option]: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-red-600"
                    >
                      <option value="">Select {option}</option>
                      {option === 'Spice Level' && (
                        <>
                          <option value="mild">🌶️ Mild</option>
                          <option value="medium">🌶️🌶️ Medium</option>
                          <option value="hot">🌶️🌶️🌶️ Hot</option>
                        </>
                      )}
                      {option === 'Portion Size' && (
                        <>
                          <option value="small">Small (250g)</option>
                          <option value="medium">Medium (400g)</option>
                          <option value="large">Large (600g)</option>
                        </>
                      )}
                      {option === 'Cheese' && (
                        <>
                          <option value="normal">Normal Cheese</option>
                          <option value="extra">Extra Cheese (+₹50)</option>
                          <option value="less">Less Cheese (-₹30)</option>
                        </>
                      )}
                      {option === 'Crust Type' && (
                        <>
                          <option value="thin">Thin Crust</option>
                          <option value="regular">Regular Crust</option>
                          <option value="thick">Thick Crust</option>
                        </>
                      )}
                      {option === 'Sauce' && (
                        <>
                          <option value="standard">Standard Sauce</option>
                          <option value="extra">Extra Sauce</option>
                          <option value="light">Light Sauce</option>
                        </>
                      )}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={addCustomizedDish}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Add to Cart • ₹{selectedDish.price}
          </button>
        </div>
      </div>
    </div>
  );

  const renderCheckout = () => (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-black mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Your Order
        </h2>

        <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{item.image}</span>
                <div>
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <p className="text-gray-600 text-sm">₹{item.price} each</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-lg font-bold transition"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-orange-500 hover:bg-orange-600 text-white w-10 h-10 rounded-lg font-bold transition"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700 font-bold"
                >
                  Delete
                </button>
                <div className="font-bold text-lg ml-4 w-24 text-right">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Information */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Delivery Details
        </h3>
        <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
          />
          <textarea
            placeholder="Delivery Address"
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            rows="4"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
          ></textarea>
        </div>
      </div>

      {/* Coupon Code Input */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Apply Coupon
        </h3>
        <div className="bg-white rounded-2xl p-6 shadow-md flex gap-4">
          <input
            type="text"
            placeholder="Enter coupon code (e.g., RHINO10)"
            value={appliedCoupon || ''}
            onChange={(e) => setAppliedCoupon(e.target.value.toUpperCase())}
            className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
          />
          <button
            onClick={() => appliedCoupon && handleApplyCoupon(appliedCoupon)}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-lg transition-all"
          >
            Apply
          </button>
        </div>
        {appliedCoupon && (
          <p className="text-green-600 font-semibold mt-2">✅ Coupon {appliedCoupon} applied! Saving ₹{discountAmount}</p>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 space-y-3">
        <div className="flex justify-between font-semibold text-lg">
          <span>Subtotal</span>
          <span>₹{cartTotal}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Delivery Fee</span>
          <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
            {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}
          </span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Tax (5%)</span>
          <span>₹{Math.round(cartTotal * 0.05)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between font-semibold text-lg text-green-600 border-t-2 border-green-300 pt-2">
            <span>💰 Discount ({appliedCoupon})</span>
            <span>-₹{discountAmount}</span>
          </div>
        )}
        <div className="border-t-2 border-gray-300 pt-3 flex justify-between text-2xl font-black">
          <span>Total</span>
          <span className="text-red-600">₹{finalTotal}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setOrderStage('checkout')}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-4 rounded-xl transition text-lg"
        >
          Back
        </button>
        <button
          onClick={proceedToPayment}
          className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition text-lg flex items-center justify-center gap-2"
        >
          Proceed to Payment <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-black mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
        Payment Method
      </h2>

      {/* Payment Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Delivery</span>
            <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Tax (5%)</span>
            <span>₹{Math.round(cartTotal * 0.05)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between font-semibold text-green-600">
              <span>Discount</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}
          <div className="flex justify-between text-xl font-black text-red-600 pt-2 border-t">
            <span>Total Amount</span>
            <span>₹{finalTotal}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4 mb-8">
        <h3 className="font-bold text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Select Payment Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map(method => (
            <label key={method.id} className="cursor-pointer">
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="hidden"
              />
              <div
                className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                  selectedPayment === method.id
                    ? 'border-red-600 bg-red-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-2">{method.icon}</div>
                <h4 className="font-bold text-lg">{method.name}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  {method.id === 'card' && 'Visa, Mastercard, American Express'}
                  {method.id === 'esewa' && 'Fast & Secure payment'}
                  {method.id === 'khalti' && 'Popular mobile wallet'}
                  {method.id === 'imepayme' && 'Universal payment'}
                  {method.id === 'connectips' && 'Bank partner'}
                  {method.id === 'cod' && 'Pay when food arrives'}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Details */}
      {selectedPayment === 'card' && (
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8 space-y-4">
          <input type="text" placeholder="Card Holder Name" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none" />
          <input type="text" placeholder="Card Number" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="MM/YY" className="p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none" />
            <input type="text" placeholder="CVV" className="p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none" />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setOrderStage('checkout')}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-4 rounded-xl transition text-lg"
        >
          Back
        </button>
        <button
          onClick={processPayment}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl transition text-lg flex items-center justify-center gap-2"
        >
          Pay ₹{finalTotal}
        </button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="max-w-2xl mx-auto px-6 py-12 text-center">
      <div className="mb-8">
        <div className="text-9xl mb-6 inline-block animate-bounce">✅</div>
        <h2 className="text-4xl font-black mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Order Confirmed!
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Your delicious food is being prepared
        </p>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 mb-8 space-y-6">
        <div>
          <p className="text-gray-600 text-sm mb-1">Order ID</p>
          <p className="text-3xl font-black text-red-600">#{orderId}</p>
        </div>

        <div className="border-t-2 border-red-200 pt-6">
          <p className="text-gray-600 text-sm mb-3">Estimated Delivery Time</p>
          <p className="text-2xl font-bold">30-40 minutes</p>
        </div>

        <div className="border-t-2 border-red-200 pt-6">
          <p className="text-gray-600 text-sm mb-3">Total Amount Paid</p>
          <p className="text-3xl font-black text-green-600">₹{finalTotal}</p>
        </div>

        <div className="border-t-2 border-red-200 pt-6">
          <p className="text-gray-600 text-sm mb-3">Delivery to</p>
          <p className="font-semibold">{customerInfo.name}</p>
          <p className="text-gray-700">{customerInfo.address}</p>
          <p className="text-gray-600 text-sm">📞 {customerInfo.phone}</p>
        </div>

        <div className="border-t-2 border-red-200 pt-6">
          <p className="text-gray-600 text-sm mb-2">Estimated Delivery</p>
          <p className="text-2xl font-bold">🚚 30-40 minutes</p>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => {
            setCart([]);
            setCustomerInfo({ name: '', address: '', phone: '' });
            setOrderStage('menu');
            setSearchTerm('');
            setActiveTab('all');
            setAppliedCoupon(null);
          }}
          className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition text-lg"
        >
          Order More Food
        </button>
        <button
          onClick={() => alert('Tracking feature would open in real app')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition text-lg"
        >
          Track Order
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Navbar */}
      <Navbar
        cartLength={cart.length}
        onCartClick={() => setCartOpen(!cartOpen)}
        scrollToSection={scrollToSection}
      />

      {/* Main Content */}
      <div>
        {orderStage === 'menu' && renderMenu()}
        {orderStage === 'checkout' && renderCheckout()}
        {orderStage === 'payment' && renderPayment()}
        {orderStage === 'confirmation' && renderConfirmation()}
      </div>

      {/* Reservation Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                📅 Book a Table
              </h2>
              <button
                onClick={() => setShowReservationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={reservation.name}
                onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
              />
              <select
                value={reservation.guests}
                onChange={(e) => setReservation({ ...reservation, guests: parseInt(e.target.value) })}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
              <input
                type="date"
                value={reservation.date}
                onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
              />
              <input
                type="time"
                value={reservation.time}
                onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={reservation.phone}
                onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
              />
              <textarea
                placeholder="Special Requests"
                value={reservation.specialRequest}
                onChange={(e) => setReservation({ ...reservation, specialRequest: e.target.value })}
                rows="3"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
              ></textarea>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowReservationModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReservation}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-lg transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Sidebar */}
      {orderStage === 'menu' && cartOpen && (
        <div className="fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl overflow-y-auto z-40">
          <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X size={24} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{item.image}</span>
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 w-8 h-8 rounded font-bold"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-red-600 text-white w-8 h-8 rounded font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      Delete
                    </button>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between font-semibold text-green-600">
                  <span>Delivery</span>
                  <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
                </div>
                <div className="flex justify-between text-xl font-black text-red-600 pt-3 border-t">
                  <span>Total</span>
                  <span>₹{cartTotal + Math.round(cartTotal * 0.05) + deliveryCharge}</span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    proceedToCheckout();
                  }}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3 rounded-xl hover:from-red-700 hover:to-orange-600 transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dish Detail Modal */}
      {selectedDish && renderDishModal()}
    </div>
  );
};

export default App;

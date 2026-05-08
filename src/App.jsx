import React, { useState, useMemo } from 'react';
import { ShoppingCart, X, MapPin, Clock, Star, ChevronDown, Filter, Search, ArrowRight } from 'lucide-react';
import './index.css'

const App = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [customization, setCustomization] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStage, setOrderStage] = useState('menu'); // menu, checkout, payment, confirmation
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [customerInfo, setCustomerInfo] = useState({ name: '', address: '', phone: '' });

  // Mock food data with detailed information
  const foodItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      category: 'pizza',
      type: 'veg',
      price: 399,
      rating: 4.5,
      reviews: 128,
      image: '🍕',
      description: 'Classic pizza with fresh mozzarella, basil, and tomato sauce',
      ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Basil', 'Olive Oil', 'Dough'],
      prepTime: 20,
      calories: 285,
      customizable: ['Cheese', 'Sauce Level', 'Crust Type']
    },
    {
      id: 2,
      name: 'Grilled Chicken Tikka',
      category: 'mains',
      type: 'non-veg',
      price: 449,
      rating: 4.7,
      reviews: 245,
      image: '🍗',
      description: 'Succulent chicken marinated in yogurt and spices, grilled to perfection',
      ingredients: ['Chicken Breast', 'Yogurt', 'Ginger-Garlic Paste', 'Spices', 'Lemon Juice'],
      prepTime: 25,
      calories: 320,
      customizable: ['Spice Level', 'Portion Size', 'Sauce']
    },
    {
      id: 3,
      name: 'Paneer Butter Masala',
      category: 'mains',
      type: 'veg',
      price: 379,
      rating: 4.6,
      reviews: 189,
      image: '🧀',
      description: 'Soft cottage cheese cubes in a creamy tomato and butter sauce',
      ingredients: ['Paneer', 'Butter', 'Cream', 'Tomato Puree', 'Spices'],
      prepTime: 20,
      calories: 380,
      customizable: ['Spice Level', 'Gravy Thickness', 'Cheese Amount']
    },
    {
      id: 4,
      name: 'Tandoori Salmon',
      category: 'mains',
      type: 'non-veg',
      price: 649,
      rating: 4.8,
      reviews: 156,
      image: '🐟',
      description: 'Premium salmon fillet marinated in tandoori spices and grilled',
      ingredients: ['Salmon Fillet', 'Tandoori Masala', 'Yogurt', 'Lemon', 'Herbs'],
      prepTime: 30,
      calories: 420,
      customizable: ['Cooking Level', 'Side Dish', 'Sauce']
    },
    {
      id: 5,
      name: 'Vegetable Biryani',
      category: 'rice',
      type: 'veg',
      price: 329,
      rating: 4.4,
      reviews: 201,
      image: '🍚',
      description: 'Fragrant basmati rice cooked with vegetables and aromatic spices',
      ingredients: ['Basmati Rice', 'Mixed Vegetables', 'Yogurt', 'Spices', 'Herbs'],
      prepTime: 25,
      calories: 350,
      customizable: ['Spice Level', 'Extra Vegetables', 'Portion Size']
    },
    {
      id: 6,
      name: 'Mutton Biryani',
      category: 'rice',
      type: 'non-veg',
      price: 449,
      rating: 4.7,
      reviews: 267,
      image: '🍛',
      description: 'Tender mutton pieces with basmati rice and traditional dum-cooked preparation',
      ingredients: ['Mutton', 'Basmati Rice', 'Yogurt', 'Spices', 'Mint'],
      prepTime: 35,
      calories: 420,
      customizable: ['Spice Level', 'Meat Tenderness', 'Rice Type']
    },
    {
      id: 7,
      name: 'Caesar Salad',
      category: 'salads',
      type: 'veg',
      price: 259,
      rating: 4.3,
      reviews: 98,
      image: '🥗',
      description: 'Crisp romaine lettuce with parmesan, croutons, and Caesar dressing',
      ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing', 'Lemon'],
      prepTime: 10,
      calories: 210,
      customizable: ['Dressing Amount', 'Extra Vegetables', 'Protein Addition']
    },
    {
      id: 8,
      name: 'Grilled Fish Salad',
      category: 'salads',
      type: 'non-veg',
      price: 389,
      rating: 4.6,
      reviews: 134,
      image: '🥙',
      description: 'Mixed greens with grilled fish, avocado, and lemon vinaigrette',
      ingredients: ['Mixed Greens', 'Grilled Fish', 'Avocado', 'Lemon Vinaigrette', 'Cherry Tomatoes'],
      prepTime: 15,
      calories: 280,
      customizable: ['Fish Type', 'Dressing', 'Extra Vegetables']
    },
    {
      id: 9,
      name: 'Chocolate Lava Cake',
      category: 'desserts',
      type: 'veg',
      price: 199,
      rating: 4.9,
      reviews: 412,
      image: '🍰',
      description: 'Decadent chocolate cake with a molten center, served with vanilla ice cream',
      ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Flour', 'Vanilla Ice Cream'],
      prepTime: 12,
      calories: 450,
      customizable: ['Ice Cream Flavor', 'Chocolate Type', 'Serving Temperature']
    },
    {
      id: 10,
      name: 'Mango Cheesecake',
      category: 'desserts',
      type: 'veg',
      price: 229,
      rating: 4.8,
      reviews: 289,
      image: '🧁',
      description: 'Creamy cheesecake infused with fresh mango puree and graham cracker crust',
      ingredients: ['Cream Cheese', 'Mango Puree', 'Graham Crackers', 'Sugar', 'Gelatin'],
      prepTime: 10,
      calories: 380,
      customizable: ['Mango Amount', 'Crust Type', 'Topping']
    },
  ];

  const categories = [
    { id: 'all', name: 'All Dishes', icon: '🍽️' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'mains', name: 'Mains', icon: '🍗' },
    { id: 'rice', name: 'Rice Dishes', icon: '🍚' },
    { id: 'salads', name: 'Salads', icon: '🥗' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'wallet', name: 'Digital Wallet', icon: '📱' },
    { id: 'upi', name: 'UPI', icon: '💰' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
  ];

  // Filter dishes based on category, diet type, and search
  const filteredDishes = useMemo(() => {
    return foodItems.filter(dish => {
      const matchesCategory = activeTab === 'all' || dish.category === activeTab;
      const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  // Calculate cart totals
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

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
    setOrderStage('confirmation');
  };

  // Rendering functions
  const renderMenu = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 opacity-10"></div>
        <div className="relative px-6 py-12">
          <h1 className="text-5xl font-black mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            FoodHub
          </h1>
          <p className="text-gray-600 text-lg">Order from the best restaurants in your area</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
            style={{ fontFamily: "'Segoe UI', sans-serif" }}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-3 rounded-full font-semibold whitespace-nowrap transition-all transform hover:scale-105 ${
                activeTab === cat.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{ fontFamily: "'Segoe UI', sans-serif" }}
            >
              <span className="mr-2">{cat.icon}</span>{cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Grid */}
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map(dish => (
            <div
              key={dish.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:scale-102 border border-gray-100 cursor-pointer"
              onClick={() => openDishModal(dish)}
            >
              {/* Image Section */}
              <div className="relative bg-gradient-to-br from-orange-100 to-pink-100 h-48 flex items-center justify-center overflow-hidden">
                <div className="text-8xl group-hover:scale-125 transition-transform duration-300">
                  {dish.image}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-orange-600">
                  {dish.type === 'veg' ? '🌱 Veg' : '🍖 Non-Veg'}
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
                  <span className="text-2xl font-black text-orange-600">₹{dish.price}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDishModal(dish);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500"
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

      {/* Order Summary */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 space-y-3 mb-8">
        <div className="flex justify-between font-semibold text-lg">
          <span>Subtotal</span>
          <span>₹{cartTotal}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Delivery Fee</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Tax</span>
          <span>₹{Math.round(cartTotal * 0.05)}</span>
        </div>
        <div className="border-t-2 border-gray-300 pt-3 flex justify-between text-2xl font-black">
          <span>Total</span>
          <span className="text-orange-600">₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setOrderStage('menu')}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-4 rounded-xl transition text-lg"
        >
          Continue Shopping
        </button>
        <button
          onClick={proceedToPayment}
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl transition text-lg flex items-center justify-center gap-2"
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

      {/* Order Summary */}
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
            <span>Tax (5%)</span>
            <span>₹{Math.round(cartTotal * 0.05)}</span>
          </div>
          <div className="flex justify-between text-xl font-black text-orange-600 pt-2 border-t">
            <span>Total Amount</span>
            <span>₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
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
                    ? 'border-orange-500 bg-orange-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-2">{method.icon}</div>
                <h4 className="font-bold text-lg">{method.name}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  {method.id === 'card' && 'Visa, Mastercard, American Express'}
                  {method.id === 'wallet' && 'Apple Pay, Google Pay, Samsung Pay'}
                  {method.id === 'upi' && 'Google Pay, PhonePe, BHIM'}
                  {method.id === 'netbanking' && 'All major banks supported'}
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
          Pay ₹{cartTotal + Math.round(cartTotal * 0.05)}
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

      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 mb-8 space-y-6">
        <div>
          <p className="text-gray-600 text-sm mb-1">Order ID</p>
          <p className="text-3xl font-black text-orange-600">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>

        <div className="border-t-2 border-orange-200 pt-6">
          <p className="text-gray-600 text-sm mb-3">Estimated Delivery Time</p>
          <p className="text-2xl font-bold">30-40 minutes</p>
        </div>

        <div className="border-t-2 border-orange-200 pt-6">
          <p className="text-gray-600 text-sm mb-3">Total Amount Paid</p>
          <p className="text-3xl font-black text-green-600">₹{cartTotal + Math.round(cartTotal * 0.05)}</p>
        </div>

        <div className="border-t-2 border-orange-200 pt-6">
          <p className="text-gray-600 text-sm mb-3">Delivery to</p>
          <p className="font-semibold">{customerInfo.name}</p>
          <p className="text-gray-700">{customerInfo.address}</p>
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
          }}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl transition text-lg"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Fixed Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black text-orange-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
            🍽️ FoodHub
          </h1>
          {orderStage === 'menu' && (
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative p-3 hover:bg-gray-100 rounded-lg transition"
            >
              <ShoppingCart size={24} className="text-orange-600" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {orderStage === 'menu' && renderMenu()}
        {orderStage === 'checkout' && renderCheckout()}
        {orderStage === 'payment' && renderPayment()}
        {orderStage === 'confirmation' && renderConfirmation()}
      </div>

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
                        className="bg-orange-500 text-white w-8 h-8 rounded font-bold"
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
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-xl font-black text-orange-600 pt-3 border-t">
                  <span>Total</span>
                  <span>₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    proceedToCheckout();
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition"
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

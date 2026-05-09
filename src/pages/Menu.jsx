import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { menuData } from '../data/menuData';
import DishCard from '../components/menu/DishCard';
import FilterBar from '../components/menu/FilterBar';

const Menu = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ dietType: null, sortBy: 'newest', maxPrepTime: 60, showAdvanced: false });
  const [selectedDish, setSelectedDish] = useState(null);
  const [customization, setCustomization] = useState({});

  const filteredDishes = useMemo(() => {
    const result = menuData.filter((dish) => {
      const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
      const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDiet = !filters.dietType || dish.type === filters.dietType;
      const matchesPrepTime = dish.prepTime <= filters.maxPrepTime;
      return matchesCategory && matchesSearch && matchesDiet && matchesPrepTime;
    });

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
  }, [activeCategory, filters, searchTerm]);

  const openDishModal = (dish) => {
    setSelectedDish(dish);
    setCustomization({});
  };

  const closeDishModal = () => {
    setSelectedDish(null);
    setCustomization({});
  };

  const addCustomizedDish = () => {
    if (!selectedDish) return;
    addToCart({ ...selectedDish, customization });
    closeDishModal();
  };

  return (
    <main className="space-y-12 pb-24 pt-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/60">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Discover</p>
            <h1 className="mt-4 text-4xl font-black text-slate-900">Our Menu</h1>
            <p className="mt-4 max-w-2xl text-slate-600">Browse authentic Nepali, Tharu, BBQ, pizza, momo, coffee, and dessert options made for fast delivery or table service.</p>
          </div>
          <div className="rounded-[2rem] bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Need help choosing?</p>
            <p className="mt-3 text-slate-600">Our kitchen experts can recommend the perfect combo for your group. Start with the best sellers and add your favorites.</p>
            <button
              onClick={() => navigate('/offers')}
              className="mt-6 rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3 font-semibold text-white transition hover:brightness-110"
            >
              View Offers
            </button>
          </div>
        </div>
      </section>

      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={(value) => setActiveCategory(value)}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        filters={filters}
        onFilterChange={(key, value) => setFilters((prev) => (typeof value === 'function' ? { ...prev, [key]: value(prev[key]) } : { ...prev, [key]: value }))}
      />

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} onOpen={openDishModal} onAdd={addToCart} />
            ))}
          </div>

          {filteredDishes.length === 0 && (
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600">
              No dishes matched your filters. Try adjusting the category or prep time.
            </div>
          )}
        </div>

        <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Menu tips</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">Browse by taste</h2>
            <p className="mt-4 text-slate-600">Use search and filters to find spicy, budget-friendly, or family-style dishes.</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-100">Need vegetarian options?</p>
            <p className="mt-4 text-lg font-semibold">Switch the diet filter to Veg and explore our top vegetarian specials.</p>
          </div>
          <button onClick={() => navigate('/checkout')} className="w-full rounded-3xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800">
            Go to Checkout
          </button>
        </aside>
      </section>

      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-orange-500">{selectedDish.category}</p>
                <h2 className="mt-2 text-3xl font-black text-slate-900">{selectedDish.name}</h2>
              </div>
              <button onClick={closeDishModal} className="text-slate-500 transition hover:text-slate-900">Close</button>
            </div>
            <div className="grid gap-8 px-6 py-8 md:grid-cols-[0.7fr_0.8fr]">
              <div className="flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-red-100 to-orange-100 p-8 text-8xl">{selectedDish.image}</div>
              <div className="space-y-6">
                <p className="text-slate-600">{selectedDish.description}</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-slate-50 p-4 text-center">
                    <p className="text-sm text-slate-500">Rating</p>
                    <p className="mt-2 text-xl font-bold text-slate-900">{selectedDish.rating}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 text-center">
                    <p className="text-sm text-slate-500">Prep Time</p>
                    <p className="mt-2 text-xl font-bold text-slate-900">{selectedDish.prepTime}m</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 text-center">
                    <p className="text-sm text-slate-500">Calories</p>
                    <p className="mt-2 text-xl font-bold text-slate-900">{selectedDish.calories}</p>
                  </div>
                </div>
                {selectedDish.customizable.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Customize</p>
                    <div className="space-y-4">
                      {selectedDish.customizable.map((option) => (
                        <label key={option} className="block text-sm font-medium text-slate-700">
                          <span className="mb-2 block">{option}</span>
                          <select
                            value={customization[option] || ''}
                            onChange={(event) => setCustomization((prev) => ({ ...prev, [option]: event.target.value }))}
                            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          >
                            <option value="">Select {option}</option>
                            {option === 'Spice Level' && (
                              <>
                                <option value="mild">Mild</option>
                                <option value="medium">Medium</option>
                                <option value="hot">Hot</option>
                              </>
                            )}
                            {option === 'Portion Size' && (
                              <>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                              </>
                            )}
                            {option === 'Cheese' && (
                              <>
                                <option value="normal">Normal Cheese</option>
                                <option value="extra">Extra Cheese</option>
                                <option value="less">Less Cheese</option>
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
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <button onClick={addCustomizedDish} className="w-full rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:brightness-110">
                    Add to Cart - ₹{selectedDish.price}
                  </button>
                  <button onClick={closeDishModal} className="w-full rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Menu;

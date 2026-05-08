import { Filter } from 'lucide-react';
import { useState } from 'react';

export const FilterBar = ({
  activeCategory,
  onCategoryChange,
  onFilterChange,
  categories,
  filters,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { id: 'newest', label: 'Newest' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'priceLow', label: 'Price: Low to High' },
    { id: 'priceHigh', label: 'Price: High to Low' },
    { id: 'popular', label: 'Most Popular' },
  ];

  return (
    <div id="menu" className="bg-white sticky top-20 z-30 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
        {/* Category Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-5 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🍽️ All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-5 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Veg/Non-Veg Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => onFilterChange('dietType', null)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filters.dietType === null
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onFilterChange('dietType', 'veg')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filters.dietType === 'veg'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🌱 Veg
            </button>
            <button
              onClick={() => onFilterChange('dietType', 'non-veg')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filters.dietType === 'non-veg'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🍖 Non-Veg
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={filters.sortBy || 'newest'}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none font-semibold"
          >
            {sortOptions.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Advanced Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-red-600 transition-colors font-semibold"
          >
            <Filter size={20} />
            More Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Price Range</label>
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.maxPrice || 1000}
                onChange={(e) => onFilterChange('maxPrice', parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-600 mt-1">Up to ₹{filters.maxPrice || 1000}</p>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Min Rating</label>
              <select
                value={filters.minRating || 0}
                onChange={(e) => onFilterChange('minRating', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none text-sm"
              >
                <option value="0">All Ratings</option>
                <option value="4">4+ ⭐</option>
                <option value="4.5">4.5+ ⭐</option>
                <option value="4.7">4.7+ ⭐</option>
              </select>
            </div>

            {/* Prep Time */}
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Prep Time</label>
              <select
                value={filters.maxPrepTime || 60}
                onChange={(e) => onFilterChange('maxPrepTime', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none text-sm"
              >
                <option value="60">All</option>
                <option value="15">Under 15 min</option>
                <option value="30">Under 30 min</option>
                <option value="45">Under 45 min</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

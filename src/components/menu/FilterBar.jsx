import { Filter } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'nepali', label: 'Nepali' },
  { id: 'tharu', label: 'Tharu Food' },
  { id: 'bbq', label: 'BBQ & Sekuwa' },
  { id: 'pizza', label: 'Firewood Pizza' },
  { id: 'momo', label: 'Mo:Mo' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'desserts', label: 'Desserts' },
];

const FilterBar = ({ activeCategory, onCategoryChange, filters, onFilterChange, searchTerm, onSearch }) => {
  return (
    <section className="sticky top-24 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3 overflow-x-auto rounded-full bg-slate-100 px-3 py-2 scrollbar-hidden">
            {categories.map((category) => {
              const active = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <input
              value={searchTerm}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search dishes..."
              className="w-full min-w-[220px] rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
            <button
              type="button"
              onClick={() => onFilterChange('showAdvanced', (prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-500 hover:text-red-600"
            >
              <Filter size={18} /> Filters
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Diet</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['all', 'veg', 'non-veg'].map((type) => (
                <button
                  key={type}
                  onClick={() => onFilterChange('dietType', type === 'all' ? null : type)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filters.dietType === (type === 'all' ? null : type)
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {type === 'all' ? 'All' : type === 'veg' ? 'Veg' : 'Non-Veg'}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Sort</p>
            <select
              value={filters.sortBy}
              onChange={(event) => onFilterChange('sortBy', event.target.value)}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            >
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Prep Time</p>
            <select
              value={filters.maxPrepTime}
              onChange={(event) => onFilterChange('maxPrepTime', Number(event.target.value))}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            >
              <option value={60}>All</option>
              <option value={15}>Under 15 min</option>
              <option value={30}>Under 30 min</option>
              <option value={45}>Under 45 min</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;

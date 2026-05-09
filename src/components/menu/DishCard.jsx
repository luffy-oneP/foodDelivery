import { memo } from 'react';
import { Clock, Star, ShoppingCart } from 'lucide-react';

const DishCard = ({ dish, onOpen, onAdd }) => {
  return (
    <article
      onClick={() => onOpen(dish)}
      className="group cursor-pointer overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 text-8xl">{dish.image}</div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{dish.name}</h3>
            <p className="mt-1 text-sm text-slate-600 line-clamp-2">{dish.description}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800">₹{dish.price}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1"><Star size={16} className="text-yellow-500" />{dish.rating}</span>
          <span className="inline-flex items-center gap-1"><Clock size={16} />{dish.prepTime}m</span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">{dish.type === 'veg' ? 'Veg' : 'Non-Veg'}</span>
        </div>
        <div className="flex items-center justify-between gap-3 pt-3">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onAdd(dish);
            }}
            className="inline-flex items-center gap-2 rounded-3xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <ShoppingCart size={16} /> Add
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onOpen(dish);
            }}
            className="text-sm font-semibold text-slate-600 transition hover:text-red-600"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default memo(DishCard);

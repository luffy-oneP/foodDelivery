import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Testimonials } from '../components/Testimonials';
import { menuData } from '../data/menuData';
import { restaurantInfo } from '../data/restaurantData';

const Home = () => {
  const navigate = useNavigate();
  const featured = useMemo(
    () => menuData.filter((dish) => dish.isBestSeller || dish.isPopular).slice(0, 6),
    [],
  );

  return (
    <main className="space-y-16 pb-24 pt-6 xl:pt-10">
      <Hero onOrderClick={() => navigate('/menu')} onReservationClick={() => navigate('/reservations')} />

      <section className="rounded-[2rem] bg-white px-6 py-10 shadow-xl shadow-slate-200/70 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">About Rhino Flame</p>
            <h2 className="mt-3 text-4xl font-black text-slate-900">Premium Chitwan flavors delivered with passion.</h2>
          </div>
          <button
            onClick={() => navigate('/about')}
            className="inline-flex rounded-3xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-700"
          >
            Discover Our Story
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: 'Firewood Grill', value: 'Authentic', description: 'Locally sourced smoke-kissed signature meats and vegetables.' },
            { title: 'Gaindakot Flavor', value: 'Regional', description: 'Nepali and Tharu heritage with a modern premium twist.' },
            { title: 'Fast Delivery', value: '30m', description: 'Reliable delivery across Gaindakot and nearby communities.' },
            { title: 'Sustainable', value: 'Local', description: 'Fresh ingredients chosen to support local growers.' },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{item.title}</p>
              <p className="mt-3 text-3xl font-black text-slate-950">{item.value}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-black text-slate-900">Featured Dishes</h2>
            <p className="mt-3 text-slate-600">Handpicked crowd favorites from our kitchen.</p>
          </div>
          <button onClick={() => navigate('/menu')} className="rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition hover:brightness-110">
            View Full Menu
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((dish) => (
            <article key={dish.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-red-100 to-orange-100 text-5xl">{dish.image}</div>
              <h3 className="text-xl font-black text-slate-900">{dish.name}</h3>
              <p className="mt-3 text-slate-600 line-clamp-3">{dish.description}</p>
              <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                <span className="font-semibold text-slate-900">₹{dish.price}</span>
                <span>{dish.prepTime}m</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-gradient-to-br from-red-600 to-orange-500 p-10 text-white shadow-2xl shadow-red-500/20">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-200">Reservation</p>
          <h2 className="mt-5 text-4xl font-black">Book a table at our riverside kitchen.</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-orange-100">Reserve your spot for a memorable evening with friends and family, or schedule a private gathering with premium hospitality.</p>
          <button onClick={() => navigate('/reservations')} className="mt-8 inline-flex rounded-3xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">
            Reserve Now
          </button>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Why Rhino Flame</p>
          <div className="mt-8 space-y-5 text-slate-600">
            <p>Experience real Nepali and Tharu dishes cooked over firewood with premium ingredients, local spices, and refined presentation.</p>
            <p>From spicy sekuwa to firewood pizza, every plate is crafted to deliver bold flavor and comfortable dining.</p>
            <p>Fast pickup, reliable delivery, and a cozy restaurant environment make Rhino Flame a trusted choice in Gaindakot.</p>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="rounded-[2rem] bg-slate-950 px-8 py-14 text-white shadow-2xl shadow-slate-900/30">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Open Daily</p>
            <h3 className="mt-4 text-3xl font-black">08:00 AM - 11:00 PM</h3>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Location</p>
            <h3 className="mt-4 text-3xl font-black">{restaurantInfo.heroImage}</h3>
            <p className="mt-3 max-w-md text-sm text-slate-300">Narayani Riverside Road, Gaindakot, Nawalpur. Close to Maulakalika Cable Car entrance.</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Experience</p>
            <h3 className="mt-4 text-3xl font-black">Firewood cooking with premium service.</h3>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

import { About as AboutSection } from '../components/About';
import { restaurantInfo, features } from '../data/restaurantData';

const About = () => {
  return (
    <main className="space-y-16 pb-24 pt-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">About Rhino Flame</p>
            <h1 className="mt-4 text-5xl font-black text-slate-900">Nepalese hospitality meets premium firewood dining.</h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">At Rhino Flame Kitchen & Bar, we celebrate Gaindakot flavors with a modern premium experience. Our menu blends Nepali heritage, Tharu influence, and firewood grilled favorites for every table.</p>
          </div>
          <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Quick facts</p>
            <ul className="space-y-3 text-slate-700">
              {features.slice(0, 6).map((item) => (
                <li key={item} className="rounded-3xl bg-white p-4 text-sm shadow-sm">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AboutSection />

      <section className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-gradient-to-br from-red-600 to-orange-500 p-10 text-white shadow-2xl shadow-red-500/30">
          <h2 className="text-3xl font-black">Our Chitwan Inspiration</h2>
          <p className="mt-5 text-slate-100 leading-relaxed">From riverside ingredients to local techniques, our kitchen honors the spirit of Gaindakot and the communities around it. Every meal is a story of firewood, spice, and hospitality.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <h3 className="text-3xl font-black text-slate-900">Chef’s Philosophy</h3>
          <p className="mt-5 text-slate-600 leading-relaxed">We believe the best dining experiences combine premium ingredients, clean preparation, and genuine warmth. Our chef team creates menus that feel familiar yet exciting, inspired by Nepali home cooking and premium presentation.</p>
        </div>
      </section>
    </main>
  );
};

export default About;

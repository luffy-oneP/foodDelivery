import { useState } from 'react';
import { locationInfo, contactInfo } from '../data/restaurantData';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [result, setResult] = useState('');

  const submitContact = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setResult('Please complete all fields before submitting.');
      return;
    }
    setResult('Thanks for reaching out! Our team will contact you soon.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <main className="pb-24 pt-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Contact</p>
            <h1 className="mt-4 text-5xl font-black text-slate-900">Get in touch with Rhino Flame.</h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">Questions, feedback, or group booking requests? Send us a message and we will respond quickly.</p>
          </div>
          <div className="rounded-[2rem] bg-slate-50 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Visit us</p>
            <p className="mt-4 text-lg font-semibold text-slate-900">{locationInfo.street}</p>
            <p className="mt-1 text-slate-600">{locationInfo.city}, {locationInfo.district}</p>
            <p className="mt-3 text-slate-600">{contactInfo.phone}</p>
            <p className="mt-1 text-slate-600">{contactInfo.email}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr]">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm">
          <form className="space-y-6" onSubmit={submitContact}>
            <label className="block text-sm font-semibold text-slate-700">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="Your name"
            />

            <label className="block text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="Your email"
            />

            <label className="block text-sm font-semibold text-slate-700">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              rows="6"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="Tell us about your request"
            />

            <button className="rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:brightness-110">
              Send Message
            </button>
          </form>

          {result && (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
              {result}
            </div>
          )}
        </section>

        <section className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Our Location</h2>
          <div className="mt-6 h-80 overflow-hidden rounded-[2rem] border border-slate-200">
            <iframe
              title="Rhino Flame location"
              src={`${locationInfo.googleMaps}&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;

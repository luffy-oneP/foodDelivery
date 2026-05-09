import { useState } from 'react';

const Reservations = () => {
  const [reservation, setReservation] = useState({ name: '', guests: 2, date: '', time: '', phone: '', note: '' });
  const [success, setSuccess] = useState('');

  const isValid = reservation.name && reservation.date && reservation.time && reservation.phone;

  const submitReservation = (event) => {
    event.preventDefault();
    if (!isValid) {
      setSuccess('Please complete all required fields before booking.');
      return;
    }
    setSuccess(`Reservation confirmed for ${reservation.guests} guests on ${reservation.date} at ${reservation.time}.`);
    setReservation({ name: '', guests: 2, date: '', time: '', phone: '', note: '' });
  };

  return (
    <main className="pb-24 pt-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Reservations</p>
            <h1 className="mt-4 text-5xl font-black text-slate-900">Reserve your table today.</h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">Book a comfortable dining experience with authentic Chitwan cuisine and premium hospitality.</p>
          </div>
          <div className="rounded-[2rem] bg-slate-50 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Need assistance?</p>
            <p className="mt-4 text-slate-600">Call us on +977-9845123456 for special event bookings and group reservations.</p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm">
        <form className="grid gap-6 md:grid-cols-2" onSubmit={submitReservation}>
          <label className="space-y-2 text-sm text-slate-700">
            <span>Name</span>
            <input
              value={reservation.name}
              onChange={(e) => setReservation((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="Full name"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span>Phone</span>
            <input
              value={reservation.phone}
              onChange={(e) => setReservation((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="Phone number"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span>Guests</span>
            <select
              value={reservation.guests}
              onChange={(e) => setReservation((prev) => ({ ...prev, guests: Number(e.target.value) }))}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map((value) => (
                <option key={value} value={value}>{value} guest{value > 1 ? 's' : ''}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span>Date</span>
            <input
              type="date"
              value={reservation.date}
              onChange={(e) => setReservation((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span>Time</span>
            <input
              type="time"
              value={reservation.time}
              onChange={(e) => setReservation((prev) => ({ ...prev, time: e.target.value }))}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </label>

          <label className="md:col-span-2 space-y-2 text-sm text-slate-700">
            <span>Special request</span>
            <textarea
              value={reservation.note}
              onChange={(e) => setReservation((prev) => ({ ...prev, note: e.target.value }))}
              rows="4"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="Any preferences or requests"
            />
          </label>

          <button type="submit" className="md:col-span-2 rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:brightness-110">
            Confirm Reservation
          </button>
        </form>

        {success && (
          <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-700">
            {success}
          </div>
        )}
      </section>
    </main>
  );
};

export default Reservations;

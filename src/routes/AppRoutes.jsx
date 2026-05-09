import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import About from '../pages/About';
import Offers from '../pages/Offers';
import Reservations from '../pages/Reservations';
import Contact from '../pages/Contact';
import Checkout from '../pages/Checkout';
import Payment from '../pages/Payment';
import OrderConfirmation from '../pages/OrderConfirmation';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="menu" element={<Menu />} />
      <Route path="about" element={<About />} />
      <Route path="offers" element={<Offers />} />
      <Route path="reservations" element={<Reservations />} />
      <Route path="contact" element={<Contact />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="payment" element={<Payment />} />
      <Route path="order-confirmation" element={<OrderConfirmation />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AppRoutes;

import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartSidebar from '../components/cart/CartSidebar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#FFF8E7] text-slate-900">
      <Navbar />
      <div className="relative xl:pr-[28rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
        <CartSidebar />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';
import './index.css';

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  </BrowserRouter>
);

export default App;

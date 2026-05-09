import { createContext, useEffect, useMemo, useState } from 'react';
import { offers, freeDeliveryThreshold, deliveryCharge } from '../data/offersData';

export const CartContext = createContext(null);

const buildOrderId = () => `RHINO-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

const calculateDiscount = (couponCode, subtotal) => {
  if (!couponCode) return 0;
  const coupon = offers.find((offer) => offer.code === couponCode);
  if (!coupon || subtotal < coupon.minOrder) return 0;

  if (coupon.type === 'percentage') {
    return Math.min(Math.round(subtotal * coupon.discount / 100), coupon.maxDiscount);
  }
  if (coupon.type === 'flat') {
    return coupon.discount;
  }
  if (coupon.type === 'delivery') {
    return Math.min(deliveryCharge, coupon.discount);
  }
  return 0;
};

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => readStorage('rhinoflame_cart', []));
  const [appliedCoupon, setAppliedCoupon] = useState(() => localStorage.getItem('rhinoflame_coupon') || null);
  const [customerInfo, setCustomerInfo] = useState(() => readStorage('rhinoflame_customer', { name: '', address: '', phone: '' }));
  const [paymentMethod, setPaymentMethod] = useState(() => localStorage.getItem('rhinoflame_payment') || 'esewa');
  const [orderId, setOrderId] = useState(() => localStorage.getItem('rhinoflame_orderId') || '');
  const [orderComplete, setOrderComplete] = useState(() => localStorage.getItem('rhinoflame_orderComplete') === 'true');
  const [lastOrder, setLastOrder] = useState(() => readStorage('rhinoflame_lastOrder', null));

  useEffect(() => {
    localStorage.setItem('rhinoflame_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('rhinoflame_coupon', appliedCoupon);
    } else {
      localStorage.removeItem('rhinoflame_coupon');
    }
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('rhinoflame_customer', JSON.stringify(customerInfo));
  }, [customerInfo]);

  useEffect(() => {
    localStorage.setItem('rhinoflame_payment', paymentMethod);
  }, [paymentMethod]);

  useEffect(() => {
    localStorage.setItem('rhinoflame_orderId', orderId);
    localStorage.setItem('rhinoflame_orderComplete', orderComplete ? 'true' : 'false');
    if (lastOrder) {
      localStorage.setItem('rhinoflame_lastOrder', JSON.stringify(lastOrder));
    }
  }, [orderId, orderComplete, lastOrder]);

  const cartItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const taxAmount = useMemo(() => Math.round(cartSubtotal * 0.05), [cartSubtotal]);
  const effectiveDeliveryCharge = useMemo(
    () => (cartSubtotal >= freeDeliveryThreshold || cartSubtotal === 0 ? 0 : deliveryCharge),
    [cartSubtotal],
  );
  const discountAmount = useMemo(() => calculateDiscount(appliedCoupon, cartSubtotal), [appliedCoupon, cartSubtotal]);
  const totalAmount = useMemo(
    () => Math.max(0, cartSubtotal + taxAmount + effectiveDeliveryCharge - discountAmount),
    [cartSubtotal, taxAmount, effectiveDeliveryCharge, discountAmount],
  );

  const addToCart = (dish) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) => (item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setCart((prev) => prev.filter((item) => item.id !== dishId));
  };

  const updateQuantity = (dishId, quantity) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === dishId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const applyCoupon = (code) => {
    const coupon = offers.find((offer) => offer.code === code.trim().toUpperCase());
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (cartSubtotal < coupon.minOrder) {
      return { success: false, message: `Minimum order ₹${coupon.minOrder} required.` };
    }
    setAppliedCoupon(coupon.code);
    return { success: true, message: `Coupon ${coupon.code} applied.` };
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const completeOrder = () => {
    const orderReference = buildOrderId();
    setOrderId(orderReference);
    setLastOrder({
      id: orderReference,
      items: cart,
      subtotal: cartSubtotal,
      tax: taxAmount,
      deliveryFee: effectiveDeliveryCharge,
      discount: discountAmount,
      total: totalAmount,
      customer: customerInfo,
      paymentMethod,
      completedAt: new Date().toISOString(),
    });
    setOrderComplete(true);
    clearCart();
    return orderReference;
  };

  const resetOrder = () => {
    setOrderId('');
    setOrderComplete(false);
    setLastOrder(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        cartSubtotal,
        taxAmount,
        discountAmount,
        deliveryFee: effectiveDeliveryCharge,
        totalAmount,
        appliedCoupon,
        customerInfo,
        paymentMethod,
        orderId,
        orderComplete,
        lastOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        setCustomerInfo,
        setPaymentMethod,
        completeOrder,
        resetOrder,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

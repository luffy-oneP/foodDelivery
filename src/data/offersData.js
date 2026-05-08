export const offers = [
  {
    id: 1,
    code: "RHINO10",
    title: "Welcome to Rhino Flame",
    description: "10% off on your first order",
    discount: 10,
    type: "percentage",
    minOrder: 300,
    maxDiscount: 200,
    expiry: "2026-06-30",
    icon: "🦏",
  },
  {
    id: 2,
    code: "CHITWAN20",
    title: "Chitwan Special",
    description: "20% off on Tharu & BBQ dishes",
    discount: 20,
    type: "percentage",
    minOrder: 500,
    maxDiscount: 400,
    expiry: "2026-06-30",
    icon: "🔥",
  },
  {
    id: 3,
    code: "BBQ30",
    title: "BBQ Bonanza",
    description: "Flat ₹300 off on orders above ₹1500",
    discount: 300,
    type: "flat",
    minOrder: 1500,
    maxDiscount: 300,
    expiry: "2026-06-30",
    icon: "🍖",
  },
  {
    id: 4,
    code: "FREE50",
    title: "Free Delivery",
    description: "Free delivery on orders above ₹500",
    discount: 50,
    type: "delivery",
    minOrder: 500,
    maxDiscount: 50,
    expiry: "2026-06-30",
    icon: "🚚",
  },
];

export const bestSellers = [1, 6, 9];
export const recommended = [2, 5, 10];
export const freeDeliveryThreshold = 500;
export const deliveryCharge = 50;

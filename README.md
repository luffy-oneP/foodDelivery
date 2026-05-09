You are a senior React.js architect and production UI engineer.

You are working on an EXISTING food delivery application called:

Rhino Flame Kitchen & Bar
Location: Gaindakot, Chitwan, Nepal

IMPORTANT:
This is an EXISTING WORKING application.
You must REFACTOR and SCALE it professionally WITHOUT breaking anything.

====================================================
CRITICAL RULES
====================================================

DO NOT:
- rewrite entire project
- break existing features
- remove cart functionality
- remove checkout flow
- remove payment flow
- remove dish modal
- change current UI logic unnecessarily
- create syntax/runtime errors
- create duplicate states
- break TailwindCSS
- break responsiveness

DO:
- preserve current functionality
- improve architecture
- improve maintainability
- improve routing
- improve UI/UX
- make app scalable
- use reusable components
- keep code production-ready

====================================================
MAIN TASKS
====================================================

1. Convert current single-page app into MULTI-PAGE APP using React Router.

2. Create professional scalable folder structure.

3. Fix ugly horizontal scrollbar in categories section.

4. Move all sections into separate pages.

5. Preserve global cart state across routes.

6. Improve mobile responsiveness.

7. Improve overall UI/UX.

====================================================
ROUTING STRUCTURE
====================================================

Create these routes:

/
/menu
/about
/offers
/reservations
/contact
/checkout
/payment
/order-confirmation

====================================================
NEW PROJECT STRUCTURE
====================================================

src/
 ├── assets/
 ├── components/
 │    ├── layout/
 │    ├── cart/
 │    ├── menu/
 │    ├── home/
 │    ├── common/
 │    └── ui/
 │
 ├── pages/
 │    ├── Home.jsx
 │    ├── Menu.jsx
 │    ├── About.jsx
 │    ├── Offers.jsx
 │    ├── Reservations.jsx
 │    ├── Contact.jsx
 │    ├── Checkout.jsx
 │    ├── Payment.jsx
 │    └── OrderConfirmation.jsx
 │
 ├── context/
 │    └── CartContext.jsx
 │
 ├── data/
 │    ├── menuData.js
 │    ├── restaurantData.js
 │    ├── testimonials.js
 │    └── offers.js
 │
 ├── routes/
 │    └── AppRoutes.jsx
 │
 ├── layouts/
 │    └── MainLayout.jsx
 │
 ├── hooks/
 ├── utils/
 ├── App.jsx
 └── main.jsx

====================================================
SCROLLBAR FIX
====================================================

Current category tabs have ugly scrollbar.

Fix professionally:
- hide scrollbar
- smooth mobile scrolling
- proper spacing
- modern category pills
- responsive wrapping on desktop

Use CSS:
- scrollbar-width: none
- ::-webkit-scrollbar { display: none }

Ensure:
- no horizontal overflow
- no layout breaking

====================================================
GLOBAL STATE MANAGEMENT
====================================================

Use:
- React Context API

Create:
CartContext.jsx

Cart must persist across pages:
- add to cart
- remove
- quantity update
- checkout
- payment
- confirmation

====================================================
SHARED LAYOUT
====================================================

Create reusable:
- Navbar
- Footer
- Cart Sidebar

Navbar:
- sticky
- responsive
- mobile menu
- active route highlight
- animated transitions

====================================================
PAGE REQUIREMENTS
====================================================

HOME PAGE:
- hero section
- featured dishes
- testimonials
- CTA sections
- restaurant highlights

MENU PAGE:
- all dishes
- filters
- search
- categories
- dish modal
- add to cart

ABOUT PAGE:
- restaurant story
- chef section
- Chitwan-inspired branding
- image gallery

OFFERS PAGE:
- promo codes
- combo meals
- discounts
- free delivery offers

RESERVATION PAGE:
- reservation form
- guest count
- date/time picker
- booking success UI

CONTACT PAGE:
- contact form
- map section
- address
- phone
- social links

CHECKOUT PAGE:
- cart summary
- delivery details
- coupon system
- order summary

PAYMENT PAGE:
- Nepal payment methods:
  - eSewa
  - Khalti
  - IME Pay
  - ConnectIPS
  - Cash on Delivery

ORDER CONFIRMATION PAGE:
- order tracking
- animated progress
- estimated delivery
- order summary

====================================================
UI/UX REQUIREMENTS
====================================================

Design inspiration:
- Uber Eats
- Foodmandu
- Zomato
- Swiggy

Style:
- premium
- modern
- glassmorphism
- smooth animations
- gradients
- responsive

Color Palette:
- Primary: #D62828
- Secondary: #F77F00
- Accent: #2A9D8F
- Dark: #1D1D1D
- Light: #FFF8E7

====================================================
PERFORMANCE REQUIREMENTS
====================================================

Use:
- React.memo
- useMemo
- lazy loading
- reusable hooks

Avoid:
- unnecessary re-renders
- duplicated state
- prop drilling

====================================================
IMPORTANT CHECKOUT FLOW RULES
====================================================

If cart is empty:
- redirect away from checkout/payment

If payment incomplete:
- cannot access confirmation page

====================================================
FINAL OUTPUT FORMAT
====================================================

1. Explain architecture changes first
2. Then provide all new files
3. Provide updated App.jsx
4. Provide CartContext.jsx
5. Provide router setup
6. Provide folder structure
7. Provide reusable components
8. Provide scrollbar CSS fix
9. Ensure all imports are correct
10. Ensure code is copy-paste ready
11. Ensure NO syntax errors
12. Ensure app runs immediately

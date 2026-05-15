<div align="center">

# 🛍️ Ecommerce Frontend

A modern, full-featured e-commerce storefront built with **Nuxt 4** and **Vue 3**, powered by a **Laravel 13** REST API backend.

[![Nuxt](https://img.shields.io/badge/Nuxt-4.x-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Pinia](https://img.shields.io/badge/Pinia-3.x-F7DC6F?style=for-the-badge&logo=pinia&logoColor=black)](https://pinia.vuejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Pages & Routes](#-pages--routes)
- [Architecture](#-architecture)
- [Deployment](#-deployment)

---

## 🌐 Overview

This is the frontend application for a clothing e-commerce platform. It provides a complete shopping experience — from browsing catalogs and filtering products, to managing a persistent cart, completing checkout with address management, and authenticating via a token-based system.

The app is designed to be fast, clean, and mobile-responsive, with a light-mode-first aesthetic powered by **Nuxt UI v4**.

---

## ✨ Features

### 🗂️ Catalog & Products
- Browse products grouped by **catalog/category**
- Filter by **availability** (in stock / out of stock) and **price range**
- **Sort** by name (A–Z, Z–A), price, or date
- Dual-image hover effect on product cards
- **Sold out** badge overlay on unavailable items

### 🔍 Product Detail
- Image **carousel** with thumbnail navigation
- **Color** and **size** variant selector
- Per-variant **stock awareness** (disables sold-out sizes)
- Quantity input with stock cap enforcement
- Smooth image switching when changing color variants
- **Size chart** image appended to carousel

### 🛒 Cart
- Persistent cart via **localStorage** (survives page refreshes)
- Slide-over cart panel in the navbar
- Update quantity or remove items inline
- Real-time **item count badge** and **total price** display
- Direct link to checkout from the cart

### 💳 Checkout
- Multi-section collapsible form: **Contact → Delivery → Shipping → Payment**
- Full **Zod schema validation** on submission
- Authenticated users see their **saved addresses** with radio selection
- Inline address **add / edit** via slideover panels
- Optional **billing address** (defaults to same as shipping)
- Shipping option selector with live cost calculation
- Mobile-friendly **order summary** accordion + desktop sticky sidebar

### 👤 Authentication & Profile
- **Cookie-based** auth token (`auth_token`)
- Route middleware guards: `auth` (protect) and `guest` (redirect if logged in)
- Profile page with user info and up to **4 saved addresses**
- Add, edit, delete, and set **default addresses**
- Logout from navbar, profile page, or checkout contact section

### 🎨 UI / UX
- Built entirely with **Nuxt UI v4** components
- Responsive layout — mobile-first with breakpoint-aware grids
- Light color mode enforced globally
- Toast notifications for all user actions (cart, auth, address CRUD)
- Custom debounce composable for price filter inputs

---

## 🧰 Tech Stack

| Category | Library / Tool |
|---|---|
| **Framework** | [Nuxt 4](https://nuxt.com) + [Vue 3](https://vuejs.org) |
| **Language** | TypeScript |
| **UI Components** | [@nuxt/ui v4](https://ui.nuxt.com) (Tailwind CSS) |
| **State Management** | [Pinia](https://pinia.vuejs.org) |
| **Form Validation** | [Zod](https://zod.dev) |
| **Image Optimization** | [@nuxt/image](https://image.nuxt.com) |
| **Font Loading** | [@nuxt/fonts](https://fonts.nuxt.com) |
| **Email (server)** | [Resend](https://resend.com) |
| **Package Manager** | [pnpm](https://pnpm.io) |
| **Backend API** | Laravel 13 (separate repo) |

---

## 📁 Project Structure

```
ecommerce-frontend/
├── app/
│   ├── app.vue                     # Root component
│   ├── error.vue                   # Global error page
│   ├── app.config.ts               # App-level config
│   │
│   ├── assets/
│   │   └── css/main.css            # Global CSS entry point
│   │
│   ├── components/
│   │   ├── AppNavbar.vue           # Top navigation + cart slideover
│   │   ├── AppFooter.vue           # Footer with tech stack badges
│   │   ├── AppFooterLink.vue       # Reusable footer link
│   │   ├── AddressForm.vue         # Create / edit / delete address form
│   │   └── checkout/
│   │       ├── CheckoutContactSection.vue   # Email / signed-in user display
│   │       ├── CheckoutDeliverySection.vue  # Address selection or manual entry
│   │       ├── CheckoutShippingSection.vue  # Courier + service picker
│   │       ├── CheckoutPaymentSection.vue   # Billing address toggle
│   │       ├── CheckoutOrderSummary.vue     # Desktop sticky sidebar
│   │       └── CheckoutMobileSummary.vue    # Mobile accordion summary
│   │
│   ├── composables/
│   │   ├── useApi.ts               # useFetch wrapper with auth headers
│   │   ├── useCheckoutForm.ts      # Form state, address sync, shipping cost
│   │   ├── useCheckoutUser.ts      # Current user, saved addresses, logout
│   │   └── useDebounce.ts          # Generic debounce for reactive refs
│   │
│   ├── constant/
│   │   └── index.ts                # Countries, Provinces, Shipping options
│   │
│   ├── layouts/
│   │   └── default.vue             # AppNavbar + <slot> + AppFooter
│   │
│   ├── middleware/
│   │   ├── auth.ts                 # Redirect to /login if no token
│   │   └── guest.ts                # Redirect to /profile if already logged in
│   │
│   ├── pages/
│   │   ├── index.vue               # Redirects → /catalogs
│   │   ├── about/                  # Project info page
│   │   ├── contact/                # Contact / message page
│   │   ├── gallery/                # Photo gallery page
│   │   ├── authentication/
│   │   │   ├── index.vue           # Redirects → /authentication/login
│   │   │   ├── login/              # Login page
│   │   │   └── callback/           # OAuth callback handler
│   │   ├── catalogs/
│   │   │   ├── index.vue           # All catalogs grid
│   │   │   └── [slug].vue          # Products by catalog + filter/sort
│   │   ├── products/
│   │   │   ├── index.vue           # All products listing
│   │   │   └── [slug].vue          # Product detail + variant picker
│   │   ├── checkout/
│   │   │   └── index.vue           # Full checkout flow
│   │   └── profile/
│   │       └── index.vue           # User info + address management
│   │
│   ├── stores/
│   │   └── cart.ts                 # Pinia cart store (localStorage-backed)
│   │
│   ├── types/
│   │   ├── api.ts                  # ApiResponse<T> wrapper type
│   │   ├── address.ts              # AddressSchema (Zod) + Address types
│   │   ├── cart.ts                 # CartItem interface
│   │   ├── category.ts             # Catalog interface
│   │   ├── checkout.ts             # CheckoutFormSchema + ShippingOption
│   │   ├── me.ts                   # User interface
│   │   └── product.ts              # Product + Variation interfaces
│   │
│   └── utils/
│       └── currency.ts             # formatCurrency (IDR formatter)
│
├── public/                         # Static assets
├── server/                         # Nuxt server routes (e.g. contact email)
├── nuxt.config.ts                  # Nuxt configuration
├── tsconfig.json                   # TypeScript config
└── pnpm-lock.yaml
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 8.x — install with `npm install -g pnpm`
- A running instance of the **Laravel backend** (or a reachable API base URL)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ndrvndr/ecommerce-frontend.git
cd ecommerce-frontend

# 2. Install dependencies
pnpm install

# 3. Copy and configure environment variables
cp .env.example .env
```

### Development

```bash
pnpm dev
```

The app will be available at **http://localhost:3000**.

### Production Build

```bash
# Build for production
pnpm build

# Preview the production build locally
pnpm preview
```

### Other Commands

```bash
# Generate static site
pnpm generate

# Regenerate Nuxt type declarations
pnpm postinstall
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
# Base URL of the Laravel API (no trailing slash)
NUXT_PUBLIC_API_BASE=http://localhost:8000/api

# Resend API key — used by server routes for sending emails (e.g. contact form)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `NUXT_PUBLIC_API_BASE` | ✅ | `http://localhost:8000/api` | Laravel API base URL |
| `RESEND_API_KEY` | ⚠️ server only | — | Resend key for transactional emails |

> `NUXT_PUBLIC_*` variables are exposed to the browser. Never put secrets in public variables.

---

## 🗺️ Pages & Routes

| Route | Auth Required | Description |
|---|---|---|
| `/` | ❌ | Redirects to `/catalogs` |
| `/catalogs` | ❌ | Grid of all product catalogs |
| `/catalogs/:slug` | ❌ | Products within a catalog, with filtering & sorting |
| `/catalogs/all-products` | ❌ | All products across all catalogs |
| `/products/:slug` | ❌ | Product detail page |
| `/checkout` | ❌ | Checkout form (enhanced for logged-in users) |
| `/profile` | ✅ | User info and address management |
| `/authentication/login` | 🚫 (guest only) | Login page |
| `/authentication/callback` | ❌ | OAuth redirect handler |
| `/contact` | ❌ | Contact / message form |
| `/gallery` | ❌ | Photo gallery |
| `/about` | ❌ | Project info page |

> ✅ = must be authenticated &nbsp;|&nbsp; 🚫 = redirects away if authenticated &nbsp;|&nbsp; ❌ = public

---

## 🏗️ Architecture

### API Layer — `useApi`

All data fetching goes through a single composable that wraps Nuxt's `useFetch`:

- Automatically prepends `NUXT_PUBLIC_API_BASE`
- Injects `Authorization: Bearer <token>` from the `auth_token` cookie when present
- Returns typed `ApiResponse<T>` with optional `data`, `links`, and `meta` pagination fields

### Cart Store — Pinia + localStorage

The cart is a Pinia store that hydrates from and persists to `localStorage` on the client:

- `addItem` — merges duplicates (same `productId` + `variantId`), respects stock cap
- `updateQuantity` — clamps to variant stock, auto-removes at qty 0
- `clearCart` — called after a successful order

### Auth Flow

1. On login, the server sets an `auth_token` cookie
2. `useApi` reads this cookie and attaches it as a Bearer token to every request
3. The `auth` middleware checks for the cookie and redirects unauthenticated users to `/authentication/login`
4. The `guest` middleware redirects logged-in users away from auth pages to `/profile`

### Checkout Architecture

The checkout page is decomposed into focused section components, each responsible for a single concern. State is managed by two composables:

- **`useCheckoutUser`** — fetches the current user and their saved addresses, handles logout
- **`useCheckoutForm`** — owns the reactive form state, watches address changes to keep the form in sync, computes shipping cost

Form validation is handled by **Zod** via `@nuxt/ui`'s `UForm` component with the full `CheckoutFormSchema`.

---

## ☁️ Deployment

| Service | Role |
|---|---|
| **Vercel** | Frontend hosting (Nuxt SSR / static) |
| **Render** | Laravel API backend hosting |
| **Neon DB** | Serverless PostgreSQL database |

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Make sure to set the `NUXT_PUBLIC_API_BASE` environment variable in your Vercel project settings to point to your production API URL.

---

<div align="center">

Made with ❤️ by [Ndre](https://andreavindra.vercel.app/) &nbsp;|&nbsp;
[LinkedIn](https://www.linkedin.com/in/ndrvndr/) &nbsp;|&nbsp;
[GitHub](https://github.com/ndrvndr/)

</div>

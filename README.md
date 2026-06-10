# Leegality Frontend Assessment

A product listing and detail web application built with **React 19**, **Vite**, **Tailwind CSS v4**, and **React Router v7**. It consumes the public [DummyJSON](https://dummyjson.com) API to display a filterable, paginated product catalogue with a product detail view.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Features](#features)
- [Assumptions Made](#assumptions-made)
- [Architectural Decisions](#architectural-decisions)
- [Improvements if Given More Time](#improvements-if-given-more-time)

---

## Setup Instructions

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later (or `yarn` / `pnpm`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Rishab-Mishra/leegality-frontend-assessment.git
cd leegality-frontend-assessment

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** (default Vite port).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build the app for production (outputs to `dist/`) |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint across all source files |

### No Environment Variables Required

The app calls the public DummyJSON API directly — no `.env` file or API keys are needed.

---

## Project Structure

```
leegality-frontend-assessment/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                    # Entry point — mounts BrowserRouter + App
    ├── App.jsx                     # Renders AppRoutes
    ├── index.css                   # Global styles + Tailwind import
    ├── routes/
    │   └── AppRoutes.jsx           # Route definitions (/ and /product/:id)
    ├── api/
    │   └── productApi.js           # Axios instance + API call functions
    ├── hooks/
    │   ├── useProducts.js          # Data-fetching hook (products + categories)
    │   ├── useProductFilter.js     # Client-side filter logic (brand, price range)
    │   ├── usePersistedFilters.js  # Filter/page state persisted to sessionStorage
    │   └── useDebounce.js          # Generic debounce hook
    ├── utils/
    │   ├── constants.js            # PRODUCTS_PER_PAGE = 8
    │   └── getUniqueBrands.js      # Derives unique brand list from products array
    ├── pages/
    │   ├── ProductListing/         # Main catalogue page
    │   └── ProductDetails/         # Individual product page
    └── components/
        ├── Header/                 # Top nav bar with search + icon buttons
        ├── FilterSidebar/          # Collapsible sidebar (category, brand, price)
        ├── ProductGrid/            # Responsive grid of ProductCards
        ├── ProductCard/            # Individual card (thumbnail, title, price, rating)
        ├── Pagination/             # Page navigation with ellipsis
        ├── Rating/                 # Star-based rating display
        ├── Loader/                 # Loading spinner
        └── ErrorState/             # Error message block
```

---

## Features

- **Product Listing** — paginated grid of products (8 per page) fetched from DummyJSON.
- **Search** — debounced (1 second) search input in the header that queries the API.
- **Filters** — collapsible sidebar with:
  - Category selection (single, from API)
  - Brand selection (single, derived client-side from loaded products)
  - Min/Max price range with an explicit Apply button
  - Clear all filters
- **Filter Persistence** — active filters and current page are saved to `sessionStorage` so they survive page refreshes within the same tab session.
- **Pagination** — smart page navigator with ellipsis for large page counts.
- **Product Detail** — clicking a card navigates to `/product/:id` which fetches and displays full product info, description, and reviews.
- **Responsive Layout** — the filter sidebar converts to a slide-in drawer on mobile, with a backdrop overlay.
- **Accessibility** — ARIA labels on interactive elements, `aria-current` on active pagination button, keyboard navigation on product cards (`Enter`/`Space`).
- **Error & Loading States** — dedicated components for loading spinner and error messages.

---

## Assumptions Made

1. **DummyJSON as the data source.** The assessment did not specify a backend, so the free public DummyJSON API (`https://dummyjson.com`) was used. It provides realistic product, category, and review data with no authentication.

2. **Server-side search/category filtering, client-side brand/price filtering.** The DummyJSON API supports `/products/search` and `/products/category/:slug` natively, so those filters are applied at the API level. Brand and price filters are not supported server-side and are therefore applied client-side using `useProductFilter`.

3. **Single-select for category and brand.** The assessment did not specify multi-select, so selecting a second item deselects the first, keeping state simple.

4. **sessionStorage over localStorage for filter persistence.** Filters reset when the browser session ends (tab closed), which is appropriate for a shopping flow — users generally do not expect search state to persist across separate sessions.

5. **No authentication or cart functionality.** The cart, favourites, and account buttons in the header are UI-only placeholders, consistent with a frontend assessment scope.

6. **8 products per page.** Chosen as a balanced default that produces a reasonable grid layout on both desktop and mobile without excessive scrolling.

7. **Brand list is derived from the current page's products.** Since the API does not have a dedicated brands endpoint, brands are extracted client-side. This means the brand list changes as the category or page changes, which is intentional behaviour for this scope.

---

## Architectural Decisions

### Custom Hooks for Separation of Concerns

All data-fetching and stateful logic lives in purpose-built hooks (`useProducts`, `useProductFilter`, `usePersistedFilters`, `useDebounce`) rather than inside page components. This keeps components declarative and makes logic independently testable.

### Centralised API Layer (`src/api/productApi.js`)

A single Axios instance with a shared `baseURL` is created once and reused. All API calls are named exports (`getProducts`, `getProductById`, `getCategories`), making it straightforward to swap the base URL or add auth headers in one place.

### Abort Controller for Fetch Cancellation

`useProducts` creates an `AbortController` per effect run and cancels the in-flight request on cleanup. This prevents stale responses from overwriting state when the user types quickly or changes pages rapidly.

### Debounced Search

A reusable `useDebounce` hook delays the API call by 1 second after the user stops typing. This reduces unnecessary network requests while keeping the search feel responsive.

### Filter State in sessionStorage

`usePersistedFilters` encapsulates all read/write logic for `sessionStorage`. The rest of the app treats it as a plain React state hook, with no awareness of the storage layer — making it easy to swap for `localStorage` or URL query params later.

### CSS Modules per Component (Scoped CSS Files)

Each component owns its own `.css` file (e.g., `FilterSidebar.css`, `ProductCard.css`). This avoids class name collisions and makes styles easy to locate alongside the component they belong to. Global styles and Tailwind utilities live in `index.css`.

### Two-Level Routing

React Router v7 with `BrowserRouter` handles two routes: the listing page (`/`) and the detail page (`/product/:id`). This is intentionally minimal for the assessment scope — extending to nested layouts is straightforward.

### Price Filter with Explicit Apply Step

The price inputs maintain a local draft state (`priceDraft`) inside `FilterSidebar` and only propagate the values to the parent on "Apply". This prevents mid-input API calls and a jarring user experience when typing decimal prices.

---

## Improvements if Given More Time

### 1. TypeScript Migration
Converting the codebase to TypeScript would add compile-time safety, improve IDE autocomplete, and make the prop contracts for each component explicit. The project already includes `@types/react` and `@types/react-dom` in `devDependencies`, so the infrastructure is partially in place.

### 2. URL-Based Filter State
Storing filters as URL query parameters (e.g., `?category=laptops&brand=Apple&page=2`) instead of `sessionStorage` would make filtered views shareable via link and make the browser's back/forward buttons work naturally with filter changes.

### 3. Infinite Scroll or Virtual List
For large product catalogues, replacing pagination with infinite scroll (via `IntersectionObserver`) or a virtualised list (e.g., `@tanstack/react-virtual`) would improve perceived performance and reduce the number of user interactions needed to browse products.

### 4. Global State / React Query
As complexity grows, replacing the manual `useState`/`useEffect` data-fetching pattern with a dedicated data-fetching library like **TanStack Query (React Query)** would add automatic caching, background refetching, request deduplication, and a cleaner API surface — eliminating the need to hand-roll abort controller and loading/error state logic.

### 5. Image Optimisation
Product thumbnails are loaded directly from the API without any optimisation. Implementing lazy loading more broadly, adding `srcSet` / `sizes` attributes, or routing images through a CDN transform (e.g., Cloudflare Image Resizing) would improve LCP on slower connections.

### 6. Multi-Select Filters
Currently only one category and one brand can be selected at a time. Real e-commerce UX typically allows multiple selections per filter group, which would require converting the filter state for those fields from a string to an array.

### 7. Unit and Integration Tests
There are no automated tests. Adding **Vitest** for unit tests (hooks and utility functions) and **React Testing Library** for component integration tests would catch regressions. Key candidates: `useProductFilter`, `useDebounce`, `Pagination`, and `FilterSidebar`.

### 8. Error Boundary
Wrapping the route tree in a React Error Boundary would gracefully catch unexpected render errors and show a fallback UI rather than a blank screen.

### 9. Skeleton Loading UI
Replacing the generic spinner with product-card-shaped skeleton loaders would reduce perceived loading time and provide a more polished user experience during API fetches.

### 10. Accessibility Audit
While basic ARIA attributes are in place, a full `axe-core` or Lighthouse accessibility audit would surface any remaining issues (focus trapping in the mobile sidebar drawer, colour contrast ratios, etc.) for a production-ready result.

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| React | 19 | UI library |
| Vite | 8 | Build tool & dev server |
| React Router | 7 | Client-side routing |
| Tailwind CSS | 4 | Utility-first CSS |
| Axios | 1.x | HTTP client |
| DummyJSON | — | Mock product API |

# URL State Product Filters

This Vite + React + TypeScript example demonstrates how product filters can live in the browser URL instead of only in component state. A URL such as `/?search=Product%202&category=second&maxPrice=500` can be bookmarked, shared, refreshed, and restored without losing the selected filters.

## Run the project

From this directory:

```bash
npm install
npm run dev
```

Other scripts:

- `npm run build` runs TypeScript project checks and creates a Vite production build.
- `npm run lint` checks the source files with ESLint.
- `npm run preview` serves the production build locally.

## Implementation flow

1. `src/components/ProductList/ProductListFilters.tsx` reads the current URL filters, displays the search/category/price controls, and writes user changes back through the custom hook.
2. `src/hooks/useDebounce.ts` delays search updates by 500 ms so every keystroke does not immediately update the URL or trigger filtering.
3. `src/hooks/useProductFilter.ts` parses `search`, `category`, and `maxPrice` from `useSearchParams`, then exposes `setFilters` for updating those query parameters.
4. `src/api/products.ts` receives the filter object and applies the matching search, category, and maximum-price rules.
5. `src/components/ProductList/ProuctList.tsx` is a presentational component that renders the products it receives. It does not own filter or data-fetching state.

## File guide

| File                                                | Responsibility                                                  |
| --------------------------------------------------- | --------------------------------------------------------------- |
| `src/types/product.ts`                              | Shared `Product` type and allowed categories.                   |
| `src/api/data/products.ts`                          | Local sample product records that stand in for an API response. |
| `src/api/products.ts`                               | Filter type and simulated asynchronous product lookup.          |
| `src/hooks/useDebounce.ts`                          | Generic delayed-value hook for inputs such as search.           |
| `src/hooks/useProductFilter.ts`                     | URL query-string read/write behavior for product filters.       |
| `src/components/ProductList/ProductListFilters.tsx` | Filter controls and debounced search integration.               |
| `src/components/ProductList/ProuctList.tsx`         | Product card list presentation.                                 |
| `src/main.tsx`                                      | Router and React Query provider setup.                          |
| `src/App.tsx`                                       | Current Vite starter screen and application mount point.        |

## Query parameters

| Parameter  | Example     | Meaning                                               |
| ---------- | ----------- | ----------------------------------------------------- |
| `search`   | `Product 2` | Case-insensitive product-name search.                 |
| `category` | `first`     | Restricts results to `first`, `second`, or `third`.   |
| `maxPrice` | `500`       | Keeps products priced at or below the selected value. |

## `@/` import alias

Imports beginning with `@/` point to the `src` directory. The alias is configured in both places that need to understand it:

- `tsconfig.app.json` maps `@/*` to `./src/*` for TypeScript and editor tooling.
- `vite.config.ts` maps `@` to the absolute `src` directory for the development server and production bundler.

This allows imports such as:

```ts
import { ProductFilters } from "@/api/products";
import { useProductFilters } from "@/hooks/useProductFilter";
```

## Current integration status

The reusable URL-state product components and data flow are implemented, but the default `App.tsx` still renders the generated Vite starter screen. To display the product example, mount `ProductListFilters` and `ProductList` from `App.tsx`, then pass the result of `fetchProducts` into `ProductList`.

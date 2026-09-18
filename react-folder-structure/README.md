# React Folder Structure

A React 19 and TypeScript project built with Vite. This project demonstrates a feature-oriented folder structure for keeping UI components, pages, reusable hooks, services, and utility functions organized as an application grows.

## Project Structure

```text
react-folder-structure/
├── public/                  # Static files served as-is
├── src/
│   ├── assets/              # Images and other imported assets
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Shared UI building blocks
│   │   └── DeleteAccountModal.tsx
│   ├── hooks/               # Reusable custom React hooks
│   │   ├── useCountDown.ts
│   │   ├── useCurrentUser.ts
│   │   ├── useDebounce.ts
│   │   └── useEffectAfterMount.ts
│   ├── pages/               # Page-level screens and route groups
│   │   ├── (logged-in)/     # Screens that require authentication
│   │   └── LoginScreen.tsx
│   ├── services/            # Application and external-service logic
│   │   ├── api/             # API clients and requests
│   │   ├── i18n/            # Internationalization setup
│   │   ├── providers/       # Shared service providers
│   │   └── state/           # Application state management
│   ├── utils/               # Small, reusable helper functions
│   │   ├── formatting.ts
│   │   └── helper.ts
│   ├── App.tsx              # Root application component
│   ├── App.css              # App-specific styles
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Folder Responsibilities

- **`components`** contains reusable presentation components that can be shared by multiple pages.
- **`hooks`** contains custom hooks that encapsulate reusable stateful or lifecycle behavior.
- **`pages`** contains complete screens. The `(logged-in)` folder groups pages that belong to an authenticated part of the application.
- **`services`** contains integrations and application-wide concerns such as API calls, localization, providers, and state.
- **`utils`** contains stateless helpers that do not depend on React rendering.
- **`assets`** contains images and other files imported by the application.

## Getting Started

From this directory, install dependencies and start the development server:

```bash
npm install
npm run dev
```

The app is served by Vite with hot module replacement enabled. The current `App.tsx` contains the starter screen and can be replaced as the example application is developed.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Type-check and create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build locally
```

## Technology

- React 19
- TypeScript
- Vite
- ESLint

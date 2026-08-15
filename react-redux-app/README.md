# 🔥 React Redux Toolkit (RTK) Complete Guide

> A quick-reference, step-by-step guide to setting up and managing global state in React with Redux Toolkit.

---

## 📋 Table of Contents

1. [Installation](#-step-1-install-dependencies)
2. [Tailwind CSS Setup](#-tailwind-css-setup)
3. [Create Redux Store](#-step-2-create-the-redux-store)
4. [Provide Store to React](#-step-3-provide-the-store-to-react)
5. [Create a Slice](#-step-4-create-a-slice)
6. [Connect to Components](#-step-5-connect-state-and-actions-to-components)
7. [API Cheatsheet](#-cheatsheet-api-summary)

---

## 📦 Step 1: Install Dependencies

Run the following command in your project terminal to install Redux Toolkit and the React bindings:

```bash
npm install @reduxjs/toolkit react-redux
```

---

## � Tailwind CSS Setup

Tailwind CSS provides a utility-first CSS framework for rapidly building custom designs. Follow these steps to set it up:

### Step A: Install Tailwind CSS & Vite Plugin

Install Tailwind CSS and the official Vite plugin:

```bash
npm install tailwindcss @tailwindcss/vite
```

### Step B: Configure Vite Plugin

Update your `vite.config.js` to include the Tailwind CSS plugin:

**File:** `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### Step C: Import Tailwind in Your CSS

Add the Tailwind CSS import to your main CSS file:

**File:** `src/index.css`

```css
@import "tailwindcss"
```

### Step D: Start Using Tailwind Classes

Now you can use Tailwind utility classes in your components:

```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello Tailwind!
</div>
```

> **💡 Tip:** Tailwind v4 uses the new `@import "tailwindcss"` syntax. Check the [Tailwind Docs](https://tailwindcss.com) for all available utility classes!

---

## �🏪 Step 2: Create the Redux Store

Create a central file named `store.js` (typically inside `src/app/`). This automatically configures the Redux DevTools extension.

**File:** `src/app/store.js`

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Connects your slice to the global store
  },
});
```

---

## 🎁 Step 3: Provide the Store to React

Open your application entry point file (e.g., `main.jsx` or `index.js`). Wrap the root `<App />` component inside the React-Redux `<Provider>` and pass your store configuration.

**File:** `src/main.jsx`

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

## 🧩 Step 4: Create a Slice

A slice packages the initial state, action creators, and reducer logic for a distinct feature into a single file (e.g., `counterSlice.js` inside `src/features/`).

> **💡 Note:** RTK leverages the **Immer** library under the hood, enabling you to safely write clean, 'mutating' state logic directly.

**File:** `src/features/counterSlice.js`

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload; // payload holds incoming data
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

---

## ⚡ Step 5: Connect State and Actions to Components

In your functional components, use `useSelector` to safely read state out of the global store, and `useDispatch` to dispatch actions.

**File:** `src/components/CounterComponent.jsx`

```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../features/counterSlice';

export function CounterComponent() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Add 5</button>
    </div>
  );
}
```

---

## 📚 Cheatsheet: API Summary

| API | Description |
|-----|-------------|
| **`configureStore()`** | Automates store setup, combines split reducers, and includes default middleware. |
| **`createSlice()`** | Combines your initial state and reducer mapping to auto-generate matching action creators and action types. |
| **`useSelector()`** | Custom hook that extracts, monitors, and returns explicit data nodes from the store state tree. |
| **`useDispatch()`** | Custom hook providing runtime context access to the dispatch method to trigger store state modifications. |

---

## 🚀 Quick Reference

- **State Management:** Redux Toolkit handles complex state logic
- **Immutability:** Immer library manages immutable updates automatically
- **DevTools:** Built-in Redux DevTools integration for debugging
- **Best Practices:** Slices organize features into modular, reusable units

---

<div align="center">

**Happy Redux Coding! 🎉**

</div>
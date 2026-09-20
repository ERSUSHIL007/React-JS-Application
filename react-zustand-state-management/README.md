# Zustand State Management with React and TypeScript

This project demonstrates lightweight global state management with [Zustand](https://zustand.docs.pmnd.rs/) in a React and TypeScript application. The example stores a counter, exposes synchronous and asynchronous actions, and connects the store to React components through selectors.

## What Zustand provides

Zustand is a small state-management library built around a store created with the `create` function. A store contains state and the functions that update it. React components subscribe to only the state they select.

Compared with a traditional Redux setup, Zustand does not require reducers, action type constants, a provider component, or a separate dispatch API for basic state updates. The store hook can be imported directly wherever it is needed.

## Features demonstrated

- A typed Zustand store written in TypeScript
- A numeric `count` state value
- Synchronous `increment` and `decrement` actions
- An asynchronous `incrementAsync` action
- Selector-based subscriptions in React components
- Reading store state outside React with `getState()`
- Updating store state outside React with `setState()`
- A simple responsive visual treatment for the counter controls

## Installation and scripts

From this directory, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Available scripts:

```bash
npm run dev      # Start Vite in development mode
npm run build    # Type-check and create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build locally
```

## Project structure

```text
src/
  state/
    store.ts       # Typed Zustand store, state, and actions
  App.tsx          # Selects store values and renders the counter UI
  index.css        # Layout and button styling
  main.tsx         # React entry point and stylesheet import
```

## The data flow

```text
useCounterStore selector
          |
          v
      Zustand store
     /             \
state: count      actions: increment, decrement, incrementAsync
          |
          v
Component re-renders when its selected value changes
```

## 1. Install Zustand

The project depends on the `zustand` package:

```bash
npm install zustand
```

The React integration is included in the main package, so no provider or additional React binding package is required.

## 2. Define a typed store

The store lives in `src/state/store.ts`:

```ts
import { create } from "zustand";

type CounterStore = {
  count: number;
  increment: () => void;
  incrementAsync: () => Promise<void>;
  decrement: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  incrementAsync: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ count: state.count + 1 }));
  },
  decrement: () => {
    set((state) => ({ count: state.count - 1 }));
  },
}));
```

### `create`

`create` receives a store initializer and returns a hook. The initializer receives `set`, which updates the store and notifies subscribed components.

Because `CounterStore` is passed as the generic type, TypeScript checks both the state shape and every action signature. For example, `incrementAsync` must return `Promise<void>` and `count` must remain a number.

### State

The initial state is:

```ts
count: 0;
```

State should contain the values that need to be shared. Derived values can usually be calculated in a selector instead of being duplicated in the store.

### Actions

Actions are functions stored alongside the state. This keeps update logic close to the data it changes:

```ts
increment: () => {
  set((state) => ({ count: state.count + 1 }));
};
```

The functional form of `set` receives the latest state. It is the safest form when the next value depends on the previous value, especially when updates can happen close together.

Zustand merges the object returned by `set` into the existing store. Returning `{ count: nextCount }` updates `count` without replacing the entire store.

## 3. Use selectors in React

`src/App.tsx` selects the count and actions from the store:

```tsx
function App() {
  const count = useCounterStore((state) => state.count);

  return <OtherComponent count={count} />;
}

const OtherComponent = ({ count }: { count: number }) => {
  const incrementAsync = useCounterStore((state) => state.incrementAsync);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div className="other-component">
      <h5>State Management - Zustand</h5>
      {count}
      <div className="counter-actions">
        <button onClick={incrementAsync}>IncrementAsync</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
};
```

A selector is the callback passed to `useCounterStore`:

```ts
useCounterStore((state) => state.count);
```

The component subscribes to the selected value rather than needing the whole store object. When `count` changes, the component re-renders. Selecting individual values is usually clearer and helps avoid updates caused by unrelated store changes.

Actions are stable store functions, so they can be selected independently:

```ts
const increment = useCounterStore((state) => state.increment);
```

## 4. Handle asynchronous actions

The `incrementAsync` action waits for one second before updating the count:

```ts
incrementAsync: async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  set((state) => ({ count: state.count + 1 }));
},
```

Zustand does not require a special async middleware. An action can be `async`, perform a request or other asynchronous work, and call `set` when the result is available.

For a real API action, production code should usually also track request status and errors:

```ts
type UserStore = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  loadUser: (id: string) => Promise<void>;
};
```

The current example intentionally keeps the async state small and uses the delay to illustrate the pattern.

## 5. Read state outside React

The component defines a `logCount` function that reads the current state without creating a React subscription:

```ts
const logCount = () => {
  const count = useCounterStore.getState().count;
  console.log("Log-Count", count);
};
```

`getState()` is useful for non-React code such as event handlers outside components, utility functions, WebSocket callbacks, or browser integrations. It should not replace selectors for rendering because it does not subscribe the caller to updates.

## 6. Update state outside React

Zustand also exposes `setState`:

```ts
useCounterStore.setState({ count: 1 });
```

This directly updates the store and notifies subscribers. Prefer named actions such as `increment` and `decrement` for normal application behavior because they keep update rules centralized and easier to change. Use `setState` for carefully controlled integration or initialization scenarios.

## 7. React lifecycle and effects

The current component calls `logCount` from `useEffect`:

```tsx
useEffect(() => {
  logCount();
});
```

With no dependency array, this effect runs after every render. That is useful as a learning example, but logging only when the selected count changes is usually more intentional:

```tsx
useEffect(() => {
  logCount();
}, [count]);
```

For side effects that should run once when the component mounts, use an empty dependency array instead. Choose the dependency list based on the effect's purpose.

## Selector patterns

### Select one value

```tsx
const count = useCounterStore((state) => state.count);
```

This is the preferred default for most components.

### Select one action

```tsx
const decrement = useCounterStore((state) => state.decrement);
```

Actions can be selected separately from the values they update.

### Select multiple values

Selecting an object creates a new object during selection. When selecting multiple values, use a shallow comparison when the project needs to avoid re-rendering for unchanged object fields:

```tsx
import { useShallow } from "zustand/react/shallow";

const { count, increment } = useCounterStore(
  useShallow((state) => ({
    count: state.count,
    increment: state.increment,
  })),
);
```

For this small example, individual selectors are simpler and are already used by the application.

## Zustand versus React state and Redux

### Zustand versus `useState`

Use React `useState` for state that belongs to one component or a small local subtree. Use Zustand when state must be shared across unrelated components or accessed by non-React code.

### Zustand versus Redux Toolkit

Both can manage shared state. Redux Toolkit provides a more structured architecture, explicit action/reducer flows, middleware conventions, and extensive tooling. Zustand has a smaller API and is often faster to introduce for focused client state.

A useful rule of thumb:

- use local React state for local UI state
- use Zustand for lightweight shared client state
- use Redux Toolkit when a larger team or application benefits from stricter conventions and event history
- use a server-state library such as RTK Query for cached API data rather than putting every API response into a hand-written client store

## Scaling this store

As the application grows, keep related state and actions together or split larger stores into slices. A feature-oriented type can look like this:

```ts
type AuthSlice = {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
};
```

For production applications, consider the Zustand middleware that matches the requirement:

- `persist` for local or session storage persistence
- `devtools` for Redux DevTools inspection
- `immer` for convenient immutable update syntax
- `subscribeWithSelector` for precise non-React subscriptions

Add middleware only when the application needs it. The current counter does not require any middleware.

## Common mistakes to avoid

- Selecting the entire store when a component only needs one field
- Using `getState()` for rendered values instead of a selector
- Replacing the store accidentally instead of returning a partial update
- Storing derived values that can be calculated from existing state
- Putting server cache and request lifecycle logic into a basic client-state store
- Starting asynchronous work without representing loading or error state when the UI needs those states
- Using an effect without dependencies when it should run only once or only after a specific value changes

## Further reading

- [Zustand documentation](https://zustand.docs.pmnd.rs/)
- [Zustand GitHub repository](https://github.com/pmndrs/zustand)
- [Zustand TypeScript guide](https://zustand.docs.pmnd.rs/guides/typescript)
- [Zustand async actions guide](https://zustand.docs.pmnd.rs/guides/async-actions)

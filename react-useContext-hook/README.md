# useContext Hook - Quick Notes

This project shows a simple and practical use case of the `useContext` hook in React.

## Use case

`useContext` is used when you want to share data across multiple components without passing props through every level of the component tree.

In this app:

- `Demo` creates a `user` object
- `DashboardContext.Provider` provides that value to the child tree
- `Sidebar` and `Profile` read the user data using `useUserContext()`

This avoids prop drilling.

## Why it is useful

Use `useContext` when data is needed in many components, such as:

- logged-in user details
- theme settings
- language preferences
- app-wide configuration
- dashboard or profile data

It keeps the code cleaner and easier to maintain.

## Implementation in this project

### 1. Create the context

```ts
export const DashboardContext = createContext<User | undefined>(undefined);
```

### 2. Wrap the app tree with Provider

```tsx
<DashboardContext.Provider value={user}>
  <Dashboard />
</DashboardContext.Provider>
```

### 3. Consume the value in child components

```ts
const user = useUserContext();
```

This pattern makes child components access shared data instantly without passing props manually.

## Custom hook pattern

A custom hook is used here to keep the logic clean and throw a clear error if the provider is missing:

```ts
export function useUserContext() {
  const user = useContext(DashboardContext);

  if (user === undefined) {
    throw new Error("UseUserContext must be used with DashboardContext!");
  }

  return user;
}
```

This is a good practice because it prevents runtime issues and makes the code easier to reuse.

## Example from this app

The shared user object contains:

```ts
{
  isSubscribed: true,
  name: "Test"
}
```

Then both `Sidebar` and `Profile` can display the same value:

- the user name
- subscription status

## When not to use it

Avoid using `useContext` for everything. It is best for global or shared state, not for every local value. For larger apps, tools like Redux or Zustand may be better for complex state management.

## Summary

`useContext` is useful for shared data access, and this project demonstrates the simplest real-world pattern:

- create context
- provide value
- consume value in nested components
- use a custom hook for safer access

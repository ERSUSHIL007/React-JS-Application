# useRef Hook - Use Case and Implementation

This project demonstrates a simple and practical use case of the `useRef` hook in React.

## What is `useRef`?

`useRef` is a React hook that returns a mutable object whose `.current` property persists across renders.

The key point is:

- updating a ref value does not trigger a re-render
- it is useful for values that should persist without causing UI updates
- it is commonly used for DOM references and mutable instance-like values

## Use case in this project

In this app, the counter is stored in React state:

```tsx
const [count, setCount] = useState(0);
```

A separate ref is created to hold a mutable value:

```tsx
const countRef = useRef(0);
```

When the button is clicked:

```tsx
const handleIncrement = () => {
  setCount(count + 1);
  countRef.current += 1;
};
```

This shows the main difference:

- `count` updates the UI because it is state
- `countRef.current` updates silently without re-rendering the component

## Why use `useRef`?

Use `useRef` when you need:

- a value that persists between renders without re-rendering
- direct access to DOM elements
- tracking previous values
- storing timers, intervals, or instance-like references

Examples:

- input focus management
- tracking previous state
- storing a timer ID
- avoiding unnecessary re-renders

## Important rule

Do not use `useRef` like normal state in the return statement:

```tsx
<span>{countRef}</span>
```

This will not show the value correctly because the ref object itself is not rendered the way state is. You must read from `countRef.current`.

## Step-by-step implementation

### 1. Import the hook

```tsx
import { useRef } from "react";
```

### 2. Create the ref

```tsx
const countRef = useRef(0);
```

### 3. Update the ref value

```tsx
countRef.current += 1;
```

### 4. Read the ref value

```tsx
console.log(countRef.current);
```

## Example from this project

```tsx
import { useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const handleIncrement = () => {
    setCount(count + 1);
    countRef.current += 1;

    console.log("STATE-COUNT:", count);
    console.log("COUNTREF::", countRef.current);
  };

  return <button onClick={handleIncrement}>Increment</button>;
}
```

## `useState` vs `useRef`

| Hook       | Re-renders UI | Best for                                                   |
| ---------- | ------------- | ---------------------------------------------------------- |
| `useState` | Yes           | Data that should show on screen                            |
| `useRef`   | No            | Mutable values that should persist without updating the UI |

## Summary

`useRef` is useful when you want a value that survives renders but does not trigger UI updates. In this project, it is used to demonstrate the difference between state-driven rendering and ref-driven persistence.

In short:

- use `useState` for visible data
- use `useRef` for non-rendering values or DOM references

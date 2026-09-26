# `useEffect` Use Cases

Use `useEffect` when a component needs to synchronize with something outside React. This project demonstrates running an effect when the counter changes:

```tsx
useEffect(() => {
  console.log("Count::", count);

  return () => {
    console.log("Clean Up Side Effect!");
  };
}, [count]);
```

The effect runs after the initial render and whenever `count` changes. Its cleanup runs before the effect synchronizes with the next count and when the component unmounts.

Other common use cases include:

- **Browser event listeners:** Attach a listener when a component becomes active and remove it during cleanup.

  ```tsx
  useEffect(() => {
    const handleResize = () => console.log(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  ```

- **Timers:** Start an interval and clear it when the component is removed or the timer setting changes.
- **Subscriptions and connections:** Connect to a service or data stream, then unsubscribe or disconnect in cleanup.
- **Network requests:** Load data in response to a relevant value changing; abort or ignore outdated requests during cleanup.
- **Third-party UI systems:** Keep an external widget synchronized with current props or state.

Use event handlers for work caused directly by a user action, and calculate values during render when they can be derived from props or state. Those cases do not need an Effect.

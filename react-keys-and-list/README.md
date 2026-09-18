# React Key and List

This project demonstrates how React handles repeated elements in a list and why each item needs a unique `key`.

## Why keys are important

When you render a list with `map()`, React needs a stable identity for each item so it can efficiently update the DOM when the list changes.

Without a key, React may:

- reuse the wrong elements while re-rendering
- cause UI bugs when items are added, removed, or reordered
- make state updates behave unexpectedly

## Example

```tsx
{
  users.map((user) => (
    <button
      key={user.id}
      onClick={() => setUsers(users.filter((u) => u.id !== user.id))}
    >
      {user.name}
    </button>
  ));
}
```

In this example, each user is rendered as a button and the `key={user.id}` gives React a unique identity for each item.

## Best practices for keys

- Use a unique and stable value, such as an `id`
- Avoid using indexes as keys when the list can change
- Keep keys consistent across renders

## What this app does

This app displays a list of users and allows clicking a user to remove them from the list. The list is updated using `setUsers()`, and the `key` helps React track the correct UI element during the update.

## Core concept

React uses keys to decide which elements correspond to which data items. This helps it avoid unnecessary re-renders and preserves the correct state for each item in the list.

## Summary

A key is not just for React internals; it is essential for predictable rendering and correct behavior when lists change.

# React Query

This project is a hands-on example of using TanStack React Query for server-state management in a React application.

Instead of manually fetching data inside `useEffect`, this app lets React Query manage caching, background refresh, and synchronization for us.

## What React Query solves

In traditional React apps, data fetching often leads to repeated patterns such as:

- `useEffect` for initial fetch
- loading and error state management
- refetching on every re-render or route change
- duplicated network requests across components
- stale data that is not refreshed consistently

React Query solves this by centralizing server-state logic in a cache layer.

## Core concepts

### 1. Query cache

A query is identified by a unique `queryKey` and its fetching logic is handled by a `queryFn`.

```tsx
const { data: todos, isLoading } = useQuery({
  queryKey: ["todos", { search }],
  queryFn: () => fetchTodos(),
});
```

This tells React Query:

- store the result under the key `['todos', { search }]`
- reuse the cached result when the same query is requested again
- automatically update components when the cache changes

### 2. Automatic background updates

React Query tracks when data becomes stale and can refetch it when:

- the component mounts again
- the window regains focus
- a query is invalidated manually
- a retry condition is triggered

In this project, the client is configured with:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
```

This disables automatic refetch on focus, which is useful in demos where you want more predictable behavior.

### 3. Mutation handling

When adding a todo, the app uses `useMutation`.

```tsx
const { mutateAsync: addTodoMutation } = useMutation({
  mutationFn: addTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});
```

This means:

- the mutation sends the new todo to the server-like mock function
- once it succeeds, the cache is invalidated
- the query is refetched to show the new item immediately

### 4. Stale and cache time

The query in this project uses:

```tsx
staleTime: Infinity,

gcTime: 0,
```

These settings show important React Query ideas:

- `staleTime: Infinity`: the fetched data is treated as fresh forever unless manually invalidated
- `gcTime: 0`: the cache is not retained after unmounting in this demo configuration

This is useful for learning because it makes the behavior of cache invalidation and refetching very visible.

## How this project demonstrates React Query

The app includes a simple todo list with a mock async service.

### Data fetching

The `fetchTodos` function simulates a delay and returns a list of tasks.

```tsx
export const fetchTodos = async (query = ""): Promise<Todo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [...filteredTodos];
};
```

This mimics a real API call and helps demonstrate how queries handle async loading state.

### Loading state

```tsx
const { data: todos, isLoading } = useQuery({ ... })

if (isLoading) {
  return <div className="loading-state">Loading...</div>
}
```

React Query makes loading states easy to manage without writing custom state logic for every request.

### Adding data

The form sends a new item to the mock backend, then invalidates the todo list query:

```tsx
await addTodoMutation({ title });
setTitle("");
```

This keeps the UI synchronized with the server state without manually re-fetching data in many places.

## Why React Query is better than local component state for server data

React Query is especially useful when:

- the same data is used in multiple components
- you need caching and deduplication
- server data changes often
- you want a consistent loading/error/success lifecycle
- you want optimistic developer ergonomics without manual refetch plumbing

It keeps server state separate from UI state and reduces the complexity of managing asynchronous data flows.

## Important React Query patterns used here

- `QueryClientProvider` provides the global cache to the app
- `useQuery` fetches and caches data
- `useMutation` handles create/update/delete operations
- `queryClient.invalidateQueries()` refreshes data after a mutation
- stable `queryKey`s are the identity of each query

## Summary

This project demonstrates the main power of React Query:

- fetch data declaratively
- cache it efficiently
- automatically handle loading states
- refresh data after mutations
- keep the UI in sync with server state

React Query is not just a fetching library; it is a data synchronization tool for modern React apps.

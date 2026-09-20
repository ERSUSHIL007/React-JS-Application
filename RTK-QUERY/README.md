# Redux Toolkit Query with React and TypeScript

This project is a small, practical example of **Redux Toolkit Query (RTK Query)**. It fetches posts from JSONPlaceholder, displays the first five posts, and sends a create-post mutation.

## What RTK Query solves

RTK Query is the data-fetching and caching part of Redux Toolkit. It is designed for **server state**: data that lives on an API and must be loaded, cached, synchronized, and exposed to a UI.

Without RTK Query, a component commonly needs to manage all of the following manually:

- request state such as loading, success, and failure
- fetched data and errors
- duplicate requests
- cache lifetime and subscriptions
- refetching after a write operation
- loading state for mutations

RTK Query moves that behavior into an API slice. The component then consumes generated hooks and focuses on rendering and user interaction.

### Client state versus server state

These are different kinds of state and often deserve different tools:

| State        | Example                                   | Typical tool                         |
| ------------ | ----------------------------------------- | ------------------------------------ |
| Client state | A counter, modal visibility, selected tab | Redux slice, React state, or context |
| Server state | Posts returned by an HTTP API             | RTK Query                            |

This project includes both. `counter` is a regular Redux slice, while `posts` is the RTK Query cache.

## Features demonstrated

- TypeScript models for API data and request arguments
- `createApi` and `fetchBaseQuery`
- A typed query endpoint for `GET /posts`
- A typed mutation endpoint for `POST /posts`
- Automatically generated React hooks
- Loading and error states in a component
- Registration of the API reducer and middleware
- Redux DevTools-compatible API cache state

## Installation

From this directory, install dependencies and start Vite:

```bash
npm install
npm run dev
```

Other available commands:

```bash
npm run lint
npm run build
npm run preview
```

The application uses the public JSONPlaceholder API, so the browser needs network access.

## Project structure

```text
src/
  components/
    PostsList.tsx       # Uses generated query and mutation hooks
  state/
    counter/
      CounterSlice.ts   # Regular Redux state example
    posts/
      postsApiSlice.ts  # RTK Query API slice and endpoints
    store.ts            # Redux store and RTK Query registration
  types/
    Post.ts             # Shared Post TypeScript type
  App.tsx               # Renders the posts example
  main.tsx              # Provides the Redux store to React
```

## The request flow

```text
PostsList
   |
   | useGetPostsQuery({ limit: 5, offset: 0 })
   v
postsApiSlice
   |
   | fetchBaseQuery + endpoint definition
   v
JSONPlaceholder API
   |
  | response is stored in the RTK Query cache
   v
PostsList re-renders with data, loading, or error state
```

## 1. Define the API slice

The API slice is in `src/state/posts/postsApiSlice.ts`:

```ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../../types/Post";

export const postsApiSlice = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], { limit: number; offset: number }>({
      query: ({ limit, offset }) => `/posts?_limit=${limit}&_offset=${offset}`,
    }),
    createPost: builder.mutation<Post, Omit<Post, "id">>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation } = postsApiSlice;
```

### `createApi`

`createApi` creates the RTK Query service. An API slice normally owns endpoints that share a base URL and common request behavior.

### `reducerPath`

`reducerPath` is the key where RTK Query stores its cache in Redux. This project stores the API state at `state.posts`.

### `baseQuery`

`fetchBaseQuery` is a lightweight wrapper around `fetch`. The `baseUrl` is applied to endpoint URLs, so the endpoint only needs to provide `/posts` and its query string.

For applications that need authentication, common headers, refresh-token handling, or custom error behavior, `baseQuery` can be wrapped with a custom function.

### Query endpoints

This endpoint describes a read operation:

```ts
getPosts: builder.query<Post[], { limit: number; offset: number }>({
  query: ({ limit, offset }) =>
    `/posts?_limit=${limit}&_offset=${offset}`,
}),
```

The two generic types describe the contract:

1. `Post[]` is the response data type.
2. `{ limit: number; offset: number }` is the argument type passed by the component.

### Mutation endpoints

This endpoint describes a write operation:

```ts
createPost: builder.mutation<Post, Omit<Post, "id">>({
  query: (post) => ({
    url: "/posts",
    method: "POST",
    body: post,
  }),
}),
```

The mutation returns a `Post` and accepts a post without an `id`, because the server is expected to assign the identifier. `Omit<Post, "id">` keeps that rule enforced by TypeScript.

## 2. Register RTK Query in the store

Defining an API slice is not enough. Its reducer and middleware must be added to the Redux store in `src/state/store.ts`:

```ts
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [postsApiSlice.reducerPath]: postsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApiSlice.middleware),
});
```

The two registrations have different responsibilities:

- **Reducer:** stores query results, request status, errors, subscriptions, and cache metadata.
- **Middleware:** observes dispatched RTK Query actions and performs requests, cache updates, subscription handling, polling, and lifecycle work.

If either registration is missing, the generated hooks will not work correctly. The middleware is especially important because it runs the request and cache behavior.

## 3. Provide the store to React

`src/main.tsx` makes the store available to every component below `Provider`:

```tsx
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

The generated hooks use this Redux context to dispatch requests and subscribe to cached data.

## 4. Read data with a generated query hook

`src/components/PostsList.tsx` calls the generated hook:

```tsx
const {
  data: posts,
  isLoading,
  isError,
} = useGetPostsQuery({
  limit: 5,
  offset: 0,
});
```

RTK Query automatically:

1. creates a cache key from the endpoint name and arguments
2. starts the request when the component subscribes
3. exposes request state and data to the component
4. reuses cached data for matching arguments
5. updates subscribed components when the cache changes

Common query fields include:

| Field             | Meaning                                                       |
| ----------------- | ------------------------------------------------------------- |
| `data`            | The most recently fulfilled response                          |
| `isUninitialized` | The query has not started                                     |
| `isLoading`       | The first request is in progress and no data is available yet |
| `isFetching`      | A request is in progress, including a background refetch      |
| `isSuccess`       | The latest request succeeded                                  |
| `isError`         | The latest request failed                                     |
| `error`           | Details about the failed request                              |

For a production UI, distinguish `isLoading` from `isFetching`: keep existing data visible during a background refetch and show a smaller refresh indicator instead of replacing the whole page.

## 5. Write data with a generated mutation hook

Mutation hooks return a trigger function and mutation state:

```tsx
const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();

await createPost({ title: "My Post Created!" }).unwrap();
```

The current example uses the trigger without `unwrap()`:

```tsx
createPostMutation({ title: "My Post Created!" });
```

`unwrap()` is useful when the component needs normal promise behavior. It resolves with the response body or rejects with the RTK Query error, allowing the caller to use `try/catch`.

```tsx
try {
  const createdPost = await createPost({ title }).unwrap();
  console.log(createdPost);
} catch (error) {
  console.error("Unable to create post", error);
}
```

## Caching and invalidation

RTK Query caches query results by endpoint and serialized arguments. In this project, the request arguments create a cache entry equivalent to:

```text
getPosts({ limit: 5, offset: 0 })
```

When another component requests the same endpoint with the same arguments, RTK Query can reuse the existing cache entry rather than issuing an unnecessary duplicate request.

For automatic refetching after a mutation, add tags to the API slice:

```ts
export const postsApiSlice = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], { limit: number; offset: number }>({
      query: ({ limit, offset }) => `/posts?_limit=${limit}&_offset=${offset}`,
      providesTags: ["Post"],
    }),
    createPost: builder.mutation<Post, Omit<Post, "id">>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
```

After `createPost` succeeds, invalidating the `Post` tag marks matching queries as stale. Active subscribers then refetch automatically. This is usually preferable to manually dispatching a refetch from every component.

The current JSONPlaceholder example accepts the POST request but does not persist it permanently, so a refetch may not show the created post after the request completes.

## When to use RTK Query

RTK Query is a strong fit when an application has:

- several API endpoints used by multiple screens
- shared server data that should be cached
- loading, error, retry, and refetch behavior
- mutations that should refresh related queries
- Redux already used for client state

It may be unnecessary for a single one-off request. A small component can use `fetch` and local state when there is no shared server data or cache behavior to manage.

## Useful patterns

### Skip a query conditionally

Use `skip` when required input is not available yet:

```tsx
const { data } = useGetPostQuery(postId, {
  skip: !postId,
});
```

### Refetch manually

The hook returns a `refetch` function:

```tsx
const { data, refetch } = useGetPostsQuery({ limit: 5, offset: 0 });

<button onClick={() => refetch()}>Refresh</button>;
```

### Select a smaller result

For large responses, `selectFromResult` can subscribe a component to only the data it needs, reducing unnecessary renders.

### Keep endpoint definitions centralized

Prefer one API slice per backend service or base URL. Add related endpoints to that slice instead of creating a separate `createApi` instance for every component. Multiple API slices duplicate middleware and make cache invalidation across endpoints harder.

## RTK Query versus `createAsyncThunk`

`createAsyncThunk` is useful for custom asynchronous workflows and dispatching explicit pending, fulfilled, and rejected actions. RTK Query is specialized for API data and already provides request lifecycle handling, caching, subscriptions, and generated hooks.

As a rule of thumb:

- use a regular slice for client-owned state
- use `createAsyncThunk` for custom async workflows that are not primarily cacheable API data
- use RTK Query for request-and-cache server data

## Further reading

- [Redux Toolkit Query Overview](https://redux-toolkit.js.org/rtk-query/overview)
- [RTK Query Quick Start](https://redux-toolkit.js.org/rtk-query/quick-start)
- [RTK Query API Reference](https://redux-toolkit.js.org/rtk-query/api/created-api/hooks)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

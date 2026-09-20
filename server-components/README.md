# Server-Side Rendering with Next.js

This project demonstrates server and client rendering with the Next.js App Router, React Server Components, and TypeScript. The main example is available at `/server`; a client-side comparison is available at `/client`.

## What is Server-Side Rendering?

**Server-Side Rendering (SSR)** means the server prepares the initial HTML for a route before sending it to the browser. The browser can display meaningful content earlier, while JavaScript can later hydrate interactive client components.

A simplified request looks like this:

```text
Browser requests /server
        |
        v
Next.js renders the route on the server
        |
        +--> HTML for the initial view
        +--> React Server Component payload
        +--> JavaScript needed by client components
        |
        v
Browser displays the page and hydrates interactive islands
```

SSR should be distinguished from two related concepts:

- **Server Components:** Components whose rendering and code execution happen on the server by default in the App Router.
- **Static generation:** HTML generated ahead of a request, usually during the build or through caching.
- **Hydration:** The browser attaches React behavior to HTML that was already rendered.

A Server Component does not automatically mean that a new render happens for every request. Next.js can statically render or cache a route when its data and configuration allow it. Use dynamic rendering when request-time data is required.

## Why use SSR?

SSR is useful when the first response should contain real page content instead of an empty shell that waits for browser JavaScript.

Common use cases include:

- **SEO-sensitive pages:** Product pages, documentation, articles, and public profiles can send meaningful HTML to crawlers.
- **Fast first content:** Users can see server-rendered content before the full client bundle is ready.
- **Request-specific pages:** Render content using cookies, headers, authentication, locale, or URL parameters.
- **Secure data access:** Keep database queries, private credentials, and server-only business logic out of browser bundles.
- **Expensive computation:** Perform work on the server rather than making every browser repeat it.
- **Reduced client JavaScript:** Keep non-interactive UI as Server Components and send JavaScript only for interactive areas.

SSR also has costs. Every request may consume server resources, dynamic pages may have higher latency, and interactive components still need client JavaScript. Choose the rendering strategy per route instead of making every page dynamic by default.

## This project's rendering examples

| Route     | Rendering example      | Main idea                                                           |
| --------- | ---------------------- | ------------------------------------------------------------------- |
| `/server` | Server Component route | The page is an async component and logs on the server.              |
| `/client` | Client Component route | The page uses state, effects, browser fetching, and click handlers. |

The files involved are:

```text
app/
  server/page.tsx     # Server-rendered example
  client/page.tsx     # Client-rendered comparison
  layout.tsx          # Shared root layout and metadata
ClientComponent.tsx  # Client boundary with "use client"
ServerComponent.tsx  # Server Component example
expensiveFunction.ts # Server/client execution comparison
```

## Step 1: Create a Next.js App Router project

This project uses Next.js 16, React 19, and TypeScript:

```json
{
  "dependencies": {
    "next": "16.3.5",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  }
}
```

The App Router uses folders and files inside `app/` to define routes. A `page.tsx` file becomes a route, and `layout.tsx` provides shared UI around its children.

## Step 2: Create a Server Component

In the App Router, components are Server Components by default. The `/server` page is therefore rendered without a `"use client"` directive:

```tsx
import ClientComponent from "@/ClientComponent";
import ServerComponent from "@/ServerComponent";

export default async function ServerPage() {
  console.log("Server Component!");

  return (
    <div>
      <h1>Server Side Rendering!</h1>
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
```

Important consequences:

- `console.log` runs in the server terminal, not the browser console.
- Server-only modules and secrets should remain outside client bundles.
- The component can be `async` and await data before returning JSX.
- Server Components cannot use browser-only APIs such as `window`.
- Server Components cannot use interactive hooks such as `useState` or `useEffect`.
- Event handlers such as `onClick` belong in a Client Component.

## Step 3: Fetch data on the server

Server Components can fetch data directly before rendering:

```tsx
async function getData() {
  const response = await fetch("https://api.example.com/data");

  if (!response.ok) {
    throw new Error("Failed to load data");
  }

  return response.json();
}

export default async function ServerPage() {
  const data = await getData();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

This is preferable to fetching the same initial data in `useEffect` because the response can be prepared before the page is sent to the browser. It also avoids exposing server-only credentials to the client.

For production code:

- check `response.ok`
- validate external data before rendering it
- define an error boundary or route-level error UI
- add loading UI with `loading.tsx` or Suspense for slow work
- choose caching and revalidation behavior deliberately

### Dynamic rendering and caching

A Server Component is not, by itself, a guarantee of request-time SSR. If the page should render on every request, explicitly opt into dynamic rendering:

```tsx
export const dynamic = "force-dynamic";

export default async function ServerPage() {
  const data = await getData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

Use dynamic rendering for data that must be current or depends on the request. For data that can be reused, prefer caching or time-based revalidation when appropriate:

```tsx
const response = await fetch("https://api.example.com/data", {
  next: { revalidate: 60 },
});
```

The right choice depends on the data:

| Requirement                  | Suitable approach                      |
| ---------------------------- | -------------------------------------- |
| Same content for everyone    | Static rendering or cached data        |
| Refresh periodically         | Revalidation, such as `revalidate: 60` |
| New result for every request | Dynamic rendering with `force-dynamic` |
| User-specific content        | Request-aware dynamic rendering        |

Do not force dynamic rendering for every route. It removes useful caching and can increase server work.

## Step 4: Add interactivity with a Client Component

A Client Component begins with the `"use client"` directive:

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      Count: {count}
    </button>
  );
}
```

Use Client Components when the UI needs:

- `useState`, `useEffect`, or other client hooks
- event handlers such as `onClick` and `onChange`
- browser APIs such as `localStorage`, `window`, or `navigator`
- client-side subscriptions or animations

The `/client` page demonstrates this boundary with state, an effect, a browser-side fetch, and a button click handler.

## Step 5: Compose Server and Client Components

A Server Component can render a Client Component. The current project uses `ClientComponent` as a client boundary and passes `ServerComponent` as its child:

```tsx
// Server page
<ClientComponent>
  <ServerComponent />
</ClientComponent>
```

```tsx
// ClientComponent.tsx
"use client";

type ClientComponentProps = {
  children: React.ReactNode;
};

export default function ClientComponent({ children }: ClientComponentProps) {
  return <>{children}</>;
}
```

This pattern lets a server-rendered tree contain an interactive client boundary. Keep the boundary as low in the component tree as practical so that static content does not become client JavaScript unnecessarily.

Props passed from a Server Component to a Client Component must be serializable. Plain objects, arrays, strings, numbers, booleans, and `null` are safe choices. Do not pass database connections, functions, class instances, or other server-only objects.

## Step 6: Add shared layout and metadata

`app/layout.tsx` wraps every route and is itself a Server Component by default:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Server Rendering Demo",
  description: "A Next.js Server-Side Rendering example",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Layouts are useful for navigation, fonts, providers, and shared structure. Metadata is generated on the server and improves the document head without requiring client code.

## Step 7: Run and verify the app

Install dependencies and start development mode:

```bash
npm install
npm run dev
```

Open these routes:

- `http://localhost:3000/server`
- `http://localhost:3000/client`

To inspect server execution:

1. Open `/server` in the browser.
2. Look at the terminal running `npm run dev`.
3. The `Server Component!` log appears in the terminal.
4. Client-side logs and click events appear in the browser console.

Create and run the production build to verify production rendering:

```bash
npm run build
npm start
```

## SSR request lifecycle in detail

1. The browser requests a route.
2. Next.js matches the URL to `app/server/page.tsx`.
3. Server Components execute on the server.
4. Server-side data requests and server-only computations finish or stream their results.
5. Next.js sends HTML and the React Server Component payload to the browser.
6. The browser paints the initial content.
7. Any Client Components receive their JavaScript and hydrate.
8. Client event handlers become active after hydration.

Streaming and Suspense can allow the shell and fast portions of a page to appear while slower server work is still resolving.

## SSR versus client-side rendering

### Server-side rendering

```tsx
export default async function Page() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();

  return <div>{data.title}</div>;
}
```

The initial data is available during server rendering.

### Client-side rendering

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then(setData);
  }, []);

  return <div>{data?.title ?? "Loading..."}</div>;
}
```

The browser must load JavaScript, run the effect, make the request, and update the page. This can still be the correct choice for highly interactive, user-specific application screens.

## Common mistakes

- Adding `"use client"` to a whole page when only one button needs interactivity
- Trying to use `useState`, `useEffect`, or `onClick` in a Server Component
- Expecting `console.log` from a Server Component in the browser console
- Exposing private API keys by importing server-only code into a Client Component
- Assuming every Server Component is request-time SSR
- Fetching initial data in `useEffect` when it could be loaded on the server
- Passing non-serializable props across the Server/Client boundary
- Ignoring loading and error states for slow or failed server requests
- Forcing dynamic rendering when cached or static content would be sufficient

## When not to use SSR

SSR is not automatically the best choice. Prefer a client-heavy approach when:

- the page is an authenticated dashboard whose content changes continuously
- interaction matters more than search indexing
- data is intentionally loaded after a user action
- the UI depends heavily on browser-only APIs
- the server does not need to perform the initial render

Many production pages use a hybrid design: server-render the initial content and keep forms, filters, charts, and controls inside small Client Components.

## Useful commands

```bash
npm run dev     # Development server with fast refresh
npm run build   # Production build
npm start       # Serve the production build
npm run lint    # Run ESLint
```

## Further reading

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Next.js Data Fetching](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Next.js Caching and Revalidating](https://nextjs.org/docs/app/getting-started/caching-and-revalidating)
- [Next.js Loading UI and Streaming](https://nextjs.org/docs/app/getting-started/loading-ui-and-streaming)

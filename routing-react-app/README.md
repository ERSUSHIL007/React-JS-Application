# Error Handling in React

React error handling is not one global `try/catch`. Different failures happen in different parts of an application, so use a boundary that matches the source of the failure.

## Example Routes

The shared layout in `src/App.tsx` renders the navigation and the selected page through React Router's `<Outlet />`:

| URL                   | Page / behavior                         |
| --------------------- | --------------------------------------- |
| `/`                   | Home page with the loader-error demo    |
| `/about`              | About page                              |
| `/profile`            | List of profiles 1–5                    |
| `/profile/:profileId` | Profile selected by its route parameter |
| Any other URL         | Not-found page                          |

The home page's **Trigger a loader error** link adds `?demoError=1`. Its loader throws a 503 response, which React Router displays using `RouteErrorPage`. The wildcard route handles unknown URLs separately.

The profile page reads `profileId` with React Router's `useParams()`. For example, `/profile/3` selects profile 3. IDs outside 1–5 show a friendly profile-not-found message and a link back to the list.

## Choose the Right Handler

| Failure                                        | Recommended handling                                                       |
| ---------------------------------------------- | -------------------------------------------------------------------------- |
| Component throws while rendering               | React Error Boundary                                                       |
| Route loader, action, or route rendering fails | React Router `errorElement` / route error boundary                         |
| Event handler or asynchronous task fails       | `try/catch` in that handler or task, then show recoverable UI              |
| Form input is invalid                          | Validate the input and show field-level feedback; this is not an exception |
| A request returns an unsuccessful HTTP status  | Check `response.ok` and handle the error explicitly                        |

An Error Boundary catches errors in descendant rendering, constructors, and lifecycle methods. It does not catch errors thrown in event handlers, arbitrary timers, or asynchronous callbacks. It also cannot catch errors thrown by the boundary itself. Handle those cases where the work is started.

## React Error Boundary

This project wraps the router with `AppErrorBoundary`. If a descendant throws during rendering, the boundary logs diagnostic details and replaces the broken UI with a recovery screen.

```tsx
import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught rendering error", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <p role="alert">Something went wrong. Reload to try again.</p>;
    }

    return this.props.children;
  }
}
```

`getDerivedStateFromError` switches the boundary into fallback mode. `componentDidCatch` is for reporting diagnostics, such as sending the error and component stack to an error-monitoring service. Do not show stack traces or sensitive error details to end users.

## React Router Route Errors

React Router data routers let a route define `errorElement`. Errors thrown by its loader, action, or route rendering are rendered by the nearest route error boundary. The example reads the error with `useRouteError` and checks route response statuses with `isRouteErrorResponse`:

```tsx
import { isRouteErrorResponse, useRouteError } from "react-router";

function RouteErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <h1>
        {error.status}: {error.statusText}
      </h1>
    );
  }

  return <h1>We could not load this page.</h1>;
}
```

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: loadHomeData,
    errorElement: <RouteErrorPage />,
  },
]);
```

Use route boundaries for navigation-level recovery and a wildcard route for URLs that do not match any route. Provide a way to navigate somewhere useful, such as returning home.

## Handling Async and Event Errors

Errors from promises must be handled in the async work itself; Error Boundaries do not catch rejected promises or event-handler exceptions. Check HTTP status because `fetch` resolves normally for responses such as 404 and 500:

```tsx
async function loadProfile() {
  try {
    const response = await fetch("/api/profile");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const profile = await response.json();
    setProfile(profile);
    setError(null);
  } catch {
    setError("Profile could not be loaded. Please try again.");
  }
}
```

For user-triggered actions, catch errors in the event handler, preserve the user's data when possible, and present a clear next step such as retrying. Use loading and error state for expected network failures; reserve Error Boundaries for unexpected failures that prevent a part of the UI from rendering.

## Try the Demo

- Open the home page and choose **Trigger a loader error** to see the route error UI.
- Visit an unknown URL to see the not-found page.
- A rendering failure in a descendant of the router is handled by the top-level React Error Boundary.

Run the application with `npm run dev`. Check the production build with `npm run build`.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { AppErrorBoundary } from "./components/AppErrorBoundary.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { App } from "./App.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { AboutPage } from "./pages/AboutPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { NotFoundPage, RouteErrorPage } from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: ({ request }) => {
          const url = new URL(request.url);

          if (url.searchParams.has("demoError")) {
            throw new Response("This error was triggered for the demo.", {
              status: 503,
              statusText: "Service temporarily unavailable",
            });
          }

          return null;
        },
      },
      { path: "about", element: <AboutPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "profile/:profileId", element: <ProfilePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppErrorBoundary>
      <RouterProvider router={router} />
    </AppErrorBoundary>
  </StrictMode>,
);

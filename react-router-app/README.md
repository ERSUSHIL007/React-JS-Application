# React Router Application

A comprehensive learning project demonstrating React Router v6+ concepts and best practices for building single-page applications (SPAs) with client-side routing.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Key Concepts](#key-concepts)
- [Best Practices](#best-practices)
- [Common APIs](#common-apis)
- [Example Setup](#example-setup)
- [Tips & Tricks](#tips--tricks)
- [Resources](#resources)

## Overview

This project serves as a learning resource for understanding React Router, the standard routing library for React applications. It demonstrates how to:

- Set up and configure routes
- Navigate between pages without full page refreshes
- Manage nested routes and layouts
- Handle dynamic routing
- Implement data fetching with loaders
- Create protected/guarded routes

## Prerequisites

Before getting started, ensure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- Basic understanding of React fundamentals
- Familiarity with JSX and hooks

## Installation

### Step 1: Project Initialization

Create a new React project using Vite:

```bash
npm create vite@latest my-router-app -- --template react
```

### Step 2: Navigate to Project Directory

```bash
cd my-router-app
```

### Step 3: Install React Router DOM

Install the official React Router package:

```bash
npm install react-router-dom
```

### Step 4: Install Dependencies

Install all project dependencies:

```bash
npm install
```

### Step 5: Start Development Server

Launch the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

## Project Structure

```
react-router-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation component
│   │   ├── Footer.jsx          # Footer component
│   │   └── Layout.jsx          # Main layout with routes
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── About.jsx           # About page
│   │   ├── Contact.jsx         # Contact page
│   │   └── NotFound.jsx        # 404 page
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # Entry point
│   └── App.css                 # Global styles
├── public/                      # Static assets
├── package.json
├── vite.config.js
└── README.md
```

## Key Concepts

### 1. **Routing Basics**

React Router allows you to build single-page applications with navigation without full-page refreshes.

### 2. **Components**

#### `<BrowserRouter>`
Wraps your entire app and enables routing functionality.

```jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

#### `<Routes>` and `<Route>`
Defines the route configuration. `<Route>` maps paths to components.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

#### `<Outlet>`
A placeholder for rendering nested child routes within a parent route layout.

```jsx
export function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
```

### 3. **Navigation Components**

#### `<Link>`
Creates clickable navigation links without page refresh.

```jsx
<Link to="/about">About Us</Link>
```

#### `<NavLink>`
Like `<Link>`, but adds CSS classes when the route is active. Useful for styling active navigation items.

```jsx
<NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
  About
</NavLink>
```

### 4. **Programmatic Navigation**

Use the `useNavigate` hook to navigate programmatically:

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    // Authentication logic
    navigate('/dashboard');
  };
  
  return <button onClick={handleLogin}>Login</button>;
}
```

### 5. **Route Parameters**

Access dynamic route parameters using `useParams`:

```jsx
// Route definition
<Route path="/user/:id" element={<UserProfile />} />

// Component
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}
```

### 6. **Query Parameters**

Access query strings using `useSearchParams`:

```jsx
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  return <h1>Search results for: {query}</h1>;
}
```

### 7. **Data Fetching with Loaders** (v6.4+)

Fetch data in parallel with route rendering:

```jsx
const router = createBrowserRouter([
  {
    path: '/user/:id',
    element: <UserProfile />,
    loader: ({ params }) => fetch(`/api/user/${params.id}`)
      .then(res => res.json())
  }
]);

function UserProfile() {
  const user = useLoaderData();
  return <h1>{user.name}</h1>;
}
```

### 8. **Nested Routes**

Create hierarchical route structures:

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

## Best Practices

### ✅ Do's

- **Use `createBrowserRouter`**: Modern data router with powerful features over legacy `<BrowserRouter>`.
  
  ```jsx
  import { createBrowserRouter, RouterProvider } from 'react-router-dom';
  
  const router = createBrowserRouter([...]);
  <RouterProvider router={router} />
  ```

- **Capitalize element prop**: Pass React components as JSX elements, not component references.
  
  ```jsx
  // ✅ Correct
  <Route path="/home" element={<Home />} />
  
  // ❌ Wrong
  <Route path="/home" element={Home} />
  ```

- **Include `<Outlet>` in layouts**: Tells React Router where to render child routes.
  
  ```jsx
  function Layout() {
    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  }
  ```

- **Use `<NavLink>` for navigation bars**: Automatically applies active styling.
  
  ```jsx
  <NavLink 
    to="/about" 
    className={({ isActive }) => isActive ? 'active' : ''}
  >
    About
  </NavLink>
  ```

- **Define wildcard fallback routes**: Always add a catch-all route at the end for 404 handling.
  
  ```jsx
  <Route path="*" element={<NotFound />} />
  ```

- **Use loaders for data fetching**: Fetch data in parallel with route rendering to eliminate loading states.

### ❌ Don'ts

- **Never use `<a href>` for internal navigation**: This causes full-page refreshes, losing application state.
  
  ```jsx
  // ❌ Wrong - Full page reload
  <a href="/about">About</a>
  
  // ✅ Correct - Client-side navigation
  <Link to="/about">About</Link>
  ```

- **Avoid legacy routers**: Don't use `<BrowserRouter>` with old Router patterns. Use `createBrowserRouter` instead.

- **Don't forget the `element` prop**: Routes must have an element property pointing to a JSX component.

- **Avoid hardcoding route paths**: Use relative paths and dynamic routing when possible.

## Common APIs

| Hook/Component | Purpose |
|---|---|
| `<BrowserRouter>` | Enables routing for your app |
| `<Routes>` | Container for all `<Route>` definitions |
| `<Route>` | Maps a path to a component |
| `<Outlet>` | Renders nested routes |
| `<Link>` | Navigate without page reload |
| `<NavLink>` | Link with active state styling |
| `useNavigate()` | Programmatic navigation |
| `useParams()` | Access route parameters (:id, etc.) |
| `useSearchParams()` | Access query string parameters |
| `useLocation()` | Get current location object |
| `useLoaderData()` | Access data from route loader |
| `createBrowserRouter()` | Create a modern data router |

## Example Setup

### Basic App Structure

```jsx
// App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

### Layout Component

```jsx
// components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

### Navigation Component

```jsx
// components/Header.jsx
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Home
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
```

## Tips & Tricks

### 1. **Relative Links in Nested Routes**

```jsx
// Within a '/dashboard' route, use relative paths
<Link to="profile">Profile</Link>  // Links to /dashboard/profile
<Link to="settings">Settings</Link> // Links to /dashboard/settings
```

### 2. **Active Link Styling**

```jsx
<NavLink 
  to="/about"
  style={({ isActive }) => ({
    color: isActive ? '#007bff' : '#000'
  })}
>
  About
</NavLink>
```

### 3. **Programmatic Redirect**

```jsx
function ProtectedRoute({ isAuthed }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthed) {
      navigate('/login');
    }
  }, [isAuthed, navigate]);
  
  return isAuthed ? <Dashboard /> : null;
}
```

### 4. **Accessing Previous Location**

```jsx
import { useLocation } from 'react-router-dom';

function CurrentPage() {
  const location = useLocation();
  console.log(location.pathname); // '/about'
  console.log(location.search);    // '?id=123'
}
```

### 5. **Dynamic Route Matching**

```jsx
// Route pattern: /user/:id/post/:postId
const { id, postId } = useParams();
```

## Resources

- **Official React Router Documentation**: https://reactrouter.com
- **React Router v6 Migration Guide**: https://reactrouter.com/en/main/start/migration-guide-v5
- **Vite Documentation**: https://vitejs.dev
- **React Documentation**: https://react.dev

---

**Last Updated**: 2024  
**React Router Version**: v6+  
**React Version**: v18+
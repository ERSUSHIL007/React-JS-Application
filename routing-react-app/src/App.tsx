import { Link, Outlet } from "react-router";

export function App() {
  return (
    <>
      <header className="site-header">
        <Link className="site-brand" to="/">
          React Routes
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

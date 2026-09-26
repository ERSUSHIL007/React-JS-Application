import { Link } from "react-router";

export const HomePage = () => {
  return (
    <main className="screen">
      <section className="home-panel">
        <p className="eyebrow">React Router / Recovery patterns</p>
        <h1 className="home-title">Errors happen. Recovery should be clear.</h1>
        <p className="home-copy">
          Route failures and rendering errors need different boundaries. This
          example keeps the failure visible without exposing internal details.
          Use the navigation above to visit the About and Profile pages.
        </p>
        <div className="home-actions">
          <Link className="action-link" to="/?demoError=1">
            Trigger a loader error
          </Link>
          <Link className="text-link" to="/missing-page">
            View the not-found page
          </Link>
        </div>
      </section>
    </main>
  );
};

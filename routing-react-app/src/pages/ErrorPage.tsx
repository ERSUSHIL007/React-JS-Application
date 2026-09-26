import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export function RouteErrorPage() {
  const error = useRouteError();
  const isResponseError = isRouteErrorResponse(error);
  const status = isResponseError ? error.status : 500;
  const title =
    status === 404 ? "Page not found" : "We couldn't load this page";
  const description =
    status === 503
      ? "The route loader could not complete. Try again from the home page."
      : "An unexpected route error occurred. Return home and try again.";

  return (
    <ErrorPanel
      status={status}
      title={title}
      description={description}
      eyebrow="Route error"
    />
  );
}

export function NotFoundPage() {
  return (
    <ErrorPanel
      status={404}
      title="Page not found"
      description="That address does not match a page in this application."
      eyebrow="Not found"
    />
  );
}

function ErrorPanel({
  status,
  title,
  description,
  eyebrow,
}: {
  status: number;
  title: string;
  description: string;
  eyebrow: string;
}) {
  return (
    <main className="screen">
      <section className="error-panel" role="alert">
        <p className="error-status">{status}</p>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="error-title">{title}</h1>
        <p className="home-copy">{description}</p>
        <Link className="action-link" to="/">
          Return home
        </Link>
      </section>
    </main>
  );
}

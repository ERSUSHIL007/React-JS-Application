import { Component, type ErrorInfo, type ReactNode } from "react";

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      "Uncaught application rendering error",
      error,
      info.componentStack,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="screen">
          <section className="error-panel" role="alert">
            <p className="eyebrow">Application error</p>
            <h1 className="error-title">Something went wrong</h1>
            <p className="home-copy">
              The application could not render this screen. Reload to try again.
            </p>
            <button
              className="action-button"
              onClick={() => window.location.reload()}
            >
              Reload application
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

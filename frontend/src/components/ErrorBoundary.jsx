import React from "react";

import ErrorScreen from "./ErrorScreen";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // Intentionally no-op; screen handles the UX.
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      const message = error?.message || "Unexpected error occurred.";

      return (
        <ErrorScreen
          title="We hit a problem"
          message={message}
          ctaLabel="Go back"
          showMeta={false}
          onCta={() => window.location.reload()}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;


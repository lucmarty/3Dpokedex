import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>Pokémon non répertorié dans le pokédex !</h1>
          <p>
Si vous rencontrez un pokémon, n'hésitez pas à le scanner avec votre pokédex afin de nous aider à le référencer.

          </p>
         
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

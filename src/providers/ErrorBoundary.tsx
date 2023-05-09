import { NextRouter, withRouter } from 'next/router';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  router: NextRouter;
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidMount(): void {}

  public componentDidUpdate(): void {
    if (this.state.hasError && window.location.pathname !== '/') {
      window.open(window.origin, '_self');
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);

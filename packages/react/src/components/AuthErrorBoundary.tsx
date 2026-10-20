'use client';

import type { ErrorInfo, ReactNode } from 'react';
import React, { Component } from 'react';

export interface AuthErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface AuthErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class AuthErrorBoundary extends Component<AuthErrorBoundaryProps, AuthErrorBoundaryState> {
  state: AuthErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
    console.error('AuthErrorBoundary caught an error:', error, errorInfo);
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error!, this.reset);
      }
      return (
        this.props.fallback ?? (
          <div role="alert">
            <h2>Authentication Error</h2>
            <p>{this.state.error?.message ?? 'An unknown error occurred'}</p>
            <button onClick={this.reset}>Try again</button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export function withAuthErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<AuthErrorBoundaryProps, 'children'>
): React.FC<P> {
  return function WithAuthErrorBoundary(props: P) {
    return (
      <AuthErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </AuthErrorBoundary>
    );
  };
}

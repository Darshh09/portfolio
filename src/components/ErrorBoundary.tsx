import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-red-400 mb-6">
              Something went wrong! 🚨
            </h1>

            <div className="bg-slate-800 p-6 rounded-lg border border-red-500/30 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Error Details:</h2>
              <pre className="text-red-300 text-sm overflow-auto">
                {this.state.error?.toString()}
              </pre>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-blue-500/30 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Component Stack:</h2>
              <pre className="text-blue-300 text-sm overflow-auto">
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

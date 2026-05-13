import React, { ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-96 px-4">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-red-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Oups, quelque chose s'est mal passé</h3>
              <p className="text-gray-600 mb-6">Une erreur inattendue s'est produite. Veuillez réessayer ou contacter le support.</p>
              <button
                onClick={this.reset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F6E56] text-white rounded-xl font-bold hover:bg-[#0D5544] transition-colors"
              >
                <RefreshCw size={18} />
                Réessayer
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

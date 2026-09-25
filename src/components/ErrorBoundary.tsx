import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center my-12 max-w-xl mx-auto rounded-3xl border border-white/20 bg-[#0A101D]/90 backdrop-blur-xl shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center mb-5 text-white">
            <span className="font-serif text-2xl font-bold">LL</span>
          </div>
          <h3 className="font-serif text-2xl text-white mb-3">Membership Dossier</h3>
          <p className="text-sm text-[#94A3B8] font-light leading-relaxed mb-6">
            Private Client Dossier loaded. Click below to view the protocol specifications or return to membership tiers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-2.5 rounded-full bg-white text-[#050A15] font-serif text-xs uppercase tracking-widest font-semibold hover:bg-[#E2E8F0] transition-colors cursor-pointer"
            >
              Reload Dossier
            </button>
            <button
              onClick={() => {
                window.location.hash = '#memberships';
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-full border border-white/30 text-white font-serif text-xs uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer"
            >
              Return to Overview
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

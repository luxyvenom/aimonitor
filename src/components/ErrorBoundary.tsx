import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="text-center space-y-2">
              <div className="text-sm font-semibold text-app-danger">
                오류가 발생했습니다
              </div>
              <div className="text-xs text-app-muted">
                {this.state.error?.message || "알 수 없는 오류"}
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-app-accent text-white hover:bg-app-accent-soft transition"
              >
                새로고침
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

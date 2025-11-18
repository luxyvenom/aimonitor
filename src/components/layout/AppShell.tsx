import React from "react";
import { Link, useLocation } from "react-router-dom";

interface AppShellProps {
  children?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-app-bg bg-app-radial text-app-foreground flex">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 border-r border-app-border/60 bg-app-bg-soft/90 backdrop-blur-xl">
        <Link
          to="/"
          className="h-16 flex items-center px-6 border-b border-app-border/40"
        >
          <div className="h-8 w-8 rounded">
            <img
              src="/RL_Logo.svg"
              alt="RootLab Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-semibold">RootLab AI R.I.S.E.</div>
          </div>
        </Link>

        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          <SidebarItem label="Home" to="/" active={isActive("/")} />
          <SidebarItem
            label="Dashboard"
            to="/dashboard"
            active={isActive("/dashboard")}
          />
          <SidebarItem label="Teams" to="/teams" active={isActive("/teams")} />
          <SidebarItem
            label="Monitoring"
            to="/monitoring"
            active={isActive("/monitoring")}
          />
          <SidebarItem
            label="Reports"
            to="/reports"
            active={isActive("/reports")}
          />
          <SidebarItem
            label="Immutable Log"
            to="/immutable-log"
            active={isActive("/immutable-log")}
          />
          <SidebarItem
            label="More Options"
            to="/more-options"
            active={isActive("/more-options")}
          />
        </nav>

        <div className="px-4 py-4 border-t border-app-border/40 text-xs text-app-muted">
          © {new Date().getFullYear()} RootLab
        </div>
      </aside>

      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-app-border/40 bg-app-bg-soft/80 backdrop-blur-xl shadow-header">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold">
              LIVE DASHBOARD{" "}
              <span className="hidden sm:inline text-xs text-app-muted align-middle">
                · CEO Legal Shield
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Live indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-app-success/40 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-app-success" />
              </span>
              <span className="text-app-muted">Monitoring</span>
            </div>

            {/* 현재 시간 표시 */}
            <div className="hidden sm:flex flex-col items-end text-[11px] leading-tight text-app-muted">
              <span>{new Date().toLocaleDateString()}</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 md:px-6 py-4 md:py-6">
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  label: string;
  to: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, to, active }) => {
  return (
    <Link
      to={to}
      className={[
        "w-full flex items-center px-3 py-2 rounded-lg text-left transition text-xs",
        active
          ? "bg-app-surface-soft text-app-foreground"
          : "text-app-muted hover:bg-app-surface-soft/70 hover:text-app-foreground",
      ].join(" ")}
    >
      <span className="truncate">{label}</span>
    </Link>
  );
};

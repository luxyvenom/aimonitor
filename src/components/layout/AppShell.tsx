import React from "react";

interface AppShellProps {
  children?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-app-bg bg-app-radial text-app-foreground flex">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 border-r border-app-border/60 bg-app-bg-soft/90 backdrop-blur-xl">
        <div className="h-16 flex items-center px-6 border-b border-app-border/40">
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
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          <SidebarItem label="대시보드" active />
          <SidebarItem label="Immutable Log" />
          <SidebarItem label="리포트" />
          <SidebarItem label="설정" />
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
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Row 1: 3D 인체 + G/Y/R 카드 */}
            <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] gap-4 md:gap-6">
              <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-4 md:p-5">
                <h2 className="text-sm font-semibold mb-2">LBP 인체 3D 모델</h2>
                <p className="text-xs text-app-muted mb-3">
                  요추(LBP) 부위를 실시간으로 시각화합니다.
                </p>
                <div className="h-64 md:h-80 rounded-card bg-black/40 flex items-center justify-center text-xs text-app-muted">
                  Worker3DModel goes here
                </div>
              </div>

              <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-subtle p-4 md:p-5">
                <h2 className="text-sm font-semibold mb-2">
                  G/Y/R 통합 위험 스코어
                </h2>
                <p className="text-xs text-app-muted mb-3">
                  신체/인지 부하를 통합한 실시간 위험도 관제 카드입니다.
                </p>
                <div className="h-64 md:h-80 rounded-card bg-black/30 flex items-center justify-center text-xs text-app-muted">
                  RiskScoreCard goes here
                </div>
              </div>
            </section>

            {/* Row 2: Immutable Log 전체 폭 */}
            <section className="bg-app-surface border border-app-border rounded-card shadow-card-soft p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-semibold">
                    Immutable Log (법적 방패)
                  </h2>
                  <p className="text-xs text-app-muted mt-1">
                    시간순 이벤트 로그로 CEO의 예방 의무 이행을 증명합니다.
                  </p>
                </div>
                <button className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-pill text-[11px] font-medium bg-app-accent text-white hover:bg-app-accent-soft transition">
                  PDF 리포트 생성
                </button>
              </div>
              <div className="h-64 md:h-72 rounded-card bg-black/25 flex items-center justify-center text-xs text-app-muted">
                ImmutableLogTable goes here
              </div>
            </section>

            {/* Row 3: Realtime 3D Chart + Trend Report */}
            <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-subtle p-4 md:p-5">
                <h2 className="text-sm font-semibold mb-2">
                  신체/인지 부하 3D 스캐터
                </h2>
                <p className="text-xs text-app-muted mb-3">
                  Plotly 3D 차트로 신체·인지 부하를 동시에 확인합니다.
                </p>
                <div className="h-64 rounded-card bg-black/35 flex items-center justify-center text-xs text-app-muted">
                  Realtime3DChart goes here
                </div>
              </div>

              <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-subtle p-4 md:p-5">
                <h2 className="text-sm font-semibold mb-2">
                  위험도 트렌드 & 라인별 히트맵
                </h2>
                <p className="text-xs text-app-muted mb-3">
                  재무/ESG 팀을 위한 비용 절감 및 위험도 감소 추이를 보여줍니다.
                </p>
                <div className="h-64 rounded-card bg-black/35 flex items-center justify-center text-xs text-app-muted">
                  TrendReportChart goes here
                </div>
              </div>
            </section>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, active }) => {
  return (
    <button
      className={[
        "w-full flex items-center px-3 py-2 rounded-lg text-left transition text-xs",
        active
          ? "bg-app-surface-soft text-app-foreground"
          : "text-app-muted hover:bg-app-surface-soft/70 hover:text-app-foreground",
      ].join(" ")}
      type="button"
    >
      <span className="truncate">{label}</span>
    </button>
  );
};

import React from "react";

export const Monitoring: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-6 md:p-8">
        <h1 className="text-xl font-semibold mb-4 text-app-foreground">
          실시간 모니터링
        </h1>
        <p className="text-sm text-app-muted mb-6">
          모든 작업자의 실시간 상태를 모니터링합니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4">
            <h3 className="text-sm font-semibold mb-3">활성 작업자</h3>
            <div className="h-48 rounded-card bg-black/25 flex items-center justify-center text-xs text-app-muted">
              실시간 작업자 목록
            </div>
          </div>
          <div className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4">
            <h3 className="text-sm font-semibold mb-3">알림 현황</h3>
            <div className="h-48 rounded-card bg-black/25 flex items-center justify-center text-xs text-app-muted">
              최근 알림 목록
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

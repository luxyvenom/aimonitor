import React from "react";

export const Teams: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-6 md:p-8">
        <h1 className="text-xl font-semibold mb-4 text-app-foreground">
          팀 관리
        </h1>
        <p className="text-sm text-app-muted mb-6">
          작업자 팀을 구성하고 관리합니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((team) => (
            <div
              key={team}
              className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4"
            >
              <h3 className="text-sm font-semibold mb-2">팀 {team}</h3>
              <p className="text-xs text-app-muted mb-3">
                팀원 수: {Math.floor(Math.random() * 20) + 5}명
              </p>
              <div className="h-32 rounded-card bg-black/25 flex items-center justify-center text-xs text-app-muted">
                팀 상세 정보
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

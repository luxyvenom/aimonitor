import React from "react";

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold mb-2 text-app-foreground">
              리포트
            </h1>
            <p className="text-sm text-app-muted">
              생성된 리포트를 확인하고 다운로드할 수 있습니다.
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 rounded-pill text-xs font-medium bg-app-accent text-white hover:bg-app-accent-soft transition">
            새 리포트 생성
          </button>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((report) => (
            <div
              key={report}
              className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold mb-1">
                  리포트 {report} - {new Date().toLocaleDateString()}
                </h3>
                <p className="text-xs text-app-muted">PDF 형식</p>
              </div>
              <button className="px-3 py-1.5 rounded-pill text-xs font-medium bg-app-accent/20 text-app-accent hover:bg-app-accent/30 transition">
                다운로드
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

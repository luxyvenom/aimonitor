import React from "react";

export const ImmutableLog: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-app-surface border border-app-border rounded-card shadow-card-soft p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold">Immutable Log (법적 방패)</h2>
            <p className="text-xs text-app-muted mt-1">
              시간순 이벤트 로그로 CEO의 예방 의무 이행을 증명합니다.
            </p>
          </div>
          <button className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-pill text-[11px] font-medium bg-app-accent text-white hover:bg-app-accent-soft transition">
            PDF 리포트 생성
          </button>
        </div>
        <div className="h-96 rounded-card bg-black/25 flex items-center justify-center text-xs text-app-muted">
          <div className="text-center space-y-2">
            <div>ImmutableLogTable</div>
            <div className="text-[10px] text-app-muted/70">
              블록체인 기반 변조 불가능한 로그
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";

export const MoreOptions: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-6 md:p-8">
        <h1 className="text-xl font-semibold mb-4 text-app-foreground">
          추가 옵션
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4">
            <h3 className="text-sm font-semibold mb-2">설정</h3>
            <p className="text-xs text-app-muted mb-3">
              시스템 설정 및 구성 옵션
            </p>
            <button className="w-full px-3 py-2 rounded-lg text-xs font-medium bg-app-accent/20 text-app-accent hover:bg-app-accent/30 transition">
              설정 열기
            </button>
          </div>
          <div className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4">
            <h3 className="text-sm font-semibold mb-2">도움말</h3>
            <p className="text-xs text-app-muted mb-3">사용 가이드 및 FAQ</p>
            <button className="w-full px-3 py-2 rounded-lg text-xs font-medium bg-app-accent/20 text-app-accent hover:bg-app-accent/30 transition">
              도움말 보기
            </button>
          </div>
          <div className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4">
            <h3 className="text-sm font-semibold mb-2">API 문서</h3>
            <p className="text-xs text-app-muted mb-3">
              API 사용 가이드 및 문서
            </p>
            <button className="w-full px-3 py-2 rounded-lg text-xs font-medium bg-app-accent/20 text-app-accent hover:bg-app-accent/30 transition">
              문서 보기
            </button>
          </div>
          <div className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4">
            <h3 className="text-sm font-semibold mb-2">문의하기</h3>
            <p className="text-xs text-app-muted mb-3">지원팀에 문의하기</p>
            <button className="w-full px-3 py-2 rounded-lg text-xs font-medium bg-app-accent/20 text-app-accent hover:bg-app-accent/30 transition">
              문의하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

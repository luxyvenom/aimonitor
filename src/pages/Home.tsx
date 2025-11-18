import React from "react";

export const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-6 md:p-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-app-foreground">
            RootLab AI R.I.S.E.
          </h1>
          <p className="text-lg text-app-muted">
            실시간 모니터링부터 클라우드 기반 솔루션까지
          </p>
          <p className="text-sm text-app-muted max-w-2xl mx-auto">
            AI 기반 실시간 모니터링 플랫폼으로 작업자의 안전과 건강을 보호하고,
            법적 책임을 명확히 증명합니다.
          </p>
        </div>
      </section>

      {/* 실시간 모니터링 섹션 */}
      <section className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4 text-app-foreground">
          실시간 모니터링
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-app-accent">
              실시간 데이터 수집
            </h3>
            <p className="text-xs text-app-muted">
              작업자의 신체 및 인지 부하를 실시간으로 수집하고 분석합니다. IoT
              센서와 웨어러블 디바이스를 통해 지속적인 모니터링이 가능합니다.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-app-accent">
              즉시 알림 시스템
            </h3>
            <p className="text-xs text-app-muted">
              위험도가 임계값을 초과하면 즉시 알림을 발송하여 사전 예방 조치를
              취할 수 있습니다. G/Y/R 위험도 스코어를 기반으로 자동 경고합니다.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-app-accent">3D 시각화</h3>
            <p className="text-xs text-app-muted">
              요추(LBP) 부위를 3D 모델로 실시간 시각화하여 신체 부하를
              직관적으로 확인할 수 있습니다.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-app-accent">
              대시보드 모니터링
            </h3>
            <p className="text-xs text-app-muted">
              통합 대시보드를 통해 모든 작업자의 상태를 한눈에 확인하고, 트렌드
              분석과 히트맵을 통해 패턴을 파악합니다.
            </p>
          </div>
        </div>
      </section>

      {/* AI 기반 분석 섹션 */}
      <section className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4 text-app-foreground">
          AI 기반 분석
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-app-accent">예측 분석</h3>
            <p className="text-xs text-app-muted">
              머신러닝 알고리즘을 통해 작업자의 부상 위험을 사전에 예측하고,
              개인별 맞춤형 안전 조치를 제안합니다.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-app-accent">패턴 인식</h3>
            <p className="text-xs text-app-muted">
              장기간 수집된 데이터를 분석하여 작업 패턴과 위험 요인을 식별하고,
              개선 방안을 제시합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 법적 방패 섹션 */}
      <section className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4 text-app-foreground">
          법적 방패 (CEO Legal Shield)
        </h2>
        <div className="space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-app-accent">
              Immutable Log
            </h3>
            <p className="text-xs text-app-muted">
              모든 모니터링 데이터와 조치 사항을 블록체인 기반 Immutable Log에
              기록하여 변조 불가능한 증거를 생성합니다. CEO의 예방 의무 이행을
              명확히 증명할 수 있습니다.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-app-accent">
              PDF 리포트 자동 생성
            </h3>
            <p className="text-xs text-app-muted">
              법적 분쟁 시 필요한 모든 증거 자료를 자동으로 PDF 리포트로
              생성하여 제공합니다. 시간순 이벤트 로그와 위험도 분석 결과를
              포함합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 클라우드 기반 섹션 */}
      <section className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4 text-app-foreground">
          클라우드 기반
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-app-accent">
              확장 가능한 인프라
            </h3>
            <p className="text-xs text-app-muted">
              클라우드 기반 아키텍처로 수백, 수천 명의 작업자도 안정적으로
              모니터링할 수 있습니다. 필요에 따라 자동으로 확장됩니다.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-app-accent">
              어디서나 접근
            </h3>
            <p className="text-xs text-app-muted">
              웹 기반 인터페이스로 어디서나 실시간 모니터링 데이터에 접근할 수
              있습니다. 모바일, 태블릿, 데스크톱 모든 기기에서 지원됩니다.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-app-accent">
              안전한 데이터 저장
            </h3>
            <p className="text-xs text-app-muted">
              엔터프라이즈급 보안과 암호화를 통해 개인정보와 모니터링 데이터를
              안전하게 보관합니다. 규정 준수와 데이터 보호를 보장합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 주요 기능 카드 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4">
          <div className="text-2xl font-bold text-app-accent mb-2">24/7</div>
          <div className="text-xs text-app-muted">실시간 모니터링</div>
        </div>
        <div className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4">
          <div className="text-2xl font-bold text-app-accent mb-2">AI</div>
          <div className="text-xs text-app-muted">예측 분석</div>
        </div>
        <div className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4">
          <div className="text-2xl font-bold text-app-accent mb-2">100%</div>
          <div className="text-xs text-app-muted">데이터 무결성</div>
        </div>
        <div className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4">
          <div className="text-2xl font-bold text-app-accent mb-2">Cloud</div>
          <div className="text-xs text-app-muted">클라우드 기반</div>
        </div>
      </section>
    </div>
  );
};

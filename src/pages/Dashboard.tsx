import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Worker3DModel } from "../components/Worker3DModel";
import { Realtime3DChart } from "../components/Realtime3DChart";

export const Dashboard: React.FC = () => {
  const [heartRate, setHeartRate] = useState(72);
  const [safetyEquipment, setSafetyEquipment] = useState({
    helmet: true,
    vest: true,
    boots: true,
  });
  const [lumbarRiskLevel, setLumbarRiskLevel] = useState<
    "low" | "medium" | "high"
  >("low");

  // 실시간 데이터 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      // 심박수 시뮬레이션 (60-100 BPM)
      setHeartRate(Math.floor(Math.random() * 40) + 60);

      // 위험도 계산 (심박수 기반)
      if (heartRate > 90) {
        setLumbarRiskLevel("high");
      } else if (heartRate > 75) {
        setLumbarRiskLevel("medium");
      } else {
        setLumbarRiskLevel("low");
      }

      // 안전 장비 상태 (가끔씩 변경)
      if (Math.random() > 0.9) {
        setSafetyEquipment({
          helmet: Math.random() > 0.1,
          vest: Math.random() > 0.1,
          boots: Math.random() > 0.1,
        });
      }
    }, 2000); // 2초마다 업데이트

    return () => clearInterval(interval);
  }, [heartRate]);

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Row 1: 3D 인체 + G/Y/R 카드 */}
        <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] gap-4 md:gap-6">
          <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-4 md:p-5">
            <h2 className="text-sm font-semibold mb-2">LBP 인체 3D 모델</h2>
            <p className="text-xs text-app-muted mb-3">
              요추(LBP) 부위를 실시간으로 시각화합니다.
            </p>
            <div className="h-64 md:h-80 rounded-card bg-black/40 relative overflow-hidden">
              <ErrorBoundary>
                <Worker3DModel
                  heartRate={heartRate}
                  safetyEquipment={safetyEquipment}
                  lumbarRiskLevel={lumbarRiskLevel}
                />
              </ErrorBoundary>
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

        {/* Row 3: Realtime 3D Chart + Trend Report */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-subtle p-4 md:p-5">
            <h2 className="text-sm font-semibold mb-2">
              신체/인지 부하 3D 스캐터
            </h2>
            <p className="text-xs text-app-muted mb-3">
              Plotly 3D 차트로 신체·인지 부하를 동시에 확인합니다.
            </p>
            <div className="h-64 rounded-card bg-black/35 relative overflow-hidden">
              <ErrorBoundary>
                <Realtime3DChart autoRotate={true} />
              </ErrorBoundary>
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
      </div>
    </ErrorBoundary>
  );
};

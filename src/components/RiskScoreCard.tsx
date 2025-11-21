import React from "react";
import type { RiskScoreData } from "../data/hardcodedRiskScore";
import {
  getRiskLevelColor,
  getRiskLevelBgColor,
  getRiskLevelHexColor,
} from "../utils/riskUtils";

interface RiskScoreCardProps {
  /**
   * 위험 스코어 데이터
   * undefined일 경우 하드코딩 데이터를 사용합니다.
   */
  data?: RiskScoreData;
  /**
   * 신체 부하 (실시간 업데이트용)
   */
  physicalLoad?: number;
  /**
   * 인지 부하 (실시간 업데이트용)
   */
  cognitiveLoad?: number;
}

export const RiskScoreCard: React.FC<RiskScoreCardProps> = ({
  data,
  physicalLoad,
  cognitiveLoad,
}) => {
  // 하드코딩 데이터 또는 props로 받은 데이터 사용
  const [riskData, setRiskData] = React.useState<RiskScoreData | null>(
    data || null
  );

  // physicalLoad와 cognitiveLoad가 제공되면 실시간 계산
  React.useEffect(() => {
    if (physicalLoad !== undefined && cognitiveLoad !== undefined) {
      const integratedRisk = physicalLoad * 0.4 + cognitiveLoad * 0.6;
      const riskScore = Math.round(Math.max(0, Math.min(100, integratedRisk)));

      let riskLevel: "green" | "yellow" | "red";
      if (riskScore >= 70) {
        riskLevel = "red";
      } else if (riskScore >= 40) {
        riskLevel = "yellow";
      } else {
        riskLevel = "green";
      }

      setRiskData({
        workerId: "W001",
        workerName: "김철수",
        role: "생산 1팀",
        riskScore,
        riskLevel,
        physicalLoad: Math.round(physicalLoad),
        cognitiveLoad: Math.round(cognitiveLoad),
        detail: "실시간 모니터링 중",
        timestamp: new Date(),
      });
    } else if (!data) {
      // 하드코딩 데이터 import
      import("../data/hardcodedRiskScore").then((module) => {
        setRiskData(module.hardcodedRiskScoreData);
      });
    }
  }, [data, physicalLoad, cognitiveLoad]);

  if (!riskData) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-app-muted">
        데이터 로딩 중...
      </div>
    );
  }

  const colors = {
    text: getRiskLevelColor(riskData.riskLevel),
    bg: getRiskLevelBgColor(riskData.riskLevel),
    hex: getRiskLevelHexColor(riskData.riskLevel),
  };

  const isRedZone = riskData.riskLevel === "red";

  return (
    <div className="h-full flex flex-col">
      {/* 대형 스코어 표시 */}
      <div className="flex-1 flex flex-col items-center justify-center mb-4">
        <div
          className={`text-7xl md:text-8xl font-bold mb-2 ${colors.text} transition-all duration-300 ${
            isRedZone ? "animate-pulse" : ""
          }`}
          style={{
            textShadow: `0 0 20px ${colors.hex}40`,
          }}
        >
          {riskData.riskScore}
        </div>
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-semibold ${colors.bg} ${colors.text}`}
        >
          <span
            className={`w-3 h-3 rounded-full ${
              riskData.riskLevel === "red"
                ? "bg-app-danger"
                : riskData.riskLevel === "yellow"
                ? "bg-app-warning"
                : "bg-app-success"
            }`}
          />
          <span>
            {riskData.riskLevel === "red"
              ? "위험"
              : riskData.riskLevel === "yellow"
              ? "주의"
              : "안전"}
          </span>
        </div>
      </div>

      {/* 작업자 정보 */}
      <div className="space-y-3">
        <div className="border-t border-app-border/50 pt-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-semibold text-sm text-app-foreground">
                {riskData.workerName}
              </div>
              <div className="text-xs text-app-muted">
                {riskData.role} · {riskData.workerId}
              </div>
            </div>
          </div>
          <div className="text-xs text-app-muted mt-2">{riskData.detail}</div>
        </div>

        {/* 부하 정보 */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-app-surface-soft rounded-card p-2 border border-app-border/50">
            <div className="text-app-muted mb-1">신체 부하</div>
            <div className="font-semibold text-app-foreground">
              {riskData.physicalLoad}
            </div>
          </div>
          <div className="bg-app-surface-soft rounded-card p-2 border border-app-border/50">
            <div className="text-app-muted mb-1">인지 부하</div>
            <div className="font-semibold text-app-foreground">
              {riskData.cognitiveLoad}
            </div>
          </div>
        </div>

        {/* Red Zone 조치 버튼 */}
        {isRedZone && (
          <div className="pt-2 space-y-2">
            <button
              className={`w-full px-4 py-2.5 rounded-card border font-medium text-sm transition-all ${colors.bg} ${colors.text} hover:opacity-90 active:scale-95`}
            >
              🚨 작업 중지 권고
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`px-3 py-2 rounded-card border text-xs font-medium transition-all ${colors.bg} ${colors.text} hover:opacity-90 active:scale-95`}
              >
                관리자 알림
              </button>
              <button
                className={`px-3 py-2 rounded-card border text-xs font-medium transition-all ${colors.bg} ${colors.text} hover:opacity-90 active:scale-95`}
              >
                긴급 조치
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


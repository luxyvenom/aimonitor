/**
 * 위험도 관련 유틸리티 함수
 * 프로젝트 전반에서 사용되는 위험도 관련 함수들을 정의합니다.
 */

import type { RiskLevel } from "../types/common.types";

// 공통 타입 재export
export type { RiskLevel };

/**
 * 위험도 레벨 타입 (low/medium/high를 green/yellow/red로 매핑)
 */
export type LumbarRiskLevel = "low" | "medium" | "high";

/**
 * 위험도 레벨에 따른 텍스트 색상 (Tailwind 클래스)
 */
export const getRiskLevelColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case "red":
      return "text-app-danger";
    case "yellow":
      return "text-app-warning";
    case "green":
      return "text-app-success";
    default:
      return "text-app-muted";
  }
};

/**
 * 위험도 레벨에 따른 배경 색상 (Tailwind 클래스)
 */
export const getRiskLevelBgColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case "red":
      return "bg-app-danger/10 border-app-danger/30";
    case "yellow":
      return "bg-app-warning/10 border-app-warning/30";
    case "green":
      return "bg-app-success/10 border-app-success/30";
    default:
      return "bg-app-surface-soft";
  }
};

/**
 * 위험도 레벨에 따른 HEX 색상 (Three.js, Canvas 등에서 사용)
 */
export const getRiskLevelHexColor = (riskLevel: RiskLevel | LumbarRiskLevel): string => {
  // RiskLevel (green/yellow/red)
  if (riskLevel === "red") {
    return "#ef4444"; // app-danger
  }
  if (riskLevel === "yellow") {
    return "#facc15"; // app-warning
  }
  if (riskLevel === "green") {
    return "#22c55e"; // app-success
  }
  
  // LumbarRiskLevel (low/medium/high)
  if (riskLevel === "high") {
    return "#ef4444"; // app-danger
  }
  if (riskLevel === "medium") {
    return "#facc15"; // app-warning
  }
  if (riskLevel === "low") {
    return "#22c55e"; // app-success
  }
  
  return "#64748b"; // app-muted (기본값)
};

/**
 * 스코어로 위험도 레벨 계산
 */
export const getRiskLevelFromScore = (score: number): RiskLevel => {
  if (score >= 70) {
    return "red";
  } else if (score >= 40) {
    return "yellow";
  } else {
    return "green";
  }
};

/**
 * LumbarRiskLevel을 RiskLevel로 변환
 */
export const lumbarRiskToRiskLevel = (lumbarRisk: LumbarRiskLevel): RiskLevel => {
  switch (lumbarRisk) {
    case "high":
      return "red";
    case "medium":
      return "yellow";
    case "low":
      return "green";
    default:
      return "green";
  }
};


/**
 * 위험도 트렌드 & 라인별 히트맵 하드코딩 데이터
 * 실제 데이터가 들어오면 이 파일의 데이터를 API 응답으로 교체하면 됩니다.
 */

import type { RiskLevel } from "../types/common.types";
import { getRiskLevelFromScore } from "../utils/riskUtils";

export interface HeatmapDataPoint {
  workspace: string; // 작업장 ID (WS001, WS002, WS003)
  team: string; // 팀 이름 (A팀, B팀, C팀, D팀)
  date: string; // 날짜 (YYYY-MM-DD)
  riskScore: number; // 평균 위험도 스코어 (0-100)
  riskLevel: RiskLevel;
}

export interface TrendDataPoint {
  date: string; // 날짜 (YYYY-MM-DD)
  averageRiskScore: number; // 전체 평균 위험도
  physicalLoadAvg: number; // 신체 부하 평균
  cognitiveLoadAvg: number; // 인지 부하 평균
  workerCount: number; // 작업자 수
}

export interface TrendReportData {
  heatmapData: HeatmapDataPoint[];
  trendData: TrendDataPoint[];
}

/**
 * 최근 7일간의 날짜 배열 생성
 */
const generateLast7Days = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  
  return dates;
};

/**
 * 작업장 및 팀 정보
 */
const workspaces = ["WS001", "WS002", "WS003"];
const teams = ["A팀", "B팀", "C팀", "D팀"];

/**
 * 라인별 히트맵 데이터 생성
 * 최근 7일간의 작업장/팀별 위험도 데이터
 */
export const generateHeatmapData = (): HeatmapDataPoint[] => {
  const dates = generateLast7Days();
  const heatmapData: HeatmapDataPoint[] = [];

  workspaces.forEach((workspace) => {
    teams.forEach((team) => {
      dates.forEach((date) => {
        // 랜덤 위험도 생성 (일부 팀은 높은 위험도, 일부는 낮은 위험도)
        const baseRisk = workspace === "WS001" && team === "A팀" ? 75 : 
                        workspace === "WS002" && team === "C팀" ? 65 :
                        Math.random() * 60 + 20;
        const riskScore = Math.round(baseRisk + (Math.random() - 0.5) * 20);
        const clampedRiskScore = Math.max(0, Math.min(100, riskScore));
        const riskLevel = getRiskLevelFromScore(clampedRiskScore);

        heatmapData.push({
          workspace,
          team,
          date,
          riskScore: clampedRiskScore,
          riskLevel,
        });
      });
    });
  });

  return heatmapData;
};

/**
 * 전체 평균 추이 데이터 생성
 * 최근 7일간의 일별 평균 위험도 및 부하 데이터
 */
export const generateTrendData = (): TrendDataPoint[] => {
  const dates = generateLast7Days();
  const trendData: TrendDataPoint[] = [];

  dates.forEach((date, index) => {
    // 시간이 지날수록 위험도가 감소하는 추세 (개선 효과)
    const improvementFactor = 1 - (index * 0.05); // 5%씩 개선
    const baseRiskScore = 65 * improvementFactor;
    const basePhysicalLoad = 50 * improvementFactor;
    const baseCognitiveLoad = 45 * improvementFactor;

    trendData.push({
      date,
      averageRiskScore: Math.round(
        baseRiskScore + (Math.random() - 0.5) * 10
      ),
      physicalLoadAvg: Math.round(
        basePhysicalLoad + (Math.random() - 0.5) * 8
      ),
      cognitiveLoadAvg: Math.round(
        baseCognitiveLoad + (Math.random() - 0.5) * 8
      ),
      workerCount: Math.floor(Math.random() * 10) + 15, // 15-25명
    });
  });

  return trendData;
};

/**
 * 하드코딩된 트렌드 리포트 데이터
 */
export const hardcodedTrendReportData: TrendReportData = {
  heatmapData: generateHeatmapData(),
  trendData: generateTrendData(),
};


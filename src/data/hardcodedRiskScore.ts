/**
 * G/Y/R 통합 위험 스코어 하드코딩 데이터
 * 실제 데이터가 들어오면 이 파일의 데이터를 API 응답으로 교체하면 됩니다.
 */

import type { RiskLevel } from "../types/common.types";
import { getRiskLevelFromScore } from "../utils/riskUtils";

export interface RiskScoreData {
  workerId: string;
  workerName: string;
  role: string;
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  physicalLoad: number; // 신체 부하
  cognitiveLoad: number; // 인지 부하
  detail: string; // 상세 정보
  timestamp: Date;
}

/**
 * 하드코딩된 위험 스코어 데이터
 * Monitoring.tsx의 activeWorkersData를 기반으로 생성
 */
export const hardcodedRiskScoreData: RiskScoreData = {
  workerId: "W001",
  workerName: "김철수",
  role: "생산 1팀",
  riskScore: 94,
  riskLevel: "red",
  physicalLoad: 75,
  cognitiveLoad: 85,
  detail: "인지-운동 간섭 감지 (시야각 40% 저하)",
  timestamp: new Date(),
};

/**
 * 신체 부하와 인지 부하로부터 통합 위험도 계산
 * @param physicalLoad 신체 부하 (0-100)
 * @param cognitiveLoad 인지 부하 (0-100)
 * @returns 통합 위험도 스코어 (0-100)
 */
export const calculateIntegratedRisk = (
  physicalLoad: number,
  cognitiveLoad: number
): number => {
  // 인지 부하가 더 중요 (가중치: 신체 0.4, 인지 0.6)
  const integratedRisk = physicalLoad * 0.4 + cognitiveLoad * 0.6;
  return Math.round(Math.max(0, Math.min(100, integratedRisk)));
};

/**
 * 신체 부하와 인지 부하로부터 RiskScoreData 생성
 * @param workerId 작업자 ID
 * @param workerName 작업자 이름
 * @param role 역할
 * @param physicalLoad 신체 부하
 * @param cognitiveLoad 인지 부하
 * @param detail 상세 정보
 * @returns RiskScoreData
 */
export const createRiskScoreData = (
  workerId: string,
  workerName: string,
  role: string,
  physicalLoad: number,
  cognitiveLoad: number,
  detail: string
): RiskScoreData => {
  const riskScore = calculateIntegratedRisk(physicalLoad, cognitiveLoad);
  const riskLevel = getRiskLevelFromScore(riskScore);

  return {
    workerId,
    workerName,
    role,
    riskScore,
    riskLevel,
    physicalLoad: Math.round(physicalLoad),
    cognitiveLoad: Math.round(cognitiveLoad),
    detail,
    timestamp: new Date(),
  };
};


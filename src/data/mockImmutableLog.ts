/**
 * Immutable Log Mock 데이터
 * 실제 데이터가 들어오면 이 파일의 데이터를 API 응답으로 교체하면 됩니다.
 */

import type { ImmutableLogEntry, ManagerResponse } from "../types/immutableLog.types";
import { WORKER_NAMES, SYSTEM_ACTIONS } from "../constants/common";
import { getRiskLevelFromScore } from "../utils/riskUtils";

/**
 * Mock Immutable Log 데이터 생성
 * 최근 20개 로그 항목을 생성합니다.
 */
export const generateMockImmutableLog = (): ImmutableLogEntry[] => {
  const logs: ImmutableLogEntry[] = [];
  const now = new Date();

  // 최근 20개 로그 생성 (시간 역순으로, 최신이 먼저)
  for (let i = 0; i < 20; i++) {
    // 시간: 최신부터 과거로 (최대 48시간 전까지)
    const hoursAgo = Math.random() * 48;
    const timestamp = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);

    // 작업자 랜덤 선택
    const workerIndex = Math.floor(Math.random() * WORKER_NAMES.length);
    const workerId = `W${String(workerIndex + 1).padStart(3, "0")}`;
    const workerName = WORKER_NAMES[workerIndex];

    // 위험도 스코어 생성 (0-100)
    // Red Zone 확률을 높이기 위해 가중치 적용
    const riskScore = Math.floor(Math.random() * 100);
    
    // 위험도 레벨 결정
    const riskLevel = getRiskLevelFromScore(riskScore);

    // Red Zone일 경우 더 강력한 조치
    const systemAction =
      riskLevel === "red"
        ? SYSTEM_ACTIONS[Math.floor(Math.random() * 4)] // 상위 4개 조치
        : SYSTEM_ACTIONS[Math.floor(Math.random() * SYSTEM_ACTIONS.length)];

    // 관리자 대응 상태
    // Red Zone은 대부분 "yes" 또는 "pending", Green은 "pending" 또는 "no"
    let managerResponse: ManagerResponse;
    if (riskLevel === "red") {
      const rand = Math.random();
      managerResponse = rand > 0.6 ? "yes" : rand > 0.3 ? "pending" : "no";
    } else if (riskLevel === "yellow") {
      const rand = Math.random();
      managerResponse = rand > 0.5 ? "pending" : rand > 0.25 ? "yes" : "no";
    } else {
      const rand = Math.random();
      managerResponse = rand > 0.7 ? "pending" : rand > 0.4 ? "yes" : "no";
    }

    // 추가 상세 정보 (선택사항, Red Zone일 때만 추가)
    const details =
      riskLevel === "red" && Math.random() > 0.5
        ? `요추 부하 ${riskScore}% 감지. 즉시 조치 필요.`
        : undefined;

    logs.push({
      timestamp,
      workerId,
      workerName,
      riskScore,
      riskLevel,
      systemAction,
      managerResponse,
      details,
    });
  }

  // 시간순 정렬 (최신순)
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

/**
 * 초기 Mock 데이터 (컴포넌트에서 바로 사용 가능)
 */
export const mockImmutableLogData: ImmutableLogEntry[] = generateMockImmutableLog();


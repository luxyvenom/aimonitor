/**
 * Immutable Log 타입 정의
 * 법적 방패 기능을 위한 변조 불가능한 로그 엔트리 타입
 */

import type { RiskLevel, ManagerResponse } from "./common.types";

// 공통 타입 재export
export type { RiskLevel, ManagerResponse };

export interface ImmutableLogEntry {
  /** 이벤트 발생 시간 */
  timestamp: Date;
  /** 작업자 ID */
  workerId: string;
  /** 작업자 이름 */
  workerName: string;
  /** 위험도 스코어 (0-100) */
  riskScore: number;
  /** 위험도 레벨 */
  riskLevel: RiskLevel;
  /** 시스템 자동 조치 (예: "휴식 권고", "작업 중단 요청") */
  systemAction: string;
  /** 관리자 대응 상태 */
  managerResponse: ManagerResponse;
  /** 추가 상세 정보 (선택사항) */
  details?: string;
}

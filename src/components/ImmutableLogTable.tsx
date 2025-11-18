import React, { useState, useMemo } from "react";
import type { ImmutableLogEntry, RiskLevel } from "../types/immutableLog.types";

interface ImmutableLogTableProps {
  /** 로그 데이터 배열 */
  logs: ImmutableLogEntry[];
  /** Red Zone 필터 활성화 여부 (기본값: false) */
  defaultFilterRedZone?: boolean;
}

/**
 * 위험도 레벨에 따른 색상 반환
 */
const getRiskLevelColor = (riskLevel: RiskLevel): string => {
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
 * 위험도 레벨에 따른 배경 색상 반환
 */
const getRiskLevelBgColor = (riskLevel: RiskLevel): string => {
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
 * 관리자 대응 상태에 따른 텍스트 반환
 */
const getManagerResponseText = (
  response: "yes" | "no" | "pending"
): string => {
  switch (response) {
    case "yes":
      return "대응 완료";
    case "no":
      return "대응 없음";
    case "pending":
      return "대기 중";
    default:
      return "-";
  }
};

/**
 * 관리자 대응 상태에 따른 색상 반환
 */
const getManagerResponseColor = (
  response: "yes" | "no" | "pending"
): string => {
  switch (response) {
    case "yes":
      return "text-app-success";
    case "no":
      return "text-app-danger";
    case "pending":
      return "text-app-warning";
    default:
      return "text-app-muted";
  }
};

/**
 * 날짜/시간 포맷팅
 */
const formatDateTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}일 전`;
  } else if (diffHours > 0) {
    return `${diffHours}시간 전`;
  } else {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return diffMins > 0 ? `${diffMins}분 전` : "방금 전";
  }
};

/**
 * Immutable Log Table 컴포넌트
 * 법적 방패 기능을 위한 변조 불가능한 로그 테이블
 */
export const ImmutableLogTable: React.FC<ImmutableLogTableProps> = ({
  logs,
  defaultFilterRedZone = false,
}) => {
  const [filterRedZone, setFilterRedZone] = useState(defaultFilterRedZone);

  // 필터링된 로그 데이터
  const filteredLogs = useMemo(() => {
    if (!filterRedZone) {
      return logs;
    }
    return logs.filter((log) => log.riskLevel === "red");
  }, [logs, filterRedZone]);

  // Red Zone 개수 계산
  const redZoneCount = useMemo(
    () => logs.filter((log) => log.riskLevel === "red").length,
    [logs]
  );

  return (
    <div className="space-y-3">
      {/* 필터 및 통계 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterRedZone(!filterRedZone)}
            className={[
              "px-3 py-1.5 rounded-pill text-[11px] font-medium transition",
              filterRedZone
                ? "bg-app-danger text-white hover:bg-app-danger/90"
                : "bg-app-surface-soft text-app-muted hover:bg-app-surface-soft/80 border border-app-border/50",
            ].join(" ")}
          >
            {filterRedZone ? "전체 보기" : "Red Zone만 보기"}
            {redZoneCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">
                {redZoneCount}
              </span>
            )}
          </button>
          <span className="text-[11px] text-app-muted">
            총 {logs.length}개 로그
            {filterRedZone && ` (Red Zone: ${filteredLogs.length}개)`}
          </span>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-app-border/50">
                <th className="px-3 py-2.5 text-[11px] font-semibold text-app-muted uppercase tracking-wider">
                  시간
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-app-muted uppercase tracking-wider">
                  작업자
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-app-muted uppercase tracking-wider">
                  위험도
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-app-muted uppercase tracking-wider">
                  시스템 조치
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-app-muted uppercase tracking-wider">
                  관리자 대응
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-app-muted uppercase tracking-wider">
                  상세
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border/30">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-8 text-center text-xs text-app-muted"
                  >
                    표시할 로그가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, index) => (
                  <tr
                    key={`${log.timestamp.getTime()}-${log.workerId}-${index}`}
                    className={[
                      "hover:bg-app-surface-soft/50 transition",
                      log.riskLevel === "red" && "bg-app-danger/5",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {/* 시간 */}
                    <td className="px-3 py-2.5 text-[11px] text-app-foreground whitespace-nowrap">
                      <div className="flex flex-col">
                        <span>{formatDateTime(log.timestamp)}</span>
                        <span className="text-[10px] text-app-muted">
                          {log.timestamp.toLocaleString("ko-KR", {
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </td>

                    {/* 작업자 */}
                    <td className="px-3 py-2.5 text-[11px] text-app-foreground">
                      <div className="flex flex-col">
                        <span className="font-medium">{log.workerName}</span>
                        <span className="text-[10px] text-app-muted">
                          {log.workerId}
                        </span>
                      </div>
                    </td>

                    {/* 위험도 */}
                    <td className="px-3 py-2.5">
                      <div
                        className={[
                          "inline-flex items-center gap-2 px-2 py-1 rounded-md border text-[11px] font-medium",
                          getRiskLevelBgColor(log.riskLevel),
                          getRiskLevelColor(log.riskLevel),
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "w-2 h-2 rounded-full",
                            log.riskLevel === "red"
                              ? "bg-app-danger"
                              : log.riskLevel === "yellow"
                              ? "bg-app-warning"
                              : "bg-app-success",
                          ].join(" ")}
                        />
                        <span>{log.riskScore}</span>
                        <span className="text-[10px] opacity-75">
                          ({log.riskLevel.toUpperCase()})
                        </span>
                      </div>
                    </td>

                    {/* 시스템 조치 */}
                    <td className="px-3 py-2.5 text-[11px] text-app-foreground">
                      {log.systemAction}
                    </td>

                    {/* 관리자 대응 */}
                    <td className="px-3 py-2.5">
                      <span
                        className={[
                          "text-[11px] font-medium",
                          getManagerResponseColor(log.managerResponse),
                        ].join(" ")}
                      >
                        {getManagerResponseText(log.managerResponse)}
                      </span>
                    </td>

                    {/* 상세 */}
                    <td className="px-3 py-2.5 text-[11px] text-app-muted">
                      {log.details ? (
                        <span className="text-[10px]">{log.details}</span>
                      ) : (
                        <span className="text-[10px] opacity-50">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 법적 방패 안내 */}
      <div className="pt-2 border-t border-app-border/30">
        <p className="text-[10px] text-app-muted text-center">
          🔒 블록체인 기반 변조 불가능한 로그 · 중대재해처벌법 대응 · 예방 의무
          완벽 증명
        </p>
      </div>
    </div>
  );
};


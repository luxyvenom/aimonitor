import React from "react";

// 활성 작업자 데이터
const activeWorkersData = [
  {
    id: "W001",
    name: "김철수",
    role: "생산 1팀",
    status: "DANGER", // 빨간색 표시
    riskScore: 94,
    detail: "인지-운동 간섭 감지 (시야각 40% 저하)",
  },
  {
    id: "W002",
    name: "이영희",
    role: "물류팀",
    status: "NORMAL", // 초록색 표시
    riskScore: 12,
    detail: "L5-S1 척추 부하 안정",
  },
  {
    id: "W003",
    name: "박준형",
    role: "조립팀",
    status: "WARNING", // 노란색 표시
    riskScore: 65,
    detail: "반복 작업 피로도 누적 중",
  },
];

// 알림 현황 데이터
const recentAlertsData = [
  {
    id: "A001",
    time: "14:02:45",
    type: "CRITICAL", // 빨간색 뱃지 (위급)
    message: "[위험 예측] 김철수 작업자 '낙상 위험' 85% 급증 (NMRI Engine)",
  },
  {
    id: "A002",
    time: "14:02:46",
    type: "SYSTEM", // 파란색 뱃지 (시스템)
    message: "[자동 조치] 현장 관리자에게 '작업 중지' 권고 발송 완료",
  },
  {
    id: "A003",
    time: "14:02:47",
    type: "INFO", // 회색 뱃지 (정보)
    message:
      "[로그 기록] 사고 예방 조치 데이터 불변 로그 저장됨 (Hash: 0x7f8a...)",
  },
  {
    id: "A004",
    time: "13:50:00",
    type: "WARNING", // 노란색 뱃지 (경고)
    message: "[주의] B구역 습도 증가로 인한 미끄러짐 주의보 발령",
  },
];

// 상태에 따른 색상 클래스 반환
const getStatusColor = (status: string) => {
  switch (status) {
    case "DANGER":
      return {
        bg: "bg-app-danger/10 border-app-danger/30",
        text: "text-app-danger",
        dot: "bg-app-danger",
      };
    case "WARNING":
      return {
        bg: "bg-app-warning/10 border-app-warning/30",
        text: "text-app-warning",
        dot: "bg-app-warning",
      };
    case "NORMAL":
      return {
        bg: "bg-app-success/10 border-app-success/30",
        text: "text-app-success",
        dot: "bg-app-success",
      };
    default:
      return {
        bg: "bg-app-surface-soft",
        text: "text-app-muted",
        dot: "bg-app-muted",
      };
  }
};

// 알림 타입에 따른 색상 클래스 반환
const getAlertTypeColor = (type: string) => {
  switch (type) {
    case "CRITICAL":
      return {
        bg: "bg-app-danger/10 border-app-danger/30",
        text: "text-app-danger",
        dot: "bg-app-danger",
      };
    case "WARNING":
      return {
        bg: "bg-app-warning/10 border-app-warning/30",
        text: "text-app-warning",
        dot: "bg-app-warning",
      };
    case "SYSTEM":
      return {
        bg: "bg-app-accent/10 border-app-accent/30",
        text: "text-app-accent",
        dot: "bg-app-accent",
      };
    case "INFO":
      return {
        bg: "bg-app-muted/10 border-app-muted/30",
        text: "text-app-muted",
        dot: "bg-app-muted",
      };
    default:
      return {
        bg: "bg-app-surface-soft",
        text: "text-app-muted",
        dot: "bg-app-muted",
      };
  }
};

export const Monitoring: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-6 md:p-8">
        <h1 className="text-xl font-semibold mb-4 text-app-foreground">
          실시간 모니터링
        </h1>
        <p className="text-sm text-app-muted mb-6">
          모든 작업자의 실시간 상태를 모니터링합니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 활성 작업자 리스트 */}
          <div className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4">
            <h3 className="text-sm font-semibold mb-3 text-app-foreground">
              활성 작업자
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {activeWorkersData.map((worker) => {
                const colors = getStatusColor(worker.status);
                return (
                  <div
                    key={worker.id}
                    className={`p-3 rounded-card border ${colors.bg} ${colors.text}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${colors.dot}`}
                        />
                        <div>
                          <div className="font-medium text-sm">
                            {worker.name}
                          </div>
                          <div className="text-xs opacity-75">
                            {worker.role} · {worker.id}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-md border text-xs font-medium ${colors.bg} ${colors.text}`}
                      >
                        {worker.riskScore}
                      </div>
                    </div>
                    <div className="text-xs opacity-80 mt-1">
                      {worker.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 알림 현황 리스트 */}
          <div className="bg-app-surface border border-app-border/70 rounded-card shadow-card-subtle p-4">
            <h3 className="text-sm font-semibold mb-3 text-app-foreground">
              알림 현황
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {recentAlertsData.map((alert) => {
                const colors = getAlertTypeColor(alert.type);
                return (
                  <div
                    key={alert.id}
                    className="p-3 rounded-card border border-app-border/50 bg-app-surface-soft"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${colors.dot}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded-md border text-[10px] font-medium ${colors.bg} ${colors.text}`}
                          >
                            {alert.type}
                          </span>
                          <span className="text-[10px] text-app-muted font-mono">
                            {alert.time}
                          </span>
                        </div>
                        <div className="text-xs text-app-foreground">
                          {alert.message}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { ImmutableLogTable } from "../components/ImmutableLogTable";
import { mockImmutableLogData } from "../data/mockImmutableLog";

export const ImmutableLog: React.FC = () => {
  const [logs] = useState(mockImmutableLogData);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  /**
   * PDF 리포트 생성 핸들러
   * 실제 구현 시 서버 API 호출 또는 클라이언트 사이드 PDF 생성 라이브러리 사용
   */
  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    
    // PDF 생성 시뮬레이션 (실제로는 서버 API 호출 또는 jsPDF 사용)
    try {
      // 서버 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // 성공 메시지 (실제로는 PDF 다운로드)
      alert(
        `PDF 리포트가 생성되었습니다.\n\n` +
        `총 ${logs.length}개 로그 항목이 포함되었습니다.\n` +
        `Red Zone 이벤트: ${logs.filter((log) => log.riskLevel === "red").length}개\n\n` +
        `(실제 구현 시 PDF 파일이 다운로드됩니다)`
      );
    } catch (error) {
      console.error("PDF 생성 실패:", error);
      alert("PDF 리포트 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* 헤더 섹션 */}
        <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-base md:text-lg font-semibold text-app-foreground">
                Immutable Log (법적 방패)
              </h2>
              <p className="text-xs text-app-muted mt-1.5">
                시간순 이벤트 로그로 CEO의 예방 의무 이행을 증명합니다.
                <br className="hidden sm:inline" />
                중대재해처벌법 대응을 위한 변조 불가능한 디지털 알리바이입니다.
              </p>
            </div>
            <button
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
              className={[
                "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-pill text-xs font-medium transition",
                "bg-app-accent text-white hover:bg-app-accent-soft",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "focus:outline-none focus:ring-2 focus:ring-app-accent/50",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {isGeneratingPDF ? (
                <>
                  <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  생성 중...
                </>
              ) : (
                <>
                  <span>📄</span>
                  PDF 리포트 생성
                </>
              )}
            </button>
          </div>

          {/* Immutable Log Table */}
          <div className="bg-app-surface border border-app-border/50 rounded-card p-4">
            <ImmutableLogTable logs={logs} defaultFilterRedZone={false} />
          </div>
        </div>

        {/* 법적 가치 설명 섹션 */}
        <div className="bg-app-surface-soft/50 border border-app-border/50 rounded-card p-4 md:p-5">
          <h3 className="text-sm font-semibold text-app-foreground mb-2">
            법적 방패 가치
          </h3>
          <ul className="space-y-1.5 text-xs text-app-muted">
            <li className="flex items-start gap-2">
              <span className="text-app-accent mt-0.5">•</span>
              <span>
                <strong className="text-app-foreground">변조 불가능:</strong> 블록체인 기반
                로그로 조작이 불가능합니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-app-accent mt-0.5">•</span>
              <span>
                <strong className="text-app-foreground">예방 의무 증명:</strong> CEO의 안전
                관리 의무 이행을 명확히 증명합니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-app-accent mt-0.5">•</span>
              <span>
                <strong className="text-app-foreground">법적 분쟁 대응:</strong> 중대재해처벌법
                관련 법적 분쟁 시 강력한 증거 자료로 활용 가능합니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-app-accent mt-0.5">•</span>
              <span>
                <strong className="text-app-foreground">관리자 대응 추적:</strong> 모든 위험
                이벤트에 대한 관리자 대응 여부를 기록하여 책임 소재를 명확히 합니다.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </ErrorBoundary>
  );
};

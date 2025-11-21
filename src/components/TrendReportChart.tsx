import React, { useEffect, useRef } from "react";
import * as PlotlyModule from "react-plotly.js";
import type { TrendReportData } from "../data/hardcodedTrendReport";
import { hardcodedTrendReportData } from "../data/hardcodedTrendReport";

// react-plotly.js의 default export가 객체일 수 있으므로 처리
const Plot =
  (PlotlyModule as any).default?.default ||
  (PlotlyModule as any).default ||
  PlotlyModule;

interface TrendReportChartProps {
  /**
   * 트렌드 리포트 데이터
   * undefined일 경우 하드코딩 데이터를 사용합니다.
   */
  data?: TrendReportData;
}

export const TrendReportChart: React.FC<TrendReportChartProps> = ({
  data,
}) => {
  const heatmapPlotRef = useRef<any>(null);
  const trendPlotRef = useRef<any>(null);
  const [reportData, setReportData] =
    React.useState<TrendReportData | null>(null);

  // 데이터 로드
  useEffect(() => {
    if (data) {
      setReportData(data);
    } else {
      setReportData(hardcodedTrendReportData);
    }
  }, [data]);

  // 히트맵 데이터 준비
  useEffect(() => {
    if (!reportData || !heatmapPlotRef.current) return;

    const heatmapData = reportData.heatmapData;

    // 작업장-팀 조합 목록 생성
    const workspaceTeamPairs = Array.from(
      new Set(
        heatmapData.map((d) => `${d.workspace}-${d.team}`)
      )
    ).sort();

    // 날짜 목록
    const dates = Array.from(new Set(heatmapData.map((d) => d.date))).sort();

    // 히트맵 Z 데이터 (위험도 스코어)
    const z: number[][] = workspaceTeamPairs.map((pair) => {
      return dates.map((date) => {
        const point = heatmapData.find(
          (d) => `${d.workspace}-${d.team}` === pair && d.date === date
        );
        return point ? point.riskScore : 0;
      });
    });

    // 색상 스케일 (G/Y/R)
    const colorscale: [number, string][] = [
      [0, "#22c55e"], // Green
      [0.4, "#facc15"], // Yellow
      [1, "#ef4444"], // Red
    ];

    const heatmapTrace = {
      x: dates,
      y: workspaceTeamPairs,
      z: z,
      type: "heatmap" as const,
      colorscale: colorscale,
      showscale: true,
      colorbar: {
        title: "위험도",
        titleside: "right",
        tickmode: "array",
        tickvals: [0, 40, 70, 100],
        ticktext: ["0", "40", "70", "100"],
      },
      hovertemplate:
        "<b>%{y}</b><br>날짜: %{x}<br>위험도: %{z}<extra></extra>",
    };

    const layout = {
      title: {
        text: "라인별 위험도 히트맵",
        font: { size: 14, color: "#111827" },
      },
      xaxis: {
        title: "날짜",
        tickangle: -45,
      },
      yaxis: {
        title: "작업장-팀",
      },
      margin: { l: 120, r: 20, t: 50, b: 80 },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { color: "#6b7280", size: 11 },
    };

    const config = {
      displayModeBar: false,
      responsive: true,
    };

    Plot.newPlot(heatmapPlotRef.current, [heatmapTrace], layout, config);
  }, [reportData]);

  // 추이 그래프 데이터 준비
  useEffect(() => {
    if (!reportData || !trendPlotRef.current) return;

    const trendData = reportData.trendData;
    const dates = trendData.map((d) => d.date);

    // 위험도 스코어 추이
    const riskScoreTrace = {
      x: dates,
      y: trendData.map((d) => d.averageRiskScore),
      type: "scatter" as const,
      mode: "lines+markers" as const,
      name: "평균 위험도",
      line: { color: "#ef4444", width: 3 },
      marker: { size: 6 },
    };

    // 신체 부하 평균
    const physicalLoadTrace = {
      x: dates,
      y: trendData.map((d) => d.physicalLoadAvg),
      type: "scatter" as const,
      mode: "lines+markers" as const,
      name: "신체 부하 평균",
      line: { color: "#f59e0b", width: 2 },
      marker: { size: 5 },
      yaxis: "y2",
    };

    // 인지 부하 평균
    const cognitiveLoadTrace = {
      x: dates,
      y: trendData.map((d) => d.cognitiveLoadAvg),
      type: "scatter" as const,
      mode: "lines+markers" as const,
      name: "인지 부하 평균",
      line: { color: "#8b5cf6", width: 2 },
      marker: { size: 5 },
      yaxis: "y2",
    };

    const layout = {
      title: {
        text: "전체 평균 위험도 추이",
        font: { size: 14, color: "#111827" },
      },
      xaxis: {
        title: "날짜",
        tickangle: -45,
      },
      yaxis: {
        title: "위험도 스코어",
        side: "left",
        range: [0, 100],
      },
      yaxis2: {
        title: "부하 수준",
        side: "right",
        overlaying: "y",
        range: [0, 100],
      },
      margin: { l: 60, r: 60, t: 50, b: 80 },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { color: "#6b7280", size: 11 },
      legend: {
        x: 0.5,
        y: -0.2,
        xanchor: "center",
        orientation: "h",
      },
    };

    const config = {
      displayModeBar: false,
      responsive: true,
    };

    Plot.newPlot(
      trendPlotRef.current,
      [riskScoreTrace, physicalLoadTrace, cognitiveLoadTrace],
      layout,
      config
    );
  }, [reportData]);

  if (!reportData) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-app-muted">
        데이터 로딩 중...
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4">
      {/* 히트맵 */}
      <div className="flex-1 min-h-0">
        <div ref={heatmapPlotRef} className="w-full h-full" />
      </div>

      {/* 추이 그래프 */}
      <div className="flex-1 min-h-0">
        <div ref={trendPlotRef} className="w-full h-full" />
      </div>

      {/* ESG 리포트 버튼 */}
      <div className="flex justify-end pt-2 border-t border-app-border/50">
        <button
          className="px-4 py-2 rounded-card bg-app-accent/10 text-app-accent border border-app-accent/30 hover:bg-app-accent/20 transition text-sm font-medium"
          onClick={() => {
            // 향후 PDF 생성 기능 구현
            alert("ESG 리포트 생성 기능은 곧 추가될 예정입니다.");
          }}
        >
          📊 ESG 리포트 생성
        </button>
      </div>
    </div>
  );
};


import React, { useEffect, useRef } from "react";
import * as PlotlyModule from "react-plotly.js";
import {
  getHardcodedData3DChartForPlotly,
  getHardcodedData3DChartSmoothCurve,
  type HardcodedData3DChartPoint,
} from "../data/hardcodedData3DChart";

// react-plotly.js의 default export가 객체일 수 있으므로 처리
// CommonJS 모듈의 경우 default가 객체로 감싸질 수 있음
const Plot = (PlotlyModule as any).default?.default || (PlotlyModule as any).default || PlotlyModule;

interface Realtime3DChartProps {
  /**
   * 실제 데이터가 들어오면 이 prop을 사용하여 하드코딩 데이터를 교체할 수 있습니다.
   * undefined일 경우 하드코딩 데이터를 사용합니다.
   */
  realtimeData?: HardcodedData3DChartPoint[];
  /**
   * 자동 회전 활성화 여부
   */
  autoRotate?: boolean;
}

export const Realtime3DChart: React.FC<Realtime3DChartProps> = ({
  realtimeData,
  autoRotate = true,
}) => {
  const plotRef = useRef<any>(null);
  const rotationRef = useRef<number>(0);

  // 하드코딩 데이터 또는 실제 데이터 사용
  const chartData = realtimeData
    ? {
        x: realtimeData.map((d) => d.physicalLoad),
        y: realtimeData.map((d) => d.cognitiveLoad),
        z: realtimeData.map((d) => d.timestamp),
        mode: "lines+markers" as const,
        type: "scatter3d" as const,
        name: "신체/인지 부하 추이",
        marker: {
          size: 4,
          color: realtimeData.map((d) => {
            switch (d.riskLevel) {
              case "red":
                return "#ef4444";
              case "yellow":
                return "#facc15";
              case "green":
                return "#22c55e";
              default:
                return "#64748b";
            }
          }),
          line: {
            color: "rgba(100, 100, 100, 0.3)",
            width: 1,
          },
        },
        line: {
          color: "rgba(99, 102, 241, 0.6)",
          width: 2,
          shape: "spline" as "spline", // 곡선 형태
        },
      }
    : getHardcodedData3DChartForPlotly();

  const smoothCurveData = realtimeData
    ? null // 실제 데이터일 경우 추세선 생략 가능
    : getHardcodedData3DChartSmoothCurve();

  // 자동 회전 애니메이션
  useEffect(() => {
    if (!autoRotate || !plotRef.current) return;

    const interval = setInterval(() => {
      rotationRef.current += 0.5;
      if (plotRef.current) {
        const update = {
          "scene.camera": {
            eye: {
              x: 2 * Math.cos((rotationRef.current * Math.PI) / 180),
              y: 2 * Math.sin((rotationRef.current * Math.PI) / 180),
              z: 1.5,
            },
          },
        };
        // Plotly 업데이트
        if (plotRef.current && plotRef.current.update) {
          plotRef.current.update(update);
        }
      }
    }, 50); // 부드러운 회전을 위한 빠른 업데이트

    return () => clearInterval(interval);
  }, [autoRotate]);

  const layout = {
    autosize: true,
    margin: { l: 0, r: 0, t: 0, b: 0 },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    scene: {
      xaxis: {
        title: { text: "신체 부하 (Physical Load)", font: { color: "#e5e7eb", size: 10 } },
        tickfont: { color: "#64748b", size: 9 },
        gridcolor: "rgba(148, 163, 184, 0.1)",
        backgroundcolor: "rgba(0,0,0,0)",
      },
      yaxis: {
        title: { text: "인지 부하 (Cognitive Load)", font: { color: "#e5e7eb", size: 10 } },
        tickfont: { color: "#64748b", size: 9 },
        gridcolor: "rgba(148, 163, 184, 0.1)",
        backgroundcolor: "rgba(0,0,0,0)",
      },
      zaxis: {
        title: { text: "시간 (초)", font: { color: "#e5e7eb", size: 10 } },
        tickfont: { color: "#64748b", size: 9 },
        gridcolor: "rgba(148, 163, 184, 0.1)",
        backgroundcolor: "rgba(0,0,0,0)",
      },
      bgcolor: "rgba(0,0,0,0)",
      camera: {
        eye: { x: 2, y: 2, z: 1.5 },
        center: { x: 0, y: 0, z: 0 },
        up: { x: 0, y: 0, z: 1 },
      },
    },
    showlegend: false,
  };

  const config = {
    displayModeBar: false,
    responsive: true,
  };

  const data = smoothCurveData
    ? [chartData, smoothCurveData]
    : [chartData];

  return (
    <div className="w-full h-full">
      <Plot
        ref={plotRef}
        data={data}
        layout={layout}
        config={config}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
      />
    </div>
  );
};


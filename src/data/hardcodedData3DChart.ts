/**
 * Plotly 3D 차트용 하드코딩 데이터
 * 실제 데이터가 들어오면 이 파일의 데이터를 API 응답으로 교체하면 됩니다.
 */

export interface HardcodedData3DChartPoint {
  timestamp: number; // 시간 (초)
  physicalLoad: number; // 신체 부하 (30-80)
  cognitiveLoad: number; // 인지 부하 (20-70)
  integratedRisk: number; // 통합 위험도 (physicalLoad * 0.4 + cognitiveLoad * 0.6)
  riskLevel: "green" | "yellow" | "red";
}

/**
 * 60초간의 실시간 데이터 포인트 생성
 * 곡선 형태로 자연스러운 추이를 보여줍니다.
 */
export const hardcodedData3DChart: HardcodedData3DChartPoint[] = (() => {
  const data: HardcodedData3DChartPoint[] = [];
  const duration = 60; // 60초
  const points = 60; // 60개 포인트 (1초당 1개)

  // 곡선을 위한 파라미터
  const basePhysical = 45; // 기본 신체 부하
  const baseCognitive = 35; // 기본 인지 부하
  const amplitudePhysical = 15; // 신체 부하 진폭
  const amplitudeCognitive = 12; // 인지 부하 진폭

  for (let i = 0; i < points; i++) {
    const t = (i / points) * duration;
    
    // 곡선 함수: 사인파 + 약간의 노이즈로 자연스러운 곡선 생성
    const physicalLoad = Math.max(
      30,
      Math.min(
        80,
        basePhysical +
          amplitudePhysical * Math.sin((t / 10) * Math.PI) +
          amplitudePhysical * 0.5 * Math.sin((t / 5) * Math.PI) +
          (Math.random() - 0.5) * 5 // 약간의 노이즈
      )
    );

    const cognitiveLoad = Math.max(
      20,
      Math.min(
        70,
        baseCognitive +
          amplitudeCognitive * Math.sin((t / 12) * Math.PI + Math.PI / 4) +
          amplitudeCognitive * 0.4 * Math.sin((t / 6) * Math.PI) +
          (Math.random() - 0.5) * 4 // 약간의 노이즈
      )
    );

    // 통합 위험도 계산 (인지 부하가 더 중요)
    const integratedRisk = physicalLoad * 0.4 + cognitiveLoad * 0.6;

    // 위험도 레벨 결정
    let riskLevel: "green" | "yellow" | "red";
    if (integratedRisk < 40) {
      riskLevel = "green";
    } else if (integratedRisk < 70) {
      riskLevel = "yellow";
    } else {
      riskLevel = "red";
    }

    data.push({
      timestamp: t,
      physicalLoad: Math.round(physicalLoad * 10) / 10,
      cognitiveLoad: Math.round(cognitiveLoad * 10) / 10,
      integratedRisk: Math.round(integratedRisk * 10) / 10,
      riskLevel,
    });
  }

  return data;
})();

/**
 * Plotly 3D Scatter 차트용 데이터 포맷 변환
 * 실제 API 데이터가 들어오면 이 함수를 수정하여 사용
 */
export const getHardcodedData3DChartForPlotly = () => {
  return {
    x: hardcodedData3DChart.map((d) => d.physicalLoad), // X축: 신체 부하
    y: hardcodedData3DChart.map((d) => d.cognitiveLoad), // Y축: 인지 부하
    z: hardcodedData3DChart.map((d) => d.timestamp), // Z축: 시간
    mode: "lines+markers" as const, // 곡선 + 마커
    type: "scatter3d" as const,
    name: "신체/인지 부하 추이",
    marker: {
      size: 4,
      color: hardcodedData3DChart.map((d) => {
        switch (d.riskLevel) {
          case "red":
            return "#ef4444"; // app-danger
          case "yellow":
            return "#facc15"; // app-warning
          case "green":
            return "#22c55e"; // app-success
          default:
            return "#64748b"; // app-muted
        }
      }),
      line: {
        color: "rgba(100, 100, 100, 0.3)",
        width: 1,
      },
    },
    line: {
      color: "rgba(99, 102, 241, 0.6)", // app-accent with opacity
      width: 2,
      shape: "spline", // 곡선 형태
    },
  };
};

/**
 * 곡선 추세선 데이터 생성 (더 부드러운 곡선)
 */
export const getHardcodedData3DChartSmoothCurve = () => {
  const data = hardcodedData3DChart;
  
  // 스플라인 보간을 위한 더 많은 포인트 생성
  const smoothPoints = 200;
  const smoothData: HardcodedData3DChartPoint[] = [];

  for (let i = 0; i < smoothPoints; i++) {
    const t = (i / smoothPoints) * 60;
    const index = Math.floor((t / 60) * (data.length - 1));
    const nextIndex = Math.min(index + 1, data.length - 1);
    const ratio = (t / 60) * (data.length - 1) - index;

    const current = data[index];
    const next = data[nextIndex];

    // 선형 보간
    const physicalLoad =
      current.physicalLoad + (next.physicalLoad - current.physicalLoad) * ratio;
    const cognitiveLoad =
      current.cognitiveLoad +
      (next.cognitiveLoad - current.cognitiveLoad) * ratio;

    const integratedRisk = physicalLoad * 0.4 + cognitiveLoad * 0.6;

    let riskLevel: "green" | "yellow" | "red";
    if (integratedRisk < 40) {
      riskLevel = "green";
    } else if (integratedRisk < 70) {
      riskLevel = "yellow";
    } else {
      riskLevel = "red";
    }

    smoothData.push({
      timestamp: t,
      physicalLoad: Math.round(physicalLoad * 10) / 10,
      cognitiveLoad: Math.round(cognitiveLoad * 10) / 10,
      integratedRisk: Math.round(integratedRisk * 10) / 10,
      riskLevel,
    });
  }

  return {
    x: smoothData.map((d) => d.physicalLoad),
    y: smoothData.map((d) => d.cognitiveLoad),
    z: smoothData.map((d) => d.timestamp),
    mode: "lines" as const,
    type: "scatter3d" as const,
    name: "부하 추세선",
    line: {
      color: "rgba(99, 102, 241, 0.8)",
      width: 3,
      shape: "spline",
    },
    showlegend: false,
  };
};

/**
 * 실제 API 데이터로 교체할 때 사용할 함수
 * @param apiData API에서 받아온 실제 데이터
 */
export const convertApiDataToPlotlyFormat = (
  apiData: HardcodedData3DChartPoint[]
) => {
  return {
    x: apiData.map((d) => d.physicalLoad),
    y: apiData.map((d) => d.cognitiveLoad),
    z: apiData.map((d) => d.timestamp),
    mode: "lines+markers" as const,
    type: "scatter3d" as const,
    name: "신체/인지 부하 추이",
    marker: {
      size: 4,
      color: apiData.map((d) => {
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
      shape: "spline",
    },
  };
};


import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Worker3DModel } from "../components/Worker3DModel";
import { Realtime3DChart } from "../components/Realtime3DChart";
import { Brain3DModel } from "../components/Brain3DModel";
import { OntologyGraph } from "../components/OntologyGraph";
import {
  generateMiniOntologyData,
  mockMiniOntologyData,
} from "../data/mockOntology";
import { hardcodedData3DChart } from "../data/hardcodedData3DChart";
import type { OntologyGraphData, OntologyNode } from "../types/ontology.types";

export const Dashboard: React.FC = () => {
  const [heartRate, setHeartRate] = useState(72);
  const [safetyEquipment, setSafetyEquipment] = useState({
    helmet: true,
    vest: true,
    boots: true,
  });
  const [lumbarRiskLevel, setLumbarRiskLevel] = useState<
    "low" | "medium" | "high"
  >("low");
  const [ontologyData, setOntologyData] =
    useState<OntologyGraphData>(mockMiniOntologyData);
  const [cognitiveLoad, setCognitiveLoad] = useState(35);

  // 실시간 데이터 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      // 심박수 시뮬레이션 (60-100 BPM)
      setHeartRate(Math.floor(Math.random() * 40) + 60);

      // 위험도 계산 (심박수 기반)
      if (heartRate > 90) {
        setLumbarRiskLevel("high");
      } else if (heartRate > 75) {
        setLumbarRiskLevel("medium");
      } else {
        setLumbarRiskLevel("low");
      }

      // 안전 장비 상태 (가끔씩 변경)
      if (Math.random() > 0.9) {
        setSafetyEquipment({
          helmet: Math.random() > 0.1,
          vest: Math.random() > 0.1,
          boots: Math.random() > 0.1,
        });
      }
    }, 2000); // 2초마다 업데이트

    return () => clearInterval(interval);
  }, [heartRate]);

  // 온톨로지 실시간 업데이트 (3-5초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      // 새로운 그래프 데이터 생성 (약간의 변화 포함)
      const newData = generateMiniOntologyData();
      setOntologyData(newData);
    }, 4000); // 4초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  // 인지 부하 데이터 업데이트 (hardcodedData3DChart에서 시뮬레이션)
  useEffect(() => {
    let dataIndex = 0;
    
    const interval = setInterval(() => {
      // 데이터 배열을 순환하면서 인지 부하 업데이트
      const currentData = hardcodedData3DChart[dataIndex];
      if (currentData) {
        setCognitiveLoad(currentData.cognitiveLoad);
      }
      
      // 다음 인덱스로 이동 (순환)
      dataIndex = (dataIndex + 1) % hardcodedData3DChart.length;
    }, 2000); // 2초마다 업데이트

    // 초기값 설정
    const initialData = hardcodedData3DChart[0];
    if (initialData) {
      setCognitiveLoad(initialData.cognitiveLoad);
    }

    return () => clearInterval(interval);
  }, []);

  // 노드 클릭 핸들러
  const handleNodeClick = (node: OntologyNode) => {
    console.log("노드 클릭:", node);
    // 향후 상세 정보 모달 등으로 확장 가능
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Row 1: 3D 인체 + G/Y/R 카드 */}
        <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] gap-4 md:gap-6">
          <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-4 md:p-5">
            <h2 className="text-sm font-semibold mb-2">LBP 인체 3D 모델</h2>
            <p className="text-xs text-app-muted mb-3">
              요추(LBP) 부위를 실시간으로 시각화합니다.
            </p>
            <div className="h-64 md:h-80 rounded-card bg-black/40 relative overflow-hidden">
              <Worker3DModel
                heartRate={heartRate}
                safetyEquipment={safetyEquipment}
                lumbarRiskLevel={lumbarRiskLevel}
              />
            </div>
          </div>

          <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-subtle p-4 md:p-5">
            <h2 className="text-sm font-semibold mb-2">
              G/Y/R 통합 위험 스코어
            </h2>
            <p className="text-xs text-app-muted mb-3">
              신체/인지 부하를 통합한 실시간 위험도 관제 카드입니다.
            </p>
            <div className="h-64 md:h-80 rounded-card bg-black/30 flex items-center justify-center text-xs text-app-muted">
              RiskScoreCard goes here
            </div>
          </div>
        </section>

        {/* Row 3: Realtime 3D Chart + Brain 3D Model */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-subtle p-4 md:p-5">
            <h2 className="text-sm font-semibold mb-2">
              신체/인지 부하 3D 스캐터
            </h2>
            <p className="text-xs text-app-muted mb-3">
              Plotly 3D 차트로 신체·인지 부하를 동시에 확인합니다.
            </p>
            <div className="h-64 rounded-card bg-black/35 relative overflow-hidden">
              <Realtime3DChart autoRotate={true} />
            </div>
          </div>

          <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-subtle p-4 md:p-5">
            <h2 className="text-sm font-semibold mb-2">
              인지 부하 3D 뇌 모델
            </h2>
            <p className="text-xs text-app-muted mb-3">
              실시간 인지 부하를 3D 뇌 모델로 시각화합니다.
            </p>
            <div className="h-64 rounded-card bg-black/35 relative overflow-hidden">
              <Brain3DModel cognitiveLoad={cognitiveLoad} autoRotate={false} />
            </div>
          </div>
        </section>

        {/* Row 4: Trend Report */}
        <section className="grid grid-cols-1 gap-4 md:gap-6">
          <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-subtle p-4 md:p-5">
            <h2 className="text-sm font-semibold mb-2">
              위험도 트렌드 & 라인별 히트맵
            </h2>
            <p className="text-xs text-app-muted mb-3">
              재무/ESG 팀을 위한 비용 절감 및 위험도 감소 추이를 보여줍니다.
            </p>
            <div className="h-64 rounded-card bg-black/35 flex items-center justify-center text-xs text-app-muted">
              TrendReportChart goes here
            </div>
          </div>
        </section>

        {/* Row 5: Knowledge Graph (Ontology) */}
        <section className="grid grid-cols-1 gap-4 md:gap-6">
          <div className="bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold mb-1">
                  관계 분석 (Knowledge Graph)
                </h2>
                <p className="text-xs text-app-muted">
                  온톨로지 기반 데이터 관계 시각화. 작업자, 이벤트, 작업장 간의
                  연결을 실시간으로 확인합니다.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[10px] text-app-muted">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-app-success/40 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-app-success" />
                  </span>
                  <span>실시간 업데이트</span>
                </div>
              </div>
            </div>
            <div className="h-[400px] md:h-[500px] rounded-card bg-black/20 relative overflow-hidden">
              <OntologyGraph
                graphData={ontologyData}
                height={400}
                onNodeClick={handleNodeClick}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-app-muted">
              <div className="flex items-center gap-4">
                <span>노드: {ontologyData.nodes.length}개</span>
                <span>관계: {ontologyData.links.length}개</span>
              </div>
              <button className="px-3 py-1 rounded-pill bg-app-accent/20 text-app-accent hover:bg-app-accent/30 transition text-[10px] font-medium">
                전체 그래프 보기
              </button>
            </div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
};

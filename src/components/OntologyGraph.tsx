import React, { useCallback, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import type { OntologyGraphData, OntologyNode } from "../types/ontology.types";

interface OntologyGraphProps {
  /** 그래프 데이터 */
  graphData: OntologyGraphData;
  /** 높이 (기본값: 400) */
  height?: number;
  /** 노드 클릭 핸들러 */
  onNodeClick?: (node: OntologyNode) => void;
}

/**
 * OntologyGraph 컴포넌트
 * 팔란티어 스타일의 지식 그래프 시각화
 */
export const OntologyGraph: React.FC<OntologyGraphProps> = ({
  graphData,
  height = 400,
  onNodeClick,
}) => {
  const [hoveredNode, setHoveredNode] = useState<OntologyNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<OntologyNode | null>(null);

  // 노드 클릭 핸들러
  const handleNodeClick = useCallback(
    (node: any) => {
      const ontologyNode = graphData.nodes.find((n) => n.id === node.id);
      if (ontologyNode) {
        setSelectedNode(ontologyNode);
        if (onNodeClick) {
          onNodeClick(ontologyNode);
        }
      }
    },
    [graphData.nodes, onNodeClick]
  );

  // 노드 호버 핸들러
  const handleNodeHover = useCallback(
    (node: any | null) => {
      if (node) {
        const ontologyNode = graphData.nodes.find((n) => n.id === node.id);
        setHoveredNode(ontologyNode || null);
      } else {
        setHoveredNode(null);
      }
    },
    [graphData.nodes]
  );

  // 노드 렌더링 함수
  const nodeCanvasObject = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const ontologyNode = graphData.nodes.find((n) => n.id === node.id);
      if (!ontologyNode) return;

      const label = ontologyNode.label;
      const size = (ontologyNode.size || 8) * Math.max(1, globalScale / 2);
      const color = ontologyNode.color || '#6366f1';
      const type = ontologyNode.type;

      // 노드 그리기
      ctx.fillStyle = color;
      ctx.strokeStyle = hoveredNode?.id === node.id ? '#ffffff' : color;
      ctx.lineWidth = hoveredNode?.id === node.id ? 3 : 1;

      ctx.beginPath();
      
      // 타입별 모양
      if (type === 'event') {
        // 사각형
        ctx.rect(node.x - size / 2, node.y - size / 2, size, size);
      } else if (type === 'workspace') {
        // 다이아몬드
        ctx.moveTo(node.x, node.y - size / 2);
        ctx.lineTo(node.x + size / 2, node.y);
        ctx.lineTo(node.x, node.y + size / 2);
        ctx.lineTo(node.x - size / 2, node.y);
        ctx.closePath();
      } else if (type === 'team') {
        // 삼각형
        ctx.moveTo(node.x, node.y - size / 2);
        ctx.lineTo(node.x - size / 2, node.y + size / 2);
        ctx.lineTo(node.x + size / 2, node.y + size / 2);
        ctx.closePath();
      } else {
        // 원형 (worker, risk 등)
        ctx.arc(node.x, node.y, size / 2, 0, 2 * Math.PI);
      }

      ctx.fill();
      ctx.stroke();

      // 라벨 그리기
      if (globalScale > 1.5) {
        ctx.fillStyle = '#e5e7eb';
        ctx.font = `${10 / globalScale}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, node.x, node.y + size / 2 + 12 / globalScale);
      }
    },
    [graphData.nodes, hoveredNode]
  );

  // 엣지 렌더링 함수
  const linkColor = useCallback((link: any) => {
    const ontologyEdge = graphData.links.find(
      (l) => l.source === link.source.id && l.target === link.target.id
    );
    return ontologyEdge?.color || '#64748b';
  }, [graphData.links]);

  const linkWidth = useCallback((link: any) => {
    const ontologyEdge = graphData.links.find(
      (l) => l.source === link.source.id && l.target === link.target.id
    );
    return ontologyEdge?.width || 1;
  }, [graphData.links]);

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <ForceGraph2D
        graphData={graphData}
        nodeLabel={(node: any) => {
          const ontologyNode = graphData.nodes.find((n) => n.id === node.id);
          if (!ontologyNode) return '';
          
          let tooltip = `${ontologyNode.label} (${ontologyNode.type})\n`;
          if (ontologyNode.type === 'worker' && 'currentRiskLevel' in ontologyNode.data) {
            tooltip += `위험도: ${ontologyNode.data.currentRiskLevel}\n`;
            tooltip += `스코어: ${ontologyNode.data.riskScore || 0}`;
          } else if (ontologyNode.type === 'event' && 'riskLevel' in ontologyNode.data) {
            tooltip += `위험도: ${ontologyNode.data.riskLevel}\n`;
            tooltip += `스코어: ${ontologyNode.data.riskScore}`;
          }
          return tooltip;
        }}
        nodeColor={(node: any) => {
          const ontologyNode = graphData.nodes.find((n) => n.id === node.id);
          return ontologyNode?.color || '#6366f1';
        }}
        nodeRelSize={6}
        linkColor={linkColor}
        linkWidth={linkWidth}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.1}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        nodeCanvasObject={nodeCanvasObject}
        cooldownTicks={100}
        onEngineStop={() => {
          // 그래프 레이아웃이 안정화되면 호출됨
        }}
      />

      {/* 선택된 노드 정보 패널 */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-app-surface-soft border border-app-border/70 rounded-card shadow-card-soft p-3 max-w-xs z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-app-foreground">
              {selectedNode.label}
            </h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-app-muted hover:text-app-foreground text-xs"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1 text-xs text-app-muted">
            <div>
              <span className="font-medium">타입:</span> {selectedNode.type}
            </div>
            {selectedNode.type === 'worker' && 'workerId' in selectedNode.data && (
              <>
                <div>
                  <span className="font-medium">작업자 ID:</span> {selectedNode.data.workerId}
                </div>
                {'currentRiskLevel' in selectedNode.data && selectedNode.data.currentRiskLevel && (
                  <div>
                    <span className="font-medium">위험도:</span> {selectedNode.data.currentRiskLevel}
                  </div>
                )}
                {'riskScore' in selectedNode.data && selectedNode.data.riskScore !== undefined && (
                  <div>
                    <span className="font-medium">스코어:</span> {selectedNode.data.riskScore}
                  </div>
                )}
              </>
            )}
            {selectedNode.type === 'event' && 'eventId' in selectedNode.data && (
              <>
                <div>
                  <span className="font-medium">이벤트 ID:</span> {selectedNode.data.eventId}
                </div>
                {'riskLevel' in selectedNode.data && (
                  <div>
                    <span className="font-medium">위험도:</span> {selectedNode.data.riskLevel}
                  </div>
                )}
                {'riskScore' in selectedNode.data && (
                  <div>
                    <span className="font-medium">스코어:</span> {selectedNode.data.riskScore}
                  </div>
                )}
              </>
            )}
            {selectedNode.type === 'workspace' && 'location' in selectedNode.data && (
              <div>
                <span className="font-medium">위치:</span> {selectedNode.data.location}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 범례 */}
      <div className="absolute bottom-4 left-4 bg-app-surface-soft/90 border border-app-border/50 rounded-card shadow-card-subtle p-2 z-10">
        <div className="text-[10px] font-semibold text-app-muted mb-1.5">범례</div>
        <div className="space-y-1 text-[10px]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-app-accent" />
            <span className="text-app-muted">작업자</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500" />
            <span className="text-app-muted">이벤트</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rotate-45 bg-cyan-500" />
            <span className="text-app-muted">작업장</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500" />
            <span className="text-app-muted">팀</span>
          </div>
        </div>
      </div>
    </div>
  );
};


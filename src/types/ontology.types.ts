/**
 * 온톨로지 (지식 그래프) 타입 정의
 * 팔란티어 스타일의 데이터 관계 시각화를 위한 타입
 */

export type NodeType = 'worker' | 'event' | 'workspace' | 'team' | 'risk';
export type EdgeType = 'same_team' | 'risk_chain' | 'workspace' | 'event_sequence' | 'worker_event';

/**
 * 온톨로지 노드 (엔티티)
 */
export interface OntologyNode {
  /** 노드 고유 ID */
  id: string;
  /** 노드 타입 */
  type: NodeType;
  /** 노드 라벨 (표시용) */
  label: string;
  /** 타입별 상세 데이터 */
  data: WorkerNodeData | EventNodeData | WorkspaceNodeData | TeamNodeData | RiskNodeData;
  /** 그래프 위치 (force-directed 알고리즘에 의해 계산됨) */
  x?: number;
  y?: number;
  /** 노드 크기 */
  size?: number;
  /** 노드 색상 */
  color?: string;
}

/**
 * 작업자 노드 데이터
 */
export interface WorkerNodeData {
  workerId: string;
  workerName: string;
  teamId?: string;
  workspaceId?: string;
  currentRiskLevel?: 'green' | 'yellow' | 'red';
  riskScore?: number;
}

/**
 * 이벤트 노드 데이터
 */
export interface EventNodeData {
  eventId: string;
  timestamp: Date;
  riskLevel: 'green' | 'yellow' | 'red';
  riskScore: number;
  workerId?: string;
  description?: string;
}

/**
 * 작업장 노드 데이터
 */
export interface WorkspaceNodeData {
  workspaceId: string;
  workspaceName: string;
  location?: string;
  workerCount?: number;
}

/**
 * 팀 노드 데이터
 */
export interface TeamNodeData {
  teamId: string;
  teamName: string;
  workspaceId?: string;
  workerCount?: number;
}

/**
 * 위험도 노드 데이터
 */
export interface RiskNodeData {
  riskId: string;
  riskType: 'physical' | 'cognitive' | 'integrated';
  level: 'green' | 'yellow' | 'red';
  score: number;
}

/**
 * 온톨로지 엣지 (관계)
 */
export interface OntologyEdge {
  /** 엣지 고유 ID */
  id: string;
  /** 소스 노드 ID */
  source: string;
  /** 타겟 노드 ID */
  target: string;
  /** 관계 타입 */
  type: EdgeType;
  /** 관계 가중치 (0-1) */
  weight?: number;
  /** 엣지 색상 */
  color?: string;
  /** 엣지 두께 */
  width?: number;
  /** 관계 설명 */
  label?: string;
}

/**
 * 온톨로지 그래프 데이터
 */
export interface OntologyGraphData {
  nodes: OntologyNode[];
  links: OntologyEdge[];
}


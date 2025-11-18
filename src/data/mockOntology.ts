/**
 * 온톨로지 Mock 데이터
 * 실제 데이터가 들어오면 이 파일의 데이터를 API 응답으로 교체하면 됩니다.
 */

import type {
  OntologyNode,
  OntologyEdge,
  OntologyGraphData,
  NodeType,
  EdgeType,
} from "../types/ontology.types";
import type { RiskLevel } from "../types/common.types";
import { WORKER_NAMES } from "../constants/common";
import { getRiskLevelHexColor, getRiskLevelFromScore } from "../utils/riskUtils";

/**
 * 작업장 목록
 */
const workspaces = [
  { id: "WS001", name: "제1작업장", location: "1층" },
  { id: "WS002", name: "제2작업장", location: "2층" },
  { id: "WS003", name: "제3작업장", location: "3층" },
];

/**
 * 팀 목록
 */
const teams = [
  { id: "T001", name: "A팀", workspaceId: "WS001" },
  { id: "T002", name: "B팀", workspaceId: "WS001" },
  { id: "T003", name: "C팀", workspaceId: "WS002" },
  { id: "T004", name: "D팀", workspaceId: "WS003" },
];

/**
 * 노드 타입별 색상
 */
const getNodeColor = (type: NodeType, riskLevel?: RiskLevel): string => {
  if (type === 'worker' && riskLevel) {
    return getRiskLevelHexColor(riskLevel);
  }
  
  switch (type) {
    case 'worker':
      return '#6366f1'; // app-accent
    case 'event':
      return '#8b5cf6'; // purple
    case 'workspace':
      return '#06b6d4'; // cyan
    case 'team':
      return '#10b981'; // green
    case 'risk':
      return '#f59e0b'; // amber
    default:
      return '#64748b'; // app-muted
  }
};

/**
 * 엣지 타입별 색상
 */
const getEdgeColor = (type: EdgeType): string => {
  switch (type) {
    case 'same_team':
      return '#3b82f6'; // blue
    case 'risk_chain':
      return '#ef4444'; // red
    case 'workspace':
      return '#06b6d4'; // cyan
    case 'event_sequence':
      return '#8b5cf6'; // purple
    case 'worker_event':
      return '#f59e0b'; // amber
    default:
      return '#64748b'; // gray
  }
};

/**
 * 간소화된 온톨로지 그래프 데이터 생성 (Dashboard용)
 * 주요 엔티티 10-15개
 */
export const generateMiniOntologyData = (): OntologyGraphData => {
  const nodes: OntologyNode[] = [];
  const links: OntologyEdge[] = [];

  // 작업장 노드 생성
  const workspaceNodes: OntologyNode[] = workspaces.map((ws) => ({
    id: ws.id,
    type: 'workspace',
    label: ws.name,
    data: {
      workspaceId: ws.id,
      workspaceName: ws.name,
      location: ws.location,
    },
    size: 12,
    color: getNodeColor('workspace'),
  }));

  nodes.push(...workspaceNodes);

  // 팀 노드 생성 (각 작업장당 1-2개)
  const teamNodes: OntologyNode[] = teams.map((team) => ({
    id: team.id,
    type: 'team',
    label: team.name,
    data: {
      teamId: team.id,
      teamName: team.name,
      workspaceId: team.workspaceId,
    },
    size: 10,
    color: getNodeColor('team'),
  }));

  nodes.push(...teamNodes);

  // 작업자 노드 생성 (10명)
  const selectedWorkers = WORKER_NAMES.slice(0, 10);
  const workerNodes: OntologyNode[] = selectedWorkers.map((name, index) => {
    const workerId = `W${String(index + 1).padStart(3, '0')}`;
    const teamId = teams[index % teams.length].id;
    const riskScore = Math.floor(Math.random() * 100);
    const riskLevel = getRiskLevelFromScore(riskScore);

    return {
      id: workerId,
      type: 'worker',
      label: name,
      data: {
        workerId,
        workerName: name,
        teamId,
        workspaceId: teams[index % teams.length].workspaceId,
        currentRiskLevel: riskLevel,
        riskScore,
      },
      size: 8,
      color: getNodeColor('worker', riskLevel),
    };
  });

  nodes.push(...workerNodes);

  // 최근 이벤트 노드 생성 (3-5개)
  const eventCount = 5;
  const eventNodes: OntologyNode[] = [];
  for (let i = 0; i < eventCount; i++) {
    const eventId = `E${String(i + 1).padStart(3, '0')}`;
    const riskScore = Math.floor(Math.random() * 100);
    const riskLevel = getRiskLevelFromScore(riskScore);
    const workerIndex = Math.floor(Math.random() * selectedWorkers.length);
    const workerId = `W${String(workerIndex + 1).padStart(3, '0')}`;

    eventNodes.push({
      id: eventId,
      type: 'event',
      label: `이벤트 ${i + 1}`,
      data: {
        eventId,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        riskLevel,
        riskScore,
        workerId,
        description: `${riskLevel === 'red' ? '위험' : riskLevel === 'yellow' ? '주의' : '정상'} 이벤트`,
      },
      size: 6,
      color: getNodeColor('event'),
    });
  }

  nodes.push(...eventNodes);

  // 엣지 생성
  // 1. 작업장 → 팀
  teams.forEach((team) => {
    links.push({
      id: `${team.workspaceId}-${team.id}`,
      source: team.workspaceId,
      target: team.id,
      type: 'workspace',
      weight: 1.0,
      color: getEdgeColor('workspace'),
      width: 2,
    });
  });

  // 2. 팀 → 작업자
  workerNodes.forEach((worker) => {
    if (worker.type === 'worker' && 'teamId' in worker.data && worker.data.teamId) {
      links.push({
        id: `${worker.data.teamId}-${worker.id}`,
        source: worker.data.teamId,
        target: worker.id,
        type: 'same_team',
        weight: 0.8,
        color: getEdgeColor('same_team'),
        width: 1.5,
      });
    }
  });

  // 3. 작업자 → 이벤트
  eventNodes.forEach((event) => {
    if (event.type === 'event' && 'workerId' in event.data && event.data.workerId) {
      links.push({
        id: `${event.data.workerId}-${event.id}`,
        source: event.data.workerId,
        target: event.id,
        type: 'worker_event',
        weight: 0.6,
        color: getEdgeColor('worker_event'),
        width: 1,
      });
    }
  });

  // 4. 위험 연쇄 (Red Zone 이벤트 간)
  const redEvents = eventNodes.filter((e) => e.type === 'event' && 'riskLevel' in e.data && e.data.riskLevel === 'red');
  if (redEvents.length >= 2) {
    for (let i = 0; i < redEvents.length - 1; i++) {
      links.push({
        id: `${redEvents[i].id}-${redEvents[i + 1].id}`,
        source: redEvents[i].id,
        target: redEvents[i + 1].id,
        type: 'risk_chain',
        weight: 0.9,
        color: getEdgeColor('risk_chain'),
        width: 2,
        label: '위험 연쇄',
      });
    }
  }

  // 5. 같은 팀 작업자 간 연결 (일부만)
  const workersByTeam: { [teamId: string]: OntologyNode[] } = {};
  workerNodes.forEach((worker) => {
    if (worker.type === 'worker' && 'teamId' in worker.data && worker.data.teamId) {
      const teamId = worker.data.teamId;
      if (!workersByTeam[teamId]) {
        workersByTeam[teamId] = [];
      }
      workersByTeam[teamId].push(worker);
    }
  });

  Object.values(workersByTeam).forEach((teamWorkers) => {
    if (teamWorkers.length >= 2) {
      // 같은 팀 작업자 간 일부 연결
      for (let i = 0; i < teamWorkers.length - 1; i += 2) {
        const worker1 = teamWorkers[i];
        const worker2 = teamWorkers[i + 1];
        if (worker1.type === 'worker' && worker2.type === 'worker' && 'teamId' in worker1.data && 'teamId' in worker2.data) {
          links.push({
            id: `${worker1.id}-${worker2.id}`,
            source: worker1.id,
            target: worker2.id,
            type: 'same_team',
            weight: 0.5,
            color: getEdgeColor('same_team'),
            width: 1,
          });
        }
      }
    }
  });

  return { nodes, links };
};

/**
 * 초기 Mock 데이터 (컴포넌트에서 바로 사용 가능)
 */
export const mockMiniOntologyData: OntologyGraphData = generateMiniOntologyData();


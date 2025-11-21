# 개발 계획서: G/Y/R 통합 위험 스코어 & 위험도 트렌드 히트맵

## 📊 기존 하드코딩 데이터 분석

### 1. 활성 작업자 데이터 (Monitoring.tsx)
```typescript
activeWorkersData = [
  { id: "W001", name: "김철수", role: "생산 1팀", status: "DANGER", riskScore: 94, detail: "..." },
  { id: "W002", name: "이영희", role: "물류팀", status: "NORMAL", riskScore: 12, detail: "..." },
  { id: "W003", name: "박준형", role: "조립팀", status: "WARNING", riskScore: 65, detail: "..." }
]
```

### 2. 신체/인지 부하 시계열 데이터 (hardcodedData3DChart.ts)
```typescript
HardcodedData3DChartPoint = {
  timestamp: number,        // 0-60초
  physicalLoad: number,     // 30-80
  cognitiveLoad: number,    // 20-70
  integratedRisk: number,   // 통합 위험도
  riskLevel: "green" | "yellow" | "red"
}
// 60개 포인트 (1초당 1개)
```

### 3. 작업장/팀 데이터 (mockOntology.ts)
```typescript
workspaces = [
  { id: "WS001", name: "제1작업장", location: "1층" },
  { id: "WS002", name: "제2작업장", location: "2층" },
  { id: "WS003", name: "제3작업장", location: "3층" }
]

teams = [
  { id: "T001", name: "A팀", workspaceId: "WS001" },
  { id: "T002", name: "B팀", workspaceId: "WS001" },
  { id: "T003", name: "C팀", workspaceId: "WS002" },
  { id: "T004", name: "D팀", workspaceId: "WS003" }
]
```

---

## 🎯 컴포넌트 1: RiskScoreCard (G/Y/R 통합 위험 스코어)

### 목적
- **우선순위**: HIGH
- **타겟**: 관리자, 근로자
- **핵심 가치**: "0.5초 안에 조치 가능한 엔터프라이즈급 관제"

### 데이터 소스
- `activeWorkersData` (Monitoring.tsx) 활용
- 현재 선택된 작업자 또는 첫 번째 작업자 표시
- Dashboard의 `heartRate`, `cognitiveLoad` 상태와 연동 가능

### 구현 계획

#### 1. 데이터 구조 설계
```typescript
// src/data/hardcodedRiskScore.ts
export interface RiskScoreData {
  workerId: string;
  workerName: string;
  role: string;
  riskScore: number;        // 0-100
  riskLevel: "green" | "yellow" | "red";
  physicalLoad: number;     // 신체 부하
  cognitiveLoad: number;    // 인지 부하
  detail: string;           // 상세 정보
  timestamp: Date;
}
```

#### 2. 컴포넌트 구조
```
src/components/RiskScoreCard.tsx
├── 대형 스코어 표시 (0-100)
│   ├── 숫자 크기: text-6xl ~ text-8xl
│   ├── 색상: G/Y/R에 따라 동적 변경
│   └── 애니메이션: 스코어 변경 시 펄스 효과
├── 작업자 정보
│   ├── 이름, 역할, ID
│   └── 상세 정보 (detail)
├── G/Y/R 색상 코드
│   ├── Green: < 40
│   ├── Yellow: 40-69
│   └── Red: >= 70
└── 즉시 조치 버튼 (Red Zone일 때만 표시)
    ├── "작업 중지 권고"
    ├── "관리자 알림"
    └── "긴급 조치"
```

#### 3. 하드코딩 데이터 생성
```typescript
// src/data/hardcodedRiskScore.ts
export const hardcodedRiskScoreData: RiskScoreData = {
  workerId: "W001",
  workerName: "김철수",
  role: "생산 1팀",
  riskScore: 94,
  riskLevel: "red",
  physicalLoad: 75,
  cognitiveLoad: 85,
  detail: "인지-운동 간섭 감지 (시야각 40% 저하)",
  timestamp: new Date()
};
```

#### 4. 실시간 업데이트 시뮬레이션
- Dashboard의 `heartRate`, `cognitiveLoad` 상태 활용
- 2초마다 스코어 재계산
- `integratedRisk = physicalLoad * 0.4 + cognitiveLoad * 0.6`

#### 5. 스타일링
- 기존 `getRiskLevelColor`, `getRiskLevelBgColor` 유틸 활용
- Dashboard의 카드 스타일과 일관성 유지
- Red Zone일 때 긴급감 표현 (펄스 애니메이션)

---

## 📈 컴포넌트 2: TrendReportChart (위험도 트렌드 & 라인별 히트맵)

### 목적
- **우선순위**: MEDIUM
- **타겟**: 재무팀, 인사팀
- **핵심 가치**: "사후 비용(수백억) → 예방 비용 전환 증명"

### 데이터 소스
- `hardcodedData3DChart` (60초 시계열 데이터)
- `workspaces`, `teams` (작업장/팀 정보)
- 확장: 여러 작업장/팀별 데이터 생성

### 구현 계획

#### 1. 데이터 구조 설계
```typescript
// src/data/hardcodedTrendReport.ts
export interface TrendReportData {
  // 라인별 히트맵 데이터
  heatmapData: {
    workspace: string;      // 작업장 ID
    team: string;           // 팀 ID
    date: string;           // 날짜 (YYYY-MM-DD)
    riskScore: number;      // 평균 위험도 스코어
    riskLevel: "green" | "yellow" | "red";
  }[];
  
  // 전체 평균 추이 그래프 데이터
  trendData: {
    date: string;
    averageRiskScore: number;
    physicalLoadAvg: number;
    cognitiveLoadAvg: number;
    workerCount: number;
  }[];
}
```

#### 2. 컴포넌트 구조
```
src/components/TrendReportChart.tsx
├── 라인별 히트맵 (Plotly Heatmap)
│   ├── X축: 날짜 (최근 7일 또는 30일)
│   ├── Y축: 작업장/팀 (WS001-A팀, WS001-B팀, ...)
│   ├── 색상: G/Y/R 그라데이션
│   └── 호버: 상세 정보 표시
├── 전체 평균 추이 그래프 (Plotly Line Chart)
│   ├── 위험도 스코어 추이
│   ├── 신체 부하 평균
│   ├── 인지 부하 평균
│   └── 작업자 수 추이
└── ESG 리포트 생성 버튼
    ├── PDF 다운로드
    └── 데이터 내보내기 (CSV)
```

#### 3. 하드코딩 데이터 생성
```typescript
// src/data/hardcodedTrendReport.ts

// 1. 최근 7일간 데이터 생성
const generateHeatmapData = () => {
  const workspaces = ["WS001", "WS002", "WS003"];
  const teams = ["A팀", "B팀", "C팀", "D팀"];
  const dates = generateLast7Days();
  
  return workspaces.flatMap(ws => 
    teams.map(team => ({
      workspace: ws,
      team,
      date: dates[Math.floor(Math.random() * dates.length)],
      riskScore: Math.floor(Math.random() * 100),
      riskLevel: getRiskLevelFromScore(riskScore)
    }))
  );
};

// 2. hardcodedData3DChart를 활용한 추이 데이터
const generateTrendData = () => {
  // 60초 데이터를 일별로 집계
  // 또는 최근 7일간의 일별 평균 생성
};
```

#### 4. Plotly 차트 구현
- **히트맵**: `plotly.js`의 `heatmap` 타입 사용
- **라인 차트**: `scatter` 타입으로 여러 라인 표시
- 기존 `Realtime3DChart.tsx` 패턴 참고

#### 5. ESG 리포트 기능
- 버튼 클릭 시 PDF 생성 (jsPDF 또는 react-pdf)
- 차트 이미지 포함
- 통계 요약 포함

---

## 📁 파일 구조

```
src/
├── components/
│   ├── RiskScoreCard.tsx          (신규 생성)
│   └── TrendReportChart.tsx        (신규 생성)
├── data/
│   ├── hardcodedRiskScore.ts       (신규 생성)
│   └── hardcodedTrendReport.ts     (신규 생성)
└── pages/
    └── Dashboard.tsx                (수정: 컴포넌트 연결)
```

---

## 🔄 구현 순서

### Phase 1: RiskScoreCard (우선순위 HIGH)
1. ✅ `hardcodedRiskScore.ts` 데이터 파일 생성
2. ✅ `RiskScoreCard.tsx` 컴포넌트 생성
3. ✅ Dashboard.tsx에 컴포넌트 연결
4. ✅ 실시간 업데이트 로직 추가
5. ✅ Red Zone 조치 버튼 구현

### Phase 2: TrendReportChart (우선순위 MEDIUM)
1. ✅ `hardcodedTrendReport.ts` 데이터 파일 생성
2. ✅ `TrendReportChart.tsx` 컴포넌트 생성
3. ✅ Plotly 히트맵 구현
4. ✅ Plotly 라인 차트 구현
5. ✅ Dashboard.tsx에 컴포넌트 연결
6. ✅ ESG 리포트 버튼 구현 (선택사항)

---

## 🎨 디자인 가이드라인

### 색상 체계
- **Green**: `app-success` (#22c55e) - 위험도 < 40
- **Yellow**: `app-warning` (#facc15) - 위험도 40-69
- **Red**: `app-danger` (#ef4444) - 위험도 >= 70

### 스타일 일관성
- Dashboard의 기존 카드 스타일 유지
- `rounded-card`, `shadow-card-subtle` 등 기존 클래스 활용
- `text-app-foreground`, `text-app-muted` 등 색상 변수 활용

---

## 📝 참고사항

1. **데이터 확장성**: 현재 하드코딩 데이터를 나중에 API로 쉽게 교체 가능하도록 구조화
2. **성능**: Plotly 차트는 대용량 데이터 처리 시 최적화 필요
3. **반응형**: 모바일/태블릿 대응 고려
4. **접근성**: 색상만으로 정보 전달하지 않도록 텍스트 라벨 포함

---

## ✅ 체크리스트

### RiskScoreCard
- [ ] 데이터 파일 생성
- [ ] 컴포넌트 기본 구조
- [ ] 대형 스코어 표시
- [ ] G/Y/R 색상 동적 변경
- [ ] 작업자 정보 표시
- [ ] Red Zone 조치 버튼
- [ ] 실시간 업데이트
- [ ] Dashboard 연결

### TrendReportChart
- [ ] 데이터 파일 생성
- [ ] 히트맵 데이터 생성
- [ ] 추이 데이터 생성
- [ ] Plotly 히트맵 구현
- [ ] Plotly 라인 차트 구현
- [ ] ESG 리포트 버튼
- [ ] Dashboard 연결


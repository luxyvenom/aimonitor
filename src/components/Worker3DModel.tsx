import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Sphere, Box, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { getRiskLevelHexColor } from "../utils/riskUtils";

interface Worker3DModelProps {
  heartRate?: number;
  safetyEquipment?: {
    helmet: boolean;
    vest: boolean;
    boots: boolean;
  };
  lumbarRiskLevel?: "low" | "medium" | "high"; // 요추 위험도
}

// 인체 기본 구조 컴포넌트
const HumanBody: React.FC<Worker3DModelProps> = ({
  heartRate = 72,
  safetyEquipment = { helmet: true, vest: true, boots: true },
  lumbarRiskLevel = "low",
}) => {
  const bodyRef = useRef<THREE.Group>(null);
  
  // 인체 텍스처 로드
  const bodyTexture = useTexture("/textures/human-body-texture.png");

  // 요추 위험도에 따른 색상
  const getRiskColor = () => {
    return getRiskLevelHexColor(lumbarRiskLevel);
  };

  // 심박수 위치 (가슴 왼쪽)
  const heartPosition: [number, number, number] = [-0.3, 0.8, 0.4];

  return (
    <group ref={bodyRef}>
      {/* 머리 */}
      <Sphere
        args={[0.2, 16, 16]}
        position={[0, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#fdbcb4" />
      </Sphere>

      {/* 안전모 */}
      {safetyEquipment.helmet && (
        <Sphere args={[0.22, 16, 16]} position={[0, 1.6, 0]} castShadow>
          <meshStandardMaterial
            color="#6366f1"
            opacity={0.7}
            transparent
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      )}

      {/* 목 */}
      <Box args={[0.15, 0.2, 0.15]} position={[0, 1.3, 0]} castShadow>
        <meshStandardMaterial color="#fdbcb4" />
      </Box>

      {/* 몸통 (상체) */}
      <Box args={[0.6, 0.8, 0.4]} position={[0, 0.8, 0]} castShadow>
        <meshStandardMaterial 
          map={bodyTexture}
          color="#ffffff"
          metalness={0.2}
          roughness={0.8}
        />
      </Box>

      {/* 안전 조끼 */}
      {safetyEquipment.vest && (
        <Box args={[0.65, 0.85, 0.45]} position={[0, 0.8, 0]} castShadow>
          <meshStandardMaterial
            color="#facc15"
            opacity={0.6}
            transparent
            metalness={0.3}
          />
        </Box>
      )}

      {/* 요추 부위 (L1-L5) 하이라이트 */}
      <Box
        args={[0.5, 0.3, 0.35]}
        position={[0, 0.3, 0.1]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={getRiskColor()}
          opacity={0.7}
          transparent
          emissive={getRiskColor()}
          emissiveIntensity={lumbarRiskLevel === "high" ? 0.5 : 0.2}
        />
      </Box>

      {/* 요추 라벨 */}
      <Text
        position={[0.4, 0.3, 0.2]}
        fontSize={0.08}
        color={getRiskColor()}
        anchorX="left"
        anchorY="middle"
      >
        LBP
      </Text>

      {/* 심박수 표시 (가슴 왼쪽) */}
      <Sphere args={[0.08, 16, 16]} position={heartPosition} castShadow>
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.5}
        />
      </Sphere>
      <Text
        position={[heartPosition[0] - 0.15, heartPosition[1], heartPosition[2]]}
        fontSize={0.06}
        color="#ef4444"
        anchorX="right"
        anchorY="middle"
      >
        {heartRate} BPM
      </Text>

      {/* 팔 (왼쪽) */}
      <Box args={[0.12, 0.7, 0.12]} position={[-0.4, 0.6, 0]} castShadow>
        <meshStandardMaterial color="#fdbcb4" />
      </Box>
      {/* 팔 (오른쪽) */}
      <Box args={[0.12, 0.7, 0.12]} position={[0.4, 0.6, 0]} castShadow>
        <meshStandardMaterial color="#fdbcb4" />
      </Box>

      {/* 다리 (왼쪽) */}
      <Box args={[0.15, 0.9, 0.15]} position={[-0.2, -0.4, 0]} castShadow>
        <meshStandardMaterial color="#4a5568" />
      </Box>
      {/* 다리 (오른쪽) */}
      <Box args={[0.15, 0.9, 0.15]} position={[0.2, -0.4, 0]} castShadow>
        <meshStandardMaterial color="#4a5568" />
      </Box>

      {/* 안전화 */}
      {safetyEquipment.boots && (
        <>
          <Box
            args={[0.18, 0.15, 0.25]}
            position={[-0.2, -0.95, 0.05]}
            castShadow
          >
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.5}
              roughness={0.3}
            />
          </Box>
          <Box
            args={[0.18, 0.15, 0.25]}
            position={[0.2, -0.95, 0.05]}
            castShadow
          >
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.5}
              roughness={0.3}
            />
          </Box>
        </>
      )}
    </group>
  );
};

// 심박수 애니메이션 컴포넌트
const HeartbeatIndicator: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(1);

  useFrame((state) => {
    if (meshRef.current) {
      // 심박수에 맞춰 펄스 애니메이션
      const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.1 + 1;
      setScale(pulse);
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.08, 16, 16]} position={position}>
      <meshStandardMaterial
        color="#ef4444"
        emissive="#ef4444"
        emissiveIntensity={0.8}
      />
    </Sphere>
  );
};

// 메인 컴포넌트
export const Worker3DModel: React.FC<Worker3DModelProps> = (props) => {
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">(
    props.lumbarRiskLevel || "low"
  );

  // 실시간 위험도 시뮬레이션 (실제로는 API에서 받아올 데이터)
  useEffect(() => {
    const interval = setInterval(() => {
      // 랜덤하게 위험도 변경 (실제로는 센서 데이터 기반)
      const levels: ("low" | "medium" | "high")[] = ["low", "medium", "high"];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      setRiskLevel(randomLevel);
    }, 5000); // 5초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [2, 1, 3], fov: 50 }}
        shadows
        className="bg-transparent"
      >
        {/* 조명 */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />

        {/* 인체 모델 */}
        <HumanBody {...props} lumbarRiskLevel={riskLevel} />

        {/* 심박수 애니메이션 */}
        <HeartbeatIndicator position={[-0.3, 0.8, 0.4]} />

        {/* 카메라 컨트롤 */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={6}
        />

        {/* 그리드 (선택사항) */}
        <gridHelper args={[5, 20, "#4a5568", "#2d3748"]} />
      </Canvas>

      {/* 위험도 표시 레전드 */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              riskLevel === "high"
                ? "bg-app-danger"
                : riskLevel === "medium"
                ? "bg-app-warning"
                : "bg-app-success"
            }`}
          />
          <span className="text-white">
            요추 위험도:{" "}
            {riskLevel === "high"
              ? "높음"
              : riskLevel === "medium"
              ? "보통"
              : "낮음"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-app-accent" />
          <span className="text-white">안전 장비 착용</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-app-danger animate-pulse" />
          <span className="text-black">
            심박수: {props.heartRate || 72} BPM
          </span>
        </div>
      </div>
    </div>
  );
};

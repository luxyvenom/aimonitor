import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface Brain3DModelProps {
  /**
   * 인지 부하 수준 (20-70)
   * green: < 40
   * yellow: 40-70
   * red: > 70
   */
  cognitiveLoad?: number;
  /**
   * 자동 회전 활성화 여부
   */
  autoRotate?: boolean;
}

// 뇌 모델 컴포넌트
const Brain: React.FC<{ cognitiveLoad: number }> = ({ cognitiveLoad }) => {
  const brainRef = useRef<THREE.Mesh>(null);

  // 뇌 텍스처 로드
  const brainTexture = useTexture("/textures/brain.png");

  // 인지 부하에 따른 위험도 레벨 결정
  const getRiskLevel = (): "green" | "yellow" | "red" => {
    if (cognitiveLoad < 40) return "green";
    if (cognitiveLoad < 70) return "yellow";
    return "red";
  };

  // 위험도에 따른 색상 및 emissive 설정
  const getRiskColor = (): string => {
    const level = getRiskLevel();
    switch (level) {
      case "red":
        return "#ef4444"; // app-danger
      case "yellow":
        return "#facc15"; // app-warning
      case "green":
        return "#22c55e"; // app-success
      default:
        return "#64748b"; // app-muted
    }
  };

  const riskColor = getRiskColor();

  // 인지 부하에 따른 emissive intensity 계산
  const emissiveIntensity = Math.min(
    0.8,
    Math.max(0.1, ((cognitiveLoad - 20) / 50) * 0.7)
  );

  // 펄스 애니메이션 (인지 부하가 높을수록 빠르게)
  useFrame((state) => {
    if (brainRef.current) {
      const pulseSpeed = 2 + (cognitiveLoad / 70) * 3; // 인지 부하에 따라 펄스 속도 증가
      const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.05 + 1;
      brainRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* 뇌 모델 */}
      <Sphere
        ref={brainRef}
        args={[1, 32, 32]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={brainTexture}
          emissive={riskColor}
          emissiveIntensity={emissiveIntensity}
          metalness={0.3}
          roughness={0.7}
        />
      </Sphere>

      {/* 인지 부하 라벨 */}
      <Text
        position={[0, -1.3, 0]}
        fontSize={0.15}
        color={riskColor}
        anchorX="center"
        anchorY="middle"
      >
        인지 부하: {cognitiveLoad.toFixed(1)}
      </Text>
    </group>
  );
};

// 메인 컴포넌트
export const Brain3DModel: React.FC<Brain3DModelProps> = ({
  cognitiveLoad = 35,
  autoRotate = false,
}) => {
  const [currentCognitiveLoad, setCurrentCognitiveLoad] =
    useState(cognitiveLoad);
  const rotationRef = useRef<THREE.Group>(null);

  // 인지 부하 prop 업데이트
  useEffect(() => {
    setCurrentCognitiveLoad(cognitiveLoad);
  }, [cognitiveLoad]);

  // 자동 회전 애니메이션
  useFrame((state) => {
    if (autoRotate && rotationRef.current) {
      rotationRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        shadows
        className="bg-transparent"
      >
        {/* 조명 */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />

        {/* 뇌 모델 */}
        <group ref={rotationRef}>
          <Brain cognitiveLoad={currentCognitiveLoad} />
        </group>

        {/* 카메라 컨트롤 */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={5}
        />
      </Canvas>

      {/* 위험도 표시 레전드 */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              currentCognitiveLoad >= 70
                ? "bg-app-danger"
                : currentCognitiveLoad >= 40
                ? "bg-app-warning"
                : "bg-app-success"
            }`}
          />
          <span className="text-white">
            인지 부하:{" "}
            {currentCognitiveLoad >= 70
              ? "높음"
              : currentCognitiveLoad >= 40
              ? "보통"
              : "낮음"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-app-accent" />
          <span className="text-white">
            수치: {currentCognitiveLoad.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

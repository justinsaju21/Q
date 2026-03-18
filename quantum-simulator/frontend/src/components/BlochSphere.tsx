/**
 * BlochSphere — Right panel component
 * Three.js/WebGL Bloch sphere visualization per qubit.
 * Shows state vector arrow, entangled indicator, and entanglement web.
 */

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useSimStore } from '../store/useSimStore';

interface BlochArrowProps {
  x: number;
  y: number;
  z: number;
  purity: number;
}

function BlochArrow({ x, y, z, purity }: BlochArrowProps) {
  const meshRef = useRef<THREE.Group>(null);
  const targetPos = useMemo(() => new THREE.Vector3(x, z, -y), [x, y, z]);

  useFrame(() => {
    if (!meshRef.current) return;

    const dir = targetPos.clone().normalize();

    meshRef.current.quaternion.slerp(
      new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.length() > 0.001 ? dir : new THREE.Vector3(0, 1, 0)
      ),
      0.1
    );
    meshRef.current.scale.setScalar(1);
  });

  const arrowLen = Math.sqrt(x * x + y * y + z * z);
  const color = purity > 0.9 ? '#00d4ff' : purity > 0.5 ? '#a855f7' : '#64748b';

  // Don't render arrow if purity is too low (entangled/mixed)
  if (purity < 0.15) {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.8} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={meshRef}>
      <mesh position={[0, arrowLen * 0.4, 0]}>
        <cylinderGeometry args={[0.03, 0.03, arrowLen * 0.8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, arrowLen * 0.85, 0]}>
        <coneGeometry args={[0.08, 0.15, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#facc15" />
      </mesh>
    </group>
  );
}

function SphereScene({ x, y, z, purity }: BlochArrowProps) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />

      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          transparent
          opacity={0.15}
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.001, 16, 16]} />
        <meshBasicMaterial color="#334155" wireframe transparent opacity={0.3} />
      </mesh>

      <Line points={[[-1.3, 0, 0], [1.3, 0, 0]]} color="#ef4444" lineWidth={1} transparent opacity={0.5} />
      <Line points={[[0, -1.3, 0], [0, 1.3, 0]]} color="#22c55e" lineWidth={1} transparent opacity={0.5} />
      <Line points={[[0, 0, -1.3], [0, 0, 1.3]]} color="#3b82f6" lineWidth={1} transparent opacity={0.5} />

      <Text position={[1.5, 0, 0]} fontSize={0.15} color="#ef4444">x</Text>
      <Text position={[0, 1.5, 0]} fontSize={0.15} color="#22c55e">|0⟩</Text>
      <Text position={[0, -1.5, 0]} fontSize={0.15} color="#22c55e">|1⟩</Text>
      <Text position={[0, 0, -1.5]} fontSize={0.15} color="#3b82f6">y</Text>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.005, 8, 64]} />
        <meshBasicMaterial color="#475569" transparent opacity={0.3} />
      </mesh>

      <BlochArrow x={x} y={y} z={z} purity={purity} />
    </>
  );
}

// Detect entanglement pairs from Bloch coords
function findEntangledPairs(blochData: Array<{ x: number; y: number; z: number; purity: number }>): [number, number][] {
  const pairs: [number, number][] = [];
  const entangledQubits = blochData
    .map((c, i) => ({ index: i, purity: c.purity }))
    .filter(q => q.purity < 0.95);

  // If multiple qubits are entangled, pair them together
  for (let i = 0; i < entangledQubits.length; i++) {
    for (let j = i + 1; j < entangledQubits.length; j++) {
      pairs.push([entangledQubits[i].index, entangledQubits[j].index]);
    }
  }
  return pairs;
}

export default function BlochSphere() {
  const { stateHistory, currentStep, nQubits } = useSimStore();

  const currentState = stateHistory[currentStep];
  const blochData = currentState?.bloch_coords || [];
  const entangledPairs = findEntangledPairs(blochData);

  return (
    <div className="panel bloch-panel">
      <h2 className="panel-title">
        <span className="title-icon">◉</span> Bloch Sphere
      </h2>

      {/* Entanglement Web indicator */}
      {entangledPairs.length > 0 && (
        <div className="entanglement-web">
          <div className="ent-web-label">⚡ Entanglement Links</div>
          <div className="ent-web-pairs">
            {entangledPairs.map(([a, b], i) => (
              <div key={i} className="ent-pair">
                <span className="ent-qubit">q{a}</span>
                <span className="ent-connector">⟷</span>
                <span className="ent-qubit">q{b}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bloch-grid">
        {Array.from({ length: nQubits }, (_, i) => {
          const coords = blochData[i] || { x: 0, y: 0, z: 1, purity: 1 };
          const isEntangled = coords.purity < 0.95;
          return (
            <div key={i} className="bloch-item">
              <div className="bloch-label">q{i}</div>
              <div className={`bloch-canvas ${isEntangled ? 'bloch-entangled' : ''}`}>
                <Canvas
                  camera={{ position: [2.5, 2, 2.5], fov: 40 }}
                  gl={{ antialias: true, alpha: true }}
                  style={{ background: 'transparent' }}
                >
                  <SphereScene
                    x={coords.x}
                    y={coords.y}
                    z={coords.z}
                    purity={coords.purity}
                  />
                </Canvas>
                {isEntangled && (
                  <div className="bloch-entangled-badge">
                    <span className="entangled-icon">⚡</span>
                    <span>Entangled</span>
                  </div>
                )}
              </div>
              <div className="bloch-coords-display">
                {isEntangled ? (
                  <span className="purity-display">
                    Purity: {(coords.purity * 100).toFixed(0)}% — Mixed State
                  </span>
                ) : (
                  <span>
                    x: {coords.x.toFixed(2)} &nbsp;|&nbsp; y: {coords.y.toFixed(2)} &nbsp;|&nbsp; z: {coords.z.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {blochData.length === 0 && (
          <div className="bloch-placeholder">
            <span>🌐</span>
            <p>Run a circuit or algorithm to see Bloch sphere visualization</p>
          </div>
        )}
      </div>
    </div>
  );
}

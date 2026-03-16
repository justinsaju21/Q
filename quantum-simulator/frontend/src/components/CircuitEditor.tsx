/**
 * CircuitEditor — Center panel component
 * SVG-based quantum circuit renderer with click-to-place gate interaction.
 * Shows qubit wires, placed gates, and step highlighting during execution.
 */

import { useState, useEffect } from 'react';
import { useSimStore } from '../store/useSimStore';
import type { GateInfo, GateOperation } from '../types/quantum';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const WIRE_Y_START = 60;
const WIRE_Y_GAP = 60;
const GATE_X_START = 120;
const GATE_X_GAP = 70;
const GATE_SIZE = 40;

const GATE_COLORS: Record<string, string> = {
  H: '#00d4ff',
  X: '#f97316',
  Y: '#a855f7',
  Z: '#10b981',
  S: '#6366f1',
  'S†': '#818cf8',
  T: '#ec4899',
  'T†': '#f472b6',
  CNOT: '#f59e0b',
  CZ: '#eab308',
  SWAP: '#14b8a6',
  CCX: '#ef4444',
  Rx: '#06b6d4',
  Ry: '#8b5cf6',
  Rz: '#22c55e',
  P: '#d946ef',
  I: '#64748b',
  M: '#94a3b8',
};

export default function CircuitEditor() {
  const { nQubits, operations, addOperation, removeOperation, clearOperations, currentStep } =
    useSimStore();

  const [gates, setGates] = useState<GateInfo[]>([]);
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [paramValue, setParamValue] = useState<number>(Math.PI / 2);
  const [hoverWire, setHoverWire] = useState<number | null>(null);
  const [secondTarget, setSecondTarget] = useState<{gate: string; first: number} | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/gates`)
      .then((r) => r.json())
      .then((data) => setGates(data.gates))
      .catch(console.error);
  }, []);

  const wireY = (q: number) => WIRE_Y_START + q * WIRE_Y_GAP;
  const gateX = (step: number) => GATE_X_START + step * GATE_X_GAP;

  const svgWidth = Math.max(600, GATE_X_START + (operations.length + 2) * GATE_X_GAP);
  const svgHeight = WIRE_Y_START + nQubits * WIRE_Y_GAP + 20;

  const handleWireClick = (qubitIndex: number) => {
    if (!selectedGate) return;

    const gateInfo = gates.find((g) => g.name === selectedGate);
    if (!gateInfo) return;

    if (gateInfo.n_qubits === 1) {
      const op: GateOperation = {
        gate: selectedGate,
        targets: [qubitIndex],
        param: gateInfo.has_parameter ? paramValue : undefined,
      };
      addOperation(op);
    } else if (gateInfo.n_qubits === 2) {
      if (!secondTarget) {
        setSecondTarget({ gate: selectedGate, first: qubitIndex });
      } else {
        if (secondTarget.first !== qubitIndex) {
          const op: GateOperation = {
            gate: secondTarget.gate,
            targets: [secondTarget.first, qubitIndex],
          };
          addOperation(op);
        }
        setSecondTarget(null);
      }
    } else if (gateInfo.n_qubits === 3) {
      // For 3-qubit gates, use sequential clicks
      if (!secondTarget) {
        setSecondTarget({ gate: selectedGate, first: qubitIndex });
      } else {
        // Find a third qubit that doesn't collide with the first two
        const used = new Set([secondTarget.first, qubitIndex]);
        let thirdTarget = -1;
        for (let q = 0; q < nQubits; q++) {
          if (!used.has(q)) {
            thirdTarget = q;
            break;
          }
        }
        if (thirdTarget === -1 || secondTarget.first === qubitIndex) {
          // Not enough distinct qubits — cancel
          setSecondTarget(null);
          return;
        }
        const op: GateOperation = {
          gate: selectedGate,
          targets: [secondTarget.first, qubitIndex, thirdTarget],
        };
        addOperation(op);
        setSecondTarget(null);
      }
    }
  };

  const handleAddMeasurement = () => {
    for (let i = 0; i < nQubits; i++) {
      addOperation({ gate: 'M', targets: [i], label: `Measure q${i}` });
    }
  };

  return (
    <div className="panel circuit-editor">
      <div className="circuit-toolbar">
        <h2 className="panel-title">
          <span className="title-icon">≡</span> Quantum Circuit
        </h2>
        <div className="toolbar-actions">
          <button className="tool-btn" onClick={handleAddMeasurement} title="Add measurements">
            📏 Measure
          </button>
          <button className="tool-btn danger" onClick={clearOperations} title="Clear all">
            🗑 Clear
          </button>
        </div>
      </div>

      {/* Gate palette */}
      <div className="gate-palette">
        {gates.filter(g => g.n_qubits <= 2).map((g) => (
          <button
            key={g.name}
            className={`gate-btn ${selectedGate === g.name ? 'selected' : ''}`}
            style={{
              borderColor: selectedGate === g.name ? GATE_COLORS[g.name] || '#00d4ff' : undefined,
              color: GATE_COLORS[g.name] || '#00d4ff',
            }}
            onClick={() => {
              setSelectedGate(selectedGate === g.name ? null : g.name);
              setSecondTarget(null);
            }}
            title={g.description}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Parameter input for parameterized gates */}
      {selectedGate && gates.find((g) => g.name === selectedGate)?.has_parameter && (
        <div className="param-input-row">
          <label>θ/φ = </label>
          <input
            type="number"
            step="0.1"
            value={paramValue}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!isNaN(v)) setParamValue(v);
            }}
          />
          <span className="param-hint">
            (π/4≈0.785, π/2≈1.571, π≈3.142)
          </span>
        </div>
      )}

      {/* Second target hint */}
      {secondTarget && (
        <div className="hint-bar">
          Click second qubit wire for {secondTarget.gate} (control: q{secondTarget.first})
        </div>
      )}

      {/* Circuit SVG */}
      <div className="circuit-canvas">
        <svg width={svgWidth} height={svgHeight} className="circuit-svg">
          {/* Qubit labels */}
          {Array.from({ length: nQubits }, (_, q) => (
            <text
              key={`label-${q}`}
              x={20}
              y={wireY(q) + 5}
              className="qubit-label"
              fill="#94a3b8"
            >
              q{q} |0⟩
            </text>
          ))}

          {/* Qubit wires */}
          {Array.from({ length: nQubits }, (_, q) => (
            <g key={`wire-${q}`}>
              <line
                x1={80}
                y1={wireY(q)}
                x2={svgWidth - 20}
                y2={wireY(q)}
                stroke="#334155"
                strokeWidth={2}
              />
              {/* Invisible wider click target */}
              <line
                x1={80}
                y1={wireY(q)}
                x2={svgWidth - 20}
                y2={wireY(q)}
                stroke="transparent"
                strokeWidth={20}
                style={{ cursor: selectedGate ? 'crosshair' : 'default' }}
                onClick={() => handleWireClick(q)}
                onMouseEnter={() => setHoverWire(q)}
                onMouseLeave={() => setHoverWire(null)}
              />
              {/* Hover highlight */}
              {hoverWire === q && selectedGate && (
                <line
                  x1={80}
                  y1={wireY(q)}
                  x2={svgWidth - 20}
                  y2={wireY(q)}
                  stroke={GATE_COLORS[selectedGate] || '#00d4ff'}
                  strokeWidth={2}
                  opacity={0.4}
                  pointerEvents="none"
                />
              )}
            </g>
          ))}

          {/* Gates */}
          {operations.map((op, idx) => {
            const x = gateX(idx);
            const color = GATE_COLORS[op.gate] || '#00d4ff';
            const isActive = idx === currentStep - 1;
            const isPast = idx < currentStep - 1;

            if (op.gate === 'M') {
              // Measurement symbol
              const y = wireY(op.targets[0]);
              return (
                <g key={idx} opacity={isPast ? 0.5 : 1} onClick={() => removeOperation(idx)} style={{cursor: 'pointer'}}>
                  <rect x={x - 18} y={y - 18} width={36} height={36} rx={4}
                    fill="#1e293b" stroke={isActive ? '#facc15' : '#475569'} strokeWidth={isActive ? 2.5 : 1.5} />
                  <path d={`M${x - 10} ${y + 6} Q${x} ${y - 10} ${x + 10} ${y + 6}`}
                    fill="none" stroke="#94a3b8" strokeWidth={1.5} />
                  <line x1={x} y1={y - 2} x2={x + 7} y2={y - 10}
                    stroke="#94a3b8" strokeWidth={1.5} />
                </g>
              );
            }

            if (op.targets.length === 1) {
              // Single-qubit gate
              const y = wireY(op.targets[0]);
              return (
                <g key={idx} opacity={isPast ? 0.5 : 1} onClick={() => removeOperation(idx)} style={{cursor: 'pointer'}}>
                  <rect
                    x={x - GATE_SIZE / 2}
                    y={y - GATE_SIZE / 2}
                    width={GATE_SIZE}
                    height={GATE_SIZE}
                    rx={6}
                    fill="#0f172a"
                    stroke={isActive ? '#facc15' : color}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    className="gate-rect"
                  />
                  <text x={x} y={y + 5} textAnchor="middle" fill={color} fontSize={14} fontWeight="bold">
                    {op.gate}
                  </text>
                  {isActive && (
                    <rect x={x - GATE_SIZE / 2 - 3} y={y - GATE_SIZE / 2 - 3}
                      width={GATE_SIZE + 6} height={GATE_SIZE + 6} rx={8}
                      fill="none" stroke="#facc15" strokeWidth={1} opacity={0.5} />
                  )}
                </g>
              );
            }

            // Multi-qubit gate (CNOT, CZ, SWAP)
            const y0 = wireY(op.targets[0]);
            const y1 = wireY(op.targets[1]);
            return (
              <g key={idx} opacity={isPast ? 0.5 : 1} onClick={() => removeOperation(idx)} style={{cursor: 'pointer'}}>
                {/* Vertical connector */}
                <line
                  x1={x} y1={Math.min(y0, y1)} x2={x} y2={Math.max(y0, y1)}
                  stroke={isActive ? '#facc15' : color} strokeWidth={2}
                />
                {/* Control dot */}
                <circle cx={x} cy={y0} r={6} fill={isActive ? '#facc15' : color} />
                {op.gate === 'SWAP' ? (
                  <>
                    {/* SWAP X symbols */}
                    <text x={x} y={y0 + 5} textAnchor="middle" fill={color} fontSize={18}>×</text>
                    <text x={x} y={y1 + 5} textAnchor="middle" fill={color} fontSize={18}>×</text>
                  </>
                ) : (
                  <>
                    {/* Target circle with ⊕ */}
                    <circle cx={x} cy={y1} r={14} fill="none"
                      stroke={isActive ? '#facc15' : color} strokeWidth={2} />
                    <line x1={x - 10} y1={y1} x2={x + 10} y2={y1}
                      stroke={isActive ? '#facc15' : color} strokeWidth={2} />
                    <line x1={x} y1={y1 - 10} x2={x} y2={y1 + 10}
                      stroke={isActive ? '#facc15' : color} strokeWidth={2} />
                  </>
                )}
              </g>
            );
          })}

          {/* Step indicator line */}
          {currentStep > 0 && currentStep <= operations.length && (
            <line
              x1={gateX(currentStep - 1)}
              y1={WIRE_Y_START - 30}
              x2={gateX(currentStep - 1)}
              y2={svgHeight - 10}
              stroke="#facc15"
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.5}
            />
          )}
        </svg>
      </div>
    </div>
  );
}

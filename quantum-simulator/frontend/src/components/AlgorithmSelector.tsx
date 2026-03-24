/**
 * AlgorithmSelector — Left panel component
 * Collapsible cards for each quantum algorithm/protocol with parameter inputs.
 */

import { useState, useEffect } from 'react';
import { useSimStore } from '../store/useSimStore';
import type { AlgorithmInfo } from '../types/quantum';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Icons for each algorithm category
const ALGO_ICONS: Record<string, string> = {
  deutsch_jozsa: '⚡',
  grover: '🔍',
  teleportation: '🌀',
  bb84: '🔐',
  qrng: '🎲',
};

export default function AlgorithmSelector() {
  const {
    algorithms,
    setAlgorithms,
    selectedAlgorithm,
    setSelectedAlgorithm,
    setStateHistory,
    setAlgorithmResult,
    nQubits,
    setNQubits,
    setCurrentStep,
    loadPreset,
  } = useSimStore();

  const [params, setParams] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [runError, setRunError] = useState<string | null>(null);

  // Fetch available algorithms on mount
  useEffect(() => {
    fetch(`${API_URL}/api/algorithms`)
      .then((r) => r.json())
      .then((data) => setAlgorithms(data.algorithms))
      .catch((e) => console.error('Failed to load algorithms:', e));
  }, [setAlgorithms]);

  const handleSelect = (algo: AlgorithmInfo) => {
    setSelectedAlgorithm(algo.name);
    setExpanded(expanded === algo.name ? null : algo.name);
    // Initialize default params
    const defaults: Record<string, unknown> = {};
    algo.parameters.forEach((p) => {
      defaults[p.name] = p.default;
    });
    setParams(defaults);
  };

  const handleParamChange = (name: string, value: unknown) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleRun = async () => {
    if (!selectedAlgorithm) return;
    setLoading(true);
    setRunError(null);

    try {
      const res = await fetch(`${API_URL}/api/algorithms/${selectedAlgorithm}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: selectedAlgorithm, params }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setRunError(data.detail || data.error || 'Unknown error from server.');
        return;
      }
      setRunError(null);
        setAlgorithmResult(data.result);

        // Determine nQubits from state_history
        const resultNQubits = data.result.state_history?.[0]?.n_qubits ?? nQubits;

        // Sync the algorithm's circuit gates into the circuit editor
        if (data.result.circuit && Array.isArray(data.result.circuit)) {
          // Filter to only renderable gates (skip __prepare__)
          const renderableOps = data.result.circuit
            .filter((step: Record<string, unknown>) => {
              const gate = String(step.gate || '');
              return gate !== '__prepare__';
            })
            .map((step: Record<string, unknown>) => {
              const gate = String(step.gate);
              const mappedGate = gate === '__measure__' ? 'M' : 
                               gate === '__conditional_x__' ? 'CX_c' : 
                               gate === '__conditional_z__' ? 'CZ_c' : gate;
              return {
                gate: mappedGate,
                targets: step.targets as number[],
                param: step.param as number | undefined,
                label: step.label as string | undefined,
                condition_qubit: step.condition_qubit as number | undefined,
              };
            });
          loadPreset(renderableOps, resultNQubits);
        } else if (resultNQubits !== nQubits) {
          setNQubits(resultNQubits);
        }

        // Load the algorithm's own state_history (overrides auto-simulation from loadPreset)
        if (data.result.state_history && data.result.state_history.length > 0) {
          // Use setTimeout to ensure this runs AFTER loadPreset's auto-simulation effect
          setTimeout(() => {
            setStateHistory(data.result.state_history);
            setCurrentStep(0);
            // Re-apply the result because loadPreset clears it!
            setAlgorithmResult(data.result);
          }, 50);
        }
    } catch (e) {
      console.error('Algorithm execution failed:', e);
      setRunError('Failed to connect to the backend. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel algorithm-selector">
      <h2 className="panel-title">
        <span className="title-icon">◈</span> Algorithms & Protocols
      </h2>

      {/* Qubit count selector */}
      <div className="qubit-selector">
        <label>Qubits</label>
        <div className="qubit-buttons">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`qubit-btn ${nQubits === n ? 'active' : ''}`}
              onClick={() => setNQubits(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithm list */}
      <div className="algo-list">
        {algorithms.length === 0 && (
          <div className="algo-loading">
            <div className="spinner" />
            <span>Loading algorithms...</span>
          </div>
        )}

        {algorithms.map((algo) => (
          <div
            key={algo.name}
            className={`algo-card ${selectedAlgorithm === algo.name ? 'selected' : ''}`}
          >
            <button
              className="algo-header"
              onClick={() => handleSelect(algo)}
            >
              <span className="algo-icon">{ALGO_ICONS[algo.name] || '⚛'}</span>
              <div className="algo-info">
                <span className="algo-name">{algo.display_name}</span>
                <span className="algo-category">{algo.category}</span>
              </div>
              <span className={`algo-chevron ${expanded === algo.name ? 'open' : ''}`}>
                ›
              </span>
            </button>

            {expanded === algo.name && (
              <div className="algo-body">
                <p className="algo-desc">{algo.description}</p>

                {/* Parameter inputs */}
                <div className="algo-params">
                  {algo.parameters.map((p) => (
                    <div key={p.name} className="param-field">
                      <label>{p.description}</label>
                      {p.type === 'int' && (
                        <input
                          type="number"
                          min={p.min}
                          max={p.max}
                          value={params[p.name] as number ?? p.default as number}
                          onChange={(e) => handleParamChange(p.name, parseInt(e.target.value))}
                        />
                      )}
                      {p.type === 'float' && (
                        <input
                          type="number"
                          step="0.1"
                          min={p.min}
                          max={p.max}
                          value={params[p.name] as number ?? p.default as number}
                          onChange={(e) => handleParamChange(p.name, parseFloat(e.target.value))}
                        />
                      )}
                      {p.type === 'bool' && (
                        <label className="toggle">
                          <input
                            type="checkbox"
                            checked={params[p.name] as boolean ?? p.default as boolean}
                            onChange={(e) => handleParamChange(p.name, e.target.checked)}
                          />
                          <span className="toggle-slider" />
                        </label>
                      )}
                      {p.type === 'select' && (
                        <select
                          value={params[p.name] as string ?? p.default as string}
                          onChange={(e) => handleParamChange(p.name, e.target.value)}
                        >
                          {p.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt.replace(/_/g, ' ')}</option>
                          ))}
                        </select>
                      )}
                      {p.type === 'int_list' && (
                        <input
                          type="text"
                          placeholder="e.g., 3,5,7"
                          value={
                            Array.isArray(params[p.name])
                              ? (params[p.name] as number[]).join(',')
                              : String(p.default)
                          }
                          onChange={(e) =>
                            handleParamChange(
                              p.name,
                              e.target.value.split(',').map((v) => parseInt(v.trim())).filter((v) => !isNaN(v))
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  className="run-btn"
                  onClick={handleRun}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner small" /> Running...
                    </>
                  ) : (
                    <>▶ Run Algorithm</>
                  )}
                </button>

                {runError && (
                  <div style={{ marginTop: '8px', padding: '8px 10px', background: 'rgba(239,68,68,0.12)', border: '1px solid #ef4444', borderRadius: '6px', fontSize: '12px', color: '#ef4444' }}>
                    ⚠ {runError}
                  </div>
                )}

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

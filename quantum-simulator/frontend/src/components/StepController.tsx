/**
 * StepController — Step-by-step execution controls + Algorithm Result Display
 * Previous / Next / Play / Reset with step counter, speed slider,
 * and the algorithm result / formula panel shown in the bottom screenshot area.
 */

import { useEffect, useRef, useCallback } from 'react';
import { useSimStore } from '../store/useSimStore';

export default function StepController() {
  const {
    currentStep,
    totalSteps,
    isPlaying,
    playSpeed,
    stateHistory,
    nextStep,
    prevStep,
    resetStep,
    setPlaying,
    setPlaySpeed,
    setCurrentStep,
    algorithmResult,
  } = useSimStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setPlaying(false);
  }, [setPlaying]);

  // Auto-play
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        const store = useSimStore.getState();
        if (store.currentStep >= store.totalSteps - 1) {
          stopAutoPlay();
        } else {
          store.nextStep();
        }
      }, playSpeed);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, playSpeed, stopAutoPlay]);

  const togglePlay = () => {
    if (isPlaying) {
      stopAutoPlay();
    } else {
      if (currentStep >= totalSteps - 1) {
        resetStep();
      }
      setPlaying(true);
    }
  };

  const hasSteps = stateHistory.length > 1;
  const stepLabel = hasSteps
    ? `Step ${currentStep} of ${totalSteps - 1}`
    : 'No simulation loaded';

  const circuit = (algorithmResult as Record<string, unknown>)?.circuit as Array<{label?: string}> | undefined;
  const currentStepLabel = circuit && currentStep > 0 && currentStep <= circuit.length
    ? circuit[currentStep - 1]?.label || ''
    : currentStep === 0 ? 'Initial state |0⟩⊗ⁿ' : '';

  // ── Result / Formula panel helpers ──────────────────────────────────────────
  const result = algorithmResult as Record<string, unknown> | null;
  const algoName = result?.algorithm as string | undefined;
  const hasSummary = result && typeof result.summary === 'string' && result.summary.length > 0;

  // BB84 demo outcome colours
  const outcomeColors: Record<string, string> = {
    SECURE: '#22c55e',
    EVE_DETECTED: '#ef4444',
    LUCKY_MATCH: '#f59e0b',
    DISCARDED: '#94a3b8',
  };
  const outcomeLabels: Record<string, string> = {
    SECURE: 'SECURE — Key bit established',
    EVE_DETECTED: 'EVE DETECTED — Eavesdropping caught!',
    LUCKY_MATCH: 'LUCKY MATCH — Eve got away this time',
    DISCARDED: 'DISCARDED — Bases mismatched',
  };

  return (
    <div className="step-controller">
      {/* ── Playback row ── */}
      <div className="step-row">
        <div className="step-buttons">
          <button className="step-btn" onClick={resetStep} disabled={!hasSteps || currentStep === 0} title="Reset to start">⏮</button>
          <button className="step-btn" onClick={prevStep} disabled={!hasSteps || currentStep === 0} title="Previous step">◀</button>
          <button className={`step-btn play-btn ${isPlaying ? 'playing' : ''}`} onClick={togglePlay} disabled={!hasSteps} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="step-btn" onClick={nextStep} disabled={!hasSteps || currentStep >= totalSteps - 1} title="Next step">▶</button>
          <button className="step-btn" onClick={() => setCurrentStep(totalSteps - 1)} disabled={!hasSteps || currentStep >= totalSteps - 1} title="Go to end">⏭</button>
        </div>

        {hasSteps && (
          <div className="step-progress flex-1">
            <input
              type="range"
              min={0}
              max={totalSteps - 1}
              value={currentStep}
              onChange={(e) => setCurrentStep(parseInt(e.target.value))}
              className="progress-slider"
            />
          </div>
        )}

        <div className="speed-control">
          <label>Speed</label>
          <input
            type="range"
            min={100}
            max={3000}
            step={100}
            value={3100 - playSpeed}
            onChange={(e) => setPlaySpeed(3100 - parseInt(e.target.value))}
            className="speed-slider"
          />
          <span className="speed-label">
            {playSpeed < 500 ? 'Fast' : playSpeed < 1500 ? 'Normal' : 'Slow'}
          </span>
        </div>
      </div>

      {/* ── Step info row ── */}
      <div className="step-row step-info-row">
        <div className="step-info">
          <span className="step-counter">{stepLabel}</span>
          {currentStepLabel && <span className="step-label">{currentStepLabel}</span>}
        </div>
      </div>

      {/* ── Algorithm Result Panel ── */}
      {result && hasSummary && (
        <div className="algo-result-panel">
          <div className="algo-result-header">
            <span className="algo-result-title">
              {algoName === 'bb84_demo' ? 'BB84 Single-Qubit Demo' :
               algoName === 'deutsch' ? "Deutsch's Algorithm" :
               algoName === 'deutsch_jozsa' ? 'Deutsch-Jozsa' :
               algoName === 'teleportation' ? 'Quantum Teleportation' :
               algoName === 'bb84' ? 'BB84 QKD' : (algoName ?? 'Algorithm')} — Result
            </span>
          </div>

          <div className="algo-result-body">
            {/* BB84 Demo outcome badge */}
            {algoName === 'bb84_demo' && (result.outcome as unknown as string) && (() => {
              const outcome = String(result.outcome as unknown as string);
              const color = outcomeColors[outcome] || '#94a3b8';
              return (
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'inline-block', padding: '4px 12px', background: `${color}22`, border: `1px solid ${color}`, borderRadius: '6px', fontWeight: 'bold', color, fontSize: '12px', marginBottom: '6px' }}>
                    {outcomeLabels[outcome] || outcome}
                  </div>
                  {(result.outcome_detail as unknown as string) && (
                    <div style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '6px' }}>
                      {String(result.outcome_detail as unknown as string)}
                    </div>
                  )}
                  {Array.isArray(result.steps_narrative) && (
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      {(result.steps_narrative as string[]).map((step, si) => (
                        <div key={si} style={{ fontSize: '11px', color: '#64748b', display: 'flex', gap: '4px' }}>
                          <span style={{ color: '#475569' }}>{si + 1}.</span>
                          <span style={{ color: '#94a3b8' }}>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Full BB84 protocol stats */}
            {algoName === 'bb84' && (
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ color: '#e2e8f0', fontSize: '12px' }}>
                  Sifted Key: <span style={{ color: '#00d4ff', fontWeight: 'bold' }}>{String(result.n_sifted ?? '—')}</span> bits
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '12px' }}>
                  Error Rate: <span style={{ color: Number(result.error_rate ?? 0) > 0.11 ? '#ef4444' : '#22c55e', fontWeight: 'bold' }}>{(Number(result.error_rate ?? 0) * 100).toFixed(1)}%</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: result.secure === true ? '#22c55e' : '#ef4444' }}>
                  {result.secure === true ? '[SECURE] Channel secure' : '[WARNING] EAVESDROPPING DETECTED'}
                </div>
                {Array.isArray(result.final_key) && (
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Key: <code style={{ color: '#00d4ff' }}>{String((result.final_key as number[]).join(''))}</code>
                  </div>
                )}
              </div>
            )}

            {/* Summary / Formula lines */}
            <div className="algo-result-formulas">
              {String(result.summary).split('\n').map((line, i) => {
                const isFormula = line.includes('Formula:');
                const isOracle = line.startsWith('Oracle:');
                return (
                  <div
                    key={i}
                    className={isFormula ? 'algo-formula' : isOracle ? 'algo-summary-line algo-oracle' : 'algo-summary-line'}
                  >
                    {isFormula ? line.replace('Formula:', '').trim() : line}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

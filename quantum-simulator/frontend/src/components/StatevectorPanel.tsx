/**
 * StatevectorPanel — Bottom panel component
 * Shows complex amplitudes table and probability histogram (Recharts).
 */

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useSimStore } from '../store/useSimStore';

type ViewMode = 'histogram' | 'table';

// Color based on phase angle
function phaseColor(phase: number): string {
  const hue = ((phase + Math.PI) / (2 * Math.PI)) * 360;
  return `hsl(${hue}, 80%, 60%)`;
}

export default function StatevectorPanel() {
  const { stateHistory, currentStep } = useSimStore();
  const [viewMode, setViewMode] = useState<ViewMode>('histogram');

  const currentState = stateHistory[currentStep];
  const amplitudes = currentState?.amplitudes || [];
  const probabilities = currentState?.probabilities || {};

  // Prepare chart data
  const chartData = Object.entries(probabilities).map(([label, prob]) => ({
    label: `|${label}⟩`,
    probability: parseFloat((prob * 100).toFixed(2)),
    raw: prob,
  }));

  // If no data from probabilities dict, build from amplitudes
  const displayData = chartData.length > 0
    ? chartData
    : amplitudes.map((a) => ({
        label: a.label,
        probability: parseFloat((a.probability * 100).toFixed(2)),
        raw: a.probability,
      }));

  return (
    <div className="panel statevector-panel">
      <div className="sv-header">
        <h2 className="panel-title">
          <span className="title-icon">ψ</span> State Vector
        </h2>
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'histogram' ? 'active' : ''}`}
            onClick={() => setViewMode('histogram')}
          >
            📊 Histogram
          </button>
          <button
            className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            📋 Amplitudes
          </button>
        </div>
      </div>

      {amplitudes.length === 0 ? (
        <div className="sv-placeholder">
          <p>Run a circuit or load an algorithm to see the state vector</p>
        </div>
      ) : viewMode === 'histogram' ? (
        <div className="sv-chart">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={displayData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <XAxis
                dataKey="label"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={{ stroke: '#334155' }}
                tickLine={{ stroke: '#334155' }}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={{ stroke: '#334155' }}
                tickLine={{ stroke: '#334155' }}
                label={{ value: '%', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
                formatter={(value: unknown) => [`${value}%`, 'Probability']}
              />
              <Bar dataKey="probability" radius={[4, 4, 0, 0]}>
                {displayData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.raw > 0.01 ? '#00d4ff' : '#1e293b'}
                    fillOpacity={Math.max(0.3, entry.raw)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="sv-table-container">
          <table className="sv-table">
            <thead>
              <tr>
                <th>Basis</th>
                <th>Amplitude</th>
                <th>|α|</th>
                <th>Phase</th>
                <th className="prob-col">Probability</th>
              </tr>
            </thead>
            <tbody>
              {amplitudes.map((a) => (
                <tr key={a.index} className={a.probability > 0.01 ? 'active-row' : ''}>
                  <td className="basis-cell">{a.label}</td>
                  <td className="amp-cell">
                    {a.real.toFixed(3)}{a.imag >= 0 ? '+' : ''}{a.imag.toFixed(3)}i
                  </td>
                  <td>{a.magnitude.toFixed(4)}</td>
                  <td>
                    <span
                      className="phase-dot"
                      style={{ backgroundColor: phaseColor(a.phase) }}
                    />
                    {(a.phase * 180 / Math.PI).toFixed(1)}°
                  </td>
                  <td className="prob-col">
                    <div className="prob-bar-container">
                      <div
                        className="prob-bar"
                        style={{ width: `${a.probability * 100}%` }}
                      />
                      <span>{(a.probability * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

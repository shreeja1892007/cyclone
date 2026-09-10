import React from 'react';
import { Radio, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { getAvailableSatellites, getSatelliteConfig } from '../../services/satelliteService';
import SatelliteStatusBadge from './SatelliteStatusBadge';

export default function SatelliteSourceSelector({
  selectedId = 'insat3dr',
  onSelect,
  label = 'Satellite Source:',
  variant = 'scientific', // 'scientific' | 'operational'
  disabledIds = []
}) {
  const satellites = getAvailableSatellites();
  const current = getSatelliteConfig(selectedId) || satellites[0];

  return (
    <div className={`sat-source-selector-wrapper ${variant}`}>
      <div className="selector-label-strip">
        <Radio size={13} className="text-accent" />
        <span className="selector-label-text">{label}</span>
      </div>

      <div className="sat-select-control">
        <select
          className="gov-select sat-source-dropdown font-mono"
          value={selectedId}
          onChange={(e) => onSelect && onSelect(e.target.value)}
        >
          {satellites.map((sat) => {
            const isConn = sat.isConnected;
            const statusText = isConn
              ? sat.isDemo
                ? 'AVAILABLE [DEMO DATA]'
                : 'AVAILABLE'
              : 'NOT CONNECTED';
            return (
              <option
                key={sat.id}
                value={sat.id}
                disabled={disabledIds.includes(sat.id)}
              >
                {sat.name} — {statusText} ({sat.provider})
              </option>
            );
          })}
        </select>
        <ChevronDown size={14} className="dropdown-arrow" />
      </div>

      <div className="current-source-quick-status">
        <SatelliteStatusBadge
          status={current.isConnected ? (current.isDemo ? 'demo_data' : 'available') : 'not_connected'}
          label={current.isConnected ? (current.isDemo ? 'AVAILABLE (DEMO DATA)' : 'AVAILABLE (OPERATIONAL)') : 'NOT CONNECTED'}
          size="sm"
        />
      </div>

      <style>{`
        .sat-source-selector-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .selector-label-strip {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .sat-select-control {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        .sat-source-dropdown {
          appearance: none;
          background: #091426;
          border: 1px solid rgba(0, 229, 255, 0.3);
          color: #ffffff;
          padding: 5px 30px 5px 10px;
          font-size: 12px;
          font-weight: 600;
          border-radius: var(--radius-sm);
          cursor: pointer;
          outline: none;
          min-width: 240px;
          transition: all 0.15s ease;
        }
        .sat-source-dropdown:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 2px rgba(0, 229, 255, 0.2);
        }
        .sat-source-dropdown option {
          background: #091426;
          color: #f1f5f9;
          padding: 6px;
        }
        .sat-source-dropdown option:disabled {
          color: #64748b;
        }
        .dropdown-arrow {
          position: absolute;
          right: 10px;
          pointer-events: none;
          color: var(--text-muted);
        }
        .sat-source-selector-wrapper.operational .sat-source-dropdown {
          background: #0f1c34;
          border-color: rgba(148, 163, 184, 0.3);
          font-size: 12.5px;
        }
      `}</style>
    </div>
  );
}

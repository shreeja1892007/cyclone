import React from 'react';
import {
  Wind,
  CloudRain,
  Waves,
  AlertTriangle,
  Mountain,
  Droplets,
  Radio,
  Clock,
  Database
} from 'lucide-react';
import { HAZARD_ASSESSMENT_DATA } from '../../services/mockData';

export default function HazardAssessment({ hazards = HAZARD_ASSESSMENT_DATA }) {
  const getIcon = (id) => {
    switch (id) {
      case 'hz-wind': return <Wind size={16} />;
      case 'hz-rain': return <CloudRain size={16} />;
      case 'hz-surge': return <Waves size={16} />;
      case 'hz-coastal-flood': return <Droplets size={16} />;
      case 'hz-river-flood': return <AlertTriangle size={16} />;
      case 'hz-landslide': return <Mountain size={16} />;
      default: return <AlertTriangle size={16} />;
    }
  };

  return (
    <div className="sci-card hazard-assessment-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <AlertTriangle size={16} className="text-danger" />
          <span>Multilateral Hazard Assessment</span>
          <span className="hazard-subtag font-mono">Individual Parameter Threat Analysis</span>
        </div>
        <div className="sci-card-actions">
          <span className="sci-badge sci-badge-cyan">DEMO SIMULATION</span>
        </div>
      </div>

      <div className="hazard-grid">
        {hazards.map((hz) => {
          const isUnavailable = hz.category === 'N/A';
          const isCritical = hz.category === 'CRITICAL';
          const isHigh = hz.category === 'HIGH';

          const borderClass = isUnavailable
            ? 'hazard-unavailable'
            : isCritical
            ? 'hazard-critical'
            : isHigh
            ? 'hazard-high'
            : 'hazard-moderate';

          return (
            <div key={hz.id} className={`hazard-item-card ${borderClass}`}>
              <div className="hazard-top-row">
                <div className="hazard-name-wrap">
                  <span className="hazard-icon">{getIcon(hz.id)}</span>
                  <span className="hazard-name">{hz.name}</span>
                </div>
                <span
                  className={`hazard-cat-badge ${
                    isUnavailable
                      ? 'cat-na'
                      : isCritical
                      ? 'cat-crit'
                      : isHigh
                      ? 'cat-high'
                      : 'cat-mod'
                  }`}
                >
                  {hz.category}
                </span>
              </div>

              <div className="hazard-status-line">
                {hz.status}
              </div>

              {!isUnavailable ? (
                <>
                  <div className="hazard-metric-row">
                    <span className="hz-k">Peak Intensity:</span>
                    <span className="hz-v font-mono">{hz.peakValue}</span>
                  </div>
                  <div className="hazard-metric-row">
                    <span className="hz-k">Forecast Timing:</span>
                    <span className="hz-v">{hz.timing}</span>
                  </div>
                  <div className="hazard-metric-row">
                    <span className="hz-k">Affected Extent:</span>
                    <span className="hz-v text-muted">{hz.affectedRegions}</span>
                  </div>
                </>
              ) : (
                <div className="hazard-unavail-box">
                  <div className="unavail-notice font-mono">STATUS: N/A</div>
                  <div className="unavail-sub">MODEL NOT CONNECTED</div>
                  <p className="unavail-expl">No verified in-situ landslide telemetry stream currently active in prototype.</p>
                </div>
              )}

              <div className="hazard-footer">
                <div className="hz-source font-mono" title={`Source: ${hz.source}`}>
                  <Database size={10} /> {hz.source}
                </div>
                <div className="hz-time font-mono">
                  <Clock size={10} /> {hz.timestamp}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .hazard-assessment-card {
          margin-bottom: var(--space-3);
          background: #091224;
          border: 1px solid var(--bg-card-border);
        }
        .hazard-subtag {
          font-size: 10px;
          color: var(--text-muted);
          margin-left: 8px;
        }
        .hazard-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-3);
          padding: var(--space-3);
        }
        .hazard-item-card {
          background: var(--bg-surface);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid var(--bg-card-border);
          min-height: 145px;
        }
        .hazard-critical {
          border-color: rgba(239, 68, 68, 0.4);
          background: rgba(239, 68, 68, 0.04);
        }
        .hazard-high {
          border-color: rgba(245, 158, 11, 0.4);
          background: rgba(245, 158, 11, 0.04);
        }
        .hazard-moderate {
          border-color: rgba(56, 189, 248, 0.3);
          background: rgba(56, 189, 248, 0.03);
        }
        .hazard-unavailable {
          border-color: rgba(100, 116, 139, 0.25);
          background: rgba(15, 23, 42, 0.5);
          opacity: 0.75;
        }
        .hazard-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .hazard-name-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          font-size: 13px;
          color: var(--text-primary);
        }
        .hazard-icon {
          color: var(--accent-cyan);
          display: flex;
        }
        .hazard-cat-badge {
          font-size: 9px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }
        .cat-crit { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }
        .cat-high { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
        .cat-mod { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
        .cat-na { background: rgba(100, 116, 139, 0.2); color: #94a3b8; border: 1px solid rgba(100, 116, 139, 0.4); }

        .hazard-status-line {
          font-size: 11px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 6px;
        }
        .hazard-metric-row {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          line-height: 1.4;
          margin-bottom: 2px;
        }
        .hz-k {
          color: var(--text-muted);
        }
        .hz-v {
          color: var(--text-primary);
          font-weight: 500;
        }
        .hazard-unavail-box {
          background: rgba(0, 0, 0, 0.2);
          padding: 6px;
          border-radius: 4px;
          border: 1px dashed rgba(148, 163, 184, 0.2);
          margin: 4px 0;
        }
        .unavail-notice {
          font-size: 11px;
          font-weight: 700;
          color: #ef4444;
        }
        .unavail-sub {
          font-size: 10px;
          font-weight: 600;
          color: #94a3b8;
        }
        .unavail-expl {
          font-size: 9px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .hazard-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          padding-top: 6px;
          margin-top: 6px;
          font-size: 9px;
          color: var(--text-muted);
        }
        .hz-source, .hz-time {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        @media (max-width: 1200px) {
          .hazard-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .hazard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

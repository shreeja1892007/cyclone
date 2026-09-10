import React from 'react';
import DataQualityPanel from '../components/DataQualityPanel';
import { Layers, ShieldCheck, CheckCircle2, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function DataQuality({ frameData }) {
  const flags = [
    {
      status: 'available',
      label: 'Available / Valid',
      desc: 'Observed telemetry or reanalysis field present and verified by checksum at current timestamp.'
    },
    {
      status: 'delayed',
      label: 'Delayed / Ingesting',
      desc: 'Data received with latency exceeding nominal observation window (e.g. OHC / OISST products).'
    },
    {
      status: 'missing',
      label: 'Missing / Unavailable',
      desc: 'Telemetry dropped or spatial grid point obscured. Displayed explicitly as N/A or Missing; never silently replaced with zeros.'
    },
    {
      status: 'interpolated',
      label: 'Interpolated',
      desc: 'Mathematically estimated between adjacent 6-hour frames using cubic spline temporal weighting.'
    },
    {
      status: 'not_used',
      label: 'Not Used',
      desc: 'Sensor channel not ingested for this specific processing horizon (e.g. coastal radar for open-ocean stage).'
    }
  ];

  return (
    <div className="data-quality-page">
      <div className="page-header">
        <div>
          <h1 className="text-h1">Data Quality & Sensor Completeness</h1>
          <p className="header-subtitle">
            Sensor Health Matrix, Data Gaps, Latencies & Verification Status
          </p>
        </div>
        <div className="page-header-badges">
          <span className="sci-badge sci-badge-green font-mono">Completeness: 92% — Demo</span>
          <StatusBadge status="available" label="Quality Audit: Passed" />
        </div>
      </div>

      <div className="quality-workspace-grid">
        <div className="quality-panel-wrap">
          <DataQualityPanel frameData={frameData} />
        </div>

        {/* Quality Standard Flag Definitions */}
        <div className="sci-card quality-definitions-card">
          <div className="sci-card-header">
            <div className="sci-card-title">
              <ShieldCheck size={15} className="text-accent" /> Scientific Data Quality Flags & Nomenclature
            </div>
            <span className="sci-badge sci-badge-cyan font-mono">Rule: No Zero Fill</span>
          </div>

          <div className="flags-list">
            {flags.map((f, idx) => (
              <div key={idx} className="flag-item">
                <div className="flag-item-head">
                  <StatusBadge status={f.status} label={f.label} />
                </div>
                <div className="flag-item-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .data-quality-page {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: var(--space-3);
          border-bottom: 1px solid var(--bg-card-border);
        }
        .page-header-badges {
          display: flex;
          gap: var(--space-2);
        }
        .quality-workspace-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }
        .quality-definitions-card {
          background: #091222;
        }
        .flags-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .flag-item {
          background: rgba(148, 163, 184, 0.04);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: var(--radius-sm);
          padding: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .flag-item-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        @media (max-width: 1024px) {
          .quality-workspace-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

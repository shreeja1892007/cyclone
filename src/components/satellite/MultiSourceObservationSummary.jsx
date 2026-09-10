import React from 'react';
import { Layers, CheckCircle2, AlertCircle, Clock, Globe, Scaling, Database } from 'lucide-react';
import SatelliteStatusBadge from './SatelliteStatusBadge';

export default function MultiSourceObservationSummary({ summary }) {
  if (!summary) return null;

  return (
    <div className="sci-card multi-summary-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <Layers size={15} className="text-accent" />
          <span>Multi-Source Observation Summary</span>
        </div>
        <div className="summary-status-badge">
          <span className="summary-status-label font-mono">FUSION READINESS:</span>
          <SatelliteStatusBadge
            status={summary.fusionStatus}
            label={summary.fusionStatus}
            size="sm"
          />
        </div>
      </div>

      <div className="summary-grid font-mono">
        <div className="summary-item">
          <span className="s-k">Sources Selected:</span>
          <span className="s-v text-accent">{summary.sourcesSelected}</span>
        </div>

        <div className="summary-item">
          <span className="s-k">Bands Selected:</span>
          <span className="s-v text-teal">{summary.bandsSelected}</span>
        </div>

        <div className="summary-item">
          <span className="s-k">Reference Timestamp:</span>
          <span className="s-v">{summary.referenceTimestamp}</span>
        </div>

        <div className="summary-item">
          <span className="s-k">Temporal Difference:</span>
          <span className="s-v">{summary.temporalDifference}</span>
        </div>

        <div className="summary-item">
          <span className="s-k">Spatial Coverage:</span>
          <span className="s-v">{summary.spatialCoverage}</span>
        </div>

        <div className="summary-item">
          <span className="s-k">Resolution Compatibility:</span>
          <span className="s-v">{summary.resolutionCompatibility}</span>
        </div>

        <div className="summary-item full-width">
          <span className="s-k">Missing Inputs:</span>
          <span className="s-v text-amber">{summary.missingInputs}</span>
        </div>

        <div className="summary-item full-width">
          <span className="s-k">Environmental Data Status:</span>
          <span className="s-v text-teal">{summary.environmentalDataStatus}</span>
        </div>
      </div>

      <div className="summary-prototype-notice font-mono">
        <AlertCircle size={13} className="text-amber" />
        <span>
          <strong>{summary.prototypeNotice}:</strong> {summary.modelStatus}. All cross-satellite tensors are displayed in raw un-interpolated format.
        </span>
      </div>

      <style>{`
        .multi-summary-card {
          background: #091220;
          margin-top: var(--space-3);
        }
        .summary-status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .summary-status-label {
          font-size: 10px;
          color: var(--text-muted);
        }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          font-size: 11px;
          padding: 8px 0;
        }
        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: rgba(12, 21, 39, 0.6);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(148, 163, 184, 0.08);
        }
        .summary-item.full-width {
          grid-column: 1 / -1;
        }
        .s-k {
          font-size: 9.5px;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .s-v {
          font-weight: 600;
          color: var(--text-primary);
        }
        .summary-prototype-notice {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          font-size: 10.5px;
          color: #fcd34d;
        }
        @media (max-width: 1024px) {
          .summary-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

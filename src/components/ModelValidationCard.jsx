import React from 'react';
import { CheckSquare, AlertCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ModelValidationCard({ onOpenValidationDetails }) {
  return (
    <div className="sci-card model-val-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <CheckSquare size={15} className="text-accent" /> Model Validation (GenesisNet v0.1)
        </div>
        <StatusBadge status="awaiting ml evaluation" label="Awaiting ML Evaluation" />
      </div>

      <div className="val-metrics-grid">
        <div className="val-metric-cell">
          <span className="val-k">Precision</span>
          <span className="val-v font-mono text-muted">N/A</span>
          <span className="val-sub">Awaiting run</span>
        </div>
        <div className="val-metric-cell">
          <span className="val-k">Recall</span>
          <span className="val-v font-mono text-muted">N/A</span>
          <span className="val-sub">Awaiting run</span>
        </div>
        <div className="val-metric-cell">
          <span className="val-k">F1 Score</span>
          <span className="val-v font-mono text-muted">N/A</span>
          <span className="val-sub">Awaiting run</span>
        </div>
        <div className="val-metric-cell">
          <span className="val-k">Test Events</span>
          <span className="val-v font-mono text-muted">N/A</span>
          <span className="val-sub">Historical held-out</span>
        </div>
      </div>

      <div className="val-integrity-notice">
        <ShieldAlert size={14} className="text-secondary" />
        <span className="notice-text">
          Scientific integrity rule: Evaluation metrics are not fabricated. Formal cross-validated verification results will populate when the Python ML training pipeline completes.
        </span>
      </div>

      <div className="val-footer-actions">
        <button
          className="sci-btn sci-btn-sm"
          onClick={onOpenValidationDetails}
          title="Inspect full benchmark evaluation specifications and planned ROC protocols"
        >
          <span>Open Validation Details</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <style>{`
        .model-val-card {
          display: flex;
          flex-direction: column;
          background: #0b1424;
          height: 100%;
        }
        .val-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-2);
          margin-bottom: var(--space-3);
        }
        .val-metric-cell {
          background: rgba(148, 163, 184, 0.04);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: var(--radius-sm);
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .val-k {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .val-v {
          font-size: 18px;
          font-weight: 700;
          margin: 2px 0;
        }
        .val-sub {
          font-size: 9px;
          color: var(--text-muted);
        }
        .val-integrity-notice {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          background: rgba(245, 158, 11, 0.06);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: var(--radius-sm);
          padding: 8px 10px;
          margin-bottom: var(--space-3);
        }
        .notice-text {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .val-footer-actions {
          margin-top: auto;
          display: flex;
          justify-content: flex-end;
        }
        @media (max-width: 600px) {
          .val-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

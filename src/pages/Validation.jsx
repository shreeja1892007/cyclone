import React from 'react';
import { CheckSquare, AlertTriangle, ShieldCheck, BarChart3, Database, FileCheck, Layers } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function Validation() {
  const metricPlaceholders = [
    { label: 'Precision', value: 'N/A', sub: 'Positive Predictive Value', status: 'awaiting' },
    { label: 'Recall (Sensitivity)', value: 'N/A', sub: 'True Positive Rate', status: 'awaiting' },
    { label: 'F1 Score', value: 'N/A', sub: 'Harmonic Mean', status: 'awaiting' },
    { label: 'Brier Skill Score (BSS)', value: 'N/A', sub: 'Probabilistic Accuracy', status: 'awaiting' },
    { label: 'ROC-AUC', value: 'N/A', sub: 'Area Under Receiver Operating Curve', status: 'awaiting' },
    { label: 'PR-AUC', value: 'N/A', sub: 'Area Under Precision-Recall Curve', status: 'awaiting' },
    { label: 'Test Cyclone Events', value: 'N/A', sub: 'Held-out North Indian Ocean Systems', status: 'awaiting' },
    { label: 'Validation Period', value: 'N/A', sub: 'Temporal Benchmark Split', status: 'awaiting' }
  ];

  const validationProtocols = [
    {
      title: '1. Strict Temporal Cross-Validation Split',
      desc: 'To prevent data leakage from temporal auto-correlation in satellite sequences, the validation split reserves entire cyclone seasons (e.g. 2018–2022 for training, 2023–2025 for testing) rather than random frame sampling.'
    },
    {
      title: '2. Spatial Generalization Testing (Basin Cross-Validation)',
      desc: 'Models trained on the Bay of Bengal are evaluated across the Arabian Sea to verify physical invariance under differing monsoonal shear and continental boundary conditions.'
    },
    {
      title: '3. Lead-Time Calibration & Reliability Diagrams',
      desc: 'Evaluating whether a predicted 76% genesis probability corresponds to an empirical 76% genesis rate across 10-bin calibration diagrams (reliability curve and Brier score decomposition).'
    },
    {
      title: '4. Non-Developing Disturbance Benchmark (Hard Negatives)',
      desc: 'Validating false alarm rates by explicitly testing against weak monsoon low-pressure systems and upper-air troughs that dissipated without depression stage formation.'
    }
  ];

  return (
    <div className="validation-page">
      <div className="page-header">
        <div>
          <h1 className="text-h1">Model Validation & Benchmark Protocol</h1>
          <p className="header-subtitle">
            Scientific Evaluation Framework | GenesisNet v0.1 Experimental Verification
          </p>
        </div>
        <div className="page-header-badges">
          <StatusBadge status="awaiting ml evaluation" label="Awaiting ML Evaluation" />
          <span className="sci-badge sci-badge-cyan">Standard: WMO / ECMWF Verification</span>
        </div>
      </div>

      {/* Scientific Integrity Banner */}
      <div className="sci-card integrity-banner">
        <div className="integrity-icon-col">
          <ShieldCheck size={28} className="text-accent" />
        </div>
        <div>
          <div className="integrity-title font-mono">SCIENTIFIC INTEGRITY & EVALUATION PROTOCOL</div>
          <p className="integrity-text">
            Per the CycloVision scientific specification, performance metrics (Precision, Recall, F1, ROC-AUC, Brier score) are displayed as <strong>N/A (Awaiting ML Evaluation)</strong>. They will populate automatically when the offline cross-validated model training benchmark pipeline in Python completes. No statistical metrics are fabricated in this interface.
          </p>
        </div>
      </div>

      {/* Metrics Table Grid */}
      <div className="metrics-grid">
        {metricPlaceholders.map((m, idx) => (
          <div key={idx} className="sci-card metric-status-card">
            <div className="m-label">{m.label}</div>
            <div className="m-val font-mono">{m.value}</div>
            <div className="m-sub">{m.sub}</div>
            <div className="m-badge-wrap">
              <span className="sci-badge sci-badge-amber font-mono">Awaiting Eval</span>
            </div>
          </div>
        ))}
      </div>

      {/* Planned Validation Protocols */}
      <div className="sci-card protocol-card">
        <div className="sci-card-header">
          <div className="sci-card-title">
            <FileCheck size={15} className="text-accent" /> Planned ML Evaluation Protocols
          </div>
          <span className="sci-badge sci-badge-teal font-mono">Independent Benchmark Suite</span>
        </div>

        <div className="protocols-list">
          {validationProtocols.map((p, idx) => (
            <div key={idx} className="protocol-item">
              <div className="protocol-title">{p.title}</div>
              <div className="protocol-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .validation-page {
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
        .integrity-banner {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          background: rgba(0, 229, 255, 0.05);
          border: 1px solid rgba(0, 229, 255, 0.25);
          padding: var(--space-4);
        }
        .integrity-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--accent-cyan);
          letter-spacing: 0.04em;
          margin-bottom: 4px;
        }
        .integrity-text {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .integrity-text strong {
          color: #f59e0b;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-3);
        }
        .metric-status-card {
          background: #091222;
          padding: var(--space-3);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .m-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .m-val {
          font-size: 26px;
          font-weight: 700;
          color: var(--text-muted);
          margin: 6px 0;
        }
        .m-sub {
          font-size: 10px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .m-badge-wrap {
          margin-top: auto;
        }
        .protocol-card {
          background: #091222;
        }
        .protocols-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .protocol-item {
          background: rgba(148, 163, 184, 0.04);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: var(--radius-sm);
          padding: var(--space-3);
        }
        .protocol-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--accent-cyan);
          margin-bottom: 4px;
        }
        .protocol-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        @media (max-width: 1100px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

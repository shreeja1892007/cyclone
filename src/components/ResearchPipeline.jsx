import React from 'react';
import { ArrowRight, Radio, Scan, Target, Activity, Zap } from 'lucide-react';

export default function ResearchPipeline() {
  const steps = [
    { id: 'obs', title: 'Satellite Observation', sub: 'INSAT-3D/3DR Multispectral', icon: Radio },
    { id: 'feat', title: 'Feature Extraction', sub: 'Deep Spatio-Temporal Encoders', icon: Scan },
    { id: 'ident', title: 'Identification', sub: 'Disturbance Detection (94%)', icon: Target },
    { id: 'class', title: 'Classification', sub: 'Curved Band Pattern (88%)', icon: Activity },
    { id: 'pred', title: 'Genesis Prediction', sub: '24h Probability: 76%', icon: Zap, highlight: true }
  ];

  return (
    <div className="sci-card pipeline-card">
      <div className="pipeline-header">
        <span className="pipeline-tag font-mono">SCIENTIFIC PROCESSING WORKFLOW</span>
        <span className="pipeline-sub">End-to-End Deep Learning Inference Pipeline</span>
      </div>

      <div className="pipeline-nodes-row">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <div className={`pipeline-node ${step.highlight ? 'node-highlight' : ''}`}>
                <div className="node-icon-bubble">
                  <Icon size={14} />
                </div>
                <div className="node-text">
                  <div className="node-title">{step.title}</div>
                  <div className="node-sub">{step.sub}</div>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="pipeline-connector">
                  <ArrowRight size={14} className="connector-arrow" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <style>{`
        .pipeline-card {
          padding: var(--space-3) var(--space-4);
          margin-bottom: var(--space-4);
          background: #091222;
          border-color: rgba(56, 189, 248, 0.16);
        }
        .pipeline-header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
          padding-bottom: var(--space-2);
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
        }
        .pipeline-tag {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-cyan);
          letter-spacing: 0.06em;
        }
        .pipeline-sub {
          font-size: 11px;
          color: var(--text-muted);
        }
        .pipeline-nodes-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow-x: auto;
          gap: var(--space-2);
        }
        .pipeline-node {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          background: rgba(148, 163, 184, 0.04);
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          flex: 1;
          min-width: 170px;
        }
        .pipeline-node.node-highlight {
          border-color: rgba(0, 229, 255, 0.35);
          background: rgba(0, 229, 255, 0.05);
        }
        .node-icon-bubble {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          background: rgba(0, 229, 255, 0.1);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .node-highlight .node-icon-bubble {
          background: var(--accent-cyan);
          color: #040810;
        }
        .node-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .node-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .node-sub {
          font-size: 10px;
          color: var(--text-muted);
        }
        .pipeline-connector {
          display: flex;
          align-items: center;
          color: var(--text-dim);
          padding: 0 4px;
          flex-shrink: 0;
        }
        .connector-arrow {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}

import React from 'react';
import {
  Sparkles,
  AlertCircle,
  HelpCircle,
  BrainCircuit,
  Clock,
  Compass
} from 'lucide-react';
import { CITIZEN_DASHBOARD_DATA } from '../../services/mockData';

export default function ExperimentalAISummary() {
  const ai = CITIZEN_DASHBOARD_DATA.aiSummary;

  return (
    <section className="cz-ai-summary-card" aria-labelledby="ai-summary-title">
      <div className="cz-ai-head">
        <div className="ai-head-left">
          <div className="ai-badge-icon" aria-hidden="true">
            <Sparkles size={16} className="text-purple" />
          </div>
          <div>
            <div className="ai-micro-tag">RESEARCH EXPLORATION</div>
            <h2 id="ai-summary-title" className="cz-ai-title">
              CYCLOVISION AI ANALYSIS — EXPERIMENTAL
            </h2>
          </div>
        </div>

        <div className="ai-head-right">
          <span className="sci-badge sci-badge-purple font-mono">
            EXPERIMENTAL AI OUTPUT
          </span>
        </div>
      </div>

      <div className="cz-ai-grid">
        <div className="ai-param-item">
          <span className="ai-param-label">DEVELOPMENT CONDITIONS</span>
          <span className="ai-param-val text-success font-bold">
            {ai.conditions}
          </span>
          <span className="ai-param-hint">Ocean heat & atmospheric humidity align</span>
        </div>

        <div className="ai-param-item">
          <span className="ai-param-label">FORMATION PROBABILITY</span>
          <div className="prob-val-row">
            <span className="ai-prob-number font-mono">{ai.formationProbability}</span>
            <span className="prob-demo-tag font-mono">DEMO DATA</span>
          </div>
          <span className="ai-param-hint">Probability of cyclonic storm genesis</span>
        </div>

        <div className="ai-param-item">
          <span className="ai-param-label">TARGET REGION</span>
          <span className="ai-param-val">{ai.region}</span>
          <span className="ai-param-hint">Grid zone monitored by satellite</span>
        </div>

        <div className="ai-param-item">
          <span className="ai-param-label">FORECAST HORIZON & MODEL</span>
          <span className="ai-param-val font-mono">{ai.horizon} • {ai.model}</span>
          <span className="ai-param-hint">Pre-operational research algorithm</span>
        </div>
      </div>

      {/* Mandatory Non-Official Disclaimer */}
      <div className="cz-ai-warning-box">
        <AlertCircle size={15} className="text-amber flex-shrink-0" />
        <p className="ai-warn-text">
          <strong>IMPORTANT:</strong> This is an experimental AI research estimate developed for academic study. <strong>It is not an official cyclone warning or forecast.</strong> Always follow official announcements from the India Meteorological Department (IMD) and disaster management authorities.
        </p>
      </div>

      <style>{`
        .cz-ai-summary-card {
          background: #091326;
          border: 1px solid rgba(168, 85, 247, 0.25);
          border-left: 4px solid #a855f7;
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .cz-ai-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          padding-bottom: 12px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ai-head-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ai-badge-icon {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: rgba(168, 85, 247, 0.12);
          border: 1px solid rgba(168, 85, 247, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ai-micro-tag {
          font-size: 10px;
          font-weight: 700;
          color: #c084fc;
          letter-spacing: 0.05em;
        }
        .cz-ai-title {
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.02em;
        }
        .cz-ai-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }
        .ai-param-item {
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.14);
          padding: 12px 14px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ai-param-label {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .ai-param-val {
          font-size: 14px;
          color: #ffffff;
        }
        .prob-val-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ai-prob-number {
          font-size: 22px;
          font-weight: 900;
          color: var(--accent-cyan);
        }
        .prob-demo-tag {
          font-size: 9px;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 2px 5px;
          border-radius: var(--radius-sm);
        }
        .ai-param-hint {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .cz-ai-warning-box {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 12px 14px;
          border-radius: var(--radius-sm);
        }
        .ai-warn-text {
          font-size: 12px;
          color: #fde68a;
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </section>
  );
}

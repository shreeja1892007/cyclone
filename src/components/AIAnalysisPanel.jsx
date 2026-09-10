import React from 'react';
import {
  BrainCircuit,
  Eye,
  Activity,
  Zap,
  HelpCircle,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function AIAnalysisPanel({ frameData, onOpenExplainability }) {
  const detection = frameData?.detection || { detected: true, confidence: 94, statusLabel: 'Tropical Disturbance Detected' };
  const classification = frameData?.classification || { pattern: 'Curved Band', confidence: 88 };
  const prediction = frameData?.prediction || { prob12h: 61, prob24h: 76, prob48h: 84, trend: 'Increasing' };

  return (
    <div className="sci-card ai-panel-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <BrainCircuit size={15} className="text-accent" /> AI Analysis Panel
        </div>
        <StatusBadge status="experimental" label="Research ML" />
      </div>

      <div className="ai-panel-sections">
        {/* 1. IDENTIFICATION TASK */}
        <div className="ai-task-block">
          <div className="ai-task-header">
            <span className="task-step-tag">TASK 1</span>
            <span className="task-title">IDENTIFICATION</span>
          </div>
          <div className="ai-task-result">
            <div className="ai-result-label">{detection.statusLabel || 'Tropical Disturbance Detected'}</div>
            <div className="ai-stat-row">
              <span className="ai-stat-k">Detection Confidence:</span>
              <span className="ai-stat-v font-mono">{detection.confidence}%</span>
            </div>
            <div className="sci-prog-bar">
              <div className="sci-prog-fill fill-cyan" style={{ width: `${detection.confidence}%` }}></div>
            </div>
          </div>
        </div>

        {/* 2. CLASSIFICATION TASK */}
        <div className="ai-task-block">
          <div className="ai-task-header">
            <span className="task-step-tag">TASK 2</span>
            <span className="task-title">PATTERN CLASSIFICATION</span>
          </div>
          <div className="ai-task-result">
            <div className="ai-result-label">{classification.pattern || 'Curved Band'}</div>
            <div className="ai-stat-row">
              <span className="ai-stat-k">Primary Confidence:</span>
              <span className="ai-stat-v font-mono">{classification.confidence}%</span>
            </div>
            <div className="sci-prog-bar">
              <div className="sci-prog-fill fill-teal" style={{ width: `${classification.confidence}%` }}></div>
            </div>

            {/* Pattern Candidates Distribution */}
            <div className="candidate-patterns-list font-mono">
              <div className="pattern-row">
                <span>Curved Band</span>
                <span className="text-accent">{classification.confidence}%</span>
              </div>
              <div className="pattern-row">
                <span>Shear Pattern</span>
                <span>8%</span>
              </div>
              <div className="pattern-row">
                <span>Central Dense Overcast (CDO)</span>
                <span>4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PREDICTION TASK */}
        <div className="ai-task-block highlight-prediction-block">
          <div className="ai-task-header">
            <span className="task-step-tag tag-pred">TASK 3</span>
            <span className="task-title">GENESIS PREDICTION</span>
          </div>
          <div className="ai-prediction-meta">
            <span>Target: Depression or Higher</span>
            <span className="font-mono">Central Bay of Bengal</span>
          </div>

          <div className="probability-horizons-grid">
            <div className="horizon-cell">
              <div className="horizon-name">12 h Horizon</div>
              <div className="horizon-val font-mono">{prediction.prob12h || 61}%</div>
              <div className="sci-prog-bar">
                <div className="sci-prog-fill" style={{ width: `${prediction.prob12h || 61}%` }}></div>
              </div>
            </div>

            <div className="horizon-cell primary-horizon">
              <div className="horizon-name">24 h Horizon</div>
              <div className="horizon-val font-mono text-accent">{prediction.prob24h || 76}%</div>
              <div className="sci-prog-bar">
                <div className="sci-prog-fill fill-cyan" style={{ width: `${prediction.prob24h || 76}%` }}></div>
              </div>
            </div>

            <div className="horizon-cell">
              <div className="horizon-name">48 h Horizon</div>
              <div className="horizon-val font-mono">{prediction.prob48h || 84}%</div>
              <div className="sci-prog-bar">
                <div className="sci-prog-fill fill-purple" style={{ width: `${prediction.prob48h || 84}%` }}></div>
              </div>
            </div>
          </div>

          <div className="prediction-summary-footer">
            <div className="trend-indicator">
              <TrendingUp size={13} className="text-accent" />
              <span>Trend: <strong>{prediction.trend}</strong></span>
            </div>
            <div className="model-tag font-mono">GenesisNet v0.1</div>
          </div>
        </div>

        {/* Explain Prediction Hook per Section 29 */}
        <button
          className="sci-btn sci-btn-sm explain-btn"
          onClick={onOpenExplainability}
          title="Inspect Explainable AI feature attribution"
        >
          <Sparkles size={13} />
          <span>Explain Prediction (XAI)</span>
        </button>
      </div>

      <style>{`
        .ai-panel-card {
          display: flex;
          flex-direction: column;
          padding: var(--space-3);
          height: 100%;
        }
        .ai-panel-sections {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          flex: 1;
        }
        .ai-task-block {
          background: rgba(12, 21, 39, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: var(--radius-md);
          padding: var(--space-3);
        }
        .ai-task-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }
        .task-step-tag {
          font-size: 9px;
          font-weight: 700;
          padding: 1px 5px;
          background: rgba(0, 229, 255, 0.15);
          color: var(--accent-cyan);
          border-radius: 3px;
          letter-spacing: 0.04em;
        }
        .task-step-tag.tag-pred {
          background: rgba(2, 132, 199, 0.3);
          color: #38bdf8;
        }
        .task-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
        }
        .ai-result-label {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 4px;
        }
        .ai-stat-row {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          margin-bottom: 3px;
        }
        .ai-stat-k {
          color: var(--text-muted);
        }
        .ai-stat-v {
          color: var(--text-primary);
          font-weight: 600;
        }
        .sci-prog-bar {
          height: 4px;
          background: rgba(148, 163, 184, 0.15);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-top: 3px;
        }
        .sci-prog-fill {
          height: 100%;
          background: #38bdf8;
          border-radius: var(--radius-full);
          transition: width 0.3s ease;
        }
        .sci-prog-fill.fill-cyan {
          background: var(--accent-cyan);
          box-shadow: 0 0 6px rgba(0, 229, 255, 0.5);
        }
        .sci-prog-fill.fill-teal {
          background: var(--accent-teal);
        }
        .sci-prog-fill.fill-purple {
          background: #a855f7;
        }
        .candidate-patterns-list {
          margin-top: 8px;
          padding-top: 6px;
          border-top: 1px dotted rgba(148, 163, 184, 0.1);
          display: flex;
          flex-direction: column;
          gap: 3px;
          font-size: 10px;
          color: var(--text-muted);
        }
        .pattern-row {
          display: flex;
          justify-content: space-between;
        }
        .highlight-prediction-block {
          border-color: rgba(0, 229, 255, 0.25);
          background: linear-gradient(180deg, rgba(16, 28, 52, 0.9), rgba(11, 20, 36, 0.95));
        }
        .ai-prediction-meta {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .probability-horizons-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .horizon-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .horizon-cell.primary-horizon {
          background: rgba(0, 229, 255, 0.05);
          padding: 4px 6px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(0, 229, 255, 0.15);
        }
        .horizon-name {
          font-size: 10px;
          color: var(--text-secondary);
        }
        .horizon-val {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .prediction-summary-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
          padding-top: 6px;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          font-size: 11px;
        }
        .trend-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-secondary);
        }
        .model-tag {
          font-size: 10px;
          color: var(--accent-cyan);
        }
        .explain-btn {
          margin-top: auto;
          background: rgba(0, 229, 255, 0.08);
          border-color: rgba(0, 229, 255, 0.25);
          color: var(--accent-cyan);
        }
        .explain-btn:hover {
          background: rgba(0, 229, 255, 0.15);
        }
      `}</style>
    </div>
  );
}

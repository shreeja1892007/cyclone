import React from 'react';
import AIAnalysisPanel from '../components/AIAnalysisPanel';
import ResearchPipeline from '../components/ResearchPipeline';
import MultiSourceFusion from '../components/MultiSourceFusion';
import { BrainCircuit, Cpu, Zap, Network, ShieldCheck, Sparkles } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function AIAnalysisPage({ frameData, onOpenExplainability }) {
  return (
    <div className="ai-analysis-page">
      <div className="page-header">
        <div>
          <h1 className="text-h1">AI Analysis & Model Architecture</h1>
          <p className="header-subtitle">
            GenesisNet v0.1 Deep Learning Evaluation | Spatio-Temporal Genesis Prediction
          </p>
        </div>
        <div className="page-header-badges">
          <StatusBadge status="experimental" label="Experimental Model Output" />
          <span className="sci-badge sci-badge-cyan">Architecture: ConvLSTM + Attention</span>
        </div>
      </div>

      {/* Tri-Task AI Overview */}
      <div className="ai-workspace-grid">
        <div className="ai-panel-container">
          <AIAnalysisPanel
            frameData={frameData}
            onOpenExplainability={onOpenExplainability}
          />
        </div>

        {/* Model Architecture Deep-Dive */}
        <div className="sci-card arch-card">
          <div className="sci-card-header">
            <div className="sci-card-title">
              <Network size={15} className="text-accent" /> GenesisNet v0.1 Neural Architecture
            </div>
            <span className="sci-badge sci-badge-teal font-mono">Parameters: 4.8M</span>
          </div>

          <div className="arch-specs-list">
            <div className="arch-spec-item">
              <div className="arch-spec-title">1. Spatio-Temporal Satellite Encoder</div>
              <p className="arch-spec-text">
                Processes consecutive 6-hourly INSAT-3D/3DR TIR-1 and WV imagery tensors (256×256×2) using 4 ConvLSTM recurrent layers to encode convective curvature rotation vectors.
              </p>
            </div>

            <div className="arch-spec-item">
              <div className="arch-spec-title">2. Environmental Reanalysis Fusion Branch</div>
              <p className="arch-spec-text">
                Multi-layer perceptron (MLP) branch ingesting ERA5 scalar variables (SST, MSLP, 500 hPa RH, 850 hPa vorticity, 200–850 hPa shear) transformed through cross-attention embedding.
              </p>
            </div>

            <div className="arch-spec-item">
              <div className="arch-spec-title">3. Multi-Head Cross-Attention Mechanism</div>
              <p className="arch-spec-text">
                Computes dynamic query-key correlations between atmospheric shear vectors and cloud band organization, weighing whether dry-air intrusion overrides warm sea surface temperatures.
              </p>
            </div>

            <div className="arch-spec-item">
              <div className="arch-spec-title">4. Multi-Horizon Probability Heads</div>
              <p className="arch-spec-text">
                Calibrated sigmoid output neurons predicting probability of depression stage attainment at +12h, +24h, and +48h horizons with temperature scaling.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scientific Workflow Pipeline */}
      <ResearchPipeline />

      {/* Multi-Source Fusion Flow */}
      <MultiSourceFusion frameData={frameData} />

      <style>{`
        .ai-analysis-page {
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
        .ai-workspace-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: var(--space-4);
        }
        .arch-card {
          background: #091222;
          display: flex;
          flex-direction: column;
        }
        .arch-specs-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .arch-spec-item {
          background: rgba(148, 163, 184, 0.04);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: var(--radius-sm);
          padding: var(--space-3);
        }
        .arch-spec-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--accent-cyan);
          margin-bottom: 4px;
        }
        .arch-spec-text {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        @media (max-width: 1024px) {
          .ai-workspace-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

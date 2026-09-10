import React from 'react';
import {
  Layers,
  Radio,
  Waves,
  Wind,
  Cpu,
  ArrowDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Globe,
  Sliders,
  Sparkles,
  GitMerge,
  Filter
} from 'lucide-react';
import SatelliteStatusBadge from './SatelliteStatusBadge';

export default function MultiSourceFusionPanel({
  satA = 'INSAT-3DR (Operational)',
  satB = 'INSAT-3D (Standby Demo)',
  activeBandA = 'TIR-1 (10.8µm)',
  activeBandB = 'WV (6.8µm)'
}) {
  const pipelineSteps = [
    {
      id: 'step1',
      number: 'STAGE 1',
      title: 'Preprocessing & Radiometric Calibration',
      status: 'active',
      desc: 'Raw detector count conversion to spectral radiance (mW/m²/sr/cm⁻¹) and brightness temperature (K).',
      engine: 'ISRO Imager Calibration LUT v2.4'
    },
    {
      id: 'step2',
      number: 'STAGE 2',
      title: 'Automated Quality Control',
      status: 'active',
      desc: 'Scan-line dropout imputation, solar contamination filtering, and cloud-mask thresholding.',
      engine: 'Statistical Spike & Anomaly Pruning'
    },
    {
      id: 'step3',
      number: 'STAGE 3',
      title: 'Temporal Alignment Synchronization',
      status: 'active',
      desc: 'Interpolative time-window synchronization (Δt ≤ 15 mins) across asynchronous scan cycles.',
      engine: 'Temporal Nearest-Neighbor Gridding'
    },
    {
      id: 'step4',
      number: 'STAGE 4',
      title: 'Spatial Alignment & Re-projection',
      status: 'active',
      desc: 'Geostationary coordinate warping onto standard Equirectangular / WGS84 0.04° grid.',
      engine: 'Bicubic Spline Projection Warp'
    },
    {
      id: 'step5',
      number: 'STAGE 5',
      title: 'Resolution Harmonization',
      status: 'prototype',
      desc: 'Cross-sensor spatial scale normalization (e.g. 1 km VIS, 4 km TIR, 8 km WV).',
      engine: 'RESAMPLING NOT IMPLEMENTED — Raw native grids retained for research integrity'
    },
    {
      id: 'step6',
      number: 'STAGE 6',
      title: 'Spatial-Spectral Feature Extraction',
      status: 'active',
      desc: 'Multi-scale spatial convolutions capturing cloud-shield spiral curvature and convective vigor.',
      engine: 'ResNet-50 Feature Backbone (Weights Frozen)'
    },
    {
      id: 'step7',
      number: 'STAGE 7',
      title: 'Cross-Modal Feature Fusion',
      status: 'prototype',
      desc: 'Attention-weighted concatenation of multi-sensor satellite tensors with ERA5 environmental grids.',
      engine: 'Heterogeneous Multi-Head Cross-Attention Layer'
    }
  ];

  return (
    <div className="sci-card fusion-pipeline-card">
      {/* Prominent Prototype and Disclaimers */}
      <div className="pipeline-disclaimer-header">
        <div className="disclaimer-title-row">
          <div className="prototype-pill font-mono">
            <AlertTriangle size={14} />
            <span>MULTI-SOURCE FUSION PIPELINE — PROTOTYPE</span>
          </div>
          <div className="not-connected-pill font-mono">
            <XCircle size={14} />
            <span>FUSION MODEL NOT CONNECTED</span>
          </div>
        </div>
        <p className="disclaimer-text">
          This scientific workstation visualizes the proposed end-to-end multi-sensor cyclogenesis prediction pipeline.
          The live deep learning multi-satellite fusion engine is not currently connected to live inference servers.
          Outputs displayed below represent demonstration architectural traces; no live inference is running.
        </p>
      </div>

      {/* INPUT SOURCES ROW */}
      <div className="fusion-section-title font-mono">
        <Radio size={14} className="text-accent" />
        <span>INPUT DATA FEEDS</span>
      </div>

      <div className="input-feeds-grid">
        {/* Source A */}
        <div className="feed-box connected">
          <div className="feed-head font-mono">
            <span className="feed-role">PRIMARY SATELLITE</span>
            <SatelliteStatusBadge status="available" size="sm" />
          </div>
          <div className="feed-name">{satA}</div>
          <div className="feed-meta font-mono">
            <span>Band: {activeBandA}</span>
            <span>Coverage: NIO (74°E)</span>
          </div>
        </div>

        {/* Source B */}
        <div className="feed-box connected">
          <div className="feed-head font-mono">
            <span className="feed-role">SECONDARY SATELLITE</span>
            <SatelliteStatusBadge status="demo_data" size="sm" />
          </div>
          <div className="feed-name">{satB}</div>
          <div className="feed-meta font-mono">
            <span>Band: {activeBandB}</span>
            <span>Coverage: NIO (82°E)</span>
          </div>
        </div>

        {/* Source C */}
        <div className="feed-box offline">
          <div className="feed-head font-mono">
            <span className="feed-role">TERTIARY SATELLITE</span>
            <SatelliteStatusBadge status="not_connected" size="sm" />
          </div>
          <div className="feed-name">Himawari-9 / Meteosat</div>
          <div className="feed-meta font-mono">
            <span>Status: NOT CONNECTED</span>
            <span>Coverage: Basin Fringe</span>
          </div>
        </div>

        {/* Reanalysis / Environment */}
        <div className="feed-box env">
          <div className="feed-head font-mono">
            <span className="feed-role">ENVIRONMENTAL REANALYSIS</span>
            <SatelliteStatusBadge status="available" size="sm" />
          </div>
          <div className="feed-name">ERA5 / GFS Met Grids</div>
          <div className="feed-meta font-mono">
            <span>SST, OHC, MSLP, Shear</span>
            <span>ECMWF / IMD</span>
          </div>
        </div>
      </div>

      {/* FLOW ARROW */}
      <div className="pipeline-flow-connector">
        <ArrowDown size={22} className="text-accent" />
      </div>

      {/* STEP-BY-STEP WORKFLOW VERTICAL PIPELINE */}
      <div className="fusion-section-title font-mono">
        <GitMerge size={14} className="text-accent" />
        <span>SCIENTIFIC PROCESSING & FUSION WORKFLOW</span>
      </div>

      <div className="pipeline-steps-container">
        {pipelineSteps.map((step, idx) => (
          <div key={step.id} className="pipeline-step-node">
            <div className="step-timeline-indicator">
              <div className={`step-dot ${step.status === 'prototype' ? 'prototype' : 'active'}`} />
              {idx < pipelineSteps.length - 1 && <div className="step-line" />}
            </div>
            <div className="step-content-card">
              <div className="step-card-head">
                <span className="step-stage font-mono">{step.number}</span>
                <span className="step-title">{step.title}</span>
                {step.status === 'prototype' ? (
                  <span className="sci-badge sci-badge-amber font-mono text-xs">PROTOTYPE STEP</span>
                ) : (
                  <span className="sci-badge sci-badge-teal font-mono text-xs">ALIGNED</span>
                )}
              </div>
              <p className="step-desc text-secondary">{step.desc}</p>
              <div className="step-engine font-mono">
                <span className="engine-label">Engine / Spec:</span>
                <span className={step.status === 'prototype' ? 'text-amber' : 'text-accent'}>
                  {step.engine}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FLOW ARROW */}
      <div className="pipeline-flow-connector">
        <ArrowDown size={22} className="text-accent" />
      </div>

      {/* TRI-TASK OUTPUT STAGE */}
      <div className="fusion-section-title font-mono">
        <Cpu size={14} className="text-accent" />
        <span>FUSED AI PREDICTION HEADS (PROTOTYPE DEMONSTRATION)</span>
      </div>

      <div className="fusion-outputs-grid font-mono">
        <div className="fused-out-card">
          <div className="out-card-head">
            <span>HEAD 1</span>
            <SatelliteStatusBadge status="available" label="Active" size="sm" />
          </div>
          <div className="out-title">System Identification</div>
          <div className="out-val text-accent">Disturbance Detected (94%)</div>
          <div className="out-note">Centroid: 14.8°N, 87.3°E</div>
        </div>

        <div className="fused-out-card">
          <div className="out-card-head">
            <span>HEAD 2</span>
            <SatelliteStatusBadge status="available" label="Active" size="sm" />
          </div>
          <div className="out-title">Pattern Classification</div>
          <div className="out-val text-teal">Curved Band (88%)</div>
          <div className="out-note">T-Number Est: T1.5 / 0.75 Wrap</div>
        </div>

        <div className="fused-out-card highlighted">
          <div className="out-card-head">
            <span>HEAD 3</span>
            <span className="sci-badge sci-badge-purple font-mono">EXPERIMENT</span>
          </div>
          <div className="out-title">24h Genesis Prediction</div>
          <div className="out-val text-accent">Probability: 76% (High)</div>
          <div className="out-note">Thermodynamic-Dynamic Fused Horizon</div>
        </div>
      </div>

      <style>{`
        .fusion-pipeline-card {
          background: #091220;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .pipeline-disclaimer-header {
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(245, 158, 11, 0.35);
          border-radius: var(--radius-md);
          padding: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .disclaimer-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .prototype-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.5);
          padding: 3px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .not-connected-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.5);
          padding: 3px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .disclaimer-text {
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .fusion-section-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.05em;
          margin-top: 4px;
        }
        .input-feeds-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-3);
        }
        .feed-box {
          background: rgba(12, 21, 39, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: var(--radius-md);
          padding: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .feed-box.connected {
          border-top: 2px solid #00e5ff;
        }
        .feed-box.offline {
          border-top: 2px solid #ef4444;
          opacity: 0.7;
        }
        .feed-box.env {
          border-top: 2px solid #14b8a6;
        }
        .feed-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 9px;
          color: var(--text-muted);
        }
        .feed-name {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .feed-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 10px;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .pipeline-flow-connector {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2px 0;
          color: var(--accent-cyan);
        }
        .pipeline-steps-container {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .pipeline-step-node {
          display: flex;
          gap: 12px;
        }
        .step-timeline-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 20px;
        }
        .step-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #00e5ff;
          background: #030814;
          margin-top: 14px;
        }
        .step-dot.prototype {
          border-color: #f59e0b;
        }
        .step-line {
          width: 2px;
          flex: 1;
          background: rgba(148, 163, 184, 0.15);
          margin: 4px 0;
        }
        .step-content-card {
          flex: 1;
          background: rgba(12, 21, 39, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          margin-bottom: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .step-card-head {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .step-stage {
          font-size: 10px;
          color: var(--text-muted);
          background: rgba(148, 163, 184, 0.08);
          padding: 2px 5px;
          border-radius: 3px;
        }
        .step-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .step-desc {
          font-size: 11px;
          line-height: 1.4;
        }
        .step-engine {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          margin-top: 4px;
        }
        .engine-label {
          color: var(--text-dim);
        }
        .fusion-outputs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-3);
        }
        .fused-out-card {
          background: rgba(12, 21, 39, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: var(--radius-md);
          padding: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .fused-out-card.highlighted {
          border-color: rgba(168, 85, 247, 0.4);
          background: rgba(24, 18, 43, 0.7);
        }
        .out-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          color: var(--text-muted);
        }
        .out-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .out-val {
          font-size: 14px;
          font-weight: 700;
        }
        .out-note {
          font-size: 10px;
          color: var(--text-secondary);
        }
        @media (max-width: 1024px) {
          .input-feeds-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .fusion-outputs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

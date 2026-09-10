import React from 'react';
import {
  Layers,
  Radio,
  Waves,
  Wind,
  History,
  Cpu,
  ArrowDown,
  ArrowRight
} from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function MultiSourceFusion({ frameData }) {
  const sources = [
    {
      category: 'SATELLITE IMAGERY',
      icon: Radio,
      accent: '#00e5ff',
      items: [
        { label: 'Infrared (10.8 µm)', status: 'available' },
        { label: 'Water Vapour (6.7 µm)', status: 'available' },
        { label: 'Visible (0.65 µm)', status: 'available' }
      ]
    },
    {
      category: 'OCEANIC VARIABLES',
      icon: Waves,
      accent: '#0284c7',
      items: [
        { label: 'Sea Surface Temp (SST)', status: 'available' },
        { label: 'Ocean Heat Content (OHC)', status: 'delayed' }
      ]
    },
    {
      category: 'ATMOSPHERE / REANALYSIS',
      icon: Wind,
      accent: '#14b8a6',
      items: [
        { label: 'Mean Sea-Level Pressure', status: 'available' },
        { label: 'Relative Humidity 500 hPa', status: 'available' },
        { label: '850 hPa Wind & Vorticity', status: 'available' },
        { label: '200 hPa Upper Winds', status: 'missing' },
        { label: 'Vertical Wind Shear', status: 'available' }
      ]
    },
    {
      category: 'HISTORICAL GROUND TRUTH',
      icon: History,
      accent: '#a855f7',
      items: [
        { label: 'IBTrACS Best-Track Centroids', status: 'available' },
        { label: 'Historical Intensity Records', status: 'available' },
        { label: 'Genesis Verification Labels', status: 'available' }
      ]
    }
  ];

  return (
    <div className="sci-card fusion-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <Layers size={15} className="text-accent" /> Inputs Used for This Analysis (Multi-Source Fusion)
        </div>
        <span className="sci-badge sci-badge-cyan font-mono">Heterogeneous Cross-Attention</span>
      </div>

      <div className="fusion-layout">
        {/* Four Input Feeds */}
        <div className="fusion-sources-grid">
          {sources.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div key={idx} className="fusion-source-column">
                <div className="source-col-head" style={{ borderTopColor: group.accent }}>
                  <Icon size={14} style={{ color: group.accent }} />
                  <span className="source-col-title">{group.category}</span>
                </div>
                <div className="source-items-list">
                  {group.items.map((item, i) => (
                    <div key={i} className="source-item-row">
                      <span className="source-item-name">{item.label}</span>
                      <StatusBadge status={item.status} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Fusion Core Block */}
        <div className="fusion-converge-flow">
          <div className="flow-arrow-down">
            <ArrowDown size={18} />
          </div>

          <div className="fusion-engine-box">
            <div className="engine-left">
              <Cpu size={22} className="text-accent" />
              <div>
                <div className="engine-title font-mono">GENESISNET MULTI-MODAL FUSION</div>
                <div className="engine-desc">
                  Spatio-Temporal ConvLSTM + Cross-Modal Feature Concatenation & Attention Weighting
                </div>
              </div>
            </div>
            <div className="engine-tags font-mono">
              <span className="engine-tag">4 Input Channels</span>
              <span className="engine-tag">24h History Window</span>
            </div>
          </div>

          <div className="flow-arrow-down">
            <ArrowDown size={18} />
          </div>

          {/* Tri-Task Output Stage */}
          <div className="fusion-outputs-row">
            <div className="fusion-out-node">
              <span className="out-tag font-mono">OUTPUT 1</span>
              <div className="out-label">System Identification</div>
              <div className="out-val text-accent">Disturbance Detected (94%)</div>
            </div>
            <div className="fusion-out-node">
              <span className="out-tag font-mono">OUTPUT 2</span>
              <div className="out-label">Pattern Classification</div>
              <div className="out-val text-teal">Curved Band (88%)</div>
            </div>
            <div className="fusion-out-node highlight-out">
              <span className="out-tag font-mono">OUTPUT 3</span>
              <div className="out-label">Genesis Prediction</div>
              <div className="out-val text-accent">24h Probability: 76%</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .fusion-card {
          margin-bottom: var(--space-4);
          background: #091220;
        }
        .fusion-layout {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .fusion-sources-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-3);
        }
        .fusion-source-column {
          background: rgba(12, 21, 39, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .source-col-head {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 10px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
          border-top: 2px solid #00e5ff;
        }
        .source-col-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
        }
        .source-items-list {
          padding: var(--space-2);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .source-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 3px 6px;
          font-size: 11px;
          border-radius: var(--radius-sm);
          background: rgba(148, 163, 184, 0.03);
        }
        .source-item-name {
          color: var(--text-primary);
        }
        .fusion-converge-flow {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .flow-arrow-down {
          color: var(--accent-cyan);
          opacity: 0.7;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 18px;
        }
        .fusion-engine-box {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-3) var(--space-4);
          background: linear-gradient(90deg, rgba(2, 132, 199, 0.18), rgba(0, 229, 255, 0.1));
          border: 1px solid rgba(0, 229, 255, 0.35);
          border-radius: var(--radius-md);
        }
        .engine-left {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .engine-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--accent-cyan);
          letter-spacing: 0.04em;
        }
        .engine-desc {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .engine-tags {
          display: flex;
          gap: 6px;
        }
        .engine-tag {
          font-size: 10px;
          padding: 3px 8px;
          background: rgba(0, 229, 255, 0.1);
          border: 1px solid rgba(0, 229, 255, 0.25);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
        }
        .fusion-outputs-row {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-3);
        }
        .fusion-out-node {
          background: rgba(12, 21, 39, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          text-align: center;
        }
        .fusion-out-node.highlight-out {
          border-color: rgba(0, 229, 255, 0.35);
          background: rgba(0, 229, 255, 0.05);
        }
        .out-tag {
          font-size: 9px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .out-label {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 1px;
        }
        .out-val {
          font-size: 13px;
          font-weight: 700;
          margin-top: 2px;
        }
        .text-teal {
          color: var(--accent-teal);
        }
        @media (max-width: 1024px) {
          .fusion-sources-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .fusion-outputs-row {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .fusion-sources-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

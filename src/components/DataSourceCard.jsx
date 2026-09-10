import React from 'react';
import { Database, ShieldCheck, MapPin, Clock, Layers, Sparkles } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function DataSourceCard({ dataProvenance }) {
  return (
    <div className="sci-card data-provenance-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <Database size={15} className="text-accent" /> Data Sources & Scientific Lineage (Provenance)
        </div>
        <span className="sci-badge sci-badge-teal font-mono">Metadata Standard: ISO 19115</span>
      </div>

      <div className="provenance-grid">
        {dataProvenance.map((item, idx) => (
          <div key={idx} className="provenance-item-card">
            <div className="p-item-head">
              <div>
                <span className="p-category-tag font-mono">{item.category}</span>
                <div className="p-source-title">{item.source}</div>
              </div>
              <StatusBadge status="available" label="Active Pipeline" size="sm" />
            </div>

            <div className="p-meta-list">
              <div className="p-meta-line">
                <span className="p-k">Provider:</span>
                <span className="p-v">{item.provider}</span>
              </div>
              <div className="p-meta-line">
                <span className="p-k">Dataset ID:</span>
                <span className="p-v font-mono">{item.datasetId}</span>
              </div>
              <div className="p-meta-line">
                <span className="p-k">Variables:</span>
                <span className="p-v">{item.variables.join(', ')}</span>
              </div>
              <div className="p-meta-line">
                <span className="p-k">Atmospheric Level:</span>
                <span className="p-v font-mono">{item.atmosphericLevel}</span>
              </div>
              <div className="p-meta-line">
                <span className="p-k">Spatial Resolution:</span>
                <span className="p-v font-mono">{item.spatialResolution}</span>
              </div>
              <div className="p-meta-line">
                <span className="p-k">Temporal Cadence:</span>
                <span className="p-v font-mono">{item.temporalResolution}</span>
              </div>
              <div className="p-meta-line">
                <span className="p-k">Coverage:</span>
                <span className="p-v">{item.coverage}</span>
              </div>
              <div className="p-meta-line">
                <span className="p-k">Processing:</span>
                <span className="p-v">{item.processing}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .data-provenance-card {
          margin-bottom: var(--space-4);
          background: #091222;
        }
        .provenance-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-3);
        }
        .provenance-item-card {
          background: rgba(12, 21, 39, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: var(--radius-md);
          padding: var(--space-3);
          display: flex;
          flex-direction: column;
        }
        .p-item-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: var(--space-2);
          padding-bottom: var(--space-2);
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
        }
        .p-category-tag {
          font-size: 9px;
          font-weight: 700;
          color: var(--accent-cyan);
          letter-spacing: 0.06em;
        }
        .p-source-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 2px;
        }
        .p-meta-list {
          display: flex;
          flex-direction: column;
          gap: 3px;
          font-size: 11px;
        }
        .p-meta-line {
          display: grid;
          grid-template-columns: 130px 1fr;
          gap: 8px;
          border-bottom: 1px dotted rgba(148, 163, 184, 0.06);
          padding-bottom: 2px;
        }
        .p-k {
          color: var(--text-muted);
        }
        .p-v {
          color: var(--text-secondary);
        }
        @media (max-width: 900px) {
          .provenance-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

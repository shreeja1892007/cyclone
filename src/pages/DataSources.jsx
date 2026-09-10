import React from 'react';
import DataSourceCard from '../components/DataSourceCard';
import { Database, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function DataSources({ dataProvenance }) {
  return (
    <div className="data-sources-page">
      <div className="page-header">
        <div>
          <h1 className="text-h1">Data Sources & Scientific Provenance</h1>
          <p className="header-subtitle">
            Lineage, Atmospheric Levels, Spatial/Temporal Resolutions & Provider Registry
          </p>
        </div>
        <div className="page-header-badges">
          <StatusBadge status="available" label="ISO 19115 Lineage" />
          <span className="sci-badge sci-badge-cyan">Open Science Standard</span>
        </div>
      </div>

      <DataSourceCard dataProvenance={dataProvenance} />

      {/* Auxiliary Note on Radar and Ground Stations */}
      <div className="sci-card auxiliary-note-card">
        <div className="sci-card-header">
          <div className="sci-card-title">
            <Database size={14} className="text-secondary" /> Auxiliary & Coastal Sensor Clarifications
          </div>
          <span className="sci-badge sci-badge-neutral">Sensor Architecture</span>
        </div>
        <div className="aux-text">
          <p>
            <strong>Coastal Doppler Weather Radar (DWR):</strong> In accordance with scientific integrity guidelines, coastal radar observations (such as IMD Machilipatnam, Chennai, and Paradip radars) are classified as <em>auxiliary/not used</em> during the open-ocean disturbance phase (&gt;350 km offshore) because radar beam curvature limits low-level reflectivity detection. The AI model operates primarily on geostationary multispectral satellite imagery and reanalysis grids.
          </p>
        </div>
      </div>

      <style>{`
        .data-sources-page {
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
        .auxiliary-note-card {
          background: #091222;
        }
        .aux-text {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .aux-text strong {
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}

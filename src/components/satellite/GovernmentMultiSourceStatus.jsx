import React from 'react';
import { Layers, CheckCircle2, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';
import SatelliteStatusBadge from './SatelliteStatusBadge';

export default function GovernmentMultiSourceStatus({
  satelliteCount = 2,
  envStatus = 'Available',
  temporalStatus = 'Ready',
  spatialStatus = 'Ready',
  fusionModel = 'Prototype / Not Connected',
  aiOutput = 'Experimental (Demo Centroid: 14.8°N, 87.3°E)'
}) {
  return (
    <div className="gov-card gov-multi-status-card">
      <div className="gov-card-header">
        <div className="gov-header-title">
          <Layers size={14} className="text-accent" />
          <span>MULTI-SOURCE ANALYSIS STATUS</span>
        </div>
        <span className="sci-badge sci-badge-cyan font-mono text-xs">OPERATIONAL SYNTHESIS</span>
      </div>

      <div className="gov-status-grid font-mono">
        <div className="gov-stat-item">
          <span className="gov-k">Satellite Inputs:</span>
          <span className="gov-v text-accent">{satelliteCount} Active (INSAT-3DR + INSAT-3D)</span>
        </div>

        <div className="gov-stat-item">
          <span className="gov-k">Environmental Inputs:</span>
          <span className="gov-v text-teal">{envStatus}</span>
        </div>

        <div className="gov-stat-item">
          <span className="gov-k">Temporal Alignment:</span>
          <span className="gov-v text-teal">{temporalStatus}</span>
        </div>

        <div className="gov-stat-item">
          <span className="gov-k">Spatial Alignment:</span>
          <span className="gov-v text-teal">{spatialStatus}</span>
        </div>

        <div className="gov-stat-item">
          <span className="gov-k">Fusion Model:</span>
          <span className="gov-v text-amber">{fusionModel}</span>
        </div>

        <div className="gov-stat-item">
          <span className="gov-k">AI Output:</span>
          <span className="gov-v text-accent">{aiOutput}</span>
        </div>
      </div>

      <div className="gov-summary-note font-mono">
        <ShieldCheck size={13} className="text-teal" />
        <span>Official IMD advisory remains primary executive directive. Multi-source AI is supplementary guidance.</span>
      </div>

      <style>{`
        .gov-multi-status-card {
          background: #0d1a30;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .gov-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
        }
        .gov-header-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.04em;
        }
        .gov-status-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          font-size: 11px;
        }
        .gov-stat-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: rgba(15, 23, 42, 0.6);
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(148, 163, 184, 0.06);
        }
        .gov-k {
          font-size: 9.5px;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .gov-v {
          font-weight: 600;
          color: var(--text-primary);
        }
        .gov-summary-note {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        @media (max-width: 1024px) {
          .gov-status-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

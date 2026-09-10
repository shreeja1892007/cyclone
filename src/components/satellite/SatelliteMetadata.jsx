import React from 'react';
import { Layers, Database, ShieldCheck, Clock, MapPin, Radio } from 'lucide-react';
import SatelliteStatusBadge from './SatelliteStatusBadge';

export default function SatelliteMetadata({
  metadata,
  activeBand,
  showProvenanceTable = false
}) {
  if (!metadata) return null;

  return (
    <div className="sci-card sat-metadata-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <Database size={15} className="text-accent" />
          <span>Observation Telemetry & Platform Provenance</span>
        </div>
        <SatelliteStatusBadge
          status={metadata.dataStatus}
          label={metadata.dataStatus}
          size="sm"
        />
      </div>

      <div className="metadata-spec-grid font-mono">
        <div className="meta-spec-item">
          <span className="spec-label">Satellite Platform:</span>
          <span className="spec-value text-accent">{metadata.satelliteName}</span>
        </div>
        <div className="meta-spec-item">
          <span className="spec-label">Provider Agency:</span>
          <span className="spec-value">{metadata.provider}</span>
        </div>
        <div className="meta-spec-item">
          <span className="spec-label">Payload Instrument:</span>
          <span className="spec-value">{metadata.instrument}</span>
        </div>
        <div className="meta-spec-item">
          <span className="spec-label">Observation Timestamp:</span>
          <span className="spec-value text-teal">{metadata.timestamp}</span>
        </div>
        <div className="meta-spec-item">
          <span className="spec-label">Orbital Position:</span>
          <span className="spec-value">{metadata.orbitalSlot || 'N/A'}</span>
        </div>
        <div className="meta-spec-item">
          <span className="spec-label">Coverage Region:</span>
          <span className="spec-value">{metadata.coverageRegion}</span>
        </div>
        <div className="meta-spec-item">
          <span className="spec-label">Active Channel:</span>
          <span className="spec-value text-accent">{activeBand?.name || 'Infrared (TIR-1)'}</span>
        </div>
        <div className="meta-spec-item">
          <span className="spec-label">Central Wavelength:</span>
          <span className="spec-value text-teal">{activeBand?.wavelength || '10.8 µm'}</span>
        </div>
        <div className="meta-spec-item">
          <span className="spec-label">Spatial Resolution:</span>
          <span className="spec-value">{activeBand?.resolution || '4 km'}</span>
        </div>
        <div className="meta-spec-item">
          <span className="spec-label">Processing Level:</span>
          <span className="spec-value">{metadata.processingLevel}</span>
        </div>
        <div className="meta-spec-item">
          <span className="spec-label">Calibrated Unit:</span>
          <span className="spec-value">{activeBand?.calibratedUnit || 'Kelvin (Brightness Temp)'}</span>
        </div>
        <div className="meta-spec-item">
          <span className="spec-label">Data Latency:</span>
          <span className="spec-value">{metadata.dataLatency || 'N/A'}</span>
        </div>
      </div>

      {metadata.isDemo && (
        <div className="demo-notice-banner font-mono">
          <span className="demo-tag">DEMO DATA</span>
          <span>
            Standby platform simulation for multi-satellite cross-calibration research. Not active primary operational telemetry.
          </span>
        </div>
      )}

      {!metadata.isConnected && (
        <div className="offline-notice-banner font-mono">
          <span className="offline-tag">NOT CONNECTED</span>
          <span>{metadata.reasonOffline || 'Source telemetry stream not currently connected.'}</span>
        </div>
      )}

      {showProvenanceTable && (
        <div className="provenance-subtable-wrapper">
          <div className="subtable-title font-mono">
            <span>FULL PLATFORM PROVENANCE AUDIT TRAIL</span>
          </div>
          <div className="provenance-table font-mono">
            <div className="prov-header-row">
              <span>Source</span>
              <span>Provider</span>
              <span>Instrument</span>
              <span>Band</span>
              <span>Timestamp</span>
              <span>Resolution</span>
              <span>Level</span>
              <span>Status</span>
            </div>
            <div className="prov-data-row">
              <span className="text-accent">{metadata.satelliteName}</span>
              <span>{metadata.provider}</span>
              <span>{metadata.instrument}</span>
              <span className="text-teal">{activeBand?.name || 'TIR-1'} ({activeBand?.wavelength || '10.8µm'})</span>
              <span>{metadata.timestamp}</span>
              <span>{activeBand?.resolution || '4 km'}</span>
              <span>{metadata.processingLevel}</span>
              <span className={metadata.isConnected ? 'text-teal' : 'text-danger'}>
                {metadata.dataStatus}
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sat-metadata-card {
          background: #091220;
        }
        .metadata-spec-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px 14px;
          font-size: 11px;
          padding: 8px 0;
        }
        .meta-spec-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: rgba(12, 21, 39, 0.6);
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(148, 163, 184, 0.08);
        }
        .spec-label {
          font-size: 9.5px;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .spec-value {
          font-weight: 600;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .demo-notice-banner {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          font-size: 10.5px;
          color: #38bdf8;
        }
        .demo-tag {
          background: #38bdf8;
          color: #030814;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 3px;
          font-size: 9px;
        }
        .offline-notice-banner {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          font-size: 10.5px;
          color: #f87171;
        }
        .offline-tag {
          background: #ef4444;
          color: #ffffff;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 3px;
          font-size: 9px;
        }
        .provenance-subtable-wrapper {
          margin-top: var(--space-3);
          padding-top: var(--space-2);
          border-top: 1px solid rgba(148, 163, 184, 0.1);
        }
        .subtable-title {
          font-size: 10px;
          color: var(--text-muted);
          margin-bottom: 6px;
          letter-spacing: 0.05em;
        }
        .provenance-table {
          font-size: 10px;
          display: flex;
          flex-direction: column;
          overflow-x: auto;
        }
        .prov-header-row {
          display: grid;
          grid-template-columns: 110px 100px 140px 150px 130px 80px 110px 1fr;
          gap: 6px;
          padding: 6px 8px;
          background: rgba(148, 163, 184, 0.06);
          color: var(--text-dim);
          font-weight: 700;
          border-radius: var(--radius-sm);
        }
        .prov-data-row {
          display: grid;
          grid-template-columns: 110px 100px 140px 150px 130px 80px 110px 1fr;
          gap: 6px;
          padding: 8px;
          border-bottom: 1px dotted rgba(148, 163, 184, 0.08);
          align-items: center;
        }
        @media (max-width: 1200px) {
          .metadata-spec-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

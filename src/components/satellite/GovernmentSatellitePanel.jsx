import React, { useState } from 'react';
import {
  Radio,
  Eye,
  Layers,
  ShieldCheck,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle2,
  FileText
} from 'lucide-react';
import SatelliteSourceSelector from './SatelliteSourceSelector';
import SatelliteStatusBadge from './SatelliteStatusBadge';
import GovernmentSatelliteCompare from './GovernmentSatelliteCompare';
import GovernmentMultiSourceStatus from './GovernmentMultiSourceStatus';
import SatelliteViewer from '../SatelliteViewer';
import {
  getSatelliteConfig,
  getObservationMetadata,
  checkTemporalCompatibility,
  checkSpatialCompatibility
} from '../../services/satelliteService';

export default function GovernmentSatellitePanel({
  frameData,
  currentTimestamp = '03 Sep 2026 12:00 UTC'
}) {
  const [selectedPrimary, setSelectedPrimary] = useState('insat3dr');
  const [selectedSecondary, setSelectedSecondary] = useState('insat3d');
  const [compareMode, setCompareMode] = useState(false);

  const primarySat = getSatelliteConfig(selectedPrimary);
  const primaryMeta = getObservationMetadata(selectedPrimary, frameData?.displayTime || currentTimestamp);

  const secondarySat = getSatelliteConfig(selectedSecondary);
  const secondaryMeta = getObservationMetadata(selectedSecondary, frameData?.displayTime || currentTimestamp);

  return (
    <div className="gov-satellite-page">
      {/* Executive Operational Header */}
      <div className="gov-page-header">
        <div>
          <h1 className="text-h1">Operational Satellite Observation</h1>
          <p className="gov-header-subtitle">
            Executive Multi-Satellite Monitoring | Coordinated Cyclone Observation for Decision-Support
          </p>
        </div>
        <div className="gov-header-badges">
          <SatelliteStatusBadge
            status={primarySat?.isConnected ? 'operational' : 'not_connected'}
            label={primarySat?.isConnected ? 'OPERATIONAL FEED' : 'NOT CONNECTED'}
          />
          <button
            className={`sci-btn sci-btn-sm ${compareMode ? 'sci-btn-primary' : ''}`}
            onClick={() => setCompareMode(!compareMode)}
          >
            <Eye size={13} />
            <span>{compareMode ? 'Single Observation View' : 'Compare Sources'}</span>
          </button>
        </div>
      </div>

      {/* Operational Controls & Source Selector Strip */}
      <div className="gov-card gov-controls-strip">
        <div className="gov-selector-col">
          <SatelliteSourceSelector
            label="Observation Source:"
            selectedId={selectedPrimary}
            onSelect={setSelectedPrimary}
            variant="operational"
          />
        </div>

        {/* Quick Provenance Summary Chips */}
        <div className="gov-provenance-chips font-mono">
          <div className="prov-chip">
            <span className="k">Provider:</span>
            <span className="v">{primaryMeta.provider}</span>
          </div>
          <div className="prov-chip">
            <span className="k">Obs Time:</span>
            <span className="v text-accent">{primaryMeta.timestamp}</span>
          </div>
          <div className="prov-chip">
            <span className="k">Band:</span>
            <span className="v">TIR-1 (10.8 µm)</span>
          </div>
          <div className="prov-chip">
            <span className="k">Resolution:</span>
            <span className="v">4 km</span>
          </div>
          <div className="prov-chip">
            <span className="k">Coverage:</span>
            <span className="v">{primaryMeta.coverageRegion}</span>
          </div>
        </div>
      </div>

      {/* Main Satellite Workspace */}
      <div className={`gov-workspace-row ${compareMode ? 'dual' : 'single'}`}>
        {/* Primary Observation Viewer */}
        <div className="gov-viewer-col">
          <div className="viewer-role-indicator font-mono">
            <span className="role-tag">PRIMARY OPERATIONAL SENSOR:</span>
            <span className="role-name">{primarySat.name}</span>
          </div>
          <SatelliteViewer
            frameData={frameData}
            satelliteId={selectedPrimary}
            initialBand="ir"
          />
        </div>

        {/* Secondary Observation Viewer (when in compare mode) */}
        {compareMode && (
          <div className="gov-viewer-col">
            <div className="viewer-role-indicator font-mono">
              <span className="role-tag">SECONDARY CONFIRMATION SENSOR:</span>
              <span className="role-name">{secondarySat.name}</span>
            </div>
            <SatelliteViewer
              frameData={frameData}
              satelliteId={selectedSecondary}
              initialBand="ir"
            />
          </div>
        )}
      </div>

      {/* Simplified Compare Sources Card (shown in compare mode or toggleable) */}
      {compareMode && (
        <GovernmentSatelliteCompare
          primaryId={selectedPrimary}
          secondaryId={selectedSecondary}
          onSelectSecondary={setSelectedSecondary}
          timeA={primaryMeta.timestamp}
          timeB={secondaryMeta.timestamp}
        />
      )}

      {/* Read-Only Multi-Source Analysis Status (Section 21) */}
      <GovernmentMultiSourceStatus
        satelliteCount={primarySat?.isConnected && secondarySat?.isConnected ? 2 : 1}
        envStatus="Available (ERA5 SST & Shear)"
        temporalStatus="Ready (Window Synchronized)"
        spatialStatus="Ready (North Indian Ocean)"
        fusionModel="Prototype / Not Connected"
        aiOutput="Experimental AI Advisory"
      />

      {/* Basic Provenance Audit Panel (Section 22) */}
      <div className="gov-card gov-provenance-panel">
        <div className="gov-panel-header">
          <div className="panel-title font-mono">
            <FileText size={14} className="text-accent" />
            <span>OPERATIONAL PROVENANCE & SENSOR AUDIT TRAIL</span>
          </div>
          <span className="sci-badge sci-badge-neutral font-mono text-xs">TRANSPARENCY RECORD</span>
        </div>

        <div className="gov-prov-table font-mono">
          <div className="gov-table-head">
            <span>Role</span>
            <span>Source</span>
            <span>Provider</span>
            <span>Observation Time</span>
            <span>Band</span>
            <span>Resolution</span>
            <span>Data Status</span>
          </div>
          <div className="gov-table-row">
            <span className="text-accent">Primary</span>
            <span className="font-bold text-white">{primaryMeta.satelliteName}</span>
            <span>{primaryMeta.provider}</span>
            <span className="text-teal">{primaryMeta.timestamp}</span>
            <span>TIR-1 (10.8 µm)</span>
            <span>4 km</span>
            <span>
              <SatelliteStatusBadge status={primaryMeta.dataStatus} size="sm" />
            </span>
          </div>
          {compareMode && (
            <div className="gov-table-row">
              <span className="text-teal">Secondary</span>
              <span className="font-bold text-white">{secondaryMeta.satelliteName}</span>
              <span>{secondaryMeta.provider}</span>
              <span className="text-teal">{secondaryMeta.isConnected ? secondaryMeta.timestamp : 'N/A'}</span>
              <span>{secondaryMeta.isConnected ? 'TIR-1 (10.8 µm)' : 'N/A'}</span>
              <span>{secondaryMeta.isConnected ? '4 km' : 'N/A'}</span>
              <span>
                <SatelliteStatusBadge status={secondaryMeta.dataStatus} size="sm" />
              </span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .gov-satellite-page {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .gov-page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: var(--space-3);
          border-bottom: 1px solid var(--bg-card-border);
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .gov-header-subtitle {
          font-size: 12.5px;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .gov-header-badges {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .gov-controls-strip {
          background: #0d1a30;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .gov-provenance-chips {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 11px;
        }
        .prov-chip {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(15, 23, 42, 0.6);
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(148, 163, 184, 0.08);
        }
        .prov-chip .k {
          color: var(--text-muted);
          font-size: 9.5px;
          text-transform: uppercase;
        }
        .prov-chip .v {
          font-weight: 600;
          color: var(--text-primary);
        }
        .gov-workspace-row {
          display: grid;
          gap: var(--space-4);
          min-height: 480px;
        }
        .gov-workspace-row.single {
          grid-template-columns: 1fr;
        }
        .gov-workspace-row.dual {
          grid-template-columns: 1fr 1fr;
        }
        .gov-viewer-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .viewer-role-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          padding: 4px 8px;
          background: rgba(15, 23, 42, 0.5);
          border-radius: var(--radius-sm);
          border: 1px solid rgba(148, 163, 184, 0.08);
        }
        .role-tag {
          color: var(--text-muted);
          font-size: 9.5px;
        }
        .role-name {
          font-weight: 700;
          color: var(--accent-cyan);
        }
        .gov-provenance-panel {
          background: #0d1a30;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .gov-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
        }
        .panel-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.04em;
        }
        .gov-prov-table {
          display: flex;
          flex-direction: column;
          font-size: 11px;
          overflow-x: auto;
        }
        .gov-table-head {
          display: grid;
          grid-template-columns: 90px 140px 160px 160px 140px 100px 1fr;
          gap: 8px;
          padding: 6px 8px;
          background: rgba(148, 163, 184, 0.05);
          color: var(--text-dim);
          font-weight: 700;
          border-radius: var(--radius-sm);
        }
        .gov-table-row {
          display: grid;
          grid-template-columns: 90px 140px 160px 160px 140px 100px 1fr;
          gap: 8px;
          padding: 8px;
          border-bottom: 1px dotted rgba(148, 163, 184, 0.08);
          align-items: center;
        }
        @media (max-width: 1024px) {
          .gov-workspace-row.dual {
            grid-template-columns: 1fr;
          }
          .gov-table-head, .gov-table-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

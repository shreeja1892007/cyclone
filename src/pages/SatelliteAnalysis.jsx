import React, { useState } from 'react';
import SatelliteViewer from '../components/SatelliteViewer';
import SatelliteSourceSelector from '../components/satellite/SatelliteSourceSelector';
import SatelliteMetadata from '../components/satellite/SatelliteMetadata';
import SatelliteCompareView from '../components/satellite/SatelliteCompareView';
import MultiSourceFusionPanel from '../components/satellite/MultiSourceFusionPanel';
import MultiSourceObservationSummary from '../components/satellite/MultiSourceObservationSummary';
import GovernmentSatellitePanel from '../components/satellite/GovernmentSatellitePanel';
import SatelliteStatusBadge from '../components/satellite/SatelliteStatusBadge';
import { Radio, Layers, Eye, GitMerge, FileText, Cpu, ShieldCheck } from 'lucide-react';
import {
  getSatelliteConfig,
  getObservationMetadata,
  getMultiSourceSummary
} from '../services/satelliteService';

export default function SatelliteAnalysis({
  frameData,
  portalType = 'researcher',
  currentTimestamp = '03 Sep 2026 12:00 UTC'
}) {
  // If Government official is viewing satellite observations, render simplified operational panel
  if (portalType === 'government') {
    return (
      <GovernmentSatellitePanel
        frameData={frameData}
        currentTimestamp={currentTimestamp}
      />
    );
  }

  // RESEARCHER DASHBOARD — Full Scientific Multi-Satellite Remote Sensing Workstation
  // Three Observation Modes: 'single', 'compare', 'fusion'
  const [observationMode, setObservationMode] = useState('single');
  const [selectedSatellite, setSelectedSatellite] = useState('insat3dr');

  const currentSatConfig = getSatelliteConfig(selectedSatellite);
  const metadata = getObservationMetadata(
    selectedSatellite,
    frameData?.displayTime || currentTimestamp
  );

  const activeBandObj = currentSatConfig?.bands?.[0];

  // Dynamic multi-source summary for researcher
  const multiSourceSummary = getMultiSourceSummary(
    selectedSatellite,
    selectedSatellite === 'insat3d' ? 'insat3dr' : 'insat3d',
    'ir',
    'ir',
    frameData?.displayTime || currentTimestamp
  );

  return (
    <div className="satellite-analysis-page">
      {/* Workstation Header */}
      <div className="page-header">
        <div>
          <h1 className="text-h1">SATELLITE OBSERVATION ANALYSIS</h1>
          <p className="header-subtitle">
            Multi-Satellite Remote Sensing Workstation | Calibrated Multispectral Imager Radiance & Cross-Sensor Synthesis
          </p>
        </div>
        <div className="page-header-badges">
          <SatelliteStatusBadge
            status={currentSatConfig?.isConnected ? (currentSatConfig.isDemo ? 'demo_data' : 'operational') : 'not_connected'}
            label={currentSatConfig?.isConnected ? (currentSatConfig.isDemo ? 'DEMO DATA' : 'CALIBRATED L1C') : 'NOT CONNECTED'}
          />
          <span className="sci-badge sci-badge-cyan font-mono">
            {currentSatConfig?.instrument || 'Multispectral Imager'}
          </span>
        </div>
      </div>

      {/* Observation Mode Switcher Bar */}
      <div className="mode-selection-bar">
        <div className="mode-buttons-group">
          <button
            className={`mode-tab-btn ${observationMode === 'single' ? 'active' : ''}`}
            onClick={() => setObservationMode('single')}
          >
            <Radio size={14} />
            <span>SINGLE SATELLITE</span>
          </button>
          <button
            className={`mode-tab-btn ${observationMode === 'compare' ? 'active' : ''}`}
            onClick={() => setObservationMode('compare')}
          >
            <Eye size={14} />
            <span>COMPARE SATELLITES</span>
          </button>
          <button
            className={`mode-tab-btn ${observationMode === 'fusion' ? 'active' : ''}`}
            onClick={() => setObservationMode('fusion')}
          >
            <GitMerge size={14} />
            <span>MULTI-SOURCE FUSION</span>
            <span className="prototype-tiny-pill font-mono">PROTOTYPE</span>
          </button>
        </div>

        {observationMode === 'single' && (
          <div className="single-mode-selector-wrap">
            <SatelliteSourceSelector
              selectedId={selectedSatellite}
              onSelect={setSelectedSatellite}
              label="Satellite Source:"
              variant="scientific"
            />
          </div>
        )}
      </div>

      {/* MODE 1: SINGLE SATELLITE MODE */}
      {observationMode === 'single' && (
        <>
          <div className="sat-workspace-row">
            <div className="sat-primary-col">
              <SatelliteViewer
                frameData={frameData}
                satelliteId={selectedSatellite}
                initialBand="ir"
              />
            </div>
          </div>

          {/* Scientific Telemetry & Provenance */}
          <SatelliteMetadata
            metadata={metadata}
            activeBand={activeBandObj}
            showProvenanceTable={true}
          />

          {/* Dynamic Multispectral Channel Specifications Table */}
          <div className="sci-card channels-spec-card">
            <div className="sci-card-header">
              <div className="sci-card-title">
                <Layers size={15} className="text-accent" />
                <span>
                  Multispectral Channel Specifications & Radiative Physics — {currentSatConfig.name}
                </span>
              </div>
              <SatelliteStatusBadge
                status={currentSatConfig.isConnected ? 'available' : 'not_connected'}
                label={currentSatConfig.isConnected ? `${currentSatConfig.bands.length} CHANNELS` : 'OFFLINE'}
                size="sm"
              />
            </div>

            {currentSatConfig.bands.length > 0 ? (
              <div className="channels-table">
                <div className="table-header-row font-mono">
                  <span>Channel / Band</span>
                  <span>Central Wavelength</span>
                  <span>Spatial Resolution</span>
                  <span>Radiative Purpose</span>
                  <span>Meteorological Utility</span>
                  <span>Availability</span>
                </div>
                {currentSatConfig.bands.map((ch, idx) => (
                  <div key={idx} className="table-data-row">
                    <span className="ch-name font-mono">{ch.name}</span>
                    <span className="font-mono text-accent">{ch.wavelength}</span>
                    <span className="font-mono">{ch.resolution}</span>
                    <span className="text-secondary">{ch.purpose}</span>
                    <span className="text-secondary">{ch.utility}</span>
                    <span>
                      <SatelliteStatusBadge
                        status={ch.available ? 'available' : 'not_connected'}
                        label={ch.available ? 'AVAILABLE' : 'OFFLINE'}
                        size="sm"
                      />
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-channels-box font-mono">
                <span>No spectral bands configured or connected for this platform.</span>
              </div>
            )}
          </div>
        </>
      )}

      {/* MODE 2: COMPARE SATELLITES MODE */}
      {observationMode === 'compare' && (
        <SatelliteCompareView
          frameData={frameData}
          defaultSatA="insat3dr"
          defaultSatB="insat3d"
          currentTimestamp={frameData?.displayTime || currentTimestamp}
        />
      )}

      {/* MODE 3: MULTI-SOURCE FUSION MODE */}
      {observationMode === 'fusion' && (
        <>
          <MultiSourceFusionPanel
            satA={`${getSatelliteConfig('insat3dr').name} (Operational Primary)`}
            satB={`${getSatelliteConfig('insat3d').name} (Standby Demo)`}
            activeBandA="TIR-1 (10.8µm)"
            activeBandB="WV (6.8µm)"
          />

          <MultiSourceObservationSummary summary={multiSourceSummary} />
        </>
      )}

      <style>{`
        .satellite-analysis-page {
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
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .page-header-badges {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .mode-selection-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #091220;
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .mode-buttons-group {
          display: flex;
          gap: 6px;
          background: rgba(148, 163, 184, 0.06);
          padding: 3px;
          border-radius: var(--radius-sm);
        }
        .mode-tab-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          transition: all 0.15s ease;
          cursor: pointer;
        }
        .mode-tab-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.04);
        }
        .mode-tab-btn.active {
          background: var(--bg-surface-elevated);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 229, 255, 0.3);
        }
        .prototype-tiny-pill {
          font-size: 8.5px;
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.4);
          padding: 1px 5px;
          border-radius: 3px;
        }
        .sat-workspace-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-4);
          min-height: 480px;
        }
        .channels-spec-card {
          background: #091222;
        }
        .channels-table {
          display: flex;
          flex-direction: column;
          font-size: 12px;
          overflow-x: auto;
        }
        .table-header-row {
          display: grid;
          grid-template-columns: 180px 140px 130px 1fr 1fr 110px;
          gap: var(--space-3);
          padding: 8px 12px;
          background: rgba(148, 163, 184, 0.05);
          color: var(--text-dim);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          border-radius: var(--radius-sm);
        }
        .table-data-row {
          display: grid;
          grid-template-columns: 180px 140px 130px 1fr 1fr 110px;
          gap: var(--space-3);
          padding: 10px 12px;
          border-bottom: 1px dotted rgba(148, 163, 184, 0.08);
          align-items: center;
        }
        .ch-name {
          font-weight: 600;
          color: var(--text-primary);
        }
        .no-channels-box {
          padding: var(--space-4);
          text-align: center;
          color: var(--text-muted);
          font-size: 12px;
        }
        @media (max-width: 1024px) {
          .table-header-row, .table-data-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

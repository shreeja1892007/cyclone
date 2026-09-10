import React, { useState } from 'react';
import SatelliteViewer from '../SatelliteViewer';
import SatelliteSourceSelector from './SatelliteSourceSelector';
import CompatibilityStatus from './CompatibilityStatus';
import {
  getSatelliteConfig,
  getObservationMetadata,
  checkTemporalCompatibility,
  checkSpatialCompatibility,
  checkResolutionCompatibility
} from '../../services/satelliteService';

export default function SatelliteCompareView({
  frameData,
  defaultSatA = 'insat3dr',
  defaultSatB = 'insat3d',
  currentTimestamp = '03 Sep 2026 12:00 UTC'
}) {
  const [satAId, setSatAId] = useState(defaultSatA);
  const [satBId, setSatBId] = useState(defaultSatB);
  const [thresholdMinutes, setThresholdMinutes] = useState(15);

  const satAConfig = getSatelliteConfig(satAId);
  const satBConfig = getSatelliteConfig(satBId);

  const metaA = getObservationMetadata(satAId, frameData?.displayTime || currentTimestamp);
  const metaB = getObservationMetadata(satBId, frameData?.displayTime || currentTimestamp);

  const temporalResult = checkTemporalCompatibility(metaA.timestamp, metaB.timestamp, thresholdMinutes);
  const spatialResult = checkSpatialCompatibility(satAId, satBId);
  const resolutionResult = checkResolutionCompatibility(satAId, satBId, 'ir', 'ir');

  return (
    <div className="satellite-compare-view">
      {/* Comparative Source Selectors Header */}
      <div className="compare-controls-bar">
        <div className="compare-selector-col">
          <SatelliteSourceSelector
            label="Satellite A (Primary Target):"
            selectedId={satAId}
            onSelect={setSatAId}
            variant="scientific"
          />
        </div>

        <div className="threshold-selector-strip font-mono">
          <span className="thresh-label">Temporal Window (±):</span>
          <select
            className="gov-select thresh-select"
            value={thresholdMinutes}
            onChange={(e) => setThresholdMinutes(Number(e.target.value))}
          >
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes (Standard)</option>
            <option value={30}>30 minutes</option>
            <option value={60}>60 minutes</option>
          </select>
        </div>

        <div className="compare-selector-col">
          <SatelliteSourceSelector
            label="Satellite B (Comparison):"
            selectedId={satBId}
            onSelect={setSatBId}
            variant="scientific"
          />
        </div>
      </div>

      {/* Split-View Viewers */}
      <div className="compare-viewers-grid">
        {/* Left: Satellite A */}
        <div className="compare-pane left">
          <div className="pane-header font-mono">
            <span className="pane-tag">OBSERVATION A:</span>
            <span className="pane-name">{satAConfig.name}</span>
            <span className="pane-provider">({satAConfig.provider})</span>
          </div>
          <SatelliteViewer
            frameData={frameData}
            satelliteId={satAId}
            initialBand="ir"
          />
        </div>

        {/* Right: Satellite B */}
        <div className="compare-pane right">
          <div className="pane-header font-mono">
            <span className="pane-tag">OBSERVATION B:</span>
            <span className="pane-name">{satBConfig.name}</span>
            <span className="pane-provider">({satBConfig.provider})</span>
          </div>
          <SatelliteViewer
            frameData={frameData}
            satelliteId={satBId}
            initialBand="ir"
          />
        </div>
      </div>

      {/* Comprehensive Scientific Compatibility Evaluation */}
      <CompatibilityStatus
        temporalResult={temporalResult}
        spatialResult={spatialResult}
        resolutionResult={resolutionResult}
        satAName={satAConfig.name}
        satBName={satBConfig.name}
        timeA={metaA.timestamp}
        timeB={metaB.timestamp}
      />

      <style>{`
        .satellite-compare-view {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .compare-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #091220;
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .compare-selector-col {
          display: flex;
          align-items: center;
        }
        .threshold-selector-strip {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--text-secondary);
        }
        .thresh-label {
          color: var(--text-muted);
          font-size: 10px;
          text-transform: uppercase;
        }
        .thresh-select {
          font-size: 11px;
          padding: 3px 8px;
          background: #091426;
          border: 1px solid rgba(0, 229, 255, 0.25);
          color: #ffffff;
        }
        .compare-viewers-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
          min-height: 480px;
        }
        .compare-pane {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .pane-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          padding: 4px 8px;
          background: rgba(12, 21, 39, 0.6);
          border-radius: var(--radius-sm);
          border: 1px solid rgba(148, 163, 184, 0.08);
        }
        .pane-tag {
          font-size: 9.5px;
          color: var(--text-muted);
        }
        .pane-name {
          font-weight: 700;
          color: var(--accent-cyan);
        }
        .pane-provider {
          font-size: 10px;
          color: var(--text-dim);
        }
        @media (max-width: 1024px) {
          .compare-viewers-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

import React from 'react';
import { Radio, Clock, ShieldCheck, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import SatelliteStatusBadge from './SatelliteStatusBadge';
import { getSatelliteConfig, checkTemporalCompatibility, checkSpatialCompatibility } from '../../services/satelliteService';

export default function GovernmentSatelliteCompare({
  primaryId = 'insat3dr',
  secondaryId = 'insat3d',
  onSelectSecondary,
  timeA = '03 Sep 2026 12:00 UTC',
  timeB = '03 Sep 2026 12:00 UTC'
}) {
  const primarySat = getSatelliteConfig(primaryId);
  const secondarySat = getSatelliteConfig(secondaryId);

  // Compute operational consistency status
  let consistencyStatus = 'CONSISTENT OBSERVATIONS';
  let consistencyNote = 'Both platforms corroborate deep convective vortex cloud shield in North Indian Ocean.';

  if (!secondarySat || !secondarySat.isConnected) {
    consistencyStatus = 'SECONDARY SOURCE NOT CONNECTED';
    consistencyNote = `${secondarySat?.name || 'Secondary source'} is offline or not configured for live ingestion.`;
  } else {
    const temporal = checkTemporalCompatibility(timeA, timeB);
    const spatial = checkSpatialCompatibility(primaryId, secondaryId);

    if (!spatial.isCompatible) {
      consistencyStatus = spatial.status === 'NO OVERLAPPING COVERAGE' ? 'NO OVERLAPPING COVERAGE' : 'PARTIAL OVERLAP';
      consistencyNote = spatial.details;
    } else if (!temporal.isCompatible) {
      consistencyStatus = 'TIME MISMATCH';
      consistencyNote = `Observation delta exceeds 15-minute operational synchrony (${temporal.differenceMinutes}m difference).`;
    } else {
      consistencyStatus = 'CONSISTENT OBSERVATIONS';
      consistencyNote = 'Primary and secondary orbital perspectives are temporally aligned and spatially overlapping.';
    }
  }

  const temporalDiff = checkTemporalCompatibility(timeA, timeB);

  return (
    <div className="gov-card gov-compare-card">
      <div className="gov-compare-header">
        <div className="gov-header-title">
          <ShieldCheck size={15} className="text-accent" />
          <span>OPERATIONAL SOURCE CROSS-VERIFICATION</span>
        </div>
        <SatelliteStatusBadge
          status={consistencyStatus}
          label={consistencyStatus}
          size="sm"
        />
      </div>

      <div className="gov-compare-grid">
        {/* PRIMARY OBSERVATION */}
        <div className="gov-obs-column primary">
          <div className="gov-obs-header font-mono">
            <span className="obs-tag">PRIMARY OBSERVATION</span>
            <SatelliteStatusBadge
              status={primarySat?.isDemo ? 'demo_data' : 'available'}
              label={primarySat?.isDemo ? 'DEMO DATA' : 'OPERATIONAL'}
              size="sm"
            />
          </div>
          <div className="gov-obs-name">{primarySat?.name || 'INSAT-3DR'}</div>
          <div className="gov-obs-meta font-mono">
            <div className="meta-line">
              <span className="k">Provider:</span>
              <span className="v">{primarySat?.provider}</span>
            </div>
            <div className="meta-line">
              <span className="k">Time:</span>
              <span className="v text-accent">{timeA}</span>
            </div>
            <div className="meta-line">
              <span className="k">Band:</span>
              <span className="v">TIR-1 (10.8 µm)</span>
            </div>
            <div className="meta-line">
              <span className="k">Resolution:</span>
              <span className="v">4 km</span>
            </div>
            <div className="meta-line">
              <span className="k">Data Quality:</span>
              <span className="v text-teal">{primarySat?.qualityRating || 'Nominal'}</span>
            </div>
          </div>
        </div>

        {/* COMPARISON METRICS MIDDLE COLUMN */}
        <div className="gov-compare-center font-mono">
          <div className="compare-arrow-badge">
            <span>VS</span>
          </div>
          <div className="center-metric">
            <span className="cm-k">Time Difference:</span>
            <span className="cm-v text-accent">
              {temporalDiff.differenceMinutes !== null ? `${temporalDiff.differenceMinutes} min` : '0 min'}
            </span>
          </div>
          <div className="center-metric">
            <span className="cm-k">Coverage Status:</span>
            <span className="cm-v text-teal">
              {secondarySat?.isConnected ? 'Overlapping (NIO)' : 'Offline'}
            </span>
          </div>
          <div className="center-metric">
            <span className="cm-k">Cross-Check:</span>
            <span className={consistencyStatus === 'CONSISTENT OBSERVATIONS' ? 'cm-v text-teal' : 'cm-v text-amber'}>
              {consistencyStatus}
            </span>
          </div>
        </div>

        {/* SECONDARY OBSERVATION */}
        <div className={`gov-obs-column secondary ${!secondarySat?.isConnected ? 'offline' : ''}`}>
          <div className="gov-obs-header font-mono">
            <span className="obs-tag">SECONDARY OBSERVATION</span>
            <SatelliteStatusBadge
              status={secondarySat?.isConnected ? (secondarySat.isDemo ? 'demo_data' : 'available') : 'not_connected'}
              label={secondarySat?.isConnected ? (secondarySat.isDemo ? 'DEMO DATA' : 'AVAILABLE') : 'NOT CONNECTED'}
              size="sm"
            />
          </div>

          <div className="secondary-select-strip font-mono">
            <span className="k">Select Secondary Source:</span>
            <select
              className="gov-select gov-select-sm"
              value={secondaryId}
              onChange={(e) => onSelectSecondary && onSelectSecondary(e.target.value)}
            >
              <option value="insat3d">INSAT-3D (Available - Standby Demo)</option>
              <option value="himawari">Himawari-9 (Not Connected)</option>
              <option value="meteosat">Meteosat-9 (Not Connected)</option>
              <option value="goes">GOES-16 (Not Connected)</option>
            </select>
          </div>

          <div className="gov-obs-name">{secondarySat?.name || 'INSAT-3D'}</div>
          <div className="gov-obs-meta font-mono">
            <div className="meta-line">
              <span className="k">Provider:</span>
              <span className="v">{secondarySat?.provider || 'N/A'}</span>
            </div>
            <div className="meta-line">
              <span className="k">Time:</span>
              <span className="v text-accent">{secondarySat?.isConnected ? timeB : 'N/A — Feed Offline'}</span>
            </div>
            <div className="meta-line">
              <span className="k">Band:</span>
              <span className="v">{secondarySat?.isConnected ? 'TIR-1 (10.8 µm)' : 'N/A'}</span>
            </div>
            <div className="meta-line">
              <span className="k">Resolution:</span>
              <span className="v">{secondarySat?.isConnected ? '4 km' : 'N/A'}</span>
            </div>
            <div className="meta-line">
              <span className="k">Data Quality:</span>
              <span className="v">{secondarySat?.qualityRating || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Conclusion Strip */}
      <div className="gov-compare-conclusion font-mono">
        <AlertCircle size={14} className={consistencyStatus === 'CONSISTENT OBSERVATIONS' ? 'text-teal' : 'text-amber'} />
        <span>
          <strong>OPERATIONAL CONSISTENCY:</strong> {consistencyNote}
        </span>
      </div>

      <style>{`
        .gov-compare-card {
          background: #0d1a30;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .gov-compare-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
          flex-wrap: wrap;
          gap: 8px;
        }
        .gov-compare-grid {
          display: grid;
          grid-template-columns: 1fr 180px 1fr;
          gap: var(--space-3);
          align-items: stretch;
        }
        .gov-obs-column {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .gov-obs-column.primary {
          border-top: 2px solid #00e5ff;
        }
        .gov-obs-column.secondary {
          border-top: 2px solid #38bdf8;
        }
        .gov-obs-column.secondary.offline {
          border-top-color: #ef4444;
          opacity: 0.85;
        }
        .gov-obs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 9.5px;
          color: var(--text-muted);
        }
        .obs-tag {
          letter-spacing: 0.04em;
        }
        .gov-obs-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .secondary-select-strip {
          display: flex;
          flex-direction: column;
          gap: 3px;
          font-size: 10px;
          margin-bottom: 4px;
        }
        .secondary-select-strip .k {
          color: var(--text-muted);
        }
        .gov-select-sm {
          font-size: 11px;
          padding: 4px 8px;
          background: #091426;
          border: 1px solid rgba(0, 229, 255, 0.25);
          color: #ffffff;
          border-radius: var(--radius-sm);
        }
        .gov-obs-meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
          font-size: 11px;
          border-top: 1px solid rgba(148, 163, 184, 0.08);
          padding-top: 6px;
          margin-top: auto;
        }
        .meta-line {
          display: flex;
          justify-content: space-between;
        }
        .meta-line .k {
          color: var(--text-muted);
        }
        .meta-line .v {
          font-weight: 600;
          color: var(--text-primary);
        }
        .gov-compare-center {
          background: rgba(11, 20, 36, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: var(--radius-md);
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
          font-size: 10.5px;
        }
        .compare-arrow-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(0, 229, 255, 0.15);
          border: 1px solid rgba(0, 229, 255, 0.3);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        .center-metric {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .cm-k {
          color: var(--text-dim);
          font-size: 9px;
          text-transform: uppercase;
        }
        .cm-v {
          font-weight: 700;
        }
        .gov-compare-conclusion {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          background: rgba(15, 23, 42, 0.7);
          border-radius: var(--radius-sm);
          border: 1px solid rgba(148, 163, 184, 0.1);
          font-size: 11px;
          color: var(--text-secondary);
        }
        @media (max-width: 960px) {
          .gov-compare-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

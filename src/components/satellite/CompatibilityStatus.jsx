import React from 'react';
import { Clock, Globe, Scaling, AlertCircle, CheckCircle2 } from 'lucide-react';
import SatelliteStatusBadge from './SatelliteStatusBadge';

export default function CompatibilityStatus({
  temporalResult,
  spatialResult,
  resolutionResult,
  satAName,
  satBName,
  timeA,
  timeB
}) {
  return (
    <div className="sci-card compatibility-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <Scaling size={15} className="text-accent" />
          <span>Multi-Satellite Observation Compatibility Analysis</span>
        </div>
        <span className="sci-badge sci-badge-cyan font-mono">Scientific Cross-Verification</span>
      </div>

      <div className="compatibility-grid">
        {/* 1. Temporal Compatibility */}
        <div className="compat-item">
          <div className="compat-item-header">
            <div className="compat-title-row">
              <Clock size={14} className="text-accent" />
              <span className="compat-title">Temporal Compatibility</span>
            </div>
            <SatelliteStatusBadge
              status={temporalResult?.status || 'time_mismatch'}
              size="sm"
            />
          </div>

          <div className="compat-details font-mono">
            <div className="compat-row">
              <span className="k">{satAName || 'Source A'}:</span>
              <span className="v">{timeA || '03 Sep 2026 12:00 UTC'}</span>
            </div>
            <div className="compat-row">
              <span className="k">{satBName || 'Source B'}:</span>
              <span className="v">{timeB || '03 Sep 2026 12:00 UTC'}</span>
            </div>
            <div className="compat-row">
              <span className="k">Difference:</span>
              <span className="v text-accent">
                {temporalResult?.differenceMinutes !== null
                  ? `${temporalResult.differenceMinutes} minutes`
                  : 'N/A'}
              </span>
            </div>
            <div className="compat-threshold-note text-secondary">
              Synchronicity threshold: ≤ {temporalResult?.thresholdMinutes || 15} mins.
              {temporalResult?.isCompatible ? (
                <span className="compat-success-text"> Coincident observation window verified.</span>
              ) : (
                <span className="compat-warning-text"> Diurnal or scan-lag error may affect differential cloud motion.</span>
              )}
            </div>
          </div>
        </div>

        {/* 2. Spatial Compatibility */}
        <div className="compat-item">
          <div className="compat-item-header">
            <div className="compat-title-row">
              <Globe size={14} className="text-accent" />
              <span className="compat-title">Spatial Compatibility</span>
            </div>
            <SatelliteStatusBadge
              status={spatialResult?.status || 'unknown'}
              size="sm"
            />
          </div>

          <div className="compat-details">
            <div className="compat-desc text-secondary">
              {spatialResult?.details || 'Spatial footprint calculation underway.'}
            </div>
            {spatialResult?.status === 'NO OVERLAPPING COVERAGE' && (
              <div className="compat-alert-box font-mono">
                <AlertCircle size={13} className="text-danger" />
                <span>Observations cannot be directly co-registered or compared.</span>
              </div>
            )}
            {spatialResult?.status === 'PARTIAL OVERLAP' && (
              <div className="compat-alert-box warning font-mono">
                <AlertCircle size={13} className="text-amber" />
                <span>Peripheral limb distortion; restricted to common longitude sector.</span>
              </div>
            )}
            {spatialResult?.status === 'OVERLAPPING COVERAGE' && (
              <div className="compat-alert-box success font-mono">
                <CheckCircle2 size={13} className="text-teal" />
                <span>Full North Indian Ocean field-of-view co-aligned.</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. Resolution Compatibility */}
        <div className="compat-item">
          <div className="compat-item-header">
            <div className="compat-title-row">
              <Scaling size={14} className="text-accent" />
              <span className="compat-title">Spatial Resolution Compatibility</span>
            </div>
            <SatelliteStatusBadge
              status={resolutionResult?.status || 'unknown'}
              size="sm"
            />
          </div>

          <div className="compat-details font-mono">
            <div className="compat-row">
              <span className="k">{satAName} Resolution:</span>
              <span className="v text-accent">{resolutionResult?.resA || '4 km'}</span>
            </div>
            <div className="compat-row">
              <span className="k">{satBName} Resolution:</span>
              <span className="v text-accent">{resolutionResult?.resB || '4 km'}</span>
            </div>
            <div className="compat-row">
              <span className="k">Harmonization:</span>
              <span className={`v ${resolutionResult?.resamplingStatus === 'RESAMPLING NOT IMPLEMENTED' ? 'text-amber' : 'text-teal'}`}>
                {resolutionResult?.resamplingStatus || 'Direct 1:1 Pixel Alignment'}
              </span>
            </div>
            {resolutionResult?.resamplingStatus === 'RESAMPLING NOT IMPLEMENTED' && (
              <div className="resampling-notice">
                <AlertCircle size={12} className="text-amber" />
                <span>
                  <strong>RESAMPLING NOT IMPLEMENTED:</strong> Raw native resolution displayed. Bilinear/Bicubic resampling kernel backend not attached.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .compatibility-card {
          background: #091220;
          margin-top: var(--space-3);
        }
        .compatibility-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-3);
          padding: var(--space-2) 0;
        }
        .compat-item {
          background: rgba(12, 21, 39, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: var(--radius-md);
          padding: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .compat-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
          gap: 6px;
          flex-wrap: wrap;
        }
        .compat-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .compat-title {
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.03em;
        }
        .compat-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 11px;
        }
        .compat-row {
          display: flex;
          justify-content: space-between;
          padding: 2px 0;
          border-bottom: 1px dotted rgba(148, 163, 184, 0.08);
        }
        .compat-row .k {
          color: var(--text-muted);
        }
        .compat-row .v {
          font-weight: 600;
          color: var(--text-primary);
        }
        .compat-threshold-note {
          font-size: 10px;
          line-height: 1.4;
          margin-top: 4px;
        }
        .compat-desc {
          font-size: 11px;
          line-height: 1.4;
        }
        .compat-success-text {
          color: #10b981;
        }
        .compat-warning-text {
          color: #f59e0b;
        }
        .compat-alert-box {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #f87171;
          font-size: 10px;
          margin-top: 4px;
        }
        .compat-alert-box.warning {
          background: rgba(245, 158, 11, 0.1);
          border-color: rgba(245, 158, 11, 0.25);
          color: #fbbf24;
        }
        .compat-alert-box.success {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.25);
          color: #34d399;
        }
        .resampling-notice {
          display: flex;
          align-items: flex-start;
          gap: 5px;
          padding: 5px 8px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.25);
          color: #fcd34d;
          font-size: 9.5px;
          border-radius: var(--radius-sm);
          line-height: 1.35;
          margin-top: 4px;
        }
        @media (max-width: 1024px) {
          .compatibility-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

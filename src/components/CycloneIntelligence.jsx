import React from 'react';
import {
  Compass,
  AlertTriangle,
  BrainCircuit,
  Shield,
  Clock,
  Navigation,
  Wind,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function CycloneIntelligence({ frameData, onOpenAnalysis, onOpenExplainability }) {
  const currentLat = frameData?.latitude || 14.8;
  const currentLon = frameData?.longitude || 87.3;
  const displayTime = frameData?.displayTime || '03 Sep 2026 12:00 UTC';
  const prob24h = frameData?.prediction?.prob24h ?? 76;
  const pattern = frameData?.classification?.pattern || 'Curved Band';
  const classConfidence = frameData?.classification?.confidence || 88;

  return (
    <div className="sci-card intelligence-card">
      <div className="sci-card-header intelligence-header">
        <div className="sci-card-title">
          <BrainCircuit size={16} className="text-accent" />
          <span>Cyclone Intelligence</span>
        </div>
        <span className="demo-badge font-mono">DEMO DATA</span>
      </div>

      <div className="intelligence-content">
        {/* Active System Quick Bar */}
        <div className="system-quick-bar">
          <div className="quick-bar-left">
            <div className="system-name font-mono">INVEST 91B / DEEP DEPRESSION</div>
            <div className="system-location">
              <Navigation size={12} className="text-accent" />
              <span>{currentLat.toFixed(1)}°N, {currentLon.toFixed(1)}°E • Central Bay of Bengal</span>
            </div>
          </div>
          <div className="quick-bar-right">
            <span className="sci-badge sci-badge-amber">Developing System</span>
          </div>
        </div>

        {/* DUAL SEPARATION: OFFICIAL INFORMATION vs CYCLOVISION AI EXPERIMENTAL */}
        <div className="intelligence-dual-panel">
          {/* 1. OFFICIAL INFORMATION PANEL */}
          <div className="official-intel-block">
            <div className="intel-block-header official-border">
              <div className="intel-header-title">
                <Shield size={13} className="text-blue-light" />
                <span className="official-title-text">OFFICIAL INFORMATION</span>
              </div>
              <span className="sci-badge sci-badge-blue official-pill">RSMC / IMD</span>
            </div>

            <div className="intel-fields-grid">
              <div className="intel-field">
                <span className="intel-label">Authority</span>
                <span className="intel-val">IMD / RSMC New Delhi</span>
              </div>
              <div className="intel-field">
                <span className="intel-label">Official Stage</span>
                <span className="intel-val text-amber">Deep Depression</span>
              </div>
              <div className="intel-field">
                <span className="intel-label">Bulletin Ref</span>
                <span className="intel-val font-mono">BOB/03/2026/06</span>
              </div>
              <div className="intel-field">
                <span className="intel-label">Movement</span>
                <span className="intel-val">WNW at 15 km/h</span>
              </div>
              <div className="intel-field">
                <span className="intel-label">Warning Level</span>
                <span className="intel-val text-danger font-bold">Cyclone Alert (Yellow)</span>
              </div>
              <div className="intel-field">
                <span className="intel-label">Valid Until</span>
                <span className="intel-val font-mono">04 Sep 00:00 UTC</span>
              </div>
            </div>

            <div className="official-disclaimer-note">
              Official warnings and operational advice issued by IMD RSMC.
            </div>
          </div>

          {/* 2. CYCLOVISION AI EXPERIMENTAL PANEL */}
          <div className="ai-intel-block">
            <div className="intel-block-header ai-border">
              <div className="intel-header-title">
                <BrainCircuit size={13} className="text-purple" />
                <span className="ai-title-text">CYCLOVISION AI — EXPERIMENTAL</span>
              </div>
              <span className="sci-badge sci-badge-purple ai-pill">GenesisNet v0.1</span>
            </div>

            <div className="intel-fields-grid">
              <div className="intel-field">
                <span className="intel-label">AI Identification</span>
                <span className="intel-val text-success">Disturbance Detected (94%)</span>
              </div>
              <div className="intel-field">
                <span className="intel-label">Cloud Pattern</span>
                <span className="intel-val text-accent">{pattern} ({classConfidence}%)</span>
              </div>
              <div className="intel-field highlight-field">
                <span className="intel-label">Genesis Prob (24h)</span>
                <span className="intel-val text-accent font-bold font-mono">{prob24h}% (High)</span>
              </div>
              <div className="intel-field">
                <span className="intel-label">Forecast Horizon</span>
                <span className="intel-val font-mono">Next 24 Hours</span>
              </div>
              <div className="intel-field">
                <span className="intel-label">Target Basin</span>
                <span className="intel-val">North Indian Ocean (BoB)</span>
              </div>
              <div className="intel-field">
                <span className="intel-label">Observation Frame</span>
                <span className="intel-val font-mono">{displayTime}</span>
              </div>
            </div>

            <div className="ai-action-buttons">
              <button
                className="sci-btn sci-btn-secondary sci-btn-xs"
                onClick={onOpenExplainability}
                title="View meteorological supporting and limiting conditions"
              >
                <span>Explain Prediction</span>
                <ArrowUpRight size={12} />
              </button>
              <button
                className="sci-btn sci-btn-primary sci-btn-xs"
                onClick={onOpenAnalysis}
                title="Open deep AI analysis workspace"
              >
                <span>Full AI Analysis</span>
              </button>
            </div>
          </div>
        </div>

        {/* Environmental Snapshot in Intelligence Card */}
        <div className="intel-env-bar font-mono">
          <div className="env-pill">
            <span className="env-k">SST:</span>
            <span className="env-v text-accent">{frameData?.environment?.sst?.value ?? 29.3} °C</span>
          </div>
          <div className="env-pill">
            <span className="env-k">MSLP:</span>
            <span className="env-v text-accent">{frameData?.environment?.mslp?.value ?? 1004} hPa</span>
          </div>
          <div className="env-pill">
            <span className="env-k">RH 500:</span>
            <span className="env-v text-accent">{frameData?.environment?.rh500?.value ?? 74}%</span>
          </div>
          <div className="env-pill">
            <span className="env-k">Shear:</span>
            <span className="env-v text-success">{frameData?.environment?.windShear?.value ?? 12} m/s</span>
          </div>
        </div>
      </div>

      <style>{`
        .intelligence-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #0b1424;
          border: 1px solid var(--bg-card-border);
        }
        .intelligence-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-3) var(--space-4);
          background: rgba(15, 25, 45, 0.7);
          border-bottom: 1px solid var(--bg-card-border);
        }
        .demo-badge {
          font-size: 10px;
          color: var(--accent-cyan);
          background: rgba(0, 229, 255, 0.1);
          border: 1px solid rgba(0, 229, 255, 0.25);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .intelligence-content {
          padding: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          flex: 1;
        }
        .system-quick-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-surface-elevated);
          border: 1px solid rgba(148, 163, 184, 0.1);
          padding: 8px 12px;
          border-radius: var(--radius-md);
        }
        .system-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .system-location {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .intelligence-dual-panel {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          flex: 1;
        }
        .official-intel-block {
          background: rgba(2, 132, 199, 0.05);
          border: 1px solid rgba(2, 132, 199, 0.25);
          border-radius: var(--radius-md);
          padding: 10px 12px;
        }
        .ai-intel-block {
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.28);
          border-radius: var(--radius-md);
          padding: 10px 12px;
        }
        .intel-block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 6px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }
        .intel-header-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .official-title-text {
          color: #38bdf8;
        }
        .ai-title-text {
          color: #c084fc;
        }
        .text-purple {
          color: #c084fc;
        }
        .text-blue-light {
          color: #38bdf8;
        }
        .sci-badge-blue {
          background: rgba(2, 132, 199, 0.2);
          color: #38bdf8;
          border: 1px solid rgba(2, 132, 199, 0.4);
          font-size: 10px;
        }
        .sci-badge-purple {
          background: rgba(139, 92, 246, 0.2);
          color: #c084fc;
          border: 1px solid rgba(139, 92, 246, 0.4);
          font-size: 10px;
        }
        .intel-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px 12px;
        }
        .intel-field {
          display: flex;
          flex-direction: column;
        }
        .intel-label {
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .intel-val {
          font-size: 12px;
          color: var(--text-primary);
          font-weight: 500;
        }
        .highlight-field .intel-val {
          color: var(--accent-cyan);
          font-size: 13px;
        }
        .official-disclaimer-note {
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 6px;
          font-style: italic;
        }
        .ai-action-buttons {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }
        .sci-btn-xs {
          padding: 4px 8px;
          font-size: 11px;
          border-radius: var(--radius-sm);
        }
        .intel-env-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--bg-card-border);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          font-size: 11px;
        }
        .env-pill {
          display: flex;
          gap: 4px;
        }
        .env-k {
          color: var(--text-muted);
        }
        .env-v {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

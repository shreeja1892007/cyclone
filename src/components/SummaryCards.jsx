import React from 'react';
import {
  Target,
  Navigation,
  TrendingUp,
  Wind,
  AlertTriangle,
  ShieldAlert,
  PhoneCall,
  Clock,
  Radio
} from 'lucide-react';

export default function SummaryCards({
  frameData,
  modelInfo,
  activeDistressSummary,
  onNavigateView
}) {
  const currentLat = frameData?.latitude || 14.8;
  const currentLon = frameData?.longitude || 87.3;
  const probVal = frameData?.prediction?.prob24h ?? 76;
  const displayTime = frameData?.displayTime || '03 Sep 2026 12:00 UTC';
  const detection = frameData?.detection || { statusLabel: 'Tropical Disturbance Detected', confidence: 94 };

  const distress = activeDistressSummary || {
    totalActive: 5,
    critical: 2,
    responding: 2
  };

  return (
    <div className="summary-overview-bar">
      {/* 1. SYSTEM STATUS */}
      <div className="gov-metric-card" onClick={() => onNavigateView && onNavigateView('cyclone-intelligence')}>
        <div className="metric-header">
          <span className="metric-label">
            <Target size={12} className="text-accent" /> SYSTEM STATUS
          </span>
          <span className="demo-tag">DEMO</span>
        </div>
        <div className="metric-primary-val text-accent">
          DEEP DEPRESSION
        </div>
        <div className="metric-sub-row">
          <span className="status-dot dot-amber"></span>
          <span className="metric-sub-text">Active Monitoring (Invest 91B)</span>
        </div>
      </div>

      {/* 2. CURRENT LOCATION */}
      <div className="gov-metric-card" onClick={() => onNavigateView && onNavigateView('operational-map')}>
        <div className="metric-header">
          <span className="metric-label">
            <Navigation size={12} className="text-accent" /> CURRENT LOCATION
          </span>
          <span className="demo-tag">DEMO</span>
        </div>
        <div className="metric-primary-val font-mono">
          {currentLat.toFixed(1)}°N, {currentLon.toFixed(1)}°E
        </div>
        <div className="metric-sub-row">
          <span className="metric-sub-text">Central Bay of Bengal (WNW 15km/h)</span>
        </div>
      </div>

      {/* 3. GENESIS PROBABILITY */}
      <div className="gov-metric-card highlight-metric" onClick={() => onNavigateView && onNavigateView('ai-analysis')}>
        <div className="metric-header">
          <span className="metric-label">
            <TrendingUp size={12} className="text-purple" /> GENESIS PROBABILITY
          </span>
          <span className="demo-tag">AI DEMO</span>
        </div>
        <div className="metric-primary-val text-accent font-mono">
          {probVal}% <span className="metric-unit">Next 24h</span>
        </div>
        <div className="metric-sub-row">
          <div className="metric-progress-track">
            <div className="metric-progress-fill" style={{ width: `${probVal}%` }}></div>
          </div>
          <span className="metric-sub-text font-mono">GenesisNet v0.1</span>
        </div>
      </div>

      {/* 4. INTENSITY */}
      <div className="gov-metric-card">
        <div className="metric-header">
          <span className="metric-label">
            <Wind size={12} className="text-accent" /> INTENSITY
          </span>
          <span className="demo-tag">DEMO</span>
        </div>
        <div className="metric-primary-val font-mono">
          28 kt <span className="metric-unit">(52 km/h)</span>
        </div>
        <div className="metric-sub-row">
          <span className="metric-sub-text">Central Pressure: <strong className="text-primary font-mono">{frameData?.environment?.mslp?.value ?? 1004} hPa</strong></span>
        </div>
      </div>

      {/* 5. OVERALL RISK */}
      <div className="gov-metric-card risk-metric" onClick={() => onNavigateView && onNavigateView('hazard-assessment')}>
        <div className="metric-header">
          <span className="metric-label">
            <AlertTriangle size={12} className="text-danger" /> OVERALL RISK
          </span>
          <span className="demo-tag">DEMO</span>
        </div>
        <div className="metric-primary-val text-danger font-bold">
          HIGH RISK
        </div>
        <div className="metric-sub-row">
          <span className="status-dot dot-red"></span>
          <span className="metric-sub-text">Coastal Odisha & North AP</span>
        </div>
      </div>

      {/* 6. OFFICIAL WARNING STATUS */}
      <div className="gov-metric-card official-metric" onClick={() => onNavigateView && onNavigateView('official-bulletins')}>
        <div className="metric-header">
          <span className="metric-label">
            <ShieldAlert size={12} className="text-blue" /> OFFICIAL WARNING
          </span>
          <span className="official-tag">OFFICIAL</span>
        </div>
        <div className="metric-primary-val text-amber">
          CYCLONE ALERT
        </div>
        <div className="metric-sub-row">
          <span className="metric-sub-text font-mono">IMD Yellow / Orange Stage</span>
        </div>
      </div>

      {/* 7. CITIZEN EMERGENCY REQUESTS */}
      <div className="gov-metric-card distress-metric" onClick={() => onNavigateView && onNavigateView('citizen-requests')}>
        <div className="metric-header">
          <span className="metric-label">
            <PhoneCall size={12} className="text-danger" /> CITIZEN REQUESTS
          </span>
          <span className="demo-tag">TWO-WAY</span>
        </div>
        <div className="metric-primary-val text-danger font-mono">
          {distress.totalActive} Active <span className="metric-unit">({distress.critical} Critical)</span>
        </div>
        <div className="metric-sub-row">
          <span className="status-dot dot-cyan"></span>
          <span className="metric-sub-text">{distress.responding} Teams Responding</span>
        </div>
      </div>

      {/* 8. LAST UPDATED */}
      <div className="gov-metric-card">
        <div className="metric-header">
          <span className="metric-label">
            <Clock size={12} className="text-muted" /> LAST UPDATED
          </span>
          <span className="demo-tag">SYNC</span>
        </div>
        <div className="metric-primary-val font-mono" style={{ fontSize: '13px' }}>
          {displayTime}
        </div>
        <div className="metric-sub-row">
          <span className="metric-sub-text">15m Telemetry Ingest Cycle</span>
        </div>
      </div>

      <style>{`
        .summary-overview-bar {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: var(--space-2);
          margin-bottom: var(--space-3);
        }
        .gov-metric-card {
          background: #0d172a;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-md);
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 80px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .gov-metric-card:hover {
          border-color: rgba(0, 229, 255, 0.35);
          background: #101c36;
          transform: translateY(-1px);
        }
        .metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2px;
        }
        .metric-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .demo-tag {
          font-size: 8px;
          font-weight: 700;
          color: var(--text-muted);
          background: rgba(148, 163, 184, 0.12);
          padding: 1px 4px;
          border-radius: 3px;
        }
        .official-tag {
          font-size: 8px;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(2, 132, 199, 0.2);
          border: 1px solid rgba(2, 132, 199, 0.4);
          padding: 1px 4px;
          border-radius: 3px;
        }
        .metric-primary-val {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .metric-unit {
          font-size: 10px;
          font-weight: 400;
          color: var(--text-muted);
        }
        .metric-sub-row {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 4px;
          overflow: hidden;
        }
        .metric-sub-text {
          font-size: 10px;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .metric-progress-track {
          width: 44px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .metric-progress-fill {
          height: 100%;
          background: var(--accent-cyan);
          border-radius: 2px;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-amber { background: #f59e0b; box-shadow: 0 0 6px #f59e0b; }
        .dot-red { background: #ef4444; box-shadow: 0 0 6px #ef4444; }
        .dot-cyan { background: #00e5ff; box-shadow: 0 0 6px #00e5ff; }
        .highlight-metric {
          border-color: rgba(139, 92, 246, 0.3);
          background: rgba(139, 92, 246, 0.05);
        }
        .official-metric {
          border-color: rgba(2, 132, 199, 0.3);
          background: rgba(2, 132, 199, 0.05);
        }
        .distress-metric {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.05);
        }
        .text-purple { color: #c084fc; }
        .text-blue { color: #38bdf8; }

        @media (max-width: 1600px) {
          .summary-overview-bar {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 900px) {
          .summary-overview-bar {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 550px) {
          .summary-overview-bar {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

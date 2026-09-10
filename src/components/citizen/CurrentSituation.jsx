import React from 'react';
import {
  AlertTriangle,
  Compass,
  Navigation,
  Clock,
  ShieldAlert,
  Wind,
  Layers,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function CurrentSituation({
  situationData,
  selectedDistrict = 'Puri',
  selectedState = 'Odisha',
  userLocation
}) {
  if (!situationData) {
    return (
      <div className="cz-card cz-empty-card">
        <Info size={20} className="text-muted" />
        <p>Current cyclone situation telemetry is temporarily unavailable.</p>
      </div>
    );
  }

  const {
    systemName = 'Tropical Disturbance BOB 03',
    systemType = 'Deep Depression over Central Bay of Bengal',
    status = 'Active & Organizing',
    intensity = '28 kt sustained (~52 km/h)',
    myArea = `${selectedDistrict}, Coastal ${selectedState}`,
    localRisk = 'HIGH',
    officialWarningStatus = 'Official Cyclone Alert (Orange Watch) — IMD Feed (Demo)',
    updatedAt = '03 Sep 2026 12:00 UTC',
    distanceKm = 380,
    direction = 'SE (South-East)'
  } = situationData;

  const isRiskHigh = localRisk === 'HIGH' || localRisk === 'SEVERE' || localRisk === 'CRITICAL';

  return (
    <section className="cz-situation-section" aria-labelledby="current-situation-title">
      <div className="cz-situation-header">
        <div className="cz-sit-title-wrap">
          <div className="cz-alert-dot-pulse" aria-hidden="true"></div>
          <h2 id="current-situation-title" className="cz-situation-heading">
            CURRENT SITUATION
          </h2>
        </div>
        <div className="cz-demo-pill">
          <span className="font-mono">DEMO DATA</span>
        </div>
      </div>

      <div className="cz-situation-grid">
        {/* Main Cyclone Identity Card */}
        <div className="cz-sit-main-card">
          <div className="cz-sit-badge-row">
            <span className="cz-type-badge">{systemType}</span>
            <span className="cz-status-live-badge">{status}</span>
          </div>

          <h3 className="cz-cyclone-name">{systemName}</h3>

          <div className="cz-metric-chips">
            <div className="cz-chip">
              <Wind size={15} className="text-accent" />
              <div>
                <span className="cz-chip-label">ESTIMATED INTENSITY</span>
                <span className="cz-chip-val font-mono">{intensity}</span>
              </div>
            </div>

            <div className="cz-chip">
              <Compass size={15} className="text-accent" />
              <div>
                <span className="cz-chip-label">DISTANCE FROM YOU</span>
                <span className="cz-chip-val font-mono">
                  ~{distanceKm} km {direction}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Local Area & Risk Status Card */}
        <div className={`cz-sit-risk-card ${isRiskHigh ? 'risk-high' : 'risk-normal'}`}>
          <div className="cz-risk-header">
            <div className="cz-area-badge">
              <Navigation size={13} />
              <span>YOUR SELECTED AREA</span>
            </div>
            <span className="cz-timestamp-tag font-mono">
              <Clock size={11} /> {updatedAt}
            </span>
          </div>

          <div className="cz-area-name">{selectedDistrict}, {selectedState}</div>

          <div className="cz-risk-display-row">
            <div>
              <div className="cz-risk-label">LOCAL RISK LEVEL</div>
              <div className="cz-risk-level-badge">
                <AlertTriangle size={18} />
                <span>{localRisk} RISK</span>
              </div>
            </div>

            <div className="cz-risk-advice-text">
              Gale winds and heavy rain expected in this sector within next 24 hours. Prepare essentials now.
            </div>
          </div>

          {/* Official Warning Linkage */}
          <div className="cz-official-status-strip">
            <ShieldAlert size={14} className="text-amber" />
            <div className="cz-off-text">
              <span className="cz-off-label">OFFICIAL WARNING STATUS:</span>
              <span className="cz-off-val">{officialWarningStatus}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cz-situation-section {
          background: #091326;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .cz-situation-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          padding-bottom: 12px;
        }
        .cz-sit-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cz-alert-dot-pulse {
          width: 10px;
          height: 10px;
          border-radius: var(--radius-full);
          background: #ef4444;
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          animation: cz-pulse 2s infinite;
        }
        @keyframes cz-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
        .cz-situation-heading {
          font-size: 17px;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #ffffff;
          margin: 0;
        }
        .cz-demo-pill {
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: #f59e0b;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
        }
        .cz-situation-grid {
          display: grid;
          grid-template-columns: 1.2fr 1.8fr;
          gap: 16px;
        }
        .cz-sit-main-card {
          background: #0d1a33;
          border: 1px solid rgba(0, 229, 255, 0.2);
          border-radius: var(--radius-md);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cz-sit-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cz-type-badge {
          background: rgba(56, 189, 248, 0.15);
          color: var(--accent-blue-light);
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: var(--radius-sm);
        }
        .cz-status-live-badge {
          background: rgba(16, 185, 129, 0.15);
          color: var(--status-available);
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: var(--radius-sm);
        }
        .cz-cyclone-name {
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.25;
          margin: 0;
        }
        .cz-metric-chips {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
        }
        .cz-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(15, 25, 45, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.12);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
        }
        .cz-chip-label {
          display: block;
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .cz-chip-val {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .cz-sit-risk-card {
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: var(--radius-md);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cz-sit-risk-card.risk-high {
          border-left: 5px solid #ef4444;
        }
        .cz-risk-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cz-area-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: var(--accent-cyan);
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .cz-timestamp-tag {
          font-size: 11px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .cz-area-name {
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
        }
        .cz-risk-display-row {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          padding: 12px 16px;
          border-radius: var(--radius-md);
        }
        .cz-risk-label {
          font-size: 10px;
          font-weight: 700;
          color: #fca5a5;
          letter-spacing: 0.05em;
        }
        .cz-risk-level-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 18px;
          font-weight: 900;
          color: #ef4444;
          letter-spacing: 0.02em;
        }
        .cz-risk-advice-text {
          font-size: 12px;
          color: var(--text-primary);
          line-height: 1.4;
          border-left: 1px solid rgba(239, 68, 68, 0.3);
          padding-left: 14px;
        }
        .cz-official-status-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(15, 25, 45, 0.7);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 9px 12px;
          border-radius: var(--radius-sm);
        }
        .cz-off-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cz-off-label {
          font-size: 10px;
          font-weight: 700;
          color: #f59e0b;
          letter-spacing: 0.05em;
        }
        .cz-off-val {
          font-size: 12px;
          color: var(--text-primary);
          font-weight: 600;
        }
        @media (max-width: 860px) {
          .cz-situation-grid {
            grid-template-columns: 1fr;
          }
          .cz-risk-display-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .cz-risk-advice-text {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid rgba(239, 68, 68, 0.2);
            padding-top: 8px;
          }
        }
      `}</style>
    </section>
  );
}

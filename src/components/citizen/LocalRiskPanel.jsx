import React from 'react';
import {
  Wind,
  CloudRain,
  Waves,
  AlertTriangle,
  Mountain,
  Shield,
  Clock,
  Info
} from 'lucide-react';

export default function LocalRiskPanel({
  localRiskData,
  selectedDistrict = 'Puri',
  selectedState = 'Odisha'
}) {
  if (!localRiskData) {
    return (
      <div className="cz-risk-panel cz-empty-card">
        <Info size={18} className="text-muted" />
        <span>Local hazard telemetry is loading...</span>
      </div>
    );
  }

  const hazards = [
    {
      id: 'wind',
      title: 'STRONG WIND',
      icon: Wind,
      data: localRiskData.wind
    },
    {
      id: 'rain',
      title: 'HEAVY RAIN',
      icon: CloudRain,
      data: localRiskData.rainfall
    },
    {
      id: 'flood',
      title: 'FLOODING',
      icon: Waves,
      data: localRiskData.flooding
    },
    {
      id: 'coastal',
      title: 'COASTAL / STORM-SURGE',
      icon: Waves,
      data: localRiskData.coastal
    },
    {
      id: 'landslide',
      title: 'LANDSLIDE RISK',
      icon: Mountain,
      data: localRiskData.landslide
    }
  ];

  const getLevelBadgeClass = (level) => {
    switch ((level || '').toUpperCase()) {
      case 'SEVERE':
        return 'level-severe';
      case 'HIGH':
        return 'level-high';
      case 'MODERATE':
        return 'level-moderate';
      case 'LOW':
        return 'level-low';
      default:
        return 'level-na';
    }
  };

  return (
    <section className="cz-risk-panel" aria-labelledby="local-risk-panel-title">
      <div className="cz-risk-panel-header">
        <div>
          <div className="panel-sub-label">HAZARD IMPACT FOR YOUR REGION</div>
          <h2 id="local-risk-panel-title" className="panel-title">
            RISK IN MY AREA — {selectedDistrict.toUpperCase()}
          </h2>
        </div>
        <div className="panel-note-pill">
          <Shield size={12} className="text-accent" />
          <span>PLAIN LANGUAGE ASSESSMENT</span>
        </div>
      </div>

      <div className="cz-hazard-grid">
        {hazards.map((h) => {
          const Icon = h.icon;
          const hData = h.data || {};
          const level = hData.level || 'N/A';
          const isNA = level === 'N/A';

          return (
            <div
              key={h.id}
              className={`hazard-card ${getLevelBadgeClass(level)}`}
              role="region"
              aria-label={`${h.title}: ${level} Risk`}
            >
              {/* Card Header */}
              <div className="hazard-card-head">
                <div className="hazard-icon-box">
                  <Icon size={18} />
                </div>
                <div className="hazard-title-wrap">
                  <h3 className="hazard-title">{h.title}</h3>
                  <span className="hazard-metric font-mono">{hData.metric}</span>
                </div>
              </div>

              {/* Prominent Risk Level Badge (Both text + visual) */}
              <div className="hazard-level-badge-row">
                <span className={`hazard-level-pill ${getLevelBadgeClass(level)}`}>
                  {level === 'N/A' ? 'N/A — NOT MONITORED' : `${level} RISK`}
                </span>
                <span className="data-provenance-tag font-mono">
                  {hData.dataStatus || 'DEMO DATA'}
                </span>
              </div>

              {/* Citizen-friendly explanation */}
              <p className="hazard-explanation">{hData.explanation}</p>

              {/* Data Provenance Footer */}
              <div className="hazard-footer">
                <div className="source-info">
                  <span className="src-label">SOURCE:</span>
                  <span className="src-val">{hData.source || 'Standard Inundation Model'}</span>
                </div>
                <div className="time-info font-mono">
                  <Clock size={11} />
                  <span>{hData.lastUpdated || '03 Sep 12:00 UTC'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .cz-risk-panel {
          background: #091326;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .cz-risk-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          padding-bottom: 12px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .panel-sub-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-cyan);
          letter-spacing: 0.05em;
        }
        .panel-title {
          font-size: 17px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.02em;
        }
        .panel-note-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--text-secondary);
          background: rgba(15, 25, 45, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.2);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
        }
        .cz-hazard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px;
        }
        .hazard-card {
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: transform 0.15s ease, border-color 0.15s ease;
        }
        .hazard-card:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 229, 255, 0.3);
        }
        .hazard-card.level-severe {
          border-left: 4px solid #dc2626;
        }
        .hazard-card.level-high {
          border-left: 4px solid #ef4444;
        }
        .hazard-card.level-moderate {
          border-left: 4px solid #f59e0b;
        }
        .hazard-card.level-low {
          border-left: 4px solid #10b981;
        }
        .hazard-card.level-na {
          border-left: 4px solid #64748b;
          opacity: 0.85;
        }
        .hazard-card-head {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .hazard-icon-box {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          background: rgba(15, 25, 45, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-cyan);
          flex-shrink: 0;
        }
        .hazard-title-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .hazard-title {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.03em;
        }
        .hazard-metric {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .hazard-level-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
          border-top: 1px solid rgba(148, 163, 184, 0.08);
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
        }
        .hazard-level-pill {
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          letter-spacing: 0.04em;
        }
        .hazard-level-pill.level-severe {
          background: rgba(220, 38, 38, 0.2);
          border: 1px solid #dc2626;
          color: #fca5a5;
        }
        .hazard-level-pill.level-high {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          color: #fca5a5;
        }
        .hazard-level-pill.level-moderate {
          background: rgba(245, 158, 11, 0.2);
          border: 1px solid #f59e0b;
          color: #fde68a;
        }
        .hazard-level-pill.level-low {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid #10b981;
          color: #6ee7b7;
        }
        .hazard-level-pill.level-na {
          background: rgba(100, 116, 139, 0.2);
          border: 1px solid #64748b;
          color: #cbd5e1;
        }
        .data-provenance-tag {
          font-size: 9px;
          color: var(--text-muted);
          font-weight: 600;
        }
        .hazard-explanation {
          font-size: 12px;
          color: var(--text-primary);
          line-height: 1.45;
          margin: 0;
          min-height: 48px;
        }
        .hazard-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10px;
          color: var(--text-muted);
          margin-top: auto;
          padding-top: 6px;
        }
        .source-info {
          display: flex;
          align-items: center;
          gap: 4px;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .src-label {
          font-weight: 700;
        }
        .src-val {
          color: var(--text-secondary);
        }
        .time-info {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>
    </section>
  );
}

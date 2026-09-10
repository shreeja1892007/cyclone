import React, { useState } from 'react';
import {
  Thermometer,
  Gauge,
  Droplets,
  RotateCw,
  Wind,
  Info,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import { PARAMETER_INFO } from '../services/mockData';

export default function EnvironmentalCards({ frameData }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const env = frameData?.environment || {};
  const timeLabel = frameData?.displayTime?.split(' ')[1] + ' ' + frameData?.displayTime?.split(' ')[2] || '12:00 UTC';

  const cards = [
    {
      id: 'sst',
      title: 'Sea Surface Temperature',
      acronym: 'SST',
      value: env.sst?.value ?? 29.3,
      unit: '°C',
      level: 'Surface',
      source: 'ERA5',
      time: timeLabel,
      trend: env.sst?.trend || '+0.4 °C / 24 h',
      trendType: 'up',
      status: env.sst?.status || 'available',
      threshold: '≥ 26.5 °C (Thermal threshold met)',
      icon: Thermometer,
      accent: '#f59e0b'
    },
    {
      id: 'mslp',
      title: 'Mean Sea-Level Pressure',
      acronym: 'MSLP',
      value: env.mslp?.value ?? 1004,
      unit: 'hPa',
      level: 'Surface',
      source: 'ERA5',
      time: timeLabel,
      trend: env.mslp?.trend || 'Falling',
      trendType: 'down',
      status: env.mslp?.status || 'available',
      threshold: '1004 hPa (Deepening low anomaly)',
      icon: Gauge,
      accent: '#00e5ff'
    },
    {
      id: 'rh500',
      title: 'Relative Humidity',
      acronym: 'RH 500',
      value: env.rh500?.value ?? 74,
      unit: '%',
      level: '500 hPa',
      source: 'ERA5',
      time: timeLabel,
      trend: env.rh500?.trend || 'High Mid-Level Moisture',
      trendType: 'steady',
      status: env.rh500?.status || 'available',
      threshold: '≥ 70% (Moist mid-troposphere)',
      icon: Droplets,
      accent: '#38bdf8'
    },
    {
      id: 'vorticity850',
      title: 'Relative Vorticity',
      acronym: 'Vorticity 850',
      value: env.vorticity850?.value ? `${env.vorticity850.value} × 10⁻⁵` : '8.3 × 10⁻⁵',
      unit: 's⁻¹',
      level: '850 hPa',
      source: 'ERA5',
      time: timeLabel,
      trend: env.vorticity850?.trend || 'Increasing',
      trendType: 'up',
      status: env.vorticity850?.status || 'available',
      threshold: '≥ 5.0 × 10⁻⁵ s⁻¹ (Strong spin)',
      icon: RotateCw,
      accent: '#14b8a6'
    },
    {
      id: 'windShear',
      title: 'Vertical Wind Shear',
      acronym: 'VWS',
      value: env.windShear?.value ?? 12,
      unit: 'm/s',
      level: '850–200 hPa',
      source: 'Backend / Derived',
      time: timeLabel,
      trend: `Interpretation: ${env.windShear?.interpretation || 'Moderate'}`,
      trendType: 'steady',
      status: env.windShear?.status || 'available',
      threshold: '< 15 m/s (Permits column alignment)',
      icon: Wind,
      accent: '#a855f7'
    }
  ];

  return (
    <div className="environmental-section">
      <div className="section-title-row">
        <div className="section-title-left">
          <Wind size={16} className="text-accent" />
          <h2 className="text-h2" style={{ fontSize: '15px' }}>Environmental Evidence & Atmospheric Parameters</h2>
        </div>
        <span className="sci-badge sci-badge-cyan font-mono">ECMWF ERA5 Reanalysis & Diagnostic Drivers</span>
      </div>

      <div className="env-cards-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          const info = PARAMETER_INFO[card.id];
          const isTooltipOpen = activeTooltip === card.id;

          return (
            <div key={card.id} className="sci-card env-param-card">
              {/* Header */}
              <div className="env-card-header">
                <div className="env-card-title-group">
                  <Icon size={14} style={{ color: card.accent }} />
                  <span className="env-card-name">{card.title}</span>
                  <span className="env-acronym font-mono">[{card.acronym}]</span>
                </div>

                <div className="env-header-actions">
                  <button
                    className={`info-tooltip-btn ${isTooltipOpen ? 'active' : ''}`}
                    onClick={() => setActiveTooltip(isTooltipOpen ? null : card.id)}
                    title="Educational scientific explanation"
                    aria-label={`About ${card.title}`}
                  >
                    <Info size={13} />
                  </button>
                  <StatusBadge status={card.status} size="sm" />
                </div>
              </div>

              {/* Educational Tooltip Popover */}
              {isTooltipOpen && info && (
                <div className="param-edu-popover">
                  <div className="edu-popover-title font-mono">{info.fullName} ({info.acronym})</div>
                  <p className="edu-popover-desc">{info.description}</p>
                  <div className="edu-popover-threshold">
                    <span className="thresh-label">Benchmark Threshold:</span> {info.threshold}
                  </div>
                </div>
              )}

              {/* Numeric Value & Unit */}
              <div className="env-value-display">
                <span className="env-num font-mono">{card.value}</span>
                <span className="env-unit">{card.unit}</span>
              </div>

              {/* Threshold Met Indicator */}
              <div className="env-threshold-bar">
                <div className="thresh-indicator-dot" style={{ backgroundColor: card.accent }}></div>
                <span className="thresh-text">{card.threshold}</span>
              </div>

              {/* Detailed Metadata Grid */}
              <div className="env-meta-grid">
                <div className="env-meta-item">
                  <span className="meta-label">Level:</span>
                  <span className="meta-val font-mono">{card.level}</span>
                </div>
                <div className="env-meta-item">
                  <span className="meta-label">Source:</span>
                  <span className="meta-val">{card.source}</span>
                </div>
                <div className="env-meta-item">
                  <span className="meta-label">Obs Time:</span>
                  <span className="meta-val font-mono">{card.time}</span>
                </div>
                <div className="env-meta-item">
                  <span className="meta-label">Trend:</span>
                  <span className="meta-val trend-val">
                    {card.trendType === 'up' && <TrendingUp size={11} className="text-accent" />}
                    {card.trendType === 'down' && <TrendingDown size={11} className="text-secondary" />}
                    {card.trendType === 'steady' && <Minus size={11} className="text-muted" />}
                    <span>{card.trend}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .environmental-section {
          margin-bottom: var(--space-4);
        }
        .section-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-3);
        }
        .section-title-left {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .env-cards-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--space-3);
        }
        .env-param-card {
          padding: var(--space-3);
          display: flex;
          flex-direction: column;
          position: relative;
          background-color: #0b1424;
        }
        .env-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 4px;
          margin-bottom: var(--space-2);
        }
        .env-card-title-group {
          display: flex;
          align-items: center;
          gap: 5px;
          flex-wrap: wrap;
        }
        .env-card-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .env-acronym {
          font-size: 10px;
          color: var(--text-muted);
        }
        .env-header-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .info-tooltip-btn {
          color: var(--text-muted);
          padding: 2px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .info-tooltip-btn:hover, .info-tooltip-btn.active {
          color: var(--accent-cyan);
          background: rgba(0, 229, 255, 0.12);
        }
        .param-edu-popover {
          position: absolute;
          top: 36px;
          left: 10px;
          right: 10px;
          z-index: 100;
          background: #0d1a33;
          border: 1px solid var(--accent-cyan);
          border-radius: var(--radius-md);
          padding: var(--space-3);
          box-shadow: var(--shadow-lg);
          font-size: 11px;
        }
        .edu-popover-title {
          font-weight: 700;
          color: var(--accent-cyan);
          margin-bottom: 4px;
        }
        .edu-popover-desc {
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 6px;
        }
        .edu-popover-threshold {
          font-size: 10px;
          color: var(--text-muted);
          border-top: 1px dotted rgba(148, 163, 184, 0.15);
          padding-top: 4px;
        }
        .thresh-label {
          color: var(--accent-teal);
        }
        .env-value-display {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: var(--space-2);
        }
        .env-num {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }
        .env-unit {
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .env-threshold-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(148, 163, 184, 0.05);
          padding: 4px 6px;
          border-radius: var(--radius-sm);
          margin-bottom: var(--space-2);
        }
        .thresh-indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .thresh-text {
          font-size: 10px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .env-meta-grid {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 11px;
          margin-top: auto;
          border-top: 1px dotted rgba(148, 163, 184, 0.08);
          padding-top: 6px;
        }
        .env-meta-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .meta-label {
          color: var(--text-muted);
        }
        .meta-val {
          color: var(--text-secondary);
        }
        .trend-val {
          display: flex;
          align-items: center;
          gap: 3px;
          color: var(--text-primary);
          font-weight: 500;
        }
        @media (max-width: 1400px) {
          .env-cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 900px) {
          .env-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .env-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

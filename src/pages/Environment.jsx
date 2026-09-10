import React from 'react';
import EnvironmentalCards from '../components/EnvironmentalCards';
import { Wind, Waves, Gauge, Thermometer, Layers, CheckCircle2, AlertTriangle } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function Environment({ frameData }) {
  const levels = [
    {
      level: 'Surface (1000 hPa)',
      param: 'Sea Surface Temperature & MSLP',
      value: '29.3 °C | 1004 hPa',
      status: 'Favorable (Thermal threshold exceeded; deepening surface pressure)',
      code: 'sst_mslp'
    },
    {
      level: '850 hPa (~1.5 km)',
      param: 'Low-Level Vorticity & Horizontal Wind',
      value: '8.3 × 10⁻⁵ s⁻¹ | 15 kt cyclonic spin',
      status: 'Favorable (Strong cyclonic shear vorticity supporting boundary layer assembly)',
      code: 'vort850'
    },
    {
      level: '700 hPa (~3.0 km)',
      param: 'Lower-Middle Tropospheric Moisture',
      value: '78% Relative Humidity',
      status: 'Favorable (High lower-level moisture preventing dry air entrainment)',
      code: 'rh700'
    },
    {
      level: '500 hPa (~5.8 km)',
      param: 'Mid-Tropospheric Relative Humidity',
      value: '74% Relative Humidity',
      status: 'Favorable (Suppresses convective downdrafts)',
      code: 'rh500'
    },
    {
      level: '200 hPa (~12.0 km)',
      param: 'Upper-Tropospheric Outflow & Wind Shear',
      value: 'VWS: 12 m/s (850–200 hPa layer difference)',
      status: 'Moderate (Permits vertical column alignment without excessive tilt)',
      code: 'shear'
    }
  ];

  return (
    <div className="environment-page">
      <div className="page-header">
        <div>
          <h1 className="text-h1">Environmental Meteorological Parameters</h1>
          <p className="header-subtitle">
            ECMWF ERA5 Reanalysis & Diagnostic Drivers for Tropical Cyclogenesis
          </p>
        </div>
        <div className="page-header-badges">
          <StatusBadge status="available" label="ERA5 Pipeline Active" />
          <span className="sci-badge sci-badge-cyan">Resolution: 0.25° × 0.25°</span>
        </div>
      </div>

      {/* Primary 5 Environmental Cards */}
      <EnvironmentalCards frameData={frameData} />

      {/* Atmospheric Vertical Profile Table */}
      <div className="sci-card vertical-profile-card">
        <div className="sci-card-header">
          <div className="sci-card-title">
            <Layers size={15} className="text-accent" /> Atmospheric Sounding & Vertical Profile Breakdown
          </div>
          <span className="sci-badge sci-badge-teal font-mono">Gray-McBride Genesis Parameters</span>
        </div>

        <div className="profile-table">
          <div className="profile-table-head font-mono">
            <span>Pressure Level</span>
            <span>Key Diagnostic Variables</span>
            <span>Analyzed Value (03 Sep 12Z)</span>
            <span>Thermodynamic Assessment</span>
          </div>
          {levels.map((item, idx) => (
            <div key={idx} className="profile-table-row">
              <span className="level-col font-mono text-accent">{item.level}</span>
              <span className="param-col">{item.param}</span>
              <span className="val-col font-mono">{item.value}</span>
              <span className="status-col">
                <CheckCircle2 size={13} className="text-available" style={{ display: 'inline', marginRight: 4 }} />
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .environment-page {
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
        }
        .page-header-badges {
          display: flex;
          gap: var(--space-2);
        }
        .vertical-profile-card {
          background: #091222;
        }
        .profile-table {
          display: flex;
          flex-direction: column;
          font-size: 12px;
        }
        .profile-table-head {
          display: grid;
          grid-template-columns: 180px 220px 220px 1fr;
          gap: var(--space-3);
          padding: 8px 12px;
          background: rgba(148, 163, 184, 0.05);
          color: var(--text-dim);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          border-radius: var(--radius-sm);
        }
        .profile-table-row {
          display: grid;
          grid-template-columns: 180px 220px 220px 1fr;
          gap: var(--space-3);
          padding: 10px 12px;
          border-bottom: 1px dotted rgba(148, 163, 184, 0.08);
          align-items: center;
        }
        .level-col {
          font-weight: 600;
        }
        .param-col {
          color: var(--text-primary);
          font-weight: 500;
        }
        .val-col {
          color: var(--text-secondary);
        }
        .status-col {
          color: var(--text-secondary);
          line-height: 1.35;
        }
        @media (max-width: 1024px) {
          .profile-table-head, .profile-table-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

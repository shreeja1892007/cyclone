import React from 'react';
import { Layers, ShieldCheck, CheckCircle2, AlertTriangle, Clock, HelpCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function DataQualityPanel({ frameData }) {
  const quality = frameData?.dataQuality || {
    satelliteIR: 'available',
    waterVapour: 'available',
    sst: 'available',
    wind850: 'available',
    wind200: 'missing',
    radar: 'not_used',
    completeness: '92% — Demo'
  };

  const sensorRows = [
    { label: 'Satellite IR (10.8 µm)', key: 'satelliteIR', sensor: 'INSAT-3DR Imager', status: quality.satelliteIR },
    { label: 'Water Vapour (6.7 µm)', key: 'waterVapour', sensor: 'INSAT-3DR Imager', status: quality.waterVapour },
    { label: 'Sea Surface Temp (SST)', key: 'sst', sensor: 'ERA5 / OISST', status: quality.sst },
    { label: '850 hPa Lower Wind Field', key: 'wind850', sensor: 'ERA5 Synoptic Grid', status: quality.wind850 },
    { label: '200 hPa Upper Wind Field', key: 'wind200', sensor: 'ERA5 Synoptic Grid', status: quality.wind200 },
    { label: 'Doppler Weather Radar (DWR)', key: 'radar', sensor: 'Coastal Radars (IMD)', status: quality.radar }
  ];

  return (
    <div className="sci-card quality-panel-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <Layers size={15} className="text-accent" /> Data Quality & Input Completeness
        </div>
        <span className="sci-badge sci-badge-green font-mono">{quality.completeness}</span>
      </div>

      <div className="quality-sensors-table">
        {sensorRows.map((row) => (
          <div key={row.key} className="quality-table-row">
            <div className="row-info">
              <span className="row-name">{row.label}</span>
              <span className="row-sensor">{row.sensor}</span>
            </div>
            <div className="row-status">
              <StatusBadge status={row.status} />
            </div>
          </div>
        ))}
      </div>

      <div className="quality-footer">
        <span className="quality-note">
          Quality status flags: <strong>Available</strong>, <strong>Delayed</strong>, <strong>Missing</strong>, <strong>Interpolated</strong>, <strong>Not Used</strong>.
        </span>
      </div>

      <style>{`
        .quality-panel-card {
          display: flex;
          flex-direction: column;
          background: #0b1424;
          height: 100%;
        }
        .quality-sensors-table {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: var(--space-3);
        }
        .quality-table-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 10px;
          background: rgba(148, 163, 184, 0.04);
          border: 1px solid rgba(148, 163, 184, 0.08);
          border-radius: var(--radius-sm);
        }
        .row-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .row-name {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-primary);
        }
        .row-sensor {
          font-size: 10px;
          color: var(--text-muted);
        }
        .quality-footer {
          margin-top: auto;
          font-size: 11px;
          color: var(--text-muted);
          border-top: 1px dotted rgba(148, 163, 184, 0.1);
          padding-top: var(--space-2);
        }
      `}</style>
    </div>
  );
}

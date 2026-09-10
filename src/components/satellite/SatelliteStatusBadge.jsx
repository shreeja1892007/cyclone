import React from 'react';

export default function SatelliteStatusBadge({ status, label, size = 'md' }) {
  const norm = (status || '').toLowerCase().replace(/[\s-]/g, '_');

  let badgeClass = 'sat-badge-neutral';
  let defaultLabel = status || 'UNKNOWN';

  switch (norm) {
    case 'available':
    case 'connected':
    case 'operational':
      badgeClass = 'sat-badge-success';
      defaultLabel = label || 'AVAILABLE';
      break;

    case 'demo_data':
    case 'demo':
      badgeClass = 'sat-badge-demo';
      defaultLabel = label || 'DEMO DATA';
      break;

    case 'not_connected':
    case 'offline':
    case 'disconnected':
      badgeClass = 'sat-badge-danger';
      defaultLabel = label || 'NOT CONNECTED';
      break;

    case 'no_data':
    case 'no_observation':
    case 'no_data_for_selected_time':
      badgeClass = 'sat-badge-amber';
      defaultLabel = label || 'NO DATA';
      break;

    case 'temporally_aligned':
    case 'aligned':
      badgeClass = 'sat-badge-teal';
      defaultLabel = label || 'TEMPORALLY ALIGNED';
      break;

    case 'time_mismatch':
    case 'delayed':
      badgeClass = 'sat-badge-amber';
      defaultLabel = label || 'TIME MISMATCH';
      break;

    case 'overlapping_coverage':
    case 'overlapping':
      badgeClass = 'sat-badge-teal';
      defaultLabel = label || 'OVERLAPPING COVERAGE';
      break;

    case 'partial_overlap':
      badgeClass = 'sat-badge-amber';
      defaultLabel = label || 'PARTIAL OVERLAP';
      break;

    case 'no_overlapping_coverage':
      badgeClass = 'sat-badge-danger';
      defaultLabel = label || 'NO OVERLAPPING COVERAGE';
      break;

    case 'matched':
      badgeClass = 'sat-badge-teal';
      defaultLabel = label || 'MATCHED';
      break;

    case 'resampling_required':
      badgeClass = 'sat-badge-amber';
      defaultLabel = label || 'RESAMPLING REQUIRED';
      break;

    case 'not_compatible':
      badgeClass = 'sat-badge-danger';
      defaultLabel = label || 'NOT COMPATIBLE';
      break;

    case 'consistent_observations':
      badgeClass = 'sat-badge-success';
      defaultLabel = label || 'CONSISTENT OBSERVATIONS';
      break;

    case 'secondary_source_not_connected':
      badgeClass = 'sat-badge-neutral';
      defaultLabel = label || 'SECONDARY SOURCE NOT CONNECTED';
      break;

    default:
      badgeClass = 'sat-badge-neutral';
      defaultLabel = label || status || 'UNKNOWN';
  }

  return (
    <span className={`sat-status-badge ${badgeClass} ${size === 'sm' ? 'sat-badge-sm' : ''} font-mono`}>
      <span className="sat-badge-dot" />
      {label || defaultLabel}

      <style>{`
        .sat-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 2px 7px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.03em;
          white-space: nowrap;
          text-transform: uppercase;
        }
        .sat-badge-sm {
          font-size: 9.5px;
          padding: 1px 5px;
          gap: 3.5px;
        }
        .sat-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 5px currentColor;
        }
        .sat-badge-success {
          background: rgba(16, 185, 129, 0.12);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.35);
        }
        .sat-badge-teal {
          background: rgba(20, 184, 166, 0.12);
          color: #14b8a6;
          border: 1px solid rgba(20, 184, 166, 0.35);
        }
        .sat-badge-demo {
          background: rgba(56, 189, 248, 0.12);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.35);
        }
        .sat-badge-amber {
          background: rgba(245, 158, 11, 0.12);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.35);
        }
        .sat-badge-danger {
          background: rgba(239, 68, 68, 0.12);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.35);
        }
        .sat-badge-neutral {
          background: rgba(148, 163, 184, 0.1);
          color: #94a3b8;
          border: 1px solid rgba(148, 163, 184, 0.25);
        }
      `}</style>
    </span>
  );
}

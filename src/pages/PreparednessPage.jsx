import React from 'react';
import {
  FileSpreadsheet,
  Shield,
  Building2,
  Users,
  Anchor,
  Zap,
  Package,
  HeartPulse,
  Radio,
  AlertCircle
} from 'lucide-react';
import { PREPAREDNESS_INDICATORS } from '../services/mockData';

export default function PreparednessPage({ preparednessList = PREPAREDNESS_INDICATORS }) {
  const getIcon = (id) => {
    switch (id) {
      case 'prep-eoc': return <Radio size={18} className="text-accent" />;
      case 'prep-shelter': return <Building2 size={18} className="text-amber" />;
      case 'prep-evac': return <Users size={18} className="text-danger" />;
      case 'prep-rescue': return <Shield size={18} className="text-success" />;
      case 'prep-med': return <HeartPulse size={18} className="text-danger" />;
      case 'prep-power': return <Zap size={18} className="text-amber" />;
      case 'prep-relief': return <Package size={18} className="text-secondary" />;
      case 'prep-port': return <Anchor size={18} className="text-accent" />;
      default: return <FileSpreadsheet size={18} className="text-muted" />;
    }
  };

  return (
    <div className="preparedness-page-wrapper">
      <div className="sci-card prep-banner-card">
        <div className="prep-banner-title-group">
          <FileSpreadsheet size={20} className="text-accent" />
          <div>
            <h2 className="prep-main-title">Multi-Agency Disaster Preparedness Overview</h2>
            <p className="prep-sub-title">Future-Ready State & District Inter-Agency Integration Module</p>
          </div>
        </div>
        <span className="sci-badge sci-badge-amber font-mono">GOVERNMENT TELEMETRY AUDIT</span>
      </div>

      {/* INTEGRITY NOTICE */}
      <div className="prep-notice-banner">
        <AlertCircle size={15} className="text-amber" />
        <span>
          In compliance with scientific and administrative integrity rules, unverified operational datasets are not simulated.
          Fields without authenticated state government feeds explicitly report <strong>Data source not connected</strong> or <strong>N/A</strong>.
        </span>
      </div>

      <div className="prep-grid">
        {preparednessList.map((item) => (
          <div key={item.id} className={`prep-item-card ${item.dataConnected ? 'conn-active' : 'conn-offline'}`}>
            <div className="prep-card-top">
              <div className="prep-icon-wrap">
                {getIcon(item.id)}
              </div>
              <span className={`prep-status-badge ${item.dataConnected ? 'badge-on' : 'badge-off'}`}>
                {item.dataConnected ? 'Telemetry Connected' : 'Source Not Connected'}
              </span>
            </div>

            <h3 className="prep-item-title">{item.label}</h3>

            <div className="prep-item-status-display">
              <span className="status-label-k">Current Status:</span>
              <span className={`status-val-v font-bold ${item.dataConnected ? 'text-primary' : 'text-amber'}`}>
                {item.status}
              </span>
            </div>

            <p className="prep-item-notes">{item.notes}</p>

            <div className="prep-item-footer font-mono">
              <span>Integration Protocol: {item.dataConnected ? 'EOC Telemetry v1' : 'Awaiting State API Key'}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .preparedness-page-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .prep-banner-card {
          background: #091326;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-lg);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .prep-banner-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .prep-main-title {
          font-size: 17px;
          font-weight: 800;
          color: #ffffff;
        }
        .prep-sub-title {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .prep-notice-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 12px;
          color: #fde68a;
          line-height: 1.4;
        }
        .prep-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-3);
        }
        .prep-item-card {
          background: var(--bg-surface);
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 170px;
        }
        .conn-active {
          border-color: rgba(0, 229, 255, 0.3);
          background: rgba(0, 229, 255, 0.03);
        }
        .conn-offline {
          border-color: rgba(148, 163, 184, 0.15);
          opacity: 0.85;
        }
        .prep-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .prep-icon-wrap {
          width: 32px;
          height: 32px;
          background: #111d35;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .prep-status-badge {
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .badge-on {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.35);
        }
        .badge-off {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.35);
        }
        .prep-item-title {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
        }
        .prep-item-status-display {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 6px;
        }
        .status-label-k {
          font-size: 9px;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .status-val-v {
          font-size: 12px;
        }
        .prep-item-notes {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 10px;
        }
        .prep-item-footer {
          font-size: 9px;
          color: var(--text-muted);
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          padding-top: 6px;
        }
        @media (max-width: 1400px) {
          .prep-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .prep-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

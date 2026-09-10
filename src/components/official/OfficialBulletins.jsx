import React from 'react';
import {
  Shield,
  Radio,
  FileCheck,
  Clock,
  MapPin,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import { OFFICIAL_BULLETINS } from '../../services/mockData';

export default function OfficialBulletins({ bulletins = OFFICIAL_BULLETINS }) {
  return (
    <div className="sci-card official-bulletins-card">
      <div className="sci-card-header official-header">
        <div className="sci-card-title">
          <Shield size={16} className="text-blue" />
          <span>OFFICIAL METEOROLOGICAL INFORMATION</span>
        </div>
        <div className="sci-card-actions">
          <span className="official-authority-badge font-mono">OFFICIAL GOVERNMENT FEED</span>
        </div>
      </div>

      <div className="official-content">
        <div className="official-notice-banner">
          <Radio size={14} className="text-blue" />
          <span>Authenticated Synoptic Data Stream from Regional Specialized Meteorological Centre (RSMC) / IMD New Delhi. Not AI-generated.</span>
        </div>

        <div className="bulletins-list">
          {bulletins && bulletins.length > 0 ? (
            bulletins.map((b) => (
              <div key={b.id} className="bulletin-item">
                <div className="bulletin-top-line">
                  <div className="bulletin-auth-group">
                    <span className="bulletin-auth">{b.authority}</span>
                    <span className="bulletin-num font-mono">Bulletin #{b.bulletinNumber}</span>
                  </div>
                  <span className="bulletin-status-tag">{b.warningStatus}</span>
                </div>

                <h4 className="bulletin-title">{b.title}</h4>

                <div className="bulletin-meta-grid font-mono">
                  <div className="b-meta"><Clock size={11} /> <span>Issued: {b.issuedAt}</span></div>
                  <div className="b-meta"><Clock size={11} /> <span>Valid Until: {b.validUntil}</span></div>
                  <div className="b-meta"><MapPin size={11} /> <span>Affected: {b.affectedRegions}</span></div>
                </div>

                <div className="bulletin-summary-box">
                  <p className="b-summary-text">{b.summary}</p>
                </div>

                <div className="bulletin-action-box">
                  <span className="action-title">ACTION REQUIRED:</span>
                  <span className="action-text">{b.actionRequired}</span>
                </div>

                <div className="bulletin-footer">
                  <span className="b-source-link font-mono">Reference: {b.sourceUrl}</span>
                  <span className="sci-badge sci-badge-blue text-xs">VERIFIED OFFICIAL</span>
                </div>
              </div>
            ))
          ) : (
            <div className="official-empty-state">
              <AlertTriangle size={24} className="text-amber" />
              <div className="empty-title">Official feed not connected.</div>
              <p className="empty-desc">National Meteorological Warning API telemetry has not responded.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .official-bulletins-card {
          margin-bottom: var(--space-3);
          background: #081326;
          border: 1px solid rgba(2, 132, 199, 0.4);
        }
        .official-header {
          background: rgba(2, 132, 199, 0.12);
          border-bottom: 1px solid rgba(2, 132, 199, 0.3);
        }
        .text-blue {
          color: #38bdf8;
        }
        .official-authority-badge {
          background: #0284c7;
          color: #ffffff;
          font-size: 9px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }
        .official-content {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .official-notice-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(2, 132, 199, 0.08);
          border: 1px solid rgba(2, 132, 199, 0.2);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 11px;
          color: #93c5fd;
        }
        .bulletins-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .bulletin-item {
          background: #0c1830;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: var(--radius-md);
          padding: 12px 14px;
        }
        .bulletin-top-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .bulletin-auth-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bulletin-auth {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .bulletin-num {
          font-size: 11px;
          color: #38bdf8;
          background: rgba(2, 132, 199, 0.15);
          padding: 1px 5px;
          border-radius: 3px;
        }
        .bulletin-status-tag {
          font-size: 10px;
          font-weight: 800;
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.35);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .bulletin-title {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .bulletin-meta-grid {
          display: flex;
          gap: 16px;
          font-size: 10px;
          color: var(--text-muted);
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        .b-meta {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .bulletin-summary-box {
          background: rgba(0, 0, 0, 0.25);
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          margin-bottom: 8px;
        }
        .b-summary-text {
          font-size: 12px;
          line-height: 1.5;
          color: #cbd5e1;
        }
        .bulletin-action-box {
          display: flex;
          gap: 6px;
          font-size: 11px;
          background: rgba(239, 68, 68, 0.06);
          border-left: 3px solid #ef4444;
          padding: 6px 10px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          margin-bottom: 8px;
        }
        .action-title {
          font-weight: 800;
          color: #f87171;
          flex-shrink: 0;
        }
        .action-text {
          color: #e2e8f0;
        }
        .bulletin-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10px;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          padding-top: 6px;
        }
        .b-source-link {
          color: var(--text-muted);
        }
        .official-empty-state {
          padding: 30px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .empty-title {
          font-size: 14px;
          font-weight: 700;
          color: #f59e0b;
        }
        .empty-desc {
          font-size: 11px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

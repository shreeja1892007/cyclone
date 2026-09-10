import React from 'react';
import {
  Megaphone,
  Radio,
  Clock,
  MapPin,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { OFFICIAL_PUBLIC_COMMUNICATIONS } from '../../services/mockData';

export default function PublicCommunication({ communications = OFFICIAL_PUBLIC_COMMUNICATIONS }) {
  return (
    <div className="sci-card public-comms-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <Megaphone size={16} className="text-accent" />
          <span>Official Public Communication & Advisories</span>
          <span className="gov-direction-tag font-mono">GOVERNMENT → PEOPLE CHANNEL</span>
        </div>
        <div className="sci-card-actions">
          <span className="sci-badge sci-badge-blue">AUTHENTICATED DISPATCH</span>
        </div>
      </div>

      <div className="comms-list">
        {communications.map((comm) => (
          <div key={comm.id} className="comm-item">
            <div className="comm-head">
              <div className="comm-type-wrap">
                <Radio size={13} className="text-accent" />
                <span className="comm-type font-bold">{comm.type}</span>
              </div>
              <span className="comm-status-badge">{comm.status}</span>
            </div>

            <div className="comm-auth-row">
              <span className="comm-auth-name">{comm.authority}</span>
            </div>

            <p className="comm-text">{comm.text}</p>

            <div className="comm-meta-grid font-mono">
              <div className="c-meta"><MapPin size={11} /> <span>{comm.affectedArea}</span></div>
              <div className="c-meta"><Clock size={11} /> <span>Issued: {comm.timestamp}</span></div>
              <div className="c-meta"><ShieldCheck size={11} /> <span>Validity: {comm.validity}</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="comms-footer-note">
        <AlertCircle size={12} className="text-blue" />
        <span>Experimental AI text is legally and architecturally restricted from broadcasting via the Official Public Communication channel.</span>
      </div>

      <style>{`
        .public-comms-card {
          margin-bottom: var(--space-3);
          background: #091326;
          border: 1px solid var(--bg-card-border);
        }
        .gov-direction-tag {
          font-size: 9px;
          background: rgba(0, 229, 255, 0.1);
          color: var(--accent-cyan);
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 8px;
        }
        .comms-list {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .comm-item {
          background: var(--bg-surface);
          border: 1px solid var(--bg-card-border);
          border-left: 3px solid var(--accent-blue-light);
          border-radius: var(--radius-md);
          padding: 10px 12px;
        }
        .comm-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .comm-type-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #ffffff;
        }
        .comm-status-badge {
          font-size: 9px;
          font-weight: 700;
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.35);
          padding: 1px 6px;
          border-radius: 4px;
        }
        .comm-auth-row {
          font-size: 11px;
          color: var(--accent-cyan);
          font-weight: 600;
          margin-bottom: 6px;
        }
        .comm-text {
          font-size: 12px;
          line-height: 1.5;
          color: #e2e8f0;
          margin-bottom: 8px;
        }
        .comm-meta-grid {
          display: flex;
          gap: 14px;
          font-size: 10px;
          color: var(--text-muted);
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          padding-top: 6px;
          flex-wrap: wrap;
        }
        .c-meta {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .comms-footer-note {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(2, 132, 199, 0.08);
          border-top: 1px solid rgba(2, 132, 199, 0.2);
          padding: 8px 12px;
          font-size: 10px;
          color: #93c5fd;
        }
      `}</style>
    </div>
  );
}

import React from 'react';
import {
  PhoneCall,
  AlertTriangle,
  Clock,
  Radio,
  CheckCircle2,
  Users
} from 'lucide-react';

export default function EmergencySummary({ summary }) {
  const {
    totalActive = 5,
    critical = 2,
    high = 2,
    pendingVerification = 1,
    responding = 3,
    resolved = 1
  } = summary || {};

  return (
    <div className="emergency-summary-cards">
      {/* Active Requests */}
      <div className="sci-card e-sum-card active-card">
        <div className="e-sum-head">
          <span className="e-sum-label">ACTIVE REQUESTS</span>
          <PhoneCall size={14} className="text-accent" />
        </div>
        <div className="e-sum-val font-mono">{totalActive}</div>
        <div className="e-sum-sub">All Unresolved Distress Incidents</div>
      </div>

      {/* Critical Priority */}
      <div className="sci-card e-sum-card critical-card">
        <div className="e-sum-head">
          <span className="e-sum-label">CRITICAL PRIORITY</span>
          <AlertTriangle size={14} className="text-danger" />
        </div>
        <div className="e-sum-val font-mono text-danger">{critical}</div>
        <div className="e-sum-sub">Immediate Threat to Life</div>
      </div>

      {/* High Priority */}
      <div className="sci-card e-sum-card high-card">
        <div className="e-sum-head">
          <span className="e-sum-label">HIGH PRIORITY</span>
          <AlertTriangle size={14} className="text-amber" />
        </div>
        <div className="e-sum-val font-mono text-amber">{high}</div>
        <div className="e-sum-sub">Rising Flood / Evacuation Urgency</div>
      </div>

      {/* Pending Verification */}
      <div className="sci-card e-sum-card pending-card">
        <div className="e-sum-head">
          <span className="e-sum-label">AWAITING VERIFICATION</span>
          <Clock size={14} className="text-secondary" />
        </div>
        <div className="e-sum-val font-mono text-secondary">{pendingVerification}</div>
        <div className="e-sum-sub">EOC Desk Call / GPS Check</div>
      </div>

      {/* Teams Responding */}
      <div className="sci-card e-sum-card resp-card">
        <div className="e-sum-head">
          <span className="e-sum-label">TEAMS RESPONDING</span>
          <Radio size={14} className="text-accent" />
        </div>
        <div className="e-sum-val font-mono text-accent">{responding}</div>
        <div className="e-sum-sub">NDRF / SDRF En-route</div>
      </div>

      {/* Resolved */}
      <div className="sci-card e-sum-card resolved-card">
        <div className="e-sum-head">
          <span className="e-sum-label">RESOLVED</span>
          <CheckCircle2 size={14} className="text-success" />
        </div>
        <div className="e-sum-val font-mono text-success">{resolved}</div>
        <div className="e-sum-sub">Citizens Safely Sheltered</div>
      </div>

      <style>{`
        .emergency-summary-cards {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: var(--space-2);
          margin-bottom: var(--space-3);
        }
        .e-sum-card {
          padding: 8px 12px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #0d172a;
          border: 1px solid var(--bg-card-border);
        }
        .e-sum-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2px;
        }
        .e-sum-label {
          font-size: 9px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .e-sum-val {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .e-sum-sub {
          font-size: 10px;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .critical-card {
          border-color: rgba(239, 68, 68, 0.4);
          background: rgba(239, 68, 68, 0.05);
        }
        .high-card {
          border-color: rgba(245, 158, 11, 0.4);
          background: rgba(245, 158, 11, 0.05);
        }
        .resp-card {
          border-color: rgba(0, 229, 255, 0.4);
          background: rgba(0, 229, 255, 0.05);
        }
        .resolved-card {
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(16, 185, 129, 0.05);
        }
        @media (max-width: 1200px) {
          .emergency-summary-cards {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 650px) {
          .emergency-summary-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

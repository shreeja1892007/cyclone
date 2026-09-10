import React from 'react';
import { Clock, ShieldAlert, CheckCircle2, Radio, Users, PhoneCall, AlertTriangle } from 'lucide-react';

export default function EmergencyTimeline({ timeline = [], title = 'Incident Response Audit Trail' }) {
  const defaultSteps = [
    { time: '11:45 UTC', action: 'Distress call registered via Citizen Emergency Connect', actor: 'Citizen', status: 'RECEIVED' },
    { time: '11:48 UTC', action: 'GPS & telecom verification initiated by desk officer', actor: 'EOC Verification Desk', status: 'PENDING VERIFICATION' },
    { time: '11:52 UTC', action: 'Coordinates and inundation verified via local panchayat radio', actor: 'EOC Duty Officer', status: 'VERIFIED' },
    { time: '11:55 UTC', action: 'Incident escalated to CRITICAL priority based on 6 reported persons', actor: 'Incident Commander', status: 'PRIORITIZED' },
    { time: '12:02 UTC', action: 'ODRAF Rescue Team 02 assigned for coastal evacuation', actor: 'Dispatch Officer', status: 'TEAM ASSIGNED' },
    { time: '12:08 UTC', action: 'Inflatable boat unit dispatched to site', actor: 'Field Dispatch', status: 'RESPONDING' }
  ];

  const stepsToDisplay = timeline && timeline.length > 0 ? timeline : defaultSteps;

  return (
    <div className="sci-card emergency-timeline-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <Clock size={15} className="text-accent" />
          <span>{title}</span>
        </div>
        <span className="sci-badge sci-badge-cyan font-mono">PROTOTYPE RESPONSE COORDINATION</span>
      </div>

      <div className="timeline-progression-bar">
        <span className="step-tag tag-active">RECEIVED</span>
        <span className="arrow-sep">→</span>
        <span className="step-tag tag-active">PENDING VERIFICATION</span>
        <span className="arrow-sep">→</span>
        <span className="step-tag tag-active">VERIFIED</span>
        <span className="arrow-sep">→</span>
        <span className="step-tag tag-active">PRIORITIZED</span>
        <span className="arrow-sep">→</span>
        <span className="step-tag tag-active">TEAM ASSIGNED</span>
        <span className="arrow-sep">→</span>
        <span className="step-tag tag-active">RESPONDING</span>
        <span className="arrow-sep">→</span>
        <span className="step-tag">RESOLVED</span>
      </div>

      <div className="timeline-items-list">
        {stepsToDisplay.map((step, idx) => (
          <div key={idx} className="timeline-entry">
            <div className="timeline-dot-col">
              <span className="timeline-dot"></span>
              {idx < stepsToDisplay.length - 1 && <span className="timeline-line"></span>}
            </div>
            <div className="timeline-entry-body">
              <div className="entry-header">
                <span className="entry-time font-mono">{step.time}</span>
                <span className="entry-actor font-mono">{step.actor}</span>
              </div>
              <p className="entry-action">{step.action}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="prototype-coordination-notice">
        <ShieldAlert size={13} className="text-amber" />
        <span>PROTOTYPE RESPONSE COORDINATION — Demonstration incident log. No real rescue services are dispatched.</span>
      </div>

      <style>{`
        .emergency-timeline-card {
          padding: 12px;
          background: #091326;
          border: 1px solid var(--bg-card-border);
        }
        .timeline-progression-bar {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
          padding: 8px 10px;
          background: rgba(15, 25, 45, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: var(--radius-sm);
          margin-bottom: 12px;
        }
        .step-tag {
          font-size: 9px;
          font-weight: 700;
          font-family: monospace;
          color: var(--text-muted);
          background: rgba(148, 163, 184, 0.1);
          padding: 2px 6px;
          border-radius: 3px;
        }
        .tag-active {
          color: #00e5ff;
          background: rgba(0, 229, 255, 0.12);
          border: 1px solid rgba(0, 229, 255, 0.3);
        }
        .arrow-sep {
          color: var(--text-muted);
          font-size: 10px;
        }
        .timeline-items-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 10px;
        }
        .timeline-entry {
          display: flex;
          gap: 10px;
        }
        .timeline-dot-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 14px;
        }
        .timeline-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00e5ff;
          box-shadow: 0 0 6px rgba(0, 229, 255, 0.5);
          margin-top: 5px;
        }
        .timeline-line {
          width: 2px;
          flex: 1;
          min-height: 24px;
          background: rgba(148, 163, 184, 0.2);
        }
        .timeline-entry-body {
          flex: 1;
          padding-bottom: 12px;
        }
        .entry-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 2px;
        }
        .entry-time {
          font-size: 11px;
          color: var(--accent-cyan);
          font-weight: 700;
        }
        .entry-actor {
          font-size: 10px;
          color: var(--text-muted);
          background: rgba(148, 163, 184, 0.08);
          padding: 1px 5px;
          border-radius: 3px;
        }
        .entry-action {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0;
        }
        .prototype-coordination-notice {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: var(--text-muted);
          padding: 6px 10px;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: var(--radius-sm);
        }
      `}</style>
    </div>
  );
}

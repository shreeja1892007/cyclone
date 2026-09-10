import React, { useState, useEffect } from 'react';
import {
  LifeBuoy,
  Clock,
  Shield,
  CheckCircle2,
  AlertCircle,
  Users,
  MapPin,
  RefreshCw,
  PhoneCall,
  Activity
} from 'lucide-react';
import { emergencyService } from '../../services/emergencyService';

const WORKFLOW_STEPS = [
  { id: 'Received', label: 'Received', step: 1 },
  { id: 'Pending Verification', label: 'Verification', step: 2 },
  { id: 'Verified', label: 'Verified', step: 3 },
  { id: 'Prioritized', label: 'Prioritized', step: 4 },
  { id: 'Team Assigned', label: 'Team Assigned', step: 5 },
  { id: 'Responding', label: 'Responding', step: 6 },
  { id: 'Resolved', label: 'Resolved', step: 7 }
];

export default function MyEmergencyStatus({ onOpenEmergencyForm }) {
  const [requests, setRequests] = useState([]);
  const [selectedReqId, setSelectedReqId] = useState(null);

  useEffect(() => {
    const unsubscribe = emergencyService.subscribe((reqs) => {
      setRequests(reqs || []);
      if (reqs && reqs.length > 0 && !selectedReqId) {
        setSelectedReqId(reqs[0].id);
      }
    });
    return () => unsubscribe();
  }, [selectedReqId]);

  const activeRequest = requests.find((r) => r.id === selectedReqId) || requests[0];

  const getStepNumber = (status, verification) => {
    if (status === 'Resolved') return 7;
    if (status === 'Responding') return 6;
    if (status === 'Team Assigned') return 5;
    if (status === 'Prioritized') return 4;
    if (verification === 'Verified' || status === 'Verified') return 3;
    if (verification === 'Pending Verification' || status === 'Received') return 2;
    return 1;
  };

  const currentStepNum = activeRequest ? getStepNumber(activeRequest.status, activeRequest.verification) : 1;

  return (
    <section className="cz-status-section" aria-labelledby="my-status-title">
      <div className="cz-status-header">
        <div className="status-title-wrap">
          <Activity size={18} className="text-accent" />
          <div>
            <h2 id="my-status-title" className="cz-status-title">
              MY EMERGENCY REQUEST STATUS
            </h2>
            <span className="status-sub-desc">Two-Way Tracking with Government EOC</span>
          </div>
        </div>

        <div className="sim-workflow-badge font-mono">
          <span>SIMULATED RESPONSE WORKFLOW</span>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="cz-no-request-box">
          <LifeBuoy size={36} className="text-muted" />
          <h3 className="no-req-title">No Active Emergency Requests</h3>
          <p className="no-req-desc">
            You have not submitted any emergency distress reports during this session.
          </p>
          <button
            type="button"
            className="sci-btn sci-btn-primary sci-btn-sm"
            onClick={onOpenEmergencyForm}
          >
            Submit Distress Report (Demo)
          </button>
        </div>
      ) : (
        <div className="cz-status-body">
          {/* Request Selector Tabs if multiple */}
          {requests.length > 1 && (
            <div className="req-selector-bar">
              <span className="req-bar-label font-mono">SELECT TICKET:</span>
              <div className="req-pills">
                {requests.slice(0, 5).map((req) => (
                  <button
                    key={req.id}
                    type="button"
                    className={`req-pill ${activeRequest?.id === req.id ? 'active' : ''}`}
                    onClick={() => setSelectedReqId(req.id)}
                  >
                    <span className="font-mono">{req.id}</span>
                    <span className="pill-status">{req.status}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Request Overview Card */}
          {activeRequest && (
            <div className="active-ticket-card">
              <div className="ticket-top-row">
                <div className="ticket-id-badge font-mono">
                  <span>ID:</span> <strong>{activeRequest.id}</strong>
                </div>
                <div className="ticket-type-pill">
                  {activeRequest.emergencyType} • {activeRequest.peopleReported} persons
                </div>
                <div className="ticket-time font-mono">
                  <Clock size={11} /> {activeRequest.timestamp}
                </div>
              </div>

              <div className="ticket-loc-strip">
                <MapPin size={13} className="text-accent" />
                <span>{activeRequest.location} ({activeRequest.district}, {activeRequest.state})</span>
              </div>

              {activeRequest.message && (
                <div className="ticket-msg-box">
                  <span className="msg-quote">"{activeRequest.message}"</span>
                </div>
              )}

              {/* Progress Flow Progression */}
              <div className="workflow-progression-wrap">
                <div className="prog-track-head">
                  <span className="prog-title font-mono">INCIDENT PROGRESSION:</span>
                  <span className="current-status-tag font-mono">
                    STATUS: <strong>{activeRequest.status}</strong>
                  </span>
                </div>

                <div className="prog-stepper">
                  {WORKFLOW_STEPS.map((s) => {
                    const isDone = s.step < currentStepNum;
                    const isCurrent = s.step === currentStepNum;

                    return (
                      <div key={s.id} className={`prog-item ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                        <div className="prog-circle">
                          {isDone ? '✓' : s.step}
                        </div>
                        <span className="prog-name">{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Assigned Team Telemetry */}
              <div className="team-assigned-strip">
                <Shield size={14} className="text-accent" />
                <div className="team-text">
                  <span className="team-label font-mono">ASSIGNED RESPONSE UNIT:</span>
                  <span className="team-val font-bold">
                    {activeRequest.assignedTeam || 'Under EOC Dispatch Evaluation'}
                  </span>
                </div>
                {activeRequest.assignedTeam !== 'Not Assigned' && (
                  <span className="sim-dispatch-chip font-mono">SIMULATED TEAM</span>
                )}
              </div>

              {/* Audit Timeline */}
              {activeRequest.timeline && activeRequest.timeline.length > 0 && (
                <div className="ticket-audit-log">
                  <span className="log-title font-mono">EOC ACTION AUDIT LOG:</span>
                  <div className="log-entries">
                    {activeRequest.timeline.map((item, idx) => (
                      <div key={idx} className="log-entry">
                        <span className="log-time font-mono">{item.time}</span>
                        <span className="log-dot">•</span>
                        <span className="log-action">{item.action}</span>
                        <span className="log-actor font-mono">[{item.actor}]</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Prototype Safety Notice */}
          <div className="cz-status-disclaimer">
            <AlertCircle size={14} className="text-amber flex-shrink-0" />
            <span>
              <strong>PROTOTYPE DEMONSTRATION:</strong> Response workflows, teams, and dispatch updates are simulated. No actual emergency personnel have been dispatched to your location. Call <strong>112</strong> for real life-saving aid.
            </span>
          </div>
        </div>
      )}

      <style>{`
        .cz-status-section {
          background: #091326;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .cz-status-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          padding-bottom: 12px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .status-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cz-status-title {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.02em;
        }
        .status-sub-desc {
          font-size: 11px;
          color: var(--accent-cyan);
          display: block;
        }
        .sim-workflow-badge {
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: #f59e0b;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
        }
        .cz-no-request-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 36px 16px;
          background: #0d1a33;
          border: 1px dashed rgba(148, 163, 184, 0.2);
          border-radius: var(--radius-md);
          text-align: center;
        }
        .no-req-title {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }
        .no-req-desc {
          font-size: 12px;
          color: var(--text-secondary);
          max-width: 360px;
          margin: 0;
        }
        .cz-status-body {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .req-selector-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .req-bar-label {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 700;
        }
        .req-pills {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .req-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-secondary);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 11px;
          cursor: pointer;
        }
        .req-pill.active {
          background: rgba(0, 229, 255, 0.15);
          border-color: var(--accent-cyan);
          color: #ffffff;
        }
        .pill-status {
          font-size: 9px;
          color: var(--accent-cyan);
          text-transform: uppercase;
        }
        .active-ticket-card {
          background: #0d1a33;
          border: 1px solid rgba(0, 229, 255, 0.2);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ticket-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ticket-id-badge {
          background: rgba(0, 229, 255, 0.1);
          border: 1px solid rgba(0, 229, 255, 0.3);
          color: var(--accent-cyan);
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          font-size: 12px;
        }
        .ticket-type-pill {
          background: rgba(239, 68, 68, 0.15);
          color: #fca5a5;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
        }
        .ticket-time {
          font-size: 11px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .ticket-loc-strip {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-primary);
          font-weight: 600;
        }
        .ticket-msg-box {
          background: rgba(15, 25, 45, 0.7);
          border-left: 3px solid var(--accent-cyan);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
        }
        .msg-quote {
          font-size: 12px;
          font-style: italic;
          color: var(--text-secondary);
        }
        .workflow-progression-wrap {
          background: rgba(15, 25, 45, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.12);
          padding: 14px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .prog-track-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .prog-title {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 700;
        }
        .current-status-tag {
          font-size: 11px;
          color: var(--status-available);
        }
        .prog-stepper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          overflow-x: auto;
          scrollbar-width: thin;
          padding: 4px 0;
        }
        .prog-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          min-width: 60px;
          position: relative;
          z-index: 2;
        }
        .prog-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #172645;
          border: 2px solid #64748b;
          color: #94a3b8;
          font-size: 10px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .prog-item.done .prog-circle {
          background: #10b981;
          border-color: #10b981;
          color: #ffffff;
        }
        .prog-item.current .prog-circle {
          background: #0284c7;
          border-color: #00e5ff;
          color: #ffffff;
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
        }
        .prog-name {
          font-size: 9px;
          color: var(--text-secondary);
          text-align: center;
          font-weight: 600;
        }
        .prog-item.current .prog-name {
          color: #00e5ff;
          font-weight: 800;
        }
        .team-assigned-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(15, 25, 45, 0.7);
          border: 1px solid rgba(0, 229, 255, 0.2);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
        }
        .team-text {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
        }
        .team-label {
          font-size: 10px;
          color: var(--text-muted);
        }
        .team-val {
          font-size: 12px;
          color: var(--accent-cyan);
        }
        .sim-dispatch-chip {
          font-size: 9px;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.1);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
        .ticket-audit-log {
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: #091326;
          padding: 10px;
          border-radius: var(--radius-sm);
        }
        .log-title {
          font-size: 9px;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }
        .log-entries {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .log-entry {
          font-size: 11px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .log-time {
          color: var(--accent-cyan);
        }
        .log-dot {
          color: var(--text-muted);
        }
        .log-action {
          color: var(--text-primary);
        }
        .log-actor {
          color: var(--text-muted);
          font-size: 10px;
        }
        .cz-status-disclaimer {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 11px;
          color: #fde68a;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          line-height: 1.45;
        }
      `}</style>
    </section>
  );
}

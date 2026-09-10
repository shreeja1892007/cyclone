import React, { useState } from 'react';
import {
  X,
  Shield,
  PhoneCall,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Send,
  Lock,
  Unlock,
  Radio,
  Building2
} from 'lucide-react';
import { emergencyService } from '../../services/emergencyService';

export default function EmergencyRequestDetail({
  request,
  onClose,
  teams = [],
  authorizedRole = 'eoc'
}) {
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [showFullPhone, setShowFullPhone] = useState(false);
  const [prioritySelect, setPrioritySelect] = useState(request.confirmedPriority || request.suggestedPriority);

  if (!request) return null;

  // Mask phone for privacy UI (Section 38)
  const maskPhone = (phone) => {
    if (!phone) return 'N/A';
    if (showFullPhone) return phone;
    return phone.replace(/(\+\d{2}\s\d{2})\d{3}\s\d{2}(\d{3})/, '$1*** **$2');
  };

  const handleVerify = () => {
    emergencyService.verifyRequest(request.id, true, customNote || 'Field verified via telecom desk');
    setCustomNote('');
  };

  const handleConfirmPriority = () => {
    emergencyService.confirmPriority(request.id, prioritySelect, 'EOC Authorized Duty Officer');
  };

  const handleAssignTeam = () => {
    if (!selectedTeamId) return;
    emergencyService.assignTeam(request.id, selectedTeamId);
    setSelectedTeamId('');
  };

  const handleStatusChange = (newStatus) => {
    emergencyService.updateStatus(request.id, newStatus, customNote, 'EOC Incident Controller');
    setCustomNote('');
  };

  const isResolved = request.status === 'Resolved';

  return (
    <div className="sci-card emergency-detail-modal-overlay">
      <div className="emergency-detail-panel">
        {/* HEADER */}
        <div className="detail-modal-header">
          <div className="detail-id-group">
            <span className="detail-tag font-mono">{request.id}</span>
            <span className="detail-type-badge">{request.emergencyType}</span>
            <span className={`status-pill pill-${request.status.toLowerCase().replace(/\s+/g, '-')}`}>
              {request.status}
            </span>
          </div>
          <button className="sci-btn sci-btn-icon sci-btn-xs" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="detail-modal-body">
          {/* TOP SECTION: CITIZEN REPORT SUMMARY */}
          <div className="detail-meta-strip">
            <div className="meta-col">
              <span className="meta-k"><MapPin size={12} className="text-accent" /> Location:</span>
              <span className="meta-v">{request.location}, {request.district} ({request.state})</span>
              <span className="meta-coords font-mono text-muted">[{request.coordinates?.join('°N, ')}°E]</span>
            </div>
            <div className="meta-col">
              <span className="meta-k"><Users size={12} className="text-accent" /> People Affected:</span>
              <span className="meta-v font-bold">{request.peopleReported} persons</span>
            </div>
            <div className="meta-col">
              <span className="meta-k"><Clock size={12} className="text-accent" /> Received:</span>
              <span className="meta-v font-mono">{request.timestamp}</span>
            </div>
          </div>

          {/* CITIZEN DISTRESS MESSAGE */}
          <div className="detail-msg-box">
            <span className="msg-box-label">CITIZEN DISTRESS MESSAGE:</span>
            <p className="msg-box-text">"{request.message}"</p>
            {request.hasPhoto && (
              <div className="photo-attached-pill">
                <span>📷 Distress Photo Attached (Inundation verified at site)</span>
              </div>
            )}
          </div>

          {/* PRIVACY & CONTACT INFO (SECTION 38) */}
          <div className="privacy-card">
            <div className="privacy-head">
              <span className="privacy-title">
                <Lock size={12} className="text-secondary" /> Citizen Contact Telemetry (Privacy Protected)
              </span>
              <button
                className="sci-btn sci-btn-secondary sci-btn-xs unmask-btn"
                onClick={() => setShowFullPhone(!showFullPhone)}
                title="Authorized internal view toggle"
              >
                {showFullPhone ? <Lock size={11} /> : <Unlock size={11} />}
                <span>{showFullPhone ? 'Mask Number' : 'Unmask (Authorized EOC)'}</span>
              </button>
            </div>
            <div className="privacy-phone-row">
              <PhoneCall size={14} className="text-accent" />
              <span className="phone-display font-mono">{maskPhone(request.contact)}</span>
              <span className="privacy-subtext">Phone numbers protected under Disaster Telemetry Privacy Framework.</span>
            </div>
          </div>

          {/* PRIORITIZATION SEPARATION: SYSTEM SUGGESTED VS OFFICIAL CONFIRMED (SECTION 24) */}
          <div className="prioritization-dual-card">
            <div className="priority-block system-priority">
              <span className="p-block-k">SYSTEM SUGGESTED PRIORITY:</span>
              <div className="p-block-v-row">
                <span className={`p-tag p-${request.suggestedPriority?.toLowerCase()}`}>
                  {request.suggestedPriority}
                </span>
                <span className="p-reason-text">AI Rule: Keyword & flood hazard proximity weight</span>
              </div>
            </div>

            <div className="priority-block official-priority">
              <span className="p-block-k">OFFICIAL CONFIRMED PRIORITY:</span>
              <div className="p-block-action-row">
                <select
                  className="gov-select priority-select"
                  value={prioritySelect}
                  onChange={(e) => setPrioritySelect(e.target.value)}
                  disabled={isResolved}
                >
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MODERATE">MODERATE</option>
                  <option value="LOW">LOW</option>
                </select>
                <button
                  className="sci-btn sci-btn-primary sci-btn-xs"
                  onClick={handleConfirmPriority}
                  disabled={isResolved}
                >
                  Confirm Priority
                </button>
              </div>
            </div>
          </div>

          {/* RESPONSE TEAM ASSIGNMENT (SECTION 23) */}
          <div className="team-assignment-card">
            <div className="assignment-head">
              <span className="assignment-label">
                <Building2 size={13} className="text-accent" /> Assigned Response Team:
              </span>
              <span className="assigned-team-name font-bold text-accent">
                {request.assignedTeam || 'None Assigned'}
              </span>
            </div>

            {!isResolved && (
              <div className="team-assign-controls">
                <select
                  className="gov-select team-select"
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                >
                  <option value="">-- Select Available Response Team --</option>
                  {teams
                    .filter((t) => t.currentStatus === 'Available' || t.district === request.district)
                    .map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name} ({team.district} • {team.currentStatus})
                      </option>
                    ))}
                </select>
                <button
                  className="sci-btn sci-btn-primary sci-btn-xs"
                  onClick={handleAssignTeam}
                  disabled={!selectedTeamId}
                >
                  Assign Team
                </button>
              </div>
            )}
          </div>

          {/* WORKFLOW STATUS TRANSITIONS (SECTION 22) */}
          <div className="workflow-status-actions">
            <span className="wf-label">UPDATE EMERGENCY WORKFLOW STATUS:</span>
            <div className="wf-buttons-row">
              {request.verification === 'Pending Verification' && (
                <button className="sci-btn sci-btn-secondary sci-btn-xs" onClick={handleVerify}>
                  <CheckCircle2 size={12} className="text-success" />
                  <span>Verify Request</span>
                </button>
              )}

              {request.status !== 'Responding' && !isResolved && (
                <button
                  className="sci-btn sci-btn-cyan sci-btn-xs"
                  onClick={() => handleStatusChange('Responding')}
                >
                  <Radio size={12} />
                  <span>Mark Responding</span>
                </button>
              )}

              {!isResolved && (
                <button
                  className="sci-btn sci-btn-success sci-btn-xs"
                  onClick={() => handleStatusChange('Resolved')}
                >
                  <CheckCircle2 size={12} />
                  <span>Mark Resolved (Citizens Safe)</span>
                </button>
              )}
            </div>
          </div>

          {/* TIMELINE AUDIT TRAIL (SECTION 22) */}
          <div className="request-timeline-box">
            <span className="timeline-title">INCIDENT AUDIT TIMELINE:</span>
            <div className="timeline-items">
              {request.timeline?.map((step, idx) => (
                <div key={idx} className="timeline-step">
                  <span className="timeline-step-dot"></span>
                  <div className="timeline-step-content">
                    <div className="step-time font-mono">{step.time} • <strong className="text-secondary">{step.actor}</strong></div>
                    <div className="step-action">{step.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .emergency-detail-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(4, 8, 15, 0.75);
          backdrop-filter: blur(8px);
          z-index: 2500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .emergency-detail-panel {
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          background: #0d172a;
          border: 1px solid rgba(0, 229, 255, 0.4);
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .detail-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: rgba(15, 25, 45, 0.9);
          border-bottom: 1px solid var(--bg-card-border);
        }
        .detail-id-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .detail-tag {
          font-size: 14px;
          font-weight: 800;
          color: var(--accent-cyan);
        }
        .detail-type-badge {
          font-size: 11px;
          font-weight: 700;
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .status-pill {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 9999px;
        }
        .pill-received { background: rgba(148, 163, 184, 0.2); color: #cbd5e1; }
        .pill-pending-verification { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
        .pill-verified, .pill-team-assigned { background: rgba(56, 189, 248, 0.2); color: #38bdf8; }
        .pill-responding { background: rgba(0, 229, 255, 0.2); color: #00e5ff; }
        .pill-resolved { background: rgba(16, 185, 129, 0.2); color: #34d399; }

        .detail-modal-body {
          padding: 14px 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .detail-meta-strip {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 10px;
          background: rgba(0, 0, 0, 0.25);
          padding: 8px 12px;
          border-radius: var(--radius-md);
        }
        .meta-col {
          display: flex;
          flex-direction: column;
          font-size: 11px;
        }
        .meta-k {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          font-size: 10px;
        }
        .meta-v {
          color: #ffffff;
          font-weight: 500;
        }
        .detail-msg-box {
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-left: 3px solid #ef4444;
          padding: 10px 12px;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        .msg-box-label {
          font-size: 9px;
          font-weight: 800;
          color: #f87171;
          letter-spacing: 0.05em;
        }
        .msg-box-text {
          font-size: 13px;
          line-height: 1.5;
          color: #f1f5f9;
          margin-top: 4px;
          font-style: italic;
        }
        .photo-attached-pill {
          font-size: 10px;
          color: var(--accent-cyan);
          margin-top: 6px;
        }
        .privacy-card {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.15);
          padding: 8px 12px;
          border-radius: var(--radius-md);
        }
        .privacy-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .privacy-title {
          font-size: 10px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .unmask-btn {
          font-size: 10px;
          padding: 2px 6px;
        }
        .privacy-phone-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .phone-display {
          font-size: 13px;
          font-weight: 700;
          color: #38bdf8;
        }
        .privacy-subtext {
          font-size: 9px;
          color: var(--text-muted);
        }
        .prioritization-dual-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--bg-card-border);
          padding: 10px 12px;
          border-radius: var(--radius-md);
        }
        .priority-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .p-block-k {
          font-size: 9px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .p-tag {
          font-size: 10px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          display: inline-block;
        }
        .p-critical { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }
        .p-high { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
        .p-moderate { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
        .p-reason-text {
          font-size: 10px;
          color: var(--text-muted);
          margin-left: 6px;
        }
        .p-block-action-row {
          display: flex;
          gap: 6px;
        }
        .priority-select {
          background: #111d35;
          border: 1px solid rgba(148, 163, 184, 0.25);
          border-radius: var(--radius-sm);
          font-size: 11px;
          padding: 2px 6px;
        }
        .team-assignment-card {
          background: rgba(0, 229, 255, 0.03);
          border: 1px solid rgba(0, 229, 255, 0.2);
          padding: 10px 12px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .assignment-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }
        .assignment-label {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .team-assign-controls {
          display: flex;
          gap: 8px;
        }
        .team-select {
          flex: 1;
          background: #111d35;
          border: 1px solid rgba(148, 163, 184, 0.25);
          border-radius: var(--radius-sm);
          font-size: 11px;
          padding: 4px 8px;
        }
        .workflow-status-actions {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid var(--bg-card-border);
          padding: 10px 12px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .wf-label {
          font-size: 9px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .wf-buttons-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .sci-btn-cyan {
          background: rgba(0, 229, 255, 0.15);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 229, 255, 0.35);
        }
        .sci-btn-cyan:hover {
          background: rgba(0, 229, 255, 0.25);
        }
        .sci-btn-success {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.35);
        }
        .sci-btn-success:hover {
          background: rgba(16, 185, 129, 0.25);
        }
        .request-timeline-box {
          border-top: 1px solid var(--bg-card-border);
          padding-top: 10px;
        }
        .timeline-title {
          font-size: 10px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 6px;
          display: block;
        }
        .timeline-items {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-left: 2px solid rgba(0, 229, 255, 0.3);
          margin-left: 6px;
          padding-left: 12px;
        }
        .timeline-step {
          position: relative;
        }
        .timeline-step-dot {
          position: absolute;
          left: -17px;
          top: 3px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-cyan);
          box-shadow: 0 0 6px var(--accent-cyan);
        }
        .step-time {
          font-size: 10px;
          color: var(--text-muted);
        }
        .step-action {
          font-size: 11px;
          color: #e2e8f0;
          line-height: 1.3;
        }
      `}</style>
    </div>
  );
}

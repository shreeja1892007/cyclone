import React from 'react';
import {
  LifeBuoy,
  Phone,
  Send,
  AlertTriangle,
  ShieldAlert,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function EmergencyHelpCard({ onOpenEmergencyForm }) {
  return (
    <section className="cz-emergency-cta-card" aria-labelledby="emergency-help-cta-title">
      <div className="cz-emergency-inner">
        {/* Urgent Callout Header */}
        <div className="cta-left">
          <div className="cta-icon-wrap" aria-hidden="true">
            <LifeBuoy size={32} className="text-danger" />
          </div>
          <div>
            <div className="cta-tag">DIRECT CITIZEN DISTRESS TRANSMISSION</div>
            <h2 id="emergency-help-cta-title" className="cta-title">
              NEED EMERGENCY HELP?
            </h2>
            <p className="cta-desc">
              If you or someone near you is trapped, injured, or in immediate danger from flooding or structural collapse, submit a localized distress report to the State & District Emergency Operations Centre (EOC).
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="cta-right">
          <button
            type="button"
            className="cz-emergency-trigger-btn"
            onClick={onOpenEmergencyForm}
            aria-label="Open emergency request form"
          >
            <Send size={18} />
            <span>SEND EMERGENCY REQUEST</span>
          </button>
          <span className="cta-sub-note">
            Attaches GPS Pin • Verified by District EOC
          </span>
        </div>
      </div>

      {/* Official Verified Helplines & Mandatory Prototype Disclaimer */}
      <div className="cz-emergency-footer-strip">
        <div className="helpline-col">
          <Phone size={15} className="text-danger flex-shrink-0" />
          <div>
            <strong className="helpline-label">VERIFIED OFFICIAL EMERGENCY CONTACTS:</strong>
            <div className="helpline-numbers font-mono">
              <span className="hl-item"><strong>112</strong> (National Unified Emergency)</span>
              <span className="hl-separator">•</span>
              <span className="hl-item"><strong>1070</strong> (State Disaster Management)</span>
              <span className="hl-separator">•</span>
              <span className="hl-item"><strong>1077</strong> (District Control Room)</span>
            </div>
          </div>
        </div>

        <div className="proto-warning-col">
          <AlertTriangle size={14} className="text-amber flex-shrink-0" />
          <p className="proto-warning-text">
            <strong>IMPORTANT:</strong> This research prototype does not replace official emergency telephone services. In a life-threatening crisis, always telephone <strong>112</strong> immediately.
          </p>
        </div>
      </div>

      <style>{`
        .cz-emergency-cta-card {
          background: linear-gradient(135deg, #180911 0%, #0d1a33 100%);
          border: 2px solid #ef4444;
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 8px 30px rgba(239, 68, 68, 0.18);
        }
        .cz-emergency-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .cta-left {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          max-width: 680px;
        }
        .cta-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cta-tag {
          font-size: 11px;
          font-weight: 800;
          color: #f87171;
          letter-spacing: 0.06em;
          margin-bottom: 2px;
        }
        .cta-title {
          font-size: 24px;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.02em;
          margin: 0 0 6px 0;
        }
        .cta-desc {
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.5;
          margin: 0;
        }
        .cta-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          min-width: 260px;
        }
        .cz-emergency-trigger-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #ef4444;
          color: #ffffff;
          border: none;
          padding: 16px 24px;
          border-radius: var(--radius-md);
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4);
        }
        .cz-emergency-trigger-btn:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.6);
        }
        .cta-sub-note {
          font-size: 11px;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .cz-emergency-footer-strip {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 16px;
          border-top: 1px solid rgba(239, 68, 68, 0.2);
          padding-top: 16px;
        }
        .helpline-col {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .helpline-label {
          font-size: 11px;
          color: #f87171;
          letter-spacing: 0.04em;
          display: block;
          margin-bottom: 4px;
        }
        .helpline-numbers {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          font-size: 12px;
          color: var(--text-primary);
        }
        .hl-item strong {
          color: #ffffff;
        }
        .hl-separator {
          color: var(--text-muted);
        }
        .proto-warning-col {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
        }
        .proto-warning-text {
          font-size: 11px;
          color: #fde68a;
          line-height: 1.45;
          margin: 0;
        }
        @media (max-width: 860px) {
          .cz-emergency-inner {
            flex-direction: column;
            align-items: stretch;
          }
          .cta-right {
            width: 100%;
          }
          .cz-emergency-footer-strip {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

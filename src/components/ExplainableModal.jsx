import React from 'react';
import { X, Sparkles, AlertCircle, Layers, CheckCircle2 } from 'lucide-react';

export default function ExplainableModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="sci-card explain-modal-dialog">
        <div className="sci-card-header">
          <div className="sci-card-title">
            <Sparkles size={16} className="text-accent" /> Explainable AI (XAI) Architecture
          </div>
          <button className="sci-btn-icon" onClick={onClose} title="Close dialog">
            <X size={16} />
          </button>
        </div>

        <div className="explain-modal-body">
          <div className="explain-status-box">
            <AlertCircle size={20} className="text-accent" />
            <div>
              <div className="explain-primary-msg">
                Explainability output will be supplied by the ML backend.
              </div>
              <div className="explain-secondary-msg">
                In strict adherence to scientific integrity rules, SHAP values, feature importance weights, and integrated gradients are not fabricated in the prototype UI.
              </div>
            </div>
          </div>

          <div className="planned-xai-specs">
            <div className="planned-title font-mono">SPECIFIED XAI CAPABILITIES FOR V2 INTEGRATION:</div>
            <div className="planned-grid">
              <div className="planned-card">
                <span className="p-card-title">1. SHAP Feature Attribution</span>
                <span className="p-card-desc">Quantify relative environmental variable contributions (SST vs Shear vs Vorticity) to the 24h probability shift.</span>
              </div>
              <div className="planned-card">
                <span className="p-card-title">2. Directional Sign Analysis</span>
                <span className="p-card-desc">Partition drivers into positive (intensification promoter) vs negative (genesis inhibitor) vectors.</span>
              </div>
              <div className="planned-card">
                <span className="p-card-title">3. Spatio-Temporal Saliency</span>
                <span className="p-card-desc">Grad-CAM visual overlays on INSAT-3D brightness temperature channels highlighting active cloud convection centers.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="explain-modal-footer">
          <button className="sci-btn sci-btn-sm sci-btn-primary" onClick={onClose}>
            Acknowledge
          </button>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(3, 7, 18, 0.82);
          backdrop-filter: blur(5px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-4);
        }
        .explain-modal-dialog {
          width: 100%;
          max-width: 580px;
          background: #0d172a;
          border-color: rgba(0, 229, 255, 0.4);
          box-shadow: var(--shadow-lg);
          animation: modal-fade 0.2s ease;
        }
        @keyframes modal-fade {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .explain-status-box {
          display: flex;
          gap: var(--space-3);
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.25);
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
          margin-bottom: var(--space-4);
        }
        .explain-primary-msg {
          font-size: 14px;
          font-weight: 700;
          color: var(--accent-cyan);
          margin-bottom: 4px;
        }
        .explain-secondary-msg {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .planned-xai-specs {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .planned-title {
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .planned-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .planned-card {
          background: rgba(148, 163, 184, 0.04);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .p-card-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .p-card-desc {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .explain-modal-footer {
          margin-top: var(--space-4);
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
}

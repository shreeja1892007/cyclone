import React from 'react';
import { Shield, ExternalLink, ArrowUp, Compass } from 'lucide-react';

export default function CitizenFooter({ onNavigateView }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="cz-footer" role="contentinfo">
      <div className="cz-footer-inner">
        {/* Prototype Disclaimer per Section 32 */}
        <div className="cz-footer-disclaimer-box">
          <div className="disclaimer-icon">
            <Shield size={20} className="text-amber" />
          </div>
          <p className="disclaimer-text">
            CycloVision AI is a research and educational decision-support prototype. Experimental AI outputs are not official cyclone forecasts, warnings, evacuation orders, or emergency instructions. Citizen emergency reporting in this prototype does not replace official emergency services. Refer to authorized meteorological, disaster-management, and emergency-service agencies for official information.
          </p>
        </div>

        {/* Links & Quick Jump */}
        <div className="cz-footer-links-row">
          <div className="footer-meta">
            <span className="footer-title font-bold">CYCLOVISION AI PLATFORM</span>
            <span className="footer-sub">Citizen Safety & Disaster Preparedness Interface</span>
          </div>

          <div className="footer-official-portals">
            <span className="portals-title">OFFICIAL AGENCIES:</span>
            <a href="https://mausam.imd.gov.in" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span>IMD Portal</span> <ExternalLink size={10} />
            </a>
            <a href="https://ndma.gov.in" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span>NDMA India</span> <ExternalLink size={10} />
            </a>
            <a href="https://osdma.org" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span>OSDMA Odisha</span> <ExternalLink size={10} />
            </a>
          </div>

          <div className="footer-actions">
            {onNavigateView && (
              <>
                <button
                  type="button"
                  className="footer-dash-link"
                  onClick={() => onNavigateView('dashboard')}
                >
                  Government View
                </button>
                <button
                  type="button"
                  className="footer-dash-link"
                  onClick={() => onNavigateView('ai-analysis')}
                >
                  Researcher View
                </button>
              </>
            )}
            <button
              type="button"
              className="scroll-top-btn"
              onClick={scrollToTop}
              title="Scroll to top"
            >
              <ArrowUp size={14} />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .cz-footer {
          background: #04080f;
          border-top: 1px solid var(--bg-card-border);
          padding: 24px 20px 36px 20px;
          margin-top: 24px;
        }
        .cz-footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .cz-footer-disclaimer-box {
          background: rgba(15, 25, 45, 0.7);
          border: 1px solid rgba(245, 158, 11, 0.25);
          border-radius: var(--radius-md);
          padding: 14px 18px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .disclaimer-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .disclaimer-text {
          font-size: 12px;
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0;
        }
        .cz-footer-links-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 6px;
        }
        .footer-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .footer-title {
          font-size: 13px;
          color: #ffffff;
          letter-spacing: 0.04em;
        }
        .footer-sub {
          font-size: 11px;
          color: var(--text-muted);
        }
        .footer-official-portals {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .portals-title {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .footer-link {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--accent-cyan);
          text-decoration: none;
        }
        .footer-link:hover {
          text-decoration: underline;
        }
        .footer-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-dash-link {
          background: rgba(15, 25, 45, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-secondary);
          padding: 5px 10px;
          border-radius: var(--radius-sm);
          font-size: 11px;
          cursor: pointer;
        }
        .footer-dash-link:hover {
          color: #ffffff;
          border-color: var(--accent-cyan);
        }
        .scroll-top-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(0, 229, 255, 0.1);
          border: 1px solid rgba(0, 229, 255, 0.3);
          color: var(--accent-cyan);
          padding: 5px 10px;
          border-radius: var(--radius-sm);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </footer>
  );
}

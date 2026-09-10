import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function ResearchDisclaimer() {
  return (
    <footer className="research-disclaimer-banner">
      <div className="disclaimer-content">
        <ShieldAlert size={16} className="disclaimer-icon text-accent" />
        <div className="disclaimer-text">
          <strong>Scientific & Educational Disclaimer:</strong> CycloVision AI is a research and educational prototype. AI-generated outputs shown in this interface are not official tropical cyclone forecasts, warnings, or emergency guidance. Users must refer to authorized meteorological and disaster-management agencies (such as IMD / RSMC New Delhi) for official information.
        </div>
      </div>

      <style>{`
        .research-disclaimer-banner {
          background-color: #08101e;
          border: 1px solid rgba(0, 229, 255, 0.2);
          border-radius: var(--radius-md);
          padding: 10px var(--space-4);
          margin-top: var(--space-6);
        }
        .disclaimer-content {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .disclaimer-icon {
          flex-shrink: 0;
        }
        .disclaimer-text {
          font-size: 11px;
          line-height: 1.45;
          color: var(--text-secondary);
        }
        .disclaimer-text strong {
          color: var(--accent-cyan);
        }
      `}</style>
    </footer>
  );
}

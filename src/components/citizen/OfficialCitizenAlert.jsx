import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Radio,
  ExternalLink,
  Clock,
  MapPin,
  AlertTriangle,
  Info,
  CheckCircle2
} from 'lucide-react';
import { fetchOfficialBulletins, fetchPublicCommunications } from '../../services/officialDataService';

export default function OfficialCitizenAlert({
  selectedDistrict = 'Puri',
  selectedState = 'Odisha'
}) {
  const [bulletins, setBulletins] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [bData, cData] = await Promise.all([
          fetchOfficialBulletins(),
          fetchPublicCommunications()
        ]);
        if (isMounted) {
          setBulletins(bData || []);
          setCommunications(cData || []);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setIsConnected(false);
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="cz-official-card loading-state">
        <Radio size={18} className="text-accent pulse-alert" />
        <span>Loading official meteorological bulletins...</span>
      </div>
    );
  }

  if (!isConnected || bulletins.length === 0) {
    return (
      <section className="cz-official-card disconnected-card" aria-label="Official Alerts">
        <div className="cz-official-banner-head">
          <div className="head-left">
            <Radio size={18} className="text-muted" />
            <h2 className="official-sec-title">OFFICIAL ALERTS & WARNINGS</h2>
          </div>
          <span className="sci-badge sci-badge-muted font-mono">FEED NOT CONNECTED</span>
        </div>
        <div className="empty-warning-body">
          <p><strong>OFFICIAL WARNING FEED NOT CONNECTED</strong></p>
          <p className="sub">
            CycloVision AI does not invent or simulate government cyclone warnings. Please tune into All India Radio, Doordarshan, or visit{' '}
            <a href="https://mausam.imd.gov.in" target="_blank" rel="noopener noreferrer" className="imd-link">
              IMD Official Portal <ExternalLink size={11} />
            </a>.
          </p>
        </div>
      </section>
    );
  }

  const primaryBulletin = bulletins[0];

  return (
    <section className="cz-official-card" aria-labelledby="official-alerts-title">
      {/* Official Government Top Header Strip */}
      <div className="cz-official-banner-head">
        <div className="head-left">
          <div className="official-emblem-badge" aria-hidden="true">
            <ShieldAlert size={18} className="text-danger" />
          </div>
          <div>
            <div className="official-super-tag">VERIFIED METEOROLOGICAL SOURCE</div>
            <h2 id="official-alerts-title" className="official-sec-title">
              OFFICIAL ALERTS & WARNINGS
            </h2>
          </div>
        </div>

        <div className="head-right">
          <span className="official-verified-chip font-mono">
            <Radio size={11} /> SIMULATED OFFICIAL FEED
          </span>
        </div>
      </div>

      {/* Main Alert Card */}
      <div className="official-bulletin-body">
        <div className="bulletin-meta-row">
          <div className="b-meta-item">
            <span className="b-label">ISSUING AUTHORITY</span>
            <span className="b-val font-bold">{primaryBulletin.authority}</span>
          </div>

          <div className="b-meta-item">
            <span className="b-label">BULLETIN NUMBER</span>
            <span className="b-val font-mono">{primaryBulletin.bulletinNumber}</span>
          </div>

          <div className="b-meta-item">
            <span className="b-label">ISSUED TIME</span>
            <span className="b-val font-mono">{primaryBulletin.issuedAt}</span>
          </div>

          <div className="b-meta-item">
            <span className="b-label">VALID UNTIL</span>
            <span className="b-val font-mono">{primaryBulletin.validUntil}</span>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="official-warning-box">
          <div className="warning-pill-row">
            <span className="warning-status-pill">{primaryBulletin.warningStatus}</span>
            <span className="affected-area-pill">
              <MapPin size={12} /> {primaryBulletin.affectedRegions}
            </span>
          </div>
          <h3 className="warning-headline">{primaryBulletin.title}</h3>
          <p className="warning-summary">{primaryBulletin.summary}</p>
        </div>

        {/* Action Directive */}
        {primaryBulletin.actionRequired && (
          <div className="action-directive-strip">
            <AlertTriangle size={16} className="text-amber flex-shrink-0" />
            <div>
              <strong className="dir-title">OFFICIAL ADVISORY / ACTION REQUIRED:</strong>
              <p className="dir-desc">{primaryBulletin.actionRequired}</p>
            </div>
          </div>
        )}

        {/* Public Communications Snippets */}
        {communications.length > 0 && (
          <div className="pub-comms-tray">
            <span className="tray-label">STATE DISASTER DIRECTIVES (OSDMA / SRC):</span>
            <div className="comms-grid">
              {communications.map((comm) => (
                <div key={comm.id} className="comm-card">
                  <div className="comm-top">
                    <span className="comm-auth font-bold">{comm.authority}</span>
                    <span className="comm-status-pill">{comm.status}</span>
                  </div>
                  <p className="comm-text">{comm.text}</p>
                  <div className="comm-footer">
                    <span className="font-mono">{comm.timestamp}</span> • <span>{comm.affectedArea}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official Source & Clear Separation Footer */}
        <div className="official-card-footer">
          <div className="strict-isolation-badge">
            <Info size={13} />
            <span>STRICT ISOLATION: Official bulletins are published solely by authorized government agencies and are never altered by CycloVision AI models.</span>
          </div>
          <a
            href={primaryBulletin.sourceUrl || 'https://rsmcnewdelhi.imd.gov.in'}
            target="_blank"
            rel="noopener noreferrer"
            className="source-verify-link"
          >
            <span>Verify on Official Portal</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <style>{`
        .cz-official-card {
          background: #091326;
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-top: 4px solid #0284c7;
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .cz-official-card.loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 36px;
          color: var(--text-secondary);
        }
        .cz-official-banner-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.14);
          padding-bottom: 12px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .head-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .official-emblem-badge {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .official-super-tag {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-blue-light);
          letter-spacing: 0.06em;
        }
        .official-sec-title {
          font-size: 17px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.02em;
        }
        .official-verified-chip {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          color: var(--accent-blue-light);
          background: rgba(2, 132, 199, 0.15);
          border: 1px solid rgba(2, 132, 199, 0.35);
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          font-weight: 700;
        }
        .official-bulletin-body {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .bulletin-meta-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.14);
          padding: 12px 16px;
          border-radius: var(--radius-md);
        }
        .b-meta-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .b-label {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .b-val {
          font-size: 12px;
          color: var(--text-primary);
        }
        .official-warning-box {
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.25);
          padding: 16px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .warning-pill-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .warning-status-pill {
          background: #ef4444;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          letter-spacing: 0.04em;
        }
        .affected-area-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(15, 25, 45, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-secondary);
          font-size: 11px;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
        }
        .warning-headline {
          font-size: 17px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }
        .warning-summary {
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.55;
          margin: 0;
        }
        .action-directive-strip {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-left: 4px solid #f59e0b;
          padding: 12px 14px;
          border-radius: var(--radius-sm);
        }
        .dir-title {
          display: block;
          font-size: 11px;
          color: #f59e0b;
          margin-bottom: 2px;
          letter-spacing: 0.03em;
        }
        .dir-desc {
          font-size: 13px;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.45;
        }
        .pub-comms-tray {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
        }
        .tray-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .comms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 10px;
        }
        .comm-card {
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.14);
          padding: 12px;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .comm-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
        }
        .comm-auth {
          color: var(--accent-cyan);
        }
        .comm-status-pill {
          background: rgba(16, 185, 129, 0.12);
          color: var(--status-available);
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
        .comm-text {
          font-size: 12px;
          color: var(--text-primary);
          line-height: 1.45;
          margin: 0;
        }
        .comm-footer {
          font-size: 10px;
          color: var(--text-muted);
          margin-top: auto;
        }
        .official-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          flex-wrap: wrap;
          gap: 10px;
        }
        .strict-isolation-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #94a3b8;
          max-width: 700px;
        }
        .source-verify-link {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: var(--accent-cyan);
          text-decoration: none;
          font-weight: 600;
        }
        .source-verify-link:hover {
          text-decoration: underline;
        }
        .disconnected-card {
          border-top-color: #64748b;
        }
        .empty-warning-body {
          padding: 16px 0;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .imd-link {
          color: var(--accent-cyan);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }
      `}</style>
    </section>
  );
}

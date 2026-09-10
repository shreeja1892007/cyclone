import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Users,
  Phone,
  AlertCircle,
  Filter,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { CITIZEN_DASHBOARD_DATA } from '../../services/mockData';

export default function NearbyHelp({ selectedDistrict = 'Puri' }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const helpLocations = CITIZEN_DASHBOARD_DATA.nearbyHelp || [];

  const categories = [
    'All',
    'Cyclone Shelters',
    'Hospitals / Health Facilities',
    'Relief Centres'
  ];

  const filteredLocations = selectedCategory === 'All'
    ? helpLocations
    : helpLocations.filter((item) => item.category === selectedCategory);

  return (
    <section className="cz-help-section" aria-labelledby="nearby-help-title">
      <div className="cz-help-header">
        <div>
          <div className="help-sub-tag">SAFETY INFRASTRUCTURE PROTOTYPE</div>
          <h2 id="nearby-help-title" className="cz-help-title">
            NEARBY SAFE LOCATIONS & SHELTERS
          </h2>
        </div>

        {/* Prototype honesty chip */}
        <span className="demo-loc-chip font-mono">
          DEMO LOCATIONS — NOT FOR REAL USE
        </span>
      </div>

      {/* Category Pills */}
      <div className="cz-help-cats">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Locations Grid */}
      <div className="cz-help-grid">
        {filteredLocations.map((loc) => (
          <div key={loc.id} className="help-item-card">
            <div className="item-head">
              <span className="item-cat-badge">{loc.category}</span>
              <span className="item-dist font-mono">
                <MapPin size={11} className="text-accent" /> {loc.distance}
              </span>
            </div>

            <h3 className="item-name">{loc.name}</h3>

            <div className="item-details">
              <div className="detail-row">
                <Users size={12} className="text-muted" />
                <span>{loc.capacity}</span>
              </div>
              <div className="detail-row">
                <Phone size={12} className="text-muted" />
                <span className="text-muted">{loc.contact}</span>
              </div>
            </div>

            <div className="item-disclaimer font-mono">
              <AlertCircle size={11} />
              <span>{loc.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Warning Notice per Section 20 */}
      <div className="cz-help-notice">
        <AlertCircle size={15} className="text-amber flex-shrink-0" />
        <p className="notice-text">
          <strong>OPERATIONAL NOTICE:</strong> Live telemetry for cyclone shelter occupancy and district hospital casualty capacity requires connection to the State Disaster Management Database (SDMA). Contact local Block Development Officers (BDO) or Gram Panchayat coordinators for designated village evacuation centres.
        </p>
      </div>

      <style>{`
        .cz-help-section {
          background: #091326;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .cz-help-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          padding-bottom: 12px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .help-sub-tag {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-cyan);
          letter-spacing: 0.05em;
        }
        .cz-help-title {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.02em;
        }
        .demo-loc-chip {
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #f59e0b;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
        }
        .cz-help-cats {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: thin;
        }
        .cat-pill {
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .cat-pill:hover {
          color: #ffffff;
          border-color: var(--accent-cyan);
        }
        .cat-pill.active {
          background: rgba(0, 229, 255, 0.12);
          border-color: var(--accent-cyan);
          color: #ffffff;
        }
        .cz-help-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 12px;
        }
        .help-item-card {
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .item-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .item-cat-badge {
          background: rgba(56, 189, 248, 0.15);
          color: var(--accent-blue-light);
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
        .item-dist {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          color: var(--text-secondary);
        }
        .item-name {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.35;
        }
        .item-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .detail-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .item-disclaimer {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 9px;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 4px 8px;
          border-radius: var(--radius-sm);
        }
        .cz-help-notice {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(15, 25, 45, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.15);
          padding: 12px 14px;
          border-radius: var(--radius-md);
        }
        .notice-text {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.45;
          margin: 0;
        }
      `}</style>
    </section>
  );
}

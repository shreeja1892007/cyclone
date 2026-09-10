import React, { useState } from 'react';
import {
  Users,
  Shield,
  Radio,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { RESPONSE_TEAMS } from '../../services/mockData';

export default function ResponseTeamPanel({ teams = RESPONSE_TEAMS }) {
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Rescue', 'Medical', 'Fire', 'Police', 'Disaster Response'];

  const filteredTeams = teams.filter(
    (t) => filterCategory === 'All' || t.category === filterCategory
  );

  return (
    <div className="sci-card response-team-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <Users size={16} className="text-accent" />
          <span>Response Team Coordination</span>
          <span className="prototype-badge font-mono">PROTOTYPE RESPONSE COORDINATION</span>
        </div>
        <div className="sci-card-actions">
          <span className="sci-badge sci-badge-cyan">{filteredTeams.length} Units Indexed</span>
        </div>
      </div>

      <div className="team-toolbar">
        <span className="toolbar-label">Filter Category:</span>
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="team-grid">
        {filteredTeams.map((team) => {
          const isResponding = team.currentStatus === 'Responding';
          const isAssigned = team.currentStatus === 'Assigned';
          const isAvailable = team.currentStatus === 'Available';

          return (
            <div key={team.id} className="team-card-item">
              <div className="team-card-head">
                <span className="team-id font-mono">{team.id}</span>
                <span
                  className={`team-status-tag ${
                    isResponding
                      ? 'st-resp'
                      : isAssigned
                      ? 'st-assg'
                      : isAvailable
                      ? 'st-avail'
                      : 'st-unavail'
                  }`}
                >
                  {team.currentStatus}
                </span>
              </div>

              <h4 className="team-name">{team.name}</h4>

              <div className="team-meta-row">
                <span className="tm-k">Type:</span>
                <span className="tm-v text-accent">{team.type}</span>
              </div>
              <div className="team-meta-row">
                <span className="tm-k">Base / District:</span>
                <span className="tm-v">{team.baseLocation} ({team.district})</span>
              </div>
              <div className="team-meta-row">
                <span className="tm-k">Assigned Emergency:</span>
                <span className="tm-v font-mono font-bold text-amber">
                  {team.assignedEmergency !== 'None' ? team.assignedEmergency : 'None (Standby)'}
                </span>
              </div>
              <div className="team-meta-row">
                <span className="tm-k">Personnel & Gear:</span>
                <span className="tm-v">{team.personnelCount} members • {team.equipment?.slice(0, 2).join(', ')}</span>
              </div>

              <div className="team-card-footer font-mono">
                <Clock size={10} />
                <span>Last status update: {team.lastUpdate}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="team-disclaimer-note">
        <AlertCircle size={12} className="text-secondary" />
        <span>Prototype coordination interface only. Official emergency mobilization remains exclusively within authorized state/district emergency control rooms.</span>
      </div>

      <style>{`
        .response-team-card {
          margin-bottom: var(--space-3);
          background: #091224;
          border: 1px solid var(--bg-card-border);
        }
        .prototype-badge {
          font-size: 9px;
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 8px;
        }
        .team-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          background: rgba(15, 25, 45, 0.6);
          border-bottom: 1px solid var(--bg-card-border);
          overflow-x: auto;
        }
        .toolbar-label {
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .category-pills {
          display: flex;
          gap: 6px;
        }
        .cat-pill {
          background: #0d172a;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-secondary);
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .cat-pill:hover {
          color: #ffffff;
          border-color: rgba(0, 229, 255, 0.3);
        }
        .cat-pill.active {
          background: rgba(0, 229, 255, 0.15);
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-3);
          padding: var(--space-3);
        }
        .team-card-item {
          background: var(--bg-surface);
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .team-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .team-id {
          font-size: 11px;
          color: var(--text-muted);
        }
        .team-status-tag {
          font-size: 9px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .st-resp { background: rgba(0, 229, 255, 0.15); color: #00e5ff; border: 1px solid rgba(0, 229, 255, 0.35); }
        .st-assg { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.35); }
        .st-avail { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35); }
        .st-unavail { background: rgba(100, 116, 139, 0.15); color: #94a3b8; border: 1px solid rgba(100, 116, 139, 0.35); }
        .team-name {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
        }
        .team-meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          line-height: 1.4;
          margin-bottom: 2px;
        }
        .tm-k {
          color: var(--text-muted);
        }
        .tm-v {
          color: #e2e8f0;
          text-align: right;
        }
        .team-card-footer {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 9px;
          color: var(--text-muted);
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          padding-top: 6px;
          margin-top: 6px;
        }
        .team-disclaimer-note {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(15, 23, 42, 0.7);
          border-top: 1px solid var(--bg-card-border);
          padding: 6px 14px;
          font-size: 10px;
          color: var(--text-muted);
        }
        @media (max-width: 1200px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

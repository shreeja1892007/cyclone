import React, { useState } from 'react';
import {
  Clock,
  Radio,
  BrainCircuit,
  Shield,
  PhoneCall,
  Users,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { EVENT_TIMELINE_DATA } from '../../services/mockData';

export default function EventTimeline({ events = EVENT_TIMELINE_DATA }) {
  const [filterType, setFilterType] = useState('All');

  const types = ['All', 'Response', 'Citizen Distress', 'Official Notice', 'Official Bulletin', 'AI Genesis', 'Satellite'];

  const filteredEvents = events.filter(
    (ev) => filterType === 'All' || ev.type === filterType
  );

  const getEventIcon = (type) => {
    switch (type) {
      case 'Response': return <Users size={14} className="text-accent" />;
      case 'Citizen Distress': return <PhoneCall size={14} className="text-danger" />;
      case 'Official Notice':
      case 'Official Bulletin': return <Shield size={14} className="text-blue" />;
      case 'AI Genesis': return <BrainCircuit size={14} className="text-purple" />;
      case 'Satellite':
      case 'Ocean / Env': return <Radio size={14} className="text-success" />;
      default: return <Clock size={14} className="text-muted" />;
    }
  };

  return (
    <div className="sci-card event-timeline-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <Clock size={16} className="text-accent" />
          <span>Synchronized Multi-Agency Event Timeline</span>
          <span className="timeline-badge font-mono">CHRONOLOGICAL AUDIT</span>
        </div>
        <div className="sci-card-actions">
          <span className="sci-badge sci-badge-cyan">{filteredEvents.length} Events</span>
        </div>
      </div>

      <div className="timeline-filter-bar">
        <span className="filter-label">Filter Stream:</span>
        <div className="filter-pills">
          {types.map((t) => (
            <button
              key={t}
              className={`filter-pill ${filterType === t ? 'active' : ''}`}
              onClick={() => setFilterType(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="timeline-stream-container">
        <div className="timeline-stream">
          {filteredEvents.map((item) => (
            <div key={item.id} className="stream-entry">
              <div className="stream-time-col font-mono">
                <Clock size={11} className="text-muted" />
                <span>{item.time}</span>
              </div>

              <div className="stream-marker-col">
                <div className="stream-icon-badge">
                  {getEventIcon(item.type)}
                </div>
                <div className="stream-connector-line"></div>
              </div>

              <div className="stream-content-card">
                <div className="stream-card-head">
                  <span className="stream-title font-bold">{item.title}</span>
                  <div className="stream-tags">
                    <span className="stream-type-tag">{item.type}</span>
                    <span className="stream-source-tag font-mono">{item.source}</span>
                  </div>
                </div>
                <p className="stream-detail-text">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .event-timeline-card {
          margin-bottom: var(--space-3);
          background: #091224;
          border: 1px solid var(--bg-card-border);
        }
        .timeline-badge {
          font-size: 9px;
          background: rgba(0, 229, 255, 0.1);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 229, 255, 0.25);
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 8px;
        }
        .timeline-filter-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          background: rgba(15, 25, 45, 0.6);
          border-bottom: 1px solid var(--bg-card-border);
          overflow-x: auto;
        }
        .filter-label {
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .filter-pills {
          display: flex;
          gap: 6px;
        }
        .filter-pill {
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
        .filter-pill:hover {
          color: #ffffff;
        }
        .filter-pill.active {
          background: rgba(0, 229, 255, 0.15);
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
        }
        .timeline-stream-container {
          padding: 14px 16px;
          max-height: 400px;
          overflow-y: auto;
        }
        .timeline-stream {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .stream-entry {
          display: grid;
          grid-template-columns: 130px 24px 1fr;
          gap: 12px;
          align-items: flex-start;
          position: relative;
        }
        .stream-time-col {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--text-secondary);
          padding-top: 4px;
        }
        .stream-marker-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          position: relative;
        }
        .stream-icon-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #0c1830;
          border: 1px solid var(--bg-card-border);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .stream-connector-line {
          position: absolute;
          top: 24px;
          bottom: -16px;
          width: 2px;
          background: rgba(148, 163, 184, 0.12);
        }
        .stream-entry:last-child .stream-connector-line {
          display: none;
        }
        .stream-content-card {
          background: var(--bg-surface);
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-md);
          padding: 8px 12px;
        }
        .stream-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
          flex-wrap: wrap;
          gap: 6px;
        }
        .stream-title {
          font-size: 12px;
          color: #ffffff;
        }
        .stream-tags {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .stream-type-tag {
          font-size: 9px;
          font-weight: 700;
          background: rgba(148, 163, 184, 0.15);
          color: var(--text-secondary);
          padding: 1px 5px;
          border-radius: 3px;
        }
        .stream-source-tag {
          font-size: 9px;
          color: var(--accent-cyan);
          background: rgba(0, 229, 255, 0.08);
          padding: 1px 5px;
          border-radius: 3px;
        }
        .stream-detail-text {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}

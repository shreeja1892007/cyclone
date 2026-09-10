import React, { useState } from 'react';
import {
  Shield,
  Clock,
  AlertTriangle,
  Waves,
  Zap,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen
} from 'lucide-react';
import { CITIZEN_DASHBOARD_DATA } from '../../services/mockData';

export default function SafetyGuidance() {
  const [activeTab, setActiveTab] = useState('before');
  const [expandedIndices, setExpandedIndices] = useState({ 0: true, 1: true });

  const guidanceData = CITIZEN_DASHBOARD_DATA.safetyGuidance;

  const tabs = [
    { id: 'before', label: 'Before Cyclone', icon: Clock },
    { id: 'during', label: 'During Cyclone', icon: AlertTriangle },
    { id: 'after', label: 'After Cyclone', icon: CheckCircle2 },
    { id: 'floodSafety', label: 'Flood Safety', icon: Waves },
    { id: 'coastalSafety', label: 'Coastal Safety', icon: Shield },
    { id: 'powerSafety', label: 'Power & Grid Safety', icon: Zap }
  ];

  const currentList = guidanceData[activeTab] || [];

  const toggleExpand = (idx) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <section className="cz-safety-section" aria-labelledby="safety-guidance-title">
      <div className="cz-safety-header">
        <div className="head-title-wrap">
          <BookOpen size={18} className="text-accent" />
          <h2 id="safety-guidance-title" className="cz-safety-title">
            CYCLONE SAFETY & PREPAREDNESS GUIDANCE
          </h2>
        </div>
        <div className="source-pill font-mono">
          <span>NDMA / OSDMA STANDARD GUIDELINES</span>
        </div>
      </div>

      {/* Tabs / Filter Pills */}
      <div className="cz-safety-tabs" role="tablist">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`safety-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setExpandedIndices({ 0: true, 1: true });
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Accordion / Cards List */}
      <div className="cz-safety-list">
        {currentList.map((item, idx) => {
          const isExpanded = expandedIndices[idx] ?? true;
          return (
            <div key={idx} className={`safety-guide-card ${isExpanded ? 'open' : ''}`}>
              <button
                type="button"
                className="guide-card-header"
                onClick={() => toggleExpand(idx)}
                aria-expanded={isExpanded}
              >
                <div className="guide-num font-mono">{idx + 1}</div>
                <h3 className="guide-card-title">{item.title}</h3>
                <span className="expand-icon">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              {isExpanded && (
                <div className="guide-card-body">
                  <p className="guide-card-text">{item.desc}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Attribution Footer */}
      <div className="safety-footer-note">
        <Shield size={12} className="text-secondary" />
        <span>Attributed to National Disaster Management Authority (NDMA) Standard Operating Procedures for Tropical Cyclones. Not an automated AI instruction.</span>
      </div>

      <style>{`
        .cz-safety-section {
          background: #091326;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .cz-safety-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          padding-bottom: 12px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .head-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cz-safety-title {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.02em;
        }
        .source-pill {
          font-size: 10px;
          color: var(--accent-blue-light);
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 3px 8px;
          border-radius: var(--radius-sm);
        }
        .cz-safety-tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: thin;
          padding-bottom: 4px;
        }
        .safety-tab-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-secondary);
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .safety-tab-btn:hover {
          color: #ffffff;
          border-color: var(--accent-cyan);
        }
        .safety-tab-btn.active {
          background: rgba(0, 229, 255, 0.12);
          border-color: var(--accent-cyan);
          color: #ffffff;
        }
        .cz-safety-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .safety-guide-card {
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .safety-guide-card.open {
          border-color: rgba(0, 229, 255, 0.25);
        }
        .guide-card-header {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          text-align: left;
        }
        .guide-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(0, 229, 255, 0.15);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .guide-card-title {
          font-size: 14px;
          font-weight: 700;
          margin: 0;
          flex: 1;
        }
        .expand-icon {
          color: var(--text-muted);
        }
        .guide-card-body {
          padding: 0 16px 14px 52px;
        }
        .guide-card-text {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }
        .safety-footer-note {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--text-muted);
          border-top: 1px solid rgba(148, 163, 184, 0.08);
          padding-top: 8px;
        }
      `}</style>
    </section>
  );
}

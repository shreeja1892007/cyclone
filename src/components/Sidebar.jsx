import React from 'react';
import {
  LayoutDashboard,
  Map,
  BrainCircuit,
  Radio,
  Wind,
  TrendingUp,
  AlertTriangle,
  Building2,
  PhoneCall,
  Users,
  Clock,
  FileText,
  Shield,
  Layers,
  CheckSquare,
  Database,
  FileSpreadsheet,
  LifeBuoy,
  ChevronLeft,
  ChevronRight,
  History,
  FlaskConical
} from 'lucide-react';

export default function Sidebar({
  currentView,
  onNavigate,
  collapsed,
  onToggleCollapse,
  activeDistressCount = 5,
  portalType = 'government'
}) {
  // ── RESEARCHER NAV ─────────────────────────────────────────────
  const researcherSections = [
    {
      label: 'RESEARCH OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard }
      ]
    },
    {
      label: 'SATELLITE & DATA',
      items: [
        { id: 'satellite', label: 'Satellite Analysis', icon: Radio },
        { id: 'environment', label: 'Environmental Conditions', icon: Wind }
      ]
    },
    {
      label: 'AI / ML ANALYSIS',
      items: [
        { id: 'ai-analysis', label: 'AI Analysis', icon: BrainCircuit },
        { id: 'genesis-prediction', label: 'Genesis Prediction', icon: TrendingUp }
      ]
    },
    {
      label: 'CYCLONE ANALYSIS',
      items: [
        { id: 'operational-map', label: 'Cyclone Map', icon: Map },
        { id: 'cyclone-intelligence', label: 'Cyclone Intelligence', icon: BrainCircuit }
      ]
    },
    {
      label: 'RESEARCH',
      items: [
        { id: 'historical', label: 'Historical Cyclones', icon: History },
        { id: 'validation', label: 'Model Reliability', icon: CheckSquare }
      ]
    },
    {
      label: 'SYSTEM & QUALITY',
      items: [
        { id: 'data-quality', label: 'Data Quality', icon: Layers },
        { id: 'data-sources', label: 'Data Sources', icon: Database }
      ]
    }
  ];

  // ── GOVERNMENT NAV (full existing structure) ───────────────────
  const governmentSections = [
    {
      label: 'COMMAND',
      items: [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'operational-map', label: 'Operational Map', icon: Map },
        { id: 'cyclone-intelligence', label: 'Cyclone Intelligence', icon: BrainCircuit }
      ]
    },
    {
      label: 'AI & METEOROLOGY',
      items: [
        { id: 'satellite', label: 'Satellite Analysis', icon: Radio },
        { id: 'ai-analysis', label: 'AI Analysis', icon: BrainCircuit },
        { id: 'environment', label: 'Environmental Conditions', icon: Wind },
        { id: 'genesis-prediction', label: 'Genesis Prediction', icon: TrendingUp }
      ]
    },
    {
      label: 'RISK',
      items: [
        { id: 'hazard-assessment', label: 'Hazard Assessment', icon: AlertTriangle },
        { id: 'district-impact', label: 'District Impact', icon: Layers },
        { id: 'infrastructure', label: 'Critical Infrastructure', icon: Building2 }
      ]
    },
    {
      label: 'EMERGENCY OPERATIONS',
      items: [
        { id: 'citizen-requests', label: 'Citizen Distress Reports', icon: PhoneCall, badge: activeDistressCount },
        { id: 'response-coordination', label: 'Response Coordination', icon: Users },
        { id: 'event-timeline', label: 'Event Timeline', icon: Clock }
      ]
    },
    {
      label: 'GOVERNMENT INFORMATION',
      items: [
        { id: 'official-bulletins', label: 'Official Bulletins', icon: Shield },
        { id: 'preparedness', label: 'Preparedness Status', icon: FileSpreadsheet }
      ]
    },
    {
      label: 'SYSTEM & QUALITY',
      items: [
        { id: 'data-quality', label: 'Data Quality', icon: Layers },
        { id: 'validation', label: 'Model Reliability', icon: CheckSquare },
        { id: 'data-sources', label: 'Data Sources', icon: Database }
      ]
    },
    {
      label: 'REPORTS',
      items: [
        { id: 'reports', label: 'Situation Reports', icon: FileText }
      ]
    }
  ];

  const navSections = portalType === 'researcher' ? researcherSections : governmentSections;

  return (
    <aside className={`sci-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-inner">
        <div className="sidebar-nav-scroll">
          {navSections.map((section, idx) => (
            <div key={idx} className="nav-section">
              {!collapsed && (
                <div className="nav-section-title">
                  {section.label}
                </div>
              )}
              {collapsed && <div className="nav-section-divider" />}
              
              <ul className="nav-list">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <li key={item.id} className="nav-item">
                      <button
                        className={`nav-button ${isActive ? 'active' : ''} ${item.highlight ? 'highlight-btn' : ''}`}
                        onClick={() => onNavigate(item.id)}
                        title={collapsed ? `${item.label}` : undefined}
                      >
                        <span className="nav-icon-wrap">
                          <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
                        </span>
                        {!collapsed && (
                          <span className="nav-label-wrap">
                            <span className="nav-label">{item.label}</span>
                            {item.badge !== undefined && item.badge > 0 && (
                              <span className="nav-badge-pill">{item.badge}</span>
                            )}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Collapse Toggle */}
        <div className="sidebar-footer">
          <button
            className="collapse-toggle-btn"
            onClick={onToggleCollapse}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : (
              <>
                <ChevronLeft size={16} />
                <span>Collapse Panel</span>
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .sci-sidebar {
          position: fixed;
          top: 68px;
          left: 0;
          bottom: 0;
          width: 250px;
          background-color: #08101e;
          border-right: 1px solid var(--bg-card-border);
          z-index: 900;
          transition: width 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        .sci-sidebar.collapsed {
          width: 64px;
        }
        .sidebar-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }
        .sidebar-nav-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 12px 8px;
        }
        .nav-section {
          margin-bottom: 14px;
        }
        .nav-section-title {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          padding: 0 10px 6px;
        }
        .nav-section-divider {
          height: 1px;
          background: rgba(148, 163, 184, 0.08);
          margin: 6px 0;
        }
        .nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .nav-button {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 7px 10px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all 0.15s ease;
          text-align: left;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        .nav-button:hover {
          background-color: var(--bg-surface-elevated);
          color: var(--text-primary);
        }
        .nav-button.active {
          background: linear-gradient(90deg, rgba(0, 229, 255, 0.15), rgba(2, 132, 199, 0.08));
          color: var(--accent-cyan);
          border-left: 3px solid var(--accent-cyan);
        }
        .highlight-btn {
          color: #f87171 !important;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .highlight-btn:hover {
          background: rgba(239, 68, 68, 0.16) !important;
        }
        .nav-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
        }
        .nav-label-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          margin-left: 10px;
          overflow: hidden;
        }
        .nav-label {
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .nav-badge-pill {
          background: #ef4444;
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 9999px;
        }
        .sidebar-footer {
          padding: 10px;
          border-top: 1px solid var(--bg-card-border);
          background-color: #060c17;
        }
        .collapse-toggle-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 6px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          font-size: 11px;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        .collapse-toggle-btn:hover {
          background: var(--bg-surface-elevated);
          color: var(--text-primary);
        }
      `}</style>
    </aside>
  );
}

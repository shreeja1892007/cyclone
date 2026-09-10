import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  Database,
  ShieldCheck,
  Shield,
  UserCheck,
  Menu,
  ShieldAlert,
  Radio,
  Clock,
  Sparkles,
  MapPin,
  LifeBuoy,
  LogOut,
  FlaskConical,
  ChevronDown
} from 'lucide-react';
import { REGIONS, ROLES_DEFINITION, STATES_DISTRICTS } from '../services/mockData';

export default function Header({
  portalType = 'government',
  selectedRegion,
  onSelectRegion,
  selectedState,
  onSelectState,
  selectedDistrict,
  onSelectDistrict,
  currentTimestamp,
  currentRole,
  onSelectRole,
  sidebarCollapsed,
  onToggleSidebar,
  activeDistressCount = 5,
  onOpenCitizenPortal,
  onOpenCitizenDashboard,
  onLogout
}) {
  const showGovernmentRoleView = portalType === 'government';
  const isResearcher = portalType === 'researcher';

  const [isGovDropdownOpen, setIsGovDropdownOpen] = useState(false);
  const govMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (govMenuRef.current && !govMenuRef.current.contains(e.target)) {
        setIsGovDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Available districts for selected state
  const stateObj = STATES_DISTRICTS.find((s) => s.state === selectedState);
  const availableDistricts = stateObj ? stateObj.districts : [];

  return (
    <header className="gov-header">
      {/* LEFT SECTION: BRANDING & ROLE */}
      <div className="gov-header-left">
        <button
          className="sci-btn-icon header-sidebar-toggle"
          onClick={onToggleSidebar}
          title={sidebarCollapsed ? "Expand Navigation" : "Collapse Navigation"}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>

        <div className="gov-branding">
          <div className="gov-logo-mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2a10 10 0 0 0-9.54 13.06L4 16l2-1"/>
              <path d="M12 22a10 10 0 0 9.54-13.06L20 8l-2 1"/>
            </svg>
          </div>
          <div className="gov-title-block">
            <div className="gov-title-row">
              <span className="gov-title">CycloVision AI</span>
              <span className="gov-system-tag">
                {portalType === 'researcher' ? 'RESEARCH PLATFORM' : 'DECISION-SUPPORT SYSTEM'}
              </span>
            </div>
            <p className="gov-subtitle">
              {portalType === 'researcher'
                ? 'Researcher Cyclone Intelligence Dashboard'
                : 'Government Cyclone Decision-Support Dashboard'}
            </p>
          </div>
        </div>
      </div>

      {/* CENTER CONTROLS: BASIN, STATE, DISTRICT, TIME, ROLE */}
      <div className="gov-header-center">
        {/* Basin Selector */}
        <div className="gov-ctrl-group">
          <label htmlFor="basin-select" className="gov-ctrl-label">
            <Compass size={12} className="text-accent" />
            <span>Basin</span>
          </label>
          <select
            id="basin-select"
            className="gov-select"
            value={selectedRegion?.id || 'bob'}
            onChange={(e) => {
              const reg = REGIONS.find((r) => r.id === e.target.value);
              if (reg) onSelectRegion(reg);
            }}
          >
            {REGIONS.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {/* State Selector */}
        <div className="gov-ctrl-group">
          <label htmlFor="state-select" className="gov-ctrl-label">
            <MapPin size={12} className="text-secondary" />
            <span>State</span>
          </label>
          <select
            id="state-select"
            className="gov-select"
            value={selectedState || 'All'}
            onChange={(e) => {
              const val = e.target.value;
              onSelectState(val);
              onSelectDistrict('All');
            }}
          >
            <option value="All">All States (NIO)</option>
            {STATES_DISTRICTS.map((s) => (
              <option key={s.state} value={s.state}>
                {s.state}
              </option>
            ))}
          </select>
        </div>

        {/* District Selector */}
        <div className="gov-ctrl-group">
          <label htmlFor="district-select" className="gov-ctrl-label">
            <span>District</span>
          </label>
          <select
            id="district-select"
            className="gov-select"
            value={selectedDistrict || 'All'}
            onChange={(e) => onSelectDistrict(e.target.value)}
            disabled={selectedState === 'All'}
          >
            <option value="All">{selectedState === 'All' ? 'Select State First' : 'All Districts'}</option>
            {availableDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Role / View Selector — Rendered ONLY on Government Dashboard */}
        {showGovernmentRoleView && (
          <div className="gov-ctrl-group role-selector-wrap" id="role-view-selector-container">
            <label htmlFor="role-select" className="gov-ctrl-label role-label">
              <UserCheck size={12} className="text-accent" />
              <span>Role / View</span>
            </label>
            <select
              id="role-select"
              className="gov-select role-select"
              value={currentRole}
              onChange={(e) => onSelectRole(e.target.value)}
            >
              {ROLES_DEFINITION.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Analysis Time & Update Stamp — in Center Context */}
        <div className="gov-time-pill" title="Selected synchronized observation time">
          <Clock size={12} className="text-accent" />
          <span className="gov-time-label">ANALYSIS TIME:</span>
          <span className="gov-time-val font-mono">{currentTimestamp?.label || '03 Sep 12:00 UTC'}</span>
        </div>
      </div>

      {/* RIGHT CONTROLS: STATUS BADGES & ACCOUNT/LOGOUT */}
      <div className="gov-header-right">
        {/* Status Badges strictly per Section 7 */}
        <div className="gov-status-badges">
          <span className="sci-badge sci-badge-cyan" title="Decision-Support Prototype ONLY">
            <ShieldCheck size={11} /> PROTOTYPE
          </span>
          <span className="sci-badge sci-badge-amber" title="Simulated demonstration data">
            <Database size={11} /> DEMO DATA
          </span>
          <span className="sci-badge sci-badge-blue" title="Official meteorological bulletins feed">
            <Radio size={11} /> OFFICIAL DATA: CONNECTED
          </span>
          <span className="sci-badge sci-badge-purple" title="Experimental GenesisNet AI outputs">
            <Sparkles size={11} /> AI EXPERIMENTAL
          </span>
        </div>

        {/* GOVERNMENT OFFICIAL ACCOUNT & LOGOUT BUTTON */}
        {showGovernmentRoleView && (
          <div className="gov-account-wrapper" ref={govMenuRef}>
            <div className="gov-user-dropdown-container">
              <button
                type="button"
                id="government-user-menu-btn"
                className="gov-user-menu-btn"
                onClick={() => setIsGovDropdownOpen(!isGovDropdownOpen)}
                aria-expanded={isGovDropdownOpen}
                title="Government Official Account Menu"
              >
                <UserCheck size={13} className="text-accent" />
                <span>Government Official</span>
                <ChevronDown size={12} className={`gov-chevron ${isGovDropdownOpen ? 'open' : ''}`} />
              </button>

              {isGovDropdownOpen && (
                <div className="gov-user-dropdown-menu">
                  <div className="gov-dropdown-profile">
                    <div className="gov-dropdown-name">Shri R. Krishnamurthy</div>
                    <div className="gov-dropdown-role font-mono">Disaster Management Officer</div>
                  </div>
                  <div className="gov-dropdown-divider" />
                  <button
                    type="button"
                    id="government-dropdown-logout-btn"
                    className="gov-dropdown-logout-action"
                    onClick={() => {
                      setIsGovDropdownOpen(false);
                      if (onLogout) onLogout();
                    }}
                  >
                    <LogOut size={13} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              id="government-logout-btn"
              className="gov-logout-btn"
              onClick={onLogout}
              title="Logout and return to login"
              aria-label="Logout Government Official"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* RESEARCHER LOGOUT BUTTON */}
        {isResearcher && (
          <button
            id="researcher-logout-btn"
            className="researcher-logout-btn"
            onClick={onLogout}
            title="Logout and return to login"
          >
            <FlaskConical size={13} />
            <span>Researcher</span>
            <LogOut size={13} />
          </button>
        )}
      </div>

      <style>{`
        .gov-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          min-height: 64px;
          background-color: rgba(9, 17, 34, 0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--bg-card-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          gap: 16px;
          box-sizing: border-box;
        }
        .gov-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .gov-branding {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .gov-logo-mark {
          width: 36px;
          height: 36px;
          background: rgba(0, 229, 255, 0.1);
          border: 1px solid rgba(0, 229, 255, 0.35);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .gov-title-block {
          display: flex;
          flex-direction: column;
        }
        .gov-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .gov-title {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .gov-system-tag {
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(0, 229, 255, 0.12);
          color: var(--accent-cyan);
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .gov-subtitle {
          font-size: 11px;
          color: var(--text-secondary);
          white-space: nowrap;
        }
        .gov-header-center {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .gov-ctrl-group {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          background: rgba(15, 25, 45, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.2);
          padding: 0 10px;
          border-radius: var(--radius-md);
          box-sizing: border-box;
          white-space: nowrap;
        }
        .gov-ctrl-label {
          font-size: 11px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }
        .gov-select {
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 12px;
          font-weight: 500;
          outline: none;
          cursor: pointer;
          padding: 2px 4px;
        }
        .gov-select option {
          background: #0d172a;
          color: #f1f5f9;
        }
        .role-selector-wrap {
          border-color: rgba(0, 229, 255, 0.35);
          background: rgba(0, 229, 255, 0.08);
        }
        .role-label {
          color: var(--accent-cyan);
          font-weight: 700;
        }
        .role-select {
          font-weight: 600;
          color: #ffffff;
        }
        .gov-time-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          background: rgba(15, 25, 45, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.2);
          padding: 0 10px;
          border-radius: var(--radius-md);
          box-sizing: border-box;
          white-space: nowrap;
        }
        .gov-time-label {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .gov-time-val {
          font-size: 12px;
          color: var(--accent-cyan);
          font-weight: 700;
        }
        .gov-header-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .gov-status-badges {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .gov-status-badges .sci-badge {
          height: 28px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0 8px;
          font-size: 10px;
          letter-spacing: 0.03em;
          border-radius: var(--radius-sm);
          white-space: nowrap;
          box-sizing: border-box;
        }
        .sci-badge-blue {
          background: rgba(2, 132, 199, 0.18);
          color: #38bdf8;
          border: 1px solid rgba(2, 132, 199, 0.35);
        }
        .sci-badge-purple {
          background: rgba(139, 92, 246, 0.18);
          color: #c084fc;
          border: 1px solid rgba(139, 92, 246, 0.35);
        }
        .gov-account-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }
        .gov-user-dropdown-container {
          position: relative;
        }
        .gov-user-menu-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.3);
          color: #e2e8f0;
          padding: 0 12px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          box-sizing: border-box;
        }
        .gov-user-menu-btn:hover {
          background: rgba(0, 229, 255, 0.18);
          border-color: rgba(0, 229, 255, 0.6);
          color: #ffffff;
        }
        .gov-chevron {
          transition: transform 0.2s ease;
        }
        .gov-chevron.open {
          transform: rotate(180deg);
        }
        .gov-user-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 220px;
          background: #0d1b2a;
          border: 1px solid rgba(0, 229, 255, 0.3);
          border-radius: var(--radius-sm);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
          padding: 8px 0;
          z-index: 1100;
          animation: fadeInGovMenu 0.15s ease-out;
        }
        @keyframes fadeInGovMenu {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gov-dropdown-profile {
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .gov-dropdown-name {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
        }
        .gov-dropdown-role {
          font-size: 11px;
          color: var(--color-cyan, #00e5ff);
        }
        .gov-dropdown-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 6px 0;
        }
        .gov-dropdown-logout-action {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: #fca5a5;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
        }
        .gov-dropdown-logout-action:hover {
          background: rgba(239, 68, 68, 0.15);
          color: #ffffff;
        }
        .gov-logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          background: rgba(248, 113, 113, 0.12);
          border: 1px solid rgba(248, 113, 113, 0.35);
          color: #fca5a5;
          padding: 0 14px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          letter-spacing: 0.02em;
          box-sizing: border-box;
        }
        .gov-logout-btn:hover {
          background: rgba(239, 68, 68, 0.25);
          border-color: rgba(239, 68, 68, 0.6);
          color: #ffffff;
          transform: translateY(-1px);
        }
        .researcher-logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          background: rgba(248, 113, 113, 0.12);
          border: 1px solid rgba(248, 113, 113, 0.35);
          color: #fca5a5;
          padding: 0 14px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          letter-spacing: 0.02em;
          box-sizing: border-box;
        }
        .researcher-logout-btn:hover {
          background: rgba(239, 68, 68, 0.25);
          border-color: rgba(239, 68, 68, 0.6);
          color: #ffffff;
          transform: translateY(-1px);
        }

        /* RESPONSIVE BREAKPOINTS */
        @media (max-width: 1520px) {
          .gov-header {
            flex-wrap: wrap;
            padding: 8px 16px;
          }
          .gov-header-left {
            order: 1;
          }
          .gov-header-right {
            order: 2;
            margin-left: auto;
          }
          .gov-header-center {
            order: 3;
            width: 100%;
            justify-content: flex-start;
            padding-top: 8px;
            margin-top: 2px;
            border-top: 1px solid rgba(148, 163, 184, 0.1);
          }
        }
        @media (max-width: 992px) {
          .gov-subtitle {
            display: none;
          }
          .gov-header-center {
            gap: 6px;
          }
          .gov-ctrl-group, .gov-time-pill {
            font-size: 11px;
            padding: 0 8px;
          }
          .gov-status-badges {
            gap: 4px;
          }
          .gov-status-badges .sci-badge {
            font-size: 9px;
            padding: 0 6px;
          }
        }
        @media (max-width: 680px) {
          .gov-header-left {
            min-width: unset;
          }
          .gov-title-block .gov-system-tag {
            display: none;
          }
          .gov-header-right {
            width: 100%;
            justify-content: space-between;
            padding-top: 6px;
            border-top: 1px solid rgba(148, 163, 184, 0.1);
          }
          .gov-status-badges {
            order: 2;
            width: 100%;
          }
          .gov-account-wrapper {
            order: 1;
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </header>
  );
}

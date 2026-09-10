import React, { useState, useRef, useEffect } from 'react';
import {
  LifeBuoy,
  MapPin,
  Globe,
  Clock,
  ShieldCheck,
  Radio,
  Sparkles,
  Database,
  ArrowRight,
  Check,
  AlertCircle,
  Users,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { STATES_DISTRICTS } from '../../services/mockData';

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' }
];

export default function CitizenHeader({
  selectedState,
  onSelectState,
  selectedDistrict,
  onSelectDistrict,
  userLocation,
  onLocationChange,
  currentLanguage,
  onSelectLanguage,
  lastUpdated = '03 Sep 2026 12:00 UTC',
  onOpenEmergencyForm,
  onNavigateView,
  onLogout
}) {
  const [showLocationConsent, setShowLocationConsent] = useState(false);
  const [geoLocating, setGeoLocating] = useState(false);
  const [geoFeedback, setGeoFeedback] = useState(null);
  const [isCzDropdownOpen, setIsCzDropdownOpen] = useState(false);
  const czMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (czMenuRef.current && !czMenuRef.current.contains(e.target)) {
        setIsCzDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const stateObj = STATES_DISTRICTS.find((s) => s.state === selectedState);
  const availableDistricts = stateObj ? stateObj.districts : [];

  const handleRequestLocation = () => {
    setShowLocationConsent(true);
  };

  const handleConfirmLocation = () => {
    setGeoLocating(true);
    setGeoFeedback('Acquiring high-accuracy GPS position...');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = parseFloat(pos.coords.latitude.toFixed(3));
          const lon = parseFloat(pos.coords.longitude.toFixed(3));
          onLocationChange({
            name: `My GPS Location (${lat}°N, ${lon}°E)`,
            coords: [lat, lon],
            district: 'Puri',
            state: 'Odisha',
            isUserGps: true
          });
          setGeoLocating(false);
          setShowLocationConsent(false);
          setGeoFeedback('Location locked.');
        },
        (err) => {
          console.warn('Geolocation denied or timed out:', err);
          // Fallback to coastal demo location with clear indication
          onLocationChange({
            name: 'Puri Sea Beach Road (Demo GPS Pin)',
            coords: [19.80, 85.82],
            district: 'Puri',
            state: 'Odisha',
            isUserGps: false
          });
          setGeoLocating(false);
          setShowLocationConsent(false);
          setGeoFeedback('GPS permission denied; using coastal demo pin.');
        },
        { timeout: 8000 }
      );
    } else {
      onLocationChange({
        name: 'Puri Coastal Sector (Demo)',
        coords: [19.80, 85.82],
        district: 'Puri',
        state: 'Odisha',
        isUserGps: false
      });
      setGeoLocating(false);
      setShowLocationConsent(false);
    }
  };

  return (
    <header className="cz-header">
      {/* Top Banner Row */}
      <div className="cz-header-top">
        {/* Brand & Purpose */}
        <div className="cz-brand-col">
          <div className="cz-brand-header">
            <div className="cz-logo-mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2a10 10 0 0 0-9.54 13.06L4 16l2-1"/>
                <path d="M12 22a10 10 0 0 0 9.54-13.06L20 8l-2 1"/>
              </svg>
            </div>
            <div>
              <h1 className="cz-brand-title">CycloVision AI</h1>
              <p className="cz-brand-sub">Citizen Safety & Emergency Information</p>
            </div>
          </div>
        </div>

        {/* Status Badges strictly honest */}
        <div className="cz-badges-wrap" role="status" aria-label="System status indicators">
          <span className="sci-badge sci-badge-cyan" title="Academic and Disaster Research Prototype">
            <ShieldCheck size={11} /> RESEARCH PROTOTYPE
          </span>
          <span className="sci-badge sci-badge-amber" title="Simulated demonstration dataset">
            <Database size={11} /> DEMO DATA
          </span>
          <span className="sci-badge sci-badge-blue" title="Connected to Simulated IMD / RSMC Bulletin Feed">
            <Radio size={11} /> OFFICIAL DATA: CONNECTED (DEMO)
          </span>
          <span className="sci-badge sci-badge-purple" title="Experimental GenesisNet AI output">
            <Sparkles size={11} /> AI EXPERIMENTAL
          </span>
        </div>

        {/* Citizen Account & Logout Controls */}
        <div className="cz-account-wrapper" ref={czMenuRef}>
          <div className="cz-user-dropdown-container">
            <button
              type="button"
              id="citizen-user-menu-btn"
              className="cz-user-menu-btn"
              onClick={() => setIsCzDropdownOpen(!isCzDropdownOpen)}
              aria-expanded={isCzDropdownOpen}
              title="Citizen Account Menu"
            >
              <Users size={13} className="text-accent" />
              <span>Citizen</span>
              <ChevronDown size={12} className={`cz-chevron ${isCzDropdownOpen ? 'open' : ''}`} />
            </button>

            {isCzDropdownOpen && (
              <div className="cz-user-dropdown-menu">
                <div className="cz-dropdown-profile">
                  <div className="cz-dropdown-name">Citizen User</div>
                  <div className="cz-dropdown-role font-mono">Public Safety Portal</div>
                </div>
                <div className="cz-dropdown-divider" />
                <button
                  type="button"
                  id="citizen-dropdown-logout-btn"
                  className="cz-dropdown-logout-action"
                  onClick={() => {
                    setIsCzDropdownOpen(false);
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
            id="citizen-logout-btn"
            className="cz-logout-btn"
            onClick={onLogout}
            title="Logout and return to login"
            aria-label="Logout Citizen Portal"
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Controls Bar: Location, State, District, Language, Time */}
      <div className="cz-controls-bar">
        {/* Location Button */}
        <div className="cz-ctrl-item">
          <button
            type="button"
            className={`cz-loc-btn ${userLocation?.isUserGps ? 'active-gps' : ''}`}
            onClick={handleRequestLocation}
            aria-label="Set or use my current location"
          >
            <MapPin size={14} className="text-accent" />
            <span className="cz-loc-text">
              {userLocation?.name || 'Use My Location'}
            </span>
          </button>
        </div>

        {/* State Selector */}
        <div className="cz-ctrl-item">
          <label htmlFor="cz-state-select" className="cz-ctrl-label">State</label>
          <select
            id="cz-state-select"
            className="cz-select"
            value={selectedState}
            onChange={(e) => {
              const newState = e.target.value;
              onSelectState(newState);
              const found = STATES_DISTRICTS.find((s) => s.state === newState);
              if (found && found.districts.length > 0) {
                onSelectDistrict(found.districts[0]);
              }
            }}
          >
            {STATES_DISTRICTS.map((s) => (
              <option key={s.state} value={s.state}>
                {s.state}
              </option>
            ))}
          </select>
        </div>

        {/* District Selector */}
        <div className="cz-ctrl-item">
          <label htmlFor="cz-district-select" className="cz-ctrl-label">District</label>
          <select
            id="cz-district-select"
            className="cz-select"
            value={selectedDistrict}
            onChange={(e) => onSelectDistrict(e.target.value)}
          >
            {availableDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Language Selector */}
        <div className="cz-ctrl-item">
          <label htmlFor="cz-lang-select" className="cz-ctrl-label">
            <Globe size={12} className="text-accent" />
            <span>Language</span>
          </label>
          <select
            id="cz-lang-select"
            className="cz-select"
            value={currentLanguage || 'en'}
            onChange={(e) => onSelectLanguage && onSelectLanguage(e.target.value)}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.native} ({l.label})
              </option>
            ))}
          </select>
        </div>

        {/* Last Updated Timestamp */}
        <div className="cz-ctrl-item cz-timestamp-item" title="Last updated data cycle">
          <Clock size={12} className="text-secondary" />
          <span className="cz-time-label">UPDATED:</span>
          <span className="cz-time-val font-mono">{lastUpdated}</span>
        </div>
      </div>

      {/* Geolocation Consent Modal per Section 10 */}
      {showLocationConsent && (
        <div className="cz-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="loc-consent-title">
          <div className="cz-modal-card">
            <div className="cz-modal-icon-wrap">
              <MapPin size={24} className="text-accent" />
            </div>
            <h3 id="loc-consent-title" className="cz-modal-title">Use Your Location?</h3>
            <p className="cz-modal-desc">
              CycloVision AI can use your device location to show local cyclone distance, personalized hazard risks, and attach your coordinates to emergency distress reports.
            </p>
            <div className="cz-modal-disclaimer">
              <AlertCircle size={14} className="text-amber" />
              <span>We do not track or store your location silently. It is only held in browser memory for this session.</span>
            </div>

            <div className="cz-modal-actions">
              <button
                type="button"
                className="sci-btn sci-btn-primary"
                onClick={handleConfirmLocation}
                disabled={geoLocating}
              >
                {geoLocating ? 'Locating...' : 'ALLOW LOCATION'}
              </button>
              <button
                type="button"
                className="sci-btn sci-btn-secondary"
                onClick={() => setShowLocationConsent(false)}
              >
                NOT NOW
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .cz-header {
          background: #091326;
          border-bottom: 1px solid var(--bg-card-border);
          position: sticky;
          top: 0;
          z-index: 999;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }
        .cz-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          gap: 16px;
          flex-wrap: wrap;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
        }
        .cz-brand-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cz-logo-mark {
          width: 38px;
          height: 38px;
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.3);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cz-brand-title {
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #ffffff;
          line-height: 1.2;
          margin: 0;
        }
        .cz-brand-sub {
          font-size: 12px;
          color: var(--accent-cyan);
          font-weight: 500;
          margin: 0;
        }
        .cz-badges-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cz-nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cz-switch-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.25);
          color: var(--text-primary);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cz-switch-btn:hover {
          background: rgba(56, 189, 248, 0.15);
          border-color: var(--accent-blue-light);
          color: #ffffff;
        }
        .cz-account-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }
        .cz-user-dropdown-container {
          position: relative;
        }
        .cz-user-menu-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.25);
          color: #e2e8f0;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .cz-user-menu-btn:hover {
          background: rgba(0, 229, 255, 0.16);
          border-color: rgba(0, 229, 255, 0.5);
          color: #ffffff;
        }
        .cz-chevron {
          transition: transform 0.2s ease;
        }
        .cz-chevron.open {
          transform: rotate(180deg);
        }
        .cz-user-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 200px;
          background: #0d1b2a;
          border: 1px solid rgba(0, 229, 255, 0.3);
          border-radius: var(--radius-sm);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
          padding: 8px 0;
          z-index: 1100;
          animation: fadeInCzMenu 0.15s ease-out;
        }
        @keyframes fadeInCzMenu {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cz-dropdown-profile {
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cz-dropdown-name {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
        }
        .cz-dropdown-role {
          font-size: 11px;
          color: var(--color-cyan, #00e5ff);
        }
        .cz-dropdown-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 6px 0;
        }
        .cz-dropdown-logout-action {
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
        .cz-dropdown-logout-action:hover {
          background: rgba(239, 68, 68, 0.15);
          color: #ffffff;
        }
        .cz-logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.3);
          color: #fca5a5;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .cz-logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
          color: #ffffff;
          transform: translateY(-1px);
        }
        .cz-controls-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 20px;
          background: #060d1b;
          overflow-x: auto;
          scrollbar-width: thin;
        }
        .cz-ctrl-item {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .cz-ctrl-label {
          font-size: 11px;
          color: var(--text-secondary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .cz-select {
          background: #0f192d;
          border: 1px solid var(--bg-card-border);
          color: var(--text-primary);
          padding: 5px 10px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 500;
          outline: none;
          cursor: pointer;
        }
        .cz-select:focus {
          border-color: var(--accent-cyan);
        }
        .cz-loc-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.3);
          color: var(--accent-cyan);
          padding: 5px 12px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cz-loc-btn:hover {
          background: rgba(0, 229, 255, 0.16);
        }
        .cz-loc-btn.active-gps {
          background: rgba(16, 185, 129, 0.15);
          border-color: var(--status-available);
          color: var(--status-available);
        }
        .cz-loc-text {
          max-width: 220px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cz-timestamp-item {
          margin-left: auto;
          font-size: 11px;
          color: var(--text-secondary);
        }
        .cz-time-label {
          font-size: 10px;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }
        .cz-time-val {
          color: var(--accent-cyan);
        }
        /* Consent Modal */
        .cz-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(4, 8, 15, 0.85);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 16px;
        }
        .cz-modal-card {
          background: #0f192d;
          border: 1px solid rgba(0, 229, 255, 0.3);
          border-radius: var(--radius-lg);
          padding: 24px;
          max-width: 440px;
          width: 100%;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .cz-modal-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: rgba(0, 229, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cz-modal-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }
        .cz-modal-desc {
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-secondary);
          margin: 0;
        }
        .cz-modal-disclaimer {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 11px;
          color: #fbbf24;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
        }
        .cz-modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 6px;
        }
        .cz-modal-actions button {
          flex: 1;
          padding: 10px;
        }
        @media (max-width: 768px) {
          .cz-header-top {
            padding: 10px 14px;
          }
          .cz-badges-wrap {
            display: none; /* Keep clean on small mobile */
          }
          .cz-controls-bar {
            padding: 8px 14px;
          }
          .cz-timestamp-item {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import {
  LifeBuoy,
  Phone,
  Send,
  X,
  CheckCircle2,
  AlertTriangle,
  Camera,
  MapPin,
  Users,
  Shield,
  ArrowRight
} from 'lucide-react';

import CitizenHeader from '../components/citizen/CitizenHeader';
import CurrentSituation from '../components/citizen/CurrentSituation';
import CitizenCycloneMap from '../components/citizen/CitizenCycloneMap';
import LocalRiskPanel from '../components/citizen/LocalRiskPanel';
import OfficialCitizenAlert from '../components/citizen/OfficialCitizenAlert';
import EmergencyHelpCard from '../components/citizen/EmergencyHelpCard';
import SafetyGuidance from '../components/citizen/SafetyGuidance';
import NearbyHelp from '../components/citizen/NearbyHelp';
import PreparednessChecklist from '../components/citizen/PreparednessChecklist';
import MyEmergencyStatus from '../components/citizen/MyEmergencyStatus';
import ExperimentalAISummary from '../components/citizen/ExperimentalAISummary';
import CitizenFooter from '../components/citizen/CitizenFooter';

import { CITIZEN_DASHBOARD_DATA } from '../services/mockData';
import { emergencyService } from '../services/emergencyService';

export default function CitizenDashboard({
  onNavigateView,
  onOpenCitizenEmergencyPage,
  onLogout
}) {
  // Region & Location State
  const [selectedState, setSelectedState] = useState('Odisha');
  const [selectedDistrict, setSelectedDistrict] = useState('Puri');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [userLocation, setUserLocation] = useState({
    name: 'Puri Sea Beach Road (Demo GPS Pin)',
    coords: [19.80, 85.82],
    district: 'Puri',
    state: 'Odisha',
    isUserGps: false
  });

  // Emergency Modal Form State
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [emergencyStep, setEmergencyStep] = useState('form'); // 'form' or 'submitted'
  const [emergencyType, setEmergencyType] = useState('Trapped');
  const [peopleCount, setPeopleCount] = useState(2);
  const [distressMessage, setDistressMessage] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactName, setContactName] = useState('');
  const [photoAttached, setPhotoAttached] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const emergencyCategories = [
    { id: 'Trapped', label: 'People Trapped', icon: '🚨' },
    { id: 'Flooding', label: 'Severe Flooding', icon: '🌊' },
    { id: 'Medical Emergency', label: 'Medical Emergency', icon: '🚑' },
    { id: 'Building Damage', label: 'House / Roof Collapsing', icon: '🏚️' },
    { id: 'Need Evacuation', label: 'Need Evacuation', icon: '🚤' },
    { id: 'Other', label: 'Other Urgent Hazard', icon: '⚠️' }
  ];

  const handleOpenEmergency = () => {
    setEmergencyStep('form');
    setIsEmergencyModalOpen(true);
  };

  const handleEmergencySubmit = (e) => {
    e.preventDefault();

    const newReq = emergencyService.createEmergencyRequest({
      location: userLocation.name || `${selectedDistrict} Coast`,
      coordinates: userLocation.coords || [19.80, 85.82],
      district: selectedDistrict,
      state: selectedState,
      emergencyType,
      peopleReported: peopleCount,
      message: distressMessage || `${emergencyType} distress call reported by citizen.`,
      contact: contactPhone || '+91 98765 43210',
      hasPhoto: photoAttached
    });

    setSubmittedTicket(newReq);
    setEmergencyStep('submitted');
  };

  return (
    <div className="cz-dashboard-layout">
      {/* 1. Header with Language, Location, Status */}
      <CitizenHeader
        selectedState={selectedState}
        onSelectState={(st) => setSelectedState(st)}
        selectedDistrict={selectedDistrict}
        onSelectDistrict={(dt) => setSelectedDistrict(dt)}
        userLocation={userLocation}
        onLocationChange={(loc) => {
          setUserLocation(loc);
          if (loc.district) setSelectedDistrict(loc.district);
          if (loc.state) setSelectedState(loc.state);
        }}
        currentLanguage={currentLanguage}
        onSelectLanguage={(lang) => setCurrentLanguage(lang)}
        lastUpdated="03 Sep 2026 12:00 UTC"
        onOpenEmergencyForm={handleOpenEmergency}
        onNavigateView={onNavigateView}
        onLogout={onLogout}
      />

      {/* Main Container */}
      <main className="cz-content-container">
        {/* 2. CURRENT SITUATION — HIGHEST PRIORITY */}
        <CurrentSituation
          situationData={CITIZEN_DASHBOARD_DATA.currentSituation}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
          userLocation={userLocation}
        />

        {/* 3. CITIZEN-FRIENDLY CYCLONE MAP */}
        <CitizenCycloneMap
          userLocation={userLocation}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />

        {/* 4. RISK IN MY AREA (PLAIN LANGUAGE HAZARDS) */}
        <LocalRiskPanel
          localRiskData={CITIZEN_DASHBOARD_DATA.localRisk}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />

        {/* 5. OFFICIAL ALERTS & WARNINGS (STRICTLY SEPARATED) */}
        <OfficialCitizenAlert
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
        />

        {/* 6. PROMINENT NEED EMERGENCY HELP CALLOUT */}
        <EmergencyHelpCard
          onOpenEmergencyForm={handleOpenEmergency}
        />

        {/* 7. DUAL COLUMN: SAFETY GUIDANCE & NEARBY HELP */}
        <div className="cz-two-col-grid">
          <SafetyGuidance />
          <NearbyHelp selectedDistrict={selectedDistrict} />
        </div>

        {/* 8. DUAL COLUMN: PREPAREDNESS & REQUEST STATUS */}
        <div className="cz-two-col-grid">
          <PreparednessChecklist />
          <MyEmergencyStatus
            onOpenEmergencyForm={handleOpenEmergency}
          />
        </div>

        {/* 9. EXPERIMENTAL AI SUMMARY */}
        <ExperimentalAISummary />
      </main>

      {/* 10. Persistent Citizen Footer */}
      <CitizenFooter onNavigateView={onNavigateView} />

      {/* 11. Sticky Mobile Emergency Bar per Section 24 */}
      <div className="cz-sticky-mobile-bar" role="region" aria-label="Mobile Emergency Quick Action">
        <div className="sticky-info">
          <span className="sticky-risk-tag font-mono">RISK: HIGH</span>
          <span className="sticky-loc-text">{selectedDistrict} Coastal Sector</span>
        </div>
        <button
          type="button"
          className="sticky-action-btn"
          onClick={handleOpenEmergency}
          aria-label="Send Emergency Request"
        >
          <LifeBuoy size={16} />
          <span>NEED HELP? REPORT</span>
        </button>
      </div>

      {/* 12. Integrated Emergency Report Modal (Two-Way Shared Service) */}
      {isEmergencyModalOpen && (
        <div className="cz-emergency-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-emerg-title">
          <div className="cz-emergency-modal-card">
            <div className="modal-top-bar">
              <div className="modal-title-wrap">
                <LifeBuoy size={20} className="text-danger" />
                <div>
                  <h2 id="modal-emerg-title" className="modal-main-title">
                    CITIZEN EMERGENCY REPORT
                  </h2>
                  <span className="modal-sub font-mono">TWO-WAY EOC DISTRESS TRANSMISSION</span>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsEmergencyModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {emergencyStep === 'form' ? (
              <form onSubmit={handleEmergencySubmit} className="modal-form-body">
                {/* Location Confirmation */}
                <div className="modal-form-row">
                  <label className="m-label">
                    <MapPin size={13} className="text-accent" /> VERIFIED LOCATION PIN
                  </label>
                  <div className="m-loc-display font-mono">
                    <span>{userLocation.name}</span>
                    <span className="loc-coords">[{userLocation.coords.join(', ')}]</span>
                  </div>
                </div>

                {/* Emergency Type */}
                <div className="modal-form-row">
                  <label className="m-label">SELECT EMERGENCY TYPE</label>
                  <div className="emerg-type-pills">
                    {emergencyCategories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className={`type-pill ${emergencyType === c.id ? 'active' : ''}`}
                        onClick={() => setEmergencyType(c.id)}
                      >
                        <span className="p-icon">{c.icon}</span>
                        <span className="p-text">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* People Count */}
                <div className="modal-form-row">
                  <label className="m-label">
                    <Users size={13} className="text-accent" /> NUMBER OF PEOPLE NEEDING ASSISTANCE
                  </label>
                  <div className="people-picker">
                    <button
                      type="button"
                      className="picker-btn"
                      onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                    >
                      -
                    </button>
                    <span className="picker-val font-mono">{peopleCount}</span>
                    <button
                      type="button"
                      className="picker-btn"
                      onClick={() => setPeopleCount(peopleCount + 1)}
                    >
                      +
                    </button>
                    <span className="picker-desc">Persons at this pin</span>
                  </div>
                </div>

                {/* Short Message */}
                <div className="modal-form-row">
                  <label className="m-label" htmlFor="m-desc">SHORT DESCRIPTION / LANDMARKS</label>
                  <textarea
                    id="m-desc"
                    className="m-textarea"
                    rows="3"
                    placeholder="e.g. Near post office, water rising fast to chest height, 2 senior citizens inside."
                    value={distressMessage}
                    onChange={(e) => setDistressMessage(e.target.value)}
                  />
                </div>

                {/* Optional Photo */}
                <div className="modal-form-row">
                  <label className="m-label">OPTIONAL PHOTO</label>
                  <div
                    className={`m-photo-box ${photoAttached ? 'attached' : ''}`}
                    onClick={() => setPhotoAttached(!photoAttached)}
                  >
                    <Camera size={18} className={photoAttached ? 'text-success' : 'text-muted'} />
                    <span>{photoAttached ? '✓ Simulated Inundation Photo Attached' : 'Tap to attach photo of water level / damage'}</span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="modal-form-row">
                  <label className="m-label" htmlFor="m-phone">
                    <Phone size={13} className="text-accent" /> CONTACT PHONE NUMBER
                  </label>
                  <div className="contact-row">
                    <input
                      type="tel"
                      id="m-phone"
                      className="m-input"
                      placeholder="Your Mobile Number (e.g. +91 98451 22891)"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="m-input"
                      placeholder="Your Name (Optional)"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="privacy-note font-mono">
                    <Shield size={11} className="text-accent" />
                    <span>Contact information is only shared with authorized District EOC dispatchers.</span>
                  </div>
                </div>

                {/* Submit CTA */}
                <button type="submit" className="m-submit-btn">
                  <Send size={16} />
                  <span>TRANSMIT EMERGENCY REQUEST</span>
                </button>

                <p className="proto-honest-foot font-mono">
                  DEMO PROTOCOL • Attaches request to shared Government EOC Dashboard
                </p>
              </form>
            ) : (
              /* Submission Success View */
              <div className="modal-success-body">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={44} className="text-success" />
                </div>
                <h3 className="success-title">REQUEST RECEIVED</h3>
                <p className="success-desc">
                  Your distress report has been registered in the shared prototype store and is now visible on the Government EOC Dashboard.
                </p>

                {submittedTicket && (
                  <div className="ticket-summary font-mono">
                    <div className="t-line">
                      <span>TICKET ID:</span> <strong>{submittedTicket.id}</strong>
                    </div>
                    <div className="t-line">
                      <span>TIME:</span> <span>{submittedTicket.timestamp}</span>
                    </div>
                    <div className="t-line">
                      <span>STATUS:</span> <strong className="text-success">{submittedTicket.status}</strong>
                    </div>
                    <div className="t-line">
                      <span>LOCATION:</span> <span>{submittedTicket.location}</span>
                    </div>
                  </div>
                )}

                <div className="urgent-phone-alert">
                  <Phone size={16} className="text-danger flex-shrink-0" />
                  <div>
                    <strong>DO NOT WAIT IF IN IMMEDIATE DANGER:</strong>
                    <p>Always telephone <strong>112</strong> or <strong>1070</strong> directly. This software prototype is for testing decision-support workflows.</p>
                  </div>
                </div>

                <div className="success-actions">
                  <button
                    type="button"
                    className="sci-btn sci-btn-primary"
                    onClick={() => setIsEmergencyModalOpen(false)}
                  >
                    Track in "My Emergency Status"
                  </button>
                  {onNavigateView && (
                    <button
                      type="button"
                      className="sci-btn sci-btn-secondary"
                      onClick={() => {
                        setIsEmergencyModalOpen(false);
                        onNavigateView('citizen-requests');
                      }}
                    >
                      View in Government EOC Table <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .cz-dashboard-layout {
          min-height: 100vh;
          background: #04080f;
          color: #f1f5f9;
          display: flex;
          flex-direction: column;
        }
        .cz-content-container {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cz-two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        /* Sticky Mobile Emergency Button */
        .cz-sticky-mobile-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(9, 17, 34, 0.96);
          backdrop-filter: blur(12px);
          border-top: 2px solid #ef4444;
          padding: 10px 16px;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.6);
        }
        .sticky-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sticky-risk-tag {
          font-size: 10px;
          font-weight: 800;
          color: #ef4444;
          letter-spacing: 0.05em;
        }
        .sticky-loc-text {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .sticky-action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #ef4444;
          color: #ffffff;
          border: none;
          padding: 10px 16px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }
        /* Modal */
        .cz-emergency-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(4, 8, 15, 0.88);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 16px;
        }
        .cz-emergency-modal-card {
          background: #091326;
          border: 1px solid rgba(239, 68, 68, 0.4);
          border-radius: var(--radius-lg);
          max-width: 580px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
        }
        .modal-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: #0d1a33;
          border-bottom: 1px solid rgba(148, 163, 184, 0.15);
        }
        .modal-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .modal-main-title {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.03em;
        }
        .modal-sub {
          font-size: 10px;
          color: var(--accent-cyan);
        }
        .modal-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
        }
        .modal-close-btn:hover {
          color: #ffffff;
        }
        .modal-form-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .modal-form-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .m-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 5px;
          letter-spacing: 0.04em;
        }
        .m-loc-display {
          background: #04080f;
          border: 1px solid rgba(0, 229, 255, 0.3);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .loc-coords {
          color: var(--text-muted);
          font-size: 11px;
        }
        .emerg-type-pills {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 8px;
        }
        .type-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-secondary);
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          text-align: left;
        }
        .type-pill.active {
          background: rgba(239, 68, 68, 0.15);
          border-color: #ef4444;
          color: #ffffff;
        }
        .people-picker {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .picker-btn {
          width: 32px;
          height: 32px;
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: #ffffff;
          border-radius: var(--radius-sm);
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .picker-val {
          font-size: 16px;
          font-weight: 800;
          color: var(--accent-cyan);
          min-width: 24px;
          text-align: center;
        }
        .picker-desc {
          font-size: 12px;
          color: var(--text-muted);
        }
        .m-textarea {
          background: #04080f;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #ffffff;
          padding: 10px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-family: inherit;
          resize: vertical;
          outline: none;
        }
        .m-textarea:focus {
          border-color: var(--accent-cyan);
        }
        .m-photo-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #04080f;
          border: 1px dashed rgba(148, 163, 184, 0.3);
          padding: 12px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .m-photo-box.attached {
          border-color: #10b981;
          color: #10b981;
          background: rgba(16, 185, 129, 0.05);
        }
        .contact-row {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 8px;
        }
        .m-input {
          background: #04080f;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #ffffff;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          outline: none;
        }
        .m-input:focus {
          border-color: var(--accent-cyan);
        }
        .privacy-note {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .m-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #ef4444;
          color: #ffffff;
          border: none;
          padding: 14px;
          border-radius: var(--radius-md);
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);
        }
        .m-submit-btn:hover {
          background: #dc2626;
        }
        .proto-honest-foot {
          text-align: center;
          font-size: 10px;
          color: #f59e0b;
          margin: 0;
        }
        .modal-success-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
        }
        .success-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .success-title {
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }
        .success-desc {
          font-size: 13px;
          color: var(--text-secondary);
          max-width: 440px;
          line-height: 1.5;
          margin: 0;
        }
        .ticket-summary {
          background: #04080f;
          border: 1px solid rgba(0, 229, 255, 0.25);
          padding: 12px 16px;
          border-radius: var(--radius-md);
          width: 100%;
          text-align: left;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .t-line {
          display: flex;
          justify-content: space-between;
        }
        .urgent-phone-alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          text-align: left;
          font-size: 12px;
          color: #fca5a5;
        }
        .success-actions {
          display: flex;
          gap: 10px;
          width: 100%;
          margin-top: 6px;
        }
        .success-actions button {
          flex: 1;
        }
        @media (max-width: 900px) {
          .cz-two-col-grid {
            grid-template-columns: 1fr;
          }
          .cz-content-container {
            padding-bottom: 72px; /* For mobile sticky bar */
          }
          .cz-sticky-mobile-bar {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}

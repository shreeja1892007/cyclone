import React, { useState } from 'react';
import {
  LifeBuoy,
  MapPin,
  Users,
  AlertTriangle,
  Phone,
  Camera,
  Send,
  CheckCircle2,
  Clock,
  Shield,
  ArrowLeft,
  Info,
  Check,
  LogOut
} from 'lucide-react';
import { emergencyService } from '../services/emergencyService';

export default function CitizenEmergencyPage({ onBackToDashboard, onLogout }) {
  const [step, setStep] = useState('form'); // 'form' or 'submitted'
  const [locationName, setLocationName] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [emergencyType, setEmergencyType] = useState('Trapped');
  const [peopleCount, setPeopleCount] = useState(2);
  const [message, setMessage] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [photoSelected, setPhotoSelected] = useState(false);
  const [createdRequest, setCreatedRequest] = useState(null);
  const [district, setDistrict] = useState('Puri');

  const emergencyTypes = [
    { id: 'Trapped', label: 'People Trapped', icon: '🚨' },
    { id: 'Flooding', label: 'Severe Flooding', icon: '🌊' },
    { id: 'Medical Emergency', label: 'Medical Emergency', icon: '🚑' },
    { id: 'Building Damage', label: 'Roof / House Collapsing', icon: '🏚️' },
    { id: 'Need Evacuation', label: 'Need Evacuation', icon: '🚤' },
    { id: 'Other', label: 'Other Hazard', icon: '⚠️' }
  ];

  const presetLocations = [
    { label: 'Puri Sea Beach, Ward 2', coords: [19.80, 85.82], dist: 'Puri' },
    { label: 'Gopalpur Coastal Road', coords: [19.26, 84.91], dist: 'Ganjam' },
    { label: 'Paradip Port Sector 4', coords: [20.29, 86.67], dist: 'Jagatsinghpur' },
    { label: 'Astaranga Village Centre', coords: [19.98, 86.27], dist: 'Puri' }
  ];

  // Geolocation Handler
  const handleGetLocation = () => {
    setLocationLoading(true);
    setLocationStatus('Acquiring high-accuracy GPS coordinates...');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = parseFloat(pos.coords.latitude.toFixed(4));
          const lon = parseFloat(pos.coords.longitude.toFixed(4));
          setCoordinates([lat, lon]);
          setLocationName(`Current GPS (${lat}°N, ${lon}°E)`);
          setLocationStatus('GPS Coordinates Locked.');
          setLocationLoading(false);
        },
        (err) => {
          console.warn('Geolocation failed or denied, using coastal preset:', err);
          const fallback = presetLocations[0];
          setCoordinates(fallback.coords);
          setLocationName(fallback.label);
          setDistrict(fallback.dist);
          setLocationStatus('Selected Coastal Test Location (GPS fallback).');
          setLocationLoading(false);
        },
        { timeout: 6000 }
      );
    } else {
      const fallback = presetLocations[0];
      setCoordinates(fallback.coords);
      setLocationName(fallback.label);
      setDistrict(fallback.dist);
      setLocationStatus('Selected Coastal Test Location.');
      setLocationLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const coordsToUse = coordinates || [19.81, 85.83];
    const locToUse = locationName || 'Coastal Puri Sector';

    const newReq = emergencyService.createEmergencyRequest({
      location: locToUse,
      coordinates: coordsToUse,
      district: district,
      state: 'Odisha',
      emergencyType: emergencyType,
      peopleReported: peopleCount,
      message: message || `${emergencyType} distress call reported by citizen.`,
      contact: contactPhone || '+91 98765 43210',
      hasPhoto: photoSelected
    });

    setCreatedRequest(newReq);
    setStep('submitted');
  };

  return (
    <div className="citizen-page-wrapper">
      {/* CITIZEN TOP HEADER */}
      <header className="citizen-header">
        <div className="citizen-head-left">
          <div className="citizen-logo-icon">
            <LifeBuoy size={20} className="text-danger" />
          </div>
          <div>
            <div className="citizen-brand-name">CycloVision AI</div>
            <div className="citizen-portal-tag">Citizen Emergency Connect</div>
          </div>
        </div>

        <div className="citizen-head-right">
          {onBackToDashboard && (
            <button className="sci-btn sci-btn-secondary sci-btn-xs" onClick={onBackToDashboard}>
              <ArrowLeft size={13} />
              <span>Government Dashboard</span>
            </button>
          )}
          {onLogout && (
            <button
              type="button"
              id="citizen-emergency-logout-btn"
              className="cz-emergency-logout-btn"
              onClick={onLogout}
              title="Logout from Citizen Portal"
              aria-label="Logout Citizen Portal"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="citizen-container">
        {step === 'form' ? (
          <div className="citizen-card">
            {/* HERO NOTICE */}
            <div className="hero-alert-banner">
              <h1 className="hero-title">NEED EMERGENCY HELP?</h1>
              <p className="hero-subtitle">
                Submit this distress report to alert the State & District Emergency Operations Centre (EOC).
              </p>
            </div>

            {/* OFFICIAL CALL-OUT DISCLAIMER */}
            <div className="official-dial-box">
              <Phone size={16} className="text-danger" />
              <div>
                <strong>FOR IMMEDIATE LIFE-THREATENING EMERGENCIES CALL:</strong>
                <div className="emergency-numbers font-mono">
                  <span>112 (National Emergency)</span> • <span>1070 (Disaster Helpline)</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="citizen-form">
              {/* 1. LOCATION SHARING */}
              <div className="form-section">
                <label className="form-label">
                  <MapPin size={14} className="text-accent" /> STEP 1: SHARE YOUR LOCATION
                </label>
                <button
                  type="button"
                  className="location-action-btn"
                  onClick={handleGetLocation}
                  disabled={locationLoading}
                >
                  <MapPin size={16} />
                  <span>{locationLoading ? 'Detecting Location...' : 'SEND MY LOCATION'}</span>
                </button>

                {locationStatus && (
                  <div className="location-feedback font-mono">
                    <Check size={12} className="text-success" />
                    <span>{locationName} {coordinates ? `[${coordinates.join(', ')}]` : ''}</span>
                  </div>
                )}

                {/* Quick Presets for Demo */}
                <div className="preset-quick-pills">
                  <span className="preset-label">Or select coastal demo spot:</span>
                  <div className="preset-buttons">
                    {presetLocations.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        className={`preset-btn ${locationName === p.label ? 'active' : ''}`}
                        onClick={() => {
                          setLocationName(p.label);
                          setCoordinates(p.coords);
                          setDistrict(p.dist);
                          setLocationStatus(`Selected ${p.label}`);
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. EMERGENCY TYPE */}
              <div className="form-section">
                <label className="form-label">
                  <AlertTriangle size={14} className="text-amber" /> STEP 2: SELECT EMERGENCY TYPE
                </label>
                <div className="emergency-type-grid">
                  {emergencyTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      className={`type-card ${emergencyType === type.id ? 'selected' : ''}`}
                      onClick={() => setEmergencyType(type.id)}
                    >
                      <span className="type-icon">{type.icon}</span>
                      <span className="type-title">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. NUMBER OF PEOPLE */}
              <div className="form-section">
                <label className="form-label" htmlFor="people-count">
                  <Users size={14} className="text-accent" /> STEP 3: NUMBER OF PEOPLE NEEDING HELP
                </label>
                <div className="people-stepper">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                  >
                    -
                  </button>
                  <span className="stepper-display font-mono">{peopleCount}</span>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => setPeopleCount(peopleCount + 1)}
                  >
                    +
                  </button>
                  <span className="stepper-desc">people at location</span>
                </div>
              </div>

              {/* 4. SHORT MESSAGE */}
              <div className="form-section">
                <label className="form-label" htmlFor="distress-message">
                  STEP 4: SHORT MESSAGE (LANDMARKS / DETAILS)
                </label>
                <textarea
                  id="distress-message"
                  className="form-textarea"
                  rows="3"
                  placeholder="e.g., Near post office; water level rising past doorway; elderly family member present."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              {/* 5. OPTIONAL PHOTO SIMULATION */}
              <div className="form-section">
                <label className="form-label">
                  <Camera size={14} className="text-secondary" /> OPTIONAL: ATTACH PHOTO
                </label>
                <div
                  className={`photo-upload-box ${photoSelected ? 'uploaded' : ''}`}
                  onClick={() => setPhotoSelected(!photoSelected)}
                >
                  <Camera size={20} className={photoSelected ? 'text-success' : 'text-muted'} />
                  <span>{photoSelected ? '✓ Photo Attached (Simulated Inundation Preview)' : 'Tap to attach photo of water level / damage'}</span>
                </div>
              </div>

              {/* 6. CONTACT INFORMATION */}
              <div className="form-section">
                <label className="form-label" htmlFor="contact-phone">
                  <Phone size={14} className="text-accent" /> STEP 5: CONTACT INFORMATION
                </label>
                <div className="contact-input-row">
                  <input
                    type="tel"
                    id="contact-phone"
                    className="form-input"
                    placeholder="Your Phone Number (e.g. +91 98451 22891)"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your Name (Optional)"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>
                <div className="privacy-consent-note">
                  <Shield size={11} className="text-accent" />
                  <span>Your contact details are encrypted and only accessible to verified Government Emergency Responders.</span>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button type="submit" className="submit-emergency-btn">
                <Send size={18} />
                <span>SEND EMERGENCY REQUEST</span>
              </button>
            </form>
          </div>
        ) : (
          /* SUBMITTED CONFIRMATION SCREEN (SECTION 37) */
          <div className="citizen-card confirmation-card">
            <div className="confirmation-badge-wrap">
              <CheckCircle2 size={48} className="text-success" />
            </div>

            <h2 className="confirm-title">REQUEST RECEIVED</h2>
            <p className="confirm-subtitle">
              Your distress report has been transmitted to the Government Emergency Operations Centre.
            </p>

            {createdRequest && (
              <div className="request-ticket font-mono">
                <div className="ticket-row">
                  <span className="t-k">EMERGENCY ID:</span>
                  <span className="t-v text-accent font-bold">{createdRequest.id}</span>
                </div>
                <div className="ticket-row">
                  <span className="t-k">SUBMISSION TIME:</span>
                  <span className="t-v">{createdRequest.timestamp}</span>
                </div>
                <div className="ticket-row">
                  <span className="t-k">LOCATION:</span>
                  <span className="t-v">{createdRequest.location}</span>
                </div>
                <div className="ticket-row">
                  <span className="t-k">EMERGENCY TYPE:</span>
                  <span className="t-v">{createdRequest.emergencyType} ({createdRequest.peopleReported} persons)</span>
                </div>
                <div className="ticket-row">
                  <span className="t-k">CURRENT STATUS:</span>
                  <span className="t-v text-success font-bold">{createdRequest.status}</span>
                </div>
              </div>
            )}

            {/* LIVE STATUS PROGRESSION TRACKER (SECTION 37) */}
            <div className="status-progression-box">
              <span className="prog-title">RESPONSE WORKFLOW PROGRESSION:</span>
              <div className="prog-steps">
                <div className="prog-step active">
                  <div className="prog-dot done">✓</div>
                  <span className="prog-label">Received</span>
                </div>
                <div className="prog-line"></div>
                <div className="prog-step">
                  <div className="prog-dot">2</div>
                  <span className="prog-label">Verification</span>
                </div>
                <div className="prog-line"></div>
                <div className="prog-step">
                  <div className="prog-dot">3</div>
                  <span className="prog-label">Team Assigned</span>
                </div>
                <div className="prog-line"></div>
                <div className="prog-step">
                  <div className="prog-dot">4</div>
                  <span className="prog-label">Responding</span>
                </div>
                <div className="prog-line"></div>
                <div className="prog-step">
                  <div className="prog-dot">5</div>
                  <span className="prog-label">Resolved</span>
                </div>
              </div>
            </div>

            <div className="urgent-safety-note">
              <AlertTriangle size={16} className="text-amber" />
              <div>
                <strong>IMPORTANT PROTOTYPE NOTICE:</strong>
                <p>CycloVision AI is an experimental decision-support prototype. In a real life-threatening emergency, always continue to call <strong>112</strong> or <strong>1070</strong>.</p>
              </div>
            </div>

            <div className="confirm-actions">
              <button
                className="sci-btn sci-btn-primary"
                onClick={() => {
                  setStep('form');
                  setMessage('');
                  setPhotoSelected(false);
                }}
              >
                <span>Submit Another Request</span>
              </button>
              {onBackToDashboard && (
                <button
                  className="sci-btn sci-btn-secondary"
                  onClick={onBackToDashboard}
                >
                  <span>View in Government Dashboard</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .citizen-page-wrapper {
          min-height: 100vh;
          background: #060d1b;
          color: #f8fafc;
          display: flex;
          flex-direction: column;
        }
        .citizen-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: #091326;
          border-bottom: 1px solid var(--bg-card-border);
        }
        .citizen-head-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .citizen-head-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cz-emergency-logout-btn {
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
        .cz-emergency-logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
          color: #ffffff;
          transform: translateY(-1px);
        }
        .citizen-logo-icon {
          width: 32px;
          height: 32px;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.4);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .citizen-brand-name {
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
        }
        .citizen-portal-tag {
          font-size: 11px;
          color: var(--accent-cyan);
        }
        .citizen-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 14px;
        }
        .citizen-card {
          width: 100%;
          max-width: 540px;
          background: #0b1528;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .hero-alert-banner {
          text-align: center;
          margin-bottom: 16px;
        }
        .hero-title {
          font-size: 22px;
          font-weight: 900;
          color: #f87171;
          letter-spacing: -0.01em;
        }
        .hero-subtitle {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .official-dial-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.35);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          font-size: 11px;
          color: #ffffff;
          margin-bottom: 18px;
        }
        .emergency-numbers {
          color: #f87171;
          font-weight: 700;
          margin-top: 2px;
        }
        .citizen-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-size: 11px;
          font-weight: 800;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .location-action-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #0284c7, #0369a1);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 12px;
          border-radius: var(--radius-md);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .location-action-btn:hover {
          background: linear-gradient(135deg, #0369a1, #075985);
        }
        .location-feedback {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #38bdf8;
          background: rgba(0, 229, 255, 0.08);
          padding: 4px 8px;
          border-radius: 4px;
        }
        .preset-quick-pills {
          margin-top: 4px;
        }
        .preset-label {
          font-size: 10px;
          color: var(--text-muted);
          display: block;
          margin-bottom: 4px;
        }
        .preset-buttons {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .preset-btn {
          background: #111d35;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-secondary);
          font-size: 10px;
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
        }
        .preset-btn.active {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }
        .emergency-type-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .type-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          background: #111d35;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: var(--radius-md);
          padding: 10px 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .type-card:hover {
          border-color: rgba(239, 68, 68, 0.4);
        }
        .type-card.selected {
          background: rgba(239, 68, 68, 0.15);
          border-color: #ef4444;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
        }
        .type-icon {
          font-size: 20px;
        }
        .type-title {
          font-size: 10px;
          font-weight: 700;
          color: #ffffff;
          text-align: center;
        }
        .people-stepper {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #111d35;
          border: 1px solid rgba(148, 163, 184, 0.2);
          padding: 6px 12px;
          border-radius: var(--radius-md);
        }
        .stepper-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #1e293b;
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }
        .stepper-display {
          font-size: 18px;
          font-weight: 800;
          color: var(--accent-cyan);
          min-width: 24px;
          text-align: center;
        }
        .stepper-desc {
          font-size: 11px;
          color: var(--text-muted);
        }
        .form-textarea {
          background: #111d35;
          border: 1px solid rgba(148, 163, 184, 0.25);
          border-radius: var(--radius-md);
          padding: 8px 10px;
          color: #ffffff;
          font-size: 12px;
          outline: none;
          resize: vertical;
        }
        .photo-upload-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #111d35;
          border: 1px dashed rgba(148, 163, 184, 0.3);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          cursor: pointer;
          font-size: 11px;
          color: var(--text-secondary);
        }
        .photo-upload-box.uploaded {
          border-color: #10b981;
          color: #34d399;
          background: rgba(16, 185, 129, 0.08);
        }
        .contact-input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .form-input {
          background: #111d35;
          border: 1px solid rgba(148, 163, 184, 0.25);
          border-radius: var(--radius-md);
          padding: 8px 10px;
          color: #ffffff;
          font-size: 12px;
          outline: none;
        }
        .privacy-consent-note {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .submit-emergency-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: #ffffff;
          border: none;
          padding: 14px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.03em;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4);
          transition: transform 0.15s ease;
        }
        .submit-emergency-btn:hover {
          transform: translateY(-1px);
        }

        /* Confirmation styles */
        .confirmation-card {
          text-align: center;
        }
        .confirmation-badge-wrap {
          margin-bottom: 12px;
        }
        .confirm-title {
          font-size: 20px;
          font-weight: 900;
          color: #ffffff;
        }
        .confirm-subtitle {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 4px;
          margin-bottom: 16px;
        }
        .request-ticket {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-md);
          padding: 12px;
          text-align: left;
          font-size: 11px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }
        .ticket-row {
          display: flex;
          justify-content: space-between;
        }
        .t-k { color: var(--text-muted); }
        .t-v { color: #f1f5f9; }

        .status-progression-box {
          background: #111d35;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-md);
          padding: 12px;
          margin-bottom: 16px;
        }
        .prog-title {
          font-size: 9px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 10px;
          display: block;
        }
        .prog-steps {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .prog-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .prog-dot {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #1e293b;
          border: 1px solid var(--bg-card-border);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .prog-dot.done {
          background: #10b981;
          color: #ffffff;
          border-color: #10b981;
        }
        .prog-label {
          font-size: 9px;
          color: var(--text-secondary);
        }
        .prog-line {
          flex: 1;
          height: 2px;
          background: rgba(148, 163, 184, 0.2);
          margin: 0 4px;
          margin-bottom: 14px;
        }
        .urgent-safety-note {
          display: flex;
          gap: 8px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: var(--radius-md);
          padding: 10px;
          font-size: 11px;
          text-align: left;
          color: #fde68a;
          margin-bottom: 16px;
        }
        .confirm-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

import React, { useState } from 'react';
import {
  UserPlus,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';

const ROLE_OPTIONS = [
  { id: 'researcher',  label: 'Researcher' },
  { id: 'government',  label: 'Government Official' },
  { id: 'citizen',     label: 'Citizen' },
];

export default function SignupPage({ onGoToLogin }) {
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [role, setRole]           = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [done, setDone]           = useState(false);
  const [error, setError]         = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim())                          { setError('Please enter your full name.'); return; }
    if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email address.'); return; }
    if (password.length < 6)                   { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirmPw)                { setError('Passwords do not match.'); return; }
    if (!role)                                 { setError('Please select your role.'); return; }

    setLoading(true);
    // Prototype — simulate registration delay
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 700);
  };

  if (done) {
    return (
      <div className="sp-root">
        <div className="sp-bg-mesh" aria-hidden="true" />
        <div className="sp-center-wrap">
          <div className="sp-success-card">
            <div className="sp-success-icon" aria-hidden="true">✓</div>
            <h2 className="sp-success-title">Account Request Submitted</h2>
            <p className="sp-success-msg">
              This is a prototype system. Account creation is simulated.<br />
              Use the demo credentials on the login page to access the platform.
            </p>
            <button className="sp-back-btn" onClick={onGoToLogin}>
              ← Back to Login
            </button>
          </div>
        </div>
        <style>{spStyles}</style>
      </div>
    );
  }

  return (
    <div className="sp-root">
      <div className="sp-bg-mesh" aria-hidden="true" />

      <div className="sp-center-wrap">

        {/* Brand */}
        <div className="sp-brand">
          <div className="sp-logo-icon" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
                 stroke="#00e5ff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2a10 10 0 0 0-9.54 13.06L4 16l2-1"/>
              <path d="M12 22a10 10 0 0 0 9.54-13.06L20 8l-2 1"/>
            </svg>
          </div>
          <div>
            <h1 className="sp-app-name">CycloVision AI</h1>
            <p className="sp-app-tagline">Tropical Cyclone Intelligence Platform</p>
          </div>
        </div>

        {/* Card */}
        <div className="sp-card" role="main">

          <div className="sp-card-header">
            <UserPlus size={18} className="sp-card-icon" />
            <span className="sp-card-title">CREATE ACCOUNT</span>
          </div>

          <div className="sp-proto-notice" role="note">
            <ShieldCheck size={13} />
            <span>PROTOTYPE REGISTRATION — Simulated only. No real account is created.</span>
          </div>

          <form onSubmit={handleSubmit} className="sp-form" noValidate>

            {/* Full Name */}
            <div className="sp-field-group">
              <label htmlFor="sp-name" className="sp-label">Full Name</label>
              <input
                id="sp-name"
                type="text"
                className="sp-input"
                placeholder="Your full name"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="sp-field-group">
              <label htmlFor="sp-email" className="sp-label">Email Address</label>
              <input
                id="sp-email"
                type="email"
                className="sp-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                autoComplete="email"
                spellCheck={false}
              />
            </div>

            {/* Role */}
            <div className="sp-field-group">
              <label htmlFor="sp-role" className="sp-label">Role</label>
              <select
                id="sp-role"
                className="sp-select"
                value={role}
                onChange={(e) => { setRole(e.target.value); setError(''); }}
              >
                <option value="">Select Role ▼</option>
                {ROLE_OPTIONS.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div className="sp-field-group">
              <label htmlFor="sp-password" className="sp-label">Password</label>
              <div className="sp-input-icon-wrap">
                <input
                  id="sp-password"
                  type={showPass ? 'text' : 'password'}
                  className="sp-input sp-input-with-icon"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="sp-pass-toggle"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="sp-field-group">
              <label htmlFor="sp-confirm" className="sp-label">Confirm Password</label>
              <input
                id="sp-confirm"
                type={showPass ? 'text' : 'password'}
                className="sp-input"
                placeholder="Re-enter password"
                value={confirmPw}
                onChange={(e) => { setConfirmPw(e.target.value); setError(''); }}
                autoComplete="new-password"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="sp-error-box" role="alert">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              id="sp-register-btn"
              type="submit"
              className="sp-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="sp-spinner" />
                  <span>Creating Account…</span>
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  <span>CREATE ACCOUNT</span>
                </>
              )}
            </button>

          </form>

          {/* Back to login */}
          <div className="sp-divider">
            <span>Already have an account?</span>
          </div>
          <button
            id="sp-back-to-login-btn"
            type="button"
            className="sp-back-btn-outline"
            onClick={onGoToLogin}
          >
            ← Back to Login
          </button>

        </div>

        <p className="sp-footer-text">
          Research &amp; Educational Prototype — Not an official government system.
        </p>

      </div>
      <style>{spStyles}</style>
    </div>
  );
}

const spStyles = `
  .sp-root {
    min-height: 100vh;
    background: #060c17;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px 40px;
    position: relative;
    overflow: hidden;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    box-sizing: border-box;
  }
  .sp-bg-mesh {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 50% at 50% -10%, rgba(0,229,255,0.06) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 10% 90%, rgba(52,211,153,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
  .sp-center-wrap {
    width: 100%;
    max-width: 440px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: relative;
    z-index: 1;
  }
  .sp-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }
  .sp-logo-icon {
    width: 48px; height: 48px;
    background: rgba(0,229,255,0.08);
    border: 1.5px solid rgba(0,229,255,0.25);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .sp-app-name {
    font-size: 19px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.02em;
    margin: 0 0 3px;
  }
  .sp-app-tagline {
    font-size: 11px;
    color: #94a3b8;
    margin: 0;
  }
  .sp-card {
    width: 100%;
    background: rgba(11,20,38,0.94);
    border: 1px solid rgba(148,163,184,0.14);
    border-radius: 16px;
    padding: 26px 26px 20px;
    backdrop-filter: blur(10px);
    box-sizing: border-box;
  }
  .sp-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  .sp-card-icon { color: #00e5ff; }
  .sp-card-title {
    font-size: 16px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.04em;
  }
  .sp-proto-notice {
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(0,229,255,0.06);
    border: 1px solid rgba(0,229,255,0.18);
    border-radius: 7px;
    padding: 7px 11px;
    font-size: 10.5px;
    font-weight: 600;
    color: #67e8f9;
    letter-spacing: 0.03em;
    margin-bottom: 18px;
  }
  .sp-form {
    display: flex;
    flex-direction: column;
    gap: 13px;
  }
  .sp-field-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .sp-label {
    font-size: 11.5px;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.04em;
  }
  .sp-input {
    width: 100%;
    background: rgba(15,25,45,0.85);
    border: 1px solid rgba(148,163,184,0.18);
    border-radius: 8px;
    padding: 10px 13px;
    font-size: 13.5px;
    color: #f1f5f9;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
    box-sizing: border-box;
    font-family: inherit;
  }
  .sp-input::placeholder { color: #475569; }
  .sp-input:focus {
    border-color: rgba(0,229,255,0.45);
    box-shadow: 0 0 0 3px rgba(0,229,255,0.08);
  }
  .sp-input-icon-wrap { position: relative; }
  .sp-input-with-icon { padding-right: 42px; }
  .sp-pass-toggle {
    position: absolute;
    right: 11px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: #64748b;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 3px;
    border-radius: 4px;
    transition: color 0.15s;
  }
  .sp-pass-toggle:hover { color: #00e5ff; }
  .sp-select {
    width: 100%;
    background: rgba(15,25,45,0.85);
    border: 1px solid rgba(148,163,184,0.18);
    border-radius: 8px;
    padding: 10px 13px;
    font-size: 13.5px;
    color: #f1f5f9;
    outline: none;
    cursor: pointer;
    transition: border-color 0.18s;
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 13px center;
    font-family: inherit;
  }
  .sp-select:focus { border-color: rgba(0,229,255,0.45); }
  .sp-select option { background: #0d172a; color: #f1f5f9; }
  .sp-error-box {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 7px;
    padding: 9px 12px;
    font-size: 12.5px;
    color: #fca5a5;
    line-height: 1.5;
  }
  .sp-error-box svg { flex-shrink: 0; margin-top: 1px; }
  .sp-submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    background: linear-gradient(135deg, #0284c7, #0369a1);
    color: #ffffff;
    border: 1px solid rgba(2,132,199,0.5);
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 13.5px;
    font-weight: 700;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: all 0.18s ease;
    margin-top: 2px;
    font-family: inherit;
  }
  .sp-submit-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #0ea5e9, #0284c7);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(2,132,199,0.35);
  }
  .sp-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
  .sp-spinner { animation: sp-spin 0.9s linear infinite; }
  @keyframes sp-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .sp-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 18px 0 12px;
    color: #475569;
    font-size: 12px;
  }
  .sp-divider::before,
  .sp-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(148,163,184,0.12);
  }
  .sp-back-btn-outline {
    display: block;
    width: 100%;
    background: transparent;
    border: 1px solid rgba(148,163,184,0.22);
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.18s ease;
    text-align: center;
    font-family: inherit;
    box-sizing: border-box;
  }
  .sp-back-btn-outline:hover {
    border-color: rgba(0,229,255,0.3);
    color: #00e5ff;
    background: rgba(0,229,255,0.04);
  }
  /* Success state */
  .sp-success-card {
    width: 100%;
    max-width: 440px;
    background: rgba(11,20,38,0.94);
    border: 1px solid rgba(52,211,153,0.25);
    border-radius: 16px;
    padding: 36px 28px;
    text-align: center;
    box-sizing: border-box;
  }
  .sp-success-icon {
    width: 52px; height: 52px;
    background: rgba(52,211,153,0.12);
    border: 1.5px solid rgba(52,211,153,0.35);
    border-radius: 50%;
    font-size: 22px;
    color: #34d399;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
  }
  .sp-success-title {
    font-size: 18px;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 10px;
  }
  .sp-success-msg {
    font-size: 13px;
    color: #94a3b8;
    line-height: 1.6;
    margin: 0 0 22px;
  }
  .sp-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: linear-gradient(135deg, #0284c7, #0369a1);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 11px 22px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s;
    font-family: inherit;
  }
  .sp-back-btn:hover {
    background: linear-gradient(135deg, #0ea5e9, #0284c7);
    transform: translateY(-1px);
  }
  .sp-footer-text {
    font-size: 11px;
    color: #334155;
    text-align: center;
    line-height: 1.6;
    margin: 0;
  }
  @media (max-width: 480px) {
    .sp-card { padding: 20px 16px 18px; }
    .sp-app-name { font-size: 17px; }
  }
`;

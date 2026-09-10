import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  AlertCircle,
  Loader2
} from 'lucide-react';

// Prototype credential store — demo only, NOT production auth
const DEMO_ACCOUNTS = [
  { email: 'researcher@cyclovision.demo', password: 'demo1234', role: 'researcher', name: 'Dr. Priya Menon' },
  { email: 'government@cyclovision.demo', password: 'demo1234', role: 'government', name: 'Shri R. Krishnamurthy' },
  { email: 'citizen@cyclovision.demo',    password: 'demo1234', role: 'citizen',    name: 'Sunita Patnaik' },
];

const ROLE_OPTIONS = [
  { id: 'researcher',  label: 'Researcher' },
  { id: 'government',  label: 'Government Official' },
  { id: 'citizen',     label: 'Citizen' },
];

export default function LoginPage({ onLoginSuccess, onGoToSignup }) {
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [role, setRole]             = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim())    { setError('Please enter your email or username.'); return; }
    if (!password.trim()) { setError('Please enter your password.'); return; }
    if (!role)            { setError('Please select your role to continue.'); return; }

    setLoading(true);

    // Simulate async prototype auth (500 ms delay)
    setTimeout(() => {
      const match = DEMO_ACCOUNTS.find(
        (a) =>
          a.email.toLowerCase() === email.trim().toLowerCase() &&
          a.password === password &&
          a.role === role
      );

      if (match) {
        const sessionPayload = JSON.stringify({
          email: match.email, role: match.role, name: match.name
        });
        try {
          sessionStorage.setItem('cv_demo_user', sessionPayload);
          if (rememberMe) {
            localStorage.setItem('cv_demo_user', sessionPayload);
          } else {
            localStorage.removeItem('cv_demo_user');
          }
        } catch (_) {}
        setLoading(false);
        onLoginSuccess(match.role);
      } else {
        setLoading(false);
        setError(
          'Credentials do not match a demo account. ' +
          'Use credentials below or click a row to auto-fill.'
        );
      }
    }, 500);
  };

  const autofill = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setRole(account.role);
    setError('');
  };

  return (
    <div className="lp-root">
      <div className="lp-bg-mesh" aria-hidden="true" />

      <div className="lp-center-wrap">

        {/* Brand */}
        <div className="lp-brand">
          <div className="lp-logo-icon" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                 stroke="#00e5ff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2a10 10 0 0 0-9.54 13.06L4 16l2-1"/>
              <path d="M12 22a10 10 0 0 0 9.54-13.06L20 8l-2 1"/>
            </svg>
          </div>
          <div className="lp-title-block">
            <h1 className="lp-app-name">CycloVision AI</h1>
            <p className="lp-app-tagline">
              Tropical Cyclone Intelligence,<br />
              Decision Support &amp; Citizen Safety Platform
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="lp-card" role="main">

          <div className="lp-card-header">
            <LogIn size={18} className="lp-card-icon" />
            <span className="lp-card-title">LOGIN</span>
          </div>

          <div className="lp-proto-notice" role="note">
            <ShieldCheck size={13} />
            <span>PROTOTYPE AUTHENTICATION — Demo data only. Not for operational use.</span>
          </div>

          <form onSubmit={handleSubmit} className="lp-form" noValidate>

            {/* Email */}
            <div className="lp-field-group">
              <label htmlFor="lp-email" className="lp-label">Email / Username</label>
              <input
                id="lp-email"
                type="text"
                className="lp-input"
                placeholder="e.g. researcher@cyclovision.demo"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                autoComplete="username"
                spellCheck={false}
              />
            </div>

            {/* Password */}
            <div className="lp-field-group">
              <label htmlFor="lp-password" className="lp-label">Password</label>
              <div className="lp-input-icon-wrap">
                <input
                  id="lp-password"
                  type={showPass ? 'text' : 'password'}
                  className="lp-input lp-input-with-icon"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lp-pass-toggle"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="lp-field-group">
              <label htmlFor="lp-role" className="lp-label">Role</label>
              <select
                id="lp-role"
                className="lp-select"
                value={role}
                onChange={(e) => { setRole(e.target.value); setError(''); }}
              >
                <option value="">Select Role ▼</option>
                {ROLE_OPTIONS.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </div>

            {/* Remember Me */}
            <label className="lp-remember-row" htmlFor="lp-remember">
              <input
                id="lp-remember"
                type="checkbox"
                className="lp-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="lp-remember-text">Remember Me</span>
            </label>

            {/* Error */}
            {error && (
              <div className="lp-error-box" role="alert">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              id="lp-login-btn"
              type="submit"
              className="lp-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="lp-spinner" />
                  <span>Authenticating…</span>
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>LOGIN</span>
                </>
              )}
            </button>

            {/* Forgot Password */}
            <button
              type="button"
              className="lp-text-link"
              onClick={() => alert('Password reset is not available in prototype mode.')}
            >
              Forgot Password?
            </button>

          </form>

          {/* Divider */}
          <div className="lp-divider">
            <span>Don&apos;t have an account?</span>
          </div>

          {/* Create Account */}
          <button
            id="lp-create-account-btn"
            type="button"
            className="lp-create-btn"
            onClick={onGoToSignup}
          >
            CREATE ACCOUNT
          </button>

          {/* Demo credential hints */}
          <div className="lp-demo-hint">
            <p className="lp-demo-title">Demo Credentials — click a row to auto-fill</p>
            <div className="lp-demo-table">
              {DEMO_ACCOUNTS.map((a) => (
                <button
                  key={a.role}
                  type="button"
                  className="lp-demo-row"
                  onClick={() => autofill(a)}
                  title={`Auto-fill ${a.role} credentials`}
                >
                  <span className={'lp-role-dot lp-role-dot-' + a.role} />
                  <span className="lp-demo-role">
                    {a.role.charAt(0).toUpperCase() + a.role.slice(1)}
                  </span>
                  <span className="lp-demo-email">{a.email}</span>
                  <span className="lp-demo-autofill">↖ fill</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <p className="lp-footer-text">
          Research &amp; Educational Prototype — Not an official government system.<br />
          All data shown is simulated demo data.
        </p>

      </div>

      <style>{`
        .lp-root {
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
        .lp-bg-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% -10%, rgba(0,229,255,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 90% 80%, rgba(2,132,199,0.05) 0%, transparent 60%);
          pointer-events: none;
        }
        .lp-center-wrap {
          width: 100%;
          max-width: 460px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 1;
        }
        .lp-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
        }
        .lp-logo-icon {
          width: 58px;
          height: 58px;
          background: rgba(0,229,255,0.08);
          border: 1.5px solid rgba(0,229,255,0.28);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .lp-app-name {
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin: 0 0 4px;
        }
        .lp-app-tagline {
          font-size: 11.5px;
          color: #94a3b8;
          line-height: 1.55;
          margin: 0;
        }
        .lp-card {
          width: 100%;
          background: rgba(11,20,38,0.94);
          border: 1px solid rgba(148,163,184,0.14);
          border-radius: 16px;
          padding: 28px 28px 22px;
          backdrop-filter: blur(10px);
          box-sizing: border-box;
        }
        .lp-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .lp-card-icon { color: #00e5ff; }
        .lp-card-title {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.04em;
        }
        .lp-proto-notice {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(0,229,255,0.06);
          border: 1px solid rgba(0,229,255,0.2);
          border-radius: 7px;
          padding: 7px 11px;
          font-size: 11px;
          font-weight: 600;
          color: #67e8f9;
          letter-spacing: 0.03em;
          margin-bottom: 20px;
        }
        .lp-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .lp-field-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .lp-label {
          font-size: 11.5px;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.04em;
        }
        .lp-input {
          width: 100%;
          background: rgba(15,25,45,0.85);
          border: 1px solid rgba(148,163,184,0.18);
          border-radius: 8px;
          padding: 11px 14px;
          font-size: 14px;
          color: #f1f5f9;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
          box-sizing: border-box;
          font-family: inherit;
        }
        .lp-input::placeholder { color: #475569; }
        .lp-input:focus {
          border-color: rgba(0,229,255,0.45);
          box-shadow: 0 0 0 3px rgba(0,229,255,0.08);
        }
        .lp-input-icon-wrap { position: relative; }
        .lp-input-with-icon { padding-right: 44px; }
        .lp-pass-toggle {
          position: absolute;
          right: 12px;
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
        .lp-pass-toggle:hover { color: #00e5ff; }
        .lp-select {
          width: 100%;
          background: rgba(15,25,45,0.85);
          border: 1px solid rgba(148,163,184,0.18);
          border-radius: 8px;
          padding: 11px 14px;
          font-size: 14px;
          color: #f1f5f9;
          outline: none;
          cursor: pointer;
          transition: border-color 0.18s;
          box-sizing: border-box;
          -webkit-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          font-family: inherit;
        }
        .lp-select:focus { border-color: rgba(0,229,255,0.45); }
        .lp-select option { background: #0d172a; color: #f1f5f9; }
        .lp-remember-row {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          width: fit-content;
        }
        .lp-checkbox {
          width: 15px;
          height: 15px;
          accent-color: #00e5ff;
          cursor: pointer;
          flex-shrink: 0;
        }
        .lp-remember-text { font-size: 12.5px; color: #94a3b8; }
        .lp-error-box {
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
        .lp-error-box svg { flex-shrink: 0; margin-top: 1px; }
        .lp-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: linear-gradient(135deg, #0284c7, #0369a1);
          color: #ffffff;
          border: 1px solid rgba(2,132,199,0.5);
          border-radius: 8px;
          padding: 13px 20px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: all 0.18s ease;
          margin-top: 2px;
          font-family: inherit;
        }
        .lp-submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(2,132,199,0.35);
        }
        .lp-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .lp-spinner { animation: lp-spin 0.9s linear infinite; }
        @keyframes lp-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .lp-text-link {
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 12.5px;
          cursor: pointer;
          text-align: center;
          padding: 2px 0;
          transition: color 0.15s;
          text-decoration: underline;
          text-underline-offset: 3px;
          align-self: center;
          font-family: inherit;
        }
        .lp-text-link:hover { color: #94a3b8; }
        .lp-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 18px 0 12px;
          color: #475569;
          font-size: 12px;
        }
        .lp-divider::before,
        .lp-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(148,163,184,0.12);
        }
        .lp-create-btn {
          display: block;
          width: 100%;
          background: transparent;
          border: 1px solid rgba(148,163,184,0.22);
          border-radius: 8px;
          padding: 11px 20px;
          font-size: 13px;
          font-weight: 700;
          color: #cbd5e1;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.18s ease;
          text-align: center;
          font-family: inherit;
          box-sizing: border-box;
        }
        .lp-create-btn:hover {
          border-color: rgba(0,229,255,0.35);
          color: #00e5ff;
          background: rgba(0,229,255,0.05);
        }
        .lp-demo-hint {
          margin-top: 18px;
          background: rgba(15,25,45,0.6);
          border: 1px solid rgba(148,163,184,0.1);
          border-radius: 8px;
          padding: 12px 14px;
        }
        .lp-demo-title {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.07em;
          color: #475569;
          text-transform: uppercase;
          margin: 0 0 8px;
        }
        .lp-demo-table { display: flex; flex-direction: column; gap: 4px; }
        .lp-demo-row {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          padding: 5px 6px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.15s;
          text-align: left;
          width: 100%;
          font-family: inherit;
        }
        .lp-demo-row:hover { background: rgba(255,255,255,0.04); }
        .lp-role-dot {
          width: 7px; height: 7px;
          border-radius: 50%; flex-shrink: 0;
        }
        .lp-role-dot-researcher { background: #a78bfa; }
        .lp-role-dot-government  { background: #00e5ff; }
        .lp-role-dot-citizen     { background: #34d399; }
        .lp-demo-role {
          font-size: 11px; font-weight: 600;
          color: #94a3b8; min-width: 88px; text-align: left;
        }
        .lp-demo-email {
          font-size: 11px; color: #475569;
          font-family: 'Courier New', monospace;
          flex: 1; text-align: left;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .lp-demo-autofill { font-size: 10px; color: #334155; flex-shrink: 0; }
        .lp-footer-text {
          font-size: 11px; color: #334155;
          text-align: center; line-height: 1.6;
          max-width: 380px; margin: 0;
        }
        @media (max-width: 480px) {
          .lp-card { padding: 22px 18px 18px; }
          .lp-app-name { font-size: 18px; }
          .lp-logo-icon { width: 48px; height: 48px; }
        }
      `}</style>
    </div>
  );
}

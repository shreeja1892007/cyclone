import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SatelliteAnalysis from './pages/SatelliteAnalysis';
import AIAnalysisPage from './pages/AIAnalysisPage';
import Environment from './pages/Environment';
import Historical from './pages/Historical';
import Validation from './pages/Validation';
import DataSources from './pages/DataSources';
import DataQuality from './pages/DataQuality';
import ReportsPage from './pages/ReportsPage';
import PreparednessPage from './pages/PreparednessPage';
import CitizenEmergencyPage from './pages/CitizenEmergencyPage';
import CitizenDashboard from './pages/CitizenDashboard';
import ExplainableModal from './components/ExplainableModal';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import CycloneMap from './components/CycloneMap';
import CycloneIntelligence from './components/CycloneIntelligence';
import DistrictImpactTable from './components/risk/DistrictImpactTable';
import HazardAssessment from './components/risk/HazardAssessment';
import OfficialBulletins from './components/official/OfficialBulletins';
import EmergencyRequestTable from './components/emergency/EmergencyRequestTable';
import ResponseTeamPanel from './components/emergency/ResponseTeamPanel';
import EventTimeline from './components/timeline/EventTimeline';
import ProbabilityChart from './components/ProbabilityChart';

import {
  fetchRegions,
  fetchObservationFrame,
  fetchObservationTimestamps,
  fetchDataProvenance
} from './services/api';
import { REGIONS, TIMESTAMPS, MODEL_SPECS, DATA_PROVENANCE } from './services/mockData';
import { emergencyService } from './services/emergencyService';

// Get currently authenticated session user
function getStoredUser() {
  try {
    const raw = sessionStorage.getItem('cv_demo_user') || localStorage.getItem('cv_demo_user');
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// Determine initial auth view from URL hash/path
function getInitialAuthView() {
  const hash = window.location.hash;
  const path = window.location.pathname;
  if (hash === '#signup' || hash === '#/signup' || path === '/signup') return 'signup';
  if (hash === '#login'  || hash === '#/login'  || path === '/login')  return 'login';
  const stored = getStoredUser();
  if (!stored) return 'login';
  return null; // authenticated session active
}

// Derive portal type from stored session
function getInitialPortalType() {
  const user = getStoredUser();
  if (user?.role === 'researcher') return 'researcher';
  if (user?.role === 'citizen') return 'citizen';
  return 'government';
}

// Derive initial view based on role and URL
function getInitialView() {
  const user = getStoredUser();
  if (!user) return 'dashboard';
  const hash = window.location.hash;
  const path = window.location.pathname;
  if (user.role === 'citizen') {
    if (
      hash === '#emergency' ||
      hash === '#/emergency' ||
      hash === '#/citizen/emergency' ||
      path === '/emergency' ||
      path === '/citizen/emergency'
    ) {
      return 'citizen-portal';
    }
    return 'citizen-dashboard';
  }
  return 'dashboard';
}

export default function App() {
  // Auth state — 'login' | 'signup' | null (authenticated)
  const [authView, setAuthView] = useState(getInitialAuthView);

  // portalType: 'researcher' | 'government' | 'citizen'
  const [portalType, setPortalType] = useState(getInitialPortalType);

  const [currentView, setCurrentView] = useState(getInitialView);
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]); // North Indian Ocean
  const [selectedState, setSelectedState] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [currentRole, setCurrentRole] = useState('command'); // 'command', 'met-officer', 'disaster-officer', 'district-admin', 'eoc'
  const [currentTimestampId, setCurrentTimestampId] = useState('t6'); // 03 Sep 12:00 UTC
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);

  // Reactive Emergency Store
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [responseTeams, setResponseTeams] = useState([]);
  const [emergencySummary, setEmergencySummary] = useState(emergencyService.getSummary());

  // Synchronized frame state
  const [frameData, setFrameData] = useState(null);
  const [isLoadingFrame, setIsLoadingFrame] = useState(true);

  // Subscribe to emergencyService for real-time two-way citizen updates
  useEffect(() => {
    const unsubscribe = emergencyService.subscribe((reqs, teams) => {
      setEmergencyRequests(reqs);
      setResponseTeams(teams);
      setEmergencySummary(emergencyService.getSummary());
    });
    return () => unsubscribe();
  }, []);

  // Listen to hash and path for login/signup/citizen/government/researcher routes and guards
  useEffect(() => {
    const syncRoute = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      const storedUser = getStoredUser();

      // 1. Auth routes (public)
      if (hash === '#signup' || hash === '#/signup' || path === '/signup') {
        setAuthView('signup');
        return;
      }
      if (hash === '#login' || hash === '#/login' || path === '/login') {
        setAuthView('login');
        return;
      }

      // 2. Protected Routes Guard: if not logged in, any dashboard route redirects to /login
      if (!storedUser) {
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', '/login');
        }
        window.location.hash = 'login';
        setAuthView('login');
        return;
      }

      // 3. Authenticated session active: enforce role permissions
      setAuthView(null);
      const role = storedUser.role;

      const isCitizenEmergency =
        hash === '#emergency' ||
        hash === '#/emergency' ||
        hash === '#/citizen/emergency' ||
        path === '/emergency' ||
        path === '/citizen/emergency';

      const isCitizenDashboard =
        hash === '#citizen' ||
        hash === '#/citizen' ||
        hash === '#citizen-safety' ||
        path === '/citizen';

      const isResearcher =
        hash === '#researcher' ||
        hash === '#/researcher' ||
        path === '/researcher';

      const isGovernment =
        hash === '#government' ||
        hash === '#/government' ||
        path === '/government';

      if (role === 'citizen') {
        // Citizen can only access citizen portal views
        if (isGovernment || isResearcher) {
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', '/citizen');
          }
          window.location.hash = 'citizen';
          setCurrentView('citizen-dashboard');
        } else if (isCitizenEmergency) {
          setCurrentView('citizen-portal');
        } else {
          setCurrentView('citizen-dashboard');
        }
        setPortalType('citizen');
      } else if (role === 'researcher') {
        // Researcher cannot access government or citizen portals
        if (isGovernment || isCitizenDashboard || isCitizenEmergency) {
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', '/researcher');
          }
          window.location.hash = 'researcher';
        }
        setPortalType('researcher');
        setCurrentView('dashboard');
      } else {
        // Government official
        if (isResearcher) {
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', '/government');
          }
          window.location.hash = 'government';
        }
        setPortalType('government');
        if (isCitizenEmergency) {
          setCurrentView('citizen-portal');
        } else if (isCitizenDashboard) {
          setCurrentView('citizen-dashboard');
        }
      }
    };

    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  // Role-based routing after login
  const handleLoginSuccess = (role) => {
    setAuthView(null);
    if (role === 'citizen') {
      setCurrentView('citizen-dashboard');
      setPortalType('citizen');
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '/citizen');
      }
      window.location.hash = 'citizen';
    } else if (role === 'researcher') {
      setCurrentView('dashboard');
      setCurrentRole('met-officer');
      setPortalType('researcher'); // hides Role/View in Header
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '/researcher');
      }
      window.location.hash = 'researcher';
    } else {
      // government
      setCurrentView('dashboard');
      setCurrentRole('command');
      setPortalType('government'); // preserves Role/View in Header
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '/government');
      }
      window.location.hash = 'government';
    }
  };

  const handleGoToSignup = () => {
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', '/signup');
    }
    window.location.hash = 'signup';
    setAuthView('signup');
  };

  const handleGoToLogin = () => {
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', '/login');
    }
    window.location.hash = 'login';
    setAuthView('login');
  };

  // Logout — clears authentication session, temporary location state, and returns to /login
  const handleLogout = () => {
    try {
      localStorage.removeItem('cv_demo_user');
      sessionStorage.removeItem('cv_demo_user');
      localStorage.removeItem('cv_citizen_location');
      sessionStorage.removeItem('cv_citizen_location');
    } catch (_) {}
    setPortalType('government');
    setCurrentView('dashboard');
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', '/login');
    }
    window.location.hash = 'login';
    setAuthView('login');
  };

  // Fetch frame data whenever currentTimestampId changes
  useEffect(() => {
    let isMounted = true;
    setIsLoadingFrame(true);
    fetchObservationFrame(currentTimestampId).then((data) => {
      if (isMounted) {
        setFrameData(data);
        setIsLoadingFrame(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [currentTimestampId]);

  const currentTimestampObj = TIMESTAMPS.find((t) => t.id === currentTimestampId) || TIMESTAMPS[TIMESTAMPS.length - 1];

  // ── AUTH SCREENS ──────────────────────────────────────────────
  if (authView === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onGoToSignup={handleGoToSignup}
      />
    );
  }
  if (authView === 'signup') {
    return (
      <SignupPage
        onGoToLogin={handleGoToLogin}
      />
    );
  }

  // If citizen dashboard view is open, render the Citizen Safety Dashboard interface
  if (currentView === 'citizen-dashboard') {
    return (
      <CitizenDashboard
        onNavigateView={(v) => {
          const stored = getStoredUser();
          if (stored?.role === 'citizen' && v === 'dashboard') {
            return; // citizen cannot access government dashboard
          }
          setCurrentView(v);
          if (window.location.hash.includes('citizen')) {
            window.location.hash = '';
          }
        }}
        onOpenCitizenEmergencyPage={() => setCurrentView('citizen-portal')}
        onLogout={handleLogout}
      />
    );
  }

  // If citizen portal view is open, render the standalone mobile-friendly Citizen Emergency Connect interface
  if (currentView === 'citizen-portal') {
    return (
      <CitizenEmergencyPage
        onBackToDashboard={() => {
          setCurrentView('citizen-dashboard');
          if (window.location.hash.includes('emergency')) {
            window.location.hash = '';
          }
        }}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onNavigate={(viewId) => setCurrentView(viewId)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeDistressCount={emergencySummary?.totalActive || 5}
        portalType={portalType}
      />

      {/* Main Content Layout */}
      <div className={`main-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header
          portalType={portalType}
          selectedRegion={selectedRegion}
          onSelectRegion={(reg) => setSelectedRegion(reg)}
          selectedState={selectedState}
          onSelectState={(st) => setSelectedState(st)}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={(dist) => setSelectedDistrict(dist)}
          currentTimestamp={currentTimestampObj}
          currentRole={currentRole}
          onSelectRole={(role) => setCurrentRole(role)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeDistressCount={emergencySummary?.totalActive || 5}
          onOpenCitizenPortal={() => setCurrentView('citizen-portal')}
          onOpenCitizenDashboard={() => setCurrentView('citizen-dashboard')}
          onLogout={handleLogout}
        />

        <main className="main-content">
          {isLoadingFrame && !frameData ? (
            <div className="loading-skeleton-container">
              <div className="loading-spinner font-mono">
                Initializing CycloVision AI Government Kernel...
              </div>
            </div>
          ) : (
            <>
              {/* 1. COMMAND OVERVIEW (MAIN DASHBOARD) */}
              {currentView === 'dashboard' && (
                <Dashboard
                  frameData={frameData}
                  selectedRegion={selectedRegion}
                  selectedState={selectedState}
                  selectedDistrict={selectedDistrict}
                  currentTimestampId={currentTimestampId}
                  onSelectTimestamp={(newId) => setCurrentTimestampId(newId)}
                  currentRole={currentRole}
                  modelInfo={MODEL_SPECS}
                  dataProvenance={DATA_PROVENANCE}
                  emergencyRequests={emergencyRequests}
                  emergencySummary={emergencySummary}
                  responseTeams={responseTeams}
                  onOpenAnalysis={() => setCurrentView('ai-analysis')}
                  onOpenValidation={() => setCurrentView('validation')}
                  onOpenExplainability={() => setIsExplainModalOpen(true)}
                  onOpenCitizenPortal={() => setCurrentView('citizen-portal')}
                  onNavigateView={(v) => setCurrentView(v)}
                />
              )}

              {/* 2. OPERATIONAL MAP DEDICATED VIEW */}
              {currentView === 'operational-map' && (
                <div className="dedicated-page-view">
                  <div className="page-header-strip">
                    <h2 className="text-h2">Operational Situation Map</h2>
                    <span className="sci-badge sci-badge-cyan font-mono">HIGH RESOLUTION GEOSPATIAL WORKSTATION</span>
                  </div>
                  <div style={{ height: '78vh' }}>
                    <CycloneMap
                      frameData={frameData}
                      selectedRegion={selectedRegion}
                      emergencyRequests={emergencyRequests}
                      selectedState={selectedState}
                      selectedDistrict={selectedDistrict}
                      onOpenAnalysis={() => setCurrentView('ai-analysis')}
                    />
                  </div>
                </div>
              )}

              {/* 3. CYCLONE INTELLIGENCE DEDICATED VIEW */}
              {currentView === 'cyclone-intelligence' && (
                <div className="dedicated-page-view">
                  <div className="page-header-strip">
                    <h2 className="text-h2">Unified Cyclone Intelligence Panel</h2>
                    <span className="sci-badge sci-badge-blue font-mono">OFFICIAL & AI RECONCILIATION</span>
                  </div>
                  <div style={{ maxWidth: '840px', margin: '0 auto' }}>
                    <CycloneIntelligence
                      frameData={frameData}
                      onOpenAnalysis={() => setCurrentView('ai-analysis')}
                      onOpenExplainability={() => setIsExplainModalOpen(true)}
                    />
                  </div>
                </div>
              )}

              {/* 4. SATELLITE ANALYSIS */}
              {currentView === 'satellite' && (
                <SatelliteAnalysis
                  frameData={frameData}
                  portalType={portalType}
                  currentTimestamp={frameData?.displayTime || '03 Sep 2026 12:00 UTC'}
                />
              )}

              {/* 5. AI ANALYSIS */}
              {currentView === 'ai-analysis' && (
                <AIAnalysisPage
                  frameData={frameData}
                  onOpenExplainability={() => setIsExplainModalOpen(true)}
                />
              )}

              {/* 6. ENVIRONMENTAL CONDITIONS */}
              {currentView === 'environment' && (
                <Environment frameData={frameData} />
              )}

              {/* 7. GENESIS PREDICTION */}
              {currentView === 'genesis-prediction' && (
                <div className="dedicated-page-view">
                  <div className="page-header-strip">
                    <h2 className="text-h2">Tropical Cyclone Genesis Prediction</h2>
                    <span className="sci-badge sci-badge-purple font-mono">GenesisNet v0.1 EXPERIMENTAL</span>
                  </div>
                  <ProbabilityChart currentTimestampId={currentTimestampId} />
                </div>
              )}

              {/* 8. HAZARD ASSESSMENT */}
              {currentView === 'hazard-assessment' && (
                <div className="dedicated-page-view">
                  <div className="page-header-strip">
                    <h2 className="text-h2">Geographic & Coastal Hazard Assessment</h2>
                    <span className="sci-badge sci-badge-cyan font-mono">MULTI-THREAT EVALUATION</span>
                  </div>
                  <HazardAssessment />
                </div>
              )}

              {/* 9. DISTRICT IMPACT */}
              {currentView === 'district-impact' && (
                <div className="dedicated-page-view">
                  <div className="page-header-strip">
                    <h2 className="text-h2">District-Level Vulnerability & Impact Table</h2>
                    <span className="sci-badge sci-badge-teal font-mono">LOCAL DECISION-SUPPORT</span>
                  </div>
                  <DistrictImpactTable selectedStateFilter={selectedState} />
                </div>
              )}

              {/* 10. CRITICAL INFRASTRUCTURE */}
              {currentView === 'infrastructure' && (
                <div className="dedicated-page-view">
                  <div className="page-header-strip">
                    <h2 className="text-h2">Critical Coastal Infrastructure Telemetry</h2>
                    <span className="sci-badge sci-badge-cyan font-mono">HOSPITALS • SHELTERS • PORTS</span>
                  </div>
                  <div style={{ height: '70vh' }}>
                    <CycloneMap
                      frameData={frameData}
                      selectedRegion={selectedRegion}
                      emergencyRequests={emergencyRequests}
                      selectedState={selectedState}
                      selectedDistrict={selectedDistrict}
                    />
                  </div>
                </div>
              )}

              {/* 11. CITIZEN EMERGENCY REQUESTS (EOC VIEW) */}
              {currentView === 'citizen-requests' && (
                <div className="dedicated-page-view">
                  <div className="page-header-strip">
                    <h2 className="text-h2">Citizen Distress Reports & Verification</h2>
                    <span className="sci-badge sci-badge-amber font-mono">TWO-WAY CITIZEN CONNECT</span>
                  </div>
                  <EmergencyRequestTable
                    requests={emergencyRequests}
                    selectedState={selectedState}
                    selectedDistrict={selectedDistrict}
                  />
                </div>
              )}

              {/* 12. RESPONSE COORDINATION */}
              {currentView === 'response-coordination' && (
                <div className="dedicated-page-view">
                  <div className="page-header-strip">
                    <h2 className="text-h2">Response Team Coordination Roster</h2>
                    <span className="sci-badge sci-badge-cyan font-mono">PROTOTYPE READINESS</span>
                  </div>
                  <ResponseTeamPanel teams={responseTeams} />
                </div>
              )}

              {/* 13. EVENT TIMELINE */}
              {currentView === 'event-timeline' && (
                <div className="dedicated-page-view">
                  <div className="page-header-strip">
                    <h2 className="text-h2">Multi-Agency Incident Timeline</h2>
                    <span className="sci-badge sci-badge-cyan font-mono">CHRONOLOGICAL AUDIT TRAIL</span>
                  </div>
                  <EventTimeline />
                </div>
              )}

              {/* 14. OFFICIAL BULLETINS */}
              {currentView === 'official-bulletins' && (
                <div className="dedicated-page-view">
                  <div className="page-header-strip">
                    <h2 className="text-h2">Official Meteorological Information</h2>
                    <span className="sci-badge sci-badge-blue font-mono">IMD / RSMC NEW DELHI BULLETINS</span>
                  </div>
                  <OfficialBulletins />
                </div>
              )}

              {/* 15. PREPAREDNESS MODULE */}
              {currentView === 'preparedness' && (
                <PreparednessPage />
              )}

              {/* 16. DATA QUALITY */}
              {currentView === 'data-quality' && (
                <DataQuality frameData={frameData} />
              )}

              {/* 17. MODEL RELIABILITY & VALIDATION */}
              {currentView === 'validation' && (
                <Validation />
              )}

              {/* 18. DATA SOURCES & PROVENANCE */}
              {currentView === 'data-sources' && (
                <DataSources dataProvenance={DATA_PROVENANCE} />
              )}

              {/* 19. SITUATION REPORTS */}
              {currentView === 'reports' && (
                <ReportsPage frameData={frameData} activeDistressSummary={emergencySummary} />
              )}

              {/* HISTORICAL EXPLORER */}
              {currentView === 'historical' && (
                <Historical />
              )}
            </>
          )}
        </main>
      </div>

      {/* Explainable AI Modal */}
      <ExplainableModal
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
      />

      <style>{`
        .dedicated-page-view {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .page-header-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(13, 23, 42, 0.7);
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-md);
          padding: 10px 16px;
        }
        .loading-skeleton-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }
        .loading-spinner {
          font-size: 13px;
          color: var(--accent-cyan);
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.3);
          padding: 12px 24px;
          border-radius: var(--radius-md);
        }
      `}</style>
    </div>
  );
}

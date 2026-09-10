import React, { useState } from 'react';
import {
  Compass,
  AlertTriangle,
  BrainCircuit,
  Radio,
  Users,
  Building2,
  CheckSquare,
  Layers,
  PhoneCall,
  Clock,
  ShieldAlert,
  Info
} from 'lucide-react';

import SummaryCards from '../components/SummaryCards';
import TimeSlider from '../components/TimeSlider';
import CycloneMap from '../components/CycloneMap';
import CycloneIntelligence from '../components/CycloneIntelligence';
import EmergencySummary from '../components/emergency/EmergencySummary';
import EmergencyRequestTable from '../components/emergency/EmergencyRequestTable';
import EmergencyRequestDetail from '../components/emergency/EmergencyRequestDetail';
import DistrictImpactTable from '../components/risk/DistrictImpactTable';
import HazardAssessment from '../components/risk/HazardAssessment';
import EnvironmentalCards from '../components/EnvironmentalCards';
import ResponseTeamPanel from '../components/emergency/ResponseTeamPanel';
import ProbabilityChart from '../components/ProbabilityChart';
import MultiSourceFusion from '../components/MultiSourceFusion';
import OfficialBulletins from '../components/official/OfficialBulletins';
import PublicCommunication from '../components/official/PublicCommunication';
import EventTimeline from '../components/timeline/EventTimeline';
import DataQualityPanel from '../components/DataQualityPanel';
import ModelValidationCard from '../components/ModelValidationCard';
import ResearchDisclaimer from '../components/ResearchDisclaimer';

export default function Dashboard({
  frameData,
  selectedRegion,
  selectedState = 'All',
  selectedDistrict = 'All',
  currentTimestampId,
  onSelectTimestamp,
  currentRole = 'command',
  modelInfo,
  dataProvenance,
  emergencyRequests = [],
  emergencySummary,
  responseTeams = [],
  onOpenAnalysis,
  onOpenValidation,
  onOpenExplainability,
  onOpenCitizenPortal,
  onNavigateView
}) {
  const [selectedEmergencyForDetail, setSelectedEmergencyForDetail] = useState(null);
  const [mapFocusedDistrict, setMapFocusedDistrict] = useState(selectedDistrict);

  // Role Description Banner
  const roleDescriptions = {
    command: {
      title: 'COMMAND OVERVIEW — Executive Situational Awareness',
      desc: 'Unified multi-agency dashboard synthesizing satellite observations, AI genesis predictions, official bulletins, district hazards, and citizen distress reports.',
      highlightColor: '#00e5ff'
    },
    'met-officer': {
      title: 'METEOROLOGICAL OFFICER — Scientific Monitoring & Synthesis',
      desc: 'Prioritizing satellite cloud patterns, INSAT-3D radiometry, convective vortex assembly, thermodynamic SST, vertical wind shear, and GenesisNet probabilistic forecast horizons.',
      highlightColor: '#38bdf8'
    },
    'disaster-officer': {
      title: 'DISASTER MANAGEMENT OFFICER — State & National Preparedness',
      desc: 'Prioritizing coastal hazard swaths, gale wind radii, storm surge inundation, official warnings from RSMC New Delhi, inter-state coordination, and civilian protection.',
      highlightColor: '#f59e0b'
    },
    'district-admin': {
      title: 'DISTRICT ADMINISTRATION — Ground Coordination & Vulnerability',
      desc: 'Prioritizing district-wise impact matrices, cyclone shelter operationality, vulnerable coastal panchayats, local medical readiness, and local citizen distress telemetry.',
      highlightColor: '#10b981'
    },
    eoc: {
      title: 'EMERGENCY OPERATIONS CENTRE (EOC) — Real-Time Incident Response',
      desc: 'Prioritizing two-way citizen distress calls, verified rescue requests, NDRF / SDRF team assignment, operational map pins, and chronological incident logs.',
      highlightColor: '#ef4444'
    }
  };

  const activeRoleInfo = roleDescriptions[currentRole] || roleDescriptions.command;

  return (
    <div className="gov-dashboard-root">
      {/* ROLE HIGHLIGHT BANNER */}
      <div className="role-focus-banner" style={{ borderLeftColor: activeRoleInfo.highlightColor }}>
        <div className="role-banner-content">
          <div className="role-banner-title" style={{ color: activeRoleInfo.highlightColor }}>
            {activeRoleInfo.title}
          </div>
          <p className="role-banner-desc">{activeRoleInfo.desc}</p>
        </div>
        <div className="role-banner-badge font-mono">
          ROLE VIEW: {currentRole.toUpperCase()}
        </div>
      </div>

      {/* 1. TOP SUMMARY METRIC CARDS (ALL 8 MANDATORY FIELDS) */}
      <SummaryCards
        frameData={frameData}
        modelInfo={modelInfo}
        activeDistressSummary={emergencySummary}
        onNavigateView={onNavigateView}
      />

      {/* 2. SYNCHRONIZED GLOBAL TIME CONTROLLER */}
      <TimeSlider
        currentTimestampId={currentTimestampId}
        onSelectTimestamp={onSelectTimestamp}
      />

      {/* 3. PRIMARY OPERATIONAL MAP & CYCLONE INTELLIGENCE (65% MAP / 35% INTELLIGENCE) */}
      <div className="operational-center-grid">
        <div className="operational-col-map">
          <CycloneMap
            frameData={frameData}
            selectedRegion={selectedRegion}
            emergencyRequests={emergencyRequests}
            onSelectEmergency={(req) => setSelectedEmergencyForDetail(req)}
            onOpenAnalysis={onOpenAnalysis}
            selectedDistrict={mapFocusedDistrict}
            selectedState={selectedState}
          />
        </div>

        <div className="operational-col-intel">
          <CycloneIntelligence
            frameData={frameData}
            onOpenAnalysis={onOpenAnalysis}
            onOpenExplainability={onOpenExplainability}
          />
        </div>
      </div>

      {/* ROLE-BASED CONDITIONAL ORDERING */}
      {currentRole === 'eoc' ? (
        <>
          {/* EOC PRIORITIZES CITIZEN REQUESTS & TEAMS */}
          <EmergencySummary summary={emergencySummary} />
          <EmergencyRequestTable
            requests={emergencyRequests}
            onSelectRequest={(req) => setSelectedEmergencyForDetail(req)}
            selectedState={selectedState}
            selectedDistrict={selectedDistrict}
          />
          <ResponseTeamPanel teams={responseTeams} />
          <OfficialBulletins />
          <EventTimeline />
          <div className="gov-dual-grid">
            <DistrictImpactTable
              onSelectDistrictOnMap={(dist) => setMapFocusedDistrict(dist)}
              selectedStateFilter={selectedState}
            />
            <HazardAssessment />
          </div>
        </>
      ) : currentRole === 'met-officer' ? (
        <>
          {/* MET OFFICER PRIORITIZES ENVIRONMENTAL, AI PREDICTION & DATA QUALITY */}
          <EnvironmentalCards frameData={frameData} />
          <ProbabilityChart currentTimestampId={currentTimestampId} />
          <div className="gov-dual-grid">
            <ModelValidationCard onOpenValidationDetails={onOpenValidation} />
            <DataQualityPanel frameData={frameData} />
          </div>
          <MultiSourceFusion frameData={frameData} />
          <OfficialBulletins />
          <HazardAssessment />
          <EmergencySummary summary={emergencySummary} />
        </>
      ) : currentRole === 'district-admin' ? (
        <>
          {/* DISTRICT ADMIN PRIORITIZES DISTRICT IMPACT & LOCAL EMERGENCIES */}
          <DistrictImpactTable
            onSelectDistrictOnMap={(dist) => setMapFocusedDistrict(dist)}
            selectedStateFilter={selectedState}
          />
          <EmergencySummary summary={emergencySummary} />
          <EmergencyRequestTable
            requests={emergencyRequests}
            onSelectRequest={(req) => setSelectedEmergencyForDetail(req)}
            selectedState={selectedState}
            selectedDistrict={selectedDistrict}
          />
          <div className="gov-dual-grid">
            <HazardAssessment />
            <ResponseTeamPanel teams={responseTeams} />
          </div>
          <OfficialBulletins />
          <PublicCommunication />
        </>
      ) : currentRole === 'disaster-officer' ? (
        <>
          {/* DISASTER OFFICER PRIORITIZES HAZARDS, AFFECTED DISTRICTS, AND OFFICIAL BULLETINS */}
          <HazardAssessment />
          <DistrictImpactTable
            onSelectDistrictOnMap={(dist) => setMapFocusedDistrict(dist)}
            selectedStateFilter={selectedState}
          />
          <OfficialBulletins />
          <PublicCommunication />
          <EmergencySummary summary={emergencySummary} />
          <ResponseTeamPanel teams={responseTeams} />
          <ProbabilityChart currentTimestampId={currentTimestampId} />
          <EnvironmentalCards frameData={frameData} />
        </>
      ) : (
        /* COMMAND OVERVIEW (BALANCED EXECUTIVE WORKSPACE) */
        <>
          {/* CITIZEN EMERGENCY OPERATIONS OVERVIEW */}
          <EmergencySummary summary={emergencySummary} />
          <EmergencyRequestTable
            requests={emergencyRequests}
            onSelectRequest={(req) => setSelectedEmergencyForDetail(req)}
            selectedState={selectedState}
            selectedDistrict={selectedDistrict}
          />

          {/* DISTRICT IMPACT & HAZARD ASSESSMENT (DUAL GRID) */}
          <div className="gov-dual-grid">
            <DistrictImpactTable
              onSelectDistrictOnMap={(dist) => setMapFocusedDistrict(dist)}
              selectedStateFilter={selectedState}
            />
            <HazardAssessment />
          </div>

          {/* ENVIRONMENTAL EVIDENCE & RESPONSE TEAMS (DUAL GRID) */}
          <div className="gov-dual-grid">
            <EnvironmentalCards frameData={frameData} />
            <ResponseTeamPanel teams={responseTeams} />
          </div>

          {/* GENESIS PROBABILITY TREND PLOTLY CHART */}
          <ProbabilityChart currentTimestampId={currentTimestampId} />

          {/* OFFICIAL BULLETINS & CITIZEN ADVISORIES */}
          <div className="gov-dual-grid">
            <OfficialBulletins />
            <PublicCommunication />
          </div>

          {/* MULTI-SOURCE DATA FUSION PIPELINE */}
          <MultiSourceFusion frameData={frameData} />

          {/* MODEL RELIABILITY & DATA QUALITY (DUAL GRID) */}
          <div className="gov-dual-grid">
            <ModelValidationCard onOpenValidationDetails={onOpenValidation} />
            <DataQualityPanel frameData={frameData} />
          </div>

          {/* CHRONOLOGICAL EVENT TIMELINE */}
          <EventTimeline />
        </>
      )}

      {/* MODAL: EMERGENCY REQUEST DETAIL WORKFLOW (SECTIONS 22 & 38) */}
      {selectedEmergencyForDetail && (
        <EmergencyRequestDetail
          request={selectedEmergencyForDetail}
          teams={responseTeams}
          onClose={() => setSelectedEmergencyForDetail(null)}
          authorizedRole={currentRole}
        />
      )}

      {/* STRICT RESEARCH DISCLAIMER FOOTER (SECTION 45) */}
      <ResearchDisclaimer />

      <style>{`
        .gov-dashboard-root {
          display: flex;
          flex-direction: column;
        }
        .role-focus-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(13, 23, 42, 0.85);
          border: 1px solid var(--bg-card-border);
          border-left: 4px solid #00e5ff;
          border-radius: var(--radius-md);
          padding: 10px 14px;
          margin-bottom: var(--space-3);
          flex-wrap: wrap;
          gap: 8px;
        }
        .role-banner-title {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }
        .role-banner-desc {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .role-banner-badge {
          font-size: 10px;
          color: var(--text-muted);
          background: rgba(0, 0, 0, 0.3);
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid rgba(148, 163, 184, 0.15);
        }
        .operational-center-grid {
          display: grid;
          grid-template-columns: 63% 37%;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
          min-height: 520px;
        }
        .operational-col-map, .operational-col-intel {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .gov-dual-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }
        @media (max-width: 1400px) {
          .operational-center-grid {
            grid-template-columns: 1fr;
          }
          .gov-dual-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Share2,
  Shield,
  BrainCircuit,
  Clock,
  Layers,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { DISTRICT_IMPACT_DATA, HAZARD_ASSESSMENT_DATA, MODEL_SPECS } from '../services/mockData';

export default function ReportsPage({ frameData, activeDistressSummary }) {
  const [reportGeneratedTime, setReportGeneratedTime] = useState('03 Sep 2026 12:45 UTC');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const currentLat = frameData?.latitude || 14.8;
  const currentLon = frameData?.longitude || 87.3;
  const prob24h = frameData?.prediction?.prob24h ?? 76;

  const handleExportJSON = () => {
    const reportData = {
      title: 'CYCLOVISION AI — RESEARCH DECISION-SUPPORT REPORT',
      generatedAt: reportGeneratedTime,
      systemId: 'INVEST-91B',
      stage: 'Deep Depression',
      coordinates: { lat: currentLat, lon: currentLon },
      officialAuthority: 'IMD / RSMC New Delhi (Bulletin #06)',
      model: MODEL_SPECS,
      aiProbability24h: prob24h,
      districtsAtRisk: DISTRICT_IMPACT_DATA.filter((d) => d.overallRisk === 'CRITICAL' || d.overallRisk === 'HIGH'),
      hazards: HAZARD_ASSESSMENT_DATA,
      citizenDistressSummary: activeDistressSummary,
      disclaimer: 'Research decision-support prototype only. Official warnings issued exclusively by authorized agencies.'
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CycloVision_Report_${Date.now()}.json`;
    a.click();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleExportMarkdown = () => {
    const mdContent = `# CYCLOVISION AI — RESEARCH DECISION-SUPPORT REPORT
**Analysis Timestamp:** ${reportGeneratedTime}
**System Status:** Deep Depression (Invest 91B)
**Centroid Location:** ${currentLat}°N, ${currentLon}°E (Central Bay of Bengal)

---

## 1. OFFICIAL METEOROLOGICAL INFORMATION
- **Authority:** India Meteorological Department (IMD) / RSMC New Delhi
- **Bulletin Reference:** BOB/03/2026/06
- **Warning Status:** Cyclone Alert (Yellow / Orange Message)
- **Official Track:** Landfall anticipated near Odisha coast between Gopalpur and Puri in next 48 hours.

---

## 2. CYCLOVISION AI EXPERIMENTAL OUTPUT
- **Model:** GenesisNet v0.1 (Research Prototype - Spatio-temporal ConvLSTM)
- **Genesis Probability (Next 24h):** ${prob24h}% (DEMO MODEL OUTPUT)
- **Cloud Classification:** Curved Band Pattern (88% confidence)

---

## 3. DISTRICT IMPACT & HAZARDS SUMMARY
- **Critical Risk Districts:** Puri (Odisha), Ganjam (Odisha)
- **High Risk Districts:** Jagatsinghpur (Odisha), Srikakulam (Andhra Pradesh)
- **Wind Threat:** 85-110 km/h squalls
- **Rainfall Threat:** Extremely Heavy (>200 mm cumulative)
- **Storm Surge:** 1.5 - 2.5 m coastal inundation threat

---

## 4. CITIZEN DISTRESS & RESPONSE STATUS
- **Active Citizen Reports:** ${activeDistressSummary?.totalActive || 5}
- **Critical Priority Incidents:** ${activeDistressSummary?.critical || 2}
- **Responding Units:** NDRF Unit 03, ODRAF Team 04, Medical QRT 2, AP Fire Unit 08

---

## 5. DISCLAIMER
CycloVision AI is a research and educational decision-support prototype. Experimental AI outputs are not official cyclone forecasts, warnings, evacuation orders, or emergency instructions.
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CycloVision_Situation_Report.md`;
    a.click();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="reports-page-wrapper">
      {/* TOOLBAR */}
      <div className="reports-toolbar-card">
        <div className="toolbar-left">
          <FileText size={20} className="text-accent" />
          <div>
            <h2 className="toolbar-title">Situation Reports & Research Briefings</h2>
            <p className="toolbar-sub">Standardized Government Decision-Support Export Terminal</p>
          </div>
        </div>

        <div className="toolbar-actions">
          <button className="sci-btn sci-btn-secondary" onClick={handleExportMarkdown}>
            <Download size={14} />
            <span>Export Briefing (Markdown)</span>
          </button>
          <button className="sci-btn sci-btn-primary" onClick={handleExportJSON}>
            <Download size={14} />
            <span>Export Analysis (JSON)</span>
          </button>
          <button className="sci-btn sci-btn-secondary" onClick={() => window.print()}>
            <Printer size={14} />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="download-toast">
          <CheckCircle2 size={16} className="text-success" />
          <span>Report exported successfully to your downloads folder.</span>
        </div>
      )}

      {/* REPORT PREVIEW DOCUMENT */}
      <div className="report-paper-preview font-sans">
        {/* REPORT HEADER */}
        <div className="doc-header">
          <div className="doc-header-top">
            <span className="doc-inst-badge">DECISION-SUPPORT SYSTEM • SCIENTIFIC BRIEFING</span>
            <span className="doc-date font-mono">GENERATED: {reportGeneratedTime}</span>
          </div>
          <h1 className="doc-main-title">CYCLOVISION AI — RESEARCH DECISION-SUPPORT REPORT</h1>
          <div className="doc-header-sub">
            Multi-Source Synoptic, Satellite, and AI Genesis Briefing for North Indian Ocean
          </div>
        </div>

        {/* 1. EXECUTIVE SUMMARY */}
        <div className="doc-section">
          <h3 className="doc-sec-title">1. EXECUTIVE SITUATIONAL SUMMARY</h3>
          <div className="doc-grid-2">
            <div className="doc-meta-card">
              <span className="dm-lbl">CURRENT SYSTEM ID</span>
              <span className="dm-val font-mono">INVEST 91B / DEEP DEPRESSION</span>
            </div>
            <div className="doc-meta-card">
              <span className="dm-lbl">CURRENT CENTROID</span>
              <span className="dm-val font-mono">{currentLat.toFixed(1)}°N, {currentLon.toFixed(1)}°E (Central Bay of Bengal)</span>
            </div>
            <div className="doc-meta-card">
              <span className="dm-lbl">ESTIMATED INTENSITY</span>
              <span className="dm-val font-mono">28 kt (52 km/h) • MSLP 1004 hPa</span>
            </div>
            <div className="doc-meta-card">
              <span className="dm-lbl">STEERING FLOW & MOVEMENT</span>
              <span className="dm-val">West-Northwestwards at 15 km/h</span>
            </div>
          </div>
        </div>

        {/* 2. OFFICIAL METEOROLOGICAL INFORMATION */}
        <div className="doc-section official-border-section">
          <div className="doc-sec-head">
            <Shield size={16} className="text-blue" />
            <h3 className="doc-sec-title text-blue">2. OFFICIAL METEOROLOGICAL INFORMATION (RSMC / IMD)</h3>
          </div>
          <p className="doc-p">
            <strong>Issuing Authority:</strong> India Meteorological Department, Regional Specialized Meteorological Centre (RSMC New Delhi).<br />
            <strong>Bulletin:</strong> BOB/03/2026/06 issued at 03 Sep 11:30 UTC.<br />
            <strong>Official Advisory:</strong> Deep Depression very likely to intensify into a Cyclonic Storm during next 24 hours. Coastal fishermen warned to suspend all operations in central and northern Bay of Bengal.
          </p>
        </div>

        {/* 3. EXPERIMENTAL AI ASSESSMENT */}
        <div className="doc-section ai-border-section">
          <div className="doc-sec-head">
            <BrainCircuit size={16} className="text-purple" />
            <h3 className="doc-sec-title text-purple">3. CYCLOVISION AI EXPERIMENTAL ASSESSMENT (DEMO DATA)</h3>
          </div>
          <p className="doc-p">
            <strong>AI Model:</strong> GenesisNet v0.1 (Spatio-Temporal ConvLSTM + Multi-Modal Cross-Attention).<br />
            <strong>Target:</strong> Tropical cyclone formation within next 24 hours in central Bay of Bengal.<br />
            <strong>Genesis Probability:</strong> <span className="text-accent font-bold font-mono">{prob24h}% (High Probability)</span>.<br />
            <strong>Cloud Classification:</strong> Curved Band Pattern (88% confidence).<br />
            <em>Notice: GenesisNet is a research prototype awaiting comprehensive ML validation and must not be used as an autonomous forecasting mechanism.</em>
          </p>
        </div>

        {/* 4. DISTRICT RISK & HAZARD OVERVIEW */}
        <div className="doc-section">
          <h3 className="doc-sec-title">4. DISTRICT THREAT LEVEL SYNTHESIS</h3>
          <table className="doc-table">
            <thead>
              <tr>
                <th>District</th>
                <th>State</th>
                <th>Overall Risk</th>
                <th>Wind Threat</th>
                <th>Rainfall Threat</th>
                <th>Storm Surge</th>
              </tr>
            </thead>
            <tbody>
              {DISTRICT_IMPACT_DATA.slice(0, 5).map((d) => (
                <tr key={d.id}>
                  <td className="font-bold">{d.district}</td>
                  <td>{d.state}</td>
                  <td className="font-bold text-danger">{d.overallRisk}</td>
                  <td>{d.windRisk}</td>
                  <td>{d.rainfallRisk}</td>
                  <td>{d.coastalRisk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. CITIZEN DISTRESS & RESPONSE OVERVIEW */}
        <div className="doc-section">
          <h3 className="doc-sec-title">5. CITIZEN DISTRESS TELEMETRY SUMMARY (TWO-WAY CONNECT)</h3>
          <div className="doc-grid-3">
            <div className="doc-mini-card">
              <span className="dm-lbl">ACTIVE REPORTS</span>
              <span className="dm-val font-mono">{activeDistressSummary?.totalActive || 5} Incidents</span>
            </div>
            <div className="doc-mini-card">
              <span className="dm-lbl">CRITICAL LIFE SAFETY</span>
              <span className="dm-val font-mono text-danger">{activeDistressSummary?.critical || 2} Persons Stranded</span>
            </div>
            <div className="doc-mini-card">
              <span className="dm-lbl">TEAMS EN-ROUTE</span>
              <span className="dm-val font-mono text-accent">NDRF / SDRF Units Responding</span>
            </div>
          </div>
        </div>

        {/* 6. STRICT RESEARCH DISCLAIMER */}
        <div className="doc-disclaimer-box">
          <strong>LEGAL & OPERATIONAL DISCLAIMER:</strong>
          <p>
            CycloVision AI is a research and educational decision-support prototype. Experimental AI outputs
            are not official cyclone forecasts, warnings, evacuation orders, or emergency instructions. Users
            should refer to authorized meteorological, disaster-management, and emergency-service agencies for official information.
          </p>
        </div>
      </div>

      <style>{`
        .reports-page-wrapper {
          padding: 8px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .reports-toolbar-card {
          background: #091326;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-lg);
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .toolbar-title {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
        }
        .toolbar-sub {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .toolbar-actions {
          display: flex;
          gap: 8px;
        }
        .download-toast {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #34d399;
          padding: 8px 14px;
          border-radius: var(--radius-md);
          font-size: 12px;
        }
        .report-paper-preview {
          background: #0d172a;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: var(--radius-lg);
          padding: 30px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .doc-header {
          border-bottom: 2px solid rgba(0, 229, 255, 0.3);
          padding-bottom: 16px;
        }
        .doc-header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .doc-inst-badge {
          font-size: 10px;
          font-weight: 800;
          color: var(--accent-cyan);
          letter-spacing: 0.05em;
        }
        .doc-date {
          font-size: 11px;
          color: var(--text-muted);
        }
        .doc-main-title {
          font-size: 20px;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.01em;
        }
        .doc-header-sub {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .doc-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .doc-sec-title {
          font-size: 13px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.03em;
        }
        .doc-sec-head {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .official-border-section {
          background: rgba(2, 132, 199, 0.06);
          border-left: 3px solid #0284c7;
          padding: 12px 14px;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        .ai-border-section {
          background: rgba(139, 92, 246, 0.06);
          border-left: 3px solid #8b5cf6;
          padding: 12px 14px;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        .doc-p {
          font-size: 12px;
          line-height: 1.6;
          color: #cbd5e1;
        }
        .doc-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .doc-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .doc-meta-card, .doc-mini-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--bg-card-border);
          padding: 8px 12px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
        }
        .dm-lbl {
          font-size: 9px;
          color: var(--text-muted);
          font-weight: 700;
        }
        .dm-val {
          font-size: 12px;
          color: #ffffff;
          font-weight: 600;
          margin-top: 2px;
        }
        .doc-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
        }
        .doc-table th {
          background: rgba(15, 23, 42, 0.8);
          color: var(--text-muted);
          padding: 6px 8px;
          text-align: left;
          border-bottom: 1px solid var(--bg-card-border);
        }
        .doc-table td {
          padding: 6px 8px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
          color: #cbd5e1;
        }
        .doc-disclaimer-box {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: var(--radius-md);
          padding: 12px;
          font-size: 10px;
          color: var(--text-muted);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import {
  Layers,
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  ShieldAlert,
  AlertTriangle,
  Building2,
  Users,
  X,
  Database,
  Clock
} from 'lucide-react';
import { DISTRICT_IMPACT_DATA, STATES_DISTRICTS } from '../../services/mockData';

export default function DistrictImpactTable({
  districts = DISTRICT_IMPACT_DATA,
  onSelectDistrictOnMap,
  selectedStateFilter = 'All'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState(selectedStateFilter || 'All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [sortField, setSortField] = useState('overallRisk');
  const [sortDirection, setSortDirection] = useState('desc');
  const [activeDetailDistrict, setActiveDetailDistrict] = useState(null);

  // Sync external filter if passed
  React.useEffect(() => {
    if (selectedStateFilter) {
      setStateFilter(selectedStateFilter);
    }
  }, [selectedStateFilter]);

  // Risk weighting for sorting
  const riskWeight = {
    CRITICAL: 4,
    HIGH: 3,
    MODERATE: 2,
    LOW: 1
  };

  // Filter and sort logic
  const filteredDistricts = useMemo(() => {
    return districts
      .filter((d) => {
        const matchesSearch =
          d.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.state.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesState = stateFilter === 'All' || d.state === stateFilter;
        const matchesRisk = riskFilter === 'All' || d.overallRisk === riskFilter;
        return matchesSearch && matchesState && matchesRisk;
      })
      .sort((a, b) => {
        if (sortField === 'overallRisk') {
          const wA = riskWeight[a.overallRisk] || 0;
          const wB = riskWeight[b.overallRisk] || 0;
          return sortDirection === 'asc' ? wA - wB : wB - wA;
        }
        if (sortField === 'district') {
          return sortDirection === 'asc'
            ? a.district.localeCompare(b.district)
            : b.district.localeCompare(a.district);
        }
        return 0;
      });
  }, [districts, searchTerm, stateFilter, riskFilter, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="sci-card district-impact-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <Layers size={16} className="text-accent" />
          <span>District & Coastal Impact Assessment</span>
          <span className="count-tag font-mono">{filteredDistricts.length} Districts Indexed</span>
        </div>
        <div className="sci-card-actions">
          <span className="sci-badge sci-badge-cyan">DEMO DATASET</span>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="district-toolbar">
        {/* Search */}
        <div className="search-input-wrap">
          <Search size={13} className="search-icon text-muted" />
          <input
            type="text"
            className="search-input"
            placeholder="Search district or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              <X size={12} />
            </button>
          )}
        </div>

        {/* State Filter */}
        <div className="filter-group">
          <label className="filter-label">State:</label>
          <select
            className="gov-select filter-select"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >
            <option value="All">All States</option>
            {STATES_DISTRICTS.map((s) => (
              <option key={s.state} value={s.state}>
                {s.state}
              </option>
            ))}
          </select>
        </div>

        {/* Risk Category Filter */}
        <div className="filter-group">
          <label className="filter-label">Risk:</label>
          <select
            className="gov-select filter-select"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="All">All Risk Levels</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MODERATE">Moderate</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* DISTRICT RISK TABLE */}
      <div className="district-table-scroll">
        <table className="gov-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('district')} className="sortable-th">
                <div className="th-content">
                  <span>District</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th>State</th>
              <th onClick={() => handleSort('overallRisk')} className="sortable-th">
                <div className="th-content">
                  <span>Overall Risk</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th>Wind Risk</th>
              <th>Rainfall Risk</th>
              <th>Coastal Risk</th>
              <th>Official Warning</th>
              <th>Data Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDistricts.length > 0 ? (
              filteredDistricts.map((d) => {
                const isCrit = d.overallRisk === 'CRITICAL';
                const isHigh = d.overallRisk === 'HIGH';
                const isMod = d.overallRisk === 'MODERATE';

                return (
                  <tr
                    key={d.id}
                    className={`district-row ${activeDetailDistrict?.id === d.id ? 'active-row' : ''}`}
                    onClick={() => setActiveDetailDistrict(d)}
                  >
                    <td className="font-bold text-primary">{d.district}</td>
                    <td className="text-secondary">{d.state}</td>
                    <td>
                      <span
                        className={`risk-badge ${
                          isCrit
                            ? 'risk-crit'
                            : isHigh
                            ? 'risk-high'
                            : isMod
                            ? 'risk-mod'
                            : 'risk-low'
                        }`}
                      >
                        {d.overallRisk}
                      </span>
                    </td>
                    <td className="font-mono text-xs">{d.windRisk}</td>
                    <td className="font-mono text-xs">{d.rainfallRisk}</td>
                    <td className="text-xs">{d.coastalRisk}</td>
                    <td>
                      <span className="official-pill font-mono text-xs">{d.officialWarning}</span>
                    </td>
                    <td>
                      <span className="sci-badge sci-badge-teal text-xs">{d.dataStatus}</span>
                    </td>
                    <td>
                      <button
                        className="sci-btn sci-btn-secondary sci-btn-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDetailDistrict(d);
                          if (onSelectDistrictOnMap) {
                            onSelectDistrictOnMap(d.district);
                          }
                        }}
                      >
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="table-empty-row">
                  No districts match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DISTRICT DETAIL DRAWER / MODAL (STRICT INTEGRITY: HONEST PLACEHOLDERS) */}
      {activeDetailDistrict && (
        <div className="district-detail-drawer">
          <div className="drawer-header">
            <div className="drawer-title-block">
              <span className="drawer-state-badge">{activeDetailDistrict.state}</span>
              <h3 className="drawer-district-name">{activeDetailDistrict.district} District</h3>
            </div>
            <button
              className="sci-btn sci-btn-icon sci-btn-xs"
              onClick={() => setActiveDetailDistrict(null)}
            >
              <X size={15} />
            </button>
          </div>

          <div className="drawer-body">
            {/* Risk Badges */}
            <div className="drawer-risk-strip">
              <div className="risk-strip-item">
                <span className="strip-k">Overall Risk:</span>
                <span className="strip-v text-danger font-bold">{activeDetailDistrict.overallRisk}</span>
              </div>
              <div className="risk-strip-item">
                <span className="strip-k">Affected Area:</span>
                <span className="strip-v font-mono">{activeDetailDistrict.affectedAreaSqKm} km²</span>
              </div>
              <div className="risk-strip-item">
                <span className="strip-k">Centroid:</span>
                <span className="strip-v font-mono">{activeDetailDistrict.coordinates.join('°N, ')}°E</span>
              </div>
            </div>

            {/* Warning Summary */}
            <div className="drawer-alert-box">
              <div className="drawer-alert-head">
                <ShieldAlert size={14} className="text-danger" />
                <span className="font-bold">Official Meteorological Warning</span>
              </div>
              <p className="drawer-alert-text">{activeDetailDistrict.officialWarnings}</p>
            </div>

            {/* Operational Data Parameters with Honest Unconnected Values */}
            <div className="drawer-grid">
              <div className="drawer-field-item">
                <span className="df-label">Population Exposure</span>
                <span className="df-val font-mono text-muted">{activeDetailDistrict.populationExposure}</span>
              </div>
              <div className="drawer-field-item">
                <span className="df-label">Shelter Status</span>
                <span className="df-val text-amber">{activeDetailDistrict.shelterStatus}</span>
              </div>
              <div className="drawer-field-item">
                <span className="df-label">Hospital Status</span>
                <span className="df-val text-amber">{activeDetailDistrict.hospitalStatus}</span>
              </div>
              <div className="drawer-field-item">
                <span className="df-label">Evacuation Status</span>
                <span className="df-val font-mono text-muted">{activeDetailDistrict.evacuationStatus}</span>
              </div>
              <div className="drawer-field-item">
                <span className="df-label">Emergency Teams</span>
                <span className="df-val text-muted">{activeDetailDistrict.emergencyTeams}</span>
              </div>
              <div className="drawer-field-item">
                <span className="df-label">Wind Hazard</span>
                <span className="df-val font-mono text-primary">{activeDetailDistrict.windRisk}</span>
              </div>
              <div className="drawer-field-item">
                <span className="df-label">Rainfall Hazard</span>
                <span className="df-val font-mono text-primary">{activeDetailDistrict.rainfallRisk}</span>
              </div>
              <div className="drawer-field-item">
                <span className="df-label">Coastal Surge Hazard</span>
                <span className="df-val text-primary">{activeDetailDistrict.coastalRisk}</span>
              </div>
            </div>

            {/* Sources & Timestamps */}
            <div className="drawer-footer-meta">
              <div className="meta-sources">
                <span className="meta-label">Sources:</span>
                <span className="meta-content">{activeDetailDistrict.sources?.join(' • ')}</span>
              </div>
              <div className="meta-time">
                <Clock size={11} /> {activeDetailDistrict.lastUpdated}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .district-impact-card {
          margin-bottom: var(--space-3);
          background: #091224;
          border: 1px solid var(--bg-card-border);
        }
        .count-tag {
          font-size: 10px;
          color: var(--accent-cyan);
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.2);
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 8px;
        }
        .district-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 14px;
          background: rgba(15, 25, 45, 0.6);
          border-bottom: 1px solid var(--bg-card-border);
          flex-wrap: wrap;
        }
        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 220px;
        }
        .search-icon {
          position: absolute;
          left: 8px;
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          background: #0d172a;
          border: 1px solid rgba(148, 163, 184, 0.2);
          padding: 5px 24px 5px 26px;
          border-radius: var(--radius-md);
          color: #ffffff;
          font-size: 11px;
          outline: none;
        }
        .search-input:focus {
          border-color: var(--accent-cyan);
        }
        .clear-search-btn {
          position: absolute;
          right: 6px;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }
        .filter-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .filter-label {
          font-size: 11px;
          color: var(--text-muted);
        }
        .filter-select {
          padding: 3px 8px;
          background: #0d172a;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: var(--radius-md);
          font-size: 11px;
        }
        .district-table-scroll {
          overflow-x: auto;
          max-height: 380px;
        }
        .gov-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          text-align: left;
        }
        .gov-table th {
          background: rgba(15, 23, 42, 0.85);
          color: var(--text-secondary);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 8px 10px;
          border-bottom: 1px solid var(--bg-card-border);
          position: sticky;
          top: 0;
          z-index: 5;
        }
        .sortable-th {
          cursor: pointer;
        }
        .sortable-th:hover {
          color: var(--accent-cyan);
        }
        .th-content {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .gov-table td {
          padding: 8px 10px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
        }
        .district-row {
          cursor: pointer;
          transition: background 0.1s ease;
        }
        .district-row:hover {
          background: rgba(0, 229, 255, 0.04);
        }
        .active-row {
          background: rgba(0, 229, 255, 0.08) !important;
        }
        .risk-badge {
          font-size: 9px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .risk-crit { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }
        .risk-high { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
        .risk-mod { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
        .risk-low { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
        .official-pill {
          color: #38bdf8;
          background: rgba(2, 132, 199, 0.15);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .table-empty-row {
          text-align: center;
          padding: 24px;
          color: var(--text-muted);
        }

        /* Detail Drawer */
        .district-detail-drawer {
          background: #0d172a;
          border-top: 1px solid rgba(0, 229, 255, 0.3);
          padding: 12px 16px;
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.4);
        }
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .drawer-title-block {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .drawer-state-badge {
          background: rgba(148, 163, 184, 0.15);
          color: var(--text-secondary);
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .drawer-district-name {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
        }
        .drawer-risk-strip {
          display: flex;
          gap: 16px;
          background: rgba(0, 0, 0, 0.25);
          padding: 6px 10px;
          border-radius: var(--radius-md);
          margin-bottom: 10px;
        }
        .risk-strip-item {
          display: flex;
          gap: 6px;
          font-size: 11px;
        }
        .strip-k {
          color: var(--text-muted);
        }
        .drawer-alert-box {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: var(--radius-md);
          padding: 8px 10px;
          margin-bottom: 10px;
        }
        .drawer-alert-head {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #f87171;
          margin-bottom: 2px;
        }
        .drawer-alert-text {
          font-size: 11px;
          color: #e2e8f0;
          line-height: 1.4;
        }
        .drawer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px 12px;
          margin-bottom: 10px;
        }
        .drawer-field-item {
          display: flex;
          flex-direction: column;
        }
        .df-label {
          font-size: 9px;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .df-val {
          font-size: 11px;
          font-weight: 500;
        }
        .drawer-footer-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          padding-top: 6px;
          font-size: 10px;
          color: var(--text-muted);
        }
        .meta-sources {
          display: flex;
          gap: 6px;
        }
        .meta-time {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
        }
        @media (max-width: 900px) {
          .drawer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

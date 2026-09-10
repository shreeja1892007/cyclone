import React, { useState, useMemo } from 'react';
import {
  PhoneCall,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Radio,
  AlertTriangle,
  ExternalLink,
  Users
} from 'lucide-react';

export default function EmergencyRequestTable({
  requests = [],
  onSelectRequest,
  selectedState = 'All',
  selectedDistrict = 'All'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchesSearch =
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.emergencyType.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesState = selectedState === 'All' || r.state === selectedState;
      const matchesDistrict = selectedDistrict === 'All' || r.district.toLowerCase() === selectedDistrict.toLowerCase();
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      const matchesPriority =
        priorityFilter === 'All' ||
        r.confirmedPriority === priorityFilter ||
        (r.confirmedPriority === 'Pending Confirmation' && r.suggestedPriority === priorityFilter);

      return matchesSearch && matchesState && matchesDistrict && matchesStatus && matchesPriority;
    });
  }, [requests, searchTerm, selectedState, selectedDistrict, statusFilter, priorityFilter]);

  return (
    <div className="sci-card emergency-table-card">
      <div className="sci-card-header">
        <div className="sci-card-title">
          <PhoneCall size={16} className="text-danger" />
          <span>Government Emergency Requests Management</span>
          <span className="count-badge font-mono">{filteredRequests.length} Reports</span>
        </div>
        <div className="sci-card-actions">
          <span className="sci-badge sci-badge-cyan">CITIZEN ↔ EOC CONNECT</span>
        </div>
      </div>

      {/* FILTER TOOLBAR */}
      <div className="emergency-toolbar">
        <div className="search-wrap">
          <Search size={12} className="search-icon text-muted" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by ID, location, or emergency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <span className="filter-lbl">Status:</span>
          <select
            className="gov-select filter-sel"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Received">Received</option>
            <option value="Pending Verification">Pending Verification</option>
            <option value="Verified">Verified</option>
            <option value="Team Assigned">Team Assigned</option>
            <option value="Responding">Responding</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="filter-item">
          <span className="filter-lbl">Priority:</span>
          <select
            className="gov-select filter-sel"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MODERATE">Moderate</option>
          </select>
        </div>
      </div>

      {/* REQUESTS TABLE */}
      <div className="emergency-table-container">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Emergency ID</th>
              <th>Time</th>
              <th>Location</th>
              <th>District</th>
              <th>Type</th>
              <th>People</th>
              <th>Priority</th>
              <th>Verification</th>
              <th>Assigned Team</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => {
                const isCritical = req.confirmedPriority === 'CRITICAL' || (req.confirmedPriority === 'Pending Confirmation' && req.suggestedPriority === 'CRITICAL');
                const isHigh = req.confirmedPriority === 'HIGH' || req.suggestedPriority === 'HIGH';
                const isResponding = req.status === 'Responding' || req.status === 'Team Assigned';
                const isResolved = req.status === 'Resolved';

                return (
                  <tr
                    key={req.id}
                    className="emergency-row"
                    onClick={() => onSelectRequest && onSelectRequest(req)}
                  >
                    <td className="font-mono font-bold text-accent">{req.id}</td>
                    <td className="font-mono text-xs text-muted">{req.timestamp.replace('03 Sep ', '')}</td>
                    <td className="text-primary">{req.location}</td>
                    <td className="text-secondary">{req.district}</td>
                    <td className="text-primary font-bold">{req.emergencyType}</td>
                    <td className="font-mono font-bold">{req.peopleReported}</td>
                    <td>
                      <span
                        className={`priority-pill ${
                          isCritical
                            ? 'pri-crit'
                            : isHigh
                            ? 'pri-high'
                            : 'pri-mod'
                        }`}
                      >
                        {req.confirmedPriority !== 'Pending Confirmation'
                          ? req.confirmedPriority
                          : `SUGG: ${req.suggestedPriority}`}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`verif-pill ${
                          req.verification === 'Verified' ? 'verif-done' : 'verif-pend'
                        }`}
                      >
                        {req.verification}
                      </span>
                    </td>
                    <td className="font-mono text-xs text-secondary">{req.assignedTeam}</td>
                    <td>
                      <span
                        className={`status-pill ${
                          isResolved
                            ? 'st-resolved'
                            : isResponding
                            ? 'st-responding'
                            : 'st-pending'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="sci-btn sci-btn-primary sci-btn-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectRequest) onSelectRequest(req);
                        }}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="11" className="empty-msg">
                  No citizen distress reports matching filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .emergency-table-card {
          margin-bottom: var(--space-3);
          background: #091224;
          border: 1px solid var(--bg-card-border);
        }
        .count-badge {
          font-size: 10px;
          color: var(--accent-cyan);
          background: rgba(0, 229, 255, 0.1);
          border: 1px solid rgba(0, 229, 255, 0.25);
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 8px;
        }
        .emergency-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 14px;
          background: rgba(15, 25, 45, 0.6);
          border-bottom: 1px solid var(--bg-card-border);
          flex-wrap: wrap;
        }
        .search-wrap {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 240px;
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
          padding: 4px 10px 4px 26px;
          border-radius: var(--radius-md);
          color: #ffffff;
          font-size: 11px;
          outline: none;
        }
        .filter-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .filter-lbl {
          font-size: 11px;
          color: var(--text-muted);
        }
        .filter-sel {
          padding: 3px 8px;
          background: #0d172a;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: var(--radius-md);
          font-size: 11px;
        }
        .emergency-table-container {
          overflow-x: auto;
          max-height: 360px;
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
        .gov-table td {
          padding: 8px 10px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
        }
        .emergency-row {
          cursor: pointer;
          transition: background 0.1s ease;
        }
        .emergency-row:hover {
          background: rgba(0, 229, 255, 0.05);
        }
        .priority-pill {
          font-size: 9px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .pri-crit { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }
        .pri-high { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
        .pri-mod { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
        .verif-pill {
          font-size: 9px;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .verif-done { background: rgba(16, 185, 129, 0.15); color: #34d399; }
        .verif-pend { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
        .status-pill {
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 9999px;
        }
        .st-resolved { background: rgba(16, 185, 129, 0.2); color: #34d399; }
        .st-responding { background: rgba(0, 229, 255, 0.2); color: #00e5ff; }
        .st-pending { background: rgba(148, 163, 184, 0.2); color: #cbd5e1; }
        .empty-msg {
          text-align: center;
          padding: 24px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

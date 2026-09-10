import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  RotateCcw,
  CheckCircle2,
  Shield,
  Info
} from 'lucide-react';
import { CITIZEN_DASHBOARD_DATA } from '../../services/mockData';

const CHECKLIST_STORAGE_KEY = 'cyclovision_citizen_checklist_v1';

export default function PreparednessChecklist() {
  const items = CITIZEN_DASHBOARD_DATA.preparednessChecklist || [];

  const [checkedIds, setCheckedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read checklist from localStorage', e);
    }
    // Default initial checked items
    return ['prep-1', 'prep-2'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checkedIds));
    } catch (e) {
      console.warn('Could not save checklist to localStorage', e);
    }
  }, [checkedIds]);

  const toggleItem = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setCheckedIds([]);
  };

  const completedCount = checkedIds.length;
  const totalCount = items.length;
  const progressPercent = Math.round((completedCount / (totalCount || 1)) * 100);

  return (
    <section className="cz-prep-section" aria-labelledby="prep-checklist-title">
      <div className="cz-prep-header">
        <div>
          <div className="prep-sub-tag">INDIVIDUAL & FAMILY READINESS</div>
          <h2 id="prep-checklist-title" className="cz-prep-title">
            CITIZEN PREPAREDNESS CHECKLIST
          </h2>
        </div>

        <button
          type="button"
          className="reset-checklist-btn font-mono"
          onClick={handleReset}
          title="Clear checked items"
        >
          <RotateCcw size={11} />
          <span>Reset</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="prep-progress-card">
        <div className="progress-label-row">
          <span className="prog-title">Readiness Progress:</span>
          <span className="prog-stats font-mono">
            {completedCount} of {totalCount} Items Completed ({progressPercent}%)
          </span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="prep-items-grid">
        {items.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`prep-item ${isChecked ? 'checked' : ''}`}
              onClick={() => toggleItem(item.id)}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  toggleItem(item.id);
                }
              }}
            >
              <div className="check-box-icon">
                {isChecked ? (
                  <CheckSquare size={18} className="text-success" />
                ) : (
                  <Square size={18} className="text-muted" />
                )}
              </div>
              <div className="item-text-col">
                <span className="item-cat-label">{item.category}</span>
                <span className="item-label-text">{item.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clarification Disclaimer per Section 21 */}
      <div className="prep-disclaimer-note">
        <Info size={13} className="text-secondary flex-shrink-0" />
        <span>
          Personal readiness items are saved locally on this browser. This checklist helps plan family safety and does not constitute an official government evacuation instruction.
        </span>
      </div>

      <style>{`
        .cz-prep-section {
          background: #091326;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .cz-prep-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          padding-bottom: 12px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .prep-sub-tag {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-cyan);
          letter-spacing: 0.05em;
        }
        .cz-prep-title {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.02em;
        }
        .reset-checklist-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-muted);
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          font-size: 10px;
          cursor: pointer;
        }
        .reset-checklist-btn:hover {
          color: #ffffff;
          border-color: var(--accent-cyan);
        }
        .prep-progress-card {
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.15);
          padding: 12px 16px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .progress-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }
        .prog-title {
          color: var(--text-primary);
          font-weight: 600;
        }
        .prog-stats {
          color: var(--accent-cyan);
          font-weight: 700;
        }
        .progress-bar-track {
          width: 100%;
          height: 8px;
          background: #060d1b;
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #0284c7 0%, #10b981 100%);
          border-radius: var(--radius-full);
          transition: width 0.3s ease;
        }
        .prep-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 10px;
        }
        .prep-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: #0d1a33;
          border: 1px solid rgba(148, 163, 184, 0.14);
          padding: 12px 14px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.15s ease;
          user-select: none;
        }
        .prep-item:hover {
          border-color: rgba(0, 229, 255, 0.3);
          background: #11203d;
        }
        .prep-item.checked {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.05);
        }
        .check-box-icon {
          flex-shrink: 0;
          margin-top: 1px;
        }
        .item-text-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .item-cat-label {
          font-size: 9px;
          font-weight: 700;
          color: var(--accent-blue-light);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .item-label-text {
          font-size: 12px;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .prep-item.checked .item-label-text {
          color: var(--text-secondary);
          text-decoration: line-through;
        }
        .prep-disclaimer-note {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 11px;
          color: var(--text-muted);
          border-top: 1px solid rgba(148, 163, 184, 0.08);
          padding-top: 8px;
        }
      `}</style>
    </section>
  );
}

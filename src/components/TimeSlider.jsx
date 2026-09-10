import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Clock } from 'lucide-react';
import { TIMESTAMPS } from '../services/mockData';

export default function TimeSlider({ currentTimestampId, onSelectTimestamp }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const currentIndex = TIMESTAMPS.findIndex((t) => t.id === currentTimestampId);
  const activeIndex = currentIndex >= 0 ? currentIndex : TIMESTAMPS.length - 1;

  // Auto-play timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        onSelectTimestamp((prevId) => {
          const idx = TIMESTAMPS.findIndex((t) => t.id === prevId);
          const nextIdx = (idx + 1) % TIMESTAMPS.length;
          return TIMESTAMPS[nextIdx].id;
        });
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onSelectTimestamp]);

  const handlePrev = () => {
    const prevIdx = activeIndex > 0 ? activeIndex - 1 : TIMESTAMPS.length - 1;
    onSelectTimestamp(TIMESTAMPS[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = activeIndex < TIMESTAMPS.length - 1 ? activeIndex + 1 : 0;
    onSelectTimestamp(TIMESTAMPS[nextIdx].id);
  };

  return (
    <div className="sci-card time-controller-card">
      <div className="time-controls-left">
        <div className="time-section-badge">
          <Clock size={14} className="text-accent" />
          <span className="time-badge-label">Observation Frame Controller</span>
        </div>

        <div className="playback-button-group">
          <button
            className="sci-btn sci-btn-sm sci-btn-icon"
            onClick={handlePrev}
            title="Step to Previous Frame (6h)"
            aria-label="Previous Frame"
          >
            <SkipBack size={14} />
          </button>
          <button
            className={`sci-btn sci-btn-sm ${isPlaying ? 'sci-btn-primary' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause Observation Replay" : "Play Sequence Animation"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span style={{ marginLeft: 4 }}>{isPlaying ? 'Pause' : 'Play Replay'}</span>
          </button>
          <button
            className="sci-btn sci-btn-sm sci-btn-icon"
            onClick={handleNext}
            title="Step to Next Frame (6h)"
            aria-label="Next Frame"
          >
            <SkipForward size={14} />
          </button>
        </div>
      </div>

      {/* Synchronized Stepper Timeline */}
      <div className="time-steps-track">
        {TIMESTAMPS.map((t, idx) => {
          const isSelected = t.id === currentTimestampId;
          const isPast = idx < activeIndex;
          return (
            <button
              key={t.id}
              className={`timeline-step-btn ${isSelected ? 'selected' : ''} ${isPast ? 'past' : ''}`}
              onClick={() => onSelectTimestamp(t.id)}
              title={`${t.label} (Lead time ${t.relHours}h)`}
            >
              <div className="timeline-node">
                <span className="node-dot"></span>
              </div>
              <div className="timeline-label font-mono">
                {t.label.split(' ')[0]} {t.label.split(' ')[1]}
              </div>
              <div className="timeline-hour font-mono">
                {t.relHours === 0 ? 'CURRENT' : `${t.relHours}h`}
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        .time-controller-card {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-3) var(--space-4);
          margin-bottom: var(--space-4);
          background-color: #0b1424;
          border-color: rgba(56, 189, 248, 0.2);
        }
        .time-controls-left {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          border-right: 1px solid rgba(148, 163, 184, 0.12);
          padding-right: var(--space-4);
          flex-shrink: 0;
        }
        .time-section-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .playback-button-group {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .time-steps-track {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          position: relative;
        }
        .time-steps-track::before {
          content: '';
          position: absolute;
          left: 15px;
          right: 15px;
          top: 14px;
          height: 2px;
          background: rgba(148, 163, 184, 0.15);
          z-index: 1;
        }
        .timeline-step-btn {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2px 6px;
          background: transparent;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }
        .timeline-node {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .node-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #334155;
          border: 2px solid #0b1424;
          transition: all 0.2s ease;
        }
        .timeline-step-btn:hover .node-dot {
          background-color: var(--accent-cyan);
          transform: scale(1.2);
        }
        .timeline-step-btn.past .node-dot {
          background-color: #0284c7;
        }
        .timeline-step-btn.selected .node-dot {
          background-color: var(--accent-cyan);
          width: 14px;
          height: 14px;
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.8);
          border: 2px solid #ffffff;
        }
        .timeline-label {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 2px;
          white-space: nowrap;
        }
        .timeline-hour {
          font-size: 10px;
          color: var(--text-muted);
        }
        .timeline-step-btn.selected .timeline-label {
          color: var(--accent-cyan);
          font-weight: 700;
        }
        .timeline-step-btn.selected .timeline-hour {
          color: #38bdf8;
          font-weight: 600;
        }
        @media (max-width: 900px) {
          .time-controller-card {
            flex-direction: column;
            align-items: stretch;
          }
          .time-controls-left {
            border-right: none;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            padding-right: 0;
            padding-bottom: var(--space-2);
            justify-content: space-between;
          }
          .time-steps-track {
            overflow-x: auto;
            padding-top: var(--space-2);
          }
        }
      `}</style>
    </div>
  );
}

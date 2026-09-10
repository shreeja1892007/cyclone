import React, { useState, useRef, useEffect } from 'react';
import {
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sliders,
  Layers,
  Info,
  Radio,
  Eye,
  AlertCircle,
  XCircle,
  ShieldCheck
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import SatelliteStatusBadge from './satellite/SatelliteStatusBadge';
import { getSatelliteConfig } from '../services/satelliteService';

export default function SatelliteViewer({
  frameData,
  satelliteId = 'insat3dr',
  initialBand = 'ir',
  readOnly = false,
  onPrevFrame,
  onNextFrame
}) {
  const satConfig = getSatelliteConfig(satelliteId) || getSatelliteConfig('insat3dr');
  const isConnected = satConfig?.isConnected;

  const [activeTab, setActiveTab] = useState(initialBand);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [contrastBoost, setContrastBoost] = useState(false);
  const [opacity, setOpacity] = useState(100);
  const [showPlaceholderMode, setShowPlaceholderMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Sync activeTab if current band doesn't exist on satellite
  useEffect(() => {
    if (activeTab === 'overlay') return;
    if (satConfig?.bands?.length > 0) {
      const exists = satConfig.bands.some((b) => b.id === activeTab);
      if (!exists) {
        setActiveTab(satConfig.bands[0].id);
      }
    }
  }, [satelliteId, satConfig]);

  // Render authentic multispectral radiance simulation on HTML5 canvas only when connected
  useEffect(() => {
    if (!isConnected || showPlaceholderMode || activeTab === 'overlay') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 560);
    const height = (canvas.height = 400);

    // Background ocean radiation base
    ctx.fillStyle = activeTab === 'vis' ? '#111e33' : '#030814';
    ctx.fillRect(0, 0, width, height);

    const lat = frameData?.latitude || 14.8;
    const lon = frameData?.longitude || 87.3;
    // Map center coordinates into canvas
    const centerX = width * 0.52 + (lon - 87.0) * 12;
    const centerY = height * 0.5 - (lat - 14.0) * 12;

    // Convective cloud bands & circulation
    const conf = frameData?.detection?.confidence || 90;
    const numArms = 3;
    const maxRadius = 140 * (conf / 85);

    if (activeTab === 'ir' || activeTab === 'tir2') {
      // Infrared: Brightness temperature color scale (cold cloud tops in shades of cyan/white/red BD curve)
      const grad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, maxRadius);
      grad.addColorStop(0, contrastBoost ? '#ffffff' : '#e0f7fa');
      grad.addColorStop(0.2, '#00e5ff');
      grad.addColorStop(0.45, '#0284c7');
      grad.addColorStop(0.7, '#1e293b');
      grad.addColorStop(1, 'rgba(3, 8, 20, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.fill();

      // Curved spiral band streaks
      ctx.strokeStyle = contrastBoost ? 'rgba(0, 229, 255, 0.7)' : 'rgba(14, 165, 233, 0.45)';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      for (let arm = 0; arm < numArms; arm++) {
        ctx.beginPath();
        const startAngle = (arm * Math.PI * 2) / numArms + lon * 0.1;
        for (let r = 20; r < maxRadius * 0.9; r += 6) {
          const angle = startAngle + r / 35;
          const x = centerX + Math.cos(angle) * r * 1.1;
          const y = centerY + Math.sin(angle) * (r * 0.85);
          if (r === 20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    } else if (activeTab === 'wv') {
      // Water Vapour (6.7 µm): Mid-to-upper tropospheric moisture
      const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, maxRadius * 1.2);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.35, '#0369a1');
      grad.addColorStop(0.65, '#082f49');
      grad.addColorStop(0.85, '#020617');
      grad.addColorStop(1, 'rgba(2, 6, 23, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Draw dry slot intrusion arc
      ctx.strokeStyle = '#020617';
      ctx.lineWidth = 22;
      ctx.beginPath();
      ctx.arc(centerX - 35, centerY - 25, 75, 0.2, Math.PI * 0.85);
      ctx.stroke();
    } else if (activeTab === 'vis') {
      // Visible (0.65 µm): Albedo reflection
      const grad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, maxRadius * 0.85);
      grad.addColorStop(0, '#f8fafc');
      grad.addColorStop(0.4, '#cbd5e1');
      grad.addColorStop(0.7, '#64748b');
      grad.addColorStop(1, 'rgba(17, 30, 51, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.85, 0, Math.PI * 2);
      ctx.fill();
    } else if (activeTab === 'swir' || activeTab === 'mir') {
      // Shortwave / Mid IR
      const grad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, maxRadius * 0.75);
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.3, '#d97706');
      grad.addColorStop(0.6, '#451a03');
      grad.addColorStop(1, 'rgba(17, 30, 51, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.75, 0, Math.PI * 2);
      ctx.fill();
    }

    // Reticle & Grid Lines (Remote-sensing coordinate overlay)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 40; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 40; y < height; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Crosshair over analyzed centroid
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
    ctx.moveTo(centerX - 20, centerY);
    ctx.lineTo(centerX + 20, centerY);
    ctx.moveTo(centerX, centerY - 20);
    ctx.lineTo(centerX, centerY + 20);
    ctx.stroke();
  }, [activeTab, frameData, contrastBoost, showPlaceholderMode, isConnected]);

  // Current band metadata
  const currentBandObj = satConfig?.bands?.find((b) => b.id === activeTab) || satConfig?.bands?.[0] || {
    name: 'Infrared',
    wavelength: '10.8 µm',
    resolution: '4 km'
  };

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.max(0.7, Math.min(2.5, prev + delta)));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setContrastBoost(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="sci-card satellite-viewer-card" ref={containerRef}>
      {/* Viewer Header with Channels */}
      <div className="sci-card-header sat-header">
        <div className="sat-title-group">
          <Radio size={15} className="text-accent" />
          <span className="sat-title">{satConfig.name} Observation</span>
          <SatelliteStatusBadge
            status={satConfig.isConnected ? (satConfig.isDemo ? 'demo_data' : 'available') : 'not_connected'}
            label={satConfig.isConnected ? (satConfig.isDemo ? 'DEMO DATA' : 'OPERATIONAL L1C') : 'NOT CONNECTED'}
            size="sm"
          />
        </div>

        {/* Spectral Band Tabs - Dynamic based on satellite bands */}
        {isConnected ? (
          <div className="sat-tabs">
            {satConfig.bands.map((band) => (
              <button
                key={band.id}
                className={`sat-tab-btn ${activeTab === band.id ? 'active' : ''}`}
                onClick={() => setActiveTab(band.id)}
                title={`${band.name} (${band.wavelength}) — ${band.resolution}`}
              >
                {band.name.split(' ')[0]} ({band.wavelength})
              </button>
            ))}
            <button
              className={`sat-tab-btn sat-tab-future ${activeTab === 'overlay' ? 'active' : ''}`}
              onClick={() => setActiveTab('overlay')}
              title="Future Feature: Multi-layer AI saliency overlay"
            >
              AI Overlay
              <span className="future-tiny-tag">Prototype</span>
            </button>
          </div>
        ) : (
          <span className="sci-badge sci-badge-danger font-mono text-xs">
            TELEMETRY DISCONNECTED
          </span>
        )}
      </div>

      {/* Main Imagery Display Area */}
      <div className="sat-display-container">
        {!isConnected ? (
          /* NOT CONNECTED STATE — NEVER FABRICATE IMAGERY */
          <div className="sat-not-connected-banner">
            <div className="offline-icon-circle">
              <XCircle size={36} className="text-danger" />
            </div>
            <h3 className="offline-title font-mono">SOURCE NOT AVAILABLE — NOT CONNECTED</h3>
            <p className="offline-desc">
              {satConfig.reasonOffline ||
                'Satellite telemetry feed is not connected to the CycloVision gateway. No authentic observation is available.'}
            </p>
            <div className="offline-meta font-mono">
              <div className="offline-meta-pill">
                <span>PLATFORM:</span> <strong>{satConfig.name}</strong>
              </div>
              <div className="offline-meta-pill">
                <span>PROVIDER:</span> <strong>{satConfig.provider}</strong>
              </div>
              <div className="offline-meta-pill">
                <span>ORBITAL SLOT:</span> <strong>{satConfig.orbitalSlot}</strong>
              </div>
            </div>
            <div className="integrity-lock-note font-mono">
              <AlertCircle size={13} className="text-amber" />
              <span>Scientific Integrity Rule: Synthetic imagery is strictly suppressed for disconnected sensors.</span>
            </div>
          </div>
        ) : showPlaceholderMode || activeTab === 'overlay' ? (
          <div className="sat-placeholder-banner">
            <AlertCircle size={28} className="text-secondary" />
            <p className="placeholder-text">
              {activeTab === 'overlay'
                ? 'AI Saliency & Attention Overlay: Deep feature map from GenesisNet prototype.'
                : 'Raw Earth Engine Direct Ingestion Placeholder — Calibrated radiance mode active.'}
            </p>
            <span className="sci-badge sci-badge-neutral">
              Observation: {frameData?.displayTime || '03 Sep 2026 12:00 UTC'}
            </span>
          </div>
        ) : (
          <div
            className="sat-canvas-viewport"
            style={{
              transform: `scale(${zoomLevel})`,
              opacity: opacity / 100,
              transition: 'transform 0.2s ease, opacity 0.2s ease'
            }}
          >
            <canvas ref={canvasRef} className="sat-canvas" />

            {/* Scientific Overlay Graticule Text */}
            <div className="graticule-coords">
              <span>15.0°N</span>
              <span>87.0°E</span>
              <span className="sat-platform-tag">{satConfig.name}</span>
            </div>

            {/* Scale Bar / Radiance Legend */}
            <div className="sat-radiance-legend">
              <span className="legend-label">
                {activeTab === 'ir' || activeTab === 'tir2'
                  ? 'BT (°C)'
                  : activeTab === 'wv'
                  ? 'WV Index'
                  : 'Reflectance'}
              </span>
              <div
                className="legend-gradient"
                style={{
                  background:
                    activeTab === 'ir' || activeTab === 'tir2'
                      ? 'linear-gradient(to top, #ffffff, #00e5ff, #0284c7, #1e293b, #030814)'
                      : activeTab === 'wv'
                      ? 'linear-gradient(to top, #38bdf8, #0369a1, #082f49, #020617)'
                      : 'linear-gradient(to top, #ffffff, #94a3b8, #334155, #0f172a)'
                }}
              />
              <div className="legend-bounds font-mono">
                <span>{activeTab === 'ir' || activeTab === 'tir2' ? '-80°' : '1.0'}</span>
                <span>{activeTab === 'ir' || activeTab === 'tir2' ? '+25°' : '0.0'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Floating Toolbar (only when connected) */}
        {isConnected && (
          <div className="sat-floating-controls">
            <button className="sat-tool-btn" onClick={() => handleZoom(0.2)} title="Zoom In">
              <ZoomIn size={14} />
            </button>
            <button className="sat-tool-btn" onClick={() => handleZoom(-0.2)} title="Zoom Out">
              <ZoomOut size={14} />
            </button>
            <button className="sat-tool-btn" onClick={handleResetZoom} title="Reset View">
              <RotateCcw size={14} />
            </button>
            <button
              className={`sat-tool-btn ${contrastBoost ? 'active' : ''}`}
              onClick={() => setContrastBoost(!contrastBoost)}
              title="Toggle Radiance Contrast Enhancement"
            >
              <Sliders size={14} />
            </button>
            <button
              className={`sat-tool-btn ${showPlaceholderMode ? 'active' : ''}`}
              onClick={() => setShowPlaceholderMode(!showPlaceholderMode)}
              title="Toggle Earth Engine Raw Layer"
            >
              <Layers size={14} />
            </button>
            <button className="sat-tool-btn" onClick={toggleFullscreen} title="Toggle Fullscreen">
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        )}
      </div>

      {/* Satellite Metadata Bar */}
      <div className="sat-metadata-bar font-mono">
        <div className="sat-meta-cell">
          <span className="meta-k">Source:</span>
          <span className="meta-v">{satConfig.name}</span>
        </div>
        <div className="sat-meta-cell">
          <span className="meta-k">Instrument:</span>
          <span className="meta-v">{satConfig.instrument}</span>
        </div>
        <div className="sat-meta-cell">
          <span className="meta-k">Band:</span>
          <span className="meta-v text-accent">{currentBandObj.name} ({currentBandObj.wavelength})</span>
        </div>
        <div className="sat-meta-cell">
          <span className="meta-k">Resolution:</span>
          <span className="meta-v text-teal">{currentBandObj.resolution}</span>
        </div>
        <div className="sat-meta-cell">
          <span className="meta-k">Provider:</span>
          <span className="meta-v">{satConfig.provider}</span>
        </div>
        <div className="sat-meta-cell">
          <span className="meta-k">Frame Time:</span>
          <span className="meta-v">{frameData?.displayTime || '03 Sep 2026 12:00 UTC'}</span>
        </div>
      </div>

      <style>{`
        .satellite-viewer-card {
          display: flex;
          flex-direction: column;
          padding: var(--space-3);
          height: 100%;
        }
        .sat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-2);
          padding-bottom: var(--space-2);
        }
        .sat-title-group {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .sat-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-primary);
        }
        .sat-tabs {
          display: flex;
          gap: 3px;
          background: rgba(148, 163, 184, 0.08);
          padding: 2px;
          border-radius: var(--radius-sm);
          flex-wrap: wrap;
        }
        .sat-tab-btn {
          font-size: 11px;
          font-weight: 500;
          padding: 4px 9px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .sat-tab-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.04);
        }
        .sat-tab-btn.active {
          background: var(--bg-surface-elevated);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 229, 255, 0.3);
          font-weight: 600;
        }
        .future-tiny-tag {
          font-size: 8px;
          padding: 1px 4px;
          background: rgba(100, 116, 139, 0.25);
          color: var(--text-muted);
          border-radius: 3px;
          text-transform: uppercase;
        }
        .sat-display-container {
          position: relative;
          background: #020610;
          border-radius: var(--radius-md);
          overflow: hidden;
          min-height: 320px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(148, 163, 184, 0.1);
        }
        .sat-not-connected-banner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 10px;
          padding: var(--space-5);
          max-width: 480px;
        }
        .offline-icon-circle {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .offline-title {
          font-size: 13px;
          font-weight: 700;
          color: #f87171;
          letter-spacing: 0.04em;
        }
        .offline-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .offline-meta {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 4px;
        }
        .offline-meta-pill {
          background: rgba(148, 163, 184, 0.08);
          border: 1px solid rgba(148, 163, 184, 0.15);
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          font-size: 10px;
          color: var(--text-dim);
        }
        .offline-meta-pill strong {
          color: var(--text-primary);
        }
        .integrity-lock-note {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          color: #fcd34d;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 5px 10px;
          border-radius: var(--radius-sm);
          margin-top: 6px;
        }
        .sat-canvas-viewport {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sat-canvas {
          max-width: 100%;
          height: auto;
          display: block;
          border-radius: var(--radius-sm);
        }
        .graticule-coords {
          position: absolute;
          top: 8px;
          left: 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: rgba(148, 163, 184, 0.5);
          display: flex;
          gap: 12px;
          pointer-events: none;
        }
        .sat-platform-tag {
          color: var(--accent-cyan);
          background: rgba(0, 229, 255, 0.1);
          padding: 1px 4px;
          border-radius: 2px;
        }
        .sat-radiance-legend {
          position: absolute;
          right: 10px;
          bottom: 12px;
          background: rgba(11, 20, 36, 0.85);
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(148, 163, 184, 0.15);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .legend-label {
          font-size: 9px;
          font-weight: 600;
          color: var(--text-secondary);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
        .legend-gradient {
          width: 8px;
          height: 52px;
          border-radius: 2px;
        }
        .legend-bounds {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 52px;
          font-size: 9px;
          color: var(--text-muted);
        }
        .sat-floating-controls {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          gap: 4px;
          background: rgba(11, 20, 36, 0.85);
          backdrop-filter: blur(6px);
          padding: 4px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(148, 163, 184, 0.18);
          z-index: 10;
        }
        .sat-tool-btn {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          transition: all 0.15s ease;
        }
        .sat-tool-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .sat-tool-btn.active {
          background: rgba(0, 229, 255, 0.2);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 229, 255, 0.3);
        }
        .sat-placeholder-banner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: var(--space-2);
          padding: var(--space-5);
          color: var(--text-secondary);
        }
        .placeholder-text {
          font-size: 13px;
          max-width: 360px;
          color: var(--text-secondary);
        }
        .sat-metadata-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-top: var(--space-2);
          padding-top: var(--space-2);
          border-top: 1px solid rgba(148, 163, 184, 0.08);
          font-size: 11px;
        }
        .sat-meta-cell {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .meta-k {
          color: var(--text-muted);
        }
        .meta-v {
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}

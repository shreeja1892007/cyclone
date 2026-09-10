import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import Plotly from 'plotly.js-dist-min';
import { History, Calendar, Compass, Layers, ShieldCheck, Activity, TrendingUp } from 'lucide-react';
import { HISTORICAL_CYCLONES } from '../services/mockData';
import StatusBadge from '../components/StatusBadge';

export default function Historical() {
  const [selectedCycloneId, setSelectedCycloneId] = useState('cyclone-mocha-2023');
  const [selectedMetric, setSelectedMetric] = useState('probability'); // 'probability', 'mslp', 'sst', 'rh', 'shear'

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const chartContainerRef = useRef(null);

  const cyclone = HISTORICAL_CYCLONES.find((c) => c.id === selectedCycloneId) || HISTORICAL_CYCLONES[0];

  // Leaflet Map Initialization for Historical Track
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [14.5, 87.0],
        zoom: 5,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        subdomains: 'abcd'
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing layers
    map.eachLayer((layer) => {
      if (layer instanceof L.Polyline || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    // Render Track Polyline
    const coords = cyclone.track.map((pt) => [pt.lat, pt.lon]);
    const trackLine = L.polyline(coords, {
      color: '#00e5ff',
      weight: 3,
      opacity: 0.85
    }).addTo(map);

    // Render Individual Observed Waypoints
    cyclone.track.forEach((pt, i) => {
      const isPeak = i === cyclone.track.length - 1;
      const marker = L.circleMarker([pt.lat, pt.lon], {
        radius: isPeak ? 8 : 5,
        fillColor: isPeak ? '#ef4444' : '#38bdf8',
        color: '#070d18',
        weight: 2,
        fillOpacity: 1
      }).bindTooltip(`<b>${pt.date}</b><br/>MSLP: ${pt.mslp} hPa<br/>SST: ${pt.sst} °C<br/>AI Genesis Prob: ${pt.prob}%`, {
        direction: 'top'
      }).addTo(map);
    });

    map.fitBounds(trackLine.getBounds(), { padding: [30, 30] });

  }, [cyclone]);

  // Plotly Historical Trend Chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const xDates = cyclone.track.map((pt) => pt.date);

    const metricConfigs = {
      probability: {
        y: cyclone.track.map((pt) => pt.prob),
        name: 'AI Genesis Probability',
        yTitle: 'Probability (%)',
        color: '#00e5ff',
        unit: '%'
      },
      mslp: {
        y: cyclone.track.map((pt) => pt.mslp),
        name: 'Minimum Central Pressure',
        yTitle: 'MSLP (hPa)',
        color: '#38bdf8',
        unit: ' hPa'
      },
      sst: {
        y: cyclone.track.map((pt) => pt.sst),
        name: 'Sea Surface Temperature',
        yTitle: 'SST (°C)',
        color: '#f59e0b',
        unit: ' °C'
      },
      rh: {
        y: cyclone.track.map((pt) => pt.rh),
        name: 'Relative Humidity (500 hPa)',
        yTitle: 'RH (%)',
        color: '#14b8a6',
        unit: '%'
      },
      shear: {
        y: cyclone.track.map((pt) => pt.shear),
        name: 'Vertical Wind Shear',
        yTitle: 'VWS (m/s)',
        color: '#a855f7',
        unit: ' m/s'
      }
    };

    const activeConfig = metricConfigs[selectedMetric];

    const trace = {
      x: xDates,
      y: activeConfig.y,
      type: 'scatter',
      mode: 'lines+markers',
      name: activeConfig.name,
      line: {
        color: activeConfig.color,
        width: 3,
        shape: 'spline'
      },
      marker: {
        color: activeConfig.color,
        size: 7,
        line: { color: '#ffffff', width: 1.5 }
      },
      hovertemplate: `<b>%{x}</b><br>${activeConfig.name}: %{y}${activeConfig.unit}<extra></extra>`
    };

    const layout = {
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 55, r: 25, t: 20, b: 45 },
      xaxis: {
        color: '#94a3b8',
        gridcolor: 'rgba(148, 163, 184, 0.08)',
        tickfont: { family: 'Inter', size: 11, color: '#94a3b8' },
        showgrid: true,
        zeroline: false
      },
      yaxis: {
        title: {
          text: activeConfig.yTitle,
          font: { family: 'Inter', size: 12, color: '#cbd5e1' }
        },
        color: '#94a3b8',
        gridcolor: 'rgba(148, 163, 184, 0.08)',
        tickfont: { family: 'JetBrains Mono', size: 11, color: '#94a3b8' },
        showgrid: true,
        zeroline: false
      },
      hoverlabel: {
        bgcolor: '#0f1d35',
        bordercolor: activeConfig.color,
        font: { family: 'Inter', color: '#f1f5f9' }
      },
      showlegend: false
    };

    const config = {
      responsive: true,
      displayModeBar: false
    };

    Plotly.newPlot(chartContainerRef.current, [trace], layout, config);

    const handleResize = () => {
      if (chartContainerRef.current) {
        Plotly.Plots.resize(chartContainerRef.current);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [cyclone, selectedMetric]);

  return (
    <div className="historical-page">
      <div className="page-header">
        <div>
          <h1 className="text-h1">Historical Cyclone Explorer</h1>
          <p className="header-subtitle">
            Ground-Truth Best Track Verification & Retrospective Genesis Model Simulation
          </p>
        </div>
        <div className="page-header-badges">
          <StatusBadge status="available" label="IBTrACS v04r00 Ground Truth" />
          <span className="sci-badge sci-badge-cyan">RSMC New Delhi</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="sci-card filter-toolbar">
        <div className="filter-group">
          <label className="filter-label">Select Cyclone:</label>
          <select
            className="sci-select"
            value={selectedCycloneId}
            onChange={(e) => setSelectedCycloneId(e.target.value)}
          >
            {HISTORICAL_CYCLONES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.year}) — {c.basin}
              </option>
            ))}
          </select>
        </div>

        <div className="cyclone-quick-meta">
          <span className="q-pill font-mono">Basin: {cyclone.basin}</span>
          <span className="q-pill font-mono">Formed: {cyclone.formationDate}</span>
          <span className="q-pill font-mono">Peak: {cyclone.peakIntensity}</span>
          <span className="q-pill font-mono">Min MSLP: {cyclone.minPressure}</span>
        </div>
      </div>

      {/* Main Workspace: Historical Track Map + Retrospective Genesis Graph */}
      <div className="historical-workspace-grid">
        {/* Leaflet Historical Track */}
        <div className="sci-card hist-map-card">
          <div className="sci-card-header">
            <div className="sci-card-title">
              <Compass size={15} className="text-accent" /> Historical Best Track (IBTrACS)
            </div>
            <span className="sci-badge sci-badge-cyan font-mono">{cyclone.name}</span>
          </div>
          <div className="hist-map-viewport">
            <div ref={mapContainerRef} className="leaflet-map-element" style={{ minHeight: '320px', height: '100%' }} />
          </div>
        </div>

        {/* Retrospective Parameter Timeline */}
        <div className="sci-card hist-chart-card">
          <div className="sci-card-header">
            <div>
              <div className="sci-card-title">
                <TrendingUp size={15} className="text-accent" /> Retrospective AI Genesis Probability & Synoptic Timeline
              </div>
              <div className="chart-subhead">
                GenesisNet v0.1 Simulation vs Ground Truth Progression
              </div>
            </div>

            <div className="chart-metric-tabs">
              <button
                className={`metric-tab-btn ${selectedMetric === 'probability' ? 'active' : ''}`}
                onClick={() => setSelectedMetric('probability')}
              >
                Genesis Prob (%)
              </button>
              <button
                className={`metric-tab-btn ${selectedMetric === 'mslp' ? 'active' : ''}`}
                onClick={() => setSelectedMetric('mslp')}
              >
                MSLP (hPa)
              </button>
              <button
                className={`metric-tab-btn ${selectedMetric === 'sst' ? 'active' : ''}`}
                onClick={() => setSelectedMetric('sst')}
              >
                SST (°C)
              </button>
              <button
                className={`metric-tab-btn ${selectedMetric === 'shear' ? 'active' : ''}`}
                onClick={() => setSelectedMetric('shear')}
              >
                Shear (m/s)
              </button>
            </div>
          </div>

          <div className="hist-plot-box">
            <div ref={chartContainerRef} style={{ width: '100%', height: '280px' }} />
          </div>
        </div>
      </div>

      {/* Lifecycle Stages & Synoptic Overview */}
      <div className="sci-card lifecycle-card">
        <div className="sci-card-header">
          <div className="sci-card-title">
            <Activity size={15} className="text-accent" /> Verified Cyclone Lifecycle Stages
          </div>
          <span className="sci-badge sci-badge-teal font-mono">Source: {cyclone.source}</span>
        </div>

        <div className="lifecycle-stages-row">
          {cyclone.stages.map((stage, i) => (
            <div key={i} className="stage-node">
              <span className="stage-num font-mono">STAGE {i + 1}</span>
              <span className="stage-name">{stage}</span>
            </div>
          ))}
        </div>

        <div className="synoptic-notes-box">
          <strong>Synoptic Analysis & Meteorological Summary:</strong> {cyclone.notes}
        </div>
      </div>

      <style>{`
        .historical-page {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: var(--space-3);
          border-bottom: 1px solid var(--bg-card-border);
        }
        .page-header-badges {
          display: flex;
          gap: var(--space-2);
        }
        .filter-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-3);
          background: #0b1424;
          padding: var(--space-3) var(--space-4);
        }
        .filter-group {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .filter-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .cyclone-quick-meta {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .q-pill {
          font-size: 11px;
          padding: 3px 8px;
          background: rgba(148, 163, 184, 0.08);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
        }
        .historical-workspace-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }
        .hist-map-card, .hist-chart-card {
          background: #091222;
          display: flex;
          flex-direction: column;
        }
        .hist-map-viewport {
          border-radius: var(--radius-md);
          overflow: hidden;
          flex: 1;
        }
        .chart-subhead {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .chart-metric-tabs {
          display: flex;
          gap: 4px;
          background: rgba(148, 163, 184, 0.08);
          padding: 2px;
          border-radius: var(--radius-sm);
        }
        .metric-tab-btn {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }
        .metric-tab-btn.active {
          background: var(--bg-surface-elevated);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 229, 255, 0.3);
        }
        .lifecycle-card {
          background: #091222;
        }
        .lifecycle-stages-row {
          display: flex;
          gap: var(--space-2);
          overflow-x: auto;
          padding: var(--space-2) 0;
        }
        .stage-node {
          background: rgba(148, 163, 184, 0.04);
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 140px;
        }
        .stage-num {
          font-size: 9px;
          color: var(--accent-cyan);
          letter-spacing: 0.05em;
        }
        .stage-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .synoptic-notes-box {
          margin-top: var(--space-3);
          padding: var(--space-3);
          background: rgba(148, 163, 184, 0.03);
          border-left: 3px solid var(--accent-cyan);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .synoptic-notes-box strong {
          color: var(--text-primary);
        }
        @media (max-width: 1100px) {
          .historical-workspace-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

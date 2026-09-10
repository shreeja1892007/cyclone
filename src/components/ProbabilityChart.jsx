import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist-min';
import { TrendingUp, BarChart2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ProbabilityChart({ currentTimestampId }) {
  const chartContainerRef = useRef(null);
  const [activeMetric, setActiveMetric] = useState('probability'); // 'probability', 'pressure', 'rh', 'sst'

  const timeLabels = ['-36 h (02/00Z)', '-30 h (02/06Z)', '-24 h (02/12Z)', '-18 h (02/18Z)', '-12 h (03/00Z)', '-6 h (03/06Z)', 'Current (03/12Z)'];

  // Metric series data
  const datasets = {
    probability: {
      y: [14, 21, 30, 42, 55, 68, 76],
      name: 'Genesis Probability',
      yTitle: 'Genesis Probability (%)',
      color: '#00e5ff',
      range: [0, 100],
      unit: '%'
    },
    pressure: {
      y: [1008, 1007, 1006, 1005, 1005, 1004, 1004],
      name: 'Central MSLP',
      yTitle: 'Mean Sea-Level Pressure (hPa)',
      color: '#38bdf8',
      range: [995, 1012],
      unit: 'hPa'
    },
    rh: {
      y: [66, 68, 70, 72, 73, 74, 74],
      name: 'Relative Humidity 500 hPa',
      yTitle: 'Relative Humidity (%)',
      color: '#14b8a6',
      range: [50, 100],
      unit: '%'
    },
    sst: {
      y: [28.9, 29.0, 29.1, 29.2, 29.3, 29.3, 29.3],
      name: 'Sea Surface Temperature',
      yTitle: 'Temperature (°C)',
      color: '#f59e0b',
      range: [27.5, 31.0],
      unit: '°C'
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const currentDataset = datasets[activeMetric];

    const trace = {
      x: timeLabels,
      y: currentDataset.y,
      type: 'scatter',
      mode: 'lines+markers',
      name: currentDataset.name,
      line: {
        color: currentDataset.color,
        width: 3,
        shape: 'spline'
      },
      marker: {
        color: currentDataset.color,
        size: 7,
        line: {
          color: '#ffffff',
          width: 1.5
        }
      },
      hovertemplate: `<b>%{x}</b><br>${currentDataset.name}: %{y}${currentDataset.unit}<extra></extra>`
    };

    // Add threshold horizontal line if probability
    const layoutShapes = [];
    if (activeMetric === 'probability') {
      layoutShapes.push({
        type: 'line',
        x0: -0.5,
        x1: 6.5,
        y0: 50,
        y1: 50,
        line: {
          color: 'rgba(245, 158, 11, 0.5)',
          width: 1.5,
          dash: 'dot'
        }
      });
    }

    const layout = {
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 55, r: 25, t: 30, b: 50 },
      shapes: layoutShapes,
      xaxis: {
        color: '#94a3b8',
        gridcolor: 'rgba(148, 163, 184, 0.08)',
        tickfont: { family: 'Inter', size: 11, color: '#94a3b8' },
        showgrid: true,
        zeroline: false
      },
      yaxis: {
        title: {
          text: currentDataset.yTitle,
          font: { family: 'Inter', size: 12, color: '#cbd5e1' }
        },
        color: '#94a3b8',
        gridcolor: 'rgba(148, 163, 184, 0.08)',
        tickfont: { family: 'JetBrains Mono', size: 11, color: '#94a3b8' },
        range: currentDataset.range,
        showgrid: true,
        zeroline: false
      },
      hoverlabel: {
        bgcolor: '#0f1d35',
        bordercolor: currentDataset.color,
        font: { family: 'Inter', color: '#f1f5f9' }
      },
      showlegend: false
    };

    const config = {
      responsive: true,
      displayModeBar: true,
      modeBarButtonsToRemove: ['lasso2d', 'select2d', 'toggleSpikelines'],
      displaylogo: false
    };

    Plotly.newPlot(chartContainerRef.current, [trace], layout, config);

    const handleResize = () => {
      if (chartContainerRef.current) {
        Plotly.Plots.resize(chartContainerRef.current);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeMetric]);

  return (
    <div className="sci-card chart-card">
      <div className="sci-card-header chart-card-header">
        <div>
          <div className="sci-card-title">
            <TrendingUp size={15} className="text-accent" />
            <span>
              {activeMetric === 'probability'
                ? 'Genesis Probability — Next 24 Hours'
                : `${datasets[activeMetric].name} Evolution`}
            </span>
          </div>
          <div className="chart-subhead">
            Central Bay of Bengal | GenesisNet v0.1 | Demonstration Model Output
          </div>
        </div>

        {/* Independent variable tabs per Section 24 */}
        <div className="chart-metric-tabs">
          <button
            className={`metric-tab-btn ${activeMetric === 'probability' ? 'active' : ''}`}
            onClick={() => setActiveMetric('probability')}
          >
            Genesis Probability (%)
          </button>
          <button
            className={`metric-tab-btn ${activeMetric === 'pressure' ? 'active' : ''}`}
            onClick={() => setActiveMetric('pressure')}
          >
            MSLP (hPa)
          </button>
          <button
            className={`metric-tab-btn ${activeMetric === 'rh' ? 'active' : ''}`}
            onClick={() => setActiveMetric('rh')}
          >
            RH 500 (%)
          </button>
          <button
            className={`metric-tab-btn ${activeMetric === 'sst' ? 'active' : ''}`}
            onClick={() => setActiveMetric('sst')}
          >
            SST (°C)
          </button>
        </div>
      </div>

      <div className="plot-container-box">
        <div ref={chartContainerRef} className="plotly-canvas" />
      </div>

      <div className="chart-footer-caption">
        <span>Lead Time Progression: <strong>-36 h to Current (03 Sep 12:00 UTC)</strong></span>
        <span className="sci-badge sci-badge-cyan">Single-Axis Scientific Plot</span>
      </div>

      <style>{`
        .chart-card {
          margin-bottom: var(--space-4);
          background-color: #091222;
        }
        .chart-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: 0;
          padding-bottom: var(--space-2);
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
          font-weight: 500;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          transition: all 0.15s ease;
        }
        .metric-tab-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.04);
        }
        .metric-tab-btn.active {
          background: var(--bg-surface-elevated);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 229, 255, 0.3);
          font-weight: 600;
        }
        .plot-container-box {
          position: relative;
          width: 100%;
          min-height: 250px;
        }
        .plotly-canvas {
          width: 100%;
          height: 250px;
        }
        .chart-footer-caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: var(--text-muted);
          padding-top: var(--space-2);
          border-top: 1px solid rgba(148, 163, 184, 0.08);
        }
      `}</style>
    </div>
  );
}

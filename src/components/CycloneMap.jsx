import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Layers,
  Maximize2,
  Minimize2,
  Compass,
  AlertTriangle,
  Radio,
  PhoneCall,
  Eye,
  EyeOff,
  Building2,
  Shield,
  BrainCircuit,
  Filter
} from 'lucide-react';
import { ACTIVE_SYSTEM_TRAJECTORY, CRITICAL_INFRASTRUCTURE, DISTRICT_IMPACT_DATA } from '../services/mockData';

export default function CycloneMap({
  frameData,
  selectedRegion,
  emergencyRequests = [],
  onSelectEmergency,
  onOpenAnalysis,
  selectedDistrict = 'All',
  selectedState = 'All'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const cycloneLayerGroupRef = useRef(null);
  const emergencyLayerGroupRef = useRef(null);
  const riskLayerGroupRef = useRef(null);
  const infraLayerGroupRef = useRef(null);
  const overlayLayerRef = useRef(null);

  // Layer Toggles
  const [layers, setLayers] = useState({
    observedTrack: true,
    officialForecast: true,
    aiProjectedTrack: true,
    emergencyMarkers: true,
    affectedDistricts: true,
    criticalInfra: true,
    envOverlay: 'none', // 'none', 'sst', 'mslp', 'shear', 'rainfall'
    satelliteSource: 'insat3dr' // 'none', 'insat3dr', 'insat3d'
  });

  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: selectedRegion?.center || [16.0, 84.5],
      zoom: selectedRegion?.zoom || 6,
      zoomControl: false,
      attributionControl: false
    });

    // High-contrast dark basemap (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Create persistent layer groups
    overlayLayerRef.current = L.layerGroup().addTo(map);
    riskLayerGroupRef.current = L.layerGroup().addTo(map);
    cycloneLayerGroupRef.current = L.layerGroup().addTo(map);
    infraLayerGroupRef.current = L.layerGroup().addTo(map);
    emergencyLayerGroupRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update center when region changes
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedRegion) return;
    mapInstanceRef.current.setView(selectedRegion.center, selectedRegion.zoom, { animate: true });
  }, [selectedRegion]);

  // Center on district if specified
  useEffect(() => {
    if (!mapInstanceRef.current || selectedDistrict === 'All') return;
    const dist = DISTRICT_IMPACT_DATA.find((d) => d.district.toLowerCase() === selectedDistrict.toLowerCase());
    if (dist && dist.coordinates) {
      mapInstanceRef.current.setView(dist.coordinates, 9, { animate: true });
    }
  }, [selectedDistrict]);

  // 2. Render Meteorological Overlays (SST, MSLP, Shear, Rainfall)
  useEffect(() => {
    if (!overlayLayerRef.current) return;
    const group = overlayLayerRef.current;
    group.clearLayers();

    if (layers.envOverlay === 'sst') {
      // Warm pool SST polygon over central Bay of Bengal (>29°C)
      const sstWarmPool = L.polygon([
        [10.0, 83.0],
        [12.0, 93.0],
        [19.0, 91.0],
        [17.5, 84.0]
      ], {
        color: '#f59e0b',
        weight: 1.5,
        fillColor: '#f59e0b',
        fillOpacity: 0.18,
        dashArray: '4, 4'
      }).bindTooltip('<b>ERA5 SST Warm Pool (&gt;29.0 °C)</b><br/>High Thermodynamic Potential', { sticky: true });
      group.addLayer(sstWarmPool);
    } else if (layers.envOverlay === 'mslp') {
      // Isobar circles around depression center
      const lat = frameData?.latitude || 14.8;
      const lon = frameData?.longitude || 87.3;
      const isobar1 = L.circle([lat, lon], {
        radius: 160000,
        color: '#00e5ff',
        weight: 1.2,
        fill: false,
        dashArray: '3, 3'
      }).bindTooltip('1004 hPa Closed Isobar', { sticky: true });

      const isobar2 = L.circle([lat, lon], {
        radius: 320000,
        color: '#38bdf8',
        weight: 1,
        fill: false,
        dashArray: '5, 5'
      }).bindTooltip('1008 hPa Outer Synoptic Isobar', { sticky: true });

      group.addLayer(isobar1);
      group.addLayer(isobar2);
    } else if (layers.envOverlay === 'shear') {
      const shearCorridor = L.polygon([
        [11.0, 84.0],
        [11.0, 91.0],
        [18.0, 88.0],
        [17.0, 83.0]
      ], {
        color: '#10b981',
        weight: 1.5,
        fillColor: '#10b981',
        fillOpacity: 0.12,
        dashArray: '6, 4'
      }).bindTooltip('<b>Favorable Vertical Wind Shear Corridor (&lt;12 m/s)</b>', { sticky: true });
      group.addLayer(shearCorridor);
    } else if (layers.envOverlay === 'rainfall') {
      const rainZone = L.polygon([
        [17.5, 83.0],
        [18.5, 87.5],
        [21.5, 88.0],
        [20.5, 84.5]
      ], {
        color: '#3b82f6',
        weight: 1.5,
        fillColor: '#3b82f6',
        fillOpacity: 0.22,
        dashArray: '4, 4'
      }).bindTooltip('<b>Heavy Rainfall Swath Zone (&gt;150 mm)</b>', { sticky: true });
      group.addLayer(rainZone);
    }

    // Satellite Geostationary Footprint Overlay (Only authentic coverage boundaries; no fake rasters)
    if (layers.satelliteSource === 'insat3dr') {
      const insatFootprint = L.polygon([
        [5.0, 68.0],
        [5.0, 98.0],
        [24.0, 96.0],
        [24.0, 68.0]
      ], {
        color: '#00e5ff',
        weight: 1.5,
        fillColor: '#00e5ff',
        fillOpacity: 0.06,
        dashArray: '5, 5'
      }).bindTooltip('<b>INSAT-3DR Operational Coverage (74.0°E)</b><br/>Primary Geostationary Radiance Basin', { sticky: true });
      group.addLayer(insatFootprint);
    } else if (layers.satelliteSource === 'insat3d') {
      const insat3dFootprint = L.polygon([
        [5.0, 72.0],
        [5.0, 102.0],
        [24.0, 100.0],
        [24.0, 72.0]
      ], {
        color: '#38bdf8',
        weight: 1.5,
        fillColor: '#38bdf8',
        fillOpacity: 0.06,
        dashArray: '5, 5'
      }).bindTooltip('<b>INSAT-3D Standby Coverage (82.0°E)</b><br/>Standby Cross-Calibration Sector', { sticky: true });
      group.addLayer(insat3dFootprint);
    }
  }, [layers.envOverlay, layers.satelliteSource, frameData]);

  // 3. Render Risk & Potentially Affected Coastal Districts
  useEffect(() => {
    if (!riskLayerGroupRef.current) return;
    const group = riskLayerGroupRef.current;
    group.clearLayers();

    if (!layers.affectedDistricts) return;

    // Filter districts by state if needed
    const districtsToShow = DISTRICT_IMPACT_DATA.filter(
      (d) => selectedState === 'All' || d.state === selectedState
    );

    districtsToShow.forEach((dist) => {
      const isCritical = dist.overallRisk === 'CRITICAL';
      const isHigh = dist.overallRisk === 'HIGH';
      const color = isCritical ? '#ef4444' : isHigh ? '#f59e0b' : '#38bdf8';
      const radius = isCritical ? 24000 : isHigh ? 20000 : 16000;

      const riskCircle = L.circle(dist.coordinates, {
        radius,
        color,
        weight: 1.5,
        fillColor: color,
        fillOpacity: 0.15
      }).bindTooltip(
        `<b>${dist.district} (${dist.state})</b><br/>Overall Risk: <span style="color:${color};font-weight:bold">${dist.overallRisk}</span><br/>Wind: ${dist.windRisk}<br/>Warning: ${dist.officialWarning}`,
        { sticky: true }
      );

      group.addLayer(riskCircle);
    });
  }, [layers.affectedDistricts, selectedState]);

  // 4. Render Cyclone Tracks (Observed, Official Forecast, AI Projected)
  useEffect(() => {
    if (!cycloneLayerGroupRef.current) return;
    const group = cycloneLayerGroupRef.current;
    group.clearLayers();

    const traj = ACTIVE_SYSTEM_TRAJECTORY;
    const currentLat = frameData?.latitude || 14.8;
    const currentLon = frameData?.longitude || 87.3;

    // A. OBSERVED TRACK (Solid Line + Solid Markers)
    if (layers.observedTrack && traj.observed.length > 0) {
      const observedCoords = traj.observed.map((pt) => [pt.lat, pt.lon]);
      const obsLine = L.polyline(observedCoords, {
        color: '#38bdf8',
        weight: 3,
        opacity: 0.9
      });
      group.addLayer(obsLine);

      traj.observed.forEach((pt, i) => {
        const isCurrent = i === traj.observed.length - 1;
        if (!isCurrent) {
          const marker = L.circleMarker([pt.lat, pt.lon], {
            radius: 5,
            fillColor: '#38bdf8',
            color: '#070d18',
            weight: 2,
            fillOpacity: 1
          }).bindTooltip(`<b>${pt.time} (Observed)</b><br/>Intensity: ${pt.intensity}<br/>Pressure: ${pt.mslp}`);
          group.addLayer(marker);
        }
      });
    }

    // B. CURRENT ANALYZED POSITION (Pulsing Marker)
    const currentCustomIcon = L.divIcon({
      className: 'cyclone-pulse-icon',
      html: `<div class="cyclone-center-pulse"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const currentMarker = L.marker([currentLat, currentLon], { icon: currentCustomIcon });
    currentMarker.bindTooltip(
      `<b>INVEST 91B / DEEP DEPRESSION</b><br/>Centroid: ${currentLat.toFixed(1)}°N, ${currentLon.toFixed(1)}°E<br/>Intensity: 28 kt | 1004 hPa<br/>24h Genesis Prob: 76% (GenesisNet)`,
      { direction: 'top' }
    );
    group.addLayer(currentMarker);

    // C. OFFICIAL FORECAST TRACK (Solid Blue Line with OFFICIAL Label)
    if (layers.officialForecast) {
      const officialForecastCoords = [
        [currentLat, currentLon],
        [15.8, 86.6], // +12h
        [16.8, 85.8], // +24h
        [18.0, 85.0], // +36h
        [19.2, 84.8]  // +48h Landfall near Gopalpur/Puri
      ];

      const officialLine = L.polyline(officialForecastCoords, {
        color: '#0284c7',
        weight: 3.5,
        opacity: 0.95
      });
      group.addLayer(officialLine);

      // Official Waypoint Markers
      const officialWaypoints = [
        { lat: 15.8, lon: 86.6, time: '+12h (04 Sep 00 UTC)', stage: 'Deep Depression (30 kt)' },
        { lat: 16.8, lon: 85.8, time: '+24h (04 Sep 12 UTC)', stage: 'Cyclonic Storm (40 kt)' },
        { lat: 18.0, lon: 85.0, time: '+36h (05 Sep 00 UTC)', stage: 'Cyclonic Storm (45 kt)' },
        { lat: 19.2, lon: 84.8, time: '+48h Landfall (05 Sep 12 UTC)', stage: 'Severe Cyclonic Storm (55 kt)' }
      ];

      officialWaypoints.forEach((wp) => {
        const wpMarker = L.circleMarker([wp.lat, wp.lon], {
          radius: 6,
          fillColor: '#0284c7',
          color: '#ffffff',
          weight: 2,
          fillOpacity: 1
        }).bindTooltip(`<b>IMD OFFICIAL FORECAST TRACK</b><br/>${wp.time}<br/>Stage: <strong>${wp.stage}</strong><br/>Authority: RSMC New Delhi`);
        group.addLayer(wpMarker);
      });
    }

    // D. EXPERIMENTAL AI PROJECTED TRACK (Dashed Cyan Line + Hollow Markers)
    if (layers.aiProjectedTrack && traj.estimated.length > 0) {
      const estCoords = [
        [currentLat, currentLon],
        ...traj.estimated.map((pt) => [pt.lat, pt.lon])
      ];

      const estLine = L.polyline(estCoords, {
        color: '#c084fc',
        weight: 2.2,
        dashArray: '6, 6',
        opacity: 0.9
      });
      group.addLayer(estLine);

      traj.estimated.forEach((pt) => {
        const estMarker = L.circleMarker([pt.lat, pt.lon], {
          radius: 6,
          fillColor: '#091122',
          color: '#c084fc',
          weight: 2,
          fillOpacity: 1
        }).bindTooltip(`<b>EXPERIMENTAL AI PROJECTED TRACK</b><br/>${pt.time}<br/>Genesis Prob: ${pt.prob}<br/>Est. Intensity: ${pt.intensity}<br/>Model: GenesisNet v0.1 (DEMO)`);
        group.addLayer(estMarker);
      });
    }
  }, [layers.observedTrack, layers.officialForecast, layers.aiProjectedTrack, frameData]);

  // 5. Render Critical Infrastructure (Hospitals, Shelters, Ports)
  useEffect(() => {
    if (!infraLayerGroupRef.current) return;
    const group = infraLayerGroupRef.current;
    group.clearLayers();

    if (!layers.criticalInfra) return;

    CRITICAL_INFRASTRUCTURE.forEach((inf) => {
      const isHospital = inf.type === 'Hospital';
      const isPort = inf.type === 'Port';
      const iconChar = isHospital ? '🏥' : isPort ? '⚓' : '🛡️';

      const infraIcon = L.divIcon({
        className: 'infra-div-icon',
        html: `<div class="infra-marker-pill" title="${inf.name}">${iconChar}</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const marker = L.marker([inf.lat, inf.lon], { icon: infraIcon }).bindTooltip(
        `<b>${inf.name}</b><br/>Type: ${inf.type} (${inf.district})<br/>Status: ${inf.status}`
      );
      group.addLayer(marker);
    });
  }, [layers.criticalInfra]);

  // 6. Render Citizen Distress Reports (Section 21 - Color Coded)
  useEffect(() => {
    if (!emergencyLayerGroupRef.current) return;
    const group = emergencyLayerGroupRef.current;
    group.clearLayers();

    if (!layers.emergencyMarkers || !emergencyRequests) return;

    emergencyRequests.forEach((req) => {
      // Color logic per section 21:
      // RED = Critical emergency
      // ORANGE = High priority
      // YELLOW = Awaiting verification
      // BLUE = Response team assigned / responding
      // GREEN = Resolved
      let markerColor = '#f59e0b'; // Yellow default
      if (req.status === 'Resolved') {
        markerColor = '#10b981'; // GREEN
      } else if (req.status === 'Responding' || req.status === 'Team Assigned') {
        markerColor = '#00e5ff'; // BLUE / CYAN
      } else if (req.confirmedPriority === 'CRITICAL' || (req.confirmedPriority === 'Pending Confirmation' && req.suggestedPriority === 'CRITICAL')) {
        markerColor = '#ef4444'; // RED
      } else if (req.confirmedPriority === 'HIGH' || req.suggestedPriority === 'HIGH') {
        markerColor = '#f97316'; // ORANGE
      } else if (req.verification === 'Pending Verification') {
        markerColor = '#eab308'; // YELLOW
      }

      const emergencyIcon = L.divIcon({
        className: 'distress-div-icon',
        html: `
          <div class="distress-pin-wrap" style="--pin-color: ${markerColor}">
            <div class="distress-pin-pulse"></div>
            <div class="distress-pin-core">!</div>
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      const marker = L.marker(req.coordinates, { icon: emergencyIcon });

      // Click opens detailed popup with action to select in EOC
      const popupHtml = `
        <div class="map-emergency-popup font-sans">
          <div class="popup-head">
            <span class="popup-id font-mono">${req.id}</span>
            <span class="popup-priority-badge" style="background:${markerColor}33;color:${markerColor};border:1px solid ${markerColor}">
              ${req.confirmedPriority || req.suggestedPriority}
            </span>
          </div>
          <div class="popup-type">${req.emergencyType}</div>
          <div class="popup-loc">${req.location} (${req.district})</div>
          <div class="popup-row"><span class="pk">People:</span> <span class="pv font-bold">${req.peopleReported} reported</span></div>
          <div class="popup-row"><span class="pk">Time:</span> <span class="pv font-mono">${req.timestamp}</span></div>
          <div class="popup-row"><span class="pk">Verification:</span> <span class="pv">${req.verification}</span></div>
          <div class="popup-row"><span class="pk">Assigned Team:</span> <span class="pv">${req.assignedTeam}</span></div>
          <div class="popup-row"><span class="pk">Status:</span> <span class="pv font-bold text-accent">${req.status}</span></div>
          <p class="popup-msg">"${req.message}"</p>
          <div class="popup-privacy-note">Citizen phone contact protected under EOC privacy protocol.</div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 300 });
      marker.on('click', () => {
        if (onSelectEmergency) {
          onSelectEmergency(req);
        }
      });

      group.addLayer(marker);
    });
  }, [layers.emergencyMarkers, emergencyRequests, onSelectEmergency]);

  return (
    <div className={`sci-card operational-map-card ${isFullscreen ? 'map-fullscreen' : ''}`}>
      {/* MAP HEADER & LAYER CONTROLLER */}
      <div className="sci-card-header map-card-header">
        <div className="sci-card-title">
          <Compass size={16} className="text-accent" />
          <span>Operational Situation Map</span>
          <span className="map-subtag font-mono">North Indian Ocean • Bay of Bengal</span>
        </div>

        <div className="map-header-controls">
          {/* Layer Menu Dropdown */}
          <div className="layer-menu-container">
            <button
              className={`sci-btn sci-btn-secondary sci-btn-xs ${showLayerMenu ? 'active' : ''}`}
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              title="Toggle Map Layers"
            >
              <Layers size={13} />
              <span>Layers</span>
            </button>

            {showLayerMenu && (
              <div className="layer-dropdown-panel">
                <div className="layer-section-title">CYCLONE TRACKS</div>
                <label className="layer-item">
                  <input
                    type="checkbox"
                    checked={layers.observedTrack}
                    onChange={(e) => setLayers({ ...layers, observedTrack: e.target.checked })}
                  />
                  <span>Observed Past Track</span>
                </label>
                <label className="layer-item">
                  <input
                    type="checkbox"
                    checked={layers.officialForecast}
                    onChange={(e) => setLayers({ ...layers, officialForecast: e.target.checked })}
                  />
                  <span className="text-blue">Official Forecast Track (IMD)</span>
                </label>
                <label className="layer-item">
                  <input
                    type="checkbox"
                    checked={layers.aiProjectedTrack}
                    onChange={(e) => setLayers({ ...layers, aiProjectedTrack: e.target.checked })}
                  />
                  <span className="text-purple">AI Projected Track (GenesisNet)</span>
                </label>

                <div className="layer-section-title">HAZARDS & EMERGENCIES</div>
                <label className="layer-item">
                  <input
                    type="checkbox"
                    checked={layers.emergencyMarkers}
                    onChange={(e) => setLayers({ ...layers, emergencyMarkers: e.target.checked })}
                  />
                  <span className="text-danger">Citizen Distress Reports ({emergencyRequests.length})</span>
                </label>
                <label className="layer-item">
                  <input
                    type="checkbox"
                    checked={layers.affectedDistricts}
                    onChange={(e) => setLayers({ ...layers, affectedDistricts: e.target.checked })}
                  />
                  <span>Potentially Affected Districts</span>
                </label>
                <label className="layer-item">
                  <input
                    type="checkbox"
                    checked={layers.criticalInfra}
                    onChange={(e) => setLayers({ ...layers, criticalInfra: e.target.checked })}
                  />
                  <span>Hospitals, Shelters, Ports</span>
                </label>

                <div className="layer-section-title">METEOROLOGICAL OVERLAYS</div>
                <select
                  className="gov-select layer-overlay-select"
                  value={layers.envOverlay}
                  onChange={(e) => setLayers({ ...layers, envOverlay: e.target.value })}
                >
                  <option value="none">No Environmental Overlay</option>
                  <option value="sst">Sea Surface Temperature (SST &gt; 29°C)</option>
                  <option value="mslp">Mean Sea Level Pressure Isobars</option>
                  <option value="shear">Vertical Wind Shear Corridor</option>
                  <option value="rainfall">Heavy Rainfall Hazard Swath</option>
                </select>

                <div className="layer-section-title">SATELLITE COVERAGE LAYER</div>
                <select
                  className="gov-select layer-overlay-select font-mono"
                  value={layers.satelliteSource}
                  onChange={(e) => setLayers({ ...layers, satelliteSource: e.target.value })}
                >
                  <option value="none">No Satellite Footprint</option>
                  <option value="insat3dr">INSAT-3DR (Operational — 74°E)</option>
                  <option value="insat3d">INSAT-3D (Standby Demo — 82°E)</option>
                  <option value="himawari" disabled>Himawari-9 (NOT CONNECTED)</option>
                  <option value="meteosat" disabled>Meteosat-9 (NOT CONNECTED)</option>
                  <option value="goes" disabled>GOES-16 (NOT CONNECTED)</option>
                </select>
              </div>
            )}
          </div>

          {/* Fullscreen Toggle */}
          <button
            className="sci-btn sci-btn-icon sci-btn-xs"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Map Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* MAP CONTAINER */}
      <div className="map-canvas-container" ref={mapContainerRef}></div>

      {/* MAP LEGEND OVERLAY BAR */}
      <div className="map-legend-bar">
        <div className="legend-group">
          <span className="legend-title">TRACKS:</span>
          <div className="legend-item"><span className="legend-line obs-line"></span> Observed</div>
          <div className="legend-item"><span className="legend-line off-line"></span> Official IMD</div>
          <div className="legend-item"><span className="legend-line ai-line"></span> AI GenesisNet</div>
        </div>
        <div className="legend-group">
          <span className="legend-title">EMERGENCY:</span>
          <div className="legend-item"><span className="legend-dot dot-crit"></span> Critical</div>
          <div className="legend-item"><span className="legend-dot dot-high"></span> High</div>
          <div className="legend-item"><span className="legend-dot dot-pend"></span> Pending</div>
          <div className="legend-item"><span className="legend-dot dot-resp"></span> Responding</div>
          <div className="legend-item"><span className="legend-dot dot-res"></span> Resolved</div>
        </div>
      </div>

      <style>{`
        .operational-map-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 480px;
          background: #08101e;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .map-fullscreen {
          position: fixed !important;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2000;
          height: 100vh !important;
          border-radius: 0;
        }
        .map-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: rgba(13, 23, 42, 0.85);
          border-bottom: 1px solid var(--bg-card-border);
        }
        .map-subtag {
          font-size: 10px;
          color: var(--text-muted);
          margin-left: 8px;
        }
        .map-header-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .map-canvas-container {
          flex: 1;
          width: 100%;
          height: 100%;
          background: #070e1b;
        }
        .layer-menu-container {
          position: relative;
        }
        .layer-dropdown-panel {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 6px;
          width: 260px;
          background: #0c1629;
          border: 1px solid rgba(0, 229, 255, 0.3);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
          z-index: 1500;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .layer-section-title {
          font-size: 9px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          margin-top: 4px;
          padding-bottom: 2px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        }
        .layer-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .layer-item:hover {
          color: #ffffff;
        }
        .layer-overlay-select {
          width: 100%;
          background: #111d35;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 4px;
          font-size: 11px;
          padding: 4px;
        }
        .map-legend-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(9, 17, 34, 0.9);
          border-top: 1px solid var(--bg-card-border);
          padding: 5px 12px;
          font-size: 10px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .legend-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .legend-title {
          font-weight: 700;
          color: var(--text-muted);
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-secondary);
        }
        .legend-line {
          width: 16px;
          height: 3px;
          border-radius: 2px;
          display: inline-block;
        }
        .obs-line { background: #38bdf8; }
        .off-line { background: #0284c7; }
        .ai-line { background: #c084fc; border-bottom: 1px dashed #ffffff; }
        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        .dot-crit { background: #ef4444; }
        .dot-high { background: #f97316; }
        .dot-pend { background: #eab308; }
        .dot-resp { background: #00e5ff; }
        .dot-res { background: #10b981; }

        /* Custom Leaflet Marker Styles */
        .cyclone-center-pulse {
          width: 18px;
          height: 18px;
          background: #ef4444;
          border: 2px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 12px #ef4444;
          animation: stormPulse 1.4s infinite;
        }
        @keyframes stormPulse {
          0% { transform: scale(0.9); box-shadow: 0 0 6px #ef4444; }
          50% { transform: scale(1.2); box-shadow: 0 0 18px #ef4444; }
          100% { transform: scale(0.9); box-shadow: 0 0 6px #ef4444; }
        }
        .distress-pin-wrap {
          position: relative;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .distress-pin-pulse {
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--pin-color);
          opacity: 0.35;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .distress-pin-core {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--pin-color);
          border: 2px solid #ffffff;
          color: #ffffff;
          font-size: 8px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
          z-index: 2;
        }
        @keyframes ping {
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }
        .infra-marker-pill {
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
        }

        /* Popup Styles */
        .map-emergency-popup {
          font-size: 11px;
          color: #f1f5f9;
          line-height: 1.4;
          padding: 2px;
        }
        .popup-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.2);
          padding-bottom: 4px;
          margin-bottom: 6px;
        }
        .popup-id {
          font-weight: 700;
          color: var(--accent-cyan);
        }
        .popup-priority-badge {
          font-size: 9px;
          font-weight: 800;
          padding: 1px 5px;
          border-radius: 3px;
        }
        .popup-type {
          font-weight: 700;
          font-size: 12px;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .popup-loc {
          color: var(--text-secondary);
          margin-bottom: 6px;
        }
        .popup-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2px;
        }
        .popup-row .pk {
          color: var(--text-muted);
        }
        .popup-msg {
          background: rgba(0, 0, 0, 0.25);
          border-left: 2px solid var(--accent-cyan);
          padding: 4px 6px;
          font-style: italic;
          margin: 6px 0;
          color: #cbd5e1;
        }
        .popup-privacy-note {
          font-size: 9px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

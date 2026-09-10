import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Compass,
  Sparkles,
  Maximize2,
  Minimize2,
  Navigation
} from 'lucide-react';
import { ACTIVE_SYSTEM_TRAJECTORY, DISTRICT_IMPACT_DATA } from '../../services/mockData';

export default function CitizenCycloneMap({
  userLocation,
  selectedDistrict = 'Puri',
  selectedState = 'Odisha'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef({
    cycloneTrack: null,
    officialTrack: null,
    aiTrack: null,
    userMarker: null,
    districts: null,
    shelters: null
  });

  const [showAiTrack, setShowAiTrack] = useState(true);
  const [showShelters, setShowShelters] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Bay of Bengal / East Coast
    const map = L.map(mapContainerRef.current, {
      center: [17.5, 85.5],
      zoom: 6,
      zoomControl: false,
      attributionControl: false
    });

    // Dark Basemap (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Layer groups
    layersRef.current.districts = L.layerGroup().addTo(map);
    layersRef.current.cycloneTrack = L.layerGroup().addTo(map);
    layersRef.current.officialTrack = L.layerGroup().addTo(map);
    layersRef.current.aiTrack = L.layerGroup().addTo(map);
    layersRef.current.shelters = L.layerGroup().addTo(map);
    layersRef.current.userMarker = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update User Location Marker
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current.userMarker) return;
    const group = layersRef.current.userMarker;
    group.clearLayers();

    const userCoords = userLocation?.coords || [19.81, 85.83]; // Default Coastal Puri
    const locName = userLocation?.name || `${selectedDistrict}, ${selectedState}`;

    const userIcon = L.divIcon({
      className: 'cz-user-loc-div',
      html: `
        <div class="cz-user-pin-pulse"></div>
        <div class="cz-user-pin-core"></div>
      `,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });

    const marker = L.marker(userCoords, { icon: userIcon, zIndexOffset: 1000 });
    marker.bindTooltip(`
      <div style="font-family: sans-serif; padding: 2px 4px;">
        <strong style="color: #10b981;">YOU ARE HERE</strong><br/>
        <span>${locName}</span>
      </div>
    `, { permanent: true, direction: 'top', offset: [0, -10] });

    group.addLayer(marker);
  }, [userLocation, selectedDistrict, selectedState]);

  // Render Affected Districts
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current.districts) return;
    const group = layersRef.current.districts;
    group.clearLayers();

    DISTRICT_IMPACT_DATA.forEach((dist) => {
      if (!dist.coordinates) return;
      const isCritical = dist.overallRisk === 'CRITICAL';
      const color = isCritical ? '#ef4444' : '#f59e0b';

      const circle = L.circle(dist.coordinates, {
        radius: isCritical ? 24000 : 18000,
        color,
        weight: 1.5,
        fillColor: color,
        fillOpacity: 0.12
      }).bindTooltip(`
        <strong>${dist.district} (${dist.state})</strong><br/>
        Local Risk: <span style="color:${color};font-weight:bold">${dist.overallRisk}</span><br/>
        Wind: ${dist.windRisk}
      `);

      group.addLayer(circle);
    });
  }, []);

  // Render Observed Track & Disturbance Position
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current.cycloneTrack) return;
    const group = layersRef.current.cycloneTrack;
    group.clearLayers();

    const traj = ACTIVE_SYSTEM_TRAJECTORY;
    if (traj?.observed?.length > 0) {
      const coords = traj.observed.map((p) => [p.lat, p.lon]);
      const obsLine = L.polyline(coords, {
        color: '#38bdf8',
        weight: 3,
        opacity: 0.95
      });
      group.addLayer(obsLine);

      // Past points
      traj.observed.forEach((p, idx) => {
        const isCurrent = idx === traj.observed.length - 1;
        if (!isCurrent) {
          const ptMarker = L.circleMarker([p.lat, p.lon], {
            radius: 4,
            fillColor: '#38bdf8',
            color: '#070d18',
            weight: 2,
            fillOpacity: 1
          }).bindTooltip(`<b>${p.time}</b><br/>Observed: ${p.intensity}`);
          group.addLayer(ptMarker);
        }
      });

      // Current Disturbance Icon
      const currentPt = traj.observed[traj.observed.length - 1];
      const cycloneIcon = L.divIcon({
        className: 'cz-cyclone-center-div',
        html: `
          <div class="cz-cyclone-ring-pulse"></div>
          <div class="cz-cyclone-symbol">🌀</div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const currentMarker = L.marker([currentPt.lat, currentPt.lon], { icon: cycloneIcon, zIndexOffset: 999 });
      currentMarker.bindTooltip(`
        <div style="font-family: sans-serif; padding: 4px;">
          <strong style="color: #ffffff;">CYCLONE / DISTURBANCE BOB 03</strong><br/>
          <span style="color: #38bdf8;">Current Position: ${currentPt.lat}°N, ${currentPt.lon}°E</span><br/>
          <span>Intensity: ${currentPt.intensity} | MSLP: ${currentPt.mslp}</span><br/>
          <span style="font-size: 10px; color: #f59e0b;">DEMO DATA</span>
        </div>
      `, { permanent: false, direction: 'top', offset: [0, -12] });

      group.addLayer(currentMarker);
    }
  }, []);

  // Render Official Forecast Track (Solid Dark Blue)
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current.officialTrack) return;
    const group = layersRef.current.officialTrack;
    group.clearLayers();

    // Simulated Official Forecast Track from RSMC Bulletin
    const officialCoords = [
      [14.8, 87.3],
      [15.8, 86.6],
      [16.9, 85.9],
      [18.1, 85.1],
      [19.4, 84.9] // Landfall near Gopalpur/Puri
    ];

    const officialLine = L.polyline(officialCoords, {
      color: '#0284c7',
      weight: 3.5,
      opacity: 0.95
    });
    group.addLayer(officialLine);

    officialCoords.forEach((pt, idx) => {
      if (idx === 0) return;
      const marker = L.circleMarker(pt, {
        radius: 5,
        fillColor: '#0284c7',
        color: '#ffffff',
        weight: 1.5,
        fillOpacity: 1
      }).bindTooltip(`<b>Official Forecast Track (Demo)</b><br/>Lead Time: +${idx * 12}h<br/>Source: IMD / RSMC Advisory Feed`);
      group.addLayer(marker);
    });
  }, []);

  // Render Experimental AI Projection (Dashed Purple)
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current.aiTrack) return;
    const group = layersRef.current.aiTrack;
    group.clearLayers();

    if (!showAiTrack) return;

    const traj = ACTIVE_SYSTEM_TRAJECTORY;
    if (traj?.estimated?.length > 0) {
      const currentPt = traj.observed[traj.observed.length - 1];
      const aiCoords = [[currentPt.lat, currentPt.lon], ...traj.estimated.map((p) => [p.lat, p.lon])];

      const aiLine = L.polyline(aiCoords, {
        color: '#a855f7',
        weight: 2.5,
        dashArray: '6, 6',
        opacity: 0.85
      });
      group.addLayer(aiLine);

      traj.estimated.forEach((p) => {
        const marker = L.circleMarker([p.lat, p.lon], {
          radius: 4.5,
          fillColor: '#a855f7',
          color: '#ffffff',
          weight: 1.5,
          fillOpacity: 1
        }).bindTooltip(`
          <strong style="color:#a855f7;">EXPERIMENTAL AI PROJECTION</strong><br/>
          Time: ${p.time}<br/>
          Formation Prob: ${p.prob}<br/>
          <em style="font-size:10px;color:#94a3b8;">Not an official forecast</em>
        `);
        group.addLayer(marker);
      });
    }
  }, [showAiTrack]);

  // Render Shelters & Safe Locations (Marked Demo Location)
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current.shelters) return;
    const group = layersRef.current.shelters;
    group.clearLayers();

    if (!showShelters) return;

    const demoShelters = [
      { name: 'Brahmagiri Multi-Purpose Cyclone Shelter', coords: [19.80, 85.67], cap: '1,200 persons' },
      { name: 'Astaranga Coastal Relief Shelter', coords: [19.98, 86.27], cap: '850 persons' },
      { name: 'Gopalpur Coastal Shelter #03', coords: [19.26, 84.91], cap: '700 persons' }
    ];

    demoShelters.forEach((sh) => {
      const shelterIcon = L.divIcon({
        className: 'cz-shelter-div',
        html: `<div class="cz-shelter-box">🏠</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker(sh.coords, { icon: shelterIcon });
      marker.bindTooltip(`
        <strong>${sh.name}</strong><br/>
        Capacity: ${sh.cap}<br/>
        <span style="color:#f59e0b;font-size:10px;font-weight:bold;">DEMO LOCATION — NOT FOR REAL USE</span>
      `);
      group.addLayer(marker);
    });
  }, [showShelters]);

  const handleResetView = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView([17.5, 85.5], 6, { animate: true });
  };

  const handleFocusMe = () => {
    if (!mapInstanceRef.current) return;
    const coords = userLocation?.coords || [19.81, 85.83];
    mapInstanceRef.current.setView(coords, 9, { animate: true });
  };

  return (
    <section className={`cz-map-card ${isFullscreen ? 'fullscreen-mode' : ''}`} aria-label="Citizen Cyclone Map">
      {/* Map Control Bar */}
      <div className="cz-map-bar">
        <div className="map-title-row">
          <Compass size={16} className="text-accent" />
          <h2 className="map-title">CITIZEN CYCLONE SITUATION MAP</h2>
          <span className="map-badge font-mono">LIVE POSITION & TRACKS</span>
        </div>

        <div className="map-tools">
          <button
            type="button"
            className={`map-tool-btn ${showAiTrack ? 'active' : ''}`}
            onClick={() => setShowAiTrack(!showAiTrack)}
            title="Toggle Experimental AI Track"
          >
            <Sparkles size={13} />
            <span>AI Projection</span>
          </button>

          <button
            type="button"
            className={`map-tool-btn ${showShelters ? 'active' : ''}`}
            onClick={() => setShowShelters(!showShelters)}
            title="Toggle Nearby Shelters"
          >
            <span>🏠 Shelters</span>
          </button>

          <button
            type="button"
            className="map-tool-btn"
            onClick={handleFocusMe}
            title="Center map on my location"
          >
            <Navigation size={13} className="text-success" />
            <span>My Location</span>
          </button>

          <button
            type="button"
            className="map-tool-btn"
            onClick={handleResetView}
            title="Reset overview view"
          >
            <span>Reset View</span>
          </button>

          <button
            type="button"
            className="map-tool-btn-icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Map Leaflet Container */}
      <div className="map-render-wrapper">
        <div ref={mapContainerRef} className="cz-leaflet-canvas" />

        {/* Legend Box per Section 9 */}
        <div className="cz-map-legend" role="complementary" aria-label="Map Legend">
          <div className="legend-title">MAP LEGEND</div>
          <div className="legend-item">
            <span className="leg-dot-user">●</span>
            <span>You Are Here</span>
          </div>
          <div className="legend-item">
            <span className="leg-sym-cyclone">🌀</span>
            <span>Current Disturbance (BOB 03)</span>
          </div>
          <div className="legend-item">
            <span className="leg-line-obs">━━━━</span>
            <span>Observed Track</span>
          </div>
          <div className="legend-item">
            <span className="leg-line-official">━━━━</span>
            <span>Official Forecast (IMD Demo)</span>
          </div>
          <div className="legend-item">
            <span className="leg-line-ai">- - - -</span>
            <span>Experimental AI Track</span>
          </div>
          <div className="legend-item">
            <span className="leg-sym-shelter">🏠</span>
            <span>Verified Shelter (Demo)</span>
          </div>
        </div>
      </div>

      <style>{`
        .cz-map-card {
          background: #091326;
          border: 1px solid var(--bg-card-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .cz-map-card.fullscreen-mode {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
          border-radius: 0;
        }
        .cz-map-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: #0d1a33;
          border-bottom: 1px solid var(--bg-card-border);
          flex-wrap: wrap;
          gap: 8px;
        }
        .map-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .map-title {
          font-size: 14px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.03em;
        }
        .map-badge {
          font-size: 10px;
          background: rgba(0, 229, 255, 0.1);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 229, 255, 0.25);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
        .map-tools {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .map-tool-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(15, 25, 45, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-secondary);
          padding: 5px 10px;
          border-radius: var(--radius-sm);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .map-tool-btn:hover {
          color: #ffffff;
          border-color: var(--accent-cyan);
        }
        .map-tool-btn.active {
          background: rgba(168, 85, 247, 0.15);
          border-color: #a855f7;
          color: #d8b4fe;
        }
        .map-tool-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 25, 45, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-secondary);
          padding: 6px;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }
        .map-render-wrapper {
          position: relative;
          height: 480px;
          width: 100%;
        }
        .fullscreen-mode .map-render-wrapper {
          height: calc(100vh - 48px);
        }
        .cz-leaflet-canvas {
          height: 100%;
          width: 100%;
          background: #04080f;
        }
        /* Custom DivIcon Animations */
        .cz-user-loc-div {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cz-user-pin-core {
          width: 12px;
          height: 12px;
          background: #10b981;
          border: 2px solid #ffffff;
          border-radius: 50%;
          z-index: 2;
        }
        .cz-user-pin-pulse {
          position: absolute;
          width: 26px;
          height: 26px;
          background: rgba(16, 185, 129, 0.4);
          border-radius: 50%;
          animation: cz-user-pulse 1.8s infinite;
          z-index: 1;
        }
        @keyframes cz-user-pulse {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .cz-cyclone-center-div {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cz-cyclone-symbol {
          font-size: 24px;
          animation: cz-spin 4s linear infinite;
        }
        @keyframes cz-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .cz-cyclone-ring-pulse {
          position: absolute;
          width: 38px;
          height: 38px;
          border: 2px solid rgba(0, 229, 255, 0.6);
          border-radius: 50%;
          animation: cz-ring 2s ease-out infinite;
        }
        @keyframes cz-ring {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .cz-shelter-box {
          font-size: 16px;
          background: #0f192d;
          border: 1px solid rgba(0, 229, 255, 0.4);
          border-radius: 4px;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Legend */
        .cz-map-legend {
          position: absolute;
          bottom: 16px;
          left: 16px;
          z-index: 500;
          background: rgba(9, 17, 34, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(148, 163, 184, 0.25);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
          max-width: 250px;
        }
        .legend-title {
          font-size: 10px;
          font-weight: 800;
          color: var(--accent-cyan);
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: var(--text-primary);
        }
        .leg-dot-user {
          color: #10b981;
          font-size: 15px;
        }
        .leg-sym-cyclone {
          font-size: 13px;
        }
        .leg-line-obs {
          color: #38bdf8;
          font-weight: 900;
          letter-spacing: -1px;
        }
        .leg-line-official {
          color: #0284c7;
          font-weight: 900;
          letter-spacing: -1px;
        }
        .leg-line-ai {
          color: #a855f7;
          font-weight: 900;
          letter-spacing: 1px;
        }
        .leg-sym-shelter {
          font-size: 12px;
        }
        @media (max-width: 640px) {
          .map-render-wrapper {
            height: 380px;
          }
          .cz-map-legend {
            bottom: 8px;
            left: 8px;
            padding: 8px 10px;
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
}

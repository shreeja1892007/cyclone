/**
 * CycloVision AI — Centralized Scientific Mock Data Store
 * Adheres strictly to scientific integrity rules:
 * - All data labeled as Research Prototype / Demo Data / Experimental Output
 * - Metrics awaiting ML evaluation marked with null / N/A
 * - No operational or emergency warning terminology
 */

export const REGIONS = [
  { id: 'nio', name: 'North Indian Ocean', center: [14.5, 82.0], zoom: 5 },
  { id: 'bob', name: 'Bay of Bengal', center: [14.8, 87.5], zoom: 6 },
  { id: 'as', name: 'Arabian Sea', center: [15.2, 66.8], zoom: 6 },
];

export const TIMESTAMPS = [
  { id: 't0', label: '02 Sep 00:00 UTC', iso: '2026-09-02T00:00:00Z', relHours: -36, prob: 14 },
  { id: 't1', label: '02 Sep 06:00 UTC', iso: '2026-09-02T06:00:00Z', relHours: -30, prob: 21 },
  { id: 't2', label: '02 Sep 12:00 UTC', iso: '2026-09-02T12:00:00Z', relHours: -24, prob: 30 },
  { id: 't3', label: '02 Sep 18:00 UTC', iso: '2026-09-02T18:00:00Z', relHours: -18, prob: 42 },
  { id: 't4', label: '03 Sep 00:00 UTC', iso: '2026-09-03T00:00:00Z', relHours: -12, prob: 55 },
  { id: 't5', label: '03 Sep 06:00 UTC', iso: '2026-09-03T06:00:00Z', relHours: -6,  prob: 68 },
  { id: 't6', label: '03 Sep 12:00 UTC', iso: '2026-09-03T12:00:00Z', relHours: 0,   prob: 76, isCurrent: true },
];

// Snapshot data keyed by timestamp ID
export const OBSERVATION_FRAMES = {
  t0: {
    systemId: 'DEMO-01',
    systemName: 'Tropical Disturbance (Invest 91B)',
    timestampIso: '2026-09-02T00:00:00Z',
    displayTime: '02 Sep 2026 00:00 UTC',
    latitude: 12.2,
    longitude: 89.8,
    detection: { detected: true, confidence: 62, statusLabel: 'Weak Low-Level Vorticity' },
    classification: { pattern: 'Curved Band (Incipient)', confidence: 54 },
    prediction: { prob12h: 18, prob24h: 24, prob48h: 40, trend: 'Developing slowly' },
    environment: {
      sst: { value: 28.9, unit: '°C', trend: '+0.1 °C / 24h', status: 'available' },
      mslp: { value: 1008, unit: 'hPa', trend: 'Steady', status: 'available' },
      rh500: { value: 66, unit: '%', level: '500 hPa', trend: 'Increasing', status: 'available' },
      vorticity850: { value: 4.8, exponent: '10⁻⁵ s⁻¹', trend: 'Gradual increase', status: 'available' },
      windShear: { value: 18, unit: 'm/s', interpretation: 'Moderate-High', status: 'available' }
    },
    dataQuality: {
      satelliteIR: 'available',
      waterVapour: 'available',
      sst: 'available',
      wind850: 'available',
      wind200: 'missing',
      radar: 'not_used',
      completeness: '88% — Demo'
    }
  },
  t1: {
    systemId: 'DEMO-01',
    systemName: 'Tropical Disturbance (Invest 91B)',
    timestampIso: '2026-09-02T06:00:00Z',
    displayTime: '02 Sep 2026 06:00 UTC',
    latitude: 12.6,
    longitude: 89.2,
    detection: { detected: true, confidence: 71, statusLabel: 'Organizing Convective Cluster' },
    classification: { pattern: 'Curved Band', confidence: 64 },
    prediction: { prob12h: 24, prob24h: 30, prob48h: 48, trend: 'Increasing' },
    environment: {
      sst: { value: 29.0, unit: '°C', trend: '+0.2 °C / 24h', status: 'available' },
      mslp: { value: 1007, unit: 'hPa', trend: 'Slow fall', status: 'available' },
      rh500: { value: 68, unit: '%', level: '500 hPa', trend: 'Increasing', status: 'available' },
      vorticity850: { value: 5.4, exponent: '10⁻⁵ s⁻¹', trend: 'Increasing', status: 'available' },
      windShear: { value: 16, unit: 'm/s', interpretation: 'Moderate', status: 'available' }
    },
    dataQuality: {
      satelliteIR: 'available',
      waterVapour: 'available',
      sst: 'available',
      wind850: 'available',
      wind200: 'delayed',
      radar: 'not_used',
      completeness: '90% — Demo'
    }
  },
  t2: {
    systemId: 'DEMO-01',
    systemName: 'Tropical Disturbance (Invest 91B)',
    timestampIso: '2026-09-02T12:00:00Z',
    displayTime: '02 Sep 2026 12:00 UTC',
    latitude: 13.1,
    longitude: 88.7,
    detection: { detected: true, confidence: 78, statusLabel: 'Tropical Disturbance Detected' },
    classification: { pattern: 'Curved Band', confidence: 72 },
    prediction: { prob12h: 35, prob24h: 42, prob48h: 60, trend: 'Increasing' },
    environment: {
      sst: { value: 29.1, unit: '°C', trend: '+0.3 °C / 24h', status: 'available' },
      mslp: { value: 1006, unit: 'hPa', trend: 'Falling', status: 'available' },
      rh500: { value: 70, unit: '%', level: '500 hPa', trend: 'Increasing', status: 'available' },
      vorticity850: { value: 6.2, exponent: '10⁻⁵ s⁻¹', trend: 'Increasing', status: 'available' },
      windShear: { value: 15, unit: 'm/s', interpretation: 'Moderate', status: 'available' }
    },
    dataQuality: {
      satelliteIR: 'available',
      waterVapour: 'available',
      sst: 'available',
      wind850: 'available',
      wind200: 'missing',
      radar: 'not_used',
      completeness: '90% — Demo'
    }
  },
  t3: {
    systemId: 'DEMO-01',
    systemName: 'Tropical Disturbance (Invest 91B)',
    timestampIso: '2026-09-02T18:00:00Z',
    displayTime: '02 Sep 2026 18:00 UTC',
    latitude: 13.7,
    longitude: 88.2,
    detection: { detected: true, confidence: 85, statusLabel: 'Tropical Disturbance Detected' },
    classification: { pattern: 'Curved Band', confidence: 79 },
    prediction: { prob12h: 46, prob24h: 55, prob48h: 70, trend: 'Increasing' },
    environment: {
      sst: { value: 29.2, unit: '°C', trend: '+0.3 °C / 24h', status: 'available' },
      mslp: { value: 1005, unit: 'hPa', trend: 'Falling', status: 'available' },
      rh500: { value: 72, unit: '%', level: '500 hPa', trend: 'Increasing', status: 'available' },
      vorticity850: { value: 7.1, exponent: '10⁻⁵ s⁻¹', trend: 'Increasing', status: 'available' },
      windShear: { value: 14, unit: 'm/s', interpretation: 'Moderate', status: 'available' }
    },
    dataQuality: {
      satelliteIR: 'available',
      waterVapour: 'available',
      sst: 'available',
      wind850: 'available',
      wind200: 'missing',
      radar: 'not_used',
      completeness: '90% — Demo'
    }
  },
  t4: {
    systemId: 'DEMO-01',
    systemName: 'Tropical Disturbance (Invest 91B)',
    timestampIso: '2026-09-03T00:00:00Z',
    displayTime: '03 Sep 2026 00:00 UTC',
    latitude: 14.1,
    longitude: 87.8,
    detection: { detected: true, confidence: 89, statusLabel: 'Tropical Disturbance Detected' },
    classification: { pattern: 'Curved Band', confidence: 84 },
    prediction: { prob12h: 55, prob24h: 68, prob48h: 78, trend: 'Increasing' },
    environment: {
      sst: { value: 29.3, unit: '°C', trend: '+0.4 °C / 24h', status: 'available' },
      mslp: { value: 1005, unit: 'hPa', trend: 'Falling', status: 'available' },
      rh500: { value: 73, unit: '%', level: '500 hPa', trend: 'Increasing', status: 'available' },
      vorticity850: { value: 7.7, exponent: '10⁻⁵ s⁻¹', trend: 'Increasing', status: 'available' },
      windShear: { value: 13, unit: 'm/s', interpretation: 'Moderate', status: 'available' }
    },
    dataQuality: {
      satelliteIR: 'available',
      waterVapour: 'available',
      sst: 'available',
      wind850: 'available',
      wind200: 'interpolated',
      radar: 'not_used',
      completeness: '92% — Demo'
    }
  },
  t5: {
    systemId: 'DEMO-01',
    systemName: 'Tropical Disturbance (Invest 91B)',
    timestampIso: '2026-09-03T06:00:00Z',
    displayTime: '03 Sep 2026 06:00 UTC',
    latitude: 14.5,
    longitude: 87.5,
    detection: { detected: true, confidence: 92, statusLabel: 'Tropical Disturbance Detected' },
    classification: { pattern: 'Curved Band', confidence: 86 },
    prediction: { prob12h: 58, prob24h: 72, prob48h: 81, trend: 'Increasing' },
    environment: {
      sst: { value: 29.3, unit: '°C', trend: '+0.4 °C / 24h', status: 'available' },
      mslp: { value: 1004, unit: 'hPa', trend: 'Falling', status: 'available' },
      rh500: { value: 74, unit: '%', level: '500 hPa', trend: 'High Mid-Level Moisture', status: 'available' },
      vorticity850: { value: 8.0, exponent: '10⁻⁵ s⁻¹', trend: 'Increasing', status: 'available' },
      windShear: { value: 12, unit: 'm/s', interpretation: 'Moderate', status: 'available' }
    },
    dataQuality: {
      satelliteIR: 'available',
      waterVapour: 'available',
      sst: 'available',
      wind850: 'available',
      wind200: 'missing',
      radar: 'not_used',
      completeness: '92% — Demo'
    }
  },
  t6: {
    systemId: 'DEMO-01',
    systemName: 'Tropical Disturbance (Invest 91B)',
    timestampIso: '2026-09-03T12:00:00Z',
    displayTime: '03 Sep 2026 12:00 UTC',
    latitude: 14.8,
    longitude: 87.3,
    detection: { detected: true, confidence: 94, statusLabel: 'Tropical Disturbance Detected' },
    classification: { pattern: 'Curved Band', confidence: 88 },
    prediction: { prob12h: 61, prob24h: 76, prob48h: 84, trend: 'Increasing' },
    environment: {
      sst: { value: 29.3, unit: '°C', trend: '+0.4 °C / 24h', status: 'available' },
      mslp: { value: 1004, unit: 'hPa', trend: 'Falling', status: 'available' },
      rh500: { value: 74, unit: '%', level: '500 hPa', trend: 'High Mid-Level Moisture', status: 'available' },
      vorticity850: { value: 8.3, exponent: '10⁻⁵ s⁻¹', trend: 'Increasing', status: 'available' },
      windShear: { value: 12, unit: 'm/s', interpretation: 'Moderate', status: 'available' }
    },
    dataQuality: {
      satelliteIR: 'available',
      waterVapour: 'available',
      sst: 'available',
      wind850: 'available',
      wind200: 'missing',
      radar: 'not_used',
      completeness: '92% — Demo'
    }
  }
};

// Trajectory data for the active system: past observed positions + AI estimated path
export const ACTIVE_SYSTEM_TRAJECTORY = {
  systemId: 'DEMO-01',
  basin: 'Bay of Bengal',
  observed: [
    { time: '02 Sep 00 UTC', lat: 12.2, lon: 89.8, intensity: '15 kt', mslp: '1008 hPa', status: 'Observed' },
    { time: '02 Sep 06 UTC', lat: 12.6, lon: 89.2, intensity: '18 kt', mslp: '1007 hPa', status: 'Observed' },
    { time: '02 Sep 12 UTC', lat: 13.1, lon: 88.7, intensity: '20 kt', mslp: '1006 hPa', status: 'Observed' },
    { time: '02 Sep 18 UTC', lat: 13.7, lon: 88.2, intensity: '22 kt', mslp: '1005 hPa', status: 'Observed' },
    { time: '03 Sep 00 UTC', lat: 14.1, lon: 87.8, intensity: '25 kt', mslp: '1005 hPa', status: 'Observed' },
    { time: '03 Sep 06 UTC', lat: 14.5, lon: 87.5, intensity: '25 kt', mslp: '1004 hPa', status: 'Observed' },
    { time: '03 Sep 12 UTC', lat: 14.8, lon: 87.3, intensity: '28 kt', mslp: '1004 hPa', status: 'Current Analyzed' },
  ],
  estimated: [
    { time: '+12h (04 Sep 00 UTC)', lat: 15.6, lon: 86.8, intensity: '32 kt', prob: '61%', status: 'AI Estimated Track' },
    { time: '+24h (04 Sep 12 UTC)', lat: 16.5, lon: 86.1, intensity: '38 kt', prob: '76%', status: 'AI Estimated Track' },
    { time: '+36h (05 Sep 00 UTC)', lat: 17.6, lon: 85.3, intensity: '45 kt', prob: '80%', status: 'AI Estimated Track' },
    { time: '+48h (05 Sep 12 UTC)', lat: 18.8, lon: 84.6, intensity: '52 kt', prob: '84%', status: 'AI Estimated Track' }
  ]
};

// Model Architecture & Validation Specs
export const MODEL_SPECS = {
  name: 'GenesisNet v0.1',
  task: 'Cyclone Genesis Prediction',
  status: 'Experimental',
  build: 'Research Prototype',
  inputWindowHours: 24,
  predictionHorizonHours: 24,
  region: 'Central Bay of Bengal',
  architecture: 'Spatio-Temporal ConvLSTM + Multi-Modal Cross-Attention Fusion',
  targetLeadTimes: ['12 h', '24 h', '48 h'],
  validation: {
    precision: null,
    recall: null,
    f1: null,
    testEvents: null,
    validationPeriod: null,
    datasetSplitStrategy: null,
    statusBadge: 'Awaiting ML Evaluation'
  }
};

// Roles Definition
export const ROLES_DEFINITION = [
  { id: 'command', label: 'Command Overview', description: 'Unified multi-agency executive situational awareness' },
  { id: 'met-officer', label: 'Meteorological Officer', description: 'Scientific monitoring, satellite observations, AI analysis & genesis models' },
  { id: 'disaster-officer', label: 'Disaster Management Officer', description: 'State & national disaster preparedness, hazard zones & resource allocation' },
  { id: 'district-admin', label: 'District Administration', description: 'Local district vulnerability, coastal shelters, evacuation & ground coordination' },
  { id: 'eoc', label: 'Emergency Operations Centre', description: 'Real-time incident response, citizen distress management & team deployment' }
];

// Basins, States, and Districts
export const BASINS = [
  { id: 'bob', name: 'Bay of Bengal' },
  { id: 'as', name: 'Arabian Sea' },
  { id: 'nio', name: 'North Indian Ocean (All)' }
];

export const STATES_DISTRICTS = [
  {
    state: 'Odisha',
    districts: ['Puri', 'Ganjam', 'Jagatsinghpur', 'Kendrapara', 'Bhadrak', 'Balasore', 'Khordha', 'Cuttack']
  },
  {
    state: 'Andhra Pradesh',
    districts: ['Srikakulam', 'Vizianagaram', 'Visakhapatnam', 'Anakapalli', 'Kakinada', 'East Godavari', 'Bapatla', 'Nellore']
  },
  {
    state: 'West Bengal',
    districts: ['South 24 Parganas', 'East Medinipur', 'North 24 Parganas', 'Howrah', 'Kolkata']
  },
  {
    state: 'Tamil Nadu',
    districts: ['Chennai', 'Kanchipuram', 'Tiruvallur', 'Cuddalore', 'Nagapattinam']
  }
];

// District / Coastal Impact Assessment Dataset
export const DISTRICT_IMPACT_DATA = [
  {
    id: 'dist-puri',
    district: 'Puri',
    state: 'Odisha',
    overallRisk: 'CRITICAL',
    windRisk: 'Severe (90-110 km/h)',
    rainfallRisk: 'Extremely Heavy (>200 mm)',
    coastalRisk: 'Severe Surge (1.5-2.5m)',
    officialWarning: 'Red Message (IMD)',
    dataStatus: 'Available (Demo)',
    coordinates: [19.81, 85.83],
    affectedAreaSqKm: 3479,
    populationExposure: 'N/A — Operational Census API Not Connected',
    shelterStatus: 'Data source not connected',
    hospitalStatus: 'Data source not connected',
    evacuationStatus: 'N/A — Government Source Required',
    emergencyTeams: 'N/A — EOC Direct Dispatch Only',
    officialWarnings: 'IMD Red Warning: Storm surge inundation expected in low-lying coastal tracts; total suspension of fishing operations.',
    lastUpdated: '03 Sep 2026 12:00 UTC',
    sources: ['IMD RSMC Bulletin #06', 'GenesisNet Hazard Overlay', 'Survey of India Coastal Grids']
  },
  {
    id: 'dist-ganjam',
    district: 'Ganjam',
    state: 'Odisha',
    overallRisk: 'CRITICAL',
    windRisk: 'Severe (85-105 km/h)',
    rainfallRisk: 'Extremely Heavy (180-240 mm)',
    coastalRisk: 'High Surge (1.0-2.0m)',
    officialWarning: 'Red Message (IMD)',
    dataStatus: 'Available (Demo)',
    coordinates: [19.38, 85.06],
    affectedAreaSqKm: 8206,
    populationExposure: 'N/A — Operational Census API Not Connected',
    shelterStatus: 'Data source not connected',
    hospitalStatus: 'Data source not connected',
    evacuationStatus: 'N/A — Government Source Required',
    emergencyTeams: 'N/A — EOC Direct Dispatch Only',
    officialWarnings: 'IMD Red Warning: Landfall zone vicinity. High risk of tree uprooting and thatched roof damage.',
    lastUpdated: '03 Sep 2026 12:00 UTC',
    sources: ['IMD RSMC Bulletin #06', 'GenesisNet Hazard Overlay']
  },
  {
    id: 'dist-jagatsinghpur',
    district: 'Jagatsinghpur',
    state: 'Odisha',
    overallRisk: 'HIGH',
    windRisk: 'Moderate-High (70-90 km/h)',
    rainfallRisk: 'Heavy to Very Heavy (120-180 mm)',
    coastalRisk: 'Moderate Surge (0.8-1.5m)',
    officialWarning: 'Orange Message (IMD)',
    dataStatus: 'Available (Demo)',
    coordinates: [20.27, 86.17],
    affectedAreaSqKm: 1668,
    populationExposure: 'N/A — Operational Census API Not Connected',
    shelterStatus: 'Data source not connected',
    hospitalStatus: 'Data source not connected',
    evacuationStatus: 'N/A — Government Source Required',
    emergencyTeams: 'N/A — EOC Direct Dispatch Only',
    officialWarnings: 'IMD Orange Warning: Paradip port operations alerted; coastal villages advised heightened vigilance.',
    lastUpdated: '03 Sep 2026 12:00 UTC',
    sources: ['IMD RSMC Bulletin #06', 'Paradip Port Meteorological Feed']
  },
  {
    id: 'dist-srikakulam',
    district: 'Srikakulam',
    state: 'Andhra Pradesh',
    overallRisk: 'HIGH',
    windRisk: 'High (75-95 km/h)',
    rainfallRisk: 'Heavy (100-150 mm)',
    coastalRisk: 'Moderate Surge (0.5-1.2m)',
    officialWarning: 'Orange Message (IMD)',
    dataStatus: 'Available (Demo)',
    coordinates: [18.29, 83.89],
    affectedAreaSqKm: 5837,
    populationExposure: 'N/A — Operational Census API Not Connected',
    shelterStatus: 'Data source not connected',
    hospitalStatus: 'Data source not connected',
    evacuationStatus: 'N/A — Government Source Required',
    emergencyTeams: 'N/A — EOC Direct Dispatch Only',
    officialWarnings: 'IMD Orange Warning: Heavy coastal squalls; fishermen advised not to venture into deep sea.',
    lastUpdated: '03 Sep 2026 12:00 UTC',
    sources: ['IMD Cyclone Warning Centre Visakhapatnam']
  },
  {
    id: 'dist-balasore',
    district: 'Balasore',
    state: 'Odisha',
    overallRisk: 'MODERATE',
    windRisk: 'Moderate (55-75 km/h)',
    rainfallRisk: 'Moderate-Heavy (70-110 mm)',
    coastalRisk: 'Low Surge (<0.5m)',
    officialWarning: 'Yellow Alert (IMD)',
    dataStatus: 'Available (Demo)',
    coordinates: [21.49, 86.93],
    affectedAreaSqKm: 3806,
    populationExposure: 'N/A',
    shelterStatus: 'Data source not connected',
    hospitalStatus: 'Data source not connected',
    evacuationStatus: 'N/A',
    emergencyTeams: 'N/A',
    officialWarnings: 'IMD Yellow Watch: Isolated heavy showers and gusty winds.',
    lastUpdated: '03 Sep 2026 12:00 UTC',
    sources: ['IMD RSMC Bulletin #06']
  },
  {
    id: 'dist-east-medinipur',
    district: 'East Medinipur',
    state: 'West Bengal',
    overallRisk: 'MODERATE',
    windRisk: 'Moderate (50-70 km/h)',
    rainfallRisk: 'Moderate (60-100 mm)',
    coastalRisk: 'Moderate Surge in Digha coastal belt',
    officialWarning: 'Yellow Alert (IMD)',
    dataStatus: 'Available (Demo)',
    coordinates: [21.93, 87.77],
    affectedAreaSqKm: 4713,
    populationExposure: 'N/A',
    shelterStatus: 'Data source not connected',
    hospitalStatus: 'Data source not connected',
    evacuationStatus: 'N/A',
    emergencyTeams: 'N/A',
    officialWarnings: 'IMD Yellow Watch: Digha-Mandarmoni tourist activities restricted.',
    lastUpdated: '03 Sep 2026 12:00 UTC',
    sources: ['Regional Meteorological Centre Kolkata']
  },
  {
    id: 'dist-south-24-parganas',
    district: 'South 24 Parganas',
    state: 'West Bengal',
    overallRisk: 'MODERATE',
    windRisk: 'Squally (50-65 km/h)',
    rainfallRisk: 'Moderate-Heavy (70-110 mm)',
    coastalRisk: 'Tidal Inundation in Sundarbans',
    officialWarning: 'Yellow Alert (IMD)',
    dataStatus: 'Available (Demo)',
    coordinates: [22.14, 88.58],
    affectedAreaSqKm: 9960,
    populationExposure: 'N/A',
    shelterStatus: 'Data source not connected',
    hospitalStatus: 'Data source not connected',
    evacuationStatus: 'N/A',
    emergencyTeams: 'N/A',
    officialWarnings: 'IMD Yellow Watch: Embankment monitoring recommended in delta islands.',
    lastUpdated: '03 Sep 2026 12:00 UTC',
    sources: ['Regional Meteorological Centre Kolkata']
  },
  {
    id: 'dist-visakhapatnam',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    overallRisk: 'LOW',
    windRisk: 'Moderate (45-60 km/h)',
    rainfallRisk: 'Light to Moderate (30-60 mm)',
    coastalRisk: 'Normal Astronomical Tide',
    officialWarning: 'Advisory Watch',
    dataStatus: 'Available (Demo)',
    coordinates: [17.68, 83.21],
    affectedAreaSqKm: 1048,
    populationExposure: 'N/A',
    shelterStatus: 'Data source not connected',
    hospitalStatus: 'Data source not connected',
    evacuationStatus: 'N/A',
    emergencyTeams: 'N/A',
    officialWarnings: 'IMD Advisory: Precautionary port signals hoisted at Vizag Port.',
    lastUpdated: '03 Sep 2026 12:00 UTC',
    sources: ['CWC Visakhapatnam']
  }
];

// Hazard Assessment Component Data
export const HAZARD_ASSESSMENT_DATA = [
  {
    id: 'hz-wind',
    name: 'Wind Hazard',
    category: 'CRITICAL',
    status: 'Severe Coastal Gale Expected',
    peakValue: '85–110 km/h gusting to 125 km/h',
    timing: 'Next 24–36 hours',
    affectedRegions: 'Coastal Odisha (Puri, Ganjam, Jagatsinghpur) & North Andhra',
    source: 'GenesisNet Numerical Gradient Analysis',
    timestamp: '03 Sep 2026 12:00 UTC',
    dataAvailability: 'Model Simulation Active (Demo)',
    color: '#ef4444'
  },
  {
    id: 'hz-rain',
    name: 'Heavy Rainfall',
    category: 'CRITICAL',
    status: 'Extremely Heavy Precipitation Band',
    peakValue: '200–280 mm cumulative / 24h',
    timing: 'Next 12–48 hours',
    affectedRegions: 'Puri, Khordha, Ganjam, Kendrapara, Cuttack',
    source: 'INSAT-3DR QPE & ERA5 Moisture Flux',
    timestamp: '03 Sep 2026 12:00 UTC',
    dataAvailability: 'Sensor Stream Connected (Demo)',
    color: '#ef4444'
  },
  {
    id: 'hz-surge',
    name: 'Storm Surge',
    category: 'HIGH',
    status: 'Coastal Inundation Warning',
    peakValue: '1.5–2.5 m above astronomical tide',
    timing: 'At estimated landfall window',
    affectedRegions: 'Low-lying areas of Puri & Jagatsinghpur coast',
    source: 'INCOIS Hydrodynamic Surge Model (Referenced)',
    timestamp: '03 Sep 2026 11:30 UTC',
    dataAvailability: 'Auxiliary Hydrodynamic Feed (Demo)',
    color: '#f59e0b'
  },
  {
    id: 'hz-coastal-flood',
    name: 'Coastal Flooding',
    category: 'HIGH',
    status: 'High Saline Ingress Probability',
    peakValue: 'Water depth 0.5–1.2 m in backwaters',
    timing: 'Coinciding with High Tide (04 Sep 06 UTC)',
    affectedRegions: 'Chilika lake fringes, Puri beach road, Astaranga',
    source: 'Digital Elevation Inundation Mapping',
    timestamp: '03 Sep 2026 11:00 UTC',
    dataAvailability: 'Topographic DEM Feed (Demo)',
    color: '#f59e0b'
  },
  {
    id: 'hz-river-flood',
    name: 'River Flooding',
    category: 'MODERATE',
    status: 'Mahanadi & Rushikulya Basin Alert',
    peakValue: 'Approaching Warning Level in downstream gauges',
    timing: 'Next 36–60 hours',
    affectedRegions: 'Downstream Mahanadi & Rushikulya delta tributaries',
    source: 'Central Water Commission (CWC) Feed',
    timestamp: '03 Sep 2026 09:00 UTC',
    dataAvailability: 'CWC Hydrological Feed (Demo)',
    color: '#38bdf8'
  },
  {
    id: 'hz-landslide',
    name: 'Landslide',
    category: 'N/A',
    status: 'MODEL NOT CONNECTED',
    peakValue: 'N/A',
    timing: 'N/A',
    affectedRegions: 'Eastern Ghats hilly tracts (Unmonitored)',
    source: 'Geological Survey of India (GSI)',
    timestamp: 'N/A',
    dataAvailability: 'Source not connected — No active telemetry',
    color: '#64748b'
  }
];

// Official Meteorological Information & Bulletins
export const OFFICIAL_BULLETINS = [
  {
    id: 'BUL-IMD-20260903-06',
    authority: 'India Meteorological Department (IMD) / RSMC New Delhi',
    bulletinNumber: 'BOB/03/2026/06',
    title: 'Cyclone Alert for Odisha and North Andhra Pradesh Coasts: Yellow Message',
    warningStatus: 'CYCLONE ALERT (ORANGE / RED WATCH)',
    issuedAt: '03 Sep 2026 11:30 UTC',
    validUntil: '04 Sep 2026 00:00 UTC',
    affectedRegions: 'Odisha, North Coastal Andhra Pradesh, Coastal West Bengal',
    summary: 'The Depression over central Bay of Bengal moved west-northwestwards with a speed of 15 kmph and intensified into a Deep Depression. It is very likely to intensify further into a Cyclonic Storm during next 24 hours. Landfall anticipated near Odisha coast between Gopalpur and Puri.',
    actionRequired: 'State disaster authorities advised to keep cyclone shelters ready. Fishermen advised not to venture into Central and North Bay of Bengal.',
    sourceUrl: 'https://rsmcnewdelhi.imd.gov.in (Simulated Official Feed)',
    isOfficial: true
  },
  {
    id: 'BUL-IMD-20260903-05',
    authority: 'India Meteorological Department (IMD) / RSMC New Delhi',
    bulletinNumber: 'BOB/03/2026/05',
    title: 'Special Tropical Weather Outlook for North Indian Ocean',
    warningStatus: 'INFORMATIONAL BULLETIN',
    issuedAt: '03 Sep 2026 06:00 UTC',
    validUntil: '03 Sep 2026 18:00 UTC',
    affectedRegions: 'Central Bay of Bengal',
    summary: 'MJO index is in Phase 3 with amplitude > 1, supporting active convective envelope. Sea surface temperatures 29-30°C and vertical wind shear moderate (10-15 kts).',
    actionRequired: 'Continuous radar and satellite observation established.',
    sourceUrl: 'https://rsmcnewdelhi.imd.gov.in',
    isOfficial: true
  }
];

// Official Public Communications (Government -> People)
export const OFFICIAL_PUBLIC_COMMUNICATIONS = [
  {
    id: 'PUB-ALERT-01',
    type: 'Official Cyclone Warning',
    authority: 'Special Relief Commissioner (SRC), Government of Odisha',
    timestamp: '03 Sep 2026 12:15 UTC',
    affectedArea: 'Puri, Ganjam, Jagatsinghpur, Kendrapara',
    validity: 'Immediate — Next 48 Hours',
    text: 'All schools and educational institutions in coastal districts shall remain closed from 04 Sep to 06 Sep. Fishermen at sea must return immediately to nearest designated harbor.',
    status: 'ACTIVE BROADCAST'
  },
  {
    id: 'PUB-ALERT-02',
    type: 'Official Preparedness Advisory',
    authority: 'Odisha State Disaster Management Authority (OSDMA)',
    timestamp: '03 Sep 2026 10:30 UTC',
    affectedArea: 'Coastal Odisha',
    validity: 'Valid until further notice',
    text: 'Keep emergency go-bags with drinking water, dry rations, emergency medicine, torchlight and valid identification documents ready. Do not spread or believe unverified rumors.',
    status: 'ACTIVE ADVISORY'
  },
  {
    id: 'PUB-ALERT-03',
    type: 'Evacuation Notice (Precautionary)',
    authority: 'District Collector & District Magistrate, Puri',
    timestamp: '03 Sep 2026 11:00 UTC',
    affectedArea: 'Puri District: Kakatpur, Astaranga, Brahmagiri low-lying gram panchayats',
    validity: 'Phased from 04 Sep 08:00 IST',
    text: 'Vulnerable residents living in kutcha houses within 5 km of coastline will be guided to Multi-Purpose Cyclone Shelters (MPCS). Free hot cooked meals and medical screening arranged.',
    status: 'LOCAL DIRECTIVE'
  }
];

// Initial Mock Citizen Emergency Requests (Two-Way Citizen Connect)
export const INITIAL_EMERGENCY_REQUESTS = [
  {
    id: 'CV-1042',
    timestamp: '03 Sep 12:14 UTC',
    location: 'Gopalpur Beach Road, Ward 4',
    coordinates: [19.261, 84.908],
    district: 'Ganjam',
    state: 'Odisha',
    emergencyType: 'Flooding & Trapped',
    peopleReported: 5,
    message: 'Seawater entering homes on main beach road. 2 elderly persons unable to walk. Need urgent rescue boat.',
    hasPhoto: true,
    photoUrl: '/assets/sample-flood.jpg',
    contact: '+91 98451 22891',
    suggestedPriority: 'CRITICAL',
    confirmedPriority: 'CRITICAL',
    verification: 'Verified',
    assignedTeam: 'NDRF Unit 03 (Ganjam)',
    status: 'Responding',
    timeline: [
      { time: '12:14 UTC', action: 'Distress report submitted via Citizen Emergency Connect', actor: 'Citizen' },
      { time: '12:18 UTC', action: 'GPS coordinates validated in high-risk coastal inundation sector', actor: 'EOC Automated Dispatch' },
      { time: '12:22 UTC', action: 'Request verified via telephonic confirmation with ward member', actor: 'EOC Officer Roy' },
      { time: '12:28 UTC', action: 'Assigned to NDRF Unit 03 with inflatable rescue craft', actor: 'EOC Commander Sharma' },
      { time: '12:35 UTC', action: 'Team en-route (ETA: 12 minutes)', actor: 'NDRF Unit 03 Leader' }
    ]
  },
  {
    id: 'CV-1043',
    timestamp: '03 Sep 12:20 UTC',
    location: 'Astaranga Fishing Hamlet, Block B',
    coordinates: [19.982, 86.262],
    district: 'Puri',
    state: 'Odisha',
    emergencyType: 'Medical Emergency',
    peopleReported: 1,
    message: 'Pregnant woman in labor, local road blocked by fallen trees. Ambulance unable to access.',
    hasPhoto: false,
    photoUrl: null,
    contact: '+91 94370 55120',
    suggestedPriority: 'CRITICAL',
    confirmedPriority: 'CRITICAL',
    verification: 'Verified',
    assignedTeam: 'Medical Quick Response Unit 2',
    status: 'Responding',
    timeline: [
      { time: '12:20 UTC', action: 'Emergency medical report submitted', actor: 'Citizen' },
      { time: '12:23 UTC', action: 'Urgent medical flag triggered; prioritized above queue', actor: 'AI Rule Engine' },
      { time: '12:25 UTC', action: 'Verified by District Medical Officer desk', actor: 'Dr. Patnaik' },
      { time: '12:30 UTC', action: 'All-terrain 4x4 Medical Response Unit dispatched with paramedic', actor: 'Puri District EOC' }
    ]
  },
  {
    id: 'CV-1044',
    timestamp: '03 Sep 12:05 UTC',
    location: 'Brahmagiri Chilika Lagoon Edge',
    coordinates: [19.789, 85.641],
    district: 'Puri',
    state: 'Odisha',
    emergencyType: 'Need Evacuation',
    peopleReported: 12,
    message: 'Lagoon water overflowing into temporary thatch sheds. 12 family members stranded on raised platform.',
    hasPhoto: true,
    contact: '+91 70081 99342',
    suggestedPriority: 'HIGH',
    confirmedPriority: 'HIGH',
    verification: 'Verified',
    assignedTeam: 'ODRAF Team 04',
    status: 'Team Assigned',
    timeline: [
      { time: '12:05 UTC', action: 'Report submitted by village volunteer', actor: 'Citizen' },
      { time: '12:12 UTC', action: 'Cross-checked with Brahmagiri Block Development Office', actor: 'EOC Desk' },
      { time: '12:25 UTC', action: 'ODRAF Team 04 allocated with bus and shelter capacity', actor: 'EOC Coordinator' }
    ]
  },
  {
    id: 'CV-1045',
    timestamp: '03 Sep 12:32 UTC',
    location: 'Paradip Port Sector 3, Slum Cluster',
    coordinates: [20.298, 86.662],
    district: 'Jagatsinghpur',
    state: 'Odisha',
    emergencyType: 'Building Damage',
    peopleReported: 4,
    message: 'Asbestos sheet roof blown off by sudden squall; rain pouring inside. Safe shelter needed.',
    hasPhoto: false,
    contact: '+91 82490 11499',
    suggestedPriority: 'HIGH',
    confirmedPriority: 'Pending Confirmation',
    verification: 'Pending Verification',
    assignedTeam: 'Not Assigned',
    status: 'Pending Verification',
    timeline: [
      { time: '12:32 UTC', action: 'Distress report received', actor: 'Citizen' },
      { time: '12:34 UTC', action: 'Queued for telephonic verification by EOC Jagatsinghpur', actor: 'EOC Automated Desk' }
    ]
  },
  {
    id: 'CV-1046',
    timestamp: '03 Sep 12:38 UTC',
    location: 'Srikakulam Coastal Highway Kp 42',
    coordinates: [18.305, 83.921],
    district: 'Srikakulam',
    state: 'Andhra Pradesh',
    emergencyType: 'Trapped',
    peopleReported: 2,
    message: 'Car stalled in flash flood water over culvert. Water up to window level.',
    hasPhoto: true,
    contact: '+91 99890 33401',
    suggestedPriority: 'CRITICAL',
    confirmedPriority: 'CRITICAL',
    verification: 'Verified',
    assignedTeam: 'AP Fire & Rescue Unit 08',
    status: 'Responding',
    timeline: [
      { time: '12:38 UTC', action: 'Vehicle distress report received', actor: 'Citizen' },
      { time: '12:40 UTC', action: 'Verified via traffic camera & direct caller contact', actor: 'AP State EOC' },
      { time: '12:42 UTC', action: 'Dispatched nearby Highway Fire & Rescue team with winch', actor: 'Fire Control' }
    ]
  },
  {
    id: 'CV-1047',
    timestamp: '03 Sep 11:50 UTC',
    location: 'Konark Sun Temple Market Environs',
    coordinates: [19.887, 86.094],
    district: 'Puri',
    state: 'Odisha',
    emergencyType: 'Need Evacuation',
    peopleReported: 8,
    message: 'Market vendors stranded after transport halted. Ready to move to designated shelter.',
    hasPhoto: false,
    contact: '+91 94372 00188',
    suggestedPriority: 'MODERATE',
    confirmedPriority: 'MODERATE',
    verification: 'Verified',
    assignedTeam: 'Civil Defence Volunteers Puri',
    status: 'Resolved',
    timeline: [
      { time: '11:50 UTC', action: 'Report submitted', actor: 'Citizen' },
      { time: '11:55 UTC', action: 'Verified by local outpost', actor: 'Civil Defence Desk' },
      { time: '12:02 UTC', action: 'Civil defence mini-bus dispatched', actor: 'EOC' },
      { time: '12:20 UTC', action: 'All 8 persons safely relocated to Konark MPCS Cyclone Shelter', actor: 'Volunteer In-Charge' }
    ]
  }
];

// Response Teams Coordination Roster (Prototype)
export const RESPONSE_TEAMS = [
  {
    id: 'TEAM-NDRF-03',
    name: 'NDRF 3rd Battalion — Unit 03',
    type: 'NDRF (Disaster Response)',
    category: 'Rescue',
    district: 'Ganjam',
    baseLocation: 'Chatrapur Disaster Base',
    currentStatus: 'Responding',
    assignedEmergency: 'CV-1042',
    personnelCount: 35,
    equipment: ['4 Inflatable Motor Boats', 'Tree Cutters', 'Satellite Comms', 'Life Jackets'],
    lastUpdate: '12:35 UTC'
  },
  {
    id: 'TEAM-ODRAF-04',
    name: 'ODRAF Team 04 — Puri Sector',
    type: 'ODRAF (State Disaster Response)',
    category: 'Rescue',
    district: 'Puri',
    baseLocation: 'Puri District Police Lines',
    currentStatus: 'Assigned',
    assignedEmergency: 'CV-1044',
    personnelCount: 28,
    equipment: ['3 Fiber Boats', 'Search Lights', 'High-Clearance Trucks'],
    lastUpdate: '12:25 UTC'
  },
  {
    id: 'TEAM-MED-02',
    name: 'Medical Quick Response Unit 2',
    type: 'District Health Services',
    category: 'Medical',
    district: 'Puri',
    baseLocation: 'Puri District Headquarters Hospital',
    currentStatus: 'Responding',
    assignedEmergency: 'CV-1043',
    personnelCount: 6,
    equipment: ['4x4 Mobile Critical Care Ambulance', 'Obstetric Emergency Kit', 'Oxygen Cylinders'],
    lastUpdate: '12:30 UTC'
  },
  {
    id: 'TEAM-FIRE-08',
    name: 'AP Fire & Rescue Team 08',
    type: 'State Fire Services',
    category: 'Fire',
    district: 'Srikakulam',
    baseLocation: 'Srikakulam Fire Station',
    currentStatus: 'Responding',
    assignedEmergency: 'CV-1046',
    personnelCount: 14,
    equipment: ['Hydraulic Winch Tender', 'Flood Rescue Gear'],
    lastUpdate: '12:42 UTC'
  },
  {
    id: 'TEAM-POL-01',
    name: 'Marine Police Coastal Patrol 1',
    type: 'Coastal Police',
    category: 'Police',
    district: 'Jagatsinghpur',
    baseLocation: 'Paradip Marine Outpost',
    currentStatus: 'Available',
    assignedEmergency: 'None',
    personnelCount: 20,
    equipment: ['High-speed Interceptor Boats', 'Shore Patrol Jeeps'],
    lastUpdate: '12:40 UTC'
  },
  {
    id: 'TEAM-CIVIL-05',
    name: 'Civil Defence Volunteers Puri',
    type: 'Civil Defence',
    category: 'Disaster Response',
    district: 'Puri',
    baseLocation: 'Konark Sector Office',
    currentStatus: 'Available',
    assignedEmergency: 'None (Completed CV-1047)',
    personnelCount: 40,
    equipment: ['Public Address Megaphones', 'First Aid Kits', 'Minibuses'],
    lastUpdate: '12:22 UTC'
  }
];

// Critical Infrastructure Points (Verified Prototype Landmarks)
export const CRITICAL_INFRASTRUCTURE = [
  { id: 'inf-hosp-01', name: 'Puri District HQ Hospital', type: 'Hospital', lat: 19.813, lon: 85.831, district: 'Puri', status: 'Operational — Emergency Backup Active' },
  { id: 'inf-hosp-02', name: 'MKCG Medical College & Hospital', type: 'Hospital', lat: 19.317, lon: 84.792, district: 'Ganjam', status: 'Operational — Designated Apex Trauma Facility' },
  { id: 'inf-port-01', name: 'Paradip Major Port Trust', type: 'Port', lat: 20.264, lon: 86.671, district: 'Jagatsinghpur', status: 'Advisory Signal Hoisted — Berthing Restricted' },
  { id: 'inf-port-02', name: 'Gopalpur Coastal Port', type: 'Port', lat: 19.302, lon: 84.966, district: 'Ganjam', status: 'Harbour Gates Secured' },
  { id: 'inf-shlt-01', name: 'Gopalpur Multipurpose Cyclone Shelter', type: 'Shelter', lat: 19.268, lon: 84.912, district: 'Ganjam', status: 'Shelter Manager Deployed — Ready' },
  { id: 'inf-shlt-02', name: 'Astaranga Coastal MPCS', type: 'Shelter', lat: 19.988, lon: 86.275, district: 'Puri', status: 'Power Generator Verified — Ready' },
  { id: 'inf-shlt-03', name: 'Brahmagiri Central Shelter', type: 'Shelter', lat: 19.801, lon: 85.654, district: 'Puri', status: 'Capacity 1200 Persons — Ready' }
];

// Preparedness Status Indicators (Future-Ready with Honest Connection Statuses)
export const PREPAREDNESS_INDICATORS = [
  { id: 'prep-eoc', label: 'Emergency Operations Centre', status: 'Active 24x7', notes: 'State EOC & 4 District EOCs operational', dataConnected: true },
  { id: 'prep-shelter', label: 'Cyclone Shelters', status: 'Data source not connected', notes: 'Capacity census requires live district telemetry', dataConnected: false },
  { id: 'prep-evac', label: 'Evacuation Status', status: 'N/A', notes: 'Awaiting District Administration field returns', dataConnected: false },
  { id: 'prep-rescue', label: 'Rescue Teams', status: 'Prototype Ready', notes: '6 Teams indexed in demo coordination pool', dataConnected: true },
  { id: 'prep-med', label: 'Medical Preparedness', status: 'Data source not connected', notes: 'Hospital bed inventory API unavailable', dataConnected: false },
  { id: 'prep-power', label: 'Power Restoration Teams', status: 'Data source not connected', notes: 'DISCOM standby feed not connected', dataConnected: false },
  { id: 'prep-relief', label: 'Food / Water Resources', status: 'Data source not connected', notes: 'Civil supplies godown inventory not connected', dataConnected: false },
  { id: 'prep-port', label: 'Port Status', status: 'Advisory Warning Hoisted', notes: 'Paradip & Gopalpur ports under Local Cautionary Signal 3', dataConnected: true }
];

// Event Timeline (Chronological Multi-Source Log)
export const EVENT_TIMELINE_DATA = [
  { id: 'ev-01', time: '03 Sep 12:42 UTC', type: 'Response', source: 'EOC Srikakulam', title: 'AP Fire & Rescue dispatched to CV-1046', detail: 'High-clearance vehicle assigned to stranded car on culvert.' },
  { id: 'ev-02', time: '03 Sep 12:38 UTC', type: 'Citizen Distress', source: 'Citizen Emergency Connect', title: 'New Citizen Distress Report received (CV-1046)', detail: '2 people trapped in floodwaters, Srikakulam.' },
  { id: 'ev-03', time: '03 Sep 12:30 UTC', type: 'Response', source: 'Puri EOC', title: 'Medical Quick Response Unit 2 en-route to CV-1043', detail: 'Obstetric emergency response dispatched with paramedic.' },
  { id: 'ev-04', time: '03 Sep 12:20 UTC', type: 'Response', source: 'Civil Defence Puri', title: 'Emergency Request CV-1047 Resolved', detail: '8 citizens moved from Konark market to MPCS shelter.' },
  { id: 'ev-05', time: '03 Sep 12:15 UTC', type: 'Official Notice', source: 'SRC Odisha', title: 'State Disaster Alert Issued to Coastal Collectors', detail: 'Directive to complete preventive evacuations in surge zones.' },
  { id: 'ev-06', time: '03 Sep 12:00 UTC', type: 'AI Genesis', source: 'GenesisNet v0.1', title: 'Genesis Probability updated to 76% (Next 24h)', detail: 'Confidence increased to 88% under Curved Band cloud pattern.' },
  { id: 'ev-07', time: '03 Sep 11:30 UTC', type: 'Official Bulletin', source: 'IMD / RSMC New Delhi', title: 'IMD Bulletin #06 Issued: Yellow Cyclone Alert', detail: 'Deep depression expected to intensify into cyclonic storm.' },
  { id: 'ev-08', time: '03 Sep 11:15 UTC', type: 'Satellite', source: 'INSAT-3D TIR-1', title: 'New Infrared Satellite Frame Ingested (4 km)', detail: 'Enhanced convection with curved convective banding noted.' },
  { id: 'ev-09', time: '03 Sep 09:30 UTC', type: 'Ocean / Env', source: 'ERA5 Assimilation', title: 'SST & Wind Shear Fields Updated', detail: 'Warm pool >29.3°C confirmed in central Bay of Bengal.' }
];

// Data Lineage / Sources
export const DATA_PROVENANCE = [
  {
    category: 'Satellite Observations',
    source: 'INSAT-3D / 3DR Imager',
    provider: 'ISRO / India Meteorological Department',
    datasetId: 'INSAT3D_L1C_ASIA_SECTOR',
    variables: ['Infrared (10.8 µm TIR-1)', 'Water Vapour (6.7 µm WV)', 'Visible (0.65 µm VIS)'],
    atmosphericLevel: 'Top of Atmosphere (Brightness Temp / Reflectance)',
    spatialResolution: '4 km (IR/WV), 1 km (VIS)',
    temporalResolution: '15–30 minutes',
    coverage: 'North Indian Ocean & South Asia (40°E–120°E, 40°S–40°N)',
    processing: 'Calibrated Radiance, Geometric Correction, Atmospheric Attenuation Correction',
    status: 'Operational Sensor Stream (Mocked in Prototype)'
  },
  {
    category: 'Atmospheric & Oceanic Reanalysis',
    source: 'ECMWF ERA5 Reanalysis',
    provider: 'Copernicus Climate Change Service (ECMWF)',
    datasetId: 'reanalysis-era5-single-levels & pressure-levels',
    variables: [
      'Sea Surface Temperature (SST)',
      'Mean Sea-Level Pressure (MSLP)',
      'Relative Humidity (500 hPa)',
      'Relative Vorticity (850 hPa)',
      'Vertical Wind Shear (200 hPa – 850 hPa)'
    ],
    atmosphericLevel: 'Surface, 850 hPa, 500 hPa, 200 hPa',
    spatialResolution: '0.25° × 0.25° (~31 km)',
    temporalResolution: 'Hourly',
    coverage: 'Global',
    processing: '4D-Var Data Assimilation, Physics Constrained Navier-Stokes',
    status: 'Research Reanalysis Data'
  },
  {
    category: 'Cyclone Ground Truth',
    source: 'IBTrACS v04r00 & RSMC New Delhi',
    provider: 'NOAA NCEI & IMD',
    datasetId: 'IBTrACS.NI.v04r00',
    variables: ['Track Centroids (Lat/Lon)', 'Minimum Central Pressure', 'Maximum Sustained Wind', 'System Stage Classification'],
    atmosphericLevel: 'Surface Centroid',
    spatialResolution: 'Point Observations',
    temporalResolution: '3-hourly & 6-hourly best track',
    coverage: 'North Indian Ocean Basin',
    processing: 'Post-season synoptic best-track consensus reconciliation',
    status: 'Historical Ground Truth Archive'
  },
  {
    category: 'Numerical Weather Prediction (Auxiliary)',
    source: 'NOAA GFS (Global Forecast System)',
    provider: 'National Centers for Environmental Prediction (NCEP)',
    datasetId: 'NCEP-GFS-0.25deg',
    variables: ['Steering flow streamlines', 'Total precipitable water', 'Mid-tropospheric lapse rates'],
    atmosphericLevel: 'Multi-level synoptic grids',
    spatialResolution: '0.25° grid',
    temporalResolution: '3-hourly forecast cycles',
    coverage: 'Global',
    processing: 'Spectral GFS Model Dynamic Forecast',
    status: 'Reference Baseline'
  },
  {
    category: 'Official Government Alerts & Bulletins',
    source: 'IMD RSMC Bulletins & OSDMA Advisories',
    provider: 'India Meteorological Department & State Disaster Authorities',
    datasetId: 'IMD-RSMC-BULLETINS',
    variables: ['Cyclone Warning Stage', 'Official Track Coordinates', 'Expected Landfall Point', 'Gale Warnings'],
    atmosphericLevel: 'Surface / Synoptic',
    spatialResolution: 'District & Basin level',
    temporalResolution: '3-hourly during storm activity',
    coverage: 'Indian Coastal States & Maritime EEZ',
    processing: 'Senior Synoptic Forecaster Official Review',
    status: 'Official Operational Meteorological Stream (Simulated Demo)'
  },
  {
    category: 'Citizen Emergency Telemetry',
    source: 'Citizen Emergency Connect — Public Distress Portal',
    provider: 'CycloVision AI Two-Way Public Interface',
    datasetId: 'CV-CITIZEN-DISTRESS-FEED',
    variables: ['GPS Latitude/Longitude', 'Emergency Nature', 'People Count', 'Distress Text', 'Contact Hash'],
    atmosphericLevel: 'Ground Surface Reports',
    spatialResolution: 'Point Centroid (GPS WGS84)',
    temporalResolution: 'Real-time On-demand',
    coverage: 'Coastal High-Risk Districts',
    processing: 'Automated Spatial Filtering, Rule-Assisted Priority Estimation, Telephonic EOC Verification',
    status: 'Citizen Telemetry Stream (Simulated Prototype)'
  }
];

// Historical Cyclone Records for Explorer
export const HISTORICAL_CYCLONES = [
  {
    id: 'cyclone-mocha-2023',
    name: 'Super Cyclonic Storm Mocha',
    year: 2023,
    basin: 'Bay of Bengal',
    formationDate: '09 May 2023',
    dissipationDate: '15 May 2023',
    peakIntensity: '280 km/h (150 kt)',
    minPressure: '918 hPa',
    source: 'IMD / RSMC New Delhi & JTWC',
    stages: ['Depression', 'Deep Depression', 'Cyclonic Storm', 'Severe Cyclonic Storm', 'Very Severe Cyclonic Storm', 'Extremely Severe Cyclonic Storm', 'Super Cyclonic Storm'],
    track: [
      { date: '09 May 06 UTC', lat: 9.8, lon: 88.5, mslp: 1004, sst: 30.5, rh: 78, shear: 10, prob: 65 },
      { date: '10 May 00 UTC', lat: 10.9, lon: 88.2, mslp: 1000, sst: 30.8, rh: 80, shear: 9,  prob: 82 },
      { date: '11 May 00 UTC', lat: 11.8, lon: 88.0, mslp: 994,  sst: 31.0, rh: 82, shear: 8,  prob: 94 },
      { date: '12 May 00 UTC', lat: 13.5, lon: 88.4, mslp: 982,  sst: 31.1, rh: 84, shear: 8,  prob: 98 },
      { date: '13 May 00 UTC', lat: 16.0, lon: 89.8, mslp: 948,  sst: 30.6, rh: 85, shear: 12, prob: 99 },
      { date: '14 May 06 UTC', lat: 20.2, lon: 92.6, mslp: 918,  sst: 29.8, rh: 86, shear: 14, prob: 100 }
    ],
    notes: 'One of the most intense cyclones on record in the Bay of Bengal, characterized by rapid intensification over anomalous high Ocean Thermal Content (>100 kJ/cm²).'
  },
  {
    id: 'cyclone-biparjoy-2023',
    name: 'Extremely Severe Cyclonic Storm Biparjoy',
    year: 2023,
    basin: 'Arabian Sea',
    formationDate: '06 Jun 2023',
    dissipationDate: '19 Jun 2023',
    peakIntensity: '165 km/h (90 kt)',
    minPressure: '958 hPa',
    source: 'IMD / RSMC New Delhi',
    stages: ['Depression', 'Deep Depression', 'Cyclonic Storm', 'Severe Cyclonic Storm', 'Extremely Severe Cyclonic Storm'],
    track: [
      { date: '06 Jun 00 UTC', lat: 12.1, lon: 66.0, mslp: 1002, sst: 31.2, rh: 74, shear: 12, prob: 58 },
      { date: '07 Jun 00 UTC', lat: 12.9, lon: 66.2, mslp: 996,  sst: 31.0, rh: 76, shear: 11, prob: 74 },
      { date: '08 Jun 00 UTC', lat: 14.0, lon: 66.0, mslp: 986,  sst: 30.8, rh: 78, shear: 10, prob: 88 },
      { date: '10 Jun 00 UTC', lat: 17.1, lon: 67.3, mslp: 970,  sst: 30.2, rh: 80, shear: 13, prob: 95 },
      { date: '12 Jun 00 UTC', lat: 19.4, lon: 67.6, mslp: 962,  sst: 29.5, rh: 81, shear: 15, prob: 96 },
      { date: '15 Jun 12 UTC', lat: 23.2, lon: 68.6, mslp: 970,  sst: 28.8, rh: 82, shear: 18, prob: 92 }
    ],
    notes: 'Exceptional duration of 13+ days over the Arabian Sea, demonstrating complex interaction with monsoonal cross-equatorial flow.'
  },
  {
    id: 'cyclone-amphan-2020',
    name: 'Super Cyclonic Storm Amphan',
    year: 2020,
    basin: 'Bay of Bengal',
    formationDate: '16 May 2020',
    dissipationDate: '21 May 2020',
    peakIntensity: '260 km/h (140 kt)',
    minPressure: '920 hPa',
    source: 'IMD / RSMC New Delhi',
    stages: ['Depression', 'Deep Depression', 'Cyclonic Storm', 'Severe Cyclonic Storm', 'Very Severe Cyclonic Storm', 'Extremely Severe Cyclonic Storm', 'Super Cyclonic Storm'],
    track: [
      { date: '16 May 00 UTC', lat: 10.4, lon: 87.0, mslp: 1000, sst: 31.4, rh: 80, shear: 8,  prob: 72 },
      { date: '17 May 00 UTC', lat: 11.4, lon: 86.0, mslp: 988,  sst: 31.5, rh: 83, shear: 7,  prob: 89 },
      { date: '18 May 06 UTC', lat: 13.4, lon: 86.2, mslp: 920,  sst: 31.2, rh: 86, shear: 6,  prob: 100 },
      { date: '19 May 12 UTC', lat: 17.0, lon: 87.0, mslp: 935,  sst: 30.1, rh: 84, shear: 12, prob: 98 },
      { date: '20 May 12 UTC', lat: 21.7, lon: 88.3, mslp: 960,  sst: 29.2, rh: 85, shear: 16, prob: 95 }
    ],
    notes: 'First Super Cyclonic Storm in the Bay of Bengal since the 1999 Odisha cyclone. Explosive deepening due to exceptionally low vertical wind shear (<10 kt) and warm SSTs (>31°C).'
  }
];

// Educational definitions for parameters
export const PARAMETER_INFO = {
  sst: {
    acronym: 'SST',
    fullName: 'Sea Surface Temperature',
    unit: '°C',
    threshold: '≥ 26.5 °C',
    source: 'ERA5 / OISST',
    description: 'Represents the thermodynamic fuel available for tropical cyclogenesis. Water temperatures above 26.5 °C are generally recognized in tropical meteorology as a necessary condition to supply moisture flux into the boundary layer.'
  },
  mslp: {
    acronym: 'MSLP',
    fullName: 'Mean Sea-Level Pressure',
    unit: 'hPa',
    threshold: '≤ 1006 hPa anomaly',
    source: 'ERA5 Reanalysis',
    description: 'Measures central surface pressure. A persistent drop in MSLP with inward gradient signifies strengthening low-level convergence and cyclonic circulation assembly.'
  },
  rh500: {
    acronym: 'RH 500',
    fullName: 'Relative Humidity at 500 hPa',
    unit: '%',
    threshold: '≥ 65–70%',
    source: 'ERA5 Reanalysis',
    description: 'Represents mid-tropospheric moisture content. High mid-level humidity suppresses convective downdrafts driven by evaporative cooling, which would otherwise disrupt organizing cyclone vortex columns.'
  },
  vorticity850: {
    acronym: 'Vorticity 850',
    fullName: 'Low-Level Relative Vorticity',
    unit: '10⁻⁵ s⁻¹',
    threshold: '≥ 5.0 × 10⁻⁵ s⁻¹',
    source: 'ERA5 (850 hPa)',
    description: 'Quantifies horizontal shear and curvature rotation of the wind field at the 850 hPa level (~1.5 km altitude). Positive low-level spin is essential for spin-up of tropical disturbances into depressions.'
  },
  windShear: {
    acronym: 'VWS',
    fullName: 'Vertical Wind Shear (200–850 hPa)',
    unit: 'm/s',
    threshold: '< 10–12 m/s (Favorable)',
    source: 'ERA5 Derived Variable',
    description: 'The vector difference between upper-tropospheric (200 hPa) and lower-tropospheric (850 hPa) horizontal winds. High shear (>15 m/s) tilts and tears the convective core, while low-to-moderate shear allows vertical column alignment.'
  }
};

// ==========================================================================
// CITIZEN DASHBOARD DATASET (SECTION 29)
// ==========================================================================
export const CITIZEN_DASHBOARD_DATA = {
  dataMode: 'demo',

  currentSituation: {
    systemName: 'Tropical Disturbance BOB 03 (Deep Depression)',
    systemType: 'Deep Depression over Central Bay of Bengal',
    status: 'Organizing & Moving West-Northwest',
    intensity: '28 knots (~52 km/h) sustained, gusts to 38 knots (~70 km/h)',
    centralPressure: '1004 hPa',
    coordinates: [14.8, 87.3],
    currentLocationName: 'Central Bay of Bengal (~380 km SE of Puri)',
    estimatedMovement: 'West-Northwestwards at 15 km/h',
    myArea: 'Coastal Odisha (Puri / Ganjam)',
    localRisk: 'HIGH',
    officialWarningStatus: 'Official Cyclone Alert (Orange/Red Watch) — IMD',
    updatedAt: '03 Sep 2026 12:00 UTC',
    distanceKm: 380,
    direction: 'SE (South-East)',
    isDemo: true
  },

  localRisk: {
    wind: {
      name: 'Strong Wind',
      level: 'HIGH',
      metric: '85–110 km/h peak gusts',
      explanation: 'Gale-force coastal winds capable of breaking large tree branches, uprooting small trees, and causing damage to kutcha roofs and loose metal sheets.',
      source: 'GenesisNet Numerical Gradient Analysis Overlay',
      lastUpdated: '03 Sep 2026 12:00 UTC',
      dataStatus: 'DEMO DATA',
      color: '#ef4444'
    },
    rainfall: {
      name: 'Heavy Rain',
      level: 'SEVERE',
      metric: '200–280 mm cumulative / 24h',
      explanation: 'Extremely heavy continuous downpours expected. High potential for waterlogging in low-lying roads, urban drains, and agricultural fields.',
      source: 'INSAT-3DR QPE & Precipitation Satellite Observation',
      lastUpdated: '03 Sep 2026 12:00 UTC',
      dataStatus: 'DEMO DATA',
      color: '#dc2626'
    },
    flooding: {
      name: 'Flooding',
      level: 'HIGH',
      metric: '0.5–1.2 m water depth in vulnerable pockets',
      explanation: 'Water stagnation and drainage congestion in low-elevation coastal panchayats, Chilika lagoon margins, and city backwaters.',
      source: 'Topographic DEM Inundation Model Feed',
      lastUpdated: '03 Sep 2026 11:00 UTC',
      dataStatus: 'DEMO DATA',
      color: '#f59e0b'
    },
    coastal: {
      name: 'Coastal / Storm-Surge Risk',
      level: 'HIGH',
      metric: '1.5–2.5 m surge over astronomical tide',
      explanation: 'Dangerous wave action and saline water ingress along open beaches and fishing hamlets during peak high tide hours.',
      source: 'INCOIS Hydrodynamic Surge Reference',
      lastUpdated: '03 Sep 2026 11:30 UTC',
      dataStatus: 'DEMO DATA',
      color: '#f59e0b'
    },
    landslide: {
      name: 'Landslide Risk',
      level: 'N/A',
      metric: 'Telemetry Not Connected',
      explanation: 'Coastal plain sector has low topographical slope risk. Hilly Ghats monitoring is currently not linked to this prototype feed.',
      source: 'Geological Survey of India (GSI)',
      lastUpdated: 'N/A',
      dataStatus: 'DATA NOT CONNECTED',
      color: '#64748b'
    }
  },

  aiSummary: {
    conditions: 'Favorable for Cyclonic Intensification',
    formationProbability: '76%',
    region: 'Central Bay of Bengal',
    horizon: 'Next 24 Hours',
    model: 'GenesisNet v0.1',
    status: 'EXPERIMENTAL AI OUTPUT',
    disclaimer: 'This is an experimental AI result and is not an official cyclone warning.',
    dataMode: 'demo'
  },

  nearbyHelp: [
    {
      id: 'help-shelter-1',
      category: 'Cyclone Shelters',
      name: 'Brahmagiri Multi-Purpose Cyclone Shelter (MPCS #14)',
      district: 'Puri',
      distance: '3.2 km',
      capacity: '1,200 persons • Standby Generator & Safe Borewell',
      status: 'DEMO LOCATION — NOT FOR REAL EMERGENCY USE',
      verified: false,
      contact: 'Data Source Not Connected'
    },
    {
      id: 'help-shelter-2',
      category: 'Cyclone Shelters',
      name: 'Astaranga Coastal Relief Shelter (MPCS #08)',
      district: 'Puri',
      distance: '7.8 km',
      capacity: '850 persons • First-Aid Station',
      status: 'DEMO LOCATION — NOT FOR REAL EMERGENCY USE',
      verified: false,
      contact: 'Data Source Not Connected'
    },
    {
      id: 'help-hosp-1',
      category: 'Hospitals / Health Facilities',
      name: 'District Headquarters Hospital (DHH) Puri',
      district: 'Puri',
      distance: '4.5 km',
      capacity: '24/7 Trauma & Emergency Casualty Ward',
      status: 'DEMO LOCATION — NOT FOR REAL EMERGENCY USE',
      verified: false,
      contact: 'Data Source Not Connected'
    },
    {
      id: 'help-relief-1',
      category: 'Relief Centres',
      name: 'Gopalpur Community Cyclone Relief Centre',
      district: 'Ganjam',
      distance: '1.8 km',
      capacity: '500 persons • Dry Ration & Cooked Meal Depot',
      status: 'DEMO LOCATION — NOT FOR REAL EMERGENCY USE',
      verified: false,
      contact: 'Data Source Not Connected'
    }
  ],

  safetyGuidance: {
    before: [
      {
        title: 'Inspect & Secure Your House',
        desc: 'Trim dead tree branches near power lines or roofs. Fasten loose asbestos or tin roofing sheets with nails or ropes. Clear drains around your boundary.'
      },
      {
        title: 'Prepare an Emergency Go-Bag',
        desc: 'Pack potable drinking water (at least 3 litres per person per day), dry biscuits, baby food, torchlight with extra cells, power bank, and a basic medical kit.'
      },
      {
        title: 'Fully Charge Devices & Battery Radio',
        desc: 'Charge smartphones and backup banks now. Power distribution will be preemptively cut before gale winds touch the shore.'
      },
      {
        title: 'Store Important Documents in Waterproof Bags',
        desc: 'Keep Aadhaar cards, voter IDs, land patta records, insurance papers, and bank passbooks inside sealed ziplock bags.'
      }
    ],
    during: [
      {
        title: 'Remain Indoors in the Strongest Room',
        desc: 'Stay away from windows, glass doors, and exterior brick walls. If living in a thatched house near the sea, move to the nearest cyclone shelter.'
      },
      {
        title: 'Beware of the Cyclone Eye False Calm',
        desc: 'If winds suddenly drop to dead silence and the sky clears, the eye is passing over you. DO NOT go outside—gale winds will violently resume from the opposite direction within minutes.'
      },
      {
        title: 'Turn Off Main Power Switch & LPG Valve',
        desc: 'Shut off electricity at the main board and disconnect cooking gas regulator to prevent short circuits and fire outbreaks.'
      },
      {
        title: 'Never Walk or Drive Through Floodwaters',
        desc: 'Moving floodwaters can conceal open manholes, live electric wires, or washed-away culverts. 15 cm of fast water can sweep you away.'
      }
    ],
    after: [
      {
        title: 'Wait for the Official All-Clear Bulletin',
        desc: 'Do not leave designated shelter until state disaster management authorities explicitly announce that danger has passed.'
      },
      {
        title: 'Treat All Downed Cables as Electrified',
        desc: 'Stay at least 10 meters away from fallen poles and sagging wires. Inform power distribution helplines immediately.'
      },
      {
        title: 'Boil or Disinfect All Drinking Water',
        desc: 'Floodwaters contaminate municipal pipelines and borewells. Boil water vigorously for 5 minutes before drinking or cooking.'
      },
      {
        title: 'Check for Gas Leaks Before Lighting Flames',
        desc: 'Inspect walls for cracks before reoccupying. Do not light matches or turn on switches if any smell of LPG gas is noticed.'
      }
    ],
    floodSafety: [
      {
        title: 'Move to Elevated Ground Early',
        desc: 'If water levels begin rising in your street, do not hesitate or wait for nightfall. Assist children, pregnant mothers, and elderly neighbours first.'
      },
      {
        title: 'Avoid Drainage Channels & Underpasses',
        desc: 'Culverts, road dips, and canal banks can experience sudden surges during high tide cycles.'
      }
    ],
    coastalSafety: [
      {
        title: 'Total Suspension of Coastal & Marine Activities',
        desc: 'No fishing boats or trawlers should venture out. Keep all boats tied to secure inland mooring points well above high-tide level.'
      },
      {
        title: 'Keep Clear of Sea Walls & Beaches',
        desc: 'Rough surf and breaking storm waves can breach seawalls without warning.'
      }
    ],
    powerSafety: [
      {
        title: 'Disconnect Major Appliances',
        desc: 'Unplug televisions, refrigerators, and motors to protect them from high-voltage spikes when power is restored.'
      },
      {
        title: 'Use LED Torches Instead of Wax Candles',
        desc: 'Wind drafts through broken window panes can easily tip candles over and start fires.'
      }
    ]
  },

  preparednessChecklist: [
    { id: 'prep-1', category: 'Official Updates', label: 'Monitor verified announcements on All India Radio or official district portal', recommended: true },
    { id: 'prep-2', category: 'Communication', label: 'Charge all mobile devices and backup power banks to 100%', recommended: true },
    { id: 'prep-3', category: 'Supplies', label: 'Store 3 days of safe drinking water and dry non-perishable food', recommended: true },
    { id: 'prep-4', category: 'Medical', label: 'Keep essential daily medicines and first-aid supplies handy', recommended: true },
    { id: 'prep-5', category: 'Documents', label: 'Seal identity and land title documents in waterproof plastic pouches', recommended: true },
    { id: 'prep-6', category: 'Shelter', label: 'Confirm route and location of nearest designated cyclone shelter', recommended: true },
    { id: 'prep-7', category: 'Home', label: 'Fasten loose roof sheets and clear water drainage paths', recommended: true },
    { id: 'prep-8', category: 'Safety', label: 'Avoid coastal travel and stay indoors once gale winds commence', recommended: true }
  ]
};

export default {
  REGIONS,
  TIMESTAMPS,
  OBSERVATION_FRAMES,
  DATA_PROVENANCE,
  MODEL_SPECS,
  ROLES_DEFINITION,
  BASINS,
  STATES_DISTRICTS,
  ACTIVE_SYSTEM_TRAJECTORY,
  CRITICAL_INFRASTRUCTURE,
  DISTRICT_IMPACT_DATA,
  HAZARD_ASSESSMENT_DATA,
  INITIAL_EMERGENCY_REQUESTS,
  RESPONSE_TEAMS,
  EVENT_TIMELINE_DATA,
  OFFICIAL_BULLETINS,
  OFFICIAL_PUBLIC_COMMUNICATIONS,
  PREPAREDNESS_INDICATORS,
  HISTORICAL_CYCLONES,
  PARAMETER_INFO,
  CITIZEN_DASHBOARD_DATA
};



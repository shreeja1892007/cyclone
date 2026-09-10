import {
  SATELLITE_CONFIG,
  getAvailableSatellites,
  getSatelliteConfig,
  getSatelliteBands,
  getObservationMetadata,
  getObservation,
  getSatelliteCoverage,
  checkTemporalCompatibility,
  checkSpatialCompatibility,
  checkResolutionCompatibility,
  getMultiSourceSummary
} from '../src/services/satelliteService.js';

console.log('--- TESTING SATELLITE SERVICE ---');

// 1. Available satellites list
const satellites = getAvailableSatellites();
console.log('Configured satellites count:', satellites.length);
console.assert(satellites.length === 5, 'Expected 5 configured satellites');

const connectedSats = satellites.filter(s => s.isConnected).map(s => s.name);
const offlineSats = satellites.filter(s => !s.isConnected).map(s => s.name);
console.log('Connected Satellites:', connectedSats);
console.log('Not Connected Satellites:', offlineSats);

console.assert(connectedSats.includes('INSAT-3DR'), 'INSAT-3DR should be connected');
console.assert(connectedSats.includes('INSAT-3D'), 'INSAT-3D should be connected');
console.assert(offlineSats.includes('Himawari-9'), 'Himawari should be not connected');
console.assert(offlineSats.includes('Meteosat-9 (IODC)'), 'Meteosat should be not connected');
console.assert(offlineSats.includes('GOES-16 (GOES-East)'), 'GOES should be not connected');

// 2. Bands
const insat3drBands = getSatelliteBands('insat3dr');
console.log('INSAT-3DR bands count:', insat3drBands.length);
console.assert(insat3drBands.length === 6, 'INSAT-3DR should have 6 bands');

const himawariBands = getSatelliteBands('himawari');
console.log('Himawari offline bands available status:', himawariBands.every(b => !b.available));

// 3. Metadata
const meta3dr = getObservationMetadata('insat3dr', '03 Sep 2026 12:00 UTC');
console.log('INSAT-3DR Status:', meta3dr.dataStatus);
console.assert(meta3dr.dataStatus === 'OPERATIONAL', 'INSAT-3DR should be OPERATIONAL');

const meta3d = getObservationMetadata('insat3d', '03 Sep 2026 12:00 UTC');
console.log('INSAT-3D Status:', meta3d.dataStatus);
console.assert(meta3d.dataStatus === 'DEMO DATA', 'INSAT-3D should be DEMO DATA');

const metaHima = getObservationMetadata('himawari', '03 Sep 2026 12:00 UTC');
console.log('Himawari Status:', metaHima.dataStatus);
console.assert(metaHima.dataStatus === 'NOT CONNECTED', 'Himawari should be NOT CONNECTED');

// 4. Temporal Compatibility
const temporal1 = checkTemporalCompatibility('2026-09-03T12:00:00Z', '2026-09-03T12:10:00Z', 15);
console.log('Temporal test (10 min diff):', temporal1.status, temporal1.label);
console.assert(temporal1.status === 'TEMPORALLY ALIGNED', '10m diff should be TEMPORALLY ALIGNED');

const temporal2 = checkTemporalCompatibility('2026-09-03T12:00:00Z', '2026-09-03T12:45:00Z', 15);
console.log('Temporal test (45 min diff):', temporal2.status, temporal2.label);
console.assert(temporal2.status === 'TIME MISMATCH', '45m diff should be TIME MISMATCH');

// 5. Spatial Compatibility
const spatialNIO = checkSpatialCompatibility('insat3dr', 'insat3d');
console.log('Spatial INSAT-3DR vs INSAT-3D:', spatialNIO.status);
console.assert(spatialNIO.status === 'OVERLAPPING COVERAGE', 'INSAT-3DR + 3D should have OVERLAPPING COVERAGE');

const spatialGOES = checkSpatialCompatibility('insat3dr', 'goes');
console.log('Spatial INSAT-3DR vs GOES:', spatialGOES.status);
console.assert(spatialGOES.status === 'NO OVERLAPPING COVERAGE', 'INSAT-3DR + GOES should have NO OVERLAPPING COVERAGE');

const spatialHima = checkSpatialCompatibility('insat3dr', 'himawari');
console.log('Spatial INSAT-3DR vs Himawari:', spatialHima.status);
console.assert(spatialHima.status === 'PARTIAL OVERLAP', 'INSAT-3DR + Himawari should have PARTIAL OVERLAP');

// 6. Resolution Compatibility
const resMatch = checkResolutionCompatibility('insat3dr', 'insat3d', 'ir', 'ir');
console.log('Resolution 4km vs 4km:', resMatch.status, resMatch.resamplingStatus);
console.assert(resMatch.status === 'MATCHED', '4km vs 4km should be MATCHED');

const resDiff = checkResolutionCompatibility('insat3dr', 'insat3dr', 'vis', 'ir');
console.log('Resolution 1km vs 4km:', resDiff.status, resDiff.resamplingStatus);
console.assert(resDiff.status === 'RESAMPLING REQUIRED', '1km vs 4km should be RESAMPLING REQUIRED');
console.assert(resDiff.resamplingStatus === 'RESAMPLING NOT IMPLEMENTED', 'Should display RESAMPLING NOT IMPLEMENTED');

// 7. Multi-source summary
const summary = getMultiSourceSummary('insat3dr', 'insat3d', 'ir', 'ir', '03 Sep 2026 12:00 UTC');
console.log('Summary Fusion Status:', summary.fusionStatus);
console.log('Summary Prototype Notice:', summary.prototypeNotice);
console.log('Summary Model Status:', summary.modelStatus);
console.assert(summary.prototypeNotice === 'MULTI-SOURCE FUSION PIPELINE — PROTOTYPE');
console.assert(summary.modelStatus === 'FUSION MODEL NOT CONNECTED');

console.log('--- ALL SATELLITE SERVICE UNIT TESTS PASSED! ---');

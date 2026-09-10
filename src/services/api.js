/**
 * CycloVision AI — API Service Interface
 * Provides asynchronous accessor methods that currently resolve with centralized mock data,
 * and will seamlessly bind to the FastAPI / Python ML backend in future iterations.
 */

import {
  REGIONS,
  TIMESTAMPS,
  OBSERVATION_FRAMES,
  ACTIVE_SYSTEM_TRAJECTORY,
  MODEL_SPECS,
  DATA_PROVENANCE,
  HISTORICAL_CYCLONES,
  PARAMETER_INFO
} from './mockData';

const SIMULATE_LATENCY = 80;

export async function fetchRegions() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return REGIONS;
}

export async function fetchObservationTimestamps() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return TIMESTAMPS;
}

export async function fetchObservationFrame(frameId = 't6') {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  const frame = OBSERVATION_FRAMES[frameId] || OBSERVATION_FRAMES['t6'];
  return {
    ...frame,
    dataType: 'demo',
    model: MODEL_SPECS
  };
}

export async function fetchActiveTrajectory() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return ACTIVE_SYSTEM_TRAJECTORY;
}

export async function fetchModelValidation() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return MODEL_SPECS.validation;
}

export async function fetchDataProvenance() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return DATA_PROVENANCE;
}

export async function fetchHistoricalCyclones() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return HISTORICAL_CYCLONES;
}

export async function fetchParameterDictionary() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return PARAMETER_INFO;
}

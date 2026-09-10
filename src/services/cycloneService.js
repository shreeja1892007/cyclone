/**
 * CycloVision AI — Cyclone Intelligence & Hazard Service
 * Provides centralized data access for:
 * - District impact assessments
 * - Hazard breakdown
 * - Preparedness indicators
 * - Critical infrastructure
 * - Event timeline
 */

import {
  DISTRICT_IMPACT_DATA,
  HAZARD_ASSESSMENT_DATA,
  PREPAREDNESS_INDICATORS,
  CRITICAL_INFRASTRUCTURE,
  EVENT_TIMELINE_DATA,
  STATES_DISTRICTS,
  CITIZEN_DASHBOARD_DATA
} from './mockData';

const SIMULATE_LATENCY = 50;

export async function fetchDistrictImpactData() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return DISTRICT_IMPACT_DATA.map((d) => ({
    ...d,
    dataMode: 'demo'
  }));
}

export async function fetchHazardAssessment() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return HAZARD_ASSESSMENT_DATA.map((h) => ({
    ...h,
    dataMode: 'demo'
  }));
}

export async function fetchPreparednessIndicators() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return PREPAREDNESS_INDICATORS.map((p) => ({
    ...p,
    dataMode: 'demo'
  }));
}

export async function fetchCriticalInfrastructure() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return CRITICAL_INFRASTRUCTURE.map((c) => ({
    ...c,
    dataMode: 'demo'
  }));
}

export async function fetchEventTimeline() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return EVENT_TIMELINE_DATA.map((e) => ({
    ...e,
    dataMode: 'demo'
  }));
}

export async function fetchStatesAndDistricts() {
  return STATES_DISTRICTS;
}

export async function fetchCitizenDashboardData() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return {
    ...CITIZEN_DASHBOARD_DATA,
    dataMode: 'demo'
  };
}


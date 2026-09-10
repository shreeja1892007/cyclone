/**
 * CycloVision AI — Official Data Service
 * Exposes official government bulletins, advisories, and public communications.
 * Strictly maintains isolation between official bulletins and AI experimental outputs.
 */

import { OFFICIAL_BULLETINS, OFFICIAL_PUBLIC_COMMUNICATIONS } from './mockData';

const SIMULATE_LATENCY = 60;

export async function fetchOfficialBulletins() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return OFFICIAL_BULLETINS.map((b) => ({
    ...b,
    isOfficial: true,
    dataMode: 'demo-official-feed'
  }));
}

export async function fetchPublicCommunications() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_LATENCY));
  return OFFICIAL_PUBLIC_COMMUNICATIONS.map((c) => ({
    ...c,
    isOfficial: true,
    dataMode: 'demo-official-feed'
  }));
}

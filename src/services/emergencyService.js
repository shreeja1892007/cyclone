/**
 * CycloVision AI — Emergency Service
 * Manages the Citizen Distress Reports and Response Coordination data store.
 * Reactive pub/sub architecture supporting two-way communication between
 * citizens and the Government Emergency Operations Centre (EOC).
 */

import { INITIAL_EMERGENCY_REQUESTS, RESPONSE_TEAMS } from './mockData';

const STORAGE_KEY_REQUESTS = 'cyclovision_emergency_requests_v1';
const STORAGE_KEY_TEAMS = 'cyclovision_response_teams_v1';

class EmergencyService {
  constructor() {
    this.subscribers = new Set();
    this.requests = this._loadInitialRequests();
    this.teams = this._loadInitialTeams();
  }

  _loadInitialRequests() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_REQUESTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    return [...INITIAL_EMERGENCY_REQUESTS];
  }

  _loadInitialTeams() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TEAMS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    return [...RESPONSE_TEAMS];
  }

  _persist() {
    try {
      localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(this.requests));
      localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(this.teams));
    } catch (e) {
      console.warn('Could not persist to localStorage:', e);
    }
    this._notify();
  }

  _notify() {
    this.subscribers.forEach((callback) => {
      try {
        callback(this.getRequests(), this.getTeams());
      } catch (err) {
        console.error('Error notifying subscriber:', err);
      }
    });
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.getRequests(), this.getTeams());
    return () => {
      this.subscribers.delete(callback);
    };
  }

  getRequests() {
    return [...this.requests];
  }

  getTeams() {
    return [...this.teams];
  }

  getSummary() {
    const total = this.requests.length;
    const critical = this.requests.filter((r) => r.confirmedPriority === 'CRITICAL' || (r.confirmedPriority === 'Pending Confirmation' && r.suggestedPriority === 'CRITICAL')).length;
    const high = this.requests.filter((r) => r.confirmedPriority === 'HIGH' || (r.confirmedPriority === 'Pending Confirmation' && r.suggestedPriority === 'HIGH')).length;
    const pendingVerification = this.requests.filter((r) => r.verification === 'Pending Verification').length;
    const responding = this.requests.filter((r) => r.status === 'Responding' || r.status === 'Team Assigned').length;
    const resolved = this.requests.filter((r) => r.status === 'Resolved').length;

    return {
      totalActive: total - resolved,
      critical,
      high,
      pendingVerification,
      responding,
      resolved,
      total
    };
  }

  /**
   * Submit a new distress request from the citizen interface
   */
  createEmergencyRequest({
    location,
    coordinates,
    district,
    state = 'Odisha',
    emergencyType,
    peopleReported = 1,
    message,
    contact,
    hasPhoto = false,
    photoUrl = null
  }) {
    const nextNum = 1040 + this.requests.length + 1;
    const id = `CV-${nextNum}`;
    const now = new Date();
    const timeFormatted = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')} UTC`;

    // Rule-assisted priority suggestion
    let suggestedPriority = 'MODERATE';
    const typeUpper = (emergencyType || '').toUpperCase();
    const count = parseInt(peopleReported, 10) || 1;
    if (typeUpper.includes('MEDICAL') || typeUpper.includes('TRAPPED') || count >= 5) {
      suggestedPriority = 'CRITICAL';
    } else if (typeUpper.includes('FLOOD') || typeUpper.includes('EVACUAT') || count >= 3) {
      suggestedPriority = 'HIGH';
    }

    const newRequest = {
      id,
      timestamp: `03 Sep ${timeFormatted}`,
      location: location || 'Coastal Location (GPS Pin)',
      coordinates: coordinates || [19.80, 85.82],
      district: district || 'Puri',
      state,
      emergencyType: emergencyType || 'Other',
      peopleReported: count,
      message: message || 'Citizen emergency assistance requested.',
      hasPhoto,
      photoUrl,
      contact: contact || '+91 98000 00000',
      suggestedPriority,
      confirmedPriority: 'Pending Confirmation',
      verification: 'Pending Verification',
      assignedTeam: 'Not Assigned',
      status: 'Received',
      timeline: [
        {
          time: timeFormatted,
          action: 'Distress report submitted via Citizen Emergency Connect',
          actor: 'Citizen'
        },
        {
          time: timeFormatted,
          action: `Automated assessment: System Suggested Priority [${suggestedPriority}]`,
          actor: 'AI Rule Engine'
        }
      ]
    };

    // Prepend to requests list
    this.requests = [newRequest, ...this.requests];
    this._persist();

    return newRequest;
  }

  /**
   * Update verification status (Pending -> Verified)
   */
  verifyRequest(requestId, isVerified = true, officialNote = '') {
    const now = new Date();
    const timeFormatted = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')} UTC`;

    this.requests = this.requests.map((req) => {
      if (req.id === requestId) {
        const verification = isVerified ? 'Verified' : 'Unverified';
        const newStatus = req.status === 'Received' ? 'Verified' : req.status;
        return {
          ...req,
          verification,
          status: newStatus,
          timeline: [
            ...req.timeline,
            {
              time: timeFormatted,
              action: `Verification updated: ${verification}${officialNote ? ` (${officialNote})` : ''}`,
              actor: 'EOC Verification Desk'
            }
          ]
        };
      }
      return req;
    });

    this._persist();
  }

  /**
   * Confirm official priority (CRITICAL, HIGH, MODERATE, LOW)
   */
  confirmPriority(requestId, confirmedPriority, officialName = 'Authorized Officer') {
    const now = new Date();
    const timeFormatted = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')} UTC`;

    this.requests = this.requests.map((req) => {
      if (req.id === requestId) {
        return {
          ...req,
          confirmedPriority,
          status: req.status === 'Received' || req.status === 'Verified' ? 'Prioritized' : req.status,
          timeline: [
            ...req.timeline,
            {
              time: timeFormatted,
              action: `Official Priority confirmed as [${confirmedPriority}]`,
              actor: officialName
            }
          ]
        };
      }
      return req;
    });

    this._persist();
  }

  /**
   * Assign a response team to this emergency
   */
  assignTeam(requestId, teamId) {
    const now = new Date();
    const timeFormatted = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')} UTC`;

    let assignedTeamName = 'Not Assigned';

    this.teams = this.teams.map((team) => {
      if (team.id === teamId) {
        assignedTeamName = team.name;
        return {
          ...team,
          currentStatus: 'Assigned',
          assignedEmergency: requestId,
          lastUpdate: timeFormatted
        };
      }
      return team;
    });

    this.requests = this.requests.map((req) => {
      if (req.id === requestId) {
        return {
          ...req,
          assignedTeam: assignedTeamName,
          status: 'Team Assigned',
          timeline: [
            ...req.timeline,
            {
              time: timeFormatted,
              action: `Response team assigned: ${assignedTeamName}`,
              actor: 'EOC Dispatch Desk'
            }
          ]
        };
      }
      return req;
    });

    this._persist();
  }

  /**
   * Update workflow status (Responding, Resolved, etc.)
   */
  updateStatus(requestId, status, note = '', actor = 'EOC Dispatcher') {
    const now = new Date();
    const timeFormatted = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')} UTC`;

    this.requests = this.requests.map((req) => {
      if (req.id === requestId) {
        return {
          ...req,
          status,
          timeline: [
            ...req.timeline,
            {
              time: timeFormatted,
              action: `Status marked: ${status}${note ? ` — ${note}` : ''}`,
              actor
            }
          ]
        };
      }
      return req;
    });

    // If resolved, free up the assigned team if any
    if (status === 'Resolved') {
      this.teams = this.teams.map((team) => {
        if (team.assignedEmergency === requestId) {
          return {
            ...team,
            currentStatus: 'Available',
            assignedEmergency: 'None',
            lastUpdate: timeFormatted
          };
        }
        return team;
      });
    } else if (status === 'Responding') {
      this.teams = this.teams.map((team) => {
        if (team.assignedEmergency === requestId) {
          return {
            ...team,
            currentStatus: 'Responding',
            lastUpdate: timeFormatted
          };
        }
        return team;
      });
    }

    this._persist();
  }

  /**
   * Reset to initial prototype data
   */
  resetPrototypeData() {
    this.requests = [...INITIAL_EMERGENCY_REQUESTS];
    this.teams = [...RESPONSE_TEAMS];
    this._persist();
  }
}

export const emergencyService = new EmergencyService();

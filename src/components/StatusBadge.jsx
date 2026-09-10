import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Clock, Cpu, HelpCircle, Layers } from 'lucide-react';

export default function StatusBadge({ status, label, size = 'md', className = '' }) {
  let badgeClass = 'sci-badge-neutral';
  let Icon = HelpCircle;
  let text = label || status;

  switch (status?.toLowerCase()) {
    case 'available':
    case 'valid':
    case 'processed':
    case 'operational':
      badgeClass = 'sci-badge-green';
      Icon = CheckCircle2;
      text = label || 'Available';
      break;

    case 'caution':
    case 'delayed':
    case 'warning':
    case 'moderate':
      badgeClass = 'sci-badge-amber';
      Icon = AlertTriangle;
      text = label || 'Delayed';
      break;

    case 'missing':
    case 'error':
    case 'unavailable':
      badgeClass = 'sci-badge-amber'; // Amber per spec: "Caution/Missing: Amber + text/icon"
      Icon = AlertTriangle;
      text = label || 'Missing';
      break;

    case 'interpolated':
      badgeClass = 'sci-badge-purple';
      Icon = Layers;
      text = label || 'Interpolated';
      break;

    case 'not_used':
      badgeClass = 'sci-badge-neutral';
      Icon = Clock;
      text = label || 'Not Used';
      break;

    case 'demo':
    case 'demo detection':
    case 'demo classification':
      badgeClass = 'sci-badge-cyan';
      Icon = Cpu;
      break;

    case 'experimental':
    case 'experimental model output':
      badgeClass = 'sci-badge-teal';
      Icon = Cpu;
      break;

    case 'awaiting ml evaluation':
      badgeClass = 'sci-badge-amber';
      Icon = Clock;
      text = label || 'Awaiting ML Evaluation';
      break;

    default:
      badgeClass = 'sci-badge-neutral';
      Icon = HelpCircle;
  }

  return (
    <span className={`sci-badge ${badgeClass} ${className}`}>
      <Icon size={12} strokeWidth={2.2} />
      <span>{text}</span>
    </span>
  );
}

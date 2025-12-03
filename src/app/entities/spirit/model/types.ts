export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';
export type SpiritStatus = 'active' | 'captured';

export interface Spirit {
  id: string;
  name: string;
  threatLevel: ThreatLevel;
  location: string;
  status: SpiritStatus;
  lastUpdated: Date;
}

export interface SpiritUpdateEvent {
  spiritId: string;
  newThreatLevel: ThreatLevel;
}

export interface CaptureSpiritRequest {
  spiritId: string;
}

export interface CaptureSpiritResponse {
  success: boolean;
  message: string;
  spirit: Spirit;
}

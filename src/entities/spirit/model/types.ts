export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';
export type SpiritStatus = 'active' | 'contained' | 'neutralized';
export type CapturePriority = 'low' | 'medium' | 'high';

export interface Spirit {
  id: string;
  name: string;
  threatLevel: ThreatLevel;
  location: string;
  status: SpiritStatus;
  lastUpdated: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SpiritCaptureRequest {
  spiritId: string;
  squadId: string;
  priority: CapturePriority;
}

import { Spirit, ThreatLevel, SpiritStatus } from '@/app/entities/spirit/model/types';
import { SPIRIT_NAMES, TOKYO_LOCATIONS } from '@/app/entities/spirit/model/constants';

export function generateMockSpirits(count: number = 10): Spirit[] {
  const spirits: Spirit[] = [];
  const threatLevels: ThreatLevel[] = ['low', 'medium', 'high', 'critical'];
  const statuses: SpiritStatus[] = ['active', 'captured'];
  
  for (let i = 0; i < count; i++) {
    spirits.push({
      id: \`spirit-\${i + 1}\`,
      name: SPIRIT_NAMES[Math.floor(Math.random() * SPIRIT_NAMES.length)],
      threatLevel: threatLevels[Math.floor(Math.random() * threatLevels.length)],
      location: TOKYO_LOCATIONS[Math.floor(Math.random() * TOKYO_LOCATIONS.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastUpdated: new Date(),
    });
  }
  
  return spirits;
}

export function updateRandomSpiritThreat(spirits: Spirit[]): {
  spiritId: string;
  newThreatLevel: ThreatLevel;
} {
  const threatLevels: ThreatLevel[] = ['low', 'medium', 'high', 'critical'];
  const randomSpirit = spirits[Math.floor(Math.random() * spirits.length)];
  const newThreatLevel = threatLevels[Math.floor(Math.random() * threatLevels.length)];
  
  return {
    spiritId: randomSpirit.id,
    newThreatLevel,
  };
}

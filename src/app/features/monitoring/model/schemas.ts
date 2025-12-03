import { z } from 'zod';

export const spiritSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  threatLevel: z.enum(['low', 'medium', 'high', 'critical']),
  location: z.string().min(1).max(100),
  status: z.enum(['active', 'captured']),
  lastUpdated: z.string().datetime(),
});

export const captureSpiritSchema = z.object({
  spiritId: z.string().uuid(),
});

export const threatUpdateEventSchema = z.object({
  type: z.literal('threat_update'),
  data: z.object({
    spiritId: z.string().uuid(),
    newThreatLevel: z.enum(['low', 'medium', 'high', 'critical']),
  }),
});

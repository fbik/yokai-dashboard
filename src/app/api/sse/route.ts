import { NextRequest } from 'next/server';
import { generateMockSpirits, updateRandomSpiritThreat } from '@/app/features/monitoring/model/mocks';
import { threatUpdateEventSchema } from '@/app/features/monitoring/model/schemas';

export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const spirits = generateMockSpirits(10);
      
      const sendEvent = (data: any) => {
        const message = \`data: \${JSON.stringify(data)}\n\n\`;
        controller.enqueue(encoder.encode(message));
      };
      
      // Heartbeat для поддержания соединения
      const heartbeatInterval = setInterval(() => {
        sendEvent({ type: 'heartbeat', timestamp: Date.now() });
      }, 30000);
      
      // Обновляем уровень угроз каждые 5 секунд
      const updateInterval = setInterval(() => {
        const update = updateRandomSpiritThreat(spirits);
        
        const event = threatUpdateEventSchema.parse({
          type: 'threat_update',
          data: update,
        });
        
        sendEvent(event);
      }, 5000);
      
      // Обработка закрытия соединения
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeatInterval);
        clearInterval(updateInterval);
        controller.close();
      });
    },
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Content-Encoding': 'none',
    },
  });
}

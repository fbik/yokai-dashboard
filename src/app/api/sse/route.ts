import { NextRequest } from 'next/server';
import { 
  ThreatLevel, 
  Spirit 
} from '@/app/entities/spirit/model/types';
import { 
  generateMockSpirits, 
  updateRandomSpiritThreat 
} from '@/app/features/monitoring/model/mocks';

// Генерируем моковые данные
const mockSpirits: Spirit[] = generateMockSpirits(6);

export async function GET(request: NextRequest) {
  try {
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        
        // Отправляем начальные данные
        const initialData = {
          type: 'initial',
          spirits: mockSpirits.map(spirit => ({
            ...spirit,
            lastUpdated: spirit.lastUpdated.toISOString(),
          })),
        };
        
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`)
        );

        // Обновления каждые 5 секунд
        const interval = setInterval(() => {
          try {
            const { spiritId, newThreatLevel } = updateRandomSpiritThreat(mockSpirits);
            
            // Находим и обновляем духа
            const spiritIndex = mockSpirits.findIndex(spirit => spirit.id === spiritId);
            if (spiritIndex !== -1) {
              const oldThreatLevel = mockSpirits[spiritIndex].threatLevel;
              mockSpirits[spiritIndex] = {
                ...mockSpirits[spiritIndex],
                threatLevel: newThreatLevel,
                lastUpdated: new Date(),
              };
              
              const eventData = {
                type: 'threatUpdate',
                spiritId,
                oldThreatLevel,
                newThreatLevel,
                timestamp: new Date().toISOString(),
              };

              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(eventData)}\n\n`)
              );
            }
          } catch (error) {
            console.error('SSE update error:', error);
          }
        }, 5000);

        // Очистка при закрытии соединения
        request.signal.addEventListener('abort', () => {
          clearInterval(interval);
          controller.close();
        });

        // Heartbeat
        const heartbeat = setInterval(() => {
          controller.enqueue(encoder.encode(': heartbeat\n\n'));
        }, 30000);

        request.signal.addEventListener('abort', () => {
          clearInterval(heartbeat);
        });
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('SSE setup error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

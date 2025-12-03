import { NextRequest, NextResponse } from 'next/server';
import { generateMockSpirits } from '@/app/features/monitoring/model/mocks';

export async function GET(request: NextRequest) {
  try {
    // Искусственная задержка для имитации сети
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const spirits = generateMockSpirits(10);
    
    // Преобразуем даты в строки для JSON
    const serializedSpirits = spirits.map(spirit => ({
      ...spirit,
      lastUpdated: spirit.lastUpdated.toISOString(),
    }));
    
    return NextResponse.json(serializedSpirits);
  } catch (error) {
    console.error('Error fetching spirits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spirits' },
      { status: 500 }
    );
  }
}

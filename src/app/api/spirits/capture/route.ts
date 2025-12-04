import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { spiritId } = body;
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 30% вероятность ошибки (как в ТЗ)
    const shouldFail = Math.random() < 0.3;
    
    if (shouldFail) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to capture spirit. Spirit escaped!' 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `Spirit captured successfully`,
      spirit: {
        id: spiritId,
        status: 'captured',
        lastUpdated: new Date().toISOString(),
      },
    });
    
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to capture spirit' 
      },
      { status: 500 }
    );
  }
}

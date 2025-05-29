import { NextResponse } from 'next/server';
import { RainApiResponse } from '@/types/rain';

export async function GET() {
  try {
    const response = await fetch(
      'https://wic.heo.taipei/OpenData/API/Rain/Get?stationNo=&loginId=open_rain&dataKey=85452C1D',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // 設置緩存策略
        next: { revalidate: 300 }, // 5分鐘緩存
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RainApiResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching rain data:', error);
    return NextResponse.json(
      { error: '無法獲取雨量數據' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server'
import { muscleData } from '@/lib/muscle-data'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; 
  const muscle = muscleData[id];
  
  if (!muscle) {
    return NextResponse.json(
      { error: 'Muscle not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(muscle)
}

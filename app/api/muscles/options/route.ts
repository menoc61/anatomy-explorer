import { NextResponse } from 'next/server'
import { muscleData } from '@/lib/muscle-data'

export async function GET() {
  // Extract just the minimal data needed for the options list
  const options = Object.entries(muscleData).reduce((acc, [id, muscle]) => {
    acc[id] = {
      id,
      name: muscle.name
    }
    return acc
  }, {} as Record<string, { id: string, name: string }>)

  return NextResponse.json(options)
}

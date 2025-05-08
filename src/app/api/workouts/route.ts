import { PrismaClient } from '../../../generated/prisma'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

interface WorkoutData {
  name: string
  description: string | null
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as WorkoutData

    const workout = await prisma.workout.create({
      data: {
        name: body.name,
        description: body.description,
      },
    })

    return NextResponse.json(workout)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Something went wrong' },
      { status: 400 }
    )
  }
}

export async function GET() {
  try {
    const workouts = await prisma.workout.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      }
    })
    return NextResponse.json(workouts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch workouts' },
      { status: 500 }
    )
  }
}

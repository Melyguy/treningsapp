import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Interface for group creation data
interface GroupData {
    name: string
}

// Handle group creation
export async function POST(request: Request) {
    try {
        const body = await request.json() as GroupData;
        
        // Validate required fields
        if (!body.name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            )
        }

        // Create new group in database
        const group = await prisma.group.create({
            data: {
                name: body.name,
            }
        })

        return NextResponse.json(group, { status: 201 })
    } catch (error) {
        console.error('POST group error:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create group' },
            { status: 500 }
        )
    }
}

// Fetch all groups
export async function GET() {
    try {
        const groups = await prisma.group.findMany()
        return NextResponse.json(groups)
    } catch (error) {
        console.error('GET groups error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch groups' },
            { status: 500 }
        )
    }
}
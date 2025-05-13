import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Dynamic route handler that accepts a groupId parameter
export async function GET(
  request: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    // Convert the string groupId to number
    const groupId = parseInt(params.groupId);

    // Fetch all users in the specified group
    // Include user details but only select necessary fields
    const userGroups = await prisma.userGroup.findMany({
      where: {
        groupId: groupId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    return NextResponse.json(userGroups);
  } catch (error) {
    console.error('GET userGroup error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch group members' },
      { status: 500 }
    );
  }
}
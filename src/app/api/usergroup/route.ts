import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Interface defining the expected data structure for creating a user-group relationship
interface UserGroupData {
  userId: number;    // ID of the user to be added to the group
  groupId: number;   // ID of the group the user will join
  role?: string;     // Optional role for the user in the group
}

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const body = await request.json() as UserGroupData;

    // Check if the user is already a member of this group
    const existingUserGroup = await prisma.userGroup.findFirst({
      where: {
        userId: body.userId,
        groupId: body.groupId,
      },
    });

    // Prevent duplicate memberships
    if (existingUserGroup) {
      return NextResponse.json(
        { error: 'User is already in this group' },
        { status: 400 }
      );
    }

    // Create new user-group relationship in the database
    const userGroup = await prisma.userGroup.create({
      data: {
        userId: body.userId,
        groupId: body.groupId,
        role: body.role || 'member', // Default role if none provided
      },
    });

    // Return the created relationship with 201 (Created) status
    return NextResponse.json(userGroup, { status: 201 });
  } catch (error) {
    console.error('POST userGroup error:', error);
    return NextResponse.json(
      { error: 'Failed to add user to group' },
      { status: 500 }
    );
  }
}
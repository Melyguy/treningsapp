import { PrismaClient } from '../../../generated/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

interface UserData {
  name: string | null
  email: string
  age: number
  password: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as UserData
    const hashedPassword = await bcrypt.hash(body.password, 10)

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        age: body.age,
        password: hashedPassword,
      },
    })

    // Type assertion to handle password property
const { ...userWithoutPassword } = user as { password: string } & Record<string, any>
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Something went wrong' },
      { status: 400 }
    )
  }
}
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Generate a unique email using timestamp
 
  const workout = await prisma.workout.create({
    data: {
      name: 'Jumping Jacks',
      description: `Jumping jacks`,

    },
  })
  console.log('New user:', workout)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
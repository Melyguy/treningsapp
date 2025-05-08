import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Generate a unique email using timestamp
 
  const user = await prisma.user.create({
    data: {
      name: 'Daniel',
      email: `Daniel@prisma.io`,
      age: 100,
      password: 'password21',
    },
  })
  console.log('New user:', user)
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
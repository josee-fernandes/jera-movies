import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

export const prisma = new PrismaClient({
  log: ['query'],
})

prisma.$use((params, next) => {
  if (
    params.model === 'User' &&
    ['create', 'update'].includes(params.action) &&
    params.args.data.password
  ) {
    params.args.data.password = bcrypt.hashSync(params.args.data.password, 10)
  }
  return next(params)
})

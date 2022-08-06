import { User } from '@prisma/client';
import prisma from '../database/dbConfig.js';

export type NewUser = Omit<User, 'id'>;

async function insert(newUser: NewUser) {
  await prisma.user.create({
    data: newUser,
  });
}

async function findByEmail(userEmail: string) {
  const promise = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  return promise;
}

const userRepository = {
  insert,
  findByEmail,
};

export default userRepository;

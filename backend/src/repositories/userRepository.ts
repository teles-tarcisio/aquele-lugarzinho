import { User } from '@prisma/client';
import prisma from '../database/dbConfig.js';

export type NewUser = Omit<User, 'id'>;
export type UserLoginData = Omit<User, 'id' | 'nickname' >;

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

async function findByNickname(userNickname: string) {
  const promise = await prisma.user.findUnique({
    where: {
      nickname: userNickname,
    },
  });

  return promise;
}

async function findById(userId: number) {
  const promise = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return promise;
}

const userRepository = {
  insert,
  findByEmail,
  findByNickname,
  findById,
};

export default userRepository;

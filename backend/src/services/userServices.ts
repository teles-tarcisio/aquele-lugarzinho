import { userRepository } from '../repositories/index.js';
import { NewUser } from '../repositories/userRepository.js';
import {
  encryptPassword,
  decryptPassword,
  createToken,
  errorUtils,
} from '../utils/index.js';

async function isEmailUnique(userEmail: string) {
  const user = await userRepository.findByEmail(userEmail);
  if (user) {
    throw errorUtils.conflictError('email already registered');
  }

  return user;
}

async function userEmailExists(userEmail: string) {
  const user = await userRepository.findByEmail(userEmail);
  if (!user) {
    throw errorUtils.notFoundError('user email does not exist');
  }

  return user;
}

async function create(newUser: NewUser) {
  await isEmailUnique(newUser.email);

  const hashedPassword = await encryptPassword(newUser.password);
  newUser.password = hashedPassword;

  await userRepository.insert(newUser);
}

async function login(userData: NewUser) {
  const existingUser = await userEmailExists(userData.email);

  await decryptPassword(userData.password, existingUser.password);
  delete existingUser.password;

  const newToken = await createToken(existingUser);

  return newToken;
}

const userServices = {
  create,
  login,
  isEmailUnique,
  userEmailExists,
};

export default userServices;

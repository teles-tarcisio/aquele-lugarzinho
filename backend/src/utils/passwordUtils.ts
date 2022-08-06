import bcrypt from 'bcrypt';

const SALT = 10;

export async function encryptPassword(password: string): Promise<string> {
  const hashed = await bcrypt.hash(password, SALT);
  return hashed;
}

export async function decryptPassword(userPassword: string, hashedPassword: string) {
  const passwordMatch = await bcrypt.compare(userPassword, hashedPassword);
  if (!passwordMatch) {
    throw {
      type: 'unauthorized',
      message: 'incorrect password',
    };
  }
}

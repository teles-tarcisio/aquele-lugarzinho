import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorUtils } from '../utils/index.js';

dotenv.config();

const secretKey = process.env.JWT_SECRET;
//  token expires after 24h (in seconds):
const tokenConfig = { expiresIn: 60 * 60 * 24 };

export async function createToken(tokenData: Object) {
  return jwt.sign(tokenData, secretKey, tokenConfig);
}

export async function verifyToken(token: string) {
  try {
    const verifiedData = jwt.verify(token, secretKey);
    return verifiedData;
  } catch (error) {
    console.error(error);
    throw errorUtils.jwtError('Invalid or expired token');
  }
}

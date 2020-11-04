import crypto from 'crypto';
import argon2 from 'argon2';


const argon2Config = {
  hashLength: 32,
  timeCost: 3,
  memoryCost: 4096,
  parallelism: 1,
  type: argon2.argon2i,
  raw: false,
  version: 0x13,
  saltLength: 16,
}

export function generateSalt(len = 16) {
  return crypto.randomBytes(len).toString('hex');
}

export async function hash(password) {
  try {
    const hash = await argon2.hash(password, argon2Config);
    return hash;
  } catch(err) {
    console.error(err);
    return null;
  }
}

export async function verify(hash, pass) {
  try {
    return await argon2.verify(hash, pass);
  } catch (err) {
    console.error(err);
    return false;
  }
}

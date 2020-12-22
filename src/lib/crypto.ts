import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const ENCODING = 'base64';

// eslint-disable-next-line import/prefer-default-export
export function encrypt(encryptKey: string, encryptSaltKey: string, message: string) {
  if (!encryptKey || !encryptSaltKey) {
    throw new Error('ENCRYPT_KEY or ENCRYPT_SALT_KEY is not found');
  }
  const key = crypto.scryptSync(encryptKey, encryptSaltKey, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encryptedData = cipher.update(message);
  return Buffer.concat([iv, encryptedData, cipher.final()]).toString(ENCODING);
}

export function decrypt(encryptKey: string, encryptSaltKey: string, encrypted: string) {
  if (!encryptKey || !encryptSaltKey) {
    throw new Error('ENCRYPT_KEY or ENCRYPT_SALT_KEY is not found');
  }
  const key = crypto.scryptSync(encryptKey, encryptSaltKey, 32);
  const buff = Buffer.from(encrypted, 'base64');
  const iv = buff.slice(0, 16);
  // const encData = buff.slice(16);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  const decryptData = decipher.update(encrypted, ENCODING);
  return Buffer.concat([decryptData, decipher.final()]).toString('utf8');
}

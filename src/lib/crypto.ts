import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';

// eslint-disable-next-line import/prefer-default-export
export function encrypt(encryptKey: string, encryptSaltKey: string, message: string) {
  if (!encryptKey || !encryptSaltKey) {
    throw new Error('ENCRYPT_KEY or ENCRYPT_SALT_KEY is not found');
  }
  const key = crypto.scryptSync(encryptKey, encryptSaltKey, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encryptedData = cipher.update(message);
  return {
    iv, encryptedData: Buffer.concat([encryptedData, cipher.final()]),
  };
}

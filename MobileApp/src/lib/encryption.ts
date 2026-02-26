import CryptoJS from 'crypto-js';

// TODO: Move to environment variables
const ENCRYPTION_KEY = '';

export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();
};

export const decryptPassword = (encryptedPassword: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || encryptedPassword;
  } catch (err) {
    console.error("Decryption failed:", err);
    return encryptedPassword;
  }
};

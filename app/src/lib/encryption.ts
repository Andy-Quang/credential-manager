import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'default-secret-key-123';

export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();
};

export const decryptPassword = (encryptedPassword: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || encryptedPassword; // Return original if decryption fails (e.g. not encrypted yet)
  } catch (err) {
    console.error("Decryption failed:", err);
    return encryptedPassword;
  }
};

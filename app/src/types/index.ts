export interface Credential {
  id: string;
  userId: string;
  usedFor: string;
  account: string;
  password: string;
  createdDate: any; // Firestore Timestamp
}

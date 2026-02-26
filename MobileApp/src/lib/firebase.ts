import firebaseAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const auth = firebaseAuth();
export const db = firestore();
export const storageInstance = storage();

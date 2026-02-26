import { useEffect, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';
import { encryptPassword } from '../lib/encryption';
import { db } from '../lib/firebase';

export interface Credential {
  id: string;
  usedFor: string;
  account: string;
  password: string;
  userId: string;
  createdDate: any;
}

export function useCredentials(userId: string | undefined) {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setCredentials([]);
      setIsDataLoading(false);
      return;
    }

    setIsDataLoading(true);

    const unsubscribe = db.collection('credentials')
      .where('userId', '==', userId)
      .orderBy('usedFor', sortOrder)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Credential[];
        setCredentials(data);
        setIsDataLoading(false);
      }, (error) => {
        console.error("Error fetching credentials:", error);
        setIsDataLoading(false);
      });

    return unsubscribe;
  }, [userId, sortOrder]);

  const filteredCredentials = useMemo(() => {
    return credentials.filter(c =>
      c.usedFor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [credentials, searchTerm]);

  const addCredential = async (data: Partial<Credential>) => {
    if (!userId) return;
    setIsActionLoading(true);
    let action = {
        type: 'success',
        text1: 'Success',
        text2: 'Credential added successfully!'
      }

    try {
      const encryptedData = {
        ...data,
        password: data.password ? encryptPassword(data.password) : '',
        userId: userId,
        createdDate: new Date() // Or firestore.FieldValue.serverTimestamp()
      };
      await db.collection('credentials').add(encryptedData);
    } catch (err) {
      console.error("Error adding credential:", err);
      action = {
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add credential'
      }
    } finally {
      setIsActionLoading(false);
      Toast.show(action);
    }
  };

  const editCredential = async (id: string, data: Partial<Credential>) => {
    setIsActionLoading(true);
    let action = {
      type: 'success',
      text1: 'Success',
      text2: 'Credential updated successfully!'
    }

    try {
      const updateData = { ...data };
      if (updateData.password) {
        updateData.password = encryptPassword(updateData.password);
      }
      await db.collection('credentials').doc(id).update(updateData);
    } catch (err) {
      console.error("Error editing credential:", err);
      action = {
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update credential'
      }
    } finally {
      setIsActionLoading(false);
      Toast.show(action);
    }
  };

  const removeCredential = async (id: string) => {
    setIsActionLoading(true);
    let action = {
      type: 'success',
      text1: 'Success',
      text2: 'Credential deleted successfully!'
    }
    try {
      await db.collection('credentials').doc(id).delete();
    } catch (err) {
      console.error("Error deleting credential:", err);
    } finally {
      setIsActionLoading(false);
      Toast.show(action);
    }
  };

  return {
    credentials: filteredCredentials,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    isDataLoading,
    isActionLoading,
    addCredential,
    editCredential,
    removeCredential
  };
}

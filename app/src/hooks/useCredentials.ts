import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { encryptPassword } from '../lib/encryption';
import { db } from '../lib/firebase';
import type { Credential } from '../types';

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

    const q = query(
      collection(db, 'credentials'),
      where('userId', '==', userId),
      orderBy('usedFor', sortOrder)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
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
    try {
      const encryptedData = {
        ...data,
        password: data.password ? encryptPassword(data.password) : '',
        userId: userId,
        createdDate: Timestamp.now()
      };
      await addDoc(collection(db, 'credentials'), encryptedData);
      toast.success('Credential added successfully!');
    } catch (err) {
      console.error("Error adding credential:", err);
      toast.error('Failed to add credential');
      throw err;
    } finally {
      setIsActionLoading(false);
    }
  };

  const editCredential = async (id: string, data: Partial<Credential>) => {
    setIsActionLoading(true);
    try {
      const docRef = doc(db, 'credentials', id);
      const updateData = { ...data };
      if (updateData.password) {
        updateData.password = encryptPassword(updateData.password);
      }
      await updateDoc(docRef, updateData);
      toast.success('Credential updated successfully!');
    } catch (err) {
      console.error("Error editing credential:", err);
      toast.error('Failed to update credential');
      throw err;
    } finally {
      setIsActionLoading(false);
    }
  };

  const removeCredential = async (id: string) => {
    setIsActionLoading(true);
    try {
      await deleteDoc(doc(db, 'credentials', id));
      toast.success('Credential deleted successfully!');
    } catch (err) {
      console.error("Error deleting credential:", err);
      toast.error('Failed to delete credential');
      throw err;
    } finally {
      setIsActionLoading(false);
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

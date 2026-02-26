import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Search, Plus, LogOut, ArrowUpDown } from 'lucide-react-native';
import { auth } from '../lib/firebase';
import { useCredentials } from '../hooks/useCredentials';
import CredentialList from '../components/CredentialList';
import CredentialModal from '../components/CredentialModal';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

const DashboardScreen = () => {
  const user = auth.currentUser;
  const {
    credentials,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    isDataLoading,
    isActionLoading,
    addCredential,
    editCredential,
    removeCredential,
  } = useCredentials(user?.uid);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCredential, setEditingCredential] = useState<any>(null);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleAdd = () => {
    setEditingCredential(null);
    setModalVisible(true);
  };

  const handleEdit = (credential: any) => {
    setEditingCredential(credential);
    setModalVisible(true);
  };

  const handleSave = async (data: any) => {
    try {
      if (editingCredential) {
        await editCredential(editingCredential.id, data);
      } else {
        await addCredential(data);
      }
      setModalVisible(false);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleCopy = (password: string) => {
    Clipboard.setString(password);
    Toast.show({
      type: 'success',
      text1: 'Copied',
      text2: 'Password copied to clipboard',
    });
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View className="px-6 py-4 flex-row justify-between items-center">
        <View>
          <Text className="text-slate-400 text-sm">Dashboard</Text>
          <Text className="text-2xl font-bold text-slate-900 dark:text-white">
            Your Vault
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogout}
          className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm"
        >
          <LogOut size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <View className="px-6 mb-6">
        <View className="flex-row items-center space-x-3">
          <View className="flex-1 flex-row items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 h-12 shadow-sm mr-2">
            <Search size={20} color="#94a3b8" />
            <TextInput
              placeholder="Search services..."
              placeholderTextColor="#94a3b8"
              value={searchTerm}
              onChangeText={setSearchTerm}
              className="flex-1 ml-2 text-slate-900 dark:text-white"
            />
          </View>
          <TouchableOpacity
            onPress={toggleSort}
            className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <ArrowUpDown
              size={20}
              color={sortOrder === 'asc' ? '#3b82f6' : '#94a3b8'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 px-6">
        {isDataLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        ) : (
          <CredentialList
            credentials={credentials}
            onEdit={handleEdit}
            onDelete={removeCredential}
            onCopy={handleCopy}
          />
        )}
      </View>

      <TouchableOpacity
        onPress={handleAdd}
        className="absolute bottom-10 right-6 w-16 h-16 bg-blue-600 rounded-full items-center justify-center shadow-xl"
      >
        <Plus size={32} color="white" />
      </TouchableOpacity>

      <CredentialModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSave}
        initialData={editingCredential}
        loading={isActionLoading}
      />
    </>
  );
};

export default DashboardScreen;

import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Copy, Edit2, Trash2, Key } from 'lucide-react-native';
import { decryptPassword } from '../lib/encryption';

interface Credential {
  id: string;
  usedFor: string;
  account: string;
  password: string;
  createdDate: any;
}

interface CredentialListProps {
  credentials: Credential[];
  onEdit: (credential: Credential) => void;
  onDelete: (id: string) => void;
  onCopy: (password: string) => void;
}

const CredentialList: React.FC<CredentialListProps> = ({
  credentials,
  onEdit,
  onDelete,
  onCopy,
}) => {
  const renderItem = ({ item }: { item: Credential }) => (
    <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl items-center justify-center mr-3">
            <Key size={20} color="#3b82f6" />
          </View>
          <View className="flex-1">
            <Text
              className="text-lg font-bold text-slate-900 dark:text-white"
              numberOfLines={1}
            >
              {item.usedFor}
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-sm">
              {item.account}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row justify-between items-center border-t border-slate-50 dark:border-slate-700/50 pt-3">
        <Text className="text-slate-400 dark:text-slate-500 text-xs">
          Pass: ••••••••
        </Text>
        <View className="flex-row space-x-2">
          <TouchableOpacity
            onPress={() => onCopy(decryptPassword(item.password))}
            className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg mr-2"
          >
            <Copy size={18} color="#64748b" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onEdit(item)}
            className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mr-2"
          >
            <Edit2 size={18} color="#3b82f6" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Delete Credential',
                `Are you sure you want to delete the credential for ${item.usedFor}?`,
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => onDelete(item.id),
                  },
                ],
              );
            }}
            className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg"
          >
            <Trash2 size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={credentials}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View className="items-center justify-center py-20">
          <Text className="text-slate-400 dark:text-slate-500 text-lg">
            No credentials found
          </Text>
        </View>
      }
    />
  );
};

export default CredentialList;

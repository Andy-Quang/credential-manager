import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X, Eye, EyeOff } from 'lucide-react-native';

interface CredentialModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  loading?: boolean;
}

const CredentialModal: React.FC<CredentialModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  loading,
}) => {
  const [usedFor, setUsedFor] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setUsedFor(initialData.usedFor || '');
      setAccount(initialData.account || '');
      setPassword(''); // Don't pre-fill password for security or handle decryption
    } else {
      setUsedFor('');
      setAccount('');
      setPassword('');
    }
  }, [initialData, visible]);

  const handleSave = () => {
    onSubmit({ usedFor, account, password });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/50">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="bg-white dark:bg-slate-900 rounded-t-3xl p-6"
        >
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-slate-900 dark:text-white">
              {initialData ? 'Edit Credential' : 'Add Credential'}
            </Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <X size={24} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="space-y-4 flex flex-col gap-4">
              <View>
                <Text className="text-slate-700 dark:text-slate-300 mb-2 font-medium">
                  Used For
                </Text>
                <TextInput
                  value={usedFor}
                  onChangeText={setUsedFor}
                  placeholder="e.g. Google, GitHub"
                  placeholderTextColor="#94a3b8"
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 h-14 text-slate-900 dark:text-white"
                />
              </View>

              <View>
                <Text className="text-slate-700 dark:text-slate-300 mb-2 font-medium">
                  Account
                </Text>
                <TextInput
                  value={account}
                  onChangeText={setAccount}
                  placeholder="Username or Email"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="none"
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 h-14 text-slate-900 dark:text-white"
                />
              </View>

              <View>
                <Text className="text-slate-700 dark:text-slate-300 mb-2 font-medium">
                  Password
                </Text>
                <View className="flex-row items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 h-14">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter Password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry={!showPassword}
                    className="flex-1 text-slate-900 dark:text-white"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#94a3b8" />
                    ) : (
                      <Eye size={20} color="#94a3b8" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSave}
                disabled={loading}
                className="bg-blue-600 h-14 rounded-xl items-center justify-center mt-6 shadow-md"
              >
                <Text className="text-white font-bold text-lg">
                  {loading ? 'Saving...' : 'Save Credential'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default CredentialModal;

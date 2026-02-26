import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { auth } from '../lib/firebase';
import Toast from 'react-native-toast-message';
import { Lock, Mail } from 'lucide-react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields',
      });
      return;
    }

    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Logged in successfully!',
      });
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields',
      });
      return;
    }

    setLoading(true);
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Account created successfully!',
      });
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-50 dark:bg-slate-900 justify-center p-6"
    >
      <View className="mb-10 items-center">
        <View className="w-20 h-20 bg-blue-500 rounded-2xl items-center justify-center mb-4 shadow-lg">
          <Lock color="white" size={40} />
        </View>
        <Text className="text-3xl font-bold text-slate-900 dark:text-white">
          Credential Manager
        </Text>
        <Text className="text-slate-500 dark:text-slate-400 mt-2">
          Securely manage your passwords
        </Text>
      </View>

      <View className="space-y-4 flex flex-col gap-4">
        <View>
          <Text className="text-slate-700 dark:text-slate-300 mb-2 font-medium">
            Email Address
          </Text>
          <View className="flex-row items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 h-14">
            <Mail size={20} color="#94a3b8" />
            <TextInput
              placeholder="email@example.com"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 ml-3 text-slate-900 dark:text-white"
            />
          </View>
        </View>

        <View>
          <Text className="text-slate-700 dark:text-slate-300 mb-2 font-medium">
            Password
          </Text>
          <View className="flex-row items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 h-14">
            <Lock size={20} color="#94a3b8" />
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="flex-1 ml-3 text-slate-900 dark:text-white"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className="bg-blue-600 h-14 rounded-xl items-center justify-center mt-4 shadow-md"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          className="h-14 rounded-xl items-center justify-center border border-slate-200 dark:border-slate-700"
        >
          <Text className="text-slate-600 dark:text-slate-400 font-semibold">
            Create an Account
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        // In login.tsx I used 'token'. Let's stick to 'token'.

        if (token) {
          router.replace('/(tabs)');
        } else {
          router.replace('/auth/login');
        }
      } catch (e) {
        // Fallback to login if error
        router.replace('/auth/login');
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

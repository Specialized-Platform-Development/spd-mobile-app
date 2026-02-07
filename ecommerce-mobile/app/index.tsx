import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { authAPI } from "../src/api/api";

export default function LoginScreen() {
  const router = useRouter();
  // Ganti jadi Email
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan Password harus diisi");
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login(email, password);

      // Sesuai README: response.data = { success: true, data: { token: "..." } }
      // Jadi token ada di response.data.data.token (atau response.data.token tergantung backendnya)
      // Kita coba log dulu biar pasti:
      console.log("Respon Login:", response.data);

      const responseData = response.data;

      if (responseData.success) {
        // Asumsi token ada di dalam object 'data' (standar umum)
        // Kalau error "undefined", coba ganti jadi responseData.token
        const token = responseData.data?.token || responseData.token;

        await AsyncStorage.setItem("userToken", token);
        Alert.alert("Sukses", "Login Berhasil!");
        router.replace("/(tabs)");
      } else {
        Alert.alert("Gagal", responseData.message || "Login gagal");
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("Gagal", "Email atau password salah / Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marketplace Login</Text>

      {/* Input Email */}
      <TextInput
        style={styles.input}
        placeholder="Email (ex: john@example.com)"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <Button title="Masuk" onPress={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

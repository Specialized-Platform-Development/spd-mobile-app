// app/_layout.tsx

import { Stack } from "expo-router";
import { Colors } from "../constants/theme"; // Sesuaikan path jika perlu

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* PERBAIKAN DI SINI: Matikan Header Bawaan biar gak double */}
      <Stack.Screen name="product/[id]" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

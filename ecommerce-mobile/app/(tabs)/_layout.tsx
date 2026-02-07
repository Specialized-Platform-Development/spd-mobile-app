import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "../../constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,

        // 1. Hilangkan Header Atas Bawaan
        headerShown: false,

        tabBarButton: HapticTab,

        // 2. Hilangkan Tab Bar Bawah (Navbar Bawah)
        // Kita set display: 'none' supaya benar-benar hilang dari layar
        tabBarStyle: {
          display: "none",
          // Properti lain tidak perlu karena barnya sudah di-hide
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          // Icon tetap didefinisikan biar tidak error, walau tidak akan kelihatan
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

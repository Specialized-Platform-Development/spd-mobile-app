/**
 * Konfigurasi Warna Aplikasi
 * Disamakan dengan Desain Web (SPD Frontend Web)
 */

import { Platform } from "react-native";

// 1. Palet Warna Utama (Sesuai Web)
const sharedColors = {
  primary: "#2c3e50", // Navy Gelap
  accent: "#3498db", // Biru Terang
  danger: "#e74c3c", // Merah
  success: "#27ae60", // Hijau
  background: "#f5f5f5", // Abu-abu muda
  card: "#ffffff", // Putih
  text: "#2c3e50",
  textLight: "#7f8c8d",
  white: "#ffffff",
  border: "#ecf0f1",
};

export const Colors = {
  // --- BAGIAN INI YANG BIKIN ERROR HILANG ---
  // Kita export variabel yang dicari oleh file lain ke level paling atas
  ...sharedColors,
  tint: sharedColors.accent, // Alias untuk tint (dipakai di _layout.tsx)
  cardBackground: sharedColors.card, // Alias untuk cardBackground (dipakai di index.tsx)
  // ------------------------------------------

  // Konfigurasi Bawaan (Biar fitur dark mode expo tidak crash)
  light: {
    text: sharedColors.text,
    background: sharedColors.background,
    tint: sharedColors.accent,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: sharedColors.accent,
    cardBackground: sharedColors.card, // Tambahan
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: sharedColors.accent,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: sharedColors.white,
    cardBackground: "#232526", // Tambahan
  },
};

// Font config (tetap sama)
export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

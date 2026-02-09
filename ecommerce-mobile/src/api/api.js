import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// --- BAGIAN INI YANG HARUS DIUBAH ---

// 1. Cek CMD -> ipconfig -> IPv4 Address (di Wireless LAN adapter)
// Contoh: "192.168.1.5" atau "192.168.43.xxx" (kalau pakai hotspot)
// const LAPTOP_IP = "192.168.0.105"; // <--- GANTI X DENGAN ANGKA KAMU!

// 2. Pastikan PORT backend benar (Cek terminal backend, biasanya 5000 atau 8080)
// Di kode kamu tertulis 5001, pastikan backend kamu jalan di 5001 juga ya!
// const API_PORT = "5000";

const BASE_URL = `https://spd-backend-api.onrender.com/api`;

// ------------------------------------

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // Tambah timeout biar ketahuan kalau koneksi putus (10 detik)
});

// Interceptor Request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor Response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Debugging: Biar kelihatan error-nya apa di Console
    if (error.code === "ECONNABORTED") {
      console.log("Koneksi Timeout! Cek IP Address atau Firewall.");
    } else if (error.message === "Network Error") {
      console.log(
        "Network Error! Pastikan Laptop & HP satu jaringan dan IP benar.",
      );
    }
    return Promise.reject(error);
  },
);

export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (name, email, password) =>
    api.post("/auth/register", { name, email, password }),
};

export const productAPI = {
  getAll: () => api.get("/products"),
  getDetail: (id) => api.get(`/products/${id}`),
};

export default api;

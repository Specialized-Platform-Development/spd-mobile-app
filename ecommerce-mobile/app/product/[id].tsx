import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../../constants/theme";
import { productAPI } from "../../src/api/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const response = await productAPI.getDetail(id);
      if (response.data.success) {
        const data = response.data.data;
        setProduct(data.product ? data.product : data);
      }
    } catch (error) {
      console.error("Error Fetch Detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProductIcon = (name: string = "", category: string = "") => {
    const textToCheck = (name + " " + category).toLowerCase();
    if (textToCheck.includes("laptop")) return "laptop-outline";
    if (textToCheck.includes("phone") || textToCheck.includes("hp"))
      return "phone-portrait-outline";
    if (textToCheck.includes("watch") || textToCheck.includes("jam"))
      return "watch-outline";
    if (textToCheck.includes("camera") || textToCheck.includes("kamera"))
      return "camera-outline";
    if (textToCheck.includes("headphone") || textToCheck.includes("headset"))
      return "headset-outline";
    if (textToCheck.includes("shoe") || textToCheck.includes("sepatu"))
      return "footsteps-outline";
    if (textToCheck.includes("kopi") || textToCheck.includes("coffee"))
      return "cafe-outline";
    if (textToCheck.includes("baju") || textToCheck.includes("shirt"))
      return "shirt-outline";
    return "cube-outline";
  };

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1 }}
        color={Colors.accent}
      />
    );
  if (!product)
    return <Text style={styles.errorText}>Produk tidak ditemukan</Text>;

  const safePrice = product.price || 0;
  const iconName = getProductIcon(product.name, product.category);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Produk</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* ICON BESAR */}
          <View style={styles.iconContainer}>
            <Ionicons name={iconName as any} size={100} color={Colors.accent} />
          </View>

          <View style={styles.cardContent}>
            <View style={styles.badgeContainer}>
              <Text style={styles.category}>{product.category || "Umum"}</Text>
            </View>

            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>Rp {safePrice.toLocaleString()}</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Deskripsi</Text>
            <Text style={styles.description}>
              {product.description || "Tidak ada deskripsi untuk produk ini."}
            </Text>

            {/* TOMBOL KERANJANG SUDAH DIHAPUS */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: Colors.text },

  scrollContent: { paddingBottom: 30 },
  iconContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -30,
  },
  cardContent: {
    padding: 25,
    backgroundColor: Colors.card,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 400,
  },
  badgeContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#e1ecf4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 15,
  },
  category: {
    fontSize: 14,
    color: Colors.accent,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.text,
  },
  price: {
    fontSize: 24,
    color: Colors.danger,
    fontWeight: "bold",
    marginBottom: 20,
  },
  divider: { height: 1, backgroundColor: Colors.border, marginBottom: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: Colors.text,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textLight,
    marginBottom: 30,
  },
  errorText: { textAlign: "center", marginTop: 50, color: Colors.textLight },
});

import { Ionicons } from "@expo/vector-icons"; // Import Icon
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Platform,
    SafeAreaView,
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
  id?: string | number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductListScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await productAPI.getAll();
      if (response.data.success) {
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else if (response.data.data.products) {
          setProducts(response.data.data.products);
        }
      }
    } catch (error) {
      console.error("Error Fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIKA ICON PINTAR (Sama dengan Detail) ---
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

  const renderItem = ({ item }: { item: Product }) => {
    const iconName = getProductIcon(item.name, item.category);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/product/${item._id || item.id}` as any)}
      >
        {/* GANTI IMAGE JADI ICON */}
        <View style={styles.iconContainer}>
          <Ionicons name={iconName as any} size={40} color={Colors.accent} />
        </View>

        <View style={styles.info}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.price}>Rp {item.price.toLocaleString()}</Text>
          <Text style={styles.category}>{item.category || "Umum"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER CUSTOM */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Daftar Produk</Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.accent}
            style={{ marginTop: 50 }}
          />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => (item._id || Math.random()).toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Belum ada produk tersedia.</Text>
            }
          />
        )}
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    letterSpacing: 0.5,
  },
  list: { paddingHorizontal: 15, paddingBottom: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: Colors.cardBackground,
    marginBottom: 15,
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center", // Biar icon di tengah vertikal
  },
  // Style Container Icon di List
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#ecf0f1", // Abu-abu muda
    justifyContent: "center",
    alignItems: "center",
  },
  info: { flex: 1, marginLeft: 15, justifyContent: "center" },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    color: Colors.danger,
    fontWeight: "700",
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: Colors.textLight,
    textTransform: "uppercase",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: Colors.textLight,
    fontSize: 16,
  },
});

import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootProps } from "./types";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params;
  const { has, toggle } = useFavorites();

  const phone = PHONES.find((p) => p.id === id);

  if (!phone) {
    return (
      <View style={styles.notFoundCenter}>
        <Text style={styles.notFoundText}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const isFavorite = has(phone.id);

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageBox}>
          <Image
            source={PHONE_COLORS[phone.defaultColor].image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsBox}>
          <Text style={styles.title}>{phone.name}</Text>

          <View style={styles.row}>
            <Stars value={phone.rating} size={16} />
            <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            {phone.oldPrice > phone.price && (
              <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
            )}
          </View>

          <View style={styles.badgeRow}>
            <Text style={styles.badge}>{phone.badge}</Text>
          </View>

          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Nhà cung cấp:</Text>
            <Text style={styles.metaValue}>{phone.supplier}</Text>
          </View>

          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Màu mặc định:</Text>
            <Text style={styles.metaValue}>
              {PHONE_COLORS[phone.defaultColor].label}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          style={[styles.favBtn, isFavorite && styles.favBtnActive]}
          onPress={() => toggle(phone.id)}
        >
          <Text style={[styles.favBtnText, isFavorite && styles.favBtnTextActive]}>
            {isFavorite ? "♥ Đã lưu vào yêu thích" : "♡ Lưu vào yêu thích"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  imageBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsBox: {
    paddingTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  review: {
    fontSize: 13,
    color: colors.muted,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.red,
  },
  oldPrice: {
    fontSize: 15,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  badgeRow: {
    marginBottom: 16,
  },
  badge: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.red,
  },
  metaBox: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  metaLabel: {
    width: 120,
    fontSize: 14,
    color: colors.muted,
  },
  metaValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: "#fff",
  },
  favBtn: {
    borderWidth: 1.5,
    borderColor: colors.blue,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  favBtnActive: {
    backgroundColor: colors.red,
    borderColor: colors.red,
  },
  favBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.blue,
  },
  favBtnTextActive: {
    color: "#fff",
  },
  notFoundCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFoundText: {
    fontSize: 16,
    color: colors.red,
    fontWeight: "bold",
  },
});

import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { TabProps } from "./types";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const favoritePhones = PHONES.filter((p: Phone) => ids.includes(p.id));

  if (favoritePhones.length === 0) {
    return (
      <View style={[styles.container, styles.emptyCenter]}>
        <Text style={styles.emptyIcon}>💔</Text>
        <Text style={styles.emptyTitle}>Chưa có sản phẩm nào được lưu.</Text>
        <Text style={styles.emptySub}>
          Hãy bấm vào sản phẩm và nhấn nút "Lưu vào yêu thích" để xem tại đây.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritePhones}
        keyExtractor={(item: Phone) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: Phone }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("ProductDetails", { id: item.id })
            }
          >
            <Image
              source={PHONE_COLORS[item.defaultColor].image}
              style={styles.thumb}
              resizeMode="contain"
            />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={2}>
                {item.name}
              </Text>
              <View style={styles.ratingRow}>
                <Stars value={item.rating} size={13} />
                <Text style={styles.reviews}>({item.reviewCount})</Text>
              </View>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
              <Text style={styles.supplier}>{item.supplier}</Text>
            </View>
            <Text style={styles.heartBadge}>♥</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    position: "relative",
  },
  thumb: {
    width: 70,
    height: 85,
  },
  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  reviews: {
    fontSize: 11,
    color: colors.muted,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
  },
  supplier: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  heartBadge: {
    position: "absolute",
    top: 10,
    right: 12,
    fontSize: 18,
    color: colors.red,
  },
  emptyCenter: {
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySub: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 20,
  },
});

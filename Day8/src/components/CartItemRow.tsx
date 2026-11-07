import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  useEffect(() => {
    if (debouncedQty !== item.quantity) {
      onChangeQty(item.bookId, debouncedQty);
    }
  }, [debouncedQty, item.bookId, item.quantity, onChangeQty]);

  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <Text style={styles.stock}>Còn {item.stock}</Text>
      </View>
      <View style={styles.qtyControls}>
        <Pressable
          disabled={!canDec}
          onPress={() => setQty((q) => q - 1)}
          accessibilityLabel="Giảm"
          style={[styles.btnQty, !canDec && styles.btnDisabled]}
          hitSlop={4}
        >
          <Text style={[styles.btnQtyText, !canDec && styles.btnDisabledText]}>−</Text>
        </Pressable>
        <Text style={styles.qtyText}>{qty}</Text>
        <Pressable
          disabled={!canInc}
          onPress={() => setQty((q) => q + 1)}
          accessibilityLabel="Tăng"
          style={[styles.btnQty, !canInc && styles.btnDisabled]}
          hitSlop={4}
        >
          <Text style={[styles.btnQtyText, !canInc && styles.btnDisabledText]}>+</Text>
        </Pressable>
      </View>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  stock: { color: colors.muted, fontSize: 12 },
  qtyControls: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: colors.bg, paddingHorizontal: 6, paddingVertical: 4, borderRadius: radius.pill },
  btnQty: { width: 26, height: 26, borderRadius: 13, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.line },
  btnQtyText: { fontSize: 16, fontWeight: "800", color: colors.text, lineHeight: 18 },
  btnDisabled: { opacity: 0.35, backgroundColor: colors.bg },
  btnDisabledText: { color: colors.muted },
  qtyText: { fontWeight: "800", color: colors.navy, fontSize: 15, minWidth: 18, textAlign: "center" },
  trash: { fontSize: 22 },
});

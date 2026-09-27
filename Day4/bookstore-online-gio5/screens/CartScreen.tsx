// GIỜ 5 — Bài tập 2: Màn hình Giỏ hàng
// Đủ 3 vùng theo yêu cầu: nội dung cuộn (danh sách) + thanh tổng tiền cố định
// (không cuộn) + TabBar cố định (vẽ ở App.tsx, không vùng nào chồng lấp vùng nào).
import React from "react";
import { View, ScrollView, Text, Pressable, StyleSheet } from "react-native";
import { CartLineItem } from "../components/CartLineItem";
import { CartItem } from "../data";

export function CartScreen({
  items,
  onCheckout,
  onExplore,
}: {
  items: CartItem[];
  onCheckout?: () => void;
  onExplore?: () => void;
}) {
  const total = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Giỏ hàng ({items.length})</Text>

      {/* Danh sách sản phẩm: CUỘN được (flex:1), nằm GIỮA header và thanh tổng tiền */}
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Giỏ hàng của bạn đang trống</Text>
          <Text style={styles.emptySubtitle}>Hãy chọn thêm các cuốn sách hay từ Trang chủ nhé!</Text>
          {onExplore && (
            <Pressable style={styles.exploreButton} onPress={onExplore}>
              <Text style={styles.exploreText}>Khám phá sách ngay</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {items.map((item) => (
            <CartLineItem key={item.book.id} item={item} />
          ))}
        </ScrollView>
      )}

      {/* Thanh tổng tiền + nút thanh toán: KHÔNG cuộn, đứng cố định ngay trên
          TabBar (TabBar vẽ riêng ở App.tsx, cả 2 cùng "cố định" nhưng độc lập). */}
      <View style={styles.totalBar}>
        <View>
          <Text style={styles.totalLabel}>Tổng cộng</Text>
          <Text style={styles.totalValue}>{total.toLocaleString()} đ</Text>
        </View>
        <Pressable
          style={[styles.checkoutButton, items.length === 0 && styles.checkoutDisabled]}
          onPress={() => items.length > 0 && onCheckout?.()}
          disabled={items.length === 0}
        >
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    fontSize: 18,
    fontWeight: "800",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    color: "#111827",
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 16 },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1B4B",
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
  },
  exploreButton: {
    marginTop: 16,
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  exploreText: {
    color: "#4338CA",
    fontWeight: "600",
    fontSize: 13,
  },
  totalBar: {
    flexDirection: "row", // tổng tiền bên trái, nút thanh toán bên phải
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    // marginBottom = chiều cao TabBar (64) -> thanh này luôn nổi NGAY TRÊN TabBar,
    // không bị TabBar (position absolute ở tầng App.tsx) đè lên.
    marginBottom: 64,
  },
  totalLabel: { fontSize: 12, color: "#5B6B7F" },
  totalValue: { fontSize: 18, fontWeight: "800", color: "#1E1B4B" },
  checkoutButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutDisabled: {
    backgroundColor: "#CBD5E1",
  },
  checkoutText: { color: "#FFFFFF", fontWeight: "700" },
});

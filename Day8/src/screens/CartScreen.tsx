import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Header } from "../components/Header";
import { CartItemRow } from "../components/CartItemRow";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { useAuth, useCart } from "../store/hooks";
import { confirmDialog } from "../utils/dialog";
import { TabScreenProps } from "../navigation/types";
import { colors, formatPrice } from "../theme";

const COUPONS: Record<string, { label: string; discount: (subtotal: number) => number }> = {
  SALE10: { label: "Giảm 10%", discount: (s) => Math.round(s * 0.1) },
  GIAM50K: { label: "Giảm 50.000đ", discount: (s) => Math.min(50000, s) },
};

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, setQty, remove } = useCart();
  const { isLoggedIn } = useAuth();

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const discount = appliedCoupon && COUPONS[appliedCoupon] ? COUPONS[appliedCoupon].discount(totalPrice) : 0;
  const finalTotal = Math.max(0, totalPrice - discount);

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Vui lòng nhập mã giảm giá");
      return;
    }
    if (!COUPONS[code]) {
      setCouponError("Mã giảm giá không hợp lệ");
      return;
    }
    setAppliedCoupon(code);
    setCouponError(null);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError(null);
  };

  const askRemove = (bookId: number) => {
    const item = items.find((i) => i.bookId === bookId);
    confirmDialog(
      "Xóa sản phẩm",
      `Bạn có chắc muốn xóa "${item?.title ?? "sản phẩm"}" khỏi giỏ hàng?`,
      () => remove(bookId)
    );
  };

  const goCheckout = () => {
    if (isLoggedIn) {
      navigation.navigate("Checkout", { total: finalTotal });
    } else {
      navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="🛒 Giỏ hàng" />
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        renderItem={({ item }) => <CartItemRow item={item} onChangeQty={setQty} onRemove={askRemove} />}
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState
            emoji="🛒"
            title="Giỏ hàng trống"
            message="Hãy chọn vài cuốn sách yêu thích nhé."
            actionLabel="Khám phá sách"
            onAction={() => navigation.navigate("Home")}
          />
        }
      />
      {items.length > 0 && (
        <View style={styles.footer}>
          {/* BT8.C2: Ô nhập mã giảm giá */}
          <View style={styles.couponSection}>
            <View style={styles.couponRow}>
              <TextInput
                style={styles.couponInput}
                placeholder="Nhập mã (SALE10, GIAM50K)"
                value={couponInput}
                onChangeText={(text) => {
                  setCouponInput(text);
                  setCouponError(null);
                }}
                autoCapitalize="characters"
                editable={!appliedCoupon}
              />
              {appliedCoupon ? (
                <TouchableOpacity style={styles.couponBtnCancel} onPress={removeCoupon}>
                  <Text style={styles.couponBtnTextCancel}>Hủy mã</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.couponBtn} onPress={applyCoupon}>
                  <Text style={styles.couponBtnText}>Áp dụng</Text>
                </TouchableOpacity>
              )}
            </View>
            {couponError && <Text style={styles.couponErrorText}>{couponError}</Text>}
            {appliedCoupon && (
              <Text style={styles.couponSuccessText}>
                ✓ Đã áp dụng mã {appliedCoupon}: {COUPONS[appliedCoupon]?.label}
              </Text>
            )}
          </View>

          <View style={styles.line}>
            <Text style={styles.muted}>Tạm tính</Text>
            <Text style={styles.value}>{formatPrice(totalPrice)}</Text>
          </View>

          {appliedCoupon && (
            <View style={styles.line}>
              <Text style={styles.discountLabel}>Giảm giá ({appliedCoupon})</Text>
              <Text style={styles.discountValue}>-{formatPrice(discount)}</Text>
            </View>
          )}

          <View style={styles.line}>
            <Text style={styles.total}>Tổng cộng</Text>
            <Text style={styles.total}>{formatPrice(finalTotal)}</Text>
          </View>
          <PrimaryButton title="Thanh toán" onPress={goCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  footer: { backgroundColor: "#fff", padding: 14, gap: 8, borderTopWidth: 1, borderTopColor: colors.line },
  line: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  muted: { color: colors.muted },
  value: { fontWeight: "700", color: colors.text },
  total: { fontSize: 17, fontWeight: "800", color: colors.navy },
  couponSection: { marginBottom: 6 },
  couponRow: { flexDirection: "row", gap: 8 },
  couponInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fafafa",
    fontSize: 14,
  },
  couponBtn: {
    backgroundColor: colors.navy,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  couponBtnText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  couponBtnCancel: {
    backgroundColor: "#fee2e2",
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  couponBtnTextCancel: { color: colors.heart, fontWeight: "700", fontSize: 13 },
  couponErrorText: { color: colors.heart, fontSize: 12, marginTop: 4 },
  couponSuccessText: { color: "#16a34a", fontSize: 12, marginTop: 4, fontWeight: "600" },
  discountLabel: { color: "#16a34a", fontWeight: "600" },
  discountValue: { color: "#16a34a", fontWeight: "700" },
});

// GIỜ 5: Màn hình Tài khoản người dùng (Account Screen)
// Minh hoạ layout Flexbox: Profile header (row), thống kê tóm tắt (row + space-around),
// danh sách cài đặt dạng thẻ (row + space-between).
import React from "react";
import { View, ScrollView, Text, StyleSheet, Pressable } from "react-native";

export function AccountScreen() {
  const menuItems = [
    { icon: "📦", title: "Lịch sử đơn hàng", desc: "Xem lại các đơn đã đặt" },
    { icon: "🎟️", title: "Kho voucher & ưu đãi", desc: "3 mã giảm giá còn hạn" },
    { icon: "💳", title: "Phương thức thanh toán", desc: "Thẻ ATM, Ví điện tử" },
    { icon: "📍", title: "Địa chỉ nhận hàng", desc: "Quận 1, TP. Hồ Chí Minh" },
    { icon: "⚙️", title: "Cài đặt & Trợ giúp", desc: "Thông báo, bảo mật, hỗ trợ" },
  ];

  return (
    <View style={styles.screen}>
      <Text style={styles.headerTitle}>Tài khoản</Text>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>TC</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Hoàng Phước Thành Công</Text>
            <Text style={styles.email}>23731851.cong@student.iuh.edu.vn</Text>
            <View style={styles.memberTag}>
              <Text style={styles.memberText}>Sinh viên IUH</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Đã mua</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Đang giao</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Mã giảm giá</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <Pressable key={item.title} style={[styles.menuRow, index < menuItems.length - 1 && styles.menuBorder]}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDesc}>{item.desc}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.logoutButton}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90, // chừa chỗ cho TabBar (64px)
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    gap: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4338CA",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  email: {
    fontSize: 13,
    color: "#5B6B7F",
  },
  memberTag: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  memberText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4338CA",
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginTop: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  statLabel: {
    fontSize: 12,
    color: "#5B6B7F",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#E2E8F0",
  },
  menuSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginTop: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  menuIcon: {
    fontSize: 20,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  menuDesc: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 1,
  },
  menuArrow: {
    fontSize: 18,
    color: "#CBD5E1",
    fontWeight: "700",
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
  },
  logoutText: {
    color: "#DC2626",
    fontWeight: "700",
    fontSize: 14,
  },
});

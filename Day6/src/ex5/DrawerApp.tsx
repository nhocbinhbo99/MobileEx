import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.emoji}>👋</Text>
      <Text style={styles.big}>Xin chào bạn!</Text>
      <Text style={styles.subText}>
        Hãy vuốt từ mép trái màn hình hoặc nhấn biểu tượng ☰ trên thanh tiêu đề để mở menu ngăn kéo (Drawer).
      </Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.center}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>TC</Text>
      </View>
      <Text style={styles.big}>Hoàng Phước Thành Công</Text>
      <Text style={styles.email}>23731851.cong@student.iuh.edu.vn</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>MSSV: 23731851 · Lớp: DHKTPM19BTT</Text>
      </View>
    </View>
  );
}

function SettingsScreen() {
  const [notify, setNotify] = useState<boolean>(true);
  const [dark, setDark] = useState<boolean>(false);

  return (
    <View style={[styles.container, dark && styles.darkContainer]}>
      <View style={styles.settingsBox}>
        <View style={styles.settingRow}>
          <View style={styles.settingLabelWrap}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={dark ? "#fff" : colors.text}
            />
            <Text style={[styles.settingLabel, dark && styles.darkText]}>
              Nhận thông báo
            </Text>
          </View>
          <Switch
            value={notify}
            onValueChange={setNotify}
            thumbColor={notify ? colors.red : "#ccc"}
            trackColor={{ false: "#ccc", true: "#FFB4AE" }}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLabelWrap}>
            <Ionicons
              name="moon-outline"
              size={22}
              color={dark ? "#fff" : colors.text}
            />
            <Text style={[styles.settingLabel, dark && styles.darkText]}>
              Giao diện tối
            </Text>
          </View>
          <Switch
            value={dark}
            onValueChange={setDark}
            thumbColor={dark ? colors.navy : "#ccc"}
            trackColor={{ false: "#ccc", true: "#93A5CF" }}
          />
        </View>

        <View style={styles.statusBox}>
          <Text style={[styles.statusText, dark && styles.darkStatusText]}>
            Thông báo:{" "}
            <Text style={styles.bold}>{notify ? "BẬT" : "TẮT"}</Text> · Giao
            diện: <Text style={styles.bold}>{dark ? "Tối" : "Sáng"}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

export function DrawerApp() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        drawerActiveTintColor: colors.red,
        drawerInactiveTintColor: colors.muted,
        headerStyle: { backgroundColor: "#fff" },
        headerTitleStyle: { fontWeight: "bold", color: colors.text },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Trang chủ",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Cá nhân",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Cài đặt",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
  },
  darkContainer: {
    backgroundColor: "#181A20",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.bg,
  },
  emoji: {
    fontSize: 54,
    marginBottom: 12,
  },
  big: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 280,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: "#FFE8E7",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.red,
  },
  settingsBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  settingLabelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  darkText: {
    color: "#fff",
  },
  statusBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.bg,
    borderRadius: 8,
    alignItems: "center",
  },
  statusText: {
    fontSize: 13,
    color: colors.text,
  },
  darkStatusText: {
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
    color: colors.red,
  },
});

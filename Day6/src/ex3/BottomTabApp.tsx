import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Phone } from "../types";
import { Stars } from "../components/Stars";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function HomeTab() {
  return (
    <View style={styles.container}>
      <FlatList
        data={PHONES}
        keyExtractor={(p: Phone) => p.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }: { item: Phone }) => {
          const shortName = item.name.split(" - ")[0] ?? item.name;
          return (
            <View style={styles.card}>
              <Image
                source={PHONE_COLORS[item.defaultColor].image}
                style={styles.cardThumb}
                resizeMode="contain"
              />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName} numberOfLines={2}>
                  {shortName}
                </Text>
                <View style={styles.cardRating}>
                  <Stars value={item.rating} size={14} />
                  <Text style={styles.cardReviews}>({item.reviewCount})</Text>
                </View>
                <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

function SearchTab() {
  const [keyword, setKeyword] = useState<string>("");

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return PHONES;
    return PHONES.filter((p: Phone) => p.name.toLowerCase().includes(q));
  }, [keyword]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.muted} />
        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Nhập tên sản phẩm để tìm kiếm..."
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
          clearButtonMode="while-editing"
        />
      </View>

      {filtered.length === 0 ? (
        <View style={styles.emptyCenter}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyText}>
            Không có kết quả cho “{keyword}”
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(p: Phone) => p.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }: { item: Phone }) => (
            <View style={styles.card}>
              <Image
                source={PHONE_COLORS[item.defaultColor].image}
                style={styles.cardThumb}
                resizeMode="contain"
              />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
                <Text style={styles.cardSupplier}>Nhà cung cấp: {item.supplier}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

function ProfileTab() {
  return (
    <View style={[styles.container, styles.profileCenter]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>TC</Text>
      </View>
      <Text style={styles.profileName}>Hoàng Phước Thành Công</Text>
      <Text style={styles.profileEmail}>23731851.cong@student.iuh.edu.vn</Text>
      <View style={styles.profileBadge}>
        <Text style={styles.profileBadgeText}>Sinh viên: DHKTPM19BTT</Text>
      </View>
    </View>
  );
}

export function BottomTabApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#fff" },
        headerTitleStyle: { fontWeight: "bold", color: colors.text },
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.muted,
        tabBarIcon: ({ focused, color, size }) => {
          const iconPair = ICONS[route.name as keyof TabParamList];
          const iconName = iconPair ? iconPair[focused ? 0 : 1] : "help-circle";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{ title: "Trang chủ" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{ title: "Tìm kiếm" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{ title: "Cá nhân" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  listContent: {
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
  },
  cardThumb: {
    width: 65,
    height: 80,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  cardName: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  cardRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  cardReviews: {
    fontSize: 11,
    color: colors.muted,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
  },
  cardSupplier: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
    paddingHorizontal: 14,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: colors.text,
  },
  emptyCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: colors.muted,
    fontStyle: "italic",
    textAlign: "center",
  },
  profileCenter: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.navy,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 12,
  },
  profileBadge: {
    backgroundColor: "#E8EEFF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  profileBadgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.blue,
  },
});

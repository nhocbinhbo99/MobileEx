// GIỜ 2 & GIỜ 5: Màn hình Danh mục sách
// Minh hoạ layout Flexbox: Grid danh mục với icon + số lượng sách,
// có thể lọc sách theo danh mục.
import React, { useState } from "react";
import { View, ScrollView, Text, Pressable, StyleSheet } from "react-native";
import { CATEGORIES, BOOKS, Book } from "../data";
import { BookGrid } from "../components/BookGrid";

const CATEGORY_ICONS: Record<string, string> = {
  "Văn học": "📖",
  "Kinh tế": "📈",
  "Thiếu nhi": "🧸",
  "Kỹ năng sống": "🌱",
  "Truyện tranh": "🎨",
  "Ngoại ngữ": "🌐",
  "Lịch sử": "🏛️",
};

export function CategoryScreen({ onPressBook }: { onPressBook: (id: number) => void }) {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  return (
    <View style={styles.screen}>
      <Text style={styles.headerTitle}>Danh mục sách</Text>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.catGrid}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCat === cat;
            return (
              <Pressable
                key={cat}
                style={[styles.catCard, isSelected && styles.catCardActive]}
                onPress={() => setSelectedCat(isSelected ? null : cat)}
              >
                <Text style={styles.catIcon}>{CATEGORY_ICONS[cat] || "📚"}</Text>
                <Text style={[styles.catName, isSelected && styles.catNameActive]}>{cat}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.subTitle}>
          {selectedCat ? `Sách thuộc thể loại "${selectedCat}"` : "Tất cả sách"}
        </Text>
        <BookGrid books={BOOKS} onPressBook={onPressBook} />
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
    paddingBottom: 90, // tránh bị che bởi TabBar (64px)
  },
  catGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  catCard: {
    width: "31%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 6,
  },
  catCardActive: {
    backgroundColor: "#EEF2FF",
    borderColor: "#4338CA",
  },
  catIcon: {
    fontSize: 24,
  },
  catName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
  catNameActive: {
    color: "#4338CA",
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
});

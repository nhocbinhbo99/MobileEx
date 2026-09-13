import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng */}
      <Header />

      {/* 2. ScrollView chứa Chips + Grid — nhớ paddingBottom đủ lớn để
             FloatingCartButton không che mất sách cuối cùng */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <CategoryChips />

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Tất cả sách</Text>
        <BookGrid
          books={BOOKS}
          onPressBook={(id) => {
            console.log('Chọn sách:', id);
            setCartCount((prev) => prev + 1);
          }}
        />
      </ScrollView>

      {/* 3. Nút giỏ nổi — NGOÀI ScrollView */}
      <FloatingCartButton
        count={cartCount}
        onPress={() => setCartCount((prev) => prev + 1)}
      />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1B4B',
    marginBottom: 10,
  },
});

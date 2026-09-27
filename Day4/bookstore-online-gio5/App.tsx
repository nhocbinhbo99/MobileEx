// GIỜ 5 — Tổng hợp: Bottom Tab Layout & Hoàn thiện ứng dụng
// Chỉ tập trung vào LAYOUT tĩnh theo đúng yêu cầu đề bài:
// - Giờ 4: HomeScreen, BookDetailScreen (ScrollView & SafeAreaView)
// - Giờ 5: TabBar (4 tab tĩnh: Trang chủ, Danh mục, Giỏ hàng, Tài khoản), CartScreen (3 vùng layout không chồng lấn).
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TabBar, TabKey } from './components/TabBar';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { BOOKS, CART_ITEMS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;
  const cartCount = CART_ITEMS.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        {selectedBook ? (
          /* Màn hình Chi tiết sách (Giờ 4 — Bài tập 2) */
          <BookDetailScreen
            book={selectedBook}
            onBack={() => setSelectedBookId(null)}
          />
        ) : (
          <>
            {/* Giờ 5 — Bài tập 2: Màn hình Giỏ hàng (Cart Screen) */}
            {activeTab === 'cart' ? (
              <CartScreen
                items={CART_ITEMS}
                onExplore={() => setActiveTab('home')}
              />
            ) : (
              /* Giờ 4 — Bài tập 1: Màn hình Trang chủ BookStore hoàn chỉnh */
              <HomeScreen
                cartCount={cartCount}
                onPressBook={(id) => setSelectedBookId(id)}
                onPressCart={() => setActiveTab('cart')}
              />
            )}

            {/* Giờ 5 — Bài tập 1: Thanh TabBar cố định ở đáy màn hình gồm 4 mục */}
            <TabBar active={activeTab} onChange={setActiveTab} cartCount={cartCount} />
          </>
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    flex: 1,
    position: 'relative', // containing block cho TabBar (position: absolute)
  },
});

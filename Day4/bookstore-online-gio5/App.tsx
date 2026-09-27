// GIỜ 5 — Tổng hợp: Bottom Tab Layout & Hoàn thiện ứng dụng
// Tích hợp toàn diện:
// - Giờ 1: Header, BookRowCard
// - Giờ 2: CategoryChips, BookGrid (flexWrap, gap)
// - Giờ 3: DiscountBadge, FloatingCartButton (position: 'absolute')
// - Giờ 4: HomeScreen, BookDetailScreen (ScrollView & SafeAreaView)
// - Giờ 5: TabBar (4 tabs), CartScreen (3 vùng không chồng lấp), CategoryScreen, AccountScreen.
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TabBar, TabKey } from './components/TabBar';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { CartScreen } from './screens/CartScreen';
import { AccountScreen } from './screens/AccountScreen';
import { BOOKS, CART_ITEMS, Book, CartItem } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(CART_ITEMS);

  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (book: Book) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
  };

  const handleCheckout = () => {
    Alert.alert('Thanh toán thành công', 'Cảm ơn bạn đã mua sách tại BookStore!');
    setCartItems([]);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        {selectedBook ? (
          /* Màn hình Chi tiết sách (Giờ 4 — Bài 2) */
          <BookDetailScreen
            book={selectedBook}
            onBack={() => setSelectedBookId(null)}
            onAddToCart={() => handleAddToCart(selectedBook)}
          />
        ) : (
          <>
            {/* 4 Màn hình tương ứng với 4 Tab (Giờ 5 — Bài tập 1 & 2 + Mở rộng) */}
            {activeTab === 'home' && (
              <HomeScreen
                cartCount={cartCount}
                onPressBook={(id) => setSelectedBookId(id)}
                onPressCart={() => setActiveTab('cart')}
              />
            )}

            {activeTab === 'category' && (
              <CategoryScreen onPressBook={(id) => setSelectedBookId(id)} />
            )}

            {activeTab === 'cart' && (
              <CartScreen
                items={cartItems}
                onCheckout={handleCheckout}
                onExplore={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'account' && <AccountScreen />}

            {/* Thanh TabBar cố định ở đáy màn hình (Giờ 5 — Bài tập 1) */}
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

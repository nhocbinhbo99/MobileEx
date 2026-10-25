import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { PHONES } from "./src/data/phones";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { colors } from "./src/theme";

export default function App() {
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);

  if (currentLesson === null) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.menuContainer}>
          <Text style={styles.menuTitle}>LAB 06: NAVIGATION</Text>
          <Text style={styles.menuSubtitle}>Hoang Phuoc Thanh Cong - 23731851</Text>

          <View style={styles.btnGroup}>
            <TouchableOpacity style={styles.btn} onPress={() => setCurrentLesson(1)}>
              <Text style={styles.btnText}>Bai 1: Chon mau dien thoai</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setCurrentLesson(2)}>
              <Text style={styles.btnText}>Bai 2: Goi du lieu MockAPI</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setCurrentLesson(3)}>
              <Text style={styles.btnText}>Bai 3: Bottom Tab Navigation</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setCurrentLesson(4)}>
              <Text style={styles.btnText}>Bai 4: Stack long Tab + Yeu thich</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setCurrentLesson(5)}>
              <Text style={styles.btnText}>Bai 5: Drawer Navigation</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top"]} style={styles.safeTop}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentLesson(null)}>
            <Text style={styles.backBtnText}>‹ Quay lai Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <NavigationContainer>
        {currentLesson === 1 && <SelectPhoneApp phone={PHONES[0]} />}
        {currentLesson === 2 && <SelectPhoneApi />}
        {currentLesson === 3 && <BottomTabApp />}
        {currentLesson === 4 && <StackTabApp />}
        {currentLesson === 5 && <DrawerApp />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    marginBottom: 32,
  },
  btnGroup: {
    gap: 12,
  },
  btn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  safeTop: {
    backgroundColor: "#fff",
  },
  topBar: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  backBtn: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.bg,
    borderRadius: 6,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const parts = phone.name.split(" - ");
  const line1 = parts[0] ?? phone.name;
  const line2 = parts[1] ?? "";

  const activeColor: ColorKey = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[activeColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.smallName}>{line1}</Text>
          {line2 !== "" && <Text style={styles.smallSub}>{line2}</Text>}

          {picked !== undefined && (
            <View style={styles.pickedInfo}>
              <Text style={styles.detailText}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.detailText}>
                Cung cấp bởi: <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.priceText}>{formatPrice(phone.price)}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>

        <ScrollView contentContainerStyle={styles.swatches}>
          {COLOR_ORDER.map((key) => {
            const isSelected = picked === key;
            return (
              <Pressable
                key={key}
                onPress={() => setPicked(key)}
                style={[
                  styles.swatch,
                  { backgroundColor: PHONE_COLORS[key].hex },
                  isSelected && styles.swatchOn,
                ]}
              />
            );
          })}
        </ScrollView>

        <Pressable
          style={styles.doneBtn}
          onPress={() => navigation.navigate("Product", { color: picked })}
        >
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  thumb: {
    width: 100,
    height: 120,
  },
  headerText: {
    flex: 1,
  },
  smallName: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },
  smallSub: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  pickedInfo: {
    marginTop: 8,
    gap: 4,
  },
  detailText: {
    fontSize: 13,
    color: colors.text,
  },
  bold: {
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    marginTop: 2,
  },
  body: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
    justifyContent: "space-between",
  },
  hint: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 12,
  },
  swatches: {
    alignItems: "center",
    gap: 14,
    paddingVertical: 8,
  },
  swatch: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  swatchOn: {
    borderWidth: 3,
    borderColor: colors.navy,
  },
  doneBtn: {
    backgroundColor: colors.blue,
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  doneBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

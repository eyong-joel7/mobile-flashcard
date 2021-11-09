import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { black } from "../utils/color";

export default function TouchableBtn({
  onPress,
  bgColor,
  color,
  children,
  borderColor,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.Btn,
        { backgroundColor: bgColor },
        { borderColor: borderColor },
      ]}
    >
      <Text style={[styles.BtnText, { color: color }]}>{children}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  Btn: {
    borderWidth: 2,
    borderColor: black,
    padding: 10,
    paddingHorizontal: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  BtnText: {
    fontSize: 22,
    textAlign: "center",
  },
});

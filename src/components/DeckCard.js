import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gray } from "../utils/color";
import TextButton from "./TextButton";
export default function DeckCard({ textColor, children, subTitle, onPress }) {
  return (
    <TouchableOpacity style={styles.center} onPress={onPress ? onPress : null}>
      <Text style={styles.title}>{children}</Text>
      <TextButton onPress = {onPress} textColor={textColor}>{subTitle}</TextButton>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
  },
});

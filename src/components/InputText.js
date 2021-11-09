import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { black, gray, white } from "../utils/color";
export default function InputText({
  handleTextChange,
  inputValue,
  placeholder,
}) {
  return (
    <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={(value) => handleTextChange(value)}
          placeholder={placeholder}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderColor: black,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: white,
    margin: 20,
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 18,
    borderBottomWidth: 2,
    borderColor: gray,
  },
});

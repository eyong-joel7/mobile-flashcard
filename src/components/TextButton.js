import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { gray } from '../utils/color'


export default function TextButton ({ children, onPress, textColor, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style ={[styles.subText,{color:textColor?textColor : gray}, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    subText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical:10,
      },
})
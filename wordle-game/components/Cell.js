import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Cell = ({ char, secretChar, isSubmitted, secretWord }) => {
  let backgroundColor = "#ccc"; // Default background

  if (isSubmitted) {
    if (char === secretChar) {
      backgroundColor = "#6aaa64"; // Correct letter in the correct position
    } else if (secretWord.includes(char)) {
      backgroundColor = "#c9b458"; // Correct letter in the wrong position
    } else {
      backgroundColor = "#787c7e"; // Incorrect letter
    }
  }

  return (
    <View style={[styles.cell, { backgroundColor }]}>
      <Text style={styles.cellText}>{char}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  cellText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Cell;

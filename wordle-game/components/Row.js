import React from "react";
import { View, StyleSheet } from "react-native";
import Cell from "./Cell";

const Row = ({ word, secretWord, isSubmitted }) => {
  const paddedWord = word.padEnd(secretWord.length, " ").split("");

  return (
    <View style={styles.row}>
      {paddedWord.map((char, index) => (
        <Cell
          key={index}
          char={char}
          secretChar={secretWord[index]}
          isSubmitted={isSubmitted}
          secretWord={secretWord}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 5,
  },
});

export default Row;

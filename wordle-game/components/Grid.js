import React from "react";
import { View, StyleSheet } from "react-native";
import Row from "./Row";

const Grid = ({ guesses, secretWord, attempt }) => {
  return (
    <View style={styles.grid}>
      {guesses.map((guess, index) => (
        <Row
          key={index}
          word={guess}
          secretWord={secretWord}
          isSubmitted={index < attempt}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    marginVertical: 20,
  },
});

export default Grid;

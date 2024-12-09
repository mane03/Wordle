import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

const InputBar = ({ currentGuess, setCurrentGuess, handleGuess, maxLength }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={currentGuess}
        onChangeText={setCurrentGuess}
        maxLength={maxLength}
        placeholder="Enter your guess"
        autoCapitalize="characters"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleGuess}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    marginRight: 10,
    width: 200,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6aaa64",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default InputBar;

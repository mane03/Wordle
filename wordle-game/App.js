import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import Grid from "./components/Grid";
import InputBar from "./components/InputBar";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const SECRET_WORD = "REACT"; // Replace with a dynamic word generator for production.
const INITIAL_TIME = 60; // 60 seconds to guess.

const App = () => {
  const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [score, setScore] = useState(0);

  // Timer Effect
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer); // Clear timer on component unmount or game over.
    } else if (timeLeft === 0) {
      setGameOver(true);
      Alert.alert("Time's Up!", `The word was ${SECRET_WORD}.`);
    }
  }, [timeLeft, gameOver]);

  const handleGuess = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      Alert.alert("Invalid Guess", `Your guess must be ${WORD_LENGTH} letters.`);
      return;
    }

    const updatedGuesses = [...guesses];
    updatedGuesses[attempt] = currentGuess.toUpperCase();
    setGuesses(updatedGuesses);

    if (currentGuess.toUpperCase() === SECRET_WORD) {
      const points = 100 + timeLeft * 2; // Bonus points for faster completion.
      setScore(score + points);
      Alert.alert("Congratulations!", `You guessed the word! +${points} points`);
      setGameOver(true);
    } else if (attempt + 1 === MAX_ATTEMPTS) {
      Alert.alert("Game Over", `The word was ${SECRET_WORD}.`);
      setGameOver(true);
    }

    setCurrentGuess("");
    setAttempt(attempt + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wordle Game</Text>
      <View style={styles.info}>
        <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>
      <Grid guesses={guesses} secretWord={SECRET_WORD} attempt={attempt} />
      {!gameOver && (
        <InputBar
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          handleGuess={handleGuess}
          maxLength={WORD_LENGTH}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121213",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  timer: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  score: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default App;

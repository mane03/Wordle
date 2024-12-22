import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Grid from "./components/Grid";
import InputBar from "./components/InputBar";

const WORDS = [
  "CAT",
  "HOUSE",
  "APPLE",
  "REACT",
  "GUITAR",
  "MIRROR",
  "BANANA",
  "JUMPING",
  "KITCHEN",
  "SUNLIGHT",
];

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const MAX_ATTEMPTS = 6;
const INITIAL_TIME = 60; // 60 seconds to guess.

const App = () => {
  const [secretWord, setSecretWord] = useState(getRandomWord());
  const [wordLength, setWordLength] = useState(secretWord.length);
  const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [score, setScore] = useState(0);
  const [hintWords, setHintWords] = useState([]);

  useEffect(() => {
    const filteredWords = WORDS.filter((word) => word.length === secretWord.length);
    const randomHints = getRandomHintWords(filteredWords, secretWord, 3);
    setHintWords(randomHints);
    setWordLength(secretWord.length);
    setGuesses(Array(MAX_ATTEMPTS).fill(""));
    setCurrentGuess("");
    setAttempt(0);
    setGameOver(false);
    setTimeLeft(INITIAL_TIME);
  }, [secretWord]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      Alert.alert("Time's Up!", `The word was ${secretWord}.`);
    }
  }, [timeLeft, gameOver]);

  const handleGuess = () => {
    if (currentGuess.length !== wordLength) {
      Alert.alert("Invalid Guess", `Your guess must be ${wordLength} letters.`);
      return;
    }

    const updatedGuesses = [...guesses];
    updatedGuesses[attempt] = currentGuess.toUpperCase();
    setGuesses(updatedGuesses);

    if (currentGuess.toUpperCase() === secretWord) {
      const points = 100 + timeLeft * 2;
      setScore(score + points);
      Alert.alert("Congratulations!", `You guessed the word! +${points} points`);
      setGameOver(true);
    } else if (attempt + 1 === MAX_ATTEMPTS) {
      Alert.alert("Game Over", `The word was ${secretWord}.`);
      setGameOver(true);
    }

    setCurrentGuess("");
    setAttempt(attempt + 1);
  };

  const restartGame = () => {
    setSecretWord(getRandomWord());
    setGuesses(Array(MAX_ATTEMPTS).fill(""));
    setCurrentGuess("");
    setAttempt(0);
    setGameOver(false);
    setTimeLeft(INITIAL_TIME);
    setScore(0);
  };

  const getRandomHintWords = (words, secret, count) => {
    const hintSet = new Set([secret]);
    while (hintSet.size < count) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      hintSet.add(randomWord);
    }
    return Array.from(hintSet).sort(() => Math.random() - 0.5);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Wordle Game</Text>
      <View style={styles.info}>
        <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>
      <Grid guesses={guesses} secretWord={secretWord} attempt={attempt} />
      <Text style={styles.hintTitle}>Hint Words:</Text>
      <View style={styles.hintContainer}>
        {hintWords.map((word, index) => (
          <Text key={index} style={styles.hintWord}>
            {word}
          </Text>
        ))}
      </View>
      {!gameOver && (
        <InputBar
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          handleGuess={handleGuess}
          maxLength={wordLength}
        />
      )}
      {gameOver && (
        <Text style={styles.result}>
          The word was "{secretWord}". Tap restart to play again!
        </Text>
      )}
      <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
        <Text style={styles.restartButtonText}>Restart the Game</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
  hintTitle: {
    fontSize: 20,
    color: "#6aaa64",
    marginBottom: 5,
    fontWeight: "bold",
  },
  hintContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  hintWord: {
    fontSize: 18,
    color: "#fff",
    marginHorizontal: 5,
    backgroundColor: "#3a3a3c",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
  },
  result: {
    fontSize: 18,
    color: "#f00",
    marginVertical: 20,
    textAlign: "center",
  },
  restartButton: {
    backgroundColor: "#6aaa64",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  restartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;

import React, { useState, useEffect } from 'react';

// Updated word list with engineering academic terms
const wordList = [
  "algorithm", "architecture", "boolean", "calculus", "circuit",
  "compiler", "debugger", "electromagnetism", "equation", "fluid",
  "function", "geometry", "hypothesis", "inertia", "iteration",
  "kinetics", "logarithm", "mechanics", "oscillation", "paradigm",
  "prototype", "quantum", "resistance", "thermodynamics", "variable",
  "vector", "voltage", "wavelength", "kinematics", "statics"
];

// Difficulty levels based on word length
const difficultyLevels = {
  easy: { minLength: 5, maxLength: 7, timeLimit: 30 },
  medium: { minLength: 8, maxLength: 10, timeLimit: 45 },
  hard: { minLength: 11, maxLength: Infinity, timeLimit: 60 },
};

const scrambleWord = (word) => {
  const a = word.split("");
  let n = a.length;
  for(let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join('');
};

const WordScramble = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [difficulty, setDifficulty] = useState('easy'); // Default difficulty

  useEffect(() => {
    selectNewWord(difficulty);
  }, [difficulty]); // Select new word when difficulty changes

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleTimeout();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerRunning]); // Restart timer effect when timerRunning changes

  const selectNewWord = (level) => {
    const filteredWords = wordList.filter(word =>
      word.length >= difficultyLevels[level].minLength && word.length <= difficultyLevels[level].maxLength
    );
    if (filteredWords.length === 0) {
      setFeedbackMessage(`No words found for ${level} difficulty.`);
      setScrambledWord('');
      setCurrentWord('');
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    const word = filteredWords[randomIndex];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setUserGuess('');
    setFeedbackMessage('');
    setTimeLeft(difficultyLevels[level].timeLimit);
    setTimerRunning(true);
    setHintUsed(false); // Reset hint usage for the new word
  };

  const handleTimeout = () => {
    setFeedbackMessage(`Time's up! The word was: ${currentWord}`);
    setIncorrectGuesses(incorrectGuesses + 1);
    setTimerRunning(false);
  };

  const handleSubmitGuess = () => {
    setTimerRunning(false); // Stop timer on guess
    if (userGuess.toLowerCase() === currentWord.toLowerCase()) {
      setFeedbackMessage('Correct! Well done!');
      setScore(score + (timeLeft * (hintUsed ? 0.5 : 1))); // Score based on time left, reduced if hint used
      setCorrectGuesses(correctGuesses + 1);
      setTimeout(() => selectNewWord(difficulty), 2000); // Wait 2 seconds before new word
    } else {
      setFeedbackMessage(`Incorrect. The word was: ${currentWord}`);
      setIncorrectGuesses(incorrectGuesses + 1);
      setTimeout(() => selectNewWord(difficulty), 2000); // Wait 2 seconds before new word
    }
  };

  const handleNextWord = () => {
    setTimerRunning(false); // Stop timer on skip
    setFeedbackMessage(`Skipped. The word was: ${currentWord}`);
    setIncorrectGuesses(incorrectGuesses + 1);
    setTimeout(() => selectNewWord(difficulty), 2000); // Wait 2 seconds before new word
  };

  const handleHint = () => {
    if (!hintUsed && currentWord.length > 0) {
      setFeedbackMessage(`Hint: The first letter is "${currentWord[0].toUpperCase()}".`);
      setHintUsed(true);
    }
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    setScore(0); // Reset score on difficulty change
    setCorrectGuesses(0);
    setIncorrectGuesses(0);
  };

  return (
    <div className='min-h-screen bg-n-8 text-n-1 px-5 lg:px-10 py-10 flex flex-col items-center justify-center'>
      <div className='max-w-md w-full bg-n-7 rounded-lg p-6 shadow-lg text-center'>
        <h2 className='text-2xl font-bold font-code mb-4'>Word Scramble</h2>

        <div className="mb-4">
          <label htmlFor="difficulty" className="mr-2">Difficulty:</label>
          <select id="difficulty" value={difficulty} onChange={handleDifficultyChange} className="bg-n-6 text-n-1 rounded p-1">
            {Object.keys(difficultyLevels).map(level => (
              <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
            ))}
          </select>
        </div>

        {currentWord ? (
          <>
            <p className='text-xl mb-4'>Unscramble this word: <strong className='font-code text-purple-400'>{scrambledWord}</strong></p>

            <div className="mb-4">
              <p>Time Left: {timeLeft}s</p>
              <p>Score: {score}</p>
              <p>Correct Guesses: {correctGuesses}</p>
              <p>Incorrect Guesses: {incorrectGuesses}</p>
            </div>

            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              className='w-full p-2 rounded bg-n-6 text-n-1 mb-4 text-center'
              placeholder="Enter your guess"
            />

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleSubmitGuess}
                className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50'
                disabled={!timerRunning}
              >
                Submit Guess
              </button>
              <button
                onClick={handleNextWord}
                className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
              >
                Next Word
              </button>
              <button
                onClick={handleHint}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50'
                disabled={hintUsed || !timerRunning}
              >
                Hint
              </button>
            </div>

            {feedbackMessage && <p className={`mt-4 ${feedbackMessage.includes('Correct') ? 'text-green-400' : feedbackMessage.includes('Time') || feedbackMessage.includes('Skipped') || feedbackMessage.includes('Incorrect') ? 'text-red-400' : 'text-n-1/75'}`}>{feedbackMessage}</p>}
          </>
        ) : (
          <p>{feedbackMessage || 'Select a difficulty to start.'}</p>
        )}
      </div>
    </div>
  );
}

export default WordScramble;
import React, { useState, useEffect } from 'react';

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Initialize the game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Example card values
    const initialCards = [...cardValues, ...cardValues].map((value, index) => ({
      id: index,
      value: value,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffleArray(initialCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameOver(false);
  };

  const handleCardClick = (clickedCard) => {
    if (gameOver || clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length === 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    setMoves(moves + 1);
  };

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;

      if (card1.value === card2.value) {
        // Match found
        setMatchedCards([...matchedCards, card1.id, card2.id]);
        setFlippedCards([]);
      } else {
        // No match, flip back after a delay
        const timeoutId = setTimeout(() => {
          const newCards = cards.map(card =>
            (card.id === card1.id || card.id === card2.id) ? { ...card, isFlipped: false } : card
          );
          setCards(newCards);
          setFlippedCards([]);
        }, 1000); // Flip back after 1 second
        return () => clearTimeout(timeoutId);
      }
    }
  }, [flippedCards, cards, matchedCards]);

  // Check for game over
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameOver(true);
    }
  }, [matchedCards, cards]);

  return (
    <div className="min-h-screen bg-n-8 text-n-1 px-5 lg:px-10 py-10 flex flex-col items-center">
      <h2 className="text-4xl lg:text-5xl font-bold text-n-1 font-code mb-8 text-center">Memory Match</h2>

      {gameOver ? (
        <div className="text-center text-3xl font-code text-green-400">
          <p>Congratulations! You matched all the pairs!</p>
          <p>Moves: {moves}</p>
          <button
            onClick={initializeGame}
            className="mt-4 px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <p className="text-lg mb-4">Moves: {moves}</p>
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {cards.map(card => (
              <div
                key={card.id}
                className={`sudoku-cell w-16 h-16 flex items-center justify-center text-2xl font-bold rounded cursor-pointer
                  ${card.isFlipped || card.isMatched ? 'bg-n-7' : 'bg-n-6'}
                  ${card.isMatched ? 'text-green-400' : 'text-n-1/75'}
                `}
                onClick={() => handleCardClick(card)}
              >
                {(card.isFlipped || card.isMatched) ? card.value : '?'}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MemoryMatch;
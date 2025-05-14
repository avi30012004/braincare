import React, { useState, useEffect } from 'react';
import { generate as generateSudoku } from 'sudoku-umd';

const Sudoku = () => {
  const cellBaseClasses = "w-10 h-10 text-center border text-lg font-semibold focus:outline-none";
  const [puzzle, setPuzzle] = useState([]);
  const [initial, setInitial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [validation, setValidation] = useState(Array(81).fill('initial'));
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(0); // 0: easy, 1: medium, 2: hard
  const [initialClueCount, setInitialClueCount] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const newPuzzle = generateSudoku();
    const initialGivens = newPuzzle.split('').map(cell => cell === '.' ? null : cell);
    setPuzzle(newPuzzle.split(''));
    setValidation(newPuzzle.split('').map(cell => cell === '.' ? 'initial' : 'valid'));
    setInitial(initialGivens);
    setInitialClueCount(initialGivens.filter(cell => cell !== null).length);
    setLoading(false);
  }, [difficulty]);

  useEffect(() => {
    if (isSolved) {
      // Calculate score based on correct user-filled cells
      const userFilledCorrectly = puzzle.filter((cell, i) => initial[i] === null && cell !== '.' && isValidMove(puzzle, Math.floor(i / 9), i % 9, cell)).length;
      const maxPossibleScore = 81 - initialClueCount;
      setScore(prevScore => prevScore + Math.floor((userFilledCorrectly / maxPossibleScore) * 1000)); // Simple scoring

      // Increase difficulty for the next puzzle
      setDifficulty(prevDifficulty => Math.min(prevDifficulty + 1, 2)); // Limit difficulty to 2 (hard)

      // Reset game state for the next puzzle
      setIsSolved(false);
      setLoading(true);
    }
  }, [isSolved, puzzle, initial, initialClueCount]);

  const isValidMove = (grid, row, col, num) => {
    if (num === '.') return true;
    for (let c = 0; c < 9; c++) {
      if (c !== col && grid[row * 9 + c] === num) return false;
    }
    for (let r = 0; r < 9; r++) {
      if (r !== row && grid[r * 9 + col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if ((startRow + r !== row || startCol + c !== col) && grid[(startRow + r) * 9 + (startCol + c)] === num) {
          return false;
        }
      }
    }
    return true;
  };

  const isSudokuSolved = (grid) => {
    if (grid.includes('.')) return false;
    for (let i = 0; i < 81; i++) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      if (!isValidMove(grid, row, col, grid[i])) return false;
    }
    return true;
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^[1-9]$|^$/.test(value)) {
      const newPuzzle = [...puzzle];
      newPuzzle[index] = value === '' ? '.' : value;
      setPuzzle(newPuzzle);
      setValidation(newPuzzle.map((cell, i) =>
        initial[i] !== null ? 'valid' : (cell === '.' ? 'initial' :
          (isValidMove(newPuzzle, Math.floor(i / 9), i % 9, cell) ? 'valid' : 'invalid'))
      ));
      setIsSolved(isSudokuSolved(newPuzzle));
    }

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Sudoku</h1>
      <div className="mb-4 text-xl">Score: {score}</div>
      <div className="mb-6 text-lg">Difficulty: {['Easy', 'Medium', 'Hard'][difficulty]}</div>
      {loading ? (
        <div>Generating new puzzle...</div>
      ) : (
        <table className="border-collapse">
          <tbody>
            {Array.from({ length: 9 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 9 }).map((_, colIndex) => {
                  const index = rowIndex * 9 + colIndex;
                  const cell = puzzle[index];
                  const isInitial = initial[index] !== null;

                  let validationClass = '';
                  if (!isInitial) {
                    if (validation[index] === 'invalid') {
                      validationClass = 'bg-red-500/20 text-red-400';
                    } else if (validation[index] === 'valid') {
                      validationClass = 'text-green-400';
                    }
                  }

                  const borderClasses = `
                    ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 border-gray-500' : ''}
                    ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 border-gray-500' : ''}
                  `;

                  return (
                    <td key={colIndex} className={`${cellBaseClasses} ${borderClasses} ${validationClass}`}>
                      {isInitial ? (
                        <span>{initial[index]}</span>
                      ) : (
                        <input
                          type="text"
                          maxLength={1}
                          value={cell === '.' ? '' : cell}
                          onChange={(e) => handleInputChange(e, index)}
                          className="w-full h-full bg-transparent text-center"
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isSolved && (
        <div className="mt-4 text-green-400 font-semibold text-xl">
          🎉 Congratulations! You solved the Sudoku!
        </div>

      )}
    </div>
  );
};

export default Sudoku;

import React, { useState } from 'react';

const GuidedJournaling = () => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [journalEntry, setJournalEntry] = useState('');

  const prompts = [
    "What are three things you are grateful for today?",
    "Write about a challenge you faced recently and how you handled it.",
    "Describe a time you felt proud of yourself.",
    "What are your goals for the week?",
  ];

  const handleNextPrompt = () => {
    setCurrentPrompt((prevPrompt) => (prevPrompt + 1) % prompts.length);
    setJournalEntry(''); // Clear the text area for the new prompt
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-n-8 text-n-1 p-4">
      <h2>Guided Journaling Prompt</h2>
      <div className="mb-4 text-lg">
        {prompts[currentPrompt]}
      </div>
      <textarea
        className="w-full max-w-md h-40 p-2 border border-n-1/50 rounded bg-n-7 text-n-1"
        value={journalEntry}
        onChange={(e) => setJournalEntry(e.target.value)}
        placeholder="Write your journal entry here..."
      ></textarea>
      <button onClick={handleNextPrompt} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Next Prompt</button>
    </div>
  );
};

export default GuidedJournaling;
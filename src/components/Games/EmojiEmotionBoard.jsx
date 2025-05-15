import React, { useState } from 'react';

const EmojiEmotionBoard = () => {
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [insights, setInsights] = useState("");
  const [note, setNote] = useState("");

  const emojiCategories = {
    Happy: [
      { emoji: '😊', description: 'Happy' },
      { emoji: '😂', description: 'Joyful' },
      { emoji: '🥳', description: 'Celebratory' },
      { emoji: '😍', description: 'In Love' },
      { emoji: '🥰', description: 'Affectionate' },
    ],
    Sad: [
      { emoji: '😢', description: 'Sad' },
      { emoji: '😥', description: 'Disappointed' },
      { emoji: '😭', description: 'Crying' },
      { emoji: '😔', description: 'Pensive' },
    ],
    Angry: [
      { emoji: '😡', description: 'Angry' },
      { emoji: '😠', description: 'Annoyed' },
      { emoji: '🤬', description: 'Furious' },
    ],
    Anxious: [
      { emoji: '😟', description: 'Worried' },
      { emoji: '😨', description: 'Fearful' },
      { emoji: '😰', description: 'Anxious' },
      { emoji: '😬', description: 'Grimacing' },
    ],
    Calm: [
      { emoji: '😌', description: 'Calm' },
      { emoji: '😊', description: 'Content' },
      { emoji: '🧘‍♀️', description: 'Meditative' },
    ],
    Tired: [
      { emoji: '😴', description: 'Sleepy' },
      { emoji: '😫', description: 'Fatigued' },
      { emoji: '😩', description: 'Weary' },
    ],
    Confused: [
      { emoji: '😕', description: 'Confused' },
      { emoji: '🤔', description: 'Thinking' },
      { emoji: '🤨', description: 'Skeptical' },
    ],
    Neutral: [
      { emoji: '😐', description: 'Neutral' },
    ],
  };

  const allEmojis = Object.values(emojiCategories).flat();

  const handleEmojiClick = (emoji) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter(item => item !== emoji));
    } else {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };

  const generateInsights = () => {
    if (selectedEmojis.length > 0) {
      const descriptions = selectedEmojis.map(e => e.description).join(', ');
      setInsights(`You selected emotions like: ${descriptions}. Take a moment to reflect on what might be triggering them today.`);
    } else {
      setInsights("Please select some emojis that reflect your current mood.");
    }
  };

  return (
    <div className="min-h-screen bg-n-8 text-n-1 p-8 flex flex-col items-center gap-6">
      <h2 className="text-3xl font-semibold">🧠 Emoji Emotion Board</h2>

      <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
        {allEmojis.map((emoji, idx) => (
          <button
            key={idx}
            onClick={() => handleEmojiClick(emoji)}
            className={`text-4xl transition-transform ${
              selectedEmojis.includes(emoji) ? 'border-2 border-purple-400 rounded-xl scale-110 shadow-lg' : ''
            }`}
          >
            {emoji.emoji}
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a short note or reflection..."
        className="w-full max-w-2xl p-4 mt-4 rounded-md bg-n-6 text-n-1 border border-n-4 resize-none"
        rows={4}
      />

      <button
        onClick={generateInsights}
        className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md"
      >
        Get Insights
      </button>

      {insights && (
        <div className="mt-6 bg-n-7 p-4 rounded-md max-w-2xl shadow-md border border-purple-500">
          <p className="text-lg text-purple-300 font-medium">{insights}</p>
        </div>
      )}
    </div>
  );
};

export default EmojiEmotionBoard;

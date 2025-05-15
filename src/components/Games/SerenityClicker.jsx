import React, { useState, useRef, useEffect } from 'react';

const SerenityClicker = () => {
  const [currentQuote, setCurrentQuote] = useState("Click anywhere to find some peace.");
  const audioRef = useRef(null);
  
  const quotes = [
    "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    "Peace comes from within. Do not seek it without.",
    "You cannot control the waves, but you can learn to surf.",
    "Inhale the future, exhale the past.",
    "The quieter you become, the more you can hear.",
    "Breathe. You’re doing better than you think.",
    "Let go of what you can’t control. Embrace what you can.",
    "It's okay to not be okay. Just don't give up.",
    "You are more than your thoughts.",
    "Don't let yesterday take up too much of today.",
    "One day at a time. One breath at a time.",
    "Be kind to your mind.",
    "Rest is productive.",
    "Healing is not linear.",
    "Progress, not perfection.",
    "Even the darkest night will end and the sun will rise.",
    "Trust the process.",
    "You’ve survived 100% of your worst days.",
    "This too shall pass.",
    "Take a deep breath and start again.",
    "Peace is not the absence of conflict, but the ability to cope with it.",
    "Your calm mind is the ultimate weapon against stress.",
    "Happiness is not something ready made. It comes from your own actions.",
    "Silence isn’t empty, it’s full of answers.",
    "You owe yourself the love you so freely give to others.",
    "Let it be. Let it go. Let it flow.",
    "Small steps every day lead to big changes.",
    "Don’t rush anything. Good things take time.",
    "Pause. Breathe. Proceed.",
    "You are not your mistakes.",
    "Give yourself permission to rest.",
    "Your pace is perfect for your journey.",
    "Nothing is permanent. Everything changes.",
    "Be still, and the earth will speak to you.",
    "Worry less, smile more.",
    "Focus on what you can control.",
    "Inner peace begins the moment you choose not to allow another person or event to control your emotions.",
    "Don’t believe everything you think.",
    "You are enough. You have always been enough.",
    "Sometimes the most productive thing you can do is relax.",
    "A calm mind brings inner strength and self-confidence.",
    "Nature does not hurry, yet everything is accomplished.",
    "Today, I will not stress over things I can’t control.",
    "Feelings are just visitors. Let them come and go.",
    "The best way out is always through.",
    "Turn your wounds into wisdom.",
    "There is beauty in simplicity.",
    "Surrender to what is. Let go of what was. Have faith in what will be.",
    "Take time to do what makes your soul happy.",
    "Stay close to people who feel like sunshine.",
  ];

  // Initialize audio once
  useEffect(() => {
    audioRef.current = new Audio('/sounds/soothing-sound.mp3'); // Put your soothing sound in the public folder
    audioRef.current.volume = 0.3; // Lower volume for gentle effect
  }, []);

  const handleClick = () => {
    // Play soothing sound, restart if already playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        // Handle any playback errors silently
        console.warn("Audio playback failed", err);
      });
    }

    // Pick a new random calming quote (avoid immediate repeats)
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (quotes[randomIndex] === currentQuote && quotes.length > 1);

    setCurrentQuote(quotes[randomIndex]);
  }

  return (
    <main
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className="flex flex-col items-center justify-center min-h-screen bg-n-8 text-n-1 p-6 select-none cursor-pointer transition-colors duration-300 focus:outline-none"
      aria-label="Click or press enter to receive a calming quote and soothing sound" style={{ background: 'linear-gradient(to bottom, #1a1a2e, #2a0a3a)' }} // Added a calm linear gradient
    >
      <h2 className="text-3xl font-bold mb-4 font-code">Serenity Clicker</h2>
      <p className="text-xl mb-6 text-center max-w-2xl">{currentQuote}</p>
      <p className="text-sm text-n-1/75">Click anywhere for a quote</p>
    </main>
  );
};

export default SerenityClicker;

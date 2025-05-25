import React, { useState } from 'react';
import Benefits from './components/Benefits';
import Collaboration from './components/Collabration';
import AIChat from './components/AIChat';
import Dashboard from './components/Dashboard';
import GroupChat from './components/GroupChat';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import Hero from './components/Hero';
import ButtonGradient from './assets/svg/ButtonGradient';
import Services from './components/Services';
import Footer from './components/Footer';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sudoku from './components/Games/Sudoku';
import { ClerkProvider } from "@clerk/clerk-react";
import GamesAndTasks from './components/GamesAndTasks';
import WordScramble from './components/Games/WordScramble';
import MemoryMatch from './components/Games/MemoryMatch';
import BreathingGuide from './components/Games/BreathingGuide';
import DigitalDoodlePad from './components/Games/DigitalDoodlePad';
import GuidedJournaling from './components/Games/Journaling';
import SerenityClicker from './components/Games/SerenityClicker';
import EmojiEmotionBoard from './components/Games/EmojiEmotionBoard';

const App = () => {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [loadingAssessment, setLoadingAssessment] = useState(false);
  const [assessmentError, setAssessmentError] = useState(null);

  const handleAssessmentComplete = async (userAnswers) => {
    setLoadingAssessment(true);
    setAssessmentError(null);
    setAssessmentResult(null);

    try {
      // Assuming stressQuestions is available or passed from AIChat if needed for mapping
      // For now, let's assume AIChat passes the mapped assessmentData directly

      const response = await fetch('/api/analyzeStress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assessmentData: userAnswers, clerkUserId: 'test_user_' + Date.now() }), // Pass the userAnswers directly
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to fetch stress assessment');
      }

      setAssessmentResult(data.stressAssessment.result);
    } catch (err) {
      setAssessmentError(err.message);
    } finally {
      setLoadingAssessment(false);
    }
  };

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <BrowserRouter>
        <div className='pt-[4.75rem] lg:pt-[5.25] overflow-hidden'>
          <Header />
            <Routes>
              <Route path="/" element={<>
                <Hero />
                <Benefits />
                <Collaboration />
                <Services />
              </>} />
              <Route
                path="/healbot"
                element={
                  <AIChat
                    onAssessmentComplete={handleAssessmentComplete}
                    stressAssessmentResult={assessmentResult}
                    isLoading={loadingAssessment}
                    error={assessmentError}
                  />
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/groupchat" element={<GroupChat />} />
              <Route path="/play" element={<GamesAndTasks />} />
              <Route path="/games/sudoku" element={<Sudoku />} />
              <Route path="/games/wordscramble" element={<WordScramble />} />
              <Route path="/games/memorymatch" element={<MemoryMatch />} />
              <Route path="/games/breathingguide" element={<BreathingGuide />} />
              <Route path="/games/doodlepad" element={<DigitalDoodlePad />} />
              <Route path="/games/journaling" element={<GuidedJournaling />} />
              <Route path="/games/serenityclicker" element={<SerenityClicker />} />
              <Route path="/games/emojiboard" element={<EmojiEmotionBoard />} />
              
          </Routes>
          <Footer />
        </div>
            {/* Add other routes here as needed */}
        <ButtonGradient />
      </BrowserRouter>
    </ClerkProvider>
  );
};

export default App;

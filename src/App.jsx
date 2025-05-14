import ButtonGradient from './assets/svg/ButtonGradient';
import Benefits from './components/Benefits';
import Collaboration from './components/Collabration';
import AIChat from './components/AIChat';
import Dashboard from './components/Dashboard';
import GroupChat from './components/GroupChat';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import Hero from './components/Hero';
import Services from './components/Services';
import Footer from './components/Footer';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sudoku from './components/Games/Sudoku';
import { ClerkProvider } from "@clerk/clerk-react";
import GamesAndTasks from './components/GamesAndTasks';
import WordScramble from './components/Games/WordScramble';
import MemoryMatch from './components/Games/MemoryMatch';

const App = () => {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
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
              <Route path="/healbot" element={<AIChat />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/groupchat" element={<GroupChat />} />
              <Route path="/play" element={<GamesAndTasks />} />
              <Route path="/games/sudoku" element={<Sudoku />} />
              <Route path="/games/wordscramble" element={<WordScramble />} />
              <Route path="/games/memorymatch" element={<MemoryMatch />} />
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

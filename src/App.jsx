import ButtonGradient from './assets/svg/ButtonGradient';
import Benefits from './components/Benefits';
import Collaboration from './components/Collabration';
import AIChat from './components/AIChat';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Footer from './components/Footer';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from "@clerk/clerk-react";

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

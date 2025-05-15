import React, { useState, useEffect, useRef } from 'react';

const BreathingGuide = () => {
  const [phase, setPhase] = useState('idle');
  const [currentPhaseTime, setCurrentPhaseTime] = useState(0);
  const [inhaleDuration, setInhaleDuration] = useState(4);
  const [holdDuration, setHoldDuration] = useState(7);
  const [exhaleDuration, setExhaleDuration] = useState(8);
  const [sessionDuration, setSessionDuration] = useState(5); // Session duration in minutes
  const [sessionTimeLeft, setSessionTimeLeft] = useState(sessionDuration * 60);
  const [usageCount, setUsageCount] = useState(0);
  const [breathingCircleSize, setBreathingCircleSize] = useState(100); // Initial size

  const intervalRef = useRef(null);
  const sessionIntervalRef = useRef(null);
  const circleAnimationRef = useRef(null);

  const startGuide = () => {
    // Increment usage count (basic tracking)
    setUsageCount(prevCount => prevCount + 1);

    setSessionTimeLeft(sessionDuration * 60);
    setPhase('inhale');
    setCurrentPhaseTime(inhaleDuration);

    // Start session timer
    sessionIntervalRef.current = setInterval(() => {
      setSessionTimeLeft(prevTime => {
        if (prevTime <= 1) {
          stopGuide();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopGuide = () => {
    clearInterval(intervalRef.current);
    clearInterval(sessionIntervalRef.current);
    cancelAnimationFrame(circleAnimationRef.current);
    setPhase('idle');
    setCurrentPhaseTime(0);
    setSessionTimeLeft(sessionDuration * 60); // Reset session timer
    setBreathingCircleSize(100); // Reset circle size
  };

  useEffect(() => {
    if (phase === 'idle') {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentPhaseTime((prevTime) => {
        if (prevTime <= 1) {
          if (phase === 'inhale') {
            setPhase('hold');
            return holdDuration;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return exhaleDuration;
          } else if (phase === 'exhale') {
            // Check if session is over
            if (sessionTimeLeft <= 1) {
               stopGuide();
               return 0; // Or a value indicating end
            }
            setPhase('inhale');
            return inhaleDuration;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [phase, inhaleDuration, holdDuration, exhaleDuration, sessionTimeLeft]);

  // Visual feedback animation
  useEffect(() => {
    const animateCircle = (timestamp) => {
      const duration = phase === 'inhale' ? inhaleDuration * 1000 : phase === 'hold' ? holdDuration * 1000 : exhaleDuration * 1000;
      const startTime = useRef(timestamp);
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);

      let newSize = 100;
      if (phase === 'inhale') {
        newSize = 100 + progress * 100; // Expand from 100 to 200
      } else if (phase === 'hold') {
        newSize = 200; // Stay at 200
      } else if (phase === 'exhale') {
        newSize = 200 - progress * 100; // Contract from 200 to 100
      }

      setBreathingCircleSize(newSize);

      if (progress < 1) {
        circleAnimationRef.current = requestAnimationFrame(animateCircle);
      }
    };

    if (phase !== 'idle') {
        circleAnimationRef.current = requestAnimationFrame(animateCircle);
    }

    return () => cancelAnimationFrame(circleAnimationRef.current);
  }, [phase, inhaleDuration, holdDuration, exhaleDuration]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-n-8 text-n-1">
      <h2 className="text-3xl font-bold mb-4 font-code">4-7-8 Breathing Guide</h2>
      <div className={`text-4xl font-bold mb-6 ${phase === 'inhale' ? 'text-green-400' : phase === 'hold' ? 'text-yellow-400' : phase === 'exhale' ? 'text-red-400' : 'text-n-1/75'}`}>
        {phase === 'idle' ? 'Press Start' : phase.charAt(0).toUpperCase() + phase.slice(1) + ': ' + currentPhaseTime}
      </div>

      {/* Visual Feedback (Breathing Circle) */}
      <div
        className="w-40 h-40 rounded-full bg-blue-500 flex items-center justify-center mb-6 transition-all duration-1000 ease-in-out"
 style={{ width: `${breathingCircleSize}px`, height: `${breathingCircleSize}px`, backgroundColor: phase === 'inhale' ? '#48bb78' : phase === 'hold' ? '#ecc94b' : phase === 'exhale' ? '#f56565' : '#a0aec0' }}
      >
        <span className="text-n-1 text-xl font-bold">{phase === 'idle' ? '' : currentPhaseTime}</span>
      </div>

      {/* Session Timer */}
      {phase !== 'idle' && (
        <div className="text-lg mb-4 font-code">Session Time Left: {formatTime(sessionTimeLeft)}</div>
      )}

      {/* Controls */}
      <div className="space-x-4">
        {phase === 'idle' && (
          <button onClick={startGuide} className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-code">Start</button>
        )}
        {phase !== 'idle' && <button onClick={stopGuide} className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-code">Stop</button>}
      </div>

      {/* Customizable Timings */}
      <div className="mt-8 w-full max-w-xs">
        <h3 className="text-xl font-bold mb-4 font-code text-center">Customize Timings (Seconds)</h3>
        <div className="flex justify-between items-center mb-4">
          <label htmlFor="inhale" className="font-code">Inhale:</label>
          <input id="inhale" type="number" value={inhaleDuration} onChange={(e) => setInhaleDuration(Math.max(1, parseInt(e.target.value)))} className="w-20 px-2 py-1 rounded bg-n-7 text-n-1" min="1" />
        </div>
        <div className="flex justify-between items-center mb-4">
          <label htmlFor="hold" className="font-code">Hold:</label>
          <input id="hold" type="number" value={holdDuration} onChange={(e) => setHoldDuration(Math.max(0, parseInt(e.target.value)))} className="w-20 px-2 py-1 rounded bg-n-7 text-n-1" min="0" />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="exhale" className="font-code">Exhale:</label>
          <input id="exhale" type="number" value={exhaleDuration} onChange={(e) => setExhaleDuration(Math.max(1, parseInt(e.target.value)))} className="w-20 px-2 py-1 rounded bg-n-7 text-n-1" min="1" />
        </div>
      </div>

      {/* Usage Tracking (Basic Display) */}
      <div className="mt-4 text-sm text-n-1/75 font-code">Guide used: {usageCount} times</div>
    </div>
  );
};

export default BreathingGuide;
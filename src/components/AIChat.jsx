import React, { useState } from 'react';

const AIChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stressAssessmentResult, setStressAssessmentResult] = useState(null);

  // Predefined sample answers for the stress test
  const sampleTestAnswers = [
    "I feel overwhelmed by my daily tasks.",
    "I have trouble sleeping most nights.",
    "I often feel irritable and on edge.",
    "It's hard for me to relax, even when I try."
  ];

  const handleTakeStressTest = async () => {
    setIsLoading(true);
    setError(null);
    setStressAssessmentResult(null);

    try {
      const response = await fetch('/api/ai/analyzeMood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Clerk should automatically include the session token for authenticated users
        },
        body: JSON.stringify({ testAnswers: sampleTestAnswers }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to fetch stress assessment');
      }

      setStressAssessmentResult(data.stressAssessment.result);
    } catch (err) {
      console.error("Error taking stress test:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-n-8 flex flex-col items-center px-5 lg:px-10 py-10'>
      <div className='w-full max-w-7xl flex flex-col'>
        {/* Chat Header */}
        <div className='w-full px-10 py-8 border-b border-n-6'>
          <h1 className='text-4xl lg:text-5xl font-bold text-n-1 font-code'>Healbot</h1>
          <p className='text-n-1/50'>Your private space to express and heal. Take a quick stress assessment below.</p>
        </div>

        {/* Stress Meter Placeholder - Can be updated with actual stress level later */}
        <div className='w-full bg-n-7 h-2 rounded-full mt-4 mb-8'>
          <div 
            className='bg-color-1 h-full rounded-full transition-all duration-500 ease-in-out' 
            style={{ width: stressAssessmentResult ? (stressAssessmentResult.stressLevel === 'Low' ? '25%' : stressAssessmentResult.stressLevel === 'Moderate' ? '50%' : stressAssessmentResult.stressLevel === 'High' ? '75%' : stressAssessmentResult.stressLevel === 'Critical' ? '100%' : '0%') : '0%' }}
          ></div>
        </div>

        <div className='w-full px-10 py-8 text-center'>
          <button 
            onClick={handleTakeStressTest} 
            disabled={isLoading}
            className='px-6 py-3 rounded-full bg-color-1 text-n-1 hover:bg-color-2 transition-colors disabled:opacity-50 font-code'
          >
            {isLoading ? 'Analyzing...' : 'Take Stress Assessment'}
          </button>
        </div>

        {error && (
          <div className='w-full px-10 py-4 text-center text-red-500'>
            <p>Error: {error}</p>
          </div>
        )}

        {stressAssessmentResult && (
          <div className='w-full px-10 py-8 mt-4 bg-n-7 rounded-lg text-n-1'>
            <h2 className='text-2xl font-bold mb-4 font-code'>Your Stress Assessment:</h2>
            <p className='mb-2'><strong className='font-semibold'>Stress Level:</strong> {stressAssessmentResult.stressLevel}</p>
            <p className='mb-2'><strong className='font-semibold'>Summary:</strong> {stressAssessmentResult.summary}</p>
            <div>
              <strong className='font-semibold'>Recommendations:</strong>
              <ul className='list-disc list-inside ml-4 mt-1'>
                {stressAssessmentResult.recommendations && stressAssessmentResult.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Original Chat Interface Placeholder (can be integrated later) */}
        {/* 
        <div className='flex-1 overflow-y-auto py-8 px-10'> 
          <div className='space-y-4'>
             Message bubbles here 
          </div>
        </div>
        <div className='p-6 border-t border-n-6'>
          <div className='flex items-center space-x-4'>
            <input type='text' placeholder='Share your thoughts...' className='w-full px-4 py-2 rounded-full bg-n-9 text-n-1 placeholder:text-n-1/50 focus:outline-none focus:ring-2 focus:ring-color-1' />
            <button className='px-4 py-2 rounded-full bg-color-1 text-n-1 hover:bg-color-2 transition-colors'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' /></svg>
            </button>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default AIChat;

import React, { useState } from 'react';

// Define your stress assessment questions here
const stressQuestions = [
  // Work/Career
  "Imagine you're facing a tight deadline at work with multiple projects demanding your attention. How do you typically react in such situations? Describe your physical sensations, thoughts, and behaviors.",
  "Your boss just announced a major restructuring. How does this news make you feel? What steps would you take to cope with the uncertainty?",
  "Describe a recent workplace conflict and how you handled it. How did you feel before, during, and after the conflict?",
  "How often do you find yourself working overtime or bringing work home? How does this affect your personal life?",
  "Do you feel appreciated and supported in your workplace? Why or why not?",

  // Relationships
  "Imagine your partner is constantly criticizing your habits. How would you address this situation? How would it make you feel?",
  "You have a disagreement with a close friend. How do you typically handle such disagreements? What are your immediate and long-term reactions?",
  "Your family is going through a difficult time. How do you provide support while also managing your own emotional well-being?",
  "How often do you feel truly listened to and understood in your relationships? Can you give a recent example?",
  "Do you feel you have a strong support system you can rely on during challenging times?",

  // Finances
  "Imagine an unexpected expense arises, such as a car repair or medical bill. How would you react and manage the situation?",
  "How often do you worry about money? Does this worry affect your sleep, appetite, or mood?",
  "Do you feel in control of your finances? Why or why not?",

  // Health & Well-being
  "You wake up feeling unwell. How does this impact your day? What steps do you take to care for yourself?",
  "Describe your typical sleep patterns. Do you experience any difficulties falling asleep or staying asleep?",
  "How often do you engage in activities that you find relaxing and enjoyable? What are those activities?",
  "How would you describe your overall energy levels throughout the day?",
  "Have you noticed any changes in your appetite or eating habits recently?",

  // Follow-up questions
  "How long have you been feeling this way?",
  "What have you tried so far to manage these feelings?",
  "What would make you feel less stressed?",
  "On a scale of 1 to 10, with 1 being no stress and 10 being extreme stress, how would you rate your current stress level?"
];

const AIChat = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(stressQuestions.length).fill(''));
  const [currentInput, setCurrentInput] = useState('');
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stressAssessmentResult, setStressAssessmentResult] = useState(null);

  const handleInputChange = (event) => {
    setCurrentInput(event.target.value);
  };

  const handleNextQuestion = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = currentInput;
    setUserAnswers(updatedAnswers);
    setCurrentInput(''); // Clear input for next question

    if (currentQuestionIndex < stressQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Optionally, pre-fill input if user already answered this question in a previous session
      // setCurrentInput(userAnswers[currentQuestionIndex + 1] || '');
    } else {
      // Last question answered, trigger assessment
      setAssessmentComplete(true);
      analyzeStress(updatedAnswers);
    }
  };

  const analyzeStress = async (answers) => {
    setIsLoading(true);
    setError(null);
    setStressAssessmentResult(null);

    try {
      const response = await fetch('/api/ai/analyzeMood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testAnswers: answers }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to fetch stress assessment');
      }

      setStressAssessmentResult(data.stressAssessment.result);
    } catch (err) {
      console.error("Error analyzing stress:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate stress meter percentage (using a simple mapping for demo)
  const stressLevelToPercentage = stressAssessmentResult ? 
    (stressAssessmentResult.stressLevel === 'Low' ? '25%' :
     stressAssessmentResult.stressLevel === 'Moderate' ? '50%' :
     stressAssessmentResult.stressLevel === 'High' ? '75%' :
     stressAssessmentResult.stressLevel === 'Critical' ? '100%' : '0%')
    : '0%';

  return (
    <div className='min-h-screen bg-n-8 flex flex-col items-center px-5 lg:px-10 py-10'>
      <div className='w-full max-w-7xl flex flex-col'>
        {/* Chat Header */}
        <div className='w-full px-10 py-8 border-b border-n-6'>
          <h1 className='text-4xl lg:text-5xl font-bold text-n-1 font-code'>Healbot Stress Assessment</h1>
          <p className='text-n-1/50'>Answer the questions below to get a stress assessment.</p>
        </div>

        {/* Stress Meter Placeholder */}
        <div className='w-full bg-n-7 h-2 rounded-full mt-4 mb-8'>
          <div 
            className='bg-color-1 h-full rounded-full transition-all duration-500 ease-in-out' 
            style={{ width: stressLevelToPercentage }}
          ></div>
        </div>

        {!assessmentComplete ? (
          <div className='flex-1 overflow-y-auto py-8 px-10'>
            <div className='mb-4'>
              {/* Bot Message (Question) */}
              <div className='flex justify-start items-start mb-4'>
                <div className='bg-n-6 rounded-xl p-3 text-n-1 max-w-[80%]'>
                  <p className='text-xs text-n-1/50'>Healbot</p>
                  <p className='font-code'>{stressQuestions[currentQuestionIndex]}</p>
                </div>
              </div>

              {/* User Input */}
              <div className='flex justify-end items-end'>
                <div className='w-full'>
                  <input
                    type='text'
                    placeholder='Type your answer here...'
                    className='w-full px-4 py-2 rounded-full bg-n-9 text-n-1 placeholder:text-n-1/50 focus:outline-none focus:ring-2 focus:ring-color-1'
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyPress={(event) => { if (event.key === 'Enter') handleNextQuestion(); }}
                    disabled={isLoading} // Disable input while analyzing
                  />
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            <div className='w-full text-center mt-6'>
              <button 
                onClick={handleNextQuestion} 
                disabled={isLoading || currentInput.trim() === ''}
                className='px-6 py-3 rounded-full bg-color-1 text-n-1 hover:bg-color-2 transition-colors disabled:opacity-50 font-code'
              >
                {currentQuestionIndex < stressQuestions.length - 1 ? 'Next Question' : 'Get Assessment'}
              </button>
            </div>

          </div>
        ) : (
          // Assessment Complete - Display Results
          <div className='flex-1 overflow-y-auto py-8 px-10'>
            {isLoading ? (
              <div className='text-center text-n-1 font-code'>Analyzing your responses...</div>
            ) : error ? (
              <div className='text-center text-red-500 font-code'>Error: {error}</div>
            ) : stressAssessmentResult && (
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
                {/* Optional: Add a button to restart the assessment */}
                <div className='w-full text-center mt-6'>
                    <button 
                        onClick={() => { 
                            setCurrentQuestionIndex(0);
                            setUserAnswers(Array(stressQuestions.length).fill(''));
                            setCurrentInput('');
                            setAssessmentComplete(false);
                            setStressAssessmentResult(null);
                        }}
                        className='px-6 py-3 rounded-full bg-color-1 text-n-1 hover:bg-color-2 transition-colors font-code'
                    >
                        Restart Assessment
                    </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Optional: Keep the general chat input if you want a hybrid mode later */}
        {/* 
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

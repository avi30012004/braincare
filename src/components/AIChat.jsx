import React, { useState } from 'react';

// Define your stress assessment questions here
const stressQuestions = [
  {
    category: "School",
    question: "Mega quiz attack! You have three tests and a huge paper due the same week. What do you do?",
    options: [
      { text: "a) Go with the flow – stress is for losers! (Maybe drink lots of soda.)", value: "a" },
      { text: "b) Plan everything out – make a schedule, pull some all-nighters.", value: "b" },
      { text: "c) Hide – maybe it will all magically disappear? (It won't.)", value: "c" },
    ]
  },
  {
    category: "School",
    question: "Essay fail: Your amazing paper gets a bad grade. How do you react?",
    options: [
      { text: "a) Use the teacher's comments to make it better!", value: "a" },
      { text: "b) Eat pizza and worry about it later.", value: "b" },
      { text: "c) Freak out and question everything.", value: "c" },
    ]
  },
  {
    category: "School",
    question: "Lost in class? The teacher might as well be speaking another language. You:",
    options: [
      { text: "a) Form a study group with your friends.", value: "a" },
      { text: "b) Go to the teacher's office for help.", value: "b" },
      { text: "c) Hope everyone else does badly so you don't look so bad.", value: "c" },
    ]
  },
  {
    category: "Money",
    question: "Laptop disaster! Your computer breaks right before a big deadline. You:",
    options: [
      { text: "a) Ask people for money to buy a new one.", value: "a" },
      { text: "b) Live at the library and use their computers.", value: "b" },
      { text: "c) Write everything by hand and hope it's readable.", value: "c" },
    ]
  },
  {
    category: "Money",
    question: "Part-time job offer: More money or more study time?",
    options: [
      { text: "a) Become a super-multitasker and do both!", value: "a" },
      { text: "b) Forget sleep – I need the money!", value: "b" },
      { text: "c) Focus on school and hope for a scholarship.", value: "c" },
    ]
  },
  {
    category: "Friends & Roommates",
    question: "Fear of missing out! Everyone's at a party, but you have to study. You:",
    options: [
      { text: "a) Chill at home with Netflix – no big deal.", value: "a" },
      { text: "b) Show up late and surprise everyone!", value: "b" },
      { text: "c) Feel sorry for yourself and stalk everyone on Instagram.", value: "c" },
    ]
  },
  {
    category: "Friends & Roommates",
    question: "Roommate trouble! You only communicate through angry sticky notes. You:",
    options: [
      { text: "a) Have a serious talk with your roommate.", value: "a" },
      { text: "b) Hide in your room with snacks and headphones.", value: "b" },
      { text: "c) Plan a funny prank to get back at them.", value: "c" },
    ]
  },
  {
    category: "Taking Care of Yourself",
    question: "You're tired and wired on caffeine. You look like:",
    options: [
      { text: "a) A normal, slightly tired student.", value: "a" },
      { text: "b) A zombie.", value: "b" },
      { text: "c) Someone who doesn't need sleep (or food).", value: "c" },
    ]
  },
  {
    category: "Taking Care of Yourself",
    question: "Super stressed! What do you do?",
    options: [
      { text: "a) Talk to friends, family, or a counselor.", value: "a" },
      { text: "b) Do yoga, meditate, or take deep breaths.", value: "b" },
      { text: "c) Eat lots of cookies and ice cream.", value: "c" },
    ]
  },
  {
    category: "Taking Care of Yourself",
    question: "Sleep? What's that? You practically live at the library. You:",
    options: [
      { text: "a) Use a sleep app with calming sounds.", value: "a" },
      { text: "b) Make your room super dark and quiet so you can sleep.", value: "b" },
      { text: "c) Become a night owl and own it.", value: "c" },
    ]
  },
  {
    category: "Stress in General",
    question: "Show your typical day as a college student using emojis:",
    options: [] // This question will have a text input
  },
  {
    category: "Stress in General",
    question: "If you had a superpower to fight stress, it would be:",
    options: [
      { text: "a) Teleporting to a deserted island.", value: "a" },
      { text: "b) Having unlimited ice cream and comfy socks.", value: "b" },
      { text: "c) The ability to stop time.", value: "c" },
    ]
  },
  {
    category: "Stress in General",
    question: "Stress emergency! What do you do first?",
    options: [
      { text: "a) Take deep breaths and tell yourself \"I can do this!\"", value: "a" },
      { text: "b) Play loud music and dance.", value: "b" },
      { text: "c) Cuddle with a cat.", value: "c" },
    ]
  },
  {
    category: "Stress in General",
    question: "You beat a stressful situation! How did you do it?",
    options: [
      { text: "a) Careful planning and hard work.", value: "a" },
      { text: "b) Never giving up!", value: "b" },
      { text: "c) Pure luck.", value: "c" },
    ]
  },
  {
    category: "Stress in General",
    question: "Snap your fingers! One thing you'd change about college to make it less stressful:",
    options: [] // This question will have a text input
  },
];

const AIChat = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(stressQuestions.length).fill(null)); // Changed initial value to null
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stressAssessmentResult, setStressAssessmentResult] = useState(null);

  const handleInputChange = (event) => {
    setCurrentInput(event.target.value);
  }; // This input is not used for multiple choice

  const handleOptionSelect = (optionValue) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = optionValue;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    const updatedAnswers = [...userAnswers]; // Declare updatedAnswers here
    // setCurrentInput(''); // This is for text input, not needed for multiple choice
    if (currentQuestionIndex < stressQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Optionally, pre-fill input if user already answered this question in a previous session
      // handleTextAnswerChange({ target: { value: userAnswers[currentQuestionIndex + 1] || '' } }); // Re-apply text answer if exists
    } else {
      // Last question answered, trigger assessment and mark assessment as complete
      setAssessmentComplete(true);
      analyzeStress(updatedAnswers);
    }
  };

  // Handle text input questions
  const handleTextAnswerChange = (event) => {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = event.target.value;
      setUserAnswers(updatedAnswers);
  };

  const currentQuestion = stressQuestions[currentQuestionIndex];
  const assessmentComplete = currentQuestionIndex === stressQuestions.length; // Determine assessment completion based on index

  const restartAssessment = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(stressQuestions.length).fill(null)); // Reset to null
    setCurrentInput(''); // This might not be needed anymore if not using text input
    setStressAssessmentResult(null);
    setError(null); // Also clear any previous errors on restart
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

        {currentQuestionIndex < stressQuestions.length ? ( // Render questions if assessment not complete
          <div className='flex-1 overflow-y-auto py-8 px-10'>
            <div className='mb-4'>
              {/* Bot Message (Question) */}
              <div className='flex justify-start items-start mb-6'>
                <div className='bg-n-6 rounded-xl p-3 text-n-1 max-w-[80%]'>
                  <p className='text-xs text-n-1/50'>Healbot</p>
                  <p className='font-code'>{currentQuestion.question}</p>
                </div>
              </div>

              {/* User Options or Text Input */}
              <div className='flex flex-col items-end'>
                <div className='w-full max-w-[80%]'>
                  {currentQuestion.options.length > 0 ? (
                    // Multiple choice options
                    <div className='flex flex-col space-y-3'>
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionSelect(option.value)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-code ${userAnswers[currentQuestionIndex] === option.value ? 'bg-color-1 text-n-1' : 'bg-n-9 text-n-1/75 hover:bg-n-7'}`}
                          disabled={isLoading}
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  ) : (
                    // Text input for open-ended questions
                    <input
                      type='text'
                      placeholder='Type your answer here...'
                      className='w-full px-4 py-3 rounded-lg bg-n-9 text-n-1 placeholder:text-n-1/50 focus:outline-none focus:ring-2 focus:ring-color-1 font-code'
                      value={userAnswers[currentQuestionIndex] || ''}
                      onChange={handleTextAnswerChange}
                      onKeyPress={(event) => { if (event.key === 'Enter') handleNextQuestion(); }}
                      disabled={isLoading} // Disable input while analyzing
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            <div className='w-full text-center mt-6'>
              <button 
                onClick={handleNextQuestion}
                // Disable if loading or if the current answer is not set for non-text questions
                disabled={isLoading || userAnswers[currentQuestionIndex] === null} // Simplified disabled condition
                className='px-6 py-3 rounded-full bg-color-1 text-n-1 hover:bg-color-2 transition-colors disabled:opacity-50 font-code'
              >
                {currentQuestionIndex < stressQuestions.length - 1 ? 'Next Question' : 'Get Assessment'}
              </button>
            </div>

          </div>
        ) : (
          // Assessment Complete - Display Results
          <div className='flex-1 overflow-y-auto py-8 px-10 flex flex-col items-center'> {/* Added items-center for centering */}
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
                        onClick={restartAssessment}
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

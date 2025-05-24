import React, { useState, useEffect } from 'react';

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
  const [userAnswers, setUserAnswers] = useState(Array(stressQuestions.length).fill(null));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stressAssessmentResult, setStressAssessmentResult] = useState(null);

  const handleOptionSelect = (value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = value;
    setUserAnswers(updatedAnswers);
  };

  const handleTextAnswerChange = (e) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < stressQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      analyzeStress(userAnswers);
    }
  };

  const restartAssessment = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(stressQuestions.length).fill(null));
    setStressAssessmentResult(null);
    setError(null);
  };

  const analyzeStress = async (answers) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
      console.log('Making request to Appwrite function...');
      console.log('Project ID:', appwriteProjectId);
      console.log('Answers:', answers);
      
      const response = await fetch('https://fra.cloud.appwrite.io/v1/functions/682e9f1a0010fa4f9d55/executions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Project': appwriteProjectId,
        },
        body: JSON.stringify({ 
          testAnswers: answers,
          clerkUserId: 'test_user_' + Date.now()
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers));
      
      const data = await response.json();
      console.log('Full API Response:', data);

      // Check if this is an Appwrite execution response
      if (data.$id && data.responseStatusCode !== undefined) {
        console.log('Appwrite execution response detected');
        console.log('Status code:', data.responseStatusCode);
        console.log('Response body:', data.responseBody);
        console.log('Errors:', data.errors);
        console.log('Logs:', data.logs);
        
        if (data.responseStatusCode !== 200) {
          throw new Error(`Function failed with status ${data.responseStatusCode}. Errors: ${data.errors || 'None'}. Logs: ${data.logs || 'None'}`);
        }
        
        if (!data.responseBody) {
          throw new Error('Function returned empty response body');
        }
        
        // Parse the actual function response
        try {
          const functionResult = JSON.parse(data.responseBody);
          console.log('Parsed function result:', functionResult);
          
          if (functionResult.success && functionResult.stressAssessment && functionResult.stressAssessment.result) {
            setStressAssessmentResult(functionResult.stressAssessment.result);
            return;
          } else {
            throw new Error('Invalid function response structure');
          }
        } catch (parseError) {
          console.error('Failed to parse function response body:', parseError);
          throw new Error(`Failed to parse function response: ${parseError.message}`);
        }
      } 
      // Direct function response (not wrapped in execution)
      else if (data.success && data.stressAssessment && data.stressAssessment.result) {
        console.log('Direct function response detected');
        setStressAssessmentResult(data.stressAssessment.result);
      } 
      else {
        console.error('Unexpected response structure:', data);
        throw new Error('Invalid response structure from function');
      }
      
    } catch (err) {
      console.error('Error analyzing stress:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const currentQuestion = stressQuestions[currentQuestionIndex];

  const stressLevelToPercentage = (level) => {
    return level === 'Low' ? '25%' :
           level === 'Moderate' ? '50%' :
           level === 'High' ? '75%' :
           level === 'Critical' ? '100%' : '0%';
  };

  const stressLevelToColor = (level) => {
    return level === 'Low' ? 'bg-green-500' :
           level === 'Moderate' ? 'bg-yellow-500' :
           level === 'High' ? 'bg-orange-500' :
           level === 'Critical' ? 'bg-red-500' : 'bg-gray-500';
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center px-5 py-10'>
      <div className='w-full max-w-4xl bg-white rounded-lg shadow-lg p-6'>
        {isLoading ? (
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
            <p className='text-lg'>Analyzing your answers...</p>
          </div>
        ) : stressAssessmentResult ? (
          <div>
            <h2 className='text-3xl font-bold mb-6 text-center'>Assessment Result</h2>
            
            <div className='bg-gray-50 p-6 rounded-lg mb-6'>
              <h3 className='text-xl font-semibold mb-3'>Stress Level: {stressAssessmentResult.stressLevel}</h3>
              <div className='w-full bg-gray-200 h-6 rounded-full mb-4'>
                <div
                  className={`h-6 rounded-full transition-all duration-500 ${stressLevelToColor(stressAssessmentResult.stressLevel)}`}
                  style={{ width: stressLevelToPercentage(stressAssessmentResult.stressLevel) }}
                ></div>
              </div>
            </div>

            {stressAssessmentResult.summary && (
              <div className='mb-6'>
                <h3 className='text-xl font-semibold mb-3'>Summary</h3>
                <p className='text-gray-700 leading-relaxed'>{stressAssessmentResult.summary}</p>
              </div>
            )}

            {stressAssessmentResult.recommendations && stressAssessmentResult.recommendations.length > 0 && (
              <div className='mb-6'>
                <h3 className='text-xl font-semibold mb-3'>Recommendations</h3>
                <ul className='space-y-2'>
                  {stressAssessmentResult.recommendations.map((rec, index) => (
                    <li key={index} className='flex items-start'>
                      <span className='text-blue-500 mr-2'>•</span>
                      <span className='text-gray-700'>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {stressAssessmentResult.academicClassSchedules && (
              <div className='mb-6'>
                <h3 className='text-xl font-semibold mb-3'>Suggested Academic Schedule</h3>
                <p className='text-gray-700 leading-relaxed'>{stressAssessmentResult.academicClassSchedules}</p>
              </div>
            )}

            <button 
              onClick={restartAssessment} 
              className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors'
            >
              Take Assessment Again
            </button>
          </div>
        ) : (
          <div>
            <div className='mb-4'>
              <div className='flex justify-between items-center mb-2'>
                <h2 className='text-xl font-semibold'>Question {currentQuestionIndex + 1} of {stressQuestions.length}</h2>
                <div className='text-sm text-gray-500'>{currentQuestion.category}</div>
              </div>
              <div className='w-full bg-gray-200 h-2 rounded-full'>
                <div 
                  className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                  style={{ width: `${((currentQuestionIndex + 1) / stressQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <p className='text-lg mb-6'>{currentQuestion.question}</p>
            
            {currentQuestion.options.length > 0 ? (
              <div className='space-y-3'>
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`block w-full text-left p-4 border-2 rounded-lg transition-all hover:border-blue-300 hover:bg-blue-50 ${
                      userAnswers[currentQuestionIndex] === opt.value 
                        ? 'border-blue-500 bg-blue-100' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => handleOptionSelect(opt.value)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            ) : (
              <textarea
                className='w-full border-2 border-gray-200 p-4 rounded-lg focus:border-blue-500 focus:outline-none resize-none'
                rows={4}
                placeholder='Type your answer here...'
                value={userAnswers[currentQuestionIndex] || ''}
                onChange={handleTextAnswerChange}
              />
            )}
            
            <button 
              onClick={handleNext} 
              disabled={!userAnswers[currentQuestionIndex]}
              className='w-full mt-6 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors'
            >
              {currentQuestionIndex === stressQuestions.length - 1 ? 'Complete Assessment' : 'Next Question'}
            </button>
            
            {error && (
              <div className='mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
                <p className='font-semibold'>Error:</p>
                <p>{error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChat;
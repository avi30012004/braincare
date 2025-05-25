import React, { useState } from 'react';

// Define your stress assessment questions here
const stressQuestions = [
  // Academics
  "Pop quiz! Three exams and a massive paper land on your doorstep the same week. Do you: a) Embrace the chaos, b) Strategically plan your survival, c) Hide under the covers and hope it all goes away?",
  "That essay you poured your heart and soul into gets a grade that resembles your bank account balance after spring break. Your reaction: a) Professor feedback is my fuel! b) Time to drown my sorrows in pizza (and maybe revise later), c) Question the meaning of life (and grading rubrics).",
  "Lost in lecture? Decoding ancient hieroglyphics would be easier than understanding this class. You: a) Form a study group and conquer together, b) Hit up office hours and charm the professor, c) Accept your fate and hope for a curve.",

  // Finances
  "Laptop meltdown! Right before a major deadline, your trusty tech companion decides to take an unscheduled vacation. You: a) Crowdfund a new one on campus, b) Become best friends with the library computers, c) Embrace the handwritten life (and pray for legible handwriting).",
  "Part-time job offer: Extra cash or extra study time? That is the question. You: a) Master the art of time management and become a multitasking ninja, b) Sleep is for the weak (and the wealthy), c) Prioritize academics and hope for a scholarship miracle.",

  // Social Life and Relationships
  "FOMO alert! Everyone's at that party and you're stuck at home with a textbook. You: a) No biggie, my Netflix queue is calling my name, b) Crash the party and make a grand entrance, c) Wallow in self-pity and stalk everyone's Instagram stories.",
  "Roommate drama! Passive-aggressive sticky notes are now the primary form of communication. You: a) Call a roommate summit and establish house rules, b) Invest in noise-canceling headphones and a personal stash of snacks, c) Plot elaborate pranks involving glitter and rubber ducks.",

  // Physical and Mental Well-being
  "Running on fumes and fueled by caffeine. You resemble a zombie more than a student. You: a) Schedule some me time and recharge, b) Embrace the chaos, it's just another Tuesday, c) Convince yourself that sleep is a social construct.",
  "Stress levels are reaching Mount Everest proportions. You: a) Vent to friends and family – a problem shared is a problem halved, b) Hit the gym or find a quiet corner to meditate, c) Embrace the comfort of carbs and sugary treats.",
  "Sleep? What's sleep? You’re more familiar with the campus library than your own bed. You: a) Try a sleep app and discover the magic of white noise, b) Invest in blackout curtains and earplugs – create a sleep sanctuary, c) Accept your fate and become a nocturnal creature.",

  // General Stress and Coping
  "Describe your typical day in the life of a college student using emojis only. 📚😴🍕🎉 stressed? 🤔😂😭",
  "Your ultimate stress-busting superpower is: a) The ability to teleport to a deserted island, b) Unlimited access to ice cream and fuzzy socks, c) The power to pause time.",
  "Code Red! Stress overload! Your first move is: a) Deep breaths and a calming mantra, b) Blast your favorite music and dance it out, c) Find the nearest cat and cuddle.",
  "You conquered a stressful situation like a boss! Your secret weapon was: a) Careful planning and strategic execution, b) Sheer willpower and a never-give-up attitude, c) A healthy dose of luck and a sprinkle of divine intervention.",
  "If you could snap your fingers and change one thing about college life to decrease stress, what would it be?"

  // Note: The follow-up questions were removed to match the length of the new questions provided.
];

const AIChat = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(stressQuestions.length).fill(''));
  const [currentInput, setCurrentInput] = useState('');
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stressAssessmentResult, setStressAssessmentResult] = useState(null); // Keep for displaying result

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
      // Removed the call to analyzeStress here.
      // The parent component or another part of your application
      // should now handle sending the userAnswers to the backend.
    }
  };

  // Removed the analyzeStress function entirely.

  // Helper function to calculate stress meter percentage (using a simple mapping for demo)
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
                <div className='bg-n-6 rounded-xl p-3 text-n-1 max-w-[80%]\'>
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
                    className='w-full px-4 py-2 rounded-full bg-n-9 text-n-1 placeholder:text-n-1/50 focus:outline-none focus:ring-2 focus:ring-color-1\'
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyPress={(event) => { if (event.key === 'Enter') handleNextQuestion(); }}
                    disabled={isLoading} // Keep isLoading for UI feedback if needed by parent
                  />
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            <div className='w-full text-center mt-6'>
              <button
                onClick={handleNextQuestion}
                disabled={isLoading || currentInput.trim() === ''} // Keep isLoading for UI feedback
                className='px-6 py-3 rounded-full bg-color-1 text-n-1 hover:bg-color-2 transition-colors disabled:opacity-50 font-code\'
              >
                {currentQuestionIndex < stressQuestions.length - 1 ? 'Next Question' : 'Get Assessment'}
              </button>
            </div>

          </div>
        ) : (
          // Assessment Complete - Display Results
          <div className='flex-1 overflow-y-auto py-8 px-10'>
            {isLoading ? ( // Keep isLoading for UI feedback
              <div className='text-center text-n-1 font-code'>Analyzing your responses...</div>
            ) : error ? ( // Keep error for displaying potential errors from parent
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
                            setStressAssessmentResult(null); // Reset result
                            setError(null); // Reset error
                        }}
                        className='px-6 py-3 rounded-full bg-color-1 text-n-1 hover:bg-color-2 transition-colors font-code\'
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
            <input type='text' placeholder='Share your thoughts...' className='w-full px-4 py-2 rounded-full bg-n-9 text-n-1 placeholder:text-n-1/50 focus:outline-none focus:ring-2 focus:ring-color-1\' />
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

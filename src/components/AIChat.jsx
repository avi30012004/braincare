import React, { useState } from 'react';

// Define stress assessment questions
const stressQuestions = [
  "Pop quiz! Three exams and a massive paper land on your doorstep the same week. Do you: a) Embrace the chaos, b) Strategically plan your survival, c) Hide under the covers and hope it all goes away?",
  "That essay you poured your heart and soul into gets a grade that resembles your bank account balance after spring break. Your reaction: a) Professor feedback is my fuel! b) Time to drown my sorrows in pizza (and maybe revise later), c) Question the meaning of life (and grading rubrics).",
  "Lost in lecture? Decoding ancient hieroglyphics would be easier than understanding this class. You: a) Form a study group and conquer together, b) Hit up office hours and charm the professor, c) Accept your fate and hope for a curve.",
  "Laptop meltdown! Right before a major deadline, your trusty tech companion decides to take an unscheduled vacation. You: a) Crowdfund a new one on campus, b) Become best friends with the library computers, c) Embrace the handwritten life (and pray for legible handwriting).",
  "Part-time job offer: Extra cash or extra study time? That is the question. You: a) Master the art of time management and become a multitasking ninja, b) Sleep is for the weak (and the wealthy), c) Prioritize academics and hope for a scholarship miracle.",
  "FOMO alert! Everyone's at that party and you're stuck at home with a textbook. You: a) No biggie, my Netflix queue is calling my name, b) Crash the party and make a grand entrance, c) Wallow in self-pity and stalk everyone's Instagram stories.",
  "Roommate drama! Passive-aggressive sticky notes are now the primary form of communication. You: a) Call a roommate summit and establish house rules, b) Invest in noise-canceling headphones and a personal stash of snacks, c) Plot elaborate pranks involving glitter and rubber ducks.",
  "Running on fumes and fueled by caffeine. You resemble a zombie more than a student. You: a) Schedule some me time and recharge, b) Embrace the chaos, it's just another Tuesday, c) Convince yourself that sleep is a social construct.",
  "Stress levels are reaching Mount Everest proportions. You: a) Vent to friends and family, b) Hit the gym or meditate, c) Embrace the comfort of carbs and sugary treats.",
  "Sleep? What's sleep? You’re more familiar with the campus library than your own bed. You: a) Try a sleep app, b) Invest in blackout curtains, c) Accept your fate and become a nocturnal creature.",
  "Describe your typical day in emojis only. 📚😴🍕🎉 stressed? 🤔😂😭",
  "Your ultimate stress-busting superpower is: a) Teleportation, b) Unlimited ice cream, c) Pause time.",
  "Code Red! Stress overload! Your first move is: a) Deep breaths, b) Dance it out, c) Cuddle a cat.",
  "You conquered stress like a boss! Your secret weapon was: a) Planning, b) Willpower, c) Luck.",
  "If you could snap your fingers and change one thing about college life to decrease stress, what would it be?"
];

const AIChat = ({ onAssessmentComplete, stressAssessmentResult, isLoading, error }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(stressQuestions.length).fill(''));
  const [currentInput, setCurrentInput] = useState('');
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleNextQuestion = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = currentInput;
    setUserAnswers(updatedAnswers);
    setCurrentInput('');

    if (currentQuestionIndex < stressQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setAssessmentComplete(true);
      // Create a temporary array with the last answer included for the API call
      const finalAnswers = [...updatedAnswers];
      onAssessmentComplete(finalAnswers);
    }
  };

  const getStressMeterWidth = () => {
    if (!stressAssessmentResult) return '0%';
    const level = stressAssessmentResult.stressLevel;
    switch (level) {
      case 'Low': return '25%';
      case 'Moderate': return '50%';
      case 'High': return '75%';
      case 'Critical': return '100%';
      default: return '0%';
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(stressQuestions.length).fill(''));
    setCurrentInput('');
    setAssessmentComplete(false);
  };

  return (
    <div className='min-h-screen bg-n-8 flex flex-col items-center px-5 lg:px-10 py-10'>
      <div className='w-full max-w-7xl flex flex-col'>

        {/* Header */}
        <div className='w-full px-10 py-8 border-b border-n-6'>
          <h1 className='text-4xl lg:text-5xl font-bold text-n-1 font-code'>Healbot Stress Assessment</h1>
          <p className='text-n-1/50'>Answer the questions to assess your current stress level.</p>
        </div>

        {/* Stress Meter */}
        <div className='w-full bg-n-7 h-2 rounded-full mt-4 mb-8'>
          <div
            className='bg-color-1 h-full rounded-full transition-all duration-500 ease-in-out'
            style={{ width: getStressMeterWidth() }}
          ></div>
        </div>

        {!assessmentComplete ? (
          <div className='flex-1 overflow-y-auto py-8 px-10'>
            {/* Question Display */}
            <div className='mb-4'>
              <div className='flex justify-start items-start mb-4'>
                <div className='bg-n-6 rounded-xl p-3 text-n-1 max-w-[80%]'>
                  <p className='text-xs text-n-1/50'>Healbot</p>
                  <p className='font-code'>{stressQuestions[currentQuestionIndex]}</p>
                </div>
              </div>

              {/* User Input */}
              <div className='flex justify-end items-end'>
                <input
                  type='text'
                  placeholder='Type your answer here...'
                  className='w-full px-4 py-2 rounded-full bg-n-9 text-n-1 placeholder:text-n-1/50 focus:outline-none focus:ring-2 focus:ring-color-1'
                  value={currentInput}
                  onChange={handleInputChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleNextQuestion();
                  }}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Navigation */}
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
          <div className='flex-1 overflow-y-auto py-8 px-10'>
            {isLoading ? (
              <div className='text-center text-n-1 font-code'>Analyzing your responses...</div>
            ) : error ? (
              <div className='text-center text-red-500 font-code'>Error: {error}</div>
            ) : stressAssessmentResult && (
              <div className='w-full px-10 py-8 mt-4 bg-n-7 rounded-lg text-n-1'>
                <h2 className='text-2xl font-bold mb-4 font-code'>Your Stress Assessment:</h2>
                <p className='mb-2'><strong>Stress Level:</strong> {stressAssessmentResult.stressLevel}</p>
                <p className='mb-2'><strong>Summary:</strong> {stressAssessmentResult.summary}</p>
                <div>
                  <strong>Recommendations:</strong>
                  <ul className='list-disc list-inside ml-4 mt-1'>
                    {stressAssessmentResult.recommendations?.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>

                {/* Restart Button */}
                <div className='w-full text-center mt-6'>
                  <button
                    onClick={handleRestart}
                    className='px-6 py-3 rounded-full bg-color-1 text-n-1 hover:bg-color-2 transition-colors font-code'
                  >
                    Restart Assessment
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChat;

import React, { useState } from 'react';

// Define stress assessment questions
const stressQuestions = [
  {
    question: "Pop quiz! Three exams and a massive paper land on your doorstep the same week. Do you?",
    options: [
      { text: "Embrace the chaos", value: "embrace_chaos" },
      { text: "Strategically plan your survival", value: "plan_survival" },
      { text: "Hide under the covers and hope it all goes away", value: "hide_away" },
    ],
  },
  {
    question: "That essay you poured your heart and soul into gets a grade that resembles your bank account balance after spring break. Your reaction:",
    options: [
      { text: "Professor feedback is my fuel!", value: "feedback_fuel" },
      { text: "Time to drown my sorrows in pizza (and maybe revise later)", value: "pizza_revise" },
      { text: "Question the meaning of life (and grading rubrics)", value: "question_life" },
    ],
  },
  {
    question: "Lost in lecture? Decoding ancient hieroglyphics would be easier than understanding this class. You:",
    options: [
      { text: "Form a study group and conquer together", value: "study_group" },
      { text: "Hit up office hours and charm the professor", value: "office_hours" },
      { text: "Accept your fate and hope for a curve", value: "accept_fate" },
    ],
  },
  {
    question: "Laptop meltdown! Right before a major deadline, your trusty tech companion decides to take an unscheduled vacation. You:",
    options: [
      { text: "Crowdfund a new one on campus", value: "crowdfund_laptop" },
      { text: "Become best friends with the library computers", value: "library_computers" },
      { text: "Embrace the handwritten life (and pray for legible handwriting)", value: "handwritten_life" },
    ],
  },
  {
    question: "Part-time job offer: Extra cash or extra study time? That is the question. You:",
    options: [
      { text: "Master the art of time management and become a multitasking ninja", value: "time_management" },
      { text: "Sleep is for the weak (and the wealthy)", value: "sleep_weak" },
      { text: "Prioritize academics and hope for a scholarship miracle", value: "prioritize_academics" },
    ],
  },
  {
    question: "FOMO alert! Everyone's at that party and you're stuck at home with a textbook. You:",
    options: [
      { text: "No biggie, my Netflix queue is calling my name", value: "netflix_queue" },
      { text: "Crash the party and make a grand entrance", value: "crash_party" },
      { text: "Wallow in self-pity and stalk everyone's Instagram stories", value: "wallow_pity" },
    ],
  },
  {
    question: "Roommate drama! Passive-aggressive sticky notes are now the primary form of communication. You:",
    options: [
      { text: "Call a roommate summit and establish house rules", value: "roommate_summit" },
      { text: "Invest in noise-canceling headphones and a personal stash of snacks", value: "noise_canceling" },
      { text: "Plot elaborate pranks involving glitter and rubber ducks", value: "plot_pranks" },
    ],
  },
  {
    question: "Running on fumes and fueled by caffeine. You resemble a zombie more than a student. You:",
    options: [
      { text: "Schedule some me time and recharge", value: "recharge_me_time" },
      { text: "Embrace the chaos, it's just another Tuesday", value: "embrace_tuesday_chaos" },
      { text: "Convince yourself that sleep is a social construct", value: "sleep_social_construct" },
    ],
  },
  {
    question: "Stress levels are reaching Mount Everest proportions. You:",
    options: [
      { text: "Vent to friends and family", value: "vent_friends_family" },
      { text: "Hit the gym or meditate", value: "gym_meditate" },
      { text: "Embrace the comfort of carbs and sugary treats", value: "carbs_treats" },
    ],
  },
  {
    question: "Sleep? What's sleep? You’re more familiar with the campus library than your own bed. You:",
    options: [
      { text: "Try a sleep app", value: "sleep_app" },
      { text: "Invest in blackout curtains", value: "blackout_curtains" },
      { text: "Accept your fate and become a nocturnal creature", value: "nocturnal_creature" },
    ],
  },
  {
    question: "Describe your typical day in emojis only. 📚😴🍕🎉 stressed? 🤔😂😭",
    options: [
      { text: "Stressful", value: "stressful_emojis" }, // Placeholder value
      { text: "Balanced", value: "balanced_emojis" }, // Placeholder value
      { text: "Relaxed", value: "relaxed_emojis" }, // Placeholder value
    ],
  },
  {
    question: "Your ultimate stress-busting superpower is:",
    options: [
      { text: "Teleportation", value: "teleportation" },
      { text: "Unlimited ice cream", value: "unlimited_ice_cream" },
      { text: "Pause time", value: "pause_time" },
    ],
  },
  {
    question: "Code Red! Stress overload! Your first move is:",
    options: [
      { text: "Deep breaths", value: "deep_breaths" },
      { text: "Dance it out", value: "dance_it_out" },
      { text: "Cuddle a cat", value: "cuddle_cat" },
    ],
  },
  {
    question: "You conquered stress like a boss! Your secret weapon was:",
    options: [
      { text: "Planning", value: "planning" },
      { text: "Willpower", value: "willpower" },
      { text: "Luck", value: "luck" },
    ],
  },
  {
    question: "If you could snap your fingers and change one thing about college life to decrease stress, what would it be?",
    options: [
      { text: "Less homework", value: "less_homework" }, // Placeholder value
      { text: "More sleep", value: "more_sleep" }, // Placeholder value
      { text: "Easier exams", value: "easier_exams" }, // Placeholder value
    ],
  },
];

const AIChat = ({ onAssessmentComplete, stressAssessmentResult, isLoading, error }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(stressQuestions.map(question => ({
    question: question,
    answer: ''
  })));
  const [currentInput, setCurrentInput] = useState('');
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleNextQuestion = () => {
    const updatedAnswers = [...userAnswers];
    // For multiple choice, we'll update this to store the selected option's value
    updatedAnswers[currentQuestionIndex].answer = currentInput; // This will need adjustment for multiple choice
    setUserAnswers(updatedAnswers);
    setCurrentInput('');

    if (currentQuestionIndex < stressQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setAssessmentComplete(true);
      // Create a temporary array with the last answer included for the API call
      onAssessmentComplete(updatedAnswers);
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
    setUserAnswers(stressQuestions.map(question => ({
      question: question,
      answer: ''
    })));
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

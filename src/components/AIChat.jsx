import React from 'react';

const AIChat = () => {
  return (
    <div className='min-h-screen bg-n-8 flex flex-col items-center px-5 lg:px-10 py-10'>
      <div className='w-full max-w-7xl flex flex-col'>
        {/* Chat Header */}
        <div className='w-full px-10 py-8  border-b border-n-6'>
          <h1 className='text-4xl lg:text-5xl font-bold text-n-1 font-code'>Healbot</h1>
          <p className='text-n-1/50'>Your private space to express and heal</p>
        </div>

        {/* Stress Meter Placeholder */}
        <div className='w-full bg-n-7 h-2 rounded-full mt-4'>
          <div className='bg-color-1 h-full w-1/2 rounded-full'></div>
        </div>

        {/* Message Feed Container */}
        <div className='flex-1 overflow-y-auto py-8 px-10'>
          <div className='space-y-4'>
            {/* AI Message (Left-aligned) */}
            <div className='flex justify-start items-end'>
              <div className='bg-n-7 text-n-1 rounded-2xl p-3 max-w-[70%]'>
                <p className='text-xs text-n-1/50'>Healbot</p>
                <p>Hi, how can I help you?</p>
                <p className='text-[0.6rem] text-n-1/50 mt-1'>10:00 AM</p>
              </div>
            </div>

            {/* User Message (Right-aligned) */}
            <div className='flex justify-end items-end'>
              <div className='bg-color-1 text-n-1 rounded-2xl p-3 max-w-[70%]'>
                <p className='text-xs text-n-1/50'>You</p>
                <p>I'm feeling down today</p>
                <p className='text-[0.6rem] text-n-1/50 mt-1'>10:01 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text Input Section */}
        <div className='p-6 border-t border-n-6'>
          <div className='flex items-center space-x-4'>
            <input
              type='text'
              placeholder='Share your thoughts...'
              className='w-full px-4 py-2 rounded-full bg-n-9 text-n-1 placeholder:text-n-1/50 focus:outline-none focus:ring-2 focus:ring-color-1'
            />
            <button className='px-4 py-2 rounded-full bg-color-1 text-n-1 hover:bg-color-2 transition-colors'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default AIChat;

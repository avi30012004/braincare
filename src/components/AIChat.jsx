import React from 'react';


const AIChat = () => {
    return (
        <div className='min-h-screen bg-n-8 flex flex-col items-center justify-center px-5 lg:px-10 py-10'>
            <div className='w-full max-w-7xl'>
                <div className='w-full rounded-3xl shadow-lg bg-n-7 flex flex-col'>
                    <div className='px-10 py-8 border-b border-n-6'>
                        <h1 className='text-4xl lg:text-5xl font-bold text-n-1 text-center font-code'>
                            Welcome to Healbot{' '}
                        </h1>
                    </div>
                    <div className='px-10 py-8 flex-1 overflow-y-auto'>
                        <div className='mb-4'>
                            <div className='flex justify-start items-start'>
                                <div className='bg-n-6 rounded-xl p-3 text-n-1 max-w-[70%]'>
                                    <p className='text-xs text-n-1/50'>Healbot</p>
                                    <p>Hi, how can i help you?</p>
                                </div>
                            </div>
                            <div className='mt-4 flex justify-end items-end'>
                                <div className='bg-color-1 rounded-xl p-3 text-n-1 max-w-[70%]'>
                                    <p className='text-xs text-n-1/50'>You</p>
                                    <p>I'm feeling down today</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-6 border-t border-n-6'>
            <div className='flex items-center space-x-4'>
                         <input
                                type='text'
                                placeholder='Type your message here...'
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
        </div>
    );
};

export default AIChat;
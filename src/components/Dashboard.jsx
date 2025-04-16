
// src/components/Dashboard.jsx
import React from 'react';
import { UserProfile, useUser, SignedIn } from '@clerk/clerk-react';

const Dashboard = () => {
    const { user } = useUser();
    return (
        <div className="min-h-screen bg-n-8 p-5 lg:p-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-n-1 text-center font-code mb-8">User Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {/* 1. Stress Level Overview */}
                <section className="bg-n-7 rounded-3xl p-6 border border-n-6 col-span-1">
                    <h2 className="text-xl text-n-1 font-semibold mb-3">Stress Level Overview</h2>
                    <div className="bg-n-9 h-4 rounded-full mb-2">
                        <div className="bg-color-1 h-full w-[65%] rounded-full"></div>
                    </div>
                    <p className="text-sm text-n-1/50 mb-1">Current Stress Level: Moderate</p>
                    <p className="text-xs text-n-1/50">How this is calculated? <span className="text-color-1 cursor-pointer">ℹ️</span></p>
                </section>

                {/* 2. Daily Mood Tracker */}
                <section className="bg-n-7 rounded-3xl p-6 border border-n-6 col-span-1">
                    <h2 className="text-xl text-n-1 font-semibold mb-3">Daily Mood Tracker</h2>
                    <p className="text-n-1/50">April 16th, 2025</p>
                </section>

                {/* 3. Gamified Activity Panel */}
                <section className="bg-n-7 rounded-3xl p-6 border border-n-6 col-span-1">
                    <h2 className="text-xl text-n-1 font-semibold mb-3">Gamified Activity Panel</h2>
                    <div className="mb-3">
                        <p className="text-n-1/50 text-sm mb-1">Meditation</p>
                        <div className="bg-n-9 h-2 rounded-full mb-1">
                            <div className="bg-color-1 h-full w-[70%] rounded-full"></div>
                        </div>
                        <p className="text-n-1/50 text-xs text-right">5/7</p>
                        <p className="text-n-1/50 text-sm mb-1 mt-2">Journaling</p>
                        <div className="bg-n-9 h-2 rounded-full mb-1">
                            <div className="bg-color-1 h-full w-[30%] rounded-full"></div>
                        </div>
                         <p className="text-n-1/50 text-xs text-right">3/5</p>
                        <p className="text-n-1/50 text-sm mb-1 mt-2">Exercise</p>
                        <div className="bg-n-9 h-2 rounded-full mb-1">
                            <div className="bg-color-1 h-full w-[20%] rounded-full"></div>
                        </div>
                        <p className="text-n-1/50 text-xs text-right">2/3</p>
                    </div>
                    <p className="text-n-1/50 text-xs text-center">Level 3 <span className='px-2'>500 XP</span></p>
                    <p className="text-n-1/50 text-xs mt-1 text-center">Consistency Master | Meditation Guru</p>
                    <p className="text-n-1/50 text-xs mt-1 text-center">Rewards: XP points, badges, and progress bar</p>
                </section>

                {/* 4. AI Chat Summary */}
                <section className="bg-n-7 rounded-3xl p-6 border border-n-6 col-span-1">
                    <h2 className="text-xl text-n-1 font-semibold mb-3">AI Chat Summary</h2>
                    <ul className="list-disc text-n-1/50 ml-5">
                        <li className="mb-1">You’ve been practicing mindfulness consistently</li>
                        <li className="mb-1">Your stress levels have decreased by 15% this week</li>
                        <li className="mb-1">Consider adding more physical activity to your routine</li>
                    </ul>
                    <p className="text-n-1/50 text-xs mt-1 underline">Continue Session</p>
                </section>

                {/* 5. Progress Insights */}
                <section className="bg-n-7 rounded-3xl p-6 border border-n-6 col-span-1">
                    <h2 className="text-xl text-n-1 font-semibold mb-3">Progress Insights</h2>
                    <div className="bg-n-9 p-4 rounded-2xl text-n-1/50">Chart</div>
                </section>

                {/* 6. Community Metrics */}
                <section className="bg-n-7 rounded-3xl p-6 border border-n-6 col-span-1">
                    <h2 className="text-xl text-n-1 font-semibold mb-3">Community Metrics</h2>
                     <div className="mb-1 flex justify-between items-center">
                        <p className="text-n-1/50 text-sm mb-1 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1z"/>
  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
</svg><span className='px-2'>Metrics</span></p>
                        <p className="text-n-1/50 text-sm mb-1">85%</p>
                    </div>
                    <div className="bg-n-9 h-2 rounded-full mb-1">
                            <div className="bg-color-1 h-full w-[85%] rounded-full"></div>
                        </div>
                      <div className="mb-1 flex justify-between items-center mt-2">
                        <p className="text-n-1/50 text-sm mb-1 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg><span className='px-2'>Community Support</span></p>
                        <p className="text-n-1/50 text-sm mb-1">85%</p>
                    </div>
                    <div className="bg-n-9 h-2 rounded-full mb-1">
                            <div className="bg-color-1 h-full w-[85%] rounded-full"></div>
                        </div>
                        <div className="mb-1 flex justify-between items-center mt-2">
                        <p className="text-n-1/50 text-sm mb-1 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.563.646.76 1.412.76 1.683l-.978.001-.134-.005-1.344-.003.003-.372c.014-.124.06-.345.153-.629.5-1.41 1.556-2.678 2.872-3.223A6.358 6.358 0 0 0 11 6c-1.717 0-3.353.67-4.684 1.645-.643.422-1.114.94-1.514 1.495-1.258.563-2.008 1.431-2.008 2.515m-1.344-3.878c.014-.124.06-.345.153-.629.5-1.41 1.556-2.678 2.872-3.223A6.358 6.358 0 0 1 5 3c-1.717 0-3.353.67-4.684 1.645-.643.422-1.114.94-1.514 1.495-1.258.563-2.008 1.431-2.008 2.515"/></svg><span className='px-2'>Group Activities</span></p>
                        <p className="text-n-1/50 text-sm mb-1">62%</p>
                    </div>
                    <div className="bg-n-9 h-2 rounded-full mb-1">
                            <div className="bg-color-1 h-full w-[62%] rounded-full"></div>
                        </div>
                         <div className="mb-1 flex justify-between items-center mt-2">
                        <p className="text-n-1/50 text-sm mb-1 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-dots-fill" viewBox="0 0 16 16">
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg><span className='px-2'>Engagement</span></p>
                        <p className="text-n-1/50 text-sm mb-1">78%</p>
                    </div>
                    <div className="bg-n-9 h-2 rounded-full mb-1">
                            <div className="bg-color-1 h-full w-[78%] rounded-full"></div>
                        </div>
                </section>

                {/* 7. Reminders & Notifications */}
                <section className="bg-n-7 rounded-3xl p-6 border border-n-6 col-span-1">
                    <h2 className="text-xl text-n-1 font-semibold mb-3">Reminders & Notifications</h2>
                    <div className="bg-n-9 p-4 rounded-2xl text-n-1/50">
                      <div className='flex justify-between items-center'><p className='flex items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
</svg>Meditation Session</p><span className='px-2'>Today</span></div>
                        <p className='ml-[2rem]'>5:00 PM</p>
                      <div className='flex justify-between items-center mt-2'><p className='flex items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-text" viewBox="0 0 16 16">
  <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
</svg>Journal Entry</p><span className='px-2'>Today</span></div>
                        <p className='ml-[2rem]'>8:00 PM</p>
                                              <div className='flex justify-between items-center mt-2'><p className='flex items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-check-fill" viewBox="0 0 16 16">
  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16zm-3.646-5.146a.5.5 0 0 0-.708-.708L6.75 10.293 4.25 7.793a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>Take a Break</p></div>
                        <p className='ml-[2rem]'>2:30 PM</p>
                    </div>
                </section>

                {/* 8. User Profile Quick View */}
                <section className="bg-n-7 rounded-3xl p-6 border border-n-6 col-span-1">
                    <h2 className="text-xl text-n-1 font-semibold mb-3">User Profile</h2>
                   <SignedIn>
                        <UserProfile />
                    </SignedIn>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
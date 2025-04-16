
import React from 'react';

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, user: 'Aishu_23', score: 2340, badges: ['🧘‍♀️', '🌈'] },
    { rank: 2, user: 'Avinash_07', score: 2200, badges: ['🧠', '🏋️‍♂️'] },
    { rank: 3, user: 'MindGuru', score: 2150, badges: ['🎯', '💬'] },
    { rank: 4, user: 'CalmBuddy', score: 1900, badges: ['📅', '📈'] },
    { rank: 5, user: 'ZenMaster', score: 1850, badges: ['🧘‍♂️', '🎮'] },
    // Add more placeholder users as needed
  ];

  return (
    <div className="min-h-screen bg-n-8 py-10 px-5 lg:px-10">
      <h1 className="text-4xl lg:text-5xl font-bold text-n-1 text-center font-code mb-8">Leaderboard</h1>

      {/* Filters */}
      <div className="flex justify-center space-x-4 mb-6">
        <button className="px-4 py-2 rounded-full bg-n-7 text-n-1/50 hover:bg-n-6 transition-colors">Weekly</button>
        <button className="px-4 py-2 rounded-full bg-n-7 text-n-1/50 hover:bg-n-6 transition-colors">Monthly</button>
        <button className="px-4 py-2 rounded-full bg-n-7 text-n-1/50 hover:bg-n-6 transition-colors">All-time</button>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-n-7 rounded-3xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-n-6">
            <thead className="bg-n-8">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-n-1 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-n-1 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-n-1 uppercase tracking-wider">
                  Activity Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-n-1 uppercase tracking-wider">
                  Badges
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-n-6">
              {leaderboardData.map((user, index) => (
                <tr key={index} className={`${user.rank <= 3 ? 'text-white' : 'text-n-1'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-bold ${user.rank === 1 ? 'text-yellow-400' : user.rank === 2 ? 'text-gray-400' : user.rank === 3 ? 'text-orange-400' : 'text-n-1'}`}>
                      {user.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src="https://via.placeholder.com/40" alt={`${user.user}'s Avatar`} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">
                          {user.user}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{user.score} XP</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm flex space-x-2">
                      {user.badges.map((badge, badgeIndex) => (
                        <span key={badgeIndex} className="text-lg">{badge}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-center mt-6">
        {/* Add pagination or infinite scroll UI here */}
        <button className="px-4 py-2 rounded-full bg-n-7 text-n-1/50 hover:bg-n-6 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
};



export default Leaderboard;
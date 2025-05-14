import React from 'react';
import { gamesAndTasks } from '../constants';
import { Link } from 'react-router-dom';

const GamesAndTasks = () => {
  // Group games by stress level for easier display
  const categorizedGames = gamesAndTasks.reduce((acc, game) => {
    acc[game.stressLevel] = acc[game.stressLevel] || [];
    acc[game.stressLevel].push(game);
    return acc;
  }, {});

  return (
    <div className='min-h-screen bg-n-8 text-n-1 px-5 lg:px-10 py-10'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl lg:text-5xl font-bold text-n-1 font-code mb-8 text-center'>Games and Tasks for Well-being</h1>

        {/* Render categories and their games */}
        {Object.entries(categorizedGames).map(([category, games]) => (
          <div key={category} className='mb-12'>
            <h2 className={
              `text-2xl font-bold mb-6 font-code ${category === 'Low' ? 'text-green-400' : category === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`
            }>
              {category} Stress Level Activities
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {games.map((game) => (
                <div key={game.id} className='bg-n-7 rounded-lg p-6 shadow-lg'>
                  <h3 className='text-xl font-semibold mb-2 font-code'>{game.name}</h3>
                  <p className='text-n-1/75'>{game.description}</p>
                  <Link to={game.path} className="block mt-4 text-sm text-purple-400 hover:underline">
                    Play / Access
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default GamesAndTasks;

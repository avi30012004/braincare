
import React from 'react';

const GroupChat = () => {
  return (
    <div className="min-h-screen bg-n-8 text-n-1 flex flex-col">
      {/* Top Panel */}
      <div className="bg-n-7 p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">#GroupTopic</h2> {/* Placeholder */}
          <span className="text-sm text-n-1/50">100 users online</span> {/* Placeholder */}
        </div>
        <button className="bg-n-9 text-n-1 px-3 py-1 rounded-md hover:bg-n-6 transition-colors">
          Leave Room
        </button>
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Example Messages */}
        <div className="mb-2">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-n-6 mr-2"></div> {/* Placeholder Avatar */}
            <div>
              <span className="font-semibold text-sm">AnonPhoenix32</span> {/* Placeholder Nickname */}
              <p className="bg-n-9 rounded-lg p-2 text-sm">
                This is a sample message.
              </p>
              {/* Reaction Placeholders */}
              <div className="flex mt-1 space-x-2">
                <button className="text-xs text-n-1/50 hover:text-n-1">Hug</button>
                <button className="text-xs text-n-1/50 hover:text-n-1">Support</button>
                <button className="text-xs text-n-1/50 hover:text-n-1">Relate</button>
              </div>
            </div>
          </div>
        </div>

        {/* Another Message */}
        <div className="mb-2">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-n-6 mr-2"></div> {/* Placeholder Avatar */}
            <div>
              <span className="font-semibold text-sm">SilentStorm07</span> {/* Placeholder Nickname */}
              <p className="bg-n-9 rounded-lg p-2 text-sm">
                Another message here.
              </p>
              {/* Reaction Placeholders */}
              <div className="flex mt-1 space-x-2">
                <button className="text-xs text-n-1/50 hover:text-n-1">Hug</button>
                <button className="text-xs text-n-1/50 hover:text-n-1">Support</button>
                <button className="text-xs text-n-1/50 hover:text-n-1">Relate</button>
              </div>
            </div>
          </div>
        </div>
        {/* Add more message examples as needed */}
      </div>

      {/* Input Area */}
      <div className="bg-n-7 p-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full bg-n-9 text-n-1 rounded-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-color-1"
          />
          <button className="ml-2 bg-color-1 text-n-1 rounded-full px-4 py-2 hover:bg-color-2 transition-colors">
            Send
          </button>
        </div>
        <p className="text-xs text-n-1/50 mt-1">
          Messages will auto-expire after 24 hours. Reporting available.
        </p>
      </div>
    </div>
  );
};

export default GroupChat;
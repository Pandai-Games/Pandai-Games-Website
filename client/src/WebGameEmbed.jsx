import React from 'react';

const WebGameEmbed = () => {
  return (
    <div className="w-full h-[600px] bg-brimstone-950 border border-red-900/30 rounded-lg overflow-hidden">
      <iframe 
        src="/webgame/index.html" 
        className="w-full h-full border-0"
        title="Threads of Eenheid - Pre-Alpha Prototype"
        allow="fullscreen"
      />
    </div>
  );
};

export default WebGameEmbed;

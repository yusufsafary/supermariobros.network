import React from 'react';
import MarioGame from '@/components/MarioGame';

export default function Home() {
  const scrollToGame = () => {
    document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative pt-20 pb-20">
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none opacity-20">
          {/* Decorative background elements could go here */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full mix-blend-overlay blur-xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="z-10 flex flex-col items-center space-y-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] uppercase tracking-wider leading-tight animate-bounce" style={{animationDuration: '3s'}}>
            Super<br/>MarioBros<br/><span className="text-accent">.Network</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-bold bg-white text-primary px-6 py-3 border-4 border-black inline-block transform -rotate-2 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            A BOLD, JOYFUL FAN TRIBUTE
          </p>
          
          <button 
            onClick={scrollToGame}
            className="mt-12 bg-primary hover:bg-red-600 text-white font-display text-xl md:text-2xl px-8 py-6 border-4 border-white shadow-[0_8px_0px_rgba(0,0,0,0.5)] active:translate-y-2 active:shadow-[0_0px_0px_rgba(0,0,0,0.5)] transition-all flex items-center gap-4"
          >
            PLAY NOW
          </button>
        </div>
      </section>

      {/* Game Section */}
      <section id="game" className="py-12 bg-[#87CEEB] border-y-8 border-black flex justify-center items-center relative min-h-[600px]">
        <div className="w-full max-w-[800px] mx-auto px-4 md:px-0">
          <MarioGame />
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-20 bg-card text-card-foreground border-b-8 border-black px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-12 text-center uppercase drop-shadow-[0_2px_0_rgba(0,0,0,1)]">How to Play</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-background/10 p-8 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] bg-[#FFD700]">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-black text-white p-2 rounded">KBD</span> Keyboard
              </h3>
              <ul className="space-y-4 text-lg font-medium">
                <li className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <kbd className="bg-white border-2 border-b-4 border-gray-300 rounded px-2 py-1 min-w-[30px] text-center font-mono text-black">A</kbd>
                    <kbd className="bg-white border-2 border-b-4 border-gray-300 rounded px-2 py-1 min-w-[30px] text-center font-mono text-black">D</kbd>
                  </div>
                  <span>or Arrows to Move</span>
                </li>
                <li className="flex items-center gap-4">
                  <kbd className="bg-white border-2 border-b-4 border-gray-300 rounded px-4 py-1 font-mono text-black">SPACE</kbd>
                  <span>to Jump</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background/10 p-8 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] bg-[#3A8C38] text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
                <span className="bg-black text-white p-2 rounded">TAP</span> Mobile Touch
              </h3>
              <p className="text-lg font-medium leading-relaxed drop-shadow-[0_1px_0_rgba(0,0,0,1)]">
                Use the on-screen buttons overlaying the game canvas. Left and Right arrows move your character, and the big A button makes you jump. The game canvas will fit to your screen width.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background text-white px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-display uppercase drop-shadow-[0_2px_0_rgba(0,0,0,1)] mb-8">About the Project</h2>
          <p className="text-xl font-medium leading-relaxed">
            SuperMarioBros.Network is a fan-made tribute to one of the most iconic video games in history.
            Built completely from scratch using React, Vite, and Phaser.js.
          </p>
          <p className="text-lg opacity-90">
            This project uses programmatic graphics instead of sprite sheets, rendering familiar shapes using code alone.
            Jump on goombas, collect coins, and reach the flagpole!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted text-white py-12 px-4 border-t-8 border-black">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h3 className="font-display text-xl uppercase mb-2">SuperMarioBros.Network</h3>
            <p className="text-gray-400 font-medium">A fan project not affiliated with Nintendo.</p>
          </div>
          
          <a 
            href="https://github.com/yusufsafary" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 border-4 border-black hover:bg-accent transition-colors shadow-[4px_4px_0_rgba(0,0,0,1)]"
          >
            GitHub: yusufsafary
          </a>
        </div>
      </footer>
    </div>
  );
}

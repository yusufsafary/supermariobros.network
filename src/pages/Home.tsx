import React from 'react';
import MarioGame from '@/components/MarioGame';
import MarioLogo from '@/components/MarioLogo';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

export default function Home() {
  const scrollToGame = () => {
    document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">

      {/* ===== HERO ===== */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative pt-20 pb-16">
        {/* subtle glow blobs */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse"/>
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-accent rounded-full blur-3xl animate-pulse" style={{animationDelay:'1.2s'}}/>
        </div>

        <div className="z-10 flex flex-col items-center gap-6 max-w-4xl mx-auto">

          {/* BIG Mario logo character */}
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/20 rounded-full blur-xl"/>
            <MarioLogo
              size={140}
              className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)] uppercase tracking-widest leading-tight">
            Super Mario<br/>
            <span className="text-accent">Network</span>
          </h1>

          {/* Subtitle badge */}
          <p className="text-lg md:text-xl font-bold bg-white text-primary px-6 py-3 border-4 border-black inline-block transform -rotate-1 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            A BOLD, JOYFUL FAN TRIBUTE
          </p>

          {/* CTA */}
          <button
            onClick={scrollToGame}
            className="mt-4 bg-primary hover:bg-red-600 text-white font-display text-xl md:text-2xl px-10 py-6 border-4 border-white shadow-[0_8px_0px_rgba(0,0,0,0.6)] active:translate-y-2 active:shadow-none transition-all flex items-center gap-3"
          >
            <span>🎮</span> PLAY NOW
          </button>
        </div>
      </section>

      {/* ===== GAME ===== */}
      <section id="game" className="py-12 bg-[#87CEEB] border-y-8 border-black flex justify-center items-center relative min-h-[600px]">
        <div className="w-full max-w-[800px] mx-auto px-4 md:px-0">
          <MarioGame />
        </div>
      </section>

      {/* ===== QUICK LINKS ===== */}
      <section className="py-12 bg-accent border-b-8 border-black px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <Link href="/how-to-play" className="bg-white border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] p-6 flex items-center gap-4 hover:translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all">
            <span className="text-4xl">🎮</span>
            <div>
              <p className="font-display text-black text-xs uppercase mb-1">New here?</p>
              <p className="font-bold text-black text-lg">Read How to Play</p>
              <p className="text-gray-600 text-sm mt-1">Controls, scoring, tips and tricks</p>
            </div>
          </Link>
          <Link href="/about" className="bg-muted border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] p-6 flex items-center gap-4 hover:translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all">
            <span className="text-4xl">🏰</span>
            <div>
              <p className="font-display text-white text-xs uppercase mb-1">The project</p>
              <p className="font-bold text-white text-lg">About This Site</p>
              <p className="text-white/70 text-sm mt-1">Tech stack, story, and motivation</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== CONTROLS ===== */}
      <section className="py-20 bg-card text-card-foreground border-b-8 border-black px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-12 text-center uppercase drop-shadow-[0_2px_0_rgba(0,0,0,1)]">How to Play</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-[#FFD700] p-8 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)]">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-black text-white px-2 py-1 rounded text-sm">KBD</span> Keyboard
              </h3>
              <ul className="space-y-4 text-lg font-medium">
                <li className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <kbd className="bg-white border-2 border-b-4 border-gray-300 rounded px-2 py-1 font-mono text-black text-sm">A</kbd>
                    <kbd className="bg-white border-2 border-b-4 border-gray-300 rounded px-2 py-1 font-mono text-black text-sm">D</kbd>
                  </div>
                  <span className="text-black">or Arrow Keys to Move</span>
                </li>
                <li className="flex items-center gap-4">
                  <kbd className="bg-white border-2 border-b-4 border-gray-300 rounded px-3 py-1 font-mono text-black text-sm">SPACE</kbd>
                  <span className="text-black">to Jump</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#3A8C38] p-8 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
                <span className="bg-black text-white px-2 py-1 rounded text-sm">TAP</span> Mobile Touch
              </h3>
              <p className="text-lg font-medium leading-relaxed">
                On-screen buttons appear automatically. Left and Right to move, A button to jump.
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/how-to-play" className="inline-flex bg-primary text-white font-display text-xs uppercase px-8 py-4 border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] hover:bg-red-600 transition-colors">
              Full Guide and Tips
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-20 bg-background text-white px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-display uppercase drop-shadow-[0_2px_0_rgba(0,0,0,1)] mb-8">About the Project</h2>
          <p className="text-xl font-medium leading-relaxed">
            SuperMarioBros.Network is a fan-made tribute to one of the most iconic video games in history.
            Built from scratch using React, Vite, and Phaser.js.
          </p>
          <p className="text-lg opacity-90">
            Programmatic pixel-art graphics instead of sprite sheets, rendering familiar characters entirely through code.
          </p>
          <Link href="/about" className="inline-flex bg-accent text-black font-display text-xs uppercase px-8 py-4 border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,0.5)] hover:bg-yellow-300 transition-colors mt-4">
            Read More
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

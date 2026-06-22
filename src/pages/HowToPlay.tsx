import React from 'react';
import Footer from '@/components/Footer';

interface TipProps {
  icon: string;
  title: string;
  desc: string;
}

function Tip({ icon, title, desc }: TipProps) {
  return (
    <div className="flex gap-4 items-start border-4 border-black bg-white shadow-[6px_6px_0_rgba(0,0,0,1)] p-5">
      <span className="text-3xl shrink-0">{icon}</span>
      <div>
        <p className="font-bold text-black text-base mb-1">{title}</p>
        <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function HowToPlay() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="pt-14 flex-1">

        <section className="bg-secondary py-16 px-4 text-center border-b-8 border-black">
          <h1 className="font-display text-white text-2xl md:text-4xl uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-4">
            How to Play
          </h1>
          <p className="text-white/90 text-lg font-medium max-w-2xl mx-auto">
            Everything you need to know to get Mario to the flagpole in one piece.
          </p>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="max-w-4xl mx-auto space-y-10">

            {/* Objective */}
            <div className="border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] bg-[#FFD700] p-8">
              <h2 className="font-display text-black text-base uppercase mb-4">The Goal</h2>
              <p className="text-black text-base leading-relaxed mb-4">
                Your mission is to guide Mario from the starting position all the way to the flagpole at the end of the level. Along the way you can collect coins to boost your score, stomp on Goombas for bonus points, and explore the platforms to find the best path forward.
              </p>
              <p className="text-black text-base leading-relaxed">
                You start with 3 lives. Falling into a pit or getting hit by a Goomba from the side costs you one life. When all lives are gone, the game ends and you can restart from the beginning.
              </p>
            </div>

            {/* Keyboard Controls */}
            <div className="border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] bg-white p-8">
              <h2 className="font-display text-primary text-base uppercase mb-6">Keyboard Controls</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-black uppercase text-sm border-b-2 border-black pb-2">Movement</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <kbd className="bg-gray-100 border-2 border-b-4 border-gray-400 rounded px-3 py-1 font-mono text-black font-bold">A</kbd>
                      <kbd className="bg-gray-100 border-2 border-b-4 border-gray-400 rounded px-3 py-1 font-mono text-black font-bold">D</kbd>
                    </div>
                    <span className="text-gray-700 text-sm font-medium">Move left and right</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <kbd className="bg-gray-100 border-2 border-b-4 border-gray-400 rounded px-2 py-1 font-mono text-black font-bold text-xs">LEFT</kbd>
                      <kbd className="bg-gray-100 border-2 border-b-4 border-gray-400 rounded px-2 py-1 font-mono text-black font-bold text-xs">RIGHT</kbd>
                    </div>
                    <span className="text-gray-700 text-sm font-medium">Arrow keys also work</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-black uppercase text-sm border-b-2 border-black pb-2">Jumping</h3>
                  <div className="flex items-center gap-3">
                    <kbd className="bg-gray-100 border-2 border-b-4 border-gray-400 rounded px-4 py-1 font-mono text-black font-bold">SPACE</kbd>
                    <span className="text-gray-700 text-sm font-medium">Jump</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <kbd className="bg-gray-100 border-2 border-b-4 border-gray-400 rounded px-3 py-1 font-mono text-black font-bold text-xs">UP</kbd>
                    <span className="text-gray-700 text-sm font-medium">Up arrow or W also jumps</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] bg-secondary p-8">
              <h2 className="font-display text-white text-base uppercase mb-6 drop-shadow-[0_2px_0_rgba(0,0,0,1)]">Mobile and Touch Controls</h2>
              <p className="text-white/90 text-base leading-relaxed mb-6">
                On phones and tablets, on-screen buttons appear at the bottom of the game canvas automatically. You do not need to enable anything.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0_rgba(0,0,0,1)] text-center">
                  <p className="font-bold text-black text-2xl mb-1">L</p>
                  <p className="text-gray-700 text-sm">Move left</p>
                </div>
                <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0_rgba(0,0,0,1)] text-center">
                  <p className="font-bold text-black text-2xl mb-1">R</p>
                  <p className="text-gray-700 text-sm">Move right</p>
                </div>
                <div className="bg-primary border-4 border-black p-4 shadow-[4px_4px_0_rgba(0,0,0,1)] text-center">
                  <p className="font-bold text-white text-2xl mb-1">A</p>
                  <p className="text-white/90 text-sm">Jump</p>
                </div>
              </div>
            </div>

            {/* Scoring */}
            <div className="border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] bg-white p-8">
              <h2 className="font-display text-primary text-base uppercase mb-6">Scoring</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { action: 'Collect a coin', points: '+100 pts', color: 'bg-[#FFD700]' },
                  { action: 'Stomp a Goomba', points: '+200 pts', color: 'bg-secondary text-white' },
                  { action: 'Reach the flagpole', points: 'You win!', color: 'bg-primary text-white' },
                ].map(item => (
                  <div key={item.action} className={`${item.color} border-4 border-black p-5 shadow-[4px_4px_0_rgba(0,0,0,1)] text-center`}>
                    <p className="font-bold text-sm mb-2">{item.action}</p>
                    <p className="font-display text-xs">{item.points}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] bg-card p-8">
              <h2 className="font-display text-primary text-base uppercase mb-6">Tips and Tricks</h2>
              <div className="space-y-4">
                <Tip
                  icon="🎯"
                  title="Jump on enemies from above"
                  desc="The only safe way to defeat a Goomba is to land on top of it. Walking into a Goomba from the side will cost you a life."
                />
                <Tip
                  icon="🪙"
                  title="Coins are on the platforms"
                  desc="Most coins are placed on or just above the floating platforms. Explore the higher areas to collect them all and maximize your score."
                />
                <Tip
                  icon="⚠️"
                  title="Watch out for gaps"
                  desc="There are a few gaps in the ground that will cause Mario to fall. Keep moving and be ready to jump over them."
                />
                <Tip
                  icon="🚩"
                  title="The flagpole is at the far right"
                  desc="Keep running to the right and you will eventually reach the flagpole. Touch it to complete the level and win the game."
                />
                <Tip
                  icon="🔄"
                  title="You can restart anytime"
                  desc="If you run out of lives, click the Game Over screen to restart from the beginning. Your score resets but you get fresh lives."
                />
              </div>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

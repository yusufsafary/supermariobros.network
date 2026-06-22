import React from 'react';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="pt-14 flex-1">

        {/* Hero */}
        <section className="bg-primary py-16 px-4 text-center border-b-8 border-black">
          <h1 className="font-display text-white text-2xl md:text-4xl uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-4">
            About This Project
          </h1>
          <p className="text-white/90 text-lg font-medium max-w-2xl mx-auto">
            A passion project built from scratch by a fan who loves classic video games.
          </p>
        </section>

        {/* Story */}
        <section className="py-16 px-4 bg-card">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] bg-white p-8">
              <h2 className="font-display text-primary text-lg uppercase mb-4">The Story</h2>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                SuperMarioBros.Network started as a personal coding challenge. The goal was simple: recreate the feel of the original Super Mario Bros game entirely inside a web browser, using only modern web technologies and no external game engines that do the heavy lifting for you.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                After weeks of experimenting with canvas rendering, physics simulations, and responsive design, this site came to life. Everything you see here was coded by hand, from the player movement and enemy AI to the coin collection and flagpole logic.
              </p>
              <p className="text-gray-800 text-base leading-relaxed">
                This is a tribute to a game that defined generations of players and inspired countless developers. If you grew up playing Super Mario Bros, this project is for you.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] bg-[#FFD700] p-8">
              <h2 className="font-display text-black text-lg uppercase mb-6">Built With</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'React 19', desc: 'UI framework' },
                  { name: 'TypeScript', desc: 'Type-safe code' },
                  { name: 'Vite', desc: 'Build tool' },
                  { name: 'Phaser 4', desc: 'Game engine' },
                  { name: 'Tailwind CSS', desc: 'Styling' },
                  { name: 'GitHub Pages', desc: 'Hosting' },
                ].map(item => (
                  <div key={item.name} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0_rgba(0,0,0,1)]">
                    <p className="font-bold text-black text-sm">{item.name}</p>
                    <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <div className="border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] bg-secondary p-8">
              <h2 className="font-display text-white text-lg uppercase mb-4 drop-shadow-[0_2px_0_rgba(0,0,0,1)]">Why No Sprites?</h2>
              <p className="text-white/90 text-base leading-relaxed mb-4">
                One of the interesting decisions in this project was to use programmatic graphics instead of sprite sheets. Every shape you see in the game is drawn using Phaser's graphics API at runtime.
              </p>
              <p className="text-white/90 text-base leading-relaxed">
                This was a deliberate choice to keep the codebase completely self-contained. No external image assets, no copyright concerns, and a fun technical constraint that pushed the implementation in creative directions.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] bg-white p-8">
              <h2 className="font-display text-primary text-lg uppercase mb-4">Disclaimer</h2>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                This project is a fan-made tribute and is not affiliated with, endorsed by, or connected to Nintendo Co., Ltd. in any way. Super Mario Bros is a trademark of Nintendo.
              </p>
              <p className="text-gray-800 text-base leading-relaxed">
                This site is completely free, contains no advertisements, and is not used for any commercial purpose. It exists purely as a love letter to a classic game and as a demonstration of what modern web technologies can do.
              </p>
            </div>

            {/* Contact */}
            <div className="border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] bg-muted p-8 text-center">
              <h2 className="font-display text-white text-lg uppercase mb-4">Get in Touch</h2>
              <p className="text-white/90 text-base leading-relaxed mb-6">
                Have feedback, found a bug, or just want to say hello? Find the developer on GitHub.
              </p>
              <a
                href="https://github.com/yusufsafary"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-black font-bold px-8 py-4 border-4 border-white hover:bg-yellow-300 transition-colors shadow-[6px_6px_0_rgba(0,0,0,0.5)] uppercase"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

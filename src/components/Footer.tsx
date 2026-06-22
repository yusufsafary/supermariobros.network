import React from 'react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-muted text-white py-12 px-4 border-t-8 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-sm uppercase mb-4 text-accent">SuperMarioBros.Network</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A fan-made tribute to one of the greatest video games of all time.
              Not affiliated with Nintendo.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase text-sm mb-4 text-white">Pages</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-accent transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-accent transition-colors text-sm">About</Link></li>
              <li><Link href="/how-to-play" className="text-gray-400 hover:text-accent transition-colors text-sm">How to Play</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase text-sm mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/cookie-policy" className="text-gray-400 hover:text-accent transition-colors text-sm">Cookie Policy</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-accent transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-accent transition-colors text-sm">Terms of Use</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t-4 border-black/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            2024 SuperMarioBros.Network. Fan project. Not affiliated with Nintendo Co., Ltd.
          </p>
          <a
            href="https://github.com/yusufsafary"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-4 py-2 border-4 border-black hover:bg-accent transition-colors shadow-[4px_4px_0_rgba(0,0,0,1)] text-sm"
          >
            GitHub: yusufsafary
          </a>
        </div>
      </div>
    </footer>
  );
}

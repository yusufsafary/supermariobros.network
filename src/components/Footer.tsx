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
            {/* X (Twitter) social link */}
            <a
              href="https://x.com/playmariobros"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-gray-400 hover:text-accent transition-colors text-sm font-bold"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @playmariobros
            </a>
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

        {/* EasyA logo + bottom bar */}
        <div className="border-t-4 border-black/30 pt-8 flex flex-col items-center gap-4">
          <a
            href="https://easya.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
          >
            <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Built with</span>
            <img
              src="/easya-logo.png"
              alt="EasyA Kickstart"
              className="h-10 w-auto object-contain rounded-md"
            />
          </a>
          <p className="text-gray-400 text-sm text-center">
            2024 SuperMarioBros.Network. Fan project. Not affiliated with Nintendo Co., Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}

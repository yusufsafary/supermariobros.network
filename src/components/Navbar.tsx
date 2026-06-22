import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import MarioLogo from '@/components/MarioLogo';

const EASYA_LOGO = `data:image/png;base64,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`;

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/how-to-play', label: 'How to Play' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState(false);

  const goToGame = () => {
    setOpen(false);
    if (location === '/') {
      document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setLocation('/');
      setTimeout(() => {
        document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary border-b-4 border-black shadow-[0_4px_0_rgba(0,0,0,0.5)]">
      {/* ── EasyA + X banner ── */}
      <div className="bg-black/80 border-b-2 border-white/10 px-4 py-1 flex items-center justify-center gap-4">
        <a
          href="https://x.com/playmariobros"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-xs font-bold"
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current shrink-0">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          @playmariobros
        </a>
        <span className="text-white/20 text-xs">|</span>
        <a
          href="https://easya.io"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity"
          title="Built with EasyA Kickstart"
        >
          <img src={EASYA_LOGO} alt="EasyA Kickstart" className="h-5 w-auto rounded" />
          <span className="text-white/70 text-xs font-bold hidden sm:inline">EasyA Kickstart</span>
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 shrink-0 group-hover:scale-110 transition-transform">
            <MarioLogo size={40} />
          </div>
          <span className="font-display text-white text-[9px] leading-tight hidden sm:block group-hover:text-accent transition-colors">
            SMB<br/>.NETWORK
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-bold text-sm uppercase tracking-wide transition-colors hover:text-accent ${
                location === link.href ? 'text-accent underline underline-offset-4' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/play"
            className="bg-accent text-black font-display text-[9px] uppercase px-4 py-2 border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-yellow-300 active:translate-y-0.5 transition-all"
          >
            🎮 Play Game
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white font-bold text-xs border-2 border-white px-3 py-1 hover:bg-white/20 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-muted border-t-4 border-black">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-white font-bold border-b-2 border-black/30 hover:bg-black/20 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/play"
            className="block w-full text-left px-4 py-3 bg-accent text-black font-bold border-b-2 border-black/30 hover:bg-yellow-300 transition-colors"
            onClick={() => setOpen(false)}
          >
            🎮 Play Game
          </Link>
        </div>
      )}
    </nav>
  );
}

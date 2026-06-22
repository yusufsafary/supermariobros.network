import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import MarioLogo from '@/components/MarioLogo';

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
          <button
            onClick={goToGame}
            className="bg-accent text-black font-display text-[9px] uppercase px-4 py-2 border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-yellow-300 active:translate-y-0.5 transition-all"
          >
            Play Game
          </button>
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
          <button
            onClick={goToGame}
            className="w-full text-left px-4 py-3 bg-accent text-black font-bold border-b-2 border-black/30 hover:bg-yellow-300 transition-colors flex items-center gap-2"
          >
            <span>🎮</span> Play Game
          </button>
        </div>
      )}
    </nav>
  );
}

import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/how-to-play', label: 'How to Play' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary border-b-4 border-black shadow-[0_4px_0_rgba(0,0,0,0.5)]">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="font-display text-white text-[10px] md:text-xs hover:text-accent transition-colors">
          SMB.NETWORK
        </Link>
        <div className="hidden md:flex items-center gap-6">
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
        </div>
        <button
          className="md:hidden text-white font-bold text-xs border-2 border-white px-3 py-1 hover:bg-white/20 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </div>
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
        </div>
      )}
    </nav>
  );
}

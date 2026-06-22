import React from 'react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="pt-14 flex-1 flex flex-col items-center justify-center px-4 text-center py-20">
        <h1 className="font-display text-white text-4xl md:text-6xl uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-6 animate-bounce" style={{animationDuration:'2s'}}>
          404
        </h1>
        <p className="font-display text-accent text-sm md:text-base uppercase mb-4">
          Page Not Found
        </p>
        <p className="text-white/90 text-lg font-medium max-w-md mx-auto mb-10">
          Mario looked everywhere but could not find this page. Maybe it is in another castle.
        </p>
        <Link href="/" className="bg-primary text-white font-display text-xs uppercase px-8 py-4 border-4 border-white shadow-[0_8px_0_rgba(0,0,0,0.5)] hover:bg-red-600 active:translate-y-2 transition-all">
          Back to Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}

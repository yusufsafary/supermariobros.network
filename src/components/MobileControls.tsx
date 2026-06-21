import React, { useCallback } from 'react';

export default function MobileControls() {
  const dispatchControl = useCallback((event: string) => {
    window.dispatchEvent(new Event(event));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-end p-4 pb-8 z-10 md:hidden">
      <div className="flex justify-between items-end w-full">
        
        {/* D-PAD */}
        <div className="flex gap-4 pointer-events-auto">
          <button 
            className="w-16 h-16 bg-white/50 backdrop-blur active:bg-white/80 border-4 border-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg"
            onPointerDown={(e) => { e.preventDefault(); dispatchControl('mobile-left-down'); }}
            onPointerUp={(e) => { e.preventDefault(); dispatchControl('mobile-left-up'); }}
            onPointerLeave={(e) => { e.preventDefault(); dispatchControl('mobile-left-up'); }}
          >
            L
          </button>
          <button 
            className="w-16 h-16 bg-white/50 backdrop-blur active:bg-white/80 border-4 border-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg"
            onPointerDown={(e) => { e.preventDefault(); dispatchControl('mobile-right-down'); }}
            onPointerUp={(e) => { e.preventDefault(); dispatchControl('mobile-right-up'); }}
            onPointerLeave={(e) => { e.preventDefault(); dispatchControl('mobile-right-up'); }}
          >
            R
          </button>
        </div>

        {/* Action Buttons */}
        <div className="pointer-events-auto">
          <button 
            className="w-20 h-20 bg-primary/80 backdrop-blur active:bg-primary border-4 border-white rounded-full flex items-center justify-center text-white text-3xl font-display shadow-lg"
            onPointerDown={(e) => { e.preventDefault(); dispatchControl('mobile-jump-down'); }}
            onPointerUp={(e) => { e.preventDefault(); dispatchControl('mobile-jump-up'); }}
            onPointerLeave={(e) => { e.preventDefault(); dispatchControl('mobile-jump-up'); }}
          >
            A
          </button>
        </div>
        
      </div>
    </div>
  );
}

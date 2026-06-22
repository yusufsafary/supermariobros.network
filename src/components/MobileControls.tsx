import React, { useCallback, useRef } from 'react';

interface BtnProps {
  onDown: () => void;
  onUp: () => void;
  className?: string;
  children: React.ReactNode;
}

function Btn({ onDown, onUp, className = '', children }: BtnProps) {
  const active = useRef(false);

  const handleDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    if (active.current) return;
    active.current = true;
    onDown();
  }, [onDown]);

  const handleUp = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    if (!active.current) return;
    active.current = false;
    onUp();
  }, [onUp]);

  return (
    <button
      className={`select-none touch-none ${className}`}
      onPointerDown={handleDown}
      onPointerUp={handleUp}
      onPointerLeave={handleUp}
      onPointerCancel={handleUp}
    >
      {children}
    </button>
  );
}

export default function MobileControls() {
  const dispatch = useCallback((evt: string) => {
    window.dispatchEvent(new Event(evt));
  }, []);

  return (
    <div className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-black/80 border-t-4 border-white/20">
      {/* D-Pad: Left + Right */}
      <div className="flex items-center gap-3">
        <Btn
          onDown={() => dispatch('mobile-left-down')}
          onUp={() => dispatch('mobile-left-up')}
          className="w-20 h-20 bg-white/15 active:bg-white/40 border-4 border-white/50 rounded-xl flex items-center justify-center text-4xl font-bold text-white shadow-[0_4px_0_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-1 transition-all"
        >
          ◀
        </Btn>
        <Btn
          onDown={() => dispatch('mobile-right-down')}
          onUp={() => dispatch('mobile-right-up')}
          className="w-20 h-20 bg-white/15 active:bg-white/40 border-4 border-white/50 rounded-xl flex items-center justify-center text-4xl font-bold text-white shadow-[0_4px_0_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-1 transition-all"
        >
          ▶
        </Btn>
      </div>

      {/* Controls hint */}
      <div className="text-white/30 text-[10px] font-display uppercase text-center leading-tight hidden sm:block">
        D-PAD<br/>MOVE
      </div>

      {/* Jump button */}
      <Btn
        onDown={() => dispatch('mobile-jump-down')}
        onUp={() => dispatch('mobile-jump-up')}
        className="w-24 h-24 bg-red-600 active:bg-red-400 border-4 border-white rounded-full flex flex-col items-center justify-center text-white shadow-[0_6px_0_rgba(0,0,0,0.6)] active:shadow-none active:translate-y-1.5 transition-all"
      >
        <span className="text-3xl leading-none">▲</span>
        <span className="text-[10px] font-display uppercase mt-1">JUMP</span>
      </Btn>
    </div>
  );
}

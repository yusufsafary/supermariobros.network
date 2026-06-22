import React from 'react';

interface MarioLogoProps {
  size?: number;
  className?: string;
}

export default function MarioLogo({ size = 44, className = '' }: MarioLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Super Mario Bros Network Logo"
    >
      {/* === HAT CROWN === */}
      <rect x="8" y="0" width="28" height="13" fill="#E52521"/>
      {/* Hat crown shadow */}
      <rect x="8" y="10" width="28" height="3" fill="#A81A17"/>
      {/* Hat highlight */}
      <rect x="8" y="0" width="28" height="3" fill="#F06050"/>

      {/* === HAT BRIM === */}
      <rect x="2" y="13" width="40" height="6" fill="#E52521"/>
      {/* Brim shadow bottom */}
      <rect x="2" y="17" width="40" height="2" fill="#A81A17"/>
      {/* Brim highlight top */}
      <rect x="2" y="13" width="40" height="2" fill="#F06050"/>

      {/* === HAIR (brown peeking under brim) === */}
      <rect x="2" y="19" width="7" height="5" fill="#7B4A1C"/>
      <rect x="35" y="19" width="7" height="5" fill="#7B4A1C"/>

      {/* === FACE / HEAD === */}
      {/* Main face rectangle */}
      <rect x="7" y="19" width="30" height="21" fill="#FECB8A"/>
      {/* Rounded corners - top */}
      <rect x="5" y="21" width="4" height="6" fill="#FECB8A"/>
      <rect x="35" y="21" width="4" height="6" fill="#FECB8A"/>
      {/* Ears */}
      <rect x="3" y="23" width="5" height="8" fill="#FECB8A"/>
      <rect x="36" y="23" width="5" height="8" fill="#FECB8A"/>
      {/* Face bottom */}
      <rect x="5" y="33" width="4" height="5" fill="#FECB8A"/>
      <rect x="35" y="33" width="4" height="5" fill="#FECB8A"/>

      {/* === EYEBROWS === */}
      <rect x="8"  y="21" width="11" height="3" fill="#7B4A1C"/>
      <rect x="25" y="21" width="11" height="3" fill="#7B4A1C"/>

      {/* === LEFT EYE === */}
      <rect x="9"  y="24" width="9" height="7" fill="white"/>
      <rect x="11" y="25" width="6" height="5" fill="#1A5FAD"/>
      <rect x="12" y="26" width="4" height="4" fill="#000000"/>
      <rect x="12" y="26" width="2" height="2" fill="white"/>

      {/* === RIGHT EYE === */}
      <rect x="26" y="24" width="9" height="7" fill="white"/>
      <rect x="28" y="25" width="6" height="5" fill="#1A5FAD"/>
      <rect x="29" y="26" width="4" height="4" fill="#000000"/>
      <rect x="29" y="26" width="2" height="2" fill="white"/>

      {/* === NOSE === */}
      <ellipse cx="22" cy="33" rx="5" ry="3" fill="#E8956A"/>

      {/* === MUSTACHE === */}
      {/* Left wing */}
      <rect x="6"  y="36" width="13" height="4" fill="#7B4A1C" rx="2"/>
      <rect x="5"  y="37" width="7"  height="3" fill="#7B4A1C" rx="1"/>
      {/* Right wing */}
      <rect x="25" y="36" width="13" height="4" fill="#7B4A1C" rx="2"/>
      <rect x="32" y="37" width="7"  height="3" fill="#7B4A1C" rx="1"/>
      {/* Center gap (skin color) */}
      <rect x="19" y="35" width="6" height="6" fill="#FECB8A"/>

      {/* === CHIN/JAW edge === */}
      <rect x="9" y="40" width="26" height="2" fill="#E8956A"/>
    </svg>
  );
}

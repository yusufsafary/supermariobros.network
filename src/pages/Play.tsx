import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import MarioGame from '@/components/MarioGame';
import MarioLogo from '@/components/MarioLogo';

type GameState = 'idle' | 'playing' | 'levelComplete' | 'gameOver' | 'victory';

const LEVEL_NAMES = ['World 1-1', 'World 2-1', 'World 3-1'];
const LEVEL_SUBTITLES = ['Classic Plains', 'Underground Cave', "Bowser's Castle"];
const LEVEL_EMOJIS = ['🌿', '🪨', '🏰'];
const LEVEL_DIFFICULTY = ['Beginner', 'Intermediate', 'Expert'];

interface LevelCompleteData {
  score: number;
  coins: number;
  timeLeft: number;
}

export default function Play() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3>(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [totalCoins, setTotalCoins] = useState(0);
  const [levelCompleteData, setLevelCompleteData] = useState<LevelCompleteData | null>(null);
  const [bestScore, setBestScore] = useState<number>(() => {
    try { return parseInt(localStorage.getItem('smn-best-score') || '0', 10); } catch { return 0; }
  });

  useEffect(() => {
    const onLevelComplete = (e: Event) => {
      const { score: s, lives: l, coins: c, timeLeft: t } = (e as CustomEvent).detail;
      setScore(s);
      setLives(l);
      setTotalCoins(prev => prev + c);
      setLevelCompleteData({ score: s, coins: c, timeLeft: t });
      setGameState('levelComplete');
    };
    const onGameOver = (e: Event) => {
      const { score: s } = (e as CustomEvent).detail;
      setScore(s);
      setBestScore(prev => {
        const next = Math.max(prev, s);
        try { localStorage.setItem('smn-best-score', String(next)); } catch {}
        return next;
      });
      setGameState('gameOver');
    };
    const onScoreUpdate = (e: Event) => {
      setScore((e as CustomEvent).detail.score);
    };
    window.addEventListener('game-level-complete', onLevelComplete);
    window.addEventListener('game-over', onGameOver);
    window.addEventListener('game-score-update', onScoreUpdate);
    return () => {
      window.removeEventListener('game-level-complete', onLevelComplete);
      window.removeEventListener('game-over', onGameOver);
      window.removeEventListener('game-score-update', onScoreUpdate);
    };
  }, []);

  const startGame = useCallback((level: 1 | 2 | 3 = 1, keepScore = false) => {
    if (!keepScore) { setScore(0); setLives(3); setTotalCoins(0); }
    setCurrentLevel(level);
    setGameState('playing');
  }, []);

  const nextLevel = useCallback(() => {
    if (currentLevel < 3) {
      startGame((currentLevel + 1) as 1 | 2 | 3, true);
    } else {
      const timeBonus = (levelCompleteData?.timeLeft || 0) * 50;
      const finalScore = score + timeBonus;
      setScore(finalScore);
      setBestScore(prev => {
        const next = Math.max(prev, finalScore);
        try { localStorage.setItem('smn-best-score', String(next)); } catch {}
        return next;
      });
      setGameState('victory');
    }
  }, [currentLevel, score, levelCompleteData, startGame]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="bg-primary border-b-4 border-black px-4 py-2 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <MarioLogo size={28} />
          <span className="font-display text-white text-[9px] uppercase hidden sm:block leading-tight">
            Super Mario<br/>Network
          </span>
        </Link>
        <div className="flex items-center gap-4 text-xs font-display">
          {gameState === 'playing' && (
            <>
              <span className="text-accent">{LEVEL_NAMES[currentLevel - 1]}</span>
              <span className="text-white">SCORE: {score.toLocaleString()}</span>
              <span className="text-white hidden sm:inline">♥ {lives}</span>
              <span className="text-white/50 hidden md:inline">ESC = PAUSE</span>
            </>
          )}
          {gameState !== 'playing' && bestScore > 0 && (
            <span className="text-accent">🏆 BEST: {bestScore.toLocaleString()}</span>
          )}
        </div>
        <Link href="/how-to-play" className="text-white/70 hover:text-white text-xs font-bold transition-colors hidden sm:block">
          Controls
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 min-h-0">

        {/* IDLE: level select */}
        {gameState === 'idle' && (
          <div className="flex flex-col items-center gap-8 max-w-2xl w-full">
            <div className="text-center">
              <h1 className="font-display text-5xl text-white uppercase tracking-wider drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
                SELECT<br/><span className="text-accent">WORLD</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {([1, 2, 3] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => startGame(lvl)}
                  className="group bg-card border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] p-6 hover:translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all text-left"
                >
                  <div className="text-4xl mb-3">{LEVEL_EMOJIS[lvl - 1]}</div>
                  <p className="font-display text-accent text-[10px] uppercase mb-1">World {lvl}-1</p>
                  <p className="font-bold text-white text-base mb-1">{LEVEL_SUBTITLES[lvl - 1]}</p>
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 border border-black ${i < lvl ? 'bg-accent' : 'bg-black/30'}`} />
                    ))}
                    <span className="text-white/50 text-[9px] ml-1">{LEVEL_DIFFICULTY[lvl - 1]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              {bestScore > 0 && (
                <div className="bg-accent text-black font-display text-xs px-6 py-3 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
                  🏆 BEST SCORE: {bestScore.toLocaleString()}
                </div>
              )}
              <p className="text-white/40 text-xs">Mushroom = Power-up · Timer = Bonus Score · Stomp Goombas = +200</p>
            </div>
          </div>
        )}

        {/* PLAYING */}
        {gameState === 'playing' && (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Level progress pills */}
            <div className="flex items-center gap-2">
              {([1, 2, 3] as const).map(lvl => (
                <div
                  key={lvl}
                  className={`font-display text-[10px] px-3 py-1 border-2 border-black transition-colors ${
                    lvl === currentLevel
                      ? 'bg-accent text-black'
                      : lvl < currentLevel
                      ? 'bg-white/20 text-white/60'
                      : 'bg-black/40 text-white/30'
                  }`}
                >
                  {LEVEL_NAMES[lvl - 1]}
                </div>
              ))}
            </div>

            <MarioGame level={currentLevel} initialScore={score} initialLives={lives} />

            <p className="text-white/40 text-[10px] font-display">← → MOVE · SPACE/↑ JUMP · ESC PAUSE</p>
          </div>
        )}

        {/* LEVEL COMPLETE */}
        {gameState === 'levelComplete' && (
          <div className="flex flex-col items-center gap-6 max-w-sm w-full text-center">
            <div className="text-6xl animate-bounce">⭐</div>
            <h2 className="font-display text-4xl text-accent uppercase drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
              Level Clear!
            </h2>
            <div className="bg-card border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] p-6 w-full space-y-3">
              <div className="flex justify-between font-bold text-white">
                <span>Score</span>
                <span className="text-accent">{score.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>Coins</span>
                <span className="text-yellow-400">× {levelCompleteData?.coins || 0}</span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>Time Bonus</span>
                <span className="text-green-400">+{((levelCompleteData?.timeLeft || 0) * 50).toLocaleString()}</span>
              </div>
              <div className="border-t-2 border-white/20 pt-3 flex justify-between font-display text-white text-sm">
                <span>Lives Left</span>
                <span>{'♥'.repeat(lives)}</span>
              </div>
            </div>
            {currentLevel < 3 ? (
              <button
                onClick={nextLevel}
                className="bg-primary text-white font-display text-lg px-10 py-5 border-4 border-white shadow-[0_8px_0_rgba(0,0,0,0.6)] active:translate-y-2 active:shadow-none transition-all uppercase"
              >
                World {currentLevel + 1} →
              </button>
            ) : (
              <button
                onClick={nextLevel}
                className="bg-accent text-black font-display text-lg px-10 py-5 border-4 border-black shadow-[0_8px_0_rgba(0,0,0,0.6)] active:translate-y-2 active:shadow-none transition-all uppercase"
              >
                🏆 Final Victory!
              </button>
            )}
          </div>
        )}

        {/* GAME OVER */}
        {gameState === 'gameOver' && (
          <div className="flex flex-col items-center gap-6 max-w-sm w-full text-center">
            <div className="text-6xl">💀</div>
            <h2 className="font-display text-4xl text-red-500 uppercase drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
              Game Over
            </h2>
            <div className="bg-card border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] p-6 w-full space-y-3">
              <div className="flex justify-between font-bold text-white">
                <span>Score</span>
                <span className="text-accent">{score.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>Coins</span>
                <span className="text-yellow-400">{totalCoins}</span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>Reached</span>
                <span>{LEVEL_NAMES[currentLevel - 1]}</span>
              </div>
              {score > 0 && score >= bestScore && (
                <div className="text-accent font-display text-xs text-center py-2 border-t-2 border-white/20">
                  🏆 NEW BEST SCORE!
                </div>
              )}
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={() => startGame(currentLevel)}
                className="bg-primary text-white font-display text-sm px-8 py-4 border-4 border-white shadow-[0_6px_0_rgba(0,0,0,0.6)] active:translate-y-1 transition-all uppercase"
              >
                Retry
              </button>
              <button
                onClick={() => startGame(1)}
                className="bg-card text-white font-display text-sm px-8 py-4 border-4 border-white shadow-[0_6px_0_rgba(0,0,0,0.6)] active:translate-y-1 transition-all uppercase"
              >
                World 1
              </button>
              <button
                onClick={() => setGameState('idle')}
                className="bg-black/50 text-white font-display text-sm px-6 py-4 border-4 border-white/30 shadow-[0_6px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition-all uppercase"
              >
                Menu
              </button>
            </div>
          </div>
        )}

        {/* VICTORY */}
        {gameState === 'victory' && (
          <div className="flex flex-col items-center gap-6 max-w-sm w-full text-center">
            <div className="text-7xl">🏆</div>
            <h2 className="font-display text-4xl text-accent uppercase drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
              You Win!
            </h2>
            <p className="text-white font-bold">All 3 worlds cleared!</p>
            <div className="bg-card border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] p-6 w-full space-y-3">
              <div className="flex justify-between font-display text-white text-lg">
                <span>Final Score</span>
                <span className="text-accent">{score.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>Total Coins</span>
                <span className="text-yellow-400">{totalCoins}</span>
              </div>
              {score >= bestScore && score > 0 && (
                <div className="text-accent font-display text-xs text-center py-2 border-t-2 border-white/20">
                  🏆 NEW BEST SCORE!
                </div>
              )}
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={() => startGame(1)}
                className="bg-primary text-white font-display text-lg px-10 py-5 border-4 border-white shadow-[0_8px_0_rgba(0,0,0,0.6)] active:translate-y-2 transition-all uppercase"
              >
                Play Again
              </button>
              <Link href="/" className="bg-card text-white font-display text-lg px-8 py-5 border-4 border-white shadow-[0_8px_0_rgba(0,0,0,0.6)] flex items-center uppercase">
                Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

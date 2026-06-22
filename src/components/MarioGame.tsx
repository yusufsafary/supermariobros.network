import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import MobileControls from './MobileControls';

interface MarioGameProps {
  level?: 1 | 2 | 3;
  initialScore?: number;
  initialLives?: number;
}

const LEVEL_CFG = {
  1: {
    bgColor: 0x5C94FC, worldWidth: 2400, enemySpeed: 80, timeLimit: 180,
    groundColor: 0x3A8C38, levelName: 'WORLD 1-1',
    enemyPositions: [600, 1000, 1500, 1800],
    mushrooms: [[300, 320]],
    platforms: [
      [400, 400], [464, 400], [528, 400],
      [800, 300], [1100, 200], [1164, 200],
      [1350, 320], [1600, 260], [1700, 340],
    ],
    pipes: [[700, 496], [1400, 496]],
    coins: [[400, 300], [464, 300], [528, 300], [800, 200], [1132, 100]],
    gaps: [10, 11, 25],
    flagX: 2200,
  },
  2: {
    bgColor: 0x0d0820, worldWidth: 2800, enemySpeed: 115, timeLimit: 150,
    groundColor: 0x5b3a1a, levelName: 'WORLD 2-1',
    enemyPositions: [550, 900, 1200, 1600, 1900, 2300],
    mushrooms: [[500, 300]],
    platforms: [
      [350, 380], [414, 380], [478, 380],
      [750, 280], [820, 280],
      [1050, 180], [1114, 180], [1178, 180],
      [1400, 300], [1600, 240], [1720, 180],
      [2000, 300], [2080, 300],
    ],
    pipes: [[650, 496], [1300, 496], [1900, 496]],
    coins: [[350, 280], [414, 280], [478, 280], [820, 180], [1114, 80], [1178, 80], [2050, 200]],
    gaps: [8, 9, 22, 23, 35],
    flagX: 2600,
  },
  3: {
    bgColor: 0x1a0505, worldWidth: 3200, enemySpeed: 148, timeLimit: 120,
    groundColor: 0x8b0000, levelName: 'WORLD 3-1',
    enemyPositions: [500, 800, 1100, 1400, 1700, 2000, 2400, 2800],
    mushrooms: [[400, 280]],
    platforms: [
      [300, 360], [364, 360],
      [600, 260], [664, 260], [728, 260],
      [950, 160], [1014, 160],
      [1250, 280], [1350, 200], [1450, 280],
      [1700, 160], [1764, 160], [1828, 160],
      [2100, 280], [2200, 200], [2300, 280],
      [2500, 160], [2600, 240],
    ],
    pipes: [[600, 496], [1200, 496], [1800, 496], [2400, 496]],
    coins: [[300, 260], [664, 160], [1014, 60], [1350, 100], [1764, 60], [2200, 100], [2600, 140]],
    gaps: [7, 8, 18, 19, 28, 29, 40, 41],
    flagX: 3000,
  },
} as const;

export default function MarioGame({ level = 1, initialScore = 0, initialLives = 3 }: MarioGameProps) {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;
    const cfg = LEVEL_CFG[level];

    class GameScene extends Phaser.Scene {
      player!: Phaser.Physics.Arcade.Sprite;
      platforms!: Phaser.Physics.Arcade.StaticGroup;
      cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
      wasd!: Record<string, Phaser.Input.Keyboard.Key>;
      score = initialScore;
      scoreText!: Phaser.GameObjects.Text;
      livesText!: Phaser.GameObjects.Text;
      timerText!: Phaser.GameObjects.Text;
      coinCountText!: Phaser.GameObjects.Text;
      powerText!: Phaser.GameObjects.Text;
      coins!: Phaser.Physics.Arcade.Group;
      mushrooms!: Phaser.Physics.Arcade.Group;
      enemies!: Phaser.Physics.Arcade.Group;
      flag!: Phaser.Physics.Arcade.Sprite;
      lives = initialLives;
      coinCount = 0;
      timerVal = cfg.timeLimit;
      timerTick = 0;
      isPowered = false;
      isInvincible = false;
      invincibleTimer = 0;
      isEnded = false;
      isPaused = false;
      escKey!: Phaser.Input.Keyboard.Key;
      pauseOverlay?: Phaser.GameObjects.Rectangle;
      pauseText?: Phaser.GameObjects.Text;
      frameCount = 0;
      walkFrame = 0;
      mobileLeft = false;
      mobileRight = false;
      mobileJump = false;

      constructor() { super({ key: 'GameScene' }); }

      preload() {
        const g = this.add.graphics();

        const RED = 0xE52521; const RED_DARK = 0xA81A17;
        const BLUE = 0x049CD8; const BLUE_DARK = 0x026FA0;
        const SKIN = 0xFECB8A; const SKIN_SHD = 0xE8956A;
        const BROWN = 0x7B4A1C; const BROWN_DK = 0x3D1805;
        const WHITE = 0xFFFFFF; const BLACK = 0x000000;
        const GOLD = 0xFFD700; const GOLD_DK = 0xC89000;
        const IRIS = 0x1A5FAD; const GREY = 0xCCCCCC;

        const drawMario = (legL: number, legR: number, armsUp: boolean) => {
          g.fillStyle(RED, 1); g.fillRect(10, 0, 44, 15); g.fillRect(4, 15, 56, 6);
          g.fillStyle(RED_DARK, 1); g.fillRect(10, 12, 44, 3);
          g.fillStyle(BROWN, 1); g.fillRect(4, 21, 10, 6); g.fillRect(50, 21, 10, 6);
          g.fillStyle(SKIN, 1); g.fillRect(10, 21, 44, 22);
          g.fillCircle(14, 25, 4); g.fillCircle(50, 25, 4);
          g.fillCircle(14, 39, 4); g.fillCircle(50, 39, 4);
          g.fillEllipse(7, 31, 8, 12); g.fillEllipse(57, 31, 8, 12);
          g.fillStyle(BROWN, 1); g.fillRect(15, 23, 12, 4); g.fillRect(37, 23, 12, 4);
          g.fillStyle(WHITE, 1); g.fillRect(16, 27, 11, 9); g.fillRect(37, 27, 11, 9);
          g.fillStyle(IRIS, 1); g.fillRect(18, 29, 7, 6); g.fillRect(39, 29, 7, 6);
          g.fillStyle(BLACK, 1); g.fillRect(19, 30, 5, 4); g.fillRect(40, 30, 5, 4);
          g.fillStyle(WHITE, 1); g.fillRect(19, 30, 2, 2); g.fillRect(40, 30, 2, 2);
          g.fillStyle(SKIN_SHD, 1); g.fillEllipse(32, 37, 13, 9);
          g.fillStyle(BROWN, 1); g.fillEllipse(22, 43, 22, 11); g.fillEllipse(42, 43, 22, 11);
          g.fillStyle(SKIN, 1); g.fillRect(29, 41, 6, 7);
          g.fillStyle(RED, 1); g.fillRect(0, 46, 64, 18);
          if (armsUp) {
            g.fillStyle(RED, 1); g.fillRect(0, 30, 12, 20); g.fillRect(52, 30, 12, 20);
            g.fillStyle(WHITE, 1); g.fillCircle(6, 28, 8); g.fillCircle(58, 28, 8);
            g.fillStyle(GREY, 1); g.fillRect(0, 27, 11, 2); g.fillRect(53, 27, 11, 2);
          } else {
            g.fillStyle(RED, 1); g.fillRect(0, 46, 12, 16); g.fillRect(52, 46, 12, 16);
            g.fillStyle(WHITE, 1); g.fillCircle(6, 63, 8); g.fillCircle(58, 63, 8);
            g.fillStyle(GREY, 1); g.fillRect(0, 61, 11, 2); g.fillRect(53, 61, 11, 2);
            g.fillRect(1, 65, 9, 1); g.fillRect(54, 65, 9, 1);
          }
          g.fillStyle(BLUE, 1); g.fillRect(18, 46, 28, 18);
          g.fillRect(17, 43, 8, 8); g.fillRect(39, 43, 8, 8);
          g.fillStyle(BLUE_DARK, 1); g.fillRect(18, 60, 28, 4);
          g.fillStyle(GOLD, 1); g.fillCircle(24, 54, 4); g.fillCircle(40, 54, 4);
          g.fillStyle(GOLD_DK, 1); g.fillCircle(25, 55, 2); g.fillCircle(41, 55, 2);
          g.fillStyle(BLUE, 1); g.fillRect(14, 64 + legL, 14, 10); g.fillRect(36, 64 + legR, 14, 10);
          g.fillStyle(BLUE_DARK, 1); g.fillRect(25, 64 + legL, 3, 10); g.fillRect(36, 64 + legR, 3, 10);
          g.fillStyle(BROWN_DK, 1); g.fillRect(9, 74 + legL, 21, 10); g.fillRect(34, 74 + legR, 21, 10);
          g.fillStyle(BROWN, 1); g.fillRect(9, 74 + legL, 21, 3); g.fillRect(34, 74 + legR, 21, 3);
          g.fillStyle(BROWN_DK, 1); g.fillRect(6, 78 + legL, 23, 6); g.fillRect(35, 78 + legR, 23, 6);
        };

        drawMario(0, 0, false); g.generateTexture('mario', 64, 84); g.clear();
        drawMario(5, -5, false); g.generateTexture('mario_walk', 64, 84); g.clear();
        drawMario(-8, -8, true); g.generateTexture('mario_jump', 64, 84); g.clear();

        const GB = 0x8B4513; const GDK = 0x5C2E0B; const GLT = 0xC17240; const GS = 0xF0C88A;
        const drawGoomba = (footL: number, footR: number) => {
          g.fillStyle(GDK, 1); g.fillEllipse(14, 48 + footL, 22, 10); g.fillEllipse(34, 48 + footR, 22, 10);
          g.fillStyle(GLT, 1); g.fillEllipse(14, 46 + footL, 18, 5); g.fillEllipse(34, 46 + footR, 18, 5);
          g.fillStyle(GB, 1); g.fillEllipse(24, 26, 44, 40);
          g.fillStyle(GDK, 1); g.fillEllipse(24, 16, 44, 26);
          g.fillStyle(0x7A3D10, 1); g.fillCircle(13, 12, 5); g.fillCircle(35, 12, 5);
          g.fillStyle(GS, 1); g.fillEllipse(24, 35, 32, 20);
          g.fillStyle(GDK, 1); g.fillRect(8, 20, 14, 5); g.fillRect(26, 20, 14, 5);
          g.fillRect(8, 18, 5, 3); g.fillRect(35, 18, 5, 3);
          g.fillStyle(WHITE, 1); g.fillCircle(17, 28, 9); g.fillCircle(31, 28, 9);
          g.fillStyle(BLACK, 1); g.fillCircle(19, 30, 5); g.fillCircle(29, 30, 5);
          g.fillStyle(WHITE, 1); g.fillCircle(17, 28, 3); g.fillCircle(29, 28, 3);
          g.fillStyle(BLACK, 1); g.fillCircle(17, 30, 4); g.fillCircle(29, 30, 4);
          g.fillStyle(WHITE, 1); g.fillRect(16, 28, 3, 2);
          g.fillStyle(WHITE, 1); g.fillRect(17, 39, 5, 8); g.fillRect(26, 39, 5, 8);
          g.fillTriangle(17, 47, 22, 47, 19, 52); g.fillTriangle(26, 47, 31, 47, 29, 52);
          g.fillStyle(GDK, 1); g.fillRect(14, 39, 20, 2);
        };
        drawGoomba(0, 0); g.generateTexture('goomba', 48, 52); g.clear();
        drawGoomba(4, -4); g.generateTexture('goomba_walk', 48, 52); g.clear();

        // BRICK
        g.fillStyle(0xC84B0C, 1); g.fillRect(0, 0, 64, 64);
        g.fillStyle(0xD09060, 1);
        g.fillRect(0, 0, 64, 3); g.fillRect(0, 31, 64, 4); g.fillRect(0, 61, 64, 3);
        g.fillRect(0, 3, 3, 28); g.fillRect(31, 3, 4, 28); g.fillRect(61, 3, 3, 28);
        g.fillRect(0, 35, 3, 26); g.fillRect(17, 35, 4, 26); g.fillRect(47, 35, 4, 26); g.fillRect(61, 35, 3, 26);
        g.fillStyle(0xD4601A, 1);
        g.fillRect(3, 3, 27, 3); g.fillRect(3, 3, 3, 27); g.fillRect(35, 3, 25, 3); g.fillRect(35, 3, 3, 27);
        g.fillRect(3, 35, 13, 3); g.fillRect(3, 35, 3, 25); g.fillRect(21, 35, 25, 3); g.fillRect(21, 35, 3, 25);
        g.fillRect(51, 35, 9, 3); g.fillRect(51, 35, 3, 25);
        g.fillStyle(0x8B2E08, 1);
        g.fillRect(3, 28, 27, 3); g.fillRect(28, 3, 3, 28); g.fillRect(35, 28, 25, 3); g.fillRect(58, 3, 3, 28);
        g.fillRect(3, 58, 13, 3); g.fillRect(14, 35, 3, 26); g.fillRect(21, 58, 25, 3);
        g.fillRect(44, 35, 3, 26); g.fillRect(51, 58, 9, 3); g.fillRect(58, 35, 3, 26);
        g.generateTexture('brick', 64, 64); g.clear();

        // GROUND (Level 1 - grass)
        g.fillStyle(0xC84B0C, 1); g.fillRect(0, 0, 64, 64);
        g.fillStyle(0xD09060, 1);
        g.fillRect(0, 8, 64, 4); g.fillRect(0, 38, 64, 4); g.fillRect(0, 62, 64, 2);
        g.fillRect(0, 8, 3, 30); g.fillRect(31, 8, 4, 30); g.fillRect(61, 8, 3, 30);
        g.fillRect(0, 42, 3, 20); g.fillRect(19, 42, 4, 20); g.fillRect(47, 42, 4, 20); g.fillRect(61, 42, 3, 20);
        g.fillStyle(0x3A8C38, 1); g.fillRect(0, 0, 64, 9);
        g.fillStyle(0x5ABA58, 1); g.fillRect(0, 0, 64, 4);
        g.fillStyle(0x2D6E2B, 1); g.fillRect(0, 5, 64, 4);
        g.fillStyle(0x5ABA58, 1);
        g.fillTriangle(8, 0, 4, 5, 12, 5); g.fillTriangle(24, 0, 20, 5, 28, 5);
        g.fillTriangle(40, 0, 36, 5, 44, 5); g.fillTriangle(56, 0, 52, 5, 60, 5);
        g.generateTexture('ground', 64, 64); g.clear();

        // CAVE GROUND (Level 2 - stone)
        g.fillStyle(0x3d2b1f, 1); g.fillRect(0, 0, 64, 64);
        g.fillStyle(0x5a3e2b, 1);
        g.fillRect(0, 0, 64, 3); g.fillRect(0, 30, 64, 3); g.fillRect(0, 60, 64, 3);
        g.fillRect(0, 3, 3, 27); g.fillRect(30, 3, 3, 27); g.fillRect(61, 3, 3, 27);
        g.fillRect(15, 33, 3, 27); g.fillRect(45, 33, 3, 27);
        g.fillStyle(0x7a5c40, 1);
        g.fillRect(3, 3, 26, 2); g.fillRect(33, 3, 27, 2);
        g.fillRect(3, 33, 11, 2); g.fillRect(18, 33, 26, 2); g.fillRect(48, 33, 12, 2);
        g.fillStyle(0x291a10, 1);
        g.fillRect(3, 27, 26, 3); g.fillRect(33, 27, 27, 3);
        g.fillRect(3, 57, 11, 3); g.fillRect(18, 57, 26, 3); g.fillRect(48, 57, 12, 3);
        // stalactites on top
        g.fillStyle(0x2a1c12, 1);
        g.fillTriangle(10, 0, 6, 6, 14, 6); g.fillTriangle(30, 0, 26, 8, 34, 8);
        g.fillTriangle(50, 0, 46, 5, 54, 5);
        g.generateTexture('ground_cave', 64, 64); g.clear();

        // CASTLE BRICK (Level 3)
        g.fillStyle(0x4a1a1a, 1); g.fillRect(0, 0, 64, 64);
        g.fillStyle(0x6b2c2c, 1);
        g.fillRect(0, 0, 64, 3); g.fillRect(0, 31, 64, 4); g.fillRect(0, 61, 64, 3);
        g.fillRect(0, 3, 3, 28); g.fillRect(31, 3, 4, 28); g.fillRect(61, 3, 3, 28);
        g.fillRect(0, 35, 3, 26); g.fillRect(17, 35, 4, 26); g.fillRect(47, 35, 4, 26); g.fillRect(61, 35, 3, 26);
        g.fillStyle(0x8b3535, 1);
        g.fillRect(3, 3, 27, 3); g.fillRect(3, 3, 3, 27);
        g.fillRect(35, 3, 25, 3); g.fillRect(35, 3, 3, 27);
        g.fillStyle(0x2d0a0a, 1);
        g.fillRect(3, 28, 27, 3); g.fillRect(28, 3, 3, 28);
        g.fillRect(35, 28, 25, 3); g.fillRect(58, 3, 3, 28);
        // Lava glow at bottom
        g.fillStyle(0xff4400, 0.3); g.fillRect(0, 56, 64, 8);
        g.fillStyle(0xff8800, 0.2); g.fillRect(0, 60, 64, 4);
        g.generateTexture('ground_castle', 64, 64); g.clear();

        // COIN
        g.fillStyle(GOLD_DK, 1); g.fillCircle(16, 16, 16);
        g.fillStyle(GOLD, 1); g.fillCircle(16, 16, 13);
        g.fillStyle(0xFFF5AA, 1); g.fillCircle(16, 16, 9);
        g.fillStyle(GOLD_DK, 1); g.fillRect(13, 7, 6, 18); g.fillRect(11, 9, 10, 5); g.fillRect(11, 18, 10, 5);
        g.fillStyle(0xFFFBCC, 1); g.fillEllipse(9, 9, 8, 10);
        g.generateTexture('coin', 32, 32); g.clear();

        // MUSHROOM (power-up)
        g.fillStyle(0xE52521, 1); g.fillEllipse(20, 14, 38, 32);
        g.fillStyle(0xFFFFFF, 1); g.fillCircle(10, 12, 5); g.fillCircle(30, 10, 6); g.fillCircle(22, 6, 4);
        g.fillStyle(0xFECB8A, 1); g.fillRect(7, 22, 26, 16); g.fillCircle(7, 22, 8); g.fillCircle(33, 22, 8);
        g.fillStyle(0xF0E0C0, 1); g.fillRect(8, 30, 24, 8);
        g.fillStyle(0x8B6040, 1); g.fillRect(8, 36, 24, 2);
        g.generateTexture('mushroom', 40, 40); g.clear();

        // PIPE
        const PG = 0x3A8C38; const PLT = 0x5EBF5C; const PDK = 0x1F5C1E;
        g.fillStyle(PG, 1); g.fillRect(4, 18, 64, 62);
        g.fillStyle(PLT, 1); g.fillRect(4, 18, 14, 62);
        g.fillStyle(PDK, 1); g.fillRect(54, 18, 14, 62);
        g.fillStyle(PG, 1); g.fillRect(0, 0, 72, 22);
        g.fillStyle(PLT, 1); g.fillRect(0, 0, 72, 7); g.fillRect(0, 0, 16, 22);
        g.fillStyle(PDK, 1); g.fillRect(56, 0, 16, 22); g.fillRect(0, 16, 72, 6);
        g.generateTexture('pipe', 72, 80); g.clear();

        // FLAGPOLE
        g.fillStyle(0x888888, 1); g.fillRect(14, 0, 6, 300);
        g.fillStyle(WHITE, 1); g.fillRect(14, 0, 2, 300);
        g.fillStyle(0x666666, 1); g.fillRect(18, 0, 2, 300);
        g.fillStyle(GOLD, 1); g.fillCircle(17, 8, 9);
        g.fillStyle(GOLD_DK, 1); g.fillCircle(19, 10, 5);
        g.fillStyle(0xE52521, 1); g.fillTriangle(20, 15, 20, 55, 50, 35);
        g.fillStyle(0xFF6644, 1); g.fillTriangle(20, 15, 20, 35, 38, 25);
        g.generateTexture('flag', 50, 300); g.clear();

        // CLOUD
        g.fillStyle(0xEEEEFF, 1);
        g.fillCircle(20, 38, 18); g.fillCircle(48, 30, 26); g.fillCircle(76, 38, 18); g.fillRect(20, 38, 56, 18);
        g.fillStyle(WHITE, 1);
        g.fillCircle(20, 36, 18); g.fillCircle(48, 28, 26); g.fillCircle(76, 36, 18); g.fillRect(20, 36, 56, 16);
        g.generateTexture('cloud', 96, 56); g.clear();

        // HILL
        g.fillStyle(0x2D6E2B, 1); g.fillEllipse(72, 90, 144, 130);
        g.fillStyle(0x3A8C38, 1); g.fillEllipse(72, 80, 120, 100);
        g.fillStyle(0x5ABA58, 1); g.fillEllipse(72, 70, 80, 50);
        g.generateTexture('hill', 144, 90); g.clear();

        // LAVA (Level 3 decoration)
        g.fillStyle(0xff4400, 1); g.fillRect(0, 0, 64, 64);
        g.fillStyle(0xff8800, 1);
        g.fillEllipse(16, 32, 20, 16); g.fillEllipse(48, 24, 16, 12); g.fillEllipse(32, 48, 24, 14);
        g.fillStyle(0xffcc00, 1);
        g.fillEllipse(16, 28, 10, 8); g.fillEllipse(48, 20, 8, 6);
        g.generateTexture('lava', 64, 64); g.clear();

        g.destroy();
      }

      create() {
        const worldW = cfg.worldWidth;
        this.cameras.main.setBounds(0, 0, worldW, 600);
        this.physics.world.setBounds(0, 0, worldW, 600);
        this.cameras.main.setBackgroundColor(cfg.bgColor);

        // Sky gradient
        const sky = this.add.graphics();
        if (level === 1) {
          sky.fillGradientStyle(0x87CEEB, 0x87CEEB, 0x5C94FC, 0x5C94FC, 0.5);
          sky.fillRect(0, 0, worldW, 600);
          sky.setScrollFactor(0);
          for (const hx of [100, 420, 780, 1150, 1520, 1900, 2260]) {
            this.add.image(hx, 548, 'hill').setScrollFactor(0.15).setDepth(0);
          }
          for (const [cx, cy] of [[80, 80], [280, 120], [550, 70], [800, 100], [1050, 65], [1300, 90], [1600, 75], [1900, 110]]) {
            this.add.image(cx as number, cy as number, 'cloud').setScrollFactor(0.35).setDepth(1);
          }
        } else if (level === 2) {
          // Underground: dark with torch-like glow spots
          sky.fillGradientStyle(0x1a0a3e, 0x1a0a3e, 0x0a0520, 0x0a0520, 1);
          sky.fillRect(0, 0, worldW, 600);
          sky.setScrollFactor(0);
          // Distant cave rock silhouettes
          const rocks = this.add.graphics();
          rocks.fillStyle(0x0d0820, 1);
          for (let rx = 0; rx < worldW; rx += 180) {
            rocks.fillEllipse(rx + 60, 580, 160, 80);
          }
          rocks.setScrollFactor(0.2).setDepth(0);
          // Cave ceiling
          const ceil = this.add.graphics();
          ceil.fillStyle(0x0a0618, 1);
          ceil.fillRect(0, 0, worldW, 30);
          for (let sx = 20; sx < worldW; sx += 80) {
            ceil.fillTriangle(sx, 30, sx + 20, 0, sx + 40, 30);
          }
          ceil.setDepth(1);
        } else {
          // Castle: dark red inferno
          sky.fillGradientStyle(0x2a0505, 0x2a0505, 0x0a0202, 0x0a0202, 1);
          sky.fillRect(0, 0, worldW, 600);
          sky.setScrollFactor(0);
          // Lava pools in BG
          const lavaBg = this.add.graphics();
          lavaBg.fillStyle(0xff4400, 0.15);
          for (let lx = 100; lx < worldW; lx += 300) {
            lavaBg.fillEllipse(lx, 590, 200, 40);
          }
          lavaBg.setScrollFactor(0.3).setDepth(0);
          // Castle turret silhouettes
          const turrets = this.add.graphics();
          turrets.fillStyle(0x1a0303, 1);
          for (let tx = 0; tx < worldW; tx += 400) {
            turrets.fillRect(tx + 50, 80, 60, 200);
            turrets.fillRect(tx + 40, 70, 20, 20);
            turrets.fillRect(tx + 70, 70, 20, 20);
            turrets.fillRect(tx + 100, 70, 20, 20);
          }
          turrets.setScrollFactor(0.2).setDepth(0);
        }

        // Ground
        this.platforms = this.physics.add.staticGroup();
        const groundTex = level === 1 ? 'ground' : level === 2 ? 'ground_cave' : 'ground_castle';
        const totalGroundTiles = Math.ceil(worldW / 64);
        for (let i = 0; i < totalGroundTiles; i++) {
          if (!cfg.gaps.includes(i)) {
            this.platforms.create(i * 64 + 32, 568, groundTex).setDepth(2);
          }
        }

        // Floating platforms
        for (const [px, py] of cfg.platforms) {
          this.platforms.create(px, py, 'brick').setDepth(2);
        }

        // Pipes
        for (const [px, py] of cfg.pipes) {
          this.platforms.create(px, py, 'pipe').setDepth(2);
        }

        // Flag
        this.flag = this.physics.add.sprite(cfg.flagX, 386, 'flag').setDepth(3);
        this.flag.body!.allowGravity = false;
        (this.flag.body as Phaser.Physics.Arcade.Body).immovable = true;

        // Player
        this.player = this.physics.add.sprite(100, 450, 'mario').setDepth(5);
        this.player.setBounce(0.05);
        this.player.setCollideWorldBounds(true);
        this.player.setBodySize(44, 72, true);

        // Enemies
        this.enemies = this.physics.add.group();
        for (const ex of cfg.enemyPositions) {
          this.createEnemy(ex, 490);
        }

        // Coins
        this.coins = this.physics.add.group();
        for (const [cx, cy] of cfg.coins) {
          (this.coins.create(cx, cy, 'coin') as Phaser.Physics.Arcade.Sprite).setDepth(4);
        }

        // Mushrooms (power-ups)
        this.mushrooms = this.physics.add.group();
        for (const [mx, my] of cfg.mushrooms) {
          const mush = this.mushrooms.create(mx, my, 'mushroom') as Phaser.Physics.Arcade.Sprite;
          mush.setDepth(4);
          // Pulsing effect
          this.tweens.add({ targets: mush, scaleX: 1.15, scaleY: 1.15, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
        }

        // Physics
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin as any, undefined, this);
        this.physics.add.overlap(this.player, this.mushrooms, this.collectMushroom as any, undefined, this);
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy as any, undefined, this);
        this.physics.add.overlap(this.player, this.flag, this.reachFlag as any, undefined, this);

        // Camera
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        // Controls
        if (this.input.keyboard) {
          this.cursors = this.input.keyboard.createCursorKeys();
          this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
          };
          this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        }

        // HUD
        const hudStyle = { fontSize: '14px', color: '#fff', fontFamily: '"Press Start 2P", Courier', stroke: '#000', strokeThickness: 3 };
        this.scoreText = this.add.text(10, 12, `SCORE: ${this.score}`, hudStyle).setScrollFactor(0).setDepth(10);
        this.livesText = this.add.text(10, 34, `♥ ${this.lives}`, hudStyle).setScrollFactor(0).setDepth(10);
        this.coinCountText = this.add.text(10, 56, `🪙 0`, { ...hudStyle, fontSize: '12px' }).setScrollFactor(0).setDepth(10);
        this.timerText = this.add.text(680, 12, `⏱ ${this.timerVal}`, { ...hudStyle, fontSize: '16px' }).setScrollFactor(0).setDepth(10);
        this.powerText = this.add.text(340, 12, '', { ...hudStyle, color: '#FFD700', fontSize: '11px' }).setScrollFactor(0).setDepth(10);

        // Level name
        this.add.text(400, 12, cfg.levelName, { ...hudStyle, fontSize: '12px', color: '#FFD700' })
          .setOrigin(0.5, 0).setScrollFactor(0).setDepth(10);

        // Mobile controls events
        window.addEventListener('mobile-left-down', () => this.mobileLeft = true);
        window.addEventListener('mobile-left-up', () => this.mobileLeft = false);
        window.addEventListener('mobile-right-down', () => this.mobileRight = true);
        window.addEventListener('mobile-right-up', () => this.mobileRight = false);
        window.addEventListener('mobile-jump-down', () => this.mobileJump = true);
        window.addEventListener('mobile-jump-up', () => this.mobileJump = false);
      }

      createEnemy(x: number, y: number) {
        const enemy = this.enemies.create(x, y, 'goomba') as Phaser.Physics.Arcade.Sprite;
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
        enemy.setVelocityX(-cfg.enemySpeed);
        enemy.setBodySize(38, 44, true);
        enemy.setDepth(4);
      }

      update() {
        if (this.isEnded) return;

        this.frameCount++;

        // ESC pause toggle
        if (this.escKey && Phaser.Input.Keyboard.JustDown(this.escKey)) {
          this.togglePause();
        }
        if (this.isPaused) return;

        // Timer (every 60 frames ≈ 1 second)
        this.timerTick++;
        if (this.timerTick >= 60) {
          this.timerTick = 0;
          this.timerVal--;
          const color = this.timerVal <= 30 ? '#FF4444' : this.timerVal <= 60 ? '#FFD700' : '#FFFFFF';
          this.timerText.setText(`⏱ ${this.timerVal}`).setColor(color);
          if (this.timerVal <= 0) {
            this.loseLife();
            return;
          }
        }

        // Invincibility frames
        if (this.isInvincible) {
          this.invincibleTimer--;
          if (this.invincibleTimer <= 0) {
            this.isInvincible = false;
            this.player.clearTint();
          } else {
            this.player.setAlpha(this.invincibleTimer % 6 < 3 ? 0.5 : 1);
          }
        }

        // Enemy movement + animation
        for (const child of this.enemies.getChildren() as Phaser.Physics.Arcade.Sprite[]) {
          const body = child.body as Phaser.Physics.Arcade.Body;
          if (!body) continue;
          if (body.blocked.left) child.setVelocityX(cfg.enemySpeed);
          else if (body.blocked.right) child.setVelocityX(-cfg.enemySpeed);
          if (this.frameCount % 14 === 0) {
            child.setTexture(child.texture.key === 'goomba' ? 'goomba_walk' : 'goomba');
          }
        }

        // Fall off screen
        if (this.player.y > 650) {
          this.loseLife();
          return;
        }

        // Input
        let moveLeft = false, moveRight = false, jump = false;
        if (this.cursors && this.wasd) {
          moveLeft  = this.cursors.left.isDown  || this.wasd.left.isDown;
          moveRight = this.cursors.right.isDown || this.wasd.right.isDown;
          jump      = this.cursors.up.isDown    || this.wasd.up.isDown || this.wasd.space.isDown ||
                      Phaser.Input.Keyboard.JustDown(this.cursors.space as unknown as Phaser.Input.Keyboard.Key);
        }
        moveLeft  = moveLeft  || this.mobileLeft;
        moveRight = moveRight || this.mobileRight;
        jump      = jump      || this.mobileJump;

        const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
        const onGround = playerBody?.blocked.down;

        if (moveLeft) {
          this.player.setVelocityX(-220); this.player.flipX = true;
        } else if (moveRight) {
          this.player.setVelocityX(220); this.player.flipX = false;
        } else {
          this.player.setVelocityX(0);
        }

        if (jump && onGround) {
          this.player.setVelocityY(-460);
        }

        // Sprite animation
        if (!onGround) {
          this.player.setTexture('mario_jump');
        } else if (moveLeft || moveRight) {
          if (this.frameCount % 9 === 0) this.walkFrame = this.walkFrame === 0 ? 1 : 0;
          this.player.setTexture(this.walkFrame === 0 ? 'mario' : 'mario_walk');
        } else {
          this.player.setTexture('mario'); this.walkFrame = 0;
        }
      }

      togglePause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
          this.physics.pause();
          this.pauseOverlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.55).setScrollFactor(0).setDepth(18);
          this.pauseText = this.add.text(400, 300, '⏸ PAUSED\n\nPress ESC to resume', {
            fontSize: '24px', color: '#fff', fontFamily: '"Press Start 2P", Courier',
            stroke: '#000', strokeThickness: 4, align: 'center'
          }).setOrigin(0.5).setScrollFactor(0).setDepth(19);
        } else {
          this.physics.resume();
          this.pauseOverlay?.destroy();
          this.pauseText?.destroy();
        }
      }

      collectCoin(_player: Phaser.Physics.Arcade.Sprite, coin: Phaser.Physics.Arcade.Sprite) {
        coin.disableBody(true, true);
        this.score += 100;
        this.coinCount++;
        this.scoreText.setText(`SCORE: ${this.score}`).setTint(0xFFD700);
        this.coinCountText.setText(`🪙 ${this.coinCount}`);
        this.time.delayedCall(300, () => this.scoreText.clearTint());
        window.dispatchEvent(new CustomEvent('game-score-update', { detail: { score: this.score } }));
        // Float coin text
        const ct = this.add.text(coin.x, coin.y - 20, '+100', {
          fontSize: '14px', color: '#FFD700', fontFamily: '"Press Start 2P", Courier', stroke: '#000', strokeThickness: 2
        }).setDepth(15);
        this.tweens.add({ targets: ct, y: ct.y - 40, alpha: 0, duration: 700, onComplete: () => ct.destroy() });
      }

      collectMushroom(_player: Phaser.Physics.Arcade.Sprite, mushroom: Phaser.Physics.Arcade.Sprite) {
        mushroom.disableBody(true, true);
        this.isPowered = true;
        this.player.setScale(1.2);
        this.player.setBodySize(44, 80, true);
        this.player.setTint(0x88ff88);
        this.powerText.setText('★ POWERED');
        this.score += 500;
        this.scoreText.setText(`SCORE: ${this.score}`);
        window.dispatchEvent(new CustomEvent('game-score-update', { detail: { score: this.score } }));
        const pt = this.add.text(mushroom.x, mushroom.y - 20, '★ POWER UP!', {
          fontSize: '12px', color: '#FFD700', fontFamily: '"Press Start 2P", Courier', stroke: '#000', strokeThickness: 2
        }).setDepth(15);
        this.tweens.add({ targets: pt, y: pt.y - 50, alpha: 0, duration: 900, onComplete: () => pt.destroy() });
      }

      hitEnemy(player: Phaser.Physics.Arcade.Sprite, enemy: Phaser.Physics.Arcade.Sprite) {
        if (this.isEnded || this.isInvincible) return;
        const enemyBody = enemy.body as Phaser.Physics.Arcade.Body;
        const playerBody = player.body as Phaser.Physics.Arcade.Body;

        if (enemyBody.touching.up && playerBody.touching.down) {
          // Stomp!
          player.setVelocityY(-340);
          enemy.disableBody(true, true);
          this.score += 200;
          this.scoreText.setText(`SCORE: ${this.score}`).setTint(0xFFD700);
          this.time.delayedCall(300, () => this.scoreText.clearTint());
          window.dispatchEvent(new CustomEvent('game-score-update', { detail: { score: this.score } }));
          const st = this.add.text(enemy.x, enemy.y - 20, '+200', {
            fontSize: '14px', color: '#ff8800', fontFamily: '"Press Start 2P", Courier', stroke: '#000', strokeThickness: 2
          }).setDepth(15);
          this.tweens.add({ targets: st, y: st.y - 40, alpha: 0, duration: 700, onComplete: () => st.destroy() });
        } else {
          if (this.isPowered) {
            // Lose power, not life
            this.isPowered = false;
            this.player.setScale(1);
            this.player.setBodySize(44, 72, true);
            this.player.clearTint();
            this.powerText.setText('');
            this.isInvincible = true;
            this.invincibleTimer = 120;
            this.cameras.main.shake(200, 0.015);
          } else {
            this.loseLife();
          }
        }
      }

      loseLife() {
        if (this.isEnded) return;
        this.lives--;
        this.isPowered = false;
        this.player.setScale(1);
        this.player.clearTint();
        this.powerText.setText('');
        this.livesText.setText(`♥ ${Math.max(0, this.lives)}`);
        this.cameras.main.shake(300, 0.02);

        if (this.lives <= 0) {
          this.isEnded = true;
          this.physics.pause();
          this.player.setTint(0xff4444);
          this.time.delayedCall(400, () => {
            window.dispatchEvent(new CustomEvent('game-over', { detail: { score: this.score } }));
          });
        } else {
          // Reset position
          this.player.setX(100);
          this.player.setY(450);
          this.player.setVelocity(0, 0);
          this.player.setTexture('mario');
          this.isInvincible = true;
          this.invincibleTimer = 120;
        }
      }

      reachFlag(player: Phaser.Physics.Arcade.Sprite, _flag: Phaser.Physics.Arcade.Sprite) {
        if (this.isEnded) return;
        this.isEnded = true;
        this.physics.pause();
        // Victory flash
        this.tweens.add({ targets: player, tint: 0xFFD700, duration: 100, yoyo: true, repeat: 5 });
        this.time.delayedCall(800, () => {
          window.dispatchEvent(new CustomEvent('game-level-complete', {
            detail: { score: this.score, lives: this.lives, coins: this.coinCount, timeLeft: this.timerVal }
          }));
        });
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameRef.current!,
      width: 800,
      height: 600,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 800 }, debug: false } },
      scene: GameScene,
      backgroundColor: `#${cfg.bgColor.toString(16).padStart(6, '0')}`,
    };

    const game = new Phaser.Game(config);

    const handlers = [
      ['mobile-left-down', () => {}], ['mobile-left-up', () => {}],
      ['mobile-right-down', () => {}], ['mobile-right-up', () => {}],
      ['mobile-jump-down', () => {}], ['mobile-jump-up', () => {}],
    ];

    return () => {
      game.destroy(true);
      handlers.forEach(([evt]) => window.removeEventListener(evt as string, () => {}));
    };
  }, [level, initialScore, initialLives]);

  return (
    <div className="w-full max-w-[800px] flex flex-col">
      <div className="relative w-full aspect-[4/3] bg-black border-8 border-white shadow-[12px_12px_0px_rgba(0,0,0,0.5)] overflow-hidden">
        <div ref={gameRef} className="w-full h-full" />
      </div>
      <MobileControls />
    </div>
  );
}

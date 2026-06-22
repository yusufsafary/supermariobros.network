import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import MobileControls from './MobileControls';

export default function MarioGame() {
  const gameRef = useRef<HTMLDivElement>(null);
  const [gameInstance, setGameInstance] = useState<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    class GameScene extends Phaser.Scene {
      player!: Phaser.Physics.Arcade.Sprite;
      platforms!: Phaser.Physics.Arcade.StaticGroup;
      cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
      wasd!: any;
      score = 0;
      scoreText!: Phaser.GameObjects.Text;
      lives = 3;
      livesText!: Phaser.GameObjects.Text;
      coins!: Phaser.Physics.Arcade.Group;
      enemies!: Phaser.Physics.Arcade.Group;
      flag!: Phaser.Physics.Arcade.Sprite;
      gameOver = false;
      won = false;
      frameCount = 0;
      walkFrame = 0;

      mobileLeft = false;
      mobileRight = false;
      mobileJump = false;

      constructor() {
        super({ key: 'GameScene' });
      }

      preload() {
        const g = this.add.graphics();

        // ===== COLOR PALETTE =====
        const RED       = 0xE52521;
        const RED_DARK  = 0xA81A17;
        const BLUE      = 0x049CD8;
        const BLUE_DARK = 0x026FA0;
        const SKIN      = 0xFECB8A;
        const SKIN_SHD  = 0xE8956A;
        const BROWN     = 0x7B4A1C;
        const BROWN_DK  = 0x3D1805;
        const WHITE     = 0xFFFFFF;
        const BLACK     = 0x000000;
        const GOLD      = 0xFFD700;
        const GOLD_DK   = 0xC89000;
        const IRIS      = 0x1A5FAD;
        const GREY      = 0xCCCCCC;

        // ===== MARIO FRAME HELPER =====
        // W=64, H=84, origin center
        const drawMario = (legL: number, legR: number, armsUp: boolean) => {

          // HAT
          g.fillStyle(RED, 1);
          g.fillRect(10, 0, 44, 15);      // crown
          g.fillRect(4, 15, 56, 6);       // brim
          g.fillStyle(RED_DARK, 1);
          g.fillRect(10, 12, 44, 3);      // crown bottom shadow

          // HAIR under brim
          g.fillStyle(BROWN, 1);
          g.fillRect(4, 21, 10, 6);       // left
          g.fillRect(50, 21, 10, 6);      // right

          // HEAD
          g.fillStyle(SKIN, 1);
          g.fillRect(10, 21, 44, 22);     // main face
          g.fillCircle(14, 25, 4);
          g.fillCircle(50, 25, 4);
          g.fillCircle(14, 39, 4);
          g.fillCircle(50, 39, 4);
          // ears
          g.fillEllipse(7, 31, 8, 12);
          g.fillEllipse(57, 31, 8, 12);

          // EYEBROWS
          g.fillStyle(BROWN, 1);
          g.fillRect(15, 23, 12, 4);
          g.fillRect(37, 23, 12, 4);

          // EYES
          g.fillStyle(WHITE, 1);
          g.fillRect(16, 27, 11, 9);      // left white
          g.fillRect(37, 27, 11, 9);      // right white
          g.fillStyle(IRIS, 1);
          g.fillRect(18, 29, 7, 6);       // left iris
          g.fillRect(39, 29, 7, 6);
          g.fillStyle(BLACK, 1);
          g.fillRect(19, 30, 5, 4);       // left pupil
          g.fillRect(40, 30, 5, 4);
          g.fillStyle(WHITE, 1);
          g.fillRect(19, 30, 2, 2);       // left shine
          g.fillRect(40, 30, 2, 2);

          // NOSE
          g.fillStyle(SKIN_SHD, 1);
          g.fillEllipse(32, 37, 13, 9);

          // MUSTACHE
          g.fillStyle(BROWN, 1);
          g.fillEllipse(22, 43, 22, 11);  // left wing
          g.fillEllipse(42, 43, 22, 11);  // right wing
          g.fillStyle(SKIN, 1);
          g.fillRect(29, 41, 6, 7);       // gap

          // SHIRT (red showing at sides)
          g.fillStyle(RED, 1);
          g.fillRect(0, 46, 64, 18);

          // ARMS
          if (armsUp) {
            // raised jump arms
            g.fillStyle(RED, 1);
            g.fillRect(0, 30, 12, 20);    // left arm raised
            g.fillRect(52, 30, 12, 20);   // right arm raised
            g.fillStyle(WHITE, 1);
            g.fillCircle(6, 28, 8);       // left glove up
            g.fillCircle(58, 28, 8);
            g.fillStyle(GREY, 1);
            g.fillRect(0, 27, 11, 2);
            g.fillRect(53, 27, 11, 2);
          } else {
            // normal side arms
            g.fillStyle(RED, 1);
            g.fillRect(0, 46, 12, 16);
            g.fillRect(52, 46, 12, 16);
            g.fillStyle(WHITE, 1);
            g.fillCircle(6, 63, 8);       // left glove
            g.fillCircle(58, 63, 8);
            g.fillStyle(GREY, 1);
            g.fillRect(0, 61, 11, 2);
            g.fillRect(53, 61, 11, 2);
            g.fillRect(1, 65, 9, 1);
            g.fillRect(54, 65, 9, 1);
          }

          // OVERALLS BIB
          g.fillStyle(BLUE, 1);
          g.fillRect(18, 46, 28, 18);
          // suspenders
          g.fillRect(17, 43, 8, 8);
          g.fillRect(39, 43, 8, 8);
          // bib shadow
          g.fillStyle(BLUE_DARK, 1);
          g.fillRect(18, 60, 28, 4);

          // BUTTONS
          g.fillStyle(GOLD, 1);
          g.fillCircle(24, 54, 4);
          g.fillCircle(40, 54, 4);
          g.fillStyle(GOLD_DK, 1);
          g.fillCircle(25, 55, 2);
          g.fillCircle(41, 55, 2);

          // LEGS (with individual offsets for walk animation)
          g.fillStyle(BLUE, 1);
          g.fillRect(14, 64 + legL, 14, 10);   // left leg
          g.fillRect(36, 64 + legR, 14, 10);   // right leg
          g.fillStyle(BLUE_DARK, 1);
          g.fillRect(25, 64 + legL, 3, 10);    // left leg inner
          g.fillRect(36, 64 + legR, 3, 10);    // right leg inner

          // BOOTS
          g.fillStyle(BROWN_DK, 1);
          g.fillRect(9, 74 + legL, 21, 10);    // left boot
          g.fillRect(34, 74 + legR, 21, 10);   // right boot
          g.fillStyle(BROWN, 1);
          g.fillRect(9, 74 + legL, 21, 3);     // left boot highlight
          g.fillRect(34, 74 + legR, 21, 3);    // right boot highlight
          // boot toe wider
          g.fillStyle(BROWN_DK, 1);
          g.fillRect(6, 78 + legL, 23, 6);     // left toe
          g.fillRect(35, 78 + legR, 23, 6);    // right toe
        };

        // Frame: standing
        drawMario(0, 0, false);
        g.generateTexture('mario', 64, 84);
        g.clear();

        // Frame: walking
        drawMario(5, -5, false);
        g.generateTexture('mario_walk', 64, 84);
        g.clear();

        // Frame: jumping
        drawMario(-8, -8, true);
        g.generateTexture('mario_jump', 64, 84);
        g.clear();

        // ===== GOOMBA (48x52) =====
        const GB  = 0x8B4513;
        const GDK = 0x5C2E0B;
        const GLT = 0xC17240;
        const GS  = 0xF0C88A;

        const drawGoomba = (footL: number, footR: number) => {
          // Feet
          g.fillStyle(GDK, 1);
          g.fillEllipse(14, 48 + footL, 22, 10);
          g.fillEllipse(34, 48 + footR, 22, 10);
          g.fillStyle(GLT, 1);
          g.fillEllipse(14, 46 + footL, 18, 5);
          g.fillEllipse(34, 46 + footR, 18, 5);

          // Main body
          g.fillStyle(GB, 1);
          g.fillEllipse(24, 26, 44, 40);

          // Dark top (cap)
          g.fillStyle(GDK, 1);
          g.fillEllipse(24, 16, 44, 26);

          // Brown bumps on cap
          g.fillStyle(0x7A3D10, 1);
          g.fillCircle(13, 12, 5);
          g.fillCircle(35, 12, 5);

          // Face (skin area)
          g.fillStyle(GS, 1);
          g.fillEllipse(24, 35, 32, 20);

          // Angry eyebrows (angled inward)
          g.fillStyle(GDK, 1);
          g.fillRect(8, 20, 14, 5);
          g.fillRect(26, 20, 14, 5);
          g.fillRect(8, 18, 5, 3);    // outer raised
          g.fillRect(35, 18, 5, 3);

          // Eyes (big, round)
          g.fillStyle(WHITE, 1);
          g.fillCircle(17, 28, 9);
          g.fillCircle(31, 28, 9);
          g.fillStyle(BLACK, 1);
          g.fillCircle(19, 30, 5);    // pupils angled inward
          g.fillCircle(29, 30, 5);
          g.fillStyle(WHITE, 1);
          g.fillCircle(17, 28, 3);    // shine
          g.fillCircle(29, 28, 3);
          g.fillStyle(BLACK, 1);
          g.fillCircle(17, 30, 4);
          g.fillCircle(29, 30, 4);
          g.fillStyle(WHITE, 1);
          g.fillRect(16, 28, 3, 2);   // shine dot

          // Fangs / teeth
          g.fillStyle(WHITE, 1);
          g.fillRect(17, 39, 5, 8);
          g.fillRect(26, 39, 5, 8);
          g.fillTriangle(17, 47, 22, 47, 19, 52);
          g.fillTriangle(26, 47, 31, 47, 29, 52);

          // Mouth line
          g.fillStyle(GDK, 1);
          g.fillRect(14, 39, 20, 2);
        };

        drawGoomba(0, 0);
        g.generateTexture('goomba', 48, 52);
        g.clear();

        drawGoomba(4, -4);
        g.generateTexture('goomba_walk', 48, 52);
        g.clear();

        // ===== BRICK (64x64) =====
        g.fillStyle(0xC84B0C, 1);
        g.fillRect(0, 0, 64, 64);
        // mortar lines
        g.fillStyle(0xD09060, 1);
        g.fillRect(0, 0, 64, 3);
        g.fillRect(0, 31, 64, 4);
        g.fillRect(0, 61, 64, 3);
        g.fillRect(0, 3, 3, 28);
        g.fillRect(31, 3, 4, 28);
        g.fillRect(61, 3, 3, 28);
        g.fillRect(0, 35, 3, 26);  // offset row
        g.fillRect(17, 35, 4, 26);
        g.fillRect(47, 35, 4, 26);
        g.fillRect(61, 35, 3, 26);
        // highlights
        g.fillStyle(0xD4601A, 1);
        g.fillRect(3, 3, 27, 3);
        g.fillRect(3, 3, 3, 27);
        g.fillRect(35, 3, 25, 3);
        g.fillRect(35, 3, 3, 27);
        g.fillRect(3, 35, 13, 3);
        g.fillRect(3, 35, 3, 25);
        g.fillRect(21, 35, 25, 3);
        g.fillRect(21, 35, 3, 25);
        g.fillRect(51, 35, 9, 3);
        g.fillRect(51, 35, 3, 25);
        // shadows
        g.fillStyle(0x8B2E08, 1);
        g.fillRect(3, 28, 27, 3);
        g.fillRect(28, 3, 3, 28);
        g.fillRect(35, 28, 25, 3);
        g.fillRect(58, 3, 3, 28);
        g.fillRect(3, 58, 13, 3);
        g.fillRect(14, 35, 3, 26);
        g.fillRect(21, 58, 25, 3);
        g.fillRect(44, 35, 3, 26);
        g.fillRect(51, 58, 9, 3);
        g.fillRect(58, 35, 3, 26);
        g.generateTexture('brick', 64, 64);
        g.clear();

        // ===== GROUND TOP (64x64) - grass top, brick below =====
        g.fillStyle(0xC84B0C, 1);
        g.fillRect(0, 0, 64, 64);
        g.fillStyle(0xD09060, 1);
        g.fillRect(0, 8, 64, 4);
        g.fillRect(0, 38, 64, 4);
        g.fillRect(0, 62, 64, 2);
        g.fillRect(0, 8, 3, 30);
        g.fillRect(31, 8, 4, 30);
        g.fillRect(61, 8, 3, 30);
        g.fillRect(0, 42, 3, 20);
        g.fillRect(19, 42, 4, 20);
        g.fillRect(47, 42, 4, 20);
        g.fillRect(61, 42, 3, 20);
        // Grass
        g.fillStyle(0x3A8C38, 1);
        g.fillRect(0, 0, 64, 9);
        g.fillStyle(0x5ABA58, 1);
        g.fillRect(0, 0, 64, 4);
        g.fillStyle(0x2D6E2B, 1);
        g.fillRect(0, 5, 64, 4);
        // Grass tufts
        g.fillStyle(0x5ABA58, 1);
        g.fillTriangle(8, 0, 4, 5, 12, 5);
        g.fillTriangle(24, 0, 20, 5, 28, 5);
        g.fillTriangle(40, 0, 36, 5, 44, 5);
        g.fillTriangle(56, 0, 52, 5, 60, 5);
        g.generateTexture('ground', 64, 64);
        g.clear();

        // ===== COIN (32x32) =====
        g.fillStyle(GOLD_DK, 1);
        g.fillCircle(16, 16, 16);
        g.fillStyle(GOLD, 1);
        g.fillCircle(16, 16, 13);
        g.fillStyle(0xFFF5AA, 1);
        g.fillCircle(16, 16, 9);
        g.fillStyle(GOLD_DK, 1);
        g.fillRect(13, 7, 6, 18);   // vertical bar (coin symbol)
        g.fillRect(11, 9, 10, 5);   // top
        g.fillRect(11, 18, 10, 5);  // bottom
        // shine
        g.fillStyle(0xFFFBCC, 1);
        g.fillEllipse(9, 9, 8, 10);
        g.generateTexture('coin', 32, 32);
        g.clear();

        // ===== PIPE (72x80) =====
        const PG  = 0x3A8C38;
        const PLT = 0x5EBF5C;
        const PDK = 0x1F5C1E;
        g.fillStyle(PG, 1);
        g.fillRect(4, 18, 64, 62);
        g.fillStyle(PLT, 1);
        g.fillRect(4, 18, 14, 62);   // left highlight
        g.fillStyle(PDK, 1);
        g.fillRect(54, 18, 14, 62);  // right shadow
        // rim/cap
        g.fillStyle(PG, 1);
        g.fillRect(0, 0, 72, 22);
        g.fillStyle(PLT, 1);
        g.fillRect(0, 0, 72, 7);     // cap top highlight
        g.fillRect(0, 0, 16, 22);    // cap left highlight
        g.fillStyle(PDK, 1);
        g.fillRect(56, 0, 16, 22);   // cap right shadow
        g.fillRect(0, 16, 72, 6);    // cap bottom shadow
        g.generateTexture('pipe', 72, 80);
        g.clear();

        // ===== FLAGPOLE (50x300) =====
        g.fillStyle(0x888888, 1);
        g.fillRect(14, 0, 6, 300);
        g.fillStyle(WHITE, 1);
        g.fillRect(14, 0, 2, 300);   // shine on pole
        g.fillStyle(0x666666, 1);
        g.fillRect(18, 0, 2, 300);   // shadow
        // top ball
        g.fillStyle(GOLD, 1);
        g.fillCircle(17, 8, 9);
        g.fillStyle(GOLD_DK, 1);
        g.fillCircle(19, 10, 5);
        // flag cloth
        g.fillStyle(0xE52521, 1);
        g.fillTriangle(20, 15, 20, 55, 50, 35);
        g.fillStyle(0xFF6644, 1);
        g.fillTriangle(20, 15, 20, 35, 38, 25);
        g.generateTexture('flag', 50, 300);
        g.clear();

        // ===== CLOUD (96x56) =====
        g.fillStyle(0xEEEEFF, 1);
        g.fillCircle(20, 38, 18);
        g.fillCircle(48, 30, 26);
        g.fillCircle(76, 38, 18);
        g.fillRect(20, 38, 56, 18);
        g.fillStyle(WHITE, 1);
        g.fillCircle(20, 36, 18);
        g.fillCircle(48, 28, 26);
        g.fillCircle(76, 36, 18);
        g.fillRect(20, 36, 56, 16);
        g.generateTexture('cloud', 96, 56);
        g.clear();

        // ===== HILL (144x90) =====
        g.fillStyle(0x2D6E2B, 1);
        g.fillEllipse(72, 90, 144, 130);
        g.fillStyle(0x3A8C38, 1);
        g.fillEllipse(72, 80, 120, 100);
        g.fillStyle(0x5ABA58, 1);
        g.fillEllipse(72, 70, 80, 50);
        g.generateTexture('hill', 144, 90);
        g.clear();

        g.destroy();
      }

      create() {
        this.cameras.main.setBounds(0, 0, 2400, 600);
        this.physics.world.setBounds(0, 0, 2400, 600);
        this.cameras.main.setBackgroundColor('#5C94FC');

        // Sky gradient overlay (lighter at top)
        const skyRect = this.add.graphics();
        skyRect.fillGradientStyle(0x87CEEB, 0x87CEEB, 0x5C94FC, 0x5C94FC, 0.6);
        skyRect.fillRect(0, 0, 2400, 600);
        skyRect.setScrollFactor(0);

        // Background hills (slow parallax)
        for (const hx of [100, 420, 780, 1150, 1520, 1900, 2260]) {
          this.add.image(hx, 548, 'hill').setScrollFactor(0.15).setDepth(0);
        }

        // Background clouds (medium parallax)
        for (const [cx, cy] of [
          [80, 80], [280, 120], [550, 70], [800, 100],
          [1050, 65], [1300, 90], [1600, 75], [1900, 110], [2200, 85]
        ]) {
          this.add.image(cx as number, cy as number, 'cloud').setScrollFactor(0.35).setDepth(1);
        }

        // Ground platforms
        this.platforms = this.physics.add.staticGroup();
        for (let i = 0; i < 40; i++) {
          if (i !== 10 && i !== 11 && i !== 25) {
            const tex = (i < 2) ? 'ground' : (i % 3 === 0 ? 'ground' : 'brick');
            this.platforms.create(i * 64 + 32, 568, tex).setDepth(2);
          }
        }

        // Floating platforms
        this.platforms.create(400, 400, 'brick').setDepth(2);
        this.platforms.create(464, 400, 'brick').setDepth(2);
        this.platforms.create(528, 400, 'brick').setDepth(2);
        this.platforms.create(800, 300, 'brick').setDepth(2);
        this.platforms.create(1100, 200, 'brick').setDepth(2);
        this.platforms.create(1164, 200, 'brick').setDepth(2);

        // Pipes
        this.platforms.create(700, 496, 'pipe').setDepth(2);
        this.platforms.create(1400, 496, 'pipe').setDepth(2);

        // Flag
        this.flag = this.physics.add.sprite(2200, 386, 'flag').setDepth(3);
        this.flag.body!.allowGravity = false;
        (this.flag.body as Phaser.Physics.Arcade.Body).immovable = true;

        // Player
        this.player = this.physics.add.sprite(100, 450, 'mario').setDepth(5);
        this.player.setBounce(0.05);
        this.player.setCollideWorldBounds(true);
        this.player.setBodySize(44, 72, true);

        // Enemies
        this.enemies = this.physics.add.group();
        this.createEnemy(600, 450);
        this.createEnemy(1000, 450);
        this.createEnemy(1500, 450);
        this.createEnemy(1800, 450);

        // Coins
        this.coins = this.physics.add.group();
        const coinPositions = [
          [400, 300], [464, 300], [528, 300],
          [800, 200], [1132, 100]
        ];
        coinPositions.forEach(([cx, cy]) => {
          (this.coins.create(cx, cy, 'coin') as Phaser.Physics.Arcade.Sprite).setDepth(4);
        });

        // Physics
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin as any, undefined, this);
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
        }

        // UI
        this.scoreText = this.add.text(16, 16, 'SCORE: 0', {
          fontSize: '20px', color: '#fff', fontFamily: '"Press Start 2P", Courier',
          stroke: '#000', strokeThickness: 4
        }).setScrollFactor(0).setDepth(10);
        this.livesText = this.add.text(16, 50, 'LIVES: 3', {
          fontSize: '20px', color: '#fff', fontFamily: '"Press Start 2P", Courier',
          stroke: '#000', strokeThickness: 4
        }).setScrollFactor(0).setDepth(10);

        // Mobile events
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
        enemy.setVelocityX(-80);
        enemy.setBodySize(38, 44, true);
        enemy.setDepth(4);
      }

      update() {
        if (this.gameOver || this.won) return;

        this.frameCount++;

        // Enemy movement + animation
        const enemyChildren = this.enemies.getChildren() as Phaser.Physics.Arcade.Sprite[];
        for (const child of enemyChildren) {
          const body = child.body as Phaser.Physics.Arcade.Body;
          if (!body) continue;
          if (body.blocked.left) child.setVelocityX(80);
          else if (body.blocked.right) child.setVelocityX(-80);
          // Walk animation every 14 frames
          if (this.frameCount % 14 === 0) {
            child.setTexture(child.texture.key === 'goomba' ? 'goomba_walk' : 'goomba');
          }
        }

        // Fall check
        if (this.player.y > 620) {
          this.loseLife();
        }

        // Input
        let moveLeft = false, moveRight = false, jump = false;
        if (this.cursors && this.wasd) {
          moveLeft  = this.cursors.left.isDown  || this.wasd.left.isDown;
          moveRight = this.cursors.right.isDown || this.wasd.right.isDown;
          jump      = this.cursors.up.isDown    || this.wasd.up.isDown || this.wasd.space.isDown;
        }
        moveLeft  = moveLeft  || this.mobileLeft;
        moveRight = moveRight || this.mobileRight;
        jump      = jump      || this.mobileJump;

        const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
        const onGround = playerBody && playerBody.blocked.down;

        // Move
        if (moveLeft) {
          this.player.setVelocityX(-220);
          this.player.flipX = true;
        } else if (moveRight) {
          this.player.setVelocityX(220);
          this.player.flipX = false;
        } else {
          this.player.setVelocityX(0);
        }

        if (jump && onGround) {
          this.player.setVelocityY(-460);
        }

        // Player sprite animation
        if (!onGround) {
          this.player.setTexture('mario_jump');
        } else if (moveLeft || moveRight) {
          if (this.frameCount % 9 === 0) {
            this.walkFrame = this.walkFrame === 0 ? 1 : 0;
          }
          this.player.setTexture(this.walkFrame === 0 ? 'mario' : 'mario_walk');
        } else {
          this.player.setTexture('mario');
          this.walkFrame = 0;
        }
      }

      collectCoin(player: Phaser.Physics.Arcade.Sprite, coin: Phaser.Physics.Arcade.Sprite) {
        coin.disableBody(true, true);
        this.score += 100;
        this.scoreText.setText('SCORE: ' + this.score);
        this.scoreText.setTint(0xFFD700);
        this.time.delayedCall(300, () => this.scoreText.clearTint());
      }

      hitEnemy(player: Phaser.Physics.Arcade.Sprite, enemy: Phaser.Physics.Arcade.Sprite) {
        if (enemy.body!.touching.up && player.body!.touching.down) {
          player.setVelocityY(-320);
          enemy.disableBody(true, true);
          this.score += 200;
          this.scoreText.setText('SCORE: ' + this.score);
          this.scoreText.setTint(0xFFD700);
          this.time.delayedCall(300, () => this.scoreText.clearTint());
        } else {
          this.loseLife();
        }
      }

      loseLife() {
        this.lives -= 1;
        this.livesText.setText('LIVES: ' + this.lives);
        if (this.lives > 0) {
          this.player.setX(100);
          this.player.setY(450);
          this.player.setVelocity(0, 0);
          this.player.setTexture('mario');
          this.player.clearTint();
        } else {
          this.physics.pause();
          this.player.setTint(0xff4444);
          this.gameOver = true;
          const text = this.add.text(400, 300, 'GAME OVER\nClick to Restart', {
            fontSize: '36px', color: '#ff2222', align: 'center',
            backgroundColor: '#000000', padding: { x: 24, y: 20 },
            stroke: '#fff', strokeThickness: 2
          }).setOrigin(0.5).setScrollFactor(0).setDepth(20).setInteractive();
          text.on('pointerdown', () => this.scene.restart());
        }
      }

      reachFlag(player: Phaser.Physics.Arcade.Sprite, flag: Phaser.Physics.Arcade.Sprite) {
        this.physics.pause();
        this.won = true;
        const text = this.add.text(400, 300, 'YOU WIN!\nClick to Play Again', {
          fontSize: '36px', color: '#FFD700', align: 'center',
          backgroundColor: '#000000', padding: { x: 24, y: 20 },
          stroke: '#fff', strokeThickness: 2
        }).setOrigin(0.5).setScrollFactor(0).setDepth(20).setInteractive();
        text.on('pointerdown', () => {
          this.score = 0;
          this.lives = 3;
          this.gameOver = false;
          this.won = false;
          this.scene.restart();
        });
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: 800,
      height: 600,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      physics: {
        default: 'arcade',
        arcade: { gravity: { x: 0, y: 800 }, debug: false }
      },
      scene: GameScene,
      backgroundColor: '#5C94FC',
    };

    const game = new Phaser.Game(config);
    setGameInstance(game);

    return () => {
      game.destroy(true);
      window.removeEventListener('mobile-left-down', () => {});
      window.removeEventListener('mobile-left-up', () => {});
      window.removeEventListener('mobile-right-down', () => {});
      window.removeEventListener('mobile-right-up', () => {});
      window.removeEventListener('mobile-jump-down', () => {});
      window.removeEventListener('mobile-jump-up', () => {});
    };
  }, []);

  return (
    <div className="relative w-full max-w-[800px] aspect-[4/3] bg-black border-8 border-white shadow-[12px_12px_0px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden flex justify-center">
      <div id="game-container" ref={gameRef} className="w-full h-full" />
      <MobileControls />
    </div>
  );
}

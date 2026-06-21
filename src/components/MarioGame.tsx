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

      // Mobile controls state
      mobileLeft = false;
      mobileRight = false;
      mobileJump = false;

      constructor() {
        super({ key: 'GameScene' });
      }

      preload() {
        // Create textures programmatically
        const graphics = this.add.graphics();
        
        // Player (Mario - Red rectangle with hat)
        graphics.fillStyle(0xE52521, 1);
        graphics.fillRect(0, 8, 32, 32); // Body
        graphics.fillRect(-4, 0, 24, 8); // Hat
        graphics.generateTexture('mario', 36, 40);
        graphics.clear();

        // Platform (Brick - Brown)
        graphics.fillStyle(0xC84B0C, 1);
        graphics.fillRect(0, 0, 64, 64);
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeRect(0, 0, 64, 64);
        graphics.generateTexture('brick', 64, 64);
        graphics.clear();

        // Pipe (Green)
        graphics.fillStyle(0x3A8C38, 1);
        graphics.fillRect(0, 16, 64, 64); // Base
        graphics.fillRect(-4, 0, 72, 16); // Top
        graphics.generateTexture('pipe', 72, 80);
        graphics.clear();

        // Coin (Yellow circle)
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillCircle(16, 16, 16);
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeCircle(16, 16, 16);
        graphics.generateTexture('coin', 32, 32);
        graphics.clear();

        // Goomba (Enemy - Brown rectangle)
        graphics.fillStyle(0x8B4513, 1);
        graphics.fillRect(0, 0, 32, 32);
        graphics.fillStyle(0xFFCC99, 1);
        graphics.fillRect(8, 24, 16, 8); // Feet
        graphics.generateTexture('goomba', 32, 32);
        graphics.clear();

        // Flagpole
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(14, 0, 4, 300); // Pole
        graphics.fillStyle(0x3A8C38, 1);
        graphics.fillTriangle(18, 10, 18, 40, 50, 25); // Flag
        graphics.generateTexture('flag', 50, 300);
        graphics.clear();
      }

      create() {
        this.cameras.main.setBounds(0, 0, 2400, 600);
        this.physics.world.setBounds(0, 0, 2400, 600);

        // Background
        this.cameras.main.setBackgroundColor('#5C94FC');

        // Platforms
        this.platforms = this.physics.add.staticGroup();
        
        // Ground
        for (let i = 0; i < 40; i++) {
          if (i !== 10 && i !== 11 && i !== 25) { // Gaps
            this.platforms.create(i * 64 + 32, 568, 'brick');
          }
        }

        // Floating platforms
        this.platforms.create(400, 400, 'brick');
        this.platforms.create(464, 400, 'brick');
        this.platforms.create(528, 400, 'brick');
        
        this.platforms.create(800, 300, 'brick');
        this.platforms.create(1100, 200, 'brick');
        this.platforms.create(1164, 200, 'brick');

        // Pipes
        this.platforms.create(700, 496, 'pipe');
        this.platforms.create(1400, 496, 'pipe');

        // Flag
        this.flag = this.physics.add.sprite(2200, 386, 'flag');
        this.flag.body!.allowGravity = false;
        (this.flag.body as Phaser.Physics.Arcade.Body).immovable = true;

        // Player
        this.player = this.physics.add.sprite(100, 450, 'mario');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        // Enemies
        this.enemies = this.physics.add.group();
        this.createEnemy(600, 450);
        this.createEnemy(1000, 450);
        this.createEnemy(1500, 450);
        this.createEnemy(1800, 450);

        // Coins
        this.coins = this.physics.add.group();
        this.coins.create(400, 300, 'coin');
        this.coins.create(464, 300, 'coin');
        this.coins.create(528, 300, 'coin');
        this.coins.create(800, 200, 'coin');
        this.coins.create(1132, 100, 'coin');

        // Physics Colliders
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
        this.scoreText = this.add.text(16, 16, 'SCORE: 0', { fontSize: '24px', color: '#fff', fontFamily: 'Courier' }).setScrollFactor(0);
        this.livesText = this.add.text(16, 48, 'LIVES: 3', { fontSize: '24px', color: '#fff', fontFamily: 'Courier' }).setScrollFactor(0);

        // Mobile Control Listeners
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
        enemy.setVelocityX(-100);
      }

      update() {
        if (this.gameOver || this.won) return;

        // Enemy movement — use getChildren() (Phaser 4 API)
        const enemyChildren = this.enemies.getChildren() as Phaser.Physics.Arcade.Sprite[];
        for (const child of enemyChildren) {
          const body = child.body as Phaser.Physics.Arcade.Body;
          if (!body) continue;
          if (body.blocked.left) {
            child.setVelocityX(100);
          } else if (body.blocked.right) {
            child.setVelocityX(-100);
          }
        }

        // Check falling into pit
        if (this.player.y > 600) {
          this.loseLife();
        }

        // Player movement
        let moveLeft = false;
        let moveRight = false;
        let jump = false;

        if (this.cursors && this.wasd) {
          moveLeft = this.cursors.left.isDown || this.wasd.left.isDown;
          moveRight = this.cursors.right.isDown || this.wasd.right.isDown;
          jump = this.cursors.up.isDown || this.wasd.up.isDown || this.wasd.space.isDown;
        }

        moveLeft = moveLeft || this.mobileLeft;
        moveRight = moveRight || this.mobileRight;
        jump = jump || this.mobileJump;

        if (moveLeft) {
          this.player.setVelocityX(-200);
          this.player.flipX = true;
        } else if (moveRight) {
          this.player.setVelocityX(200);
          this.player.flipX = false;
        } else {
          this.player.setVelocityX(0);
        }

        const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
        if (jump && playerBody && playerBody.blocked.down) {
          this.player.setVelocityY(-450);
        }
      }

      collectCoin(player: Phaser.Physics.Arcade.Sprite, coin: Phaser.Physics.Arcade.Sprite) {
        coin.disableBody(true, true);
        this.score += 100;
        this.scoreText.setText('SCORE: ' + this.score);
      }

      hitEnemy(player: Phaser.Physics.Arcade.Sprite, enemy: Phaser.Physics.Arcade.Sprite) {
        if (enemy.body!.touching.up && player.body!.touching.down) {
          // Jumped on top
          player.setVelocityY(-300);
          enemy.disableBody(true, true);
          this.score += 200;
          this.scoreText.setText('SCORE: ' + this.score);
        } else {
          // Hit from side
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
        } else {
          this.physics.pause();
          this.player.setTint(0xff0000);
          this.gameOver = true;
          const text = this.add.text(400, 300, 'GAME OVER\nClick to Restart', { fontSize: '48px', color: '#ff0000', align: 'center', backgroundColor: '#000', padding: { x: 20, y: 20 } }).setOrigin(0.5).setScrollFactor(0).setInteractive();
          text.on('pointerdown', () => this.scene.restart());
        }
      }

      reachFlag(player: Phaser.Physics.Arcade.Sprite, flag: Phaser.Physics.Arcade.Sprite) {
        this.physics.pause();
        this.won = true;
        const text = this.add.text(400, 300, 'YOU WIN!\nClick to Play Again', { fontSize: '48px', color: '#FFD700', align: 'center', backgroundColor: '#000', padding: { x: 20, y: 20 } }).setOrigin(0.5).setScrollFactor(0).setInteractive();
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
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 800 },
          debug: false
        }
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

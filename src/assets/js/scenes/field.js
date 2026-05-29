import Phaser from "../phaser/phaser.js"

import { Bullet } from "../actors/bullet.js"
import { Enemy } from "../actors/enemy.js"

export class Field extends Phaser.Scene {

  constructor() {
    super("Field");
  }

  #enemies = []
  #delay = 0
  #score
  #hp

  #scoreLabel
  #healthLabel

  preload() {
    this.load.audio('pew', 'assets/sfx/pew.mp3');
    this.load.audio('boom', 'assets/sfx/boom.mp3');
    this.load.spritesheet('emoji', 'assets/imgs/spritesheet.png', { frameWidth: 50, frameHeight: 50 });
  }

  create() {
    this.matter.world.setBounds();

    this.#hp = 100;
    this.#score = 0;

    this.#scoreLabel = this.add.text(10, 10, "Score: 0");
    this.#healthLabel = this.add.text(10, 30, "Health: " + this.#hp);

    // the red line
    this.add.graphics()
      .lineStyle(2, 0xFF0000)
      .moveTo(0, 590)
      .lineTo(480, 590)
      .stroke();

    // player sprite
    this.player = this.add.sprite(240, 590, 'emoji', 16); // cauboi

    this.input.on('pointerdown', (ev) => {
      const originX = 240;
      const originY = 640;
      const angle = Phaser.Math.Angle.Between(originX, originY, ev.x, ev.y);
      const speed = 0.007;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      new Bullet({ scene: this, x: originX, y: originY, vx, vy });
      this.sound.play('pew');
    });
  }

  update(time, delta) {
    if (this.#hp <= 0) {
      this.game.scene.stop('Field');
      this.game.scene.start("GameOver");
    }

    this.#enemies = this.#enemies.filter(e => !e.dead);
    if (this.#delay < time) {
      const x = Phaser.Math.Between(0, 480);
      this.#enemies.push(new Enemy(this, x, 0));
      this.#enemies.forEach(e => e.forward());
      this.#delay = time + 1500;
    }
    this.#enemies.forEach(e => e.update());
  }

  addScore(s) {
    this.#score += s
    this.#scoreLabel.text = "Score: " + this.#score
  }

  causeDamage(d) {
    this.#hp -= d
    this.#healthLabel.text = "Health: " + this.#hp
    this.cameras.main.flash(200, 255, 0, 0);
    this.sound.play('boom');
  }
}

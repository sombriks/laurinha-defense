import Phaser from "phaser"

import { Bullet } from "../actors/bullet"
import { Enemy } from "../actors/enemy"

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
    this.load.audio('pew', 'assets/sfx/pew.mp3')
  }

  create() {
    this.matter.world.setBounds()

    this.#hp = 100
    this.#score = 0

    this.#scoreLabel = this.add.text(10, 10, "Score: 0")
    this.#healthLabel = this.add.text(10, 30, "Health: " + this.#hp)

    // the line
    this.add.graphics()
      .lineStyle(2, 0xFF0000)
      .moveTo(0, 590)
      .lineTo(480, 590)
      .stroke()

    this.input.on('pointerdown', (ev) => {
      const originX = 240;
      const originY = 640;
      const angle = Phaser.Math.Angle.Between(originX, originY, ev.x, ev.y);
      const speed = 0.007
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed
      console.log(vx, vy)
      new Bullet({ scene: this, x: originX, y: originY, vx, vy })
      // play sound
      this.sound.play('pew')
    })
  }

  update(time, delta) {
    if (this.#hp <= 0) {
      this.game.scene.stop('Field')
      this.game.scene.start("GameOver")
    }

    this.#enemies = this.#enemies.filter(e => !e.dead)
    if (this.#delay < time) {
      const x = Phaser.Math.Between(0, 480)
      this.#enemies.push(new Enemy(this, x, 0))
      this.#enemies.forEach(e => e.forward())
      this.#delay = time + 1500
    }
  }

  addScore(s) {
    this.#score += s
    this.#scoreLabel.text = "Score: " + this.#score
  }

  causeDamage(d) {
    this.#hp -= d
    this.#healthLabel.text = "Health: " + this.#hp
    this.cameras.main.flash(200, 255, 0, 0)
  }
}

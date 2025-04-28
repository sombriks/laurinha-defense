import Phaser from "phaser"

import {Bullet} from "../actors/bullet"
import {Enemy} from "../actors/enemy"

export class Field extends Phaser.Scene {

  constructor() {
    super("Field");
  }

  #enemies = []
  #delay = 0
  #score = 0.0
  #hp = 100

  #scoreLabel
  #healthLabel

  create() {
    this.matter.world.setBounds()

    this.#scoreLabel = this.add.text(10, 10, "Score: " + this.#score)
    this.#healthLabel = this.add.text(10, 30, "Health: " + this.#hp)

    this.add.graphics()
      .lineStyle(2,0xFF0000)
      .moveTo(0, 400)
      .lineTo(480,400)
      .stroke()

    // this.matter.add.mouseSpring()
    this.input.on('pointerdown', (ev) => {
      new Bullet({scene: this, x: ev.x, y: 480, vx: 0, vy: -0.01})
    })
  }

  update(time, delta) {
    if (this.#hp <= 0) return
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
    if(this.#hp <= 0) {
      this.game.scene.stop('Field')
      this.#hp = 100
      this.#score = 0
      this.scene.start("GameOver")
    }
  }
}

import Phaser from "phaser"

import {Bullet} from "../actors/bullet"
import {Enemy} from "../actors/enemy"

export class Field extends Phaser.Scene {

  constructor() {
    super("Field");
  }

  #enemies = []
  #delay = 0

  create() {

    this.matter.world.setBounds(0, 0, 480, 480)
    // this.matter.add.mouseSpring()
    this.input.on('pointerdown', (ev) => {
      new Bullet({scene: this, x: ev.x, y: ev.y, vx: 0, vy: -0.01})
    })
  }

  update(time, delta) {
    if (this.#delay < time) {
      const x = Phaser.Math.Between(0, 480)
      this.#enemies.push(new Enemy(this, x, 0))
      this.#delay = time + 1500
      this.matter.applyForce(this.#enemies.map(e => e.shape), {x: 0, y: 0.002})
    }
  }
}

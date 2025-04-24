import Phaser from "phaser"

import {Bullet} from "../actors/bullet"
import {Enemy} from "../actors/enemy"

export class Intro extends Phaser.Scene {

  #enemies = []
  #delay = 0

  create() {

    this.matter.world.setBounds(0, 0, 480, 480)
    // this.matter.add.mouseSpring()
    this.input.on('pointerdown', (ev) => {
      console.log(ev)
      new Bullet({scene: this, x: ev.x, y: 400, vx: 10, vy: 10})
      // for(const e of this.#enemies) {
      //   this.physics.accelerateToObject(e.shape, this.#enemies[0], 100)
      // }
    })
  }

  update(time, delta) {
    if (this.#delay < time) {
      const x = Phaser.Math.Between(0, 480)
      const y = Phaser.Math.Between(0, 480)
      this.#enemies.push(new Enemy(this, x, y))
      this.#delay = time + 1500
    }
  }
}

import Phaser from "phaser"
import {Enemy} from "../actors/enemy.js";

export class Intro extends Phaser.Scene {

  #enemies = []
  #counter = 0

  create() {
    this.matter.world.setBounds(0, 0, 480, 480)
    this.matter.add.mouseSpring()
  }

  update(time, delta) {
    if (this.#counter % 1500 > 1111) {
      const x = Phaser.Math.Between(0, 480)
      const y = Phaser.Math.Between(0, 480)
      this.#enemies.push(new Enemy(this, x, y))
      this.#counter = -0
    } else {
      this.#counter += delta
    }
  }
}

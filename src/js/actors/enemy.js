import Phaser from "phaser"

export class Enemy {

  #shape

  get shape() {
    return this.#shape
  }

  /**
   *
   * @param {Phaser.Scene} scene
   * @param {Number} x
   * @param {Number} y
   */
  constructor(scene, x, y) {
    const radius = Phaser.Math.Between(8, 50)
    this.#shape = scene.matter.add.circle(x, y, radius)
  }
}

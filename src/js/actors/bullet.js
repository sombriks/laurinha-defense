import Phaser from "phaser"

export class Bullet {

  #shape

  get shape() {
    return this.#shape
  }


  /**
   *
   * @param {Phaser.Scene} scene
   * @param {Object} options
   * @param {Number} options.x
   * @param {Number} options.y
   * @param {Number} options.vx
   * @param {Number} options.vy
   */
  constructor({scene, x, y, vx, vy}) {
    this.#shape = scene.matter.add.circle(x, y, 5)
    scene.matter.applyForce([this.#shape], {x: vx, y: vy})
  }
}

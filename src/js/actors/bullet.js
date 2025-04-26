import Phaser from "phaser"

export class Bullet {

  #shape
  #damage = Phaser.Math.Between(5, 15)
  #scene

  /**
   * @returns {MatterJS.BodyType}
   */
  get shape() {
    return this.#shape
  }

  /**
   * @returns {number}
   */
  get damage() {
    return this.#damage
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
    this.#scene = scene
    this.#shape.bullet = this
    scene.matter.applyForce([this.#shape], {x: vx, y: vy})
    scene.matter.world.on('collisionstart', (event) => {
      const bodyA = event.pairs[0]?.bodyA;
      const bodyB = event.pairs[0]?.bodyB;
      if (this.shape === bodyA || this.shape === bodyB) {
        bodyA.enemy?.hit(this.damage)
        bodyB.enemy?.hit(this.damage)
        scene.matter.world.remove([this.shape])
      }
    })
  }
}

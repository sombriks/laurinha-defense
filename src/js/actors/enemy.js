import Phaser from "phaser"

export class Enemy {

  #shape
  #damage = Phaser.Math.Between(10, 50)
  #scene
  #dead = false

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
   * @returns {boolean}
   */
  get dead() {
    return this.#dead
  }

  /**
   * @param {Phaser.Scene} scene
   * @param {Number} x
   * @param {Number} y
   */
  constructor(scene, x, y) {
    this.#shape = scene.matter.add.circle(x, y, this.damage)
    this.#shape.enemy = this
    this.#scene = scene
  }

  hit(damage) {
    this.#damage -= damage
    this.shape.circleRadius = this.damage
    if (this.damage <= 20) {
      if (this.#scene.addScore) this.#scene.addScore(1)
      this.die()
    }
  }

  forward() {
    this.#scene.matter.applyForce([this.shape], {x: 0, y: 0.002})
    if (this.shape.position.y >= 590) {
      this.#scene.causeDamage(this.damage)
      this.die()
    }
  }

  die () {
    this.#scene.matter.world?.remove([this.shape])
    this.#dead = true
  }
}

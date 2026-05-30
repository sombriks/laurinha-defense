import Phaser from "phaser"

export class Enemy {

  #img
  #shape
  #damage
  #scene
  #isDead = false

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
    return this.#isDead
  }

  /**
   * @param {Phaser.Scene} scene
   * @param {Number} x
   * @param {Number} y
   */
  constructor(scene, x, y) {
    this.#scene = scene
    this.#damage = Phaser.Math.Between(10, 50)
    this.#shape = scene.matter.add.circle(x, y, this.damage)
    this.#img = scene.add.image(x, y, 'emoji', 15)
    this.#img.setOrigin(0.5, 0.5)
    this.#shape.enemy = this
    this.update()
  }

  hit(damage) {
    this.#damage -= damage;
    this.shape.circleRadius = this.damage;
    if (this.damage <= 20) {
      if (this.#scene.addScore) this.#scene.addScore(1);
      this.die();
    }
  }

  forward() {
    this.#scene.matter.applyForce([this.shape], {x: 0, y: 0.002});
    if (this.shape.position.y >= 590) {
      this.#scene.causeDamage(this.damage)
      this.die()
    }
  }

  die() {
    this.#scene.matter.world?.remove([this.shape])
    this.#img.destroy()
    this.#isDead = true
    this.#scene.sound.play('boom');
  }

  update() {
    this.#img.x = this.shape.position.x;
    this.#img.y = this.shape.position.y;
    this.#img.setDisplaySize(this.damage * 2.5, this.damage * 2.5);
  }
}

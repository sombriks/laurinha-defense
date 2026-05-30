import Phaser from "phaser"

export class Bullet {

  #shape
  #sprite
  #damage
  #isDead = false

  get dead() {
    return this.#isDead
  }

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
   * @param {Object} options
   * @param {Phaser.Scene} options.scene
   * @param {Number} options.x
   * @param {Number} options.y
   * @param {Number} options.vx
   * @param {Number} options.vy
   */
  constructor({scene, x, y, vx, vy}) {
    this.#shape = scene.matter.add.circle(x, y, 5)
    this.#sprite = scene.add.sprite(x, y, 'emoji', 0)
    scene.bullets.push(this)
    this.#damage = Phaser.Math.Between(5, 15)
    this.#shape.bullet = this
    scene.matter.applyForce([this.#shape], {x: vx, y: vy})
    scene.matter.world.on('collisionstart', (event) => {
      const bodyA = event.pairs[0]?.bodyA
      const bodyB = event.pairs[0]?.bodyB
      if (this.shape === bodyA || this.shape === bodyB) {
        bodyA.enemy?.hit(this.damage)
        bodyB.enemy?.hit(this.damage)
        scene.matter.world.remove([this.shape])
        this.#isDead = true
        this.#sprite.destroy()
      }
    })
  }

  update() {
    this.#sprite.x = this.shape.position.x
    this.#sprite.y = this.shape.position.y
    this.#sprite.scale = 0.4
  }
}

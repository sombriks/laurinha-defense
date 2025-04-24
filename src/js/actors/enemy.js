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

    if (Math.random() < 0.7)
    {
      const sides = Phaser.Math.Between(3, 14);
      const radius = Phaser.Math.Between(8, 50);

      this.#shape = scene.matter.add.polygon(x, y, sides, radius, { restitution: 0.9 });
    }
    else
    {
      const width = Phaser.Math.Between(16, 128);
      const height = Phaser.Math.Between(8, 64);

      this.#shape = scene.matter.add.rectangle(x, y, width, height, { restitution: 0.9 });
    }
  }
}

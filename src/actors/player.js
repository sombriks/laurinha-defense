import Phaser from "phaser"

import {Bullet} from "./bullet"

export class Player {

  #hp
  #sprite

  get hp() {
    return this.#hp
  }

  get sprite() {
    return this.#sprite
  }

  get dead() {
    return this.#hp <= 0
  }

  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    this.#hp = 100;
    this.#sprite = scene.add.sprite(240, 590, 'emoji', 28);
    scene.input.on('pointerdown', (ev) => {
      const originX = 240;
      const originY = 640;
      const angle = Phaser.Math.Angle.Between(originX, originY, ev.x, ev.y);
      const speed = 0.007;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      new Bullet({scene, x: originX, y: originY, vx, vy});
      scene.sound.play('pew');
    });
  }

  damage(d) {
    this.#hp -= d
  }
}

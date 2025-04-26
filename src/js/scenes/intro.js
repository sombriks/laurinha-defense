import Phaser from "phaser"

export class Intro extends Phaser.Scene {

  constructor() {
    super("Intro");
  }

  create() {
    this.add//
      .text(240, 240, "touch/click to  start")//
      .setOrigin(0, 0)
    this.input.on("pointerdown", (event) => {
      this.scene.stop("Intro");
      this.game.scene.start('Field')
    })
  }
}

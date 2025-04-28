import Phaser from "phaser"

export class Intro extends Phaser.Scene {

  constructor() {
    super("Intro");
  }

  create() {
    this.add//
      .text(240, 240, "Laurinha Defense")//
      .setOrigin(0.5, 0.5)
    this.add//
      .text(240, 260, "Toque para iniciar")//
      .setOrigin(0.5, 0.5)

    this.input.on("pointerdown", (event) => {
      this.scene.stop("Intro");
      this.game.scene.start('Field')
    })
  }
}

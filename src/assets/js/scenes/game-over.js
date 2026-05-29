import Phaser from "../phaser/phaser.js"

export class GameOver extends Phaser.Scene {

  constructor() {
    super("GameOver");
  }

  create() {
    this.add//
      .text(240, 240, "Fim de jogo! Toque para recomeçar")//
      .setOrigin(0.5, 0.5)

    this.input.on("pointerdown", (event) => {
      this.scene.stop("GameOver")
      this.game.scene.start('Field')
    })
  }
}

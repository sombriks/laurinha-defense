import Phaser from "phaser"

export class Intro extends Phaser.Scene {

  #sprites = []

  create() {
    const graphics = this.add.graphics({lineStyle: {color: 0xff0000}})

    const circle = new Phaser.Geom.Circle(400, 300, 100)
    const line = new Phaser.Geom.Line(400, 400, 400, 300)

    graphics.strokeCircleShape(circle)
    graphics.strokeLineShape(line)

    this.#sprites.push(graphics)
  }

  update(time, delta) {
    Phaser.Actions.IncY(this.#sprites, 0.05)
  }
}

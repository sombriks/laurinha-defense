import Phaser from "phaser"

export class Intro extends Phaser.Scene {

  #sprites = []

  create() {

    //  Create loads of random bodies
    for (let i = 0; i < 100; i++)
    {
      const x = Phaser.Math.Between(0, 480);
      const y = Phaser.Math.Between(0, 480);

      if (Math.random() < 0.7)
      {
        const sides = Phaser.Math.Between(3, 14);
        const radius = Phaser.Math.Between(8, 50);

        this.matter.add.polygon(x, y, sides, radius, { restitution: 0.9 });
      }
      else
      {
        const width = Phaser.Math.Between(16, 128);
        const height = Phaser.Math.Between(8, 64);

        this.matter.add.rectangle(x, y, width, height, { restitution: 0.9 });
      }
    }

    this.matter.add.mouseSpring();

  }

  update(time, delta) {
  }
}

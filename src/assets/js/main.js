import Phaser from "./phaser/phaser.js"

import {Intro} from "./scenes/intro.js"
import {Field} from "./scenes/field.js"
import {GameOver} from "./scenes/game-over.js"

const game = new Phaser.Game({
  scene: [Intro, Field, GameOver],
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: {
        y: 0
      }
    }
  }
})

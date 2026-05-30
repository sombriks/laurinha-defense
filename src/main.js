import "./style.css"

import Phaser from "phaser"

import {Intro} from "./scenes/intro"
import {Field} from "./scenes/field"
import {GameOver} from "./scenes/game-over"

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

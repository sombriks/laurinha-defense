import Phaser from "phaser"
import { SplashScreen } from '@capacitor/splash-screen'

import {Intro} from "./scenes/intro"
import {Field} from "./scenes/field"

SplashScreen.hide().then(()=>{
  // TODO
})

const game = new Phaser.Game({
  scene: [Intro, Field],
  type: Phaser.AUTO,
  width: 480,
  height: 480,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  physics: {
    default: 'matter',
    matter:{
      debug: true,
      gravity: {
        y:0
      }

    }
  }
})

import Phaser from "phaser"
import { SplashScreen } from '@capacitor/splash-screen'
import {Intro} from "./scenes/intro.js";

SplashScreen.hide().then(()=>{})

const game = new Phaser.Game({
  scene: Intro,
  type: Phaser.AUTO,
  width: 480,
  height: 480,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'matter',
  }
})

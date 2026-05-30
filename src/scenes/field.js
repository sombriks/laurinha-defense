import pew from 'url:../sfx/pew.mp3'
import boom from 'url:../sfx/boom.mp3'
import emoji from 'url:../imgs/spritesheet.png'

import Phaser from "phaser"

import {Enemy} from "../actors/enemy"
import {Player} from "../actors/player";

export class Field extends Phaser.Scene {

  #score
  #player
  #delay = 0
  #enemies = []
  #bullets = []

  constructor() {
    super("Field");
  }

  get bullets() {
    return this.#bullets
  }

  #scoreLabel
  #healthLabel

  preload() {
    this.load.audio('pew', pew);
    this.load.audio('boom', boom);
    this.load.spritesheet('emoji', emoji, {frameWidth: 50, frameHeight: 50});
  }

  create() {
    this.matter.world.setBounds();
    this.#player = new Player(this);

    this.#score = 0;
    this.#scoreLabel = this.add.text(10, 10, "Score: 0");
    this.#healthLabel = this.add.text(10, 30, "Health: " + this.#player.hp);
  }

  update(time, delta) {
    if (this.#player.dead) {
      this.game.scene.stop('Field');
      this.game.scene.start("GameOver");
    }
    this.#enemies = this.#enemies.filter(e => !e.dead);
    this.#bullets = this.#bullets.filter(b => !b.dead);
    if (this.#delay < time) {
      const x = Phaser.Math.Between(0, 480);
      this.#enemies.push(new Enemy(this, x, 0));
      this.#enemies.forEach(e => e.forward());
      this.#delay = time + 1500;
    }
    this.#enemies.forEach(e => e.update());
    this.#bullets.forEach(b => b.update());
  }

  addScore(s) {
    this.#score += s
    this.#scoreLabel.text = "Score: " + this.#score
  }

  causeDamage(d) {
    this.#player.damage(d)
    this.#healthLabel.text = "Health: " + this.#player.hp
    this.cameras.main.flash(200, 255, 0, 0);
  }
}

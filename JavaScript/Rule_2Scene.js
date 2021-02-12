class Rule_2Scene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Rule_2Scene'
    })
  }

  preload() {
    this.load.image("joe-biden", "./media/avatar_JoeBiden")
  }

  create() {
    gameState.joe_biden_start = this.add.image(175, 200, "joe-biden").setOrigin(0);
    gameState.joe_biden_start.setScale(.5)
    this.add.text(125, 140, "Pretty Simple Really", {
      fontFamily: 'Trebuchet MS', color: "#171717",
      fontSize: 30
        });

    this.add.text(160, 525, 'Press a key to  continue', {
      fontFamily: 'Trebuchet MS',
      color: "#202020",
      fontSize: 18
        });
    // on keypress any, transition to GameScene
    this.input.keyboard.on('keydown', () => {
      this.scene.stop('Rule_2Scene');
      this.scene.start('GameScene');
    });
  }
}

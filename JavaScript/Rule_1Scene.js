class Rule_1Scene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Rule_1Scene'
    })
  }

  preload() {
      this.load.image("burger", "./media/Burger_Sprite.png")
  }

  create() {
    gameState.burgerStartScene = this.add.image(175, 200, "burger").setOrigin(0);
    gameState.burgerStartScene.setScale(.5)
    this.add.text(125, 140, "Pretty Simple Really", {
      fontFamily: 'Trebuchet MS',
      fontSize: 30
    });
    this.add.text(175, 400, "Eat the Burgers", {
      fontFamily: 'Trebuchet MS',
      fontSize: 25, color: "#171717", textDecoration: "underline"
        });
    this.add.text(160, 525, 'Press a key to  continue', {
      fontFamily: 'Trebuchet MS',
      color: "#202020",
      fontSize: 18
        });
    // on keypress any, transition to GameScene
    this.input.keyboard.on('keydown', () => {
      this.scene.stop('Rule_1Scene');
      this.scene.start('Rule_2Scene');
    });
  }
}

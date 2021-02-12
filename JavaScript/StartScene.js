class StartScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartScene'
        })
    }

    preload() {
        this.load.image('start', './media/startSceneImageCat.png');
    }

    create() {
        gameState.startSceneImage = this.add.image(175, 250, 'start').setOrigin(0);
        gameState.startSceneImage.setScale(.5)
        this.add.text(125, 240, 'I Can Has Cheezburgerz?', {
            fontFamily: 'Trebuchet MS', fontSize: 25
        });
        this.add.text(160, 525, 'Press a key to  continue', {
            fontFamily: 'Trebuchet MS', color: "#202020",
            fontSize: 18
        });
        // on keypress any, transition to GameScene
        this.input.keyboard.on('keydown', () => {
            this.scene.stop('StartScene');
            this.scene.start('Rule_1Scene');
        });
    }
}

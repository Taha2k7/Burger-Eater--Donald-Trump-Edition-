const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    backgroundColor: '#808080',
    scene: [StartScene, Rule_1Scene, Rule_2Scene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0,
            enableBody: true,
        }
    },
};

const game = new Phaser.Game(config);

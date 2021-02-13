let score = 0;
const scoreMultiplier = 10;
let speed = 1;

let gameState = {
  numCoordinates: {},
};
let randomCoord;

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  preload() {
    this.load.image('trump-front', './media/Donald_Trump_Sprite__Facing_Forward.png');
    this.load.image('trump-back', "./media/Donald_Trump_Sprite__Facing_Backward.png");
    this.load.image("trump-left", "./media/Donald_Trump_Sprite__Facing_Left.png");
    this.load.image("trump-right", "./media/Donald_Trump_Sprite__Facing_Right.png");
    this.load.image("joe-biden", "./media/avatar_JoeBiden.png");
    this.load.image("burger", "./media/Burger_Sprite.png")
  }

  create() {

    let scoreText = this.add.text(140, 610, `Score: ${score}`, {
      fontSize: '25px',
      fill: '#fff'
    })

    gameState.player = this.physics.add.sprite(240, 500, 'trump-back').setScale(.5)
    // .1 .4
    this.physics.world.setBounds(0, 0, 480, 600);

    gameState.player.setCollideWorldBounds(true);
    gameState.player.body.collideWorldBounds = true;


    randomCoord = assignCoords()
    gameState.burger = this.physics.add.sprite(randomCoord.x, randomCoord.y, 'burger').setScale(.1);

    gameState.enemies = this.physics.add.group()

    this.physics.add.overlap(gameState.player, gameState.burger, () => {

      gameState.burger.disableBody();
      delete gameState.numCoordinates[`x${gameState.burger.x}y${gameState.burger.y}`];
      randomCoord = assignCoords

      gameState.burger.enableBody(true, randomCoord.x, randomCoord.y);

      score += 10;

      scoreText.setText(`Score: ${score}`)
      randomCoord = assignCoords()
      gameState.enemies.create(randomCoord.x, randomCoord.y, "joe-biden").setScale(.4)

    });

    this.physics.add.collider(gameState.player, gameState.enemies), () => this.endGame()

    function generateRandomCoords() {
      const randomX = Math.floor(Math.random() * 5) * 75 + 25
      const randomY = Math.floor(Math.random() * 5) * 75 + 25
      return {
        x: randomX,
        y: randomY
      }
    }

    function assignCoords() {
      let assignedCoord = generateRandomCoords();

      // If the coordinates is already in gameState.numCoordinates, then other set of coordinates are generated until there is one not in use
      while (gameState.numCoordinates[`x${assignedCoord.x}y${assignedCoord.y}`]) {
        assignedCoord = generateRandomCoords()
      }

      gameState.numCoordinates[`x${assignedCoord.x}y${assignedCoord.y}`] = true

      return assignedCoord;
    }
    }

  update() {

    const cursors = this.input.keyboard.createCursorKeys();

    const rightArrow = cursors.right.isDown;
    const leftArrow = cursors.left.isDown;
    const upArrow = cursors.up.isDown;
    const downArrow = cursors.down.isDown;

    if (rightArrow) {
      moveTrumpRight()
    } else if (leftArrow) {
      moveTrumpLeft()
    } else if (upArrow) {
      moveTrumpUp()
    } else if (downArrow) {
      moveTrumpDown()
    }

    const TrumpXCoord = gameState.player.x;
    const TrumpYCoord = gameState.player.y;
    if (TrumpXCoord >= 448 || TrumpXCoord <= 32) {
      this.endGame();
    }

    if (TrumpYCoord >= 568 || TrumpYCoord <= 32) {
      this.endGame();
    }

    function moveTrumpRight () {
      gameState.player.flipX = false;
      gameState.player.setTexture('trump-right');
      gameState.player.setVelocityX(150) * speed;
      gameState.player.setVelocityY(0) * speed;
    }

    function moveTrumpLeft () {
      // In the image, Bob looks to the right so we flip the image
      gameState.player.flipX = true;
      gameState.player.setTexture('trump-left');
      gameState.player.setVelocityX(-150) * speed;
      gameState.player.setVelocityY(0) * speed;
    }

    function moveTrumpUp () {
      gameState.player.flipX = false;
      gameState.player.setTexture('trump-front');
      gameState.player.setVelocityX(0) * speed;
      gameState.player.setVelocityY(-150) * speed;
    }

    function moveTrumpDown () {
      gameState.player.flipX = false;
      gameState.player.setTexture('trump-back');
      gameState.player.setVelocityX(0) * speed;
      gameState.player.setVelocityY(150) * speed;
    }


  }

  endGame() {
    // Stop sprites moving
    this.physics.pause();
    // Transition to end scene w/fade
    this.cameras.main.fade(800, 0, 0, 0, false, function (camera, progress) {
      if (progress > .5) {
        this.scene.stop('GameScene');
        this.scene.start('GameScene');
      }
    });
  }
}
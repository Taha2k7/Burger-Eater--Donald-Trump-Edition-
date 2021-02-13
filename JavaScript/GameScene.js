let score = 0;
const scoreMultiplier = 10;
let speed = 1;
let speed_2 = 10;

let left = false;
let right = false;
let up = false;
let down = false;
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
    this.load.image("joe-biden", "./media/JoeBidenEnemy.png");
    this.load.image("burger", "./media/Burger_Sprite.png")
  }

  create() {

    let scoreText = this.add.text(140, 610, `Score: ${score}`, {
      fontSize: '25px',
      fill: '#fff'
    })

    gameState.player = this.physics.add.sprite(240, 500, 'trump-back')
     



    randomCoord = assignCoords()
    gameState.burger = this.physics.add.sprite(randomCoord.x, randomCoord.y, 'burger').setScale(.1);

    gameState.enemies = this.physics.add.group()

    this.physics.add.overlap(gameState.player, gameState.burger, () => {

      gameState.burger.disableBody();
      delete gameState.numCoordinates[`x${gameState.burger.x}y${gameState.burger.y}`];
      randomCoord = assignCoords();

      gameState.burger.enableBody(true, randomCoord.x, randomCoord.y);

      score += 10;

      scoreText.setText(`Score: ${score}`)
      randomCoord = assignCoords()
      gameState.enemies.create(randomCoord.x, randomCoord.y, "joe-biden")



    });

    this.physics.add.collider(gameState.player, gameState.enemies, () => this.endGame())

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

    // 480x too far 640y too far
    if(gameState.player.x >= 480) {
      gameState.player.x = 0
    } else if (gameState.player.x <= 0) {
      gameState.player.x = 480
    } else if (gameState.player.y >= 640) {
      gameState.player.y = 0
    } else if (gameState.player.y <= 0) {
      gameState.player.y = 640
    }

    const TrumpXCoord = gameState.player.x;
    const TrumpYCoord = gameState.player.y;

    function moveTrumpRight () {
      gameState.player.flipX = false;
      gameState.player.setTexture('trump-right');
      right = true;
      left = false;
      up = false;
      down = false;
    }

    function moveTrumpLeft () {
      // In the image, Bob looks to the right so we flip the image
      gameState.player.setTexture('trump-left');
      left = true;
      right = false;
      up = false
      down = false
    }

    function moveTrumpUp () {
      gameState.player.flipX = false;
      gameState.player.setTexture('trump-front');
      up = true;
      left = false;
      right = false
      down = false
    }

    function moveTrumpDown () {
      gameState.player.flipX = false;
      gameState.player.setTexture('trump-back');
      down = true;
      left = false;
      up = false
      right = false
    }
    if(right) {
      gameState.player.x += speed_2
    }
    if(left) {
      gameState.player.x -= speed_2
    }
    if(up) {
      gameState.player.y -= speed_2
    }
    if(down) {
      gameState.player.y += speed_2
    }

  }

  endGame() {
    // Stop sprites moving
    this.physics.pause();
    // Transition to end scene w/fade
    this.cameras.main.fade(800, 0, 0, 0, false, function (camera, progress) {
        this.scene.stop('GameScene');
        this.scene.start('EndScene');
        score=0;
    });
  }
}
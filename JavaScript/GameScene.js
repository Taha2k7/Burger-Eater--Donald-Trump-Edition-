let score = 0;
const scoreMultiplier = 10;
let speed = 1;

let gameState = {
   numCoordinates: {}, 
};
let randomCoord;

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
      this.load.image('trump-front', './media/Donald_Trump_Sprite__Facing_Forward.png');
      this.load.image('trump-back', "./media/Donald_Trump_Sprite__Facing_Backward.png");
      this.load.image("trump-left", "./media/Donald_Trump_Sprite__Facing_Left.png");
      this.load.image("trump-right", "./media/Donald_Trump_Sprite__Facing_Right.png");
      this.load.image("joe-biden", "./media/avatar_JoeBiden.png");
      this.load.image("burger", "./media/Burger_Sprite.png")
  }
}

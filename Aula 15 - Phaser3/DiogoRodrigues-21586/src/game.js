// criar a cena "game"
let gameScene = new Phaser.Scene('Game');


// declarar parametros
gameScene.init = function() {
  this.playerSpeed = 1.5;
  this.enemySpeed = 2;
  this.enemyMaxY = 280;
  this.enemyMinY = 80;
}

// carregar os assets
gameScene.preload = function() {


  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('dragon', 'assets/dragon.png');
  this.load.image('treasure', 'assets/treasure.png');
};

// criar a cena
gameScene.create = function() {

  // fundo
  let bg = this.add.sprite(0, 0, 'background');

  // mudar origem
  bg.setOrigin(0, 0);

  // boneco
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');

  // escala
  this.player.setScale(0.5);

  // objetivo
  this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
  this.treasure.setScale(0.6);

  // inimigos
  this.enemies = this.add.group({
    key: 'dragon',
    repeat: 5,
    setXY: {
      x: 110,
      y: 100,
      stepX: 80,
      stepY: 20
    }
  });

  // escala dos inimigos
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

  // velociade
  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
    enemy.speed = Math.random() * 2 + 1;
  }, this);

  // jogador vivo
  this.isPlayerAlive = true;

  // reset camera
  this.cameras.main.resetFX();
};


gameScene.update = function() {

  // so o jogador vivo
  if (!this.isPlayerAlive) {
    return;
  }


  if (this.input.activePointer.isDown) {

    // andar
    this.player.x += this.playerSpeed;
  }

  // apanhar tesouro
  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
    this.gameOver();
  }

  // movimentos do inimigo
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;

  for (let i = 0; i < numEnemies; i++) {


    enemies[i].y += enemies[i].speed;


    if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
      enemies[i].speed *= -1;
    } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
      enemies[i].speed *= -1;
    }


    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
      this.gameOver();
      break;
    }
  }
};

gameScene.gameOver = function() {

  // jogador morto
  this.isPlayerAlive = false;

  //camera
  this.cameras.main.shake(500);
  this.time.delayedCall(250, function() {
    this.cameras.main.fade(250);
  }, [], this);

  // reiniciar
  this.time.delayedCall(500, function() {
    this.scene.restart();
  }, [], this);
};



// configuração
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);

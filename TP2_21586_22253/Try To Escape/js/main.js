var Main = function(game){};

var score = 0;
var music;

Main.prototype = {

	create: function() {

		music = game.add.audio('boden',);
		//music.play();
		music.volume=0.2;
		music.loopFull();

		this.tileVelocity = -400;
		this.rate = 1500;
		this.rate2 = 7000;
		score = 0;

		this.tileWidth = this.game.cache.getImage('tile').width;
		this.tileHeight = this.game.cache.getImage('tile').height;
		this.boxHeight = this.game.cache.getImage('box').height;
		;

		this.game.stage.backgroundColor = '#1998FF';
		//game.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'background_game');

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.floor = this.game.add.group();
		this.floor.enableBody = true;
		this.floor.createMultiple(Math.ceil(this.game.world.width / this.tileWidth), 'tile');

		this.boxes = this.game.add.group();
		this.boxes.enableBody = true;
		this.boxes.createMultiple(20, 'box');
		this.game.world.bringToTop(this.floor);


		this.moeda = this.game.add.group();
		this.moeda.enableBody = true;
		this.moeda.createMultiple(100, 'moeda');


		this.jumping = false;

		this.addBase();
		this.createScore();
		this.createPlayer();

		this.cursors = this.game.input.keyboard.createCursorKeys(); 

		this.timer = game.time.events.loop(this.rate, this.addObstacles, this);
		this.timer = game.time.events.loop(this.rate2, this.addMoeda, this);
		this.Scoretimer = game.time.events.loop(100, this.incrementScore, this);
	},

	update: function() {

		this.game.physics.arcade.collide(this.player, this.floor);
		this.game.physics.arcade.collide(this.player, this.boxes, this.gameOver, null, this);
		//this.game.physics.arcade.collide(this.star, this.floor);
		this.game.physics.arcade.collide(this.moeda, this.boxes);
		this.game.physics.arcade.overlap(this.player, this.moeda, this.apanhaMoeda,null, this);


		var onTheGround = this.player.body.touching.down;

		// Quando o Player está no chão tem 2 saltos disponíveis
		if (onTheGround) {
			this.jumps = 2;
			this.jumping = false;
		}

		// Salto
		if (this.jumps > 0 && this.upInputIsActive(5)) {
			this.player.body.velocity.y = -1000;
			this.jumping = true;
		}

		// Quando acontecer o primeiro salto, o número de saltos disponíveis diminui
		if (this.jumping && this.upInputReleased()) {
			this.jumps--;
			this.jumping = false;
		}
	},


	addBox: function (x, y) {
		var tile = this.boxes.getFirstDead();

		tile.reset(x, y);
		tile.body.velocity.x = this.tileVelocity;
		tile.body.immovable = true;
		tile.checkWorldBounds = true;
		tile.outOfBoundsKill = true;
		// tile.body.friction.x = 1000;
	},

	addMoeda: function () {

		var moeda = Math.floor( 1);

		if (this.rate > 200) {
			this.rate -= 10;
			this.tileVelocity = -(675000 / this.rate);
		}

		// Adicionar as moedas ao jogo
		for (var i = 0; i < moeda; i++) {
			this.Moeda(this.game.world.width, 400);
			//this.Moeda(this.game.world.width , this.game.world.height - this.tileHeight - ((i + (Math.random() * (5)))* this.starHeight ));
		}
	},

	Moeda: function (x, y) {

		// caixas fora do ecra
		var tile = this.moeda.getFirstDead();

		tile.reset(x, y);
		// velocidade das caixas
		tile.body.velocity.x = this.tileVelocity;
		tile.body.immovable = true;
		tile.checkWorldBounds = true;
		// destroi caixas
		tile.outOfBoundsKill = true;
	},

	addObstacles: function () {
		var tilesNeeded = Math.floor( Math.random() * (5));

		if (this.rate > 200) {
			this.rate -= 10;
			this.tileVelocity = -(675000 / this.rate);
		}

		for (var i = 0; i < tilesNeeded; i++) {
			this.addBox(this.game.world.width , this.game.world.height -
				this.tileHeight - ((i + 1)* this.boxHeight ));
		}
	},


	addTile: function (x, y) {
		var tile = this.floor.getFirstDead();

		tile.reset(x, y);

		tile.body.immovable = true;
		tile.checkWorldBounds = true;
		tile.outOfBoundsKill = true;

	},

	addBase: function () {
		var tilesNeeded = Math.ceil(this.game.world.width / this.tileWidth);
		var y = (this.game.world.height - this.tileHeight);

		for (var i = 0; i < tilesNeeded; i++) {

			this.addTile(i * this.tileWidth, y);
		}
	},

	upInputIsActive: function (duration) {
		var isActive = false;

		isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
		isActive |= (this.game.input.activePointer.justPressed(duration + 1000 / 60) &&
			this.game.input.activePointer.x > this.game.width / 4 &&
			this.game.input.activePointer.x < this.game.width / 2 + this.game.width / 4);

		return isActive;
	},

	// salto
	upInputReleased: function () {
		var released = false;

		released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
		released |= this.game.input.activePointer.justReleased();

		return released;
	},

	//cria jogador
	createPlayer: function () {
		this.player = this.game.add.sprite(this.game.world.width/5, this.game.world.height - 
			(this.tileHeight*2), 'player');
		this.player.scale.setTo(4, 4);
		this.player.anchor.setTo(0.5, 1.0);
		this.game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 2200;
		this.player.body.collideWorldBounds = true;
		this.player.body.bounce.y = 0.1;
		this.player.body.drag.x = 150;
		this.player.animations.add('walk');
		this.player.animations.play('walk',8, true);
	},

	//score
	createScore: function () {

		var scoreFont = "40px Arial";

		this.scoreLabel = this.game.add.text(this.game.world.centerX, 50, "0", { font: scoreFont, fill: "#fff" });
		this.scoreLabel.anchor.setTo(0.5, 0.5);
		this.scoreLabel.align = 'center';
		this.game.world.bringToTop(this.scoreLabel);

		this.highScore = this.game.add.text(this.game.world.centerX * 1.6, 50, "0", { font: scoreFont, fill: "#fff" });
		this.highScore.anchor.setTo(0.5, 0.5);
		this.highScore.align = 'right';
		this.game.world.bringToTop(this.highScore);

		if (window.localStorage.getItem('HighScore') == null) {
			this.highScore.setText(0);
			this.highScore.setText(window.localStorage.setItem('HighScore', 0));
		}
		else {
			this.highScore.setText(window.localStorage.getItem('HighScore'));
		}
	},

	incrementScore: function () {

		score += 1;
		this.scoreLabel.setText(score);
		this.game.world.bringToTop(this.scoreLabel);
		this.highScore.setText("Pontuação Máxima: " + window.localStorage.getItem('HighScore'));
		this.game.world.bringToTop(this.highScore);
	},

//apanhar moeda
	apanhaMoeda: function(player, moeda){
		//game.debug.body(star);
		moeda.destroy();
		//star.disableBody(true, true);

		score+=50;
		//var scoreFont = "40px Arial";
		//this.bonus=this.game.add.text(this.game.world.centerX,80,"0", { font: scoreFont, fill: "#fff" })
		//this.bonus.anchor.setTo(0.5,0.5);

	},

	gameOver: function(){
		music.pause();
		this.game.state.start('GameOver');
	},

};
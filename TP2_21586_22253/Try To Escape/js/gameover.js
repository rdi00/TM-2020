var GameOver = function(game){};

GameOver.prototype = {

  	create: function(){


		game.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'background');

		this.resume = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.showScore();
	},

	update: function () {
		if (this.resume.isDown) {
			this.restartGame();
		}

	},

	showScore: function () {
		var scoreFont = "40px Arial";

		this.scoreLabel = this.game.add.text(this.game.world.centerX
			, this.game.world.centerY / 2, "0", { font: scoreFont, fill: "#000000" });
		this.scoreLabel.anchor.setTo(0.5, 0.5);
		this.scoreLabel.align = 'center';
		this.game.world.bringToTop(this.scoreLabel);
		this.scoreLabel.text = "A Pontuação foi de " + (score);

		this.highScore = this.game.add.text(this.game.world.centerX
			, this.game.world.centerY, "0", { font: scoreFont, fill: "#000000" });
		this.highScore.anchor.setTo(0.5, 0.5);
		this.highScore.align = 'center';
		this.game.world.bringToTop(this.highScore);

		this.hs = window.localStorage.getItem('HighScore');

		if (this.hs == null) {
			this.highScore.setText("Pontuação Máxima: " + score);
			window.localStorage.setItem('HighScore', score)
		}
		else if (parseInt(this.hs) < score) {
			this.highScore.setText("Pontuação Máxima: " + (score ));
			window.localStorage.setItem('HighScore', score)

		}
		else {
			this.highScore.setText("Pontuação Máxima: " + this.hs);
		}

		this.restart = this.game.add.text(this.game.world.centerX
			, this.game.world.centerY * 1.5
			, "Clique \n Espaço para reiniciar ", { font: scoreFont, fill: "#000000" });
		this.restart.anchor.setTo(0.5, 0.5);
		this.restart.align = 'center';
		this.game.world.bringToTop(this.restart);
		// this.scoreLabel.bringToTop()

	},

	restartGame: function(){
		this.game.state.start("Main");
	}
	
};
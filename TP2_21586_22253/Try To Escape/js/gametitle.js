var GameTitle = function(game){};

function actionOnClick() {
	this.startGame()
}

let button;
let text;
let textTitle;
let image;

GameTitle.prototype = {

	create: function(){

		game.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'background');
		game.cache.getImage('box');
		game.cache.getImage('player');

		textTitle = game.add.text(400, 50, 'Try To Escape', { fontFamily: 'Arial', fontSize: 100});
		button = game.add.button(500, 300, 'box', actionOnClick, this, 2, 1, 0);
		text = game.add.text(580, 310, 'Jogar', { fontFamily: 'Arial', fontSize: 50});
		image = game.add.sprite(870, 250, 'player');
		image.scale.setTo(5,5);
	},

	startGame: function(){
		this.game.state.start("Main");
	}

};
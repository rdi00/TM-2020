var Preload = function(game){};

Preload.prototype = {

	preload: function(){
		//Inicializar as imagens
		this.game.load.image('background', 'assets/background.png');
		this.game.load.image('background_game', 'assets/backgroundjogo.png');
		this.game.load.image('tile', 'assets/slice33_33.png');
		this.game.load.image('box', 'assets/slice31_31.png');
		this.game.load.spritesheet('player', 'assets/plll.png', 26, 36, 3, 0.5);
		this.game.load.image('moeda','assets/Coin (1).png');

		game.load.audio('boden', ['assets/sd-ingame1.wav', 'assets/sd-ingame1.ogg']);
	},

	create: function(){
		this.game.state.start("GameTitle");
	}
};
"use strict"

window.onload = function() {
	
	var game = new Phaser.Game(800,600,Phaser.AUTO,'game',{preload:preload,create:create,update:update,render:render});
	
	function preload(){
		//load the path to the assets to load them properly, and avoid crossOrigin throws
		game.load.path = 'assets/';
		game.load.crossOrigin = 'anonymous';
		
		//load zerosuit sample
		game.load.image('zerosuit', 'Sprites/zerosuit.png');
		
	}
	
	//sample assets
	
	var zerosuit;
	
	//end sample assets
	
	
	var player1, player2; //players
	var item; //collectible item
	var hp1, hp2; //hp amount for each player
	var attack1,attack2; //different attack types for each player
	var timer = 4;
	
	var direction1, direction2; //direction that each player is currently facing
	var text; //any text that appears on the screen
	var button; //button to press
	var title,subtitle,subtitle2;
	function create(){
	
	
		var style_title = { font: "32px Forte", fill: "#000000" };
		var style_subtitle = {font: "24px Forte", fill: "#000000"};
	
	
		game.stage.backgroundColor = '#FFFFF0'; //makes background color slightly yellow
		zerosuit = game.add.sprite(game.world.centerX-250,game.world.centerY-100, 'zerosuit');
		
		title = game.add.text(0, 0, "FROST", style_title);
		subtitle = game.add.text(0, 0, "A Short Adventure Game", style_subtitle);
		subtitle2 = game.add.text(0, 0, "For 2 Players", style_subtitle);

		zerosuit.alpha = 0;
		title.alpha = 0;
		subtitle.alpha = 0;
		subtitle2.alpha = 0;

		game.add.tween(zerosuit).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false); 
		
		//tween.to({alpha channel}, # time it takes to fade-in in ms, Phaser.Easing.Linear.None, true or false visibility for fade in, 0 or 1, #times to complete (0 for single fade in), true or false visibility for fade out);
		
		title.alignTo(zerosuit, Phaser.RIGHT_CENTER, 16);
		
		game.add.tween(title).to({alpha:1},1000,Phaser.Easing.Linear.None,true,1,0,true);
		
		subtitle.alignTo(title, Phaser.RIGHT_BOTTOM, 16);
		
		game.add.tween(subtitle).to({alpha:1},1000,Phaser.Easing.Linear.None,true,1,0,true);
		
		subtitle2.alignTo(subtitle, Phaser.RIGHT_BOTTOM, 16);
		
		game.add.tween(subtitle2).to({alpha:1},1000,Phaser.Easing.Linear.None,true,1,0,true);

		
	}
	
	
	function update(){
	

	}
	
	function render(){
		
	}
	
}
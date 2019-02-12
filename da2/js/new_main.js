"use strict"

window.onload = function() {
	
	var game = new Phaser.Game(800,600,Phaser.AUTO,'game',{preload:preload,create:create,update:update,render:render});
	
	function preload(){
		//load the path to the assets to load them properly, and avoid crossOrigin throws
		game.load.path = 'assets/';
		game.load.crossOrigin = 'anonymous';
		
		//load zerosuit sample
		game.load.image('zerosuit', 'Sprites/zerosuit.png');
		
		
		//load actual game assets like the character spritesheets and what-not
		game.load.image('female','Sprites/female.png');
		game.load.spritesheet('fm_walking_up', 'Sprites/fm_walk_up.png',32,48,8);
		game.load.spritesheet('fm_walking_down', 'Sprites/fm_walk_down.png',32,48,8);
		game.load.spritesheet('fm_walking_left', 'Sprites/fm_walk_left.png',32,48,8);
		game.load.spritesheet('fm_dead', 'Sprites/fm_dead.png',34,51,5);
		game.load.spritesheet('fm_shoot_up', 'Sprites/fm_walk_up.png',43,58,8);
		game.load.spritesheet('fm_shoot_down', 'Sprites/fm_walk_up.png',39,51,8);
		game.load.spritesheet('fm_shoot_left', 'Sprites/fm_walk_up.png',51,58,8);
		
		
	}
	
	//sample assets
	
	var zerosuit;
	
	//end sample assets
	
	
	var player1, player2; //players
	var item; //collectible item
	var hp1, hp2; //hp amount for each player
	var attack1,attack2; //different attack types for each player

	var timer = 6;
	var timer_ms;

	var direction1 = -1;
	var direction2 = -1; //direction that each player is currently facing
	var text; //any text that appears on the screen
	var button; //button to press
	var title,subtitle,subtitle2;
	function create(){
	
	
		var style_title = { font: "32px Forte", fill: "#000000" };
		var style_subtitle = {font: "24px Forte", fill: "#000000"};
	
	
		game.stage.backgroundColor = '#FFFFF0'; //makes background color slightly yellow
/*
		zerosuit = game.add.sprite(game.world.centerX-350,game.world.centerY-100, 'zerosuit');
		
		title = game.add.text(0, 0, "FROST", style_title);
		subtitle = game.add.text(0, 0, "A Short Adventure Game", style_subtitle);
		subtitle2 = game.add.text(0, 0, "For 2 Players", style_subtitle);

		//determine current alpha channel, 0 for invisible, 1 for opaque
		timer_ms = game.time.create(false);
		timer_ms.loop(1500,update_ms,this);
		timer_ms.start();

		zerosuit.alpha = 0;
		title.alpha = 0;
		subtitle.alpha = 0;
		subtitle2.alpha = 0;

		game.add.tween(zerosuit).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 1, 0, true); 
		title.alignTo(zerosuit, Phaser.RIGHT_CENTER, 16);
		game.add.tween(title).to({alpha:1},2000,Phaser.Easing.Linear.None,true,0,0,true);
		subtitle.alignTo(title, Phaser.RIGHT_BOTTOM, 16);
		game.add.tween(subtitle).to({alpha:1},3000,Phaser.Easing.Linear.None,true,0,0,true);
		subtitle2.alignTo(subtitle, Phaser.RIGHT_BOTTOM, 16);
		game.add.tween(subtitle2).to({alpha:1},4000,Phaser.Easing.Linear.None,true,0,0,true);
		console.log("Tweens Complete!");		
				
		//tween.to({alpha channel}, # time it takes to fade-in in ms, Phaser.Easing.Linear.None, true or false visibility for fade in, 0 or 1 for fade out, #times to complete (0 for single fade in), true or false visibility for fade out);
	function update_ms(){
		if(timer > 0){ //keep track of first scene time
			timer--;
			console.log("timer =  " + timer);
		}else{
			timer_ms.stop(); //stop timer so it doesn't keep doing the same thing over and over
			demoScene(zerosuit,title,subtitle,subtitle2); //first scene finished, start next scene
			scene2();
			
		}
		
	}
*/
		scene2();



	}
	
	var inScene2 = false;
	var female;
		function scene2(){
		inScene2 = true;
		game.stage.backgroundColor = '#9ec8ef'; //makes background color slightly blue
		female = game.add.sprite(100,100,'female');
		game.physics.enable(female, Phaser.Physics.ARCADE );
		female.anchor.setTo(0.5,0.5);
		female.body.collideWorldBounds = true;
		



	}
	
	
	function demoScene(w,x,y,z){
		//destroy previous scene so that it doesn't lag the game
		w.destroy();
		x.destroy();
		y.destroy();
		z.destroy();
		console.log("All items destroyed!");
	}
	

	
	
	function update(){
		
		if(inScene2){
			if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
				if(direction1!=1){
					direction1 = 1;
					female.destroy();
					female = game.add.sprite(female.x, female.y, 'fm_walking_left');
					
					female.animations.add('walk_l');
					female.animations.play('walk_l', 15, true);
				}else if(direction1 == 1){

					female.animations.play('walk_l', 15, true);
				}
				female.x -= 4;
				
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
				if(direction1!=0){
					direction1 = 0;
					female.destroy();
					female = game.add.sprite(female.x+32, female.y, 'fm_walking_left');
					
					
					female.animations.add('walk_l');
					female.animations.play('walk_l', 15, true);
					female.scale.x *= -1;
				}else if(direction1 == 0){
					female.animations.play('walk_l', 15, true);
					
				}
				female.x += 4;
				
			}

			else if (game.input.keyboard.isDown(Phaser.Keyboard.W))
			{
				
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
			{
				
			}
			else{
				if(direction1!=2){
					direction1 = 2;
					female.destroy();
					female = game.add.sprite(female.x, female.y, 'female');
				}else if(direction1 == 2){
					console.log("Idling...");
					
				}
			}
		
		}
			
			
	}
		
		
		

	
	
	function render(){
		
	}
	
}
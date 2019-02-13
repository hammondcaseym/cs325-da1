"use strict"

window.onload = function() {
	
	var game = new Phaser.Game(800,600,Phaser.AUTO,'game',{preload:preload,create:create,update:update,render:render});
	var UP = 0;
	var DOWN = 1;
	var LEFT = -1;
	var RIGHT = 2;
	function preload(){
		//load the path to the assets to load them properly, and avoid crossOrigin throws
		game.load.path = 'assets/';
		game.load.crossOrigin = 'anonymous';
		
		//load zerosuit sample
		//game.load.image('zerosuit', 'Sprites/zerosuit.png');

		//load actual game assets like the character spritesheets and what-not
		game.load.image('female','Sprites/female.png');
		game.load.spritesheet('fm', 'Sprites/fm.png',64,64);
		game.load.spritesheet('m','Sprites/male_sheet.png',64,64);
		game.load.spritesheet('ma','Sprites/m_attack_sheet.png',192,192);
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
	var male;
	var male_attack;
		function scene2(){
		inScene2 = true;
		game.stage.backgroundColor = '#9ec8ef'; //makes background color slightly blue
		female = game.add.sprite(game.world.centerX-64,game.world.centerY,'fm');
		game.physics.enable(female, Phaser.Physics.ARCADE );
		female.anchor.setTo(0.5,0.5);
		female.body.collideWorldBounds = true;
		
		male = game.add.sprite(game.world.centerX+64,game.world.centerY,'m');
		game.physics.enable(male, Phaser.Physics.ARCADE );
		male.anchor.setTo(0.5,0.5);
		male.body.collideWorldBounds = true;
		
		
		
		//sprite.animations.add('name',[array of frames],frames/sec,boolean for loop);



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
				if(direction1!=LEFT){
					direction1 = LEFT;
					female.animations.add('walk_L', [117,118,119,120,121,122,123,124,125]);
					female.animations.play('walk_L',15,false);
				}else if(direction1 == LEFT){
					female.animations.play('walk_l', 15, false);
				}
				female.x -= 4;
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
				if(direction1!=RIGHT){
					direction1 = RIGHT;
					female.animations.add('walk_R', [143,144,145,146,147,148,149,150,151]);
					female.animations.play('walk_R',15,false);
				}else if(direction1 == RIGHT){
					female.animations.play('walk_R', 15, false);
				}
				female.x += 4;
			}

			else if (game.input.keyboard.isDown(Phaser.Keyboard.W))
			{
				if(direction1!=UP){
					direction1 = UP;
					female.animations.add('walk_U', [104,105,106,107,108,109,110,111,112]);
					female.animations.play('walk_U',15,false);
				}else if(direction1 == UP){
					female.animations.play('walk_U', 15, false);
				}
				female.y -= 4;
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
			{
				if(direction1!=DOWN){
					direction1 = DOWN;
					female.animations.add('walk_D', [130,131,132,133,134,135,136,137,138]);
					female.animations.play('walk_D',15,false);
				}else if(direction1 == DOWN){
					female.animations.play('walk_D', 15, false);
					
				}
				female.y += 4;
			} 
						
			
			else{	
				if(direction1==DOWN && game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						female.animations.add('attack_D', [234,235,236,237,238,239,240,241,242,243,244,245,246,182]);
						female.animations.play('attack_D',15,false);
				} else if(direction1 == UP && game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						female.animations.add('attack_U', [208,209,210,211,212,213,214,215,216,217,218,219,220,156]);
						female.animations.play('attack_U',15,false);
				}else if(direction1 == LEFT && game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						female.animations.add('attack_L', [221,222,223,224,225,226,227,228,229,230,231,232,233,169]);
						female.animations.play('attack_L',15,false);
				}else if((direction1 == RIGHT) && game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						female.animations.add('attack_R', [247,248,249,250,251,252,253,254,255,256,257,258,259,195]);
						female.animations.play('attack_R',15,false);
						
					}
			}
			
			
			/*
			
			END FEMALE MOVEMENT
			START MALE MOVEMENT
			
			*/
			
					
			
			if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
				if(direction2!=LEFT){
					direction2 = LEFT;
					male.animations.add('walk_L', [117,118,119,120,121,122,123,124,125]);
					male.animations.play('walk_L',15,false);
				}else if(direction2 == LEFT){
					male.animations.play('walk_l', 15, false);
				}
				male.x -= 4;
			}else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
				if(direction2!=RIGHT){
					direction2 = RIGHT;
					male.animations.add('walk_R', [143,144,145,146,147,148,149,150,151]);
					male.animations.play('walk_R',15,false);
				}else if(direction2 == RIGHT){
					male.animations.play('walk_R', 15, false);
				}
				male.x += 4;
			}else if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
			{
				if(direction2!=UP){
					direction2 = UP;
					male.animations.add('walk_U', [104,105,106,107,108,109,110,111,112]);
					male.animations.play('walk_U',15,false);
				}else if(direction2 == UP){
					male.animations.play('walk_U', 15, false);
				}
				male.y -= 4;
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
				if(direction2!=DOWN){
					direction2 = DOWN;
					male.animations.add('walk_D', [130,131,132,133,134,135,136,137,138]);
					male.animations.play('walk_D',15,false);
				}else if(direction2 == DOWN){
					male.animations.play('walk_D', 15, false);
					
				}
				male.y += 4;
			}else{	
				if(direction2==DOWN && game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)){
						male.animations.add('attack_D', [299,300,301,302,303,304,130]);
						male.animations.play('attack_D',15,false);
				} else if(direction2 == UP && game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)){
						male.animations.add('attack_U', [273,274,275,276,277,278,156]);
						male.animations.play('attack_U',15,false);
				}else if(direction2 == LEFT && game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)){
						male.animations.add('attack_L', [286,287,288,289,290,291,169]);
						male.animations.play('attack_L',15,false);
				}else if((direction2 == RIGHT) && game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)){
						male.animations.add('attack_R', [292,293,294,295,296,297,195]);
						male.animations.play('attack_R',15,false);
						
					}
			}
			
		
			}
			
		
	
		
	}
		

	
	
	function render(){
		
	}
	
}
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
		//load actual game assets like the character spritesheets and what-not
		game.load.spritesheet('button', 'Sprites/button.png',128,64);
		game.load.image('flake','Sprites/snowflake.png');
		game.load.image('female','Sprites/female.png');
		game.load.spritesheet('fm', 'Sprites/fm.png',64,64);
		game.load.spritesheet('m','Sprites/male_sheet.png',64,64);
		game.load.spritesheet('ma','Sprites/m_attack_sheet.png',192,192);
		game.load.spritesheet('skelly','Sprites/skelly.png',64,64);
		game.load.image('arrUp', 'Sprites/arrow_u.png');
		game.load.image('arrLeft','Sprites/arrow_L.png');
		game.load.image('arrRight','Sprites/arrow_r.png');
		game.load.image('arrDown','Sprites/arrow_d.png');
	}
		
	var player1, player2; //players
	var item; //collectible item
	var hp1, hp2; //hp amount for each player
	var direction1 = -1; //player 1's direction
	var direction2 = -1; //player 2's direction

	var timer = 6;
	var timer_ms;

	var text; //any text that appears on the screen
	var button; //button to press	
	var title, subtitle, dir_line1, dir_line2, dir_line3;
	
	
	function create(){
	
		game.stage.backgroundColor = '#9ec8ef'; //makes background color slightly blue
		
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

		game.time.desiredFps = 30;
	
		titleScreen();
		
	}
	
	function titleScreen(){
		
		var style_title = { font: "32px Forte", fill: "#000000"};
		var style_subtitle = {font: "24px Forte", fill: "#000000"};
		var style_dir = {font: "24px Corbel", fill: "#000000"};
		
		title = game.add.text(game.world.centerX-100, game.world.centerY-100, "FROST", style_title);
		subtitle = game.add.text(game.world.centerX-150, game.world.centerY-50, "A 2 Player Adventure Game", style_subtitle);
		
		dir_line1 = game.add.text(150, 300, "Player 1                                       Player 2", style_dir);
		dir_line2 = game.add.text(150, 350, "WASD for movement.          ARROW KEYS for movement.", style_dir);
		dir_line3 = game.add.text(150, 400,   "(hold)L-Shift for Attack        (hold)R-CTRL for Attack", style_dir);
		
		button = game.add.button(300, 100, 'button', scene2, this, 2,1,0);
		
	}

	var skelly;
	var skellies;
	var enemycount = 5;
	var inScene2 = false;
	var female;
	var male;
	var male_attack;
	
	
	function scene2(){
		//goFS();
		button.destroy();
		demoScene(title,subtitle,dir_line1,dir_line2);
		dir_line3.destroy();
			
			
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
		
		/*skelly = game.add.sprite(100,100,'skelly',[14]);
		game.physics.enable(skelly,Phaser.Physics.ARCADE);
		skelly.anchor.setTo(0.5,0.5);
		skelly.body.collideWorldBounds = true;*/

		//sprite.animations.add('name',[array of frames],frames/sec,boolean for loop);
		female.animations.add('fmwalk_L', [117,118,119,120,121,122,123,124,125]);
		female.animations.add('fmwalk_R', [143,144,145,146,147,148,149,150,151]);
		female.animations.add('fmwalk_U', [104,105,106,107,108,109,110,111,112]);
		female.animations.add('fmwalk_D', [130,131,132,133,134,135,136,137,138]);
		female.animations.add('fmattack_D', [234,235,236,237,238,239,240,241,242,243,244,245,246,182]);
		female.animations.add('fmattack_U', [208,209,210,211,212,213,214,215,216,217,218,219,220,156]);
		female.animations.add('fmattack_L', [221,222,223,224,225,226,227,228,229,230,231,232,233,169]);
		female.animations.add('fmattack_R', [247,248,249,250,251,252,253,254,255,256,257,258,259,195]);
		
		
		male.animations.add('walk_L', [117,118,119,120,121,122,123,124,125]);
		male.animations.add('walk_R', [143,144,145,146,147,148,149,150,151]);
		male.animations.add('walk_U', [104,105,106,107,108,109,110,111,112]);
		male.animations.add('walk_D', [130,131,132,133,134,135,136,137,138]);
		male.animations.add('attack_D', [299,300,301,302,303,304,130]);
		male.animations.add('attack_U', [273,274,275,276,277,278,156]);
		male.animations.add('attack_L', [286,287,288,289,290,291,169]);
		male.animations.add('attack_R', [292,293,294,295,296,297,195]);
		
		//add in enemies
		
		
		
		
		placeEnemies();


		
		
		
		
		
		
		
	}
	
	function placeEnemies(){
		
		var placeScale = 0.85;
		skelly = game.add.sprite(Math.random()*game.width*placeScale+game.width*(1.0-placeScale)/2.0, Math.random()*game.height*placeScale+game.width*(1.0-placeScale)/2.0,'skelly',14);
		
		skelly.animations.add('skel_L',[117,118,119,120,121,122,123,124,125]);
		skelly.animations.add('skel.R', [143,144,145,146,147,148,149,150,151]);
		skelly.animations.add('skel_U', [104,105,106,107,108,109,110,111,112]);
		skelly.animations.add('skel_D', [130,131,132,133,134,135,136,137,138]);
		
		//skelly.animations.play('skel_L', 15, true);
		//skellies = game.add.group();
		//skellies.createMultiple(5,'skelly',[14],null,true);

		console.log("enemies placed!");
		
		
	}
	
	
	
	
	
	function goFS(){
		    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }
	}
	
	function demoScene(w,x,y,z){
		//destroy previous scene so that it doesn't lag the game
		w.destroy();
		x.destroy();
		y.destroy();
		z.destroy();
		console.log("All items destroyed!");
	}
	

	var fmattacking = false;
	var mattacking = false;
	var fidle = true;
	var midle = true;
	
	function update(){
		
		if(inScene2){
			if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
				fmattacking = false;
				fidle = false;
				if(direction1!=LEFT){
					direction1 = LEFT;
					female.animations.play('fmwalk_L',15,true);
				}else if(direction1 == LEFT){
					female.animations.play('fmwalk_l', 15, true);
				}
				female.x -= 4;
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
				fmattacking = false;
				fidle = false;
				if(direction1!=RIGHT){
					direction1 = RIGHT;
					female.animations.play('fmwalk_R',15,true);
				}else if(direction1 == RIGHT){
					female.animations.play('fmwalk_R', 15, true);
				}
				female.x += 4;
			}

			else if (game.input.keyboard.isDown(Phaser.Keyboard.W))
			{	fidle = false;
				fmattacking = false;
				if(direction1!=UP){
					direction1 = UP;
					female.animations.play('fmwalk_U',15,true);
				}else if(direction1 == UP){
					female.animations.play('fmwalk_U', 15, true);
				}
				female.y -= 4;
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
			{	fidle = false;
				fmattacking = false;
				if(direction1!=DOWN){
					direction1 = DOWN;
					female.animations.play('fmwalk_D',15,true);
				}else if(direction1 == DOWN){
					female.animations.play('fmwalk_D', 15, true);
					
				}
				female.y += 4;
			} 
						
			
			else{	
				if(direction1==DOWN && game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						fidle = false;
						fmattacking = true;
						female.animations.play('fmattack_D',15,false);
				} else if(direction1 == UP && game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						fidle = false;
						fmattacking = true;
						female.animations.play('fmattack_U',15,false);
				}else if(direction1 == LEFT && game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						fidle = false;
						fmattacking = true;
						female.animations.play('fmattack_L',15,false);
				}else if((direction1 == RIGHT) && game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						fidle = false;
						fmattacking = true;
						female.animations.play('fmattack_R',15,false);
						
					}
				else{
					fidle = true;
					fmattacking = false;
				}
			}
			
			
			/*
			
			END FEMALE MOVEMENT
			START MALE MOVEMENT
			
			*/
			
					
			
			if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
				midle = false;
				mattacking = false;
				if(direction2!=LEFT){
					direction2 = LEFT;
					
					male.animations.play('walk_L',15,true);
				}else if(direction2 == LEFT){
					male.animations.play('walk_l', 15, true);
				}
				male.x -= 4;
			}else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
				midle = false;
				mattacking = false;
				if(direction2!=RIGHT){
					direction2 = RIGHT;
					
					male.animations.play('walk_R',15,true);
				}else if(direction2 == RIGHT){
					male.animations.play('walk_R', 15, true);
				}
				male.x += 4;
			}else if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
			{	midle = false;
				mattacking = false;
				if(direction2!=UP){
					direction2 = UP;
					
					male.animations.play('walk_U',15,true);
				}else if(direction2 == UP){
					male.animations.play('walk_U', 15, true);
				}
				male.y -= 4;
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
				midle = false;
				mattacking = false;
				if(direction2!=DOWN){
					direction2 = DOWN;
					
					male.animations.play('walk_D',15,true);
				}else if(direction2 == DOWN){
					male.animations.play('walk_D', 15, true);
					
				}
				male.y += 4;
			}else{	
				if(direction2==DOWN && game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)){
						midle = false;
						mattacking = true;
						male.animations.play('attack_D',15,false);
				} else if(direction2 == UP && game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)){
						midle = false;
						mattacking = true;
						male.animations.play('attack_U',15,false);
				}else if(direction2 == LEFT && game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)){
						midle = false;
						mattacking = true;
						male.animations.play('attack_L',15,false);
				}else if((direction2 == RIGHT) && game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)){
						midle = false;
						mattacking = true;
						male.animations.play('attack_R',15,false);
						
					}
					else{
						mattacking = false;
						midle = true;
					}
			}
			
			if(midle){
				if(direction2 == UP){
					male.frame = 156;
				} else if(direction2 == LEFT){
					male.frame = 169;
				} else if(direction2 == RIGHT){
					male.frame = 195;
				} else if(direction2 == DOWN){
					male.frame = 130;
				}
				
			}
			
			if(fidle){
				if(direction1 == UP){
					female.frame = 156;
				} else if(direction1 == LEFT){
					female.frame = 169;
				} else if(direction1 == RIGHT){
					female.frame = 195;
				} else if(direction1 == DOWN){
					female.frame = 130;
				}
				
			}
			
		
			
		}	
		
	
		
	}
		

	
	
	function render(){
		game.debug.text(game.time.suggestedFps, 32, 32);
	}
	
}
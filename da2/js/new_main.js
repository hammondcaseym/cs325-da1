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
		game.load.image('arrow','Sprites/arrow_r.png');
		game.load.image('bg','Sprites/background.png');
		
		game.load.audio('arr','sounds/arrow.wav');
		game.load.audio('sword','sounds/sword.wav');
		game.load.audio('bones','sounds/bones.wav');
		game.load.audio('groan','sounds/groan.wav');
	}

	var player1, player2; //players
	var item; //collectible item
	var hp1 = 100;
	var hp2 = 100; //hp amount for each player
	var direction1 = -1; //player 1's direction
	var direction2 = -1; //player 2's direction

	var timer = 6;
	var timer_ms;

	var text; //any text that appears on the screen
	var button; //button to press
	var title, subtitle, dir_line1, dir_line2, dir_line3;

	var arrow_sound, bones, swing,groan;

	function create(){
		
		arrow_sound = game.add.audio('arr');
		bones = game.add.audio('bones');
		swing = game.add.audio('sword');
		groan = game.add.audio('groan');
		game.stage.backgroundColor = '#9ec8ef'; //makes background color slightly blue

		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

		game.time.desiredFps = 30;

		titleScreen();
		button = game.add.button(300, 100, 'button', scene2, this, 2,1,0);
	}

	function titleScreen(){

		var style_title = { font: "32px Forte", fill: "#000000"};
		var style_subtitle = {font: "24px Forte", fill: "#000000"};
		var style_dir = {font: "24px Corbel", fill: "#000000"};

		title = game.add.text(game.world.centerX-100, game.world.centerY-100, "FROST", style_title);
		subtitle = game.add.text(game.world.centerX-150, game.world.centerY-50, "A 2 Player Game", style_subtitle);

		dir_line1 = game.add.text(150, 300, "Player 1                                       Player 2", style_dir);
		dir_line2 = game.add.text(150, 350, "WASD for movement.          ARROW KEYS for movement.", style_dir);
		dir_line3 = game.add.text(150, 400,   "(hold)SHIFT for Attack        (hold)?/ for Attack", style_dir);



	}

	var skelly;
	var skellies;
	var enemycount = 10;
	var inScene2 = false;
	var female;
	var male;
	var male_attack;
	var arrow;
	var arrows;
	var scorep1 = 0;
	var scorep2 = 0;
	var scorep1_text;
	var scorep2_text;

	var pointsp1;
	var pointsp2;
	function scene2(){
		goFS();
		scorep1 = 0;
		scorep2 = 0;
		button.destroy();
		demoScene(title,subtitle,dir_line1,dir_line2);
		dir_line3.destroy();
		game.add.sprite(0,0,'bg');
		var style_dir = {font: "24px Corbel", fill: "#000000"};
		var dir_line4 = game.add.text(20, 565,"Press the START button to restart the game!",style_dir);
		button = game.add.button(600, 20, 'button', scene2, this, 2,1,0);
		button.scale.x = .5;
		button.scale.y = .5;
		var style = { font: "20px Verdana", fill: "#000000", align: "center"};
		scorep1_text = game.add.text(25,25,"Player 1 Score: ", style);
		scorep2_text = game.add.text(25,50,"Player 2 Score: ", style);

		pointsp1 = game.add.text(200,25,scorep1, style);
		pointsp2 = game.add.text(200,50,scorep2, style);

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

/*
		arrows = game.add.group();
		arrows.enableBody = true;
		arrows.physicsBodyType = Phaser.Physics.ARCADE;
		arrows.createMultiple(100,'arrow');
		arrows.setAll('anchor.x', 0.1);
		arrows.setAll('anchor.y', 0.2);
		arrows.setAll('outOfBoundsKill', true);
		arrows.setAll('checkWorldBounds', true);
*/
		arrow = game.add.weapon(1, 'arrow');
		arrow.enableBody = true;
		arrow.physicsBodyType = Phaser.Physics.ARCADE;
		arrow.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		//arrow.bullKillDistance = 60;
		arrow.bulletSpeed = 400;
		arrow.fireRate = 600;









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

		skellies = game.add.group();
		skellies.enableBody = true;
		var placeScale = 0.85;
		for(var i = 0; i < 10; i++){
			skelly = skellies.create(Math.random()*game.width*placeScale+game.width*(1.0-placeScale)/2.0,
			Math.random()*game.height*placeScale+game.width*(1.0-placeScale)/2.0, 'skelly');
		}
/*
		skelly = game.add.sprite(Math.random()*game.width*placeScale+game.width*(1.0-placeScale)/2.0, Math.random()*game.height*placeScale+game.width*(1.0-placeScale)/2.0,'skelly',14);
*/

		skellies.forEach(function(skelly){
			skelly.anchor.setTo(0.3,0.5);


			skelly.animations.add('skel_L',[117,118,119,120,121,122,123,124,125]);
			skelly.animations.add('skel_R', [143,144,145,146,147,148,149,150,151]);
			skelly.animations.add('skel_U', [104,105,106,107,108,109,110,111,112]);
			skelly.animations.add('skel_D', [130,131,132,133,134,135,136,137,138]);
			skelly.animations.add('skel_attL', [65,66,67,68,69,70,71,71,65]);
			skelly.animations.add('skel_attR', [91,92,93,94,95,96,97,98,91]);
			skelly.animations.add('skel_ded', [260,261,262,263,264,265]);
		},this);



		//skelly.animations.play('skel_L', 15, true);
		//skellies = game.add.group();
		//skellies.createMultiple(5,'skelly',[14],null,true);

		console.log("enemies placed!");


	}

	function goFS(){
		    if (game.scale.isFullScreen)
    {
        //game.scale.stopFullScreen();
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
	var fhp = 100;
	var mhp = 100;



	function update(){

		if(inScene2){



			skellies.forEach(function(skelly){
				//move skellies towards player



				var x = female.x;
				var y = female.y;

				var distance = Math.sqrt((skelly.x - female.x)*(skelly.x - female.x)+(skelly.y - female.y)*(skelly.y - female.y));

				var distancem = Math.sqrt((skelly.x - male.x)*(skelly.x - male.x)+(skelly.y - male.y)*(skelly.y - male.y));

				if(distancem < distance){
					distance = distancem;
					x = male.x;
					y = male.y;
				}


				if(distance <= 200 && distance > 50){
					var dirx = x - skelly.x;
					var diry = y - skelly.y;
					var mag = Math.sqrt(dirx*dirx + diry*diry);

					dirx/=mag;
					diry/=mag;

					skelly.x+=dirx;
					skelly.y+=diry;


					if(dirx <= 0){

							skelly.animations.play('skel_L',15,false);
											//console.log('should be moving left');
						
							} else {

										skelly.animations.play('skel_R',15,false);
											//console.log('should be moving right');
											
							}


				}


				if(distance <= 50 && !mattacking){
					//console.log('should be attacking');

					var dirx = x - skelly.x;
					//console.log(dirx);
						if(dirx < 0){
							skelly.animations.play('skel_attL',15,false);


						} else {
							skelly.animations.play('skel_attR',15,false);
						}
				}
				//male attacking and killing close range
				if(mattacking == true && distancem <= 50){
					skelly.animations.play('skel_ded', 15, false, true);
					scorep2 += 100;
					pointsp2.setText(scorep2);
					if(bones.isPlaying){
						}else{
							bones.play();
						}


				}



				if(fmattacking){
					if(direction1 == DOWN){
						arrow.trackSprite(female, 3, 50);
						arrow.fireAngle = Phaser.ANGLE_DOWN;
						arrow.fire();
						
					}else if(direction1 == UP){
						arrow.trackSprite(female, 3, -50);
						arrow.fireAngle = Phaser.ANGLE_UP;
						arrow.fire();
						
					}else if(direction1 == LEFT){
						arrow.trackSprite(female, -50, 3);
						arrow.fireAngle = Phaser.ANGLE_LEFT;
						arrow.fire();
						
					} else if(direction1 == RIGHT){
						arrow.trackSprite(female, 50, 3);
						arrow.fireAngle = Phaser.ANGLE_RIGHT;
						arrow.fire();
						
					}
					skellies.forEach(function(skelly){
						if((Math.sqrt((skelly.x - arrow.x)*(skelly.x - arrow.x) + (skelly.y - arrow.y)*(skelly.y - arrow.y)) <= 40)) {
							console.log("Within Proximity!");
							skelly.kill();
							scorep1 += 200;
							pointsp1.setText(scorep1);
							if(bones.isPlaying){
							}else{
								bones.play();
							}
						}
					},this);

				}

				//console.log(skelly);
			},this);







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
						female.animations.play('fmattack_D',30,false);
						if(arrow_sound.isPlaying){
							//arrow_sound.play();
						}else{
							arrow_sound.play();
						}
				} else if(direction1 == UP && game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						fidle = false;
						fmattacking = true;
						female.animations.play('fmattack_U',30,false);
						if(arrow_sound.isPlaying){
							//arrow_sound.play();
						}else{
							arrow_sound.play();
						}
				}else if(direction1 == LEFT && game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						fidle = false;
						fmattacking = true;
						female.animations.play('fmattack_L',30,false);
						if(arrow_sound.isPlaying){
							//arrow_sound.play();
						}else{
							arrow_sound.play();
						}

				}else if((direction1 == RIGHT) && game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						fidle = false;
						fmattacking = true;
						female.animations.play('fmattack_R',30,false);
						if(arrow_sound.isPlaying){
							//arrow_sound.play();
						}else{
							arrow_sound.play();
						}

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
				if(direction2==DOWN && game.input.keyboard.isDown(Phaser.Keyboard.QUESTION_MARK)){
						midle = false;
						mattacking = true;
						male.animations.play('attack_D',15,false);
						if(swing.isPlaying){
							//arrow_sound.play();
						}else{
							swing.play();
						}
				} else if(direction2 == UP && game.input.keyboard.isDown(Phaser.Keyboard.QUESTION_MARK)){
						midle = false;
						mattacking = true;
						male.animations.play('attack_U',15,false);
						if(swing.isPlaying){
							//arrow_sound.play();
						}else{
							swing.play();
						}
				}else if(direction2 == LEFT && game.input.keyboard.isDown(Phaser.Keyboard.QUESTION_MARK)){
						midle = false;
						mattacking = true;
						male.animations.play('attack_L',15,false);
						if(swing.isPlaying){
							//arrow_sound.play();
						}else{
							swing.play();
						}
				}else if((direction2 == RIGHT) && game.input.keyboard.isDown(Phaser.Keyboard.QUESTION_MARK)){
						midle = false;
						mattacking = true;
						male.animations.play('attack_R',15,false);
						if(swing.isPlaying){
							//arrow_sound.play();
						}else{
							swing.play();
						}
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

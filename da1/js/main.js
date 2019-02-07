"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render} );
    
    function preload() {
        // Load an image and call it 'logo'.
		game.load.path = 'assets/';
        game.load.crossOrigin = 'anonymous';
        game.load.image('bg', 'Sprites/Background_Stolen.png');
        game.load.image( 'logo', 'Sprites/Flamango_Test.gif');
		game.load.path = 'assets/';
		game.load.spritesheet('button', 'buttons/button_click.png', 128, 64);
		game.load.spritesheet('flamango', 'Sprites/Mango_Idle_Sheet.png', 32, 64, 2);
		game.load.image('background', 'Sprites/background.png');
		game.load.spritesheet('item', 'Sprites/mango.gif', 32,32);
		game.load.spritesheet('finish','Sprites/finish.gif',800,600);
    }
    
	
    var bouncy;
	var bg;
    var button;
	var text;
	var direction = 1;
    function create() {
		 
        // Create a sprite at the center of the screen using the 'logo' image.
		
		//bg = game.add.sprite(game.world.centerX - 400, game.world.centerY - 300, 'bg');
		game.stage.backgroundColor = '#182d3b';
		button = game.add.button(game.world.centerX - 64, 400, 'button', startGame, this, 2, 1, 0);  
																	//1 = idle, 0 = hover, 2 = click
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        text = game.add.text( game.world.centerX, 15, "Frick off", style );
        text.anchor.setTo( 0.5, 0.0 );
		
		
    }
	
	function startGame(){
		console.log('clicked!');
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.input.onDown.add(goFS, this);
		//get rid of previous assets as to not cick on buttons after use
		button.pendingDestroy = true;
		console.log('button destroyed!');
		//bg.destroy();
		console.log('background1 removed');
		text.destroy();
		console.log('title destroyed!');
		
		//unable to remove moving sprite, but is hidden when new scene appears so whatever i guess
		
		loadNew(); //go to new scene
	}
	var mango;
	var item;
	var items;
	var gameStarted = false;
	function loadNew(){
				//load new scene
		game.add.sprite(game.world.centerX - 400, game.world.centerY - 300, 'background');

		//mango.anchor.setTo(0.5,0.5);
		
		beginPlay();
		
	}
	var jumpTimer = 0;
	var points = 0;
	var mangoes = 0;
	var pointText;
	var mangoText;
	var timer_ms;
	var timer = 20;
	var timer_text;
	var timer_label;
	var itemCount = 20;
	function beginPlay(){
		
		game.time.desiredFps = 30;
		//game.physics.arcade.gravity.y = 200;
		//the following grouping and randomly placing sprites code is from https://codepen.io/Samid737/pen/RLQBqM?editors=1010
		
		placeItems();
			
		//item = game.add.sprite(game.world.centerX, game.world.centerY, 'item');
		mango = game.add.sprite(game.world.centerX-280, game.world.centerY-150, 'flamango');
		game.physics.enable(mango, Phaser.Physics.ARCADE );
		//mango.body.bounce.y = 0.1;
		mango.anchor.setTo(0.5,0.5);
		mango.body.collideWorldBounds = true;
		//mango.scale.setTo(2,2);
		var idle = mango.animations.add('idle');
		mango.animations.play('idle', 2, true);
		gameStarted = true;
		var style = { font: "25px Verdana", fill: "#9999ff", align: "left" };
		text = game.add.text( game.world.centerX-200, 15, "Points:  ", style );
        text.anchor.setTo( 0.5, 0.0 );
		text = game.add.text( game.world.centerX+200, 15, "Mangoes:  ", style );
        text.anchor.setTo( 0.5, 0.0 );
		pointText = game.add.text( game.world.centerX-140, 15, points, style );
        pointText.anchor.setTo( 0.2, 0.0 );
		mangoText = game.add.text( game.world.centerX+270, 15, mangoes, style );
        mangoText.anchor.setTo( 0.2, 0.0 );
		timer_label = game.add.text( game.world.centerX-40, 15, "Time:  ", style );
        timer_label.anchor.setTo( 0.2, 0.0 );
		timer_text = game.add.text( game.world.centerX+25, 15, timer, style );
        timer_text.anchor.setTo( 0.2, 0.0 );
		timer_ms = game.time.create(false);
		timer_ms.loop(1500,update_ms,this);
		
		timer_ms.start();

	}
	
	
	function placeItems(){
		
		var placeScale = 0.85;
		items = game.add.group();
		items.createMultiple(20,'item',null,true);
		items.forEach(function(item){
			item.position=new Phaser.Point(
				Math.random()*game.width*placeScale+game.width*(1.0-placeScale)/2.0,
				Math.random()*game.height*placeScale+game.width*(1.0-placeScale)/2.0
				)},this);
				console.log("items placed!");
		
	}
	function update_ms(){
		if(timer > 0){
			timer --;
		} else {
			endGame();
		}
		
	}
	var finish;
	var score;
	function endGame(){
		finish = game.add.sprite(game.world.centerX-400, game.world.centerY-300, 'finish');
		var style = { font: "35px Verdana", fill: "#FFFFFF", align: "center" };
		score = game.add.text( game.world.centerX-100, 265, "SCORE:  ", style);
		var final = game.add.text(game.world.centerX + 50, 265, points, style);
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
	
	
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
    
		
		if (game.input.keyboard.isDown(Phaser.Keyboard.A))
		{
			if(direction==0) {
				direction = 1;
				mango.scale.x *= -1;
			}
			mango.x -= 4;
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
		{
			if (direction==1) {
				direction=0;
				mango.scale.x *= -1;
			}
			mango.x += 4;
		}

		if (game.input.keyboard.isDown(Phaser.Keyboard.W))
		{
			mango.y -= 4;
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
		{
			mango.y += 4;
		}
		if (gameStarted) {
			timer_text.setText(timer);
			items.forEach(function(item){
				if((Math.sqrt((item.x - mango.x)*(item.x - mango.x) + (item.y - mango.y)*(item.y - mango.y)) <= 30.0) && timer > 0) {
					console.log("Within Proximity!");
					item.destroy();
					points += 100;
					pointText.setText(points);
					console.log(points);
					mangoes += 1;
					mangoText.setText(mangoes);
					console.log(mangoes);
					itemCount--;
					console.log("item count = " + itemCount);
					if(itemCount ==0) {
						placeItems();
						itemCount = 20;
					}
					
				}
			},this);
		}
	}
	
	function render () {

    game.debug.text(game.time.suggestedFps, 32, 32);

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}
	

	
};

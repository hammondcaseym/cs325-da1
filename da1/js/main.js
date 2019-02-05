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
		game.load.image('flamango', 'Sprites/Flamango_Test.gif');
		game.load.image('newBG', 'Sprites/newBG.jpg');
    }
    
	
    var bouncy;
	var bg;
    var button;
	var text;
    function create() {
		 
        // Create a sprite at the center of the screen using the 'logo' image.
		
		bg = game.add.sprite(game.world.centerX - 400, game.world.centerY - 300, 'bg');
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
		bg.destroy();
		console.log('background1 removed');
		text.destroy();
		console.log('title destroyed!');
		
		//unable to remove moving sprite, but is hidden when new scene appears so whatever i guess
		
		loadNew(); //go to new scene
	}
	var mango;
	function loadNew(){
				//load new scene
		game.add.sprite(game.world.centerX - 400, game.world.centerY - 300, 'newBG');

		//mango.anchor.setTo(0.5,0.5);
		
		beginPlay();
		
	}
	var jumpTimer = 0;
	function beginPlay(){
		
		game.time.desiredFps = 30;
		game.physics.arcade.gravity.y = 200;
		mango = game.add.sprite(game.world.centerX-280, game.world.centerY-150, 'flamango');
		game.physics.enable(mango, Phaser.Physics.ARCADE );
		//mango.body.bounce.y = 0.1;
		mango.body.collideWorldBounds = true;

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
        mango.body.velocity.x = -150;
		console.log('moved LEFT!');
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        mango.body.velocity.x = 150;
		console.log('moved RIGHT!');
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
        mango.y -= 4;
		console.log('moved UP!');
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
        mango.y += 4;
		console.log('moved DOWN!');
    }
	else if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && mango.body.onFloor() && game.time.now > jumpTimer){
		mango.body.velocity.y = -200;
		jumpTimer = game.time.now + 750;
		
	}
	
	
	}
	
	function render () {

    game.debug.text(game.time.suggestedFps, 32, 32);

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}
	

	
};

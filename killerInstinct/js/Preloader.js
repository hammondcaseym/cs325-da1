"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
			
			
            background = game.add.sprite(0, 0, 'titlecard');
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            
            game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
            game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
            //	+ lots of other required assets here
            //game.load.image( 'logo', 'assets/phaser.png' );
			
			game.load.image('crimescene', 'assets/crimescene.png');
			game.load.image('inter_room', 'assets/inter_room.png');
			
			
			game.load.image('inspection', 'assets/examine_window.png');
			
			
			game.load.spritesheet('button', 'assets/button.png', 270, 65);
			game.load.spritesheet('q_button', 'assets/question_button.png', 256, 64);
			game.load.spritesheet('continue', 'assets/continue.png', 188, 64);
			
			
				game.load.image('painting','assets/painting_debug.png');
				game.load.image('computer','assets/computer_debug.png');
				game.load.image('blood_on_glass','assets/glass_blood_debug.png');
				game.load.image('bullet','assets/bullet_debug.png');
				game.load.image('weapon','assets/weapon_debug.png');
				game.load.image('victim','assets/victim_debug.png');
				game.load.image('wound','assets/wound_debug.png');
				game.load.image('glass','assets/glass_debug.png');
				game.load.image('police2','assets/police2_debug.png');
				game.load.image('police1','assets/police1_debug.png');
				game.load.image('footprints','assets/footprints_debug.png');
				
							
				game.load.image('painting_closeup','assets/painting_closeup.png');
				game.load.image('bullet_closeup', 'assets/bullet_closeup.png');
				game.load.image('footprints_closeup', 'assets/footprints_closeup.png');
				game.load.image('victim_closeup', 'assets/victim_closeup.png');
				game.load.image('computer_closeup', 'assets/computer_closeup.png');
				game.load.image('wound_closeup', 'assets/wound_closeup.png');
				game.load.image('police1_closeup', 'assets/police1_closeup.png');
				game.load.image('police2_closeup', 'assets/police2_closeup.png');
				game.load.image('shotgun_closeup', 'assets/shotgun_closeup.png');
				game.load.image('blood_on_glass_closeup', 'assets/blood_on_glass_closeup.png');
				game.load.image('glass_closeup', 'assets/broken_glass_closeup.png');
				
				game.load.image('suspect1', 'assets/suspect1.png');
				game.load.image('suspect2', 'assets/suspect2.png');
				game.load.image('suspect3', 'assets/suspect3.png');
				
				
				

			

        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            if (game.cache.isSoundDecoded('titleMusic') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};

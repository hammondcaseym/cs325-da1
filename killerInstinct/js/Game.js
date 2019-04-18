"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    //var bouncy = null;
	

	var ev0 = null;
	var ev1 = null;
	var ev2 = null;
	var ev3 = null;
	var ev4 = null;
	var ev5 = null;
	var ev6 = null;
	var ev7 = null;
	var ev8 = null;
	var ev9 = null;
	var ev10 = null;
	
	var iv0 = null;
	var iv1 = null;
	var iv2 = null;
	var iv3 = null;
	var iv4 = null;
	var iv5 = null;
	var iv6 = null;
	var iv7 = null;
	var iv8 = null;
	var iv9 = null;
	var iv10 = null;
	
	var text0 = null;
	var text1 = null;
	var text2 = null;
	var text3 = null;
	var text4 = null;
	var text5 = null;
	var text6 = null;
	var text7 = null;
	var text8 = null;
	var text9 = null;
	var text10 = null;
	
	var insp_text = null;
	//var finished = false;
	
	var insp = null;
	var quitInspectButton = null;
	var inInspection = false;
	
	var collected = 0;
	var total = 11;
	
	
	var score1 = collected;
	var ev0Collected = false;
	var ev1Collected = false;
	var ev0Collected = false;
	var ev2Collected = false;
	var ev3Collected = false;
	var ev4Collected = false;
	var ev5Collected = false;
	var ev6Collected = false;
	var ev7Collected = false;
	var ev8Collected = false;
	var ev9Collected = false;
	var ev10Collected = false;
	
	var in_interrogation = 0;
	
	var background = null;
	
	var suspect1 = null;
	var suspect2 = null;
	var suspect3 = null;
	
	var qs1 = null;
	var qs2 = null;
	var qs3 = null;
	
	var guess = null;

	
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
	
	function interrogate(suspect){
		in_interrogation ++;
		
		game.add.sprite(0,0,'inter_room');
		
		suspect1 = game.add.image(146,120, 'suspect1'); 
		suspect2 = game.add.image(311,120, 'suspect2');
		suspect3 = game.add.image(462, 120, 'suspect3');
		
		suspect1.inputEnabled = true;
		suspect2.inputEnabled = true;
		suspect3.inputEnabled = true;
		
		
		in_interrogation++;
	}
	
	function question(suspect){
		
		console.log("in questioning mode");
		console.log(suspect);
		insp = game.add.sprite(0, 0, 'inspection');
		insp.alpha = 1.0;
		
	var style = { font: "bold 14px Verdana", fill: "#ffffff", align: "left", wordWrap: true, wordWrapWidth: 200 };
		
		
		if(suspect.key == 'suspect1'){
			qs1 = game.add.sprite(100,100,'suspect1');
			qs1.scale.setTo(1.5,1.5);
			console.log("questioning suspect: " + suspect);
			insp_text = game.add.text(545, 150, "Derek Billingslea, Age: 45, Sex: Male, Weight: 253 lbs, Height: 179 cm, Fingerprint Pattern: Loop, Blood Type: A-Positive", style );
		}else if(suspect.key == 'suspect2'){
			qs2 = game.add.sprite(100,100,'suspect2');
			qs2.scale.setTo(1.5,1.5);
						console.log("questioning suspect: " + suspect);
			insp_text = game.add.text(545, 150, "Harold Jones, Age: 42, Sex: Male, Weight: 188 lbs, Height: 181 cm, Fingerprint Pattern: Whorl, Blood Type: O-Negative", style );
		}else if(suspect.key == 'suspect3'){
			qs3 = game.add.sprite(100,100,'suspect3');
			qs3.scale.setTo(1.5,1.5);
						console.log("questioning suspect: " + suspect);
			insp_text = game.add.text(545, 150, "Michelle Cheng, Age: 36, Sex: Female, Weight: 147 lbs, Height: 163 cm, Fingerprint Pattern: Loop, Blood Type: A-Positive", style );
		}
		
		quitInspectButton = game.add.button(110,335,'button',closeQuestioning,this,2,1,0); 
		
		
		guess = game.add.button(500,50,'guess',guessing,this,2,1,0);
		
		 
		
	}
	
	function closeQuestioning(){
		insp.alpha = 0.0;
		quitInspectButton.destroy();
		guess.destroy();
		if(qs1!=null) qs1.destroy();
		if(qs2!=null) qs2.destroy();
		if(qs3!=null) qs3.destroy();
		
		if(insp_text != null) insp_text.destroy();
	}
	
	function guessing(){
		//insp.alpha = 0.0;
		quitInspectButton.destroy();
		guess.destroy();
		if(qs1!=null) {
			insp_text.setText("Derek was NOT the killer...                          Hit Continue at the Bottom to guess again!");
			
		}
		if(qs2!=null) {
			insp_text.setText("Harold was NOT the killer...                          Hit Continue at the Bottom to guess again!");
			
		}
		if(qs3!=null) {
			insp_text.setText("You were right!  Michelle WAS the killer!");
		}
		
		
	}
	
	function inspect(i){

			inInspection = true;
			insp.alpha = 1;

			console.log(i);
			console.log("inspecting");
			
			var style = { font: "bold 14px Verdana", fill: "#ffffff", align: "left", wordWrap: true, wordWrapWidth: 200 };
			
			switch(i.key){
				case "painting": console.log("inspecting painting.");
				iv0 = game.add.sprite(115,100,'painting_closeup');
				insp_text = game.add.text(545, 150, "A colorful painting... Seems like the owner liked classic works...", style );
				if(!ev0Collected) collected++;
				ev0Collected = true;
				break;
				case "computer": console.log("inspecting computer.");
				iv1 = game.add.sprite(125,100,'computer_closeup');
				insp_text = game.add.text(545, 150, "An old computer with a CRT display.  It's turned off, and doesn't seem to be working. Dust covers it...", style );
				if(!ev1Collected) collected++;
				ev1Collected = true;
				break;
				case "blood_on_glass": console.log("inspecting blood_on_glass.");
				iv2 = game.add.sprite(125,100,'blood_on_glass_closeup');
				insp_text = game.add.text(545, 150, "There's blood on the broken glass of the window... It's A-Positive.", style );
				if(!ev2Collected) collected++;
				ev2Collected = true;
				break;
				case "bullet": console.log("inspecting bullet.");
				iv3 = game.add.sprite(125,100,'bullet_closeup');
				insp_text = game.add.text(545, 150, "A shell casing, it's empty.  2 were found.", style );
				if(!ev3Collected) collected++;
				ev3Collected = true;
				break;
				case "weapon": console.log("inspecting weapon.");
				iv4 = game.add.sprite(115,115,'shotgun_closeup');
				iv4.scale.setTo(1.3,1.3);
				insp_text = game.add.text(545, 150, "A double-barrel shotgun... it's empty.  Perhaps the user was going to reload?  2 sets of fingerprints were found.  1 loop pattern and 1 whorl pattern.", style );
				if(!ev4Collected) collected++;
				ev4Collected = true;
				break;
				case "victim": console.log("inspecting victim.");
				iv5 = game.add.sprite(125,100,'victim_closeup');
				insp_text = game.add.text(545, 150, "The victim: Charles Harrelson.  Age: 36, Sex: Male, Bloodtype: O-Negative, Fingerprint pattern: Whorl, Cause of Death: Shotgun wound to the chest at close range. Long, dark hair is found on his clothes...", style );
				if(!ev5Collected) collected++;
				ev5Collected = true;
				break;
				case "wound": console.log("inspecting wound.");
				iv6 = game.add.sprite(125,100,'wound_closeup');
				insp_text = game.add.text(545, 150, "Shotgun wound, close range, buckshot.", style );
				if(!ev6Collected) collected++;
				ev6Collected = true;
				break;
				case "glass": console.log("inspecting glass.");
				iv7 = game.add.sprite(125,100,'glass_closeup');
				insp_text = game.add.text(545, 150, "Broken glass on the inside of the house.  It was probably broken from the outside, intruder could have entered here.", style );
				if(!ev7Collected) collected++;
				ev7Collected = true;
				break;
				case "police2": console.log("inspecting police2.");
				iv8 = game.add.sprite(125,100,'police2_closeup');
				insp_text = game.add.text(545, 150, "Officer Jackson... He says he receieved the call to this scene.  Caller heard a loud gunshot after some arguing.", style );
				if(!ev8Collected) collected++;
				ev8Collected = true;
				break;
				case "police1": console.log("inspecting police1.");
				iv9 = game.add.sprite(125,100,'police1_closeup');
				insp_text = game.add.text(545, 150, "Officer Miles... He says that when he got here, the victim had been laying on his stomach.  They flipped him to get an ID on him.  It's against protocol to tamper with an active crime scene.", style );
				if(!ev9Collected) collected++;
				ev9Collected = true;
				break;
				case "footprints": console.log("inspecting footprints.");
				iv10 = game.add.sprite(125,100,'footprints_closeup');
				insp_text = game.add.text(545, 150, "The footprints start in the blood of the victim and travel back to the window.  Size 10 mens' shoes, probably running shoes by the look of the treads.  They are deep in the carpet, the person who tracked them may have been heavy-set.", style );
				if(!ev10Collected) collected++;
				ev10Collected = true;
				break;
				default: console.log("other");

			}
			quitInspectButton = game.add.button(129,335,'button',closeInspect,this,2,1,0); 
			

			
	}
	
	function closeInspect(){
		
		insp.alpha = 0.0;
		quitInspectButton.destroy();
		inInspection = false;
		if(iv0!=null) iv0.destroy();
		if(iv1!=null) iv1.destroy();
		if(iv2!=null) iv2.destroy();
		if(iv3!=null) iv3.destroy();
		if(iv4!=null) iv4.destroy();
		if(iv5!=null) iv5.destroy();
		if(iv6!=null) iv6.destroy();
		if(iv7!=null) iv7.destroy();
		if(iv8!=null) iv8.destroy();
		if(iv9!=null) iv9.destroy();
		if(iv10!=null) iv10.destroy();
		if(insp_text != null) insp_text.destroy();
	}
	

    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Create a sprite at the center of the screen using the 'logo' image.
            //bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            //bouncy.anchor.setTo( 0.5, 0.5 );
			
			background = game.add.sprite(0, 0, 'crimescene');
			
			insp = game.add.sprite(0, 0, 'inspection');
			insp.alpha = 0.0;

			var cont = game.add.button(25,550,'continue',interrogate,this,2,1,0); 
			cont.scale.setTo(1.0,0.75);
			
			
            
            // Turn on the arcade physics engine for this sprite.
            //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
            // Make it bounce off of the world bounds.
            //bouncy.body.collideWorldBounds = true;
            
            // Add some text using a CSS style.
            // Center it in X, and position its top 15 pixels from the top of the world.

			
            //ev0.visible = false;
			//finished = true;
			ev0 = game.add.sprite(300,103,'painting');
				ev0.alpha = 0.0;
				ev0.anchor.set(0.0);
				ev0.inputEnabled = true;
			ev1 = game.add.sprite(438,158,'computer');
				ev1.alpha = 0.0;
				ev1.anchor.set(0.0);
				ev1.inputEnabled = true;
			ev2 = game.add.sprite(676, 168, 'blood_on_glass');
				ev2.alpha = 0.0;
				ev2.anchor.set(0.0);
				ev2.inputEnabled = true;
			ev3 = game.add.sprite(322,381,'bullet');
				ev3.alpha = 0.0;
				ev3.anchor.set(0.0);
				ev3.inputEnabled = true;
			ev4 = game.add.sprite(362,308,'weapon');
				ev4.alpha = 0.0;
				ev4.anchor.set(0.0);
				ev4.inputEnabled = true;
			ev5 = game.add.sprite(479,316,'victim');
				ev5.alpha = 0.0;
				ev5.anchor.set(0.0);
				ev5.inputEnabled = true;
			ev6 = game.add.sprite(506,341,'wound');
				ev6.alpha = 0.0;
				ev6.anchor.set(0.0);
				ev6.inputEnabled = true;
			ev7 = game.add.sprite(609,278,'glass');
				ev7.alpha = 0.0;
				ev7.anchor.set(0.0);
				ev7.inputEnabled = true;
			ev8 = game.add.sprite(189,145,'police2');
				ev8.alpha = 0.0;
				ev8.anchor.set(0.0);
				ev8.inputEnabled = true;
			ev9 = game.add.sprite(123,156,'police1');
				ev9.alpha = 0.0;
				ev9.anchor.set(0.0);
				ev9.inputEnabled = true;
			ev10 = game.add.sprite(509,423,'footprints');
				ev10.alpha = 0.0;
				ev10.anchor.set(0.0);
				ev10.inputEnabled = true;
				
			var style = { font: "25px Verdana", fill: "#ffffff", align: "left" };
			var score = game.add.text(450, 550, "Evidence Collected: ", style );
			score1 = game.add.text(700, 550, collected, style);
			var score2 = game.add.text(725, 550, "/" + total, style);
			
            text0 = game.add.text(25, 510, "A colorful painting...", style );
				text0.alpha = 0.0;
				//text0.anchor.setTo( 0.5, 0.0 );			
			
            text1 = game.add.text(25, 510, "An old computer.  Quite the dinosaur...", style );
				text1.alpha = 0.0;
				//text1.anchor.setTo( 0.5, 0.0 );
			
			text2 = game.add.text(25, 510, "Some blood on the broken glass of the window...", style );
				text2.alpha = 0.0;
				//text2.anchor.setTo( 0.5, 0.0 );
				
			text3 = game.add.text(25, 510, "An empty shell from a shotgun...", style );
				text3.alpha = 0.0;
				//text3.anchor.setTo( 0.5, 0.0 );
				
			text4 = game.add.text(25, 510, "A double-barrel shotgun...", style );
				text4.alpha = 0.0;
				//text4.anchor.setTo( 0.0, 0.0 );
				
			text5 = game.add.text(25, 510, "The victim...", style );
				text5.alpha = 0.0;
				//text5.anchor.setTo( 0.0, 0.0 );
				
			text6 = game.add.text(25, 510, "A shotgun wound to the chest...", style );
				text6.alpha = 0.0;
				//text6.anchor.setTo( 0.0, 0.0 );
				
			text7 = game.add.text(25, 510, "Broken glass from the window...", style );
				text7.alpha = 0.0;
				//text7.anchor.setTo( 0.0, 0.0 );
				
			text8 = game.add.text(25, 510, "Officer Jackson...", style );
				text8.alpha = 0.0;
				//text8.anchor.setTo( 0.0, 0.0 );
				
			text9 = game.add.text(25, 510, "Officer Miles...", style );
				text9.alpha = 0.0;
				//text9.anchor.setTo( 0.0, 0.0 );
				
			text10 = game.add.text(25, 510, "Bloody footprints walking away from the victim...", style );
				text10.alpha = 0.0;
				//text10.anchor.setTo( 0.0, 0.0 );
				
			iv0 = game.add.sprite(125,100,'painting_closeup');
			iv0.alpha = 0.0;
			
            
        },
		


		
    
        update: function () {
		if(inInspection==false && in_interrogation==0){
			if(ev0.input.pointerOver()){
				ev0.alpha = 1;
				text0.alpha = 1;
				ev0.events.onInputDown.add(inspect, 0);
		
			} else{
				ev0.alpha = 0.0;
				text0.alpha = 0;
			}
			
			if(ev1.input.pointerOver()){
				ev1.alpha = 1;
				text1.alpha = 1;
				ev1.events.onInputDown.add(inspect, 1);
			
			} else{
				ev1.alpha = 0.0;
				text1.alpha = 0.0;
			
			}
			
			if(ev2.input.pointerOver()){
				ev2.alpha = 1;
				text2.alpha = 1;
				ev2.events.onInputDown.add(inspect, 2);
			} else{
				ev2.alpha = 0.0;
				text2.alpha = 0.0;
			}
			
			if(ev3.input.pointerOver()){
				ev3.alpha = 1;
				text3.alpha = 1;
				ev3.events.onInputDown.add(inspect, 3);
			} else{
				ev3.alpha = 0.0;
				text3.alpha = 0.0;
			}
			
			if(ev4.input.pointerOver()){
				ev4.alpha = 1;
				text4.alpha = 1;  
				ev4.events.onInputDown.add(inspect, 4);
			} else{
				ev4.alpha = 0.0;
				text4.alpha = 0.0;
			}
			
			if(ev5.input.pointerOver()){
				ev5.alpha = 1;
				text5.alpha = 1;
				ev5.events.onInputDown.add(inspect, 5);
			} else{
				ev5.alpha = 0.0;
				text5.alpha = 0.0;
			}
			
			if(ev6.input.pointerOver()){
				ev6.alpha = 1;
				text6.alpha = 1;
				ev6.events.onInputDown.add(inspect, 6);
			} else{
				ev6.alpha = 0.0;
				text6.alpha = 0.0;
			}
			
			if(ev7.input.pointerOver()){
				ev7.alpha = 1;
				text7.alpha = 1;
				ev7.events.onInputDown.add(inspect, 7);
			} else{
				ev7.alpha = 0.0;
				text7.alpha = 0.0;
			}
			
			if(ev8.input.pointerOver()){
				ev8.alpha = 1;
				text8.alpha = 1;
				ev8.events.onInputDown.add(inspect, 8);
			} else{
				ev8.alpha = 0.0;
				text8.alpha = 0.0;
			}
			
			if(ev9.input.pointerOver()){
				ev9.alpha = 1;
				text9.alpha = 1;
				ev9.events.onInputDown.add(inspect, 9);
			} else{
				ev9.alpha = 0.0;
				text9.alpha = 0.0;
			}
			
			if(ev10.input.pointerOver()){
				ev10.alpha = 1;
				text10.alpha = 1;
				ev10.events.onInputDown.add(inspect, 10);
			} else{
				ev10.alpha = 0.0;
				text10.alpha = 0.0;
			}
			
			score1.setText(collected);
			
			if(in_interrogation == 1){
				ev0.destroy();
				ev1.destroy();
				ev2.destroy();
				ev3.destroy();
				ev4.destroy();
				ev5.destroy();
				ev6.destroy();
				ev7.destroy();
				ev8.destroy();
				ev9.destroy();
				ev10.destroy();
				text0.destroy();
				text1.destroy();
				text2.destroy();
				text3.destroy();
				text4.destroy();
				text5.destroy();
				text6.destroy();
				text7.destroy();
				text8.destroy();
				text9.destroy();
				text10.destroy();
				
				background.destroy();
				

				
			}
			
		}
		if(in_interrogation > 0){
				if(suspect1.input.pointerOver()){
					suspect1.alpha = 0.5;
					suspect1.events.onInputDown.add(question, 1);
				} else{
					suspect1.alpha = 1;
				}
				
				if(suspect2.input.pointerOver()){
					suspect2.alpha = 0.5;
					suspect2.events.onInputDown.add(question, 2);
				} else{
					suspect2.alpha = 1;
				}
				
				if(suspect3.input.pointerOver()){
					suspect3.alpha = 0.5;
					suspect3.events.onInputDown.add(question, 3);
				} else{
					suspect3.alpha = 1;
				}
			}
        }
    };
};

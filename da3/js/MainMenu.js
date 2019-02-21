"use strict";

BasicGame.MainMenu = function (game) {

	this.music = null;
	this.next_button = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
		this.music = this.add.audio('titleMusic');
		this.music.play();
		console.log('music should be playing');

		this.add.sprite(0, 0, 'maintitle');
		this.add.text(25,400, "WASD to Move", {font: "18px Courier", fill: "#FFFFFF"});
		this.add.text(25,450, "HOLD LShift to throw shuriken", {font: "18px Courier", fill: "#FFFFFF"});


		this.next_button = this.add.button( 450, 400, 'next', this.startGame, this, 1,0,2);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};

"use strict";

BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    */

    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
  //  this.bouncy = null;
  this.ctr = 4;
  this.text1 = null;
  this.text2 = null;
  this.text3 = null;
  this.text4 = null;
  this.style = { font: "24px Times New Roman", fill: "#000000"};
  this.button2 = null;
  this.button3 = null;
  this.ninja = null;
};

BasicGame.Game.prototype = {

    create: function () {
      this.add.sprite(0, 0, 'letterScene');
      this.text1 = this.game.add.text(25, 25, "The letters I wrote to my wife... they just keep getting sent back...", this.style);
      this.next_button = this.add.button( 450, 400, 'next', this.scene2, this, 1,0,2);
    },


    scene2: function () {
      this.add.sprite(0,0,'scene2');
              this.text2 = this.game.add.text(25, 25, "My wife is gone... and I know who has her...", this.style);
              this.button2 = this.add.button( 450, 400, 'next', this.scene3, this, 1,0,2);
    },
    scene3: function (){
      this.add.sprite(0,0,'scene3');
              this.text3 = this.game.add.text(25, 25, "It's up to me to bring her back home.", this.style);
              this.button3 = this.add.button( 450, 400, 'next', this.startGame, this, 1,0,2);
    },

    startGame: function (){
      this.world.setBounds(0,0,1000,1212);
      this.add.sprite(0,0,'lvl1');
      console.log('reached!');
      this.ninja = this.add.sprite(350,25,'ninja');
      this.ninja.animations.add('idle', [130], 15, false);
      this.ninja.animations.play('idle');




    },

    nextScene: function (pointer) {

      if(this.ctr >= 1){
        this.ctr--;
            console.log(this.ctr);
          }else{
            this.ctr = 0;
            this.startGame;
          }
    },


    update: function () {



        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //this.bouncy.rotation = this.game.physics.arcade.accelerateToPointer( this.bouncy, this.game.input.activePointer, 500, 500, 500 );
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};

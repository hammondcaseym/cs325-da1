"use strict";



const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

const IDLE = 0;
const ATTACK = 1;
const MOVE = 2;

class SpriteHandler {
  game;
  sprite;
  width; height;
  debugGraphic;

  constructor (game, sprite, width, height, anchorx, anchory){
    this.game=game;
    this.sprite=sprite;
    this.width=width;
    this.height=height;
    this.sprite.anchor.setTo(anchorx, anchory);
  }

  destroy() {
    this.sprite.destroy();
    if(this.debugGraphic!=null&&this.debugGraphic!=undefined) {
      this.debugGraphic.destroy();
    }
  }

  drawDebug() {
    this.debugGraphic = this.game.add.graphics(0,0);
    this.debugGraphic.beginFill(0x00FF00, 1);
    this.debugGraphic.drawCircle(0,0,2);
    this.debugGraphic.lineStyle(2, 0x00FF00, 1)
    this.debugGraphic.drawRect(-this.width/2.0, -this.height/2.0, this.width, 1);
    this.debugGraphic.drawRect(-this.width/2.0, this.height/2.0, this.width, 1);
    this.debugGraphic.drawRect(-this.width/2.0, -this.height/2.0, 1, this.height);
    this.debugGraphic.drawRect(this.width/2.0, -this.height/2.0, 1, this.height);
  }

  intersects(other) {
    var ml = new Phaser.Point(-this.width/2.0+this.sprite.x, -this.height/2.0+this.sprite.y);
    var mr = new Phaser.Point(this.width/2.0+this.sprite.x, this.height/2.0+this.sprite.y);

    var ol = new Phaser.Point(-this.width/2.0+other.sprite.x, -this.height/2.0+other.sprite.y);
    var or = new Phaser.Point(this.width/2.0+other.sprite.x, this.height/2.0+other.sprite.y);

    if(ml.x>or.x)
      return false;
    if(mr.x<ol.x)
      return false;

    if(mr.y<ol.y)
      return false;
    if(ml.y>or.y)
      return false;

    return true;
  }

  update() {
    if(this.debugGraphic != null) {
      this.debugGraphic.x = this.sprite.x;
      this.debugGraphic.y = this.sprite.y;
    }
  }

  move(direction, amt) {
    switch(direction) {
      case UP:    this.sprite.y-=amt; break;
      case DOWN:  this.sprite.y+=amt; break;
      case LEFT:  this.sprite.x-=amt; break;
      case RIGHT: this.sprite.x+=amt; break;
    }
  }

}

class Projectile extends SpriteHandler {
  speed; direction;

  constructor(speed, direction, game, sprite, width, height, anchorx, anchory) {
    super(game,sprite,width,height,anchorx,anchory);
    this.speed = speed;
    this.direction = direction;
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.collideWorldBounds = false;
  }
}

class Player extends SpriteHandler {
  hp; direction;
  upC; downC; leftC; downC; attackC;
  idleU; idleD; idleL; idleR;
  state;
  lastKeyStates;
  onAttack; onProjHit;
  projectiles = [];

  constructor(game, sprite, width, height, anchorx, anchory) {
    super(game,sprite,width,height,anchorx, anchory);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.collideWorldBounds = true;
    this.hp = 100;
    this.direction = LEFT;
    this.state = IDLE;
    this.lastKeyStates = [false, false, false, false];
    this.onAttack = null;
    this.onProjHit = null;
  }

  addProjectile(name,speed,width,height,anchorx,anchory) {
    var proj = new Projectile(speed,this.direction,this.game,this.game.add.sprite(this.sprite.x,this.sprite.y,name),width,height,anchorx,anchory)
  //  proj.drawDebug();
    proj.update();
    this.projectiles.push(proj);
    return proj;
  }

  setCodes(upC, downC, leftC, rightC, attackC) {
    this.upC = upC;
    this.downC = downC;
    this.leftC = leftC;
    this.rightC = rightC;
    this.attackC = attackC;
  }

  setIdleFrames(idleU, idleD, idleL, idleR) {
    this.idleU = idleU;
    this.idleD = idleD;
    this.idleL = idleL;
    this.idleR = idleR;
  }

  static convert(type, direction) {
    return (""+type)+(""+direction);
  }

  addAnimation(type, direction, frames) {
    var anim = this.sprite.animations.add(Player.convert(type, direction), frames);
    if (type==ATTACK) {
      anim.onComplete.add(function() {
        if(this.onAttack == null) {
          console.log("I ATTACKED")
        } else {
          this.onAttack()
        }
      }, this);
    }
  }

  playAnimation(type,direction, framerate, loop) {
    this.sprite.animations.play(Player.convert(type, direction), framerate, loop);
  }

  updateMovement(states){
    if (states[RIGHT])    this.direction=RIGHT;
    else if(states[LEFT]) this.direction=LEFT;
    else if(states[UP])   this.direction=UP;
    else if(states[DOWN]) this.direction=DOWN;
    this.state=MOVE;
    this.playAnimation(this.state,this.direction,15,true);
    this.move(this.direction,4);
  }

  update() {
    var keyStates = [
      this.game.input.keyboard.isDown(this.upC),
      this.game.input.keyboard.isDown(this.downC),
      this.game.input.keyboard.isDown(this.leftC),
      this.game.input.keyboard.isDown(this.rightC)
    ];
    var attacc = this.game.input.keyboard.isDown(this.attackC);
    if(!(keyStates[UP]||keyStates[DOWN]||keyStates[LEFT]||keyStates[RIGHT]||attacc)) {
      if (this.state==ATTACK) {
        this.sprite.animations.stop(Player.convert(this.state, this.direction),true);
      }
      this.state = IDLE;
      switch (this.direction) {
        case UP: this.sprite.frame = this.idleU; break;
        case DOWN: this.sprite.frame = this.idleD; break;
        case LEFT: this.sprite.frame = this.idleL; break;
        case RIGHT: this.sprite.frame = this.idleR; break;
      }
    } else if (attacc) {
      this.state=ATTACK;
      this.playAnimation(this.state,this.direction,15,false);
    } else {
      switch (this.state) {
        case IDLE:
        this.updateMovement(keyStates);
        break;
        case ATTACK:
        this.sprite.animations.stop(Player.convert(this.state,this.direction),true);
        this.state = MOVE;
        this.playAnimation(this.state,this.direction,15,true);
        case MOVE:
        if (keyStates[this.direction]) {
          for (var i = 0; i< keyStates.length; i++) {
            if (i==this.direction) continue;
            if (keyStates[i]&&!this.lastKeyStates[i]) {
              this.direction = i;
              this.playAnimation(this.state, this.direction, 15, true);
              break;
            }
          }
          this.move(this.direction,4);
        } else {
          this.updateMovement(keyStates);
        }
        break;
      }
    }
    this.lastKeyStates = keyStates;
    super.update();

    //Time for projectiles
    for(var i = 0; i < this.projectiles.length; i++) {
      var proj = this.projectiles[i];
      if(proj.sprite.x<-10||proj.sprite.y<-10||proj.sprite.x>this.game.width+10||proj.sprite.y>this.game.width+10) {
        proj.destroy();
        this.projectiles.splice(i,1);
        i--;
        continue;
      }
      for(var j = 0; j < this.game.thugs.length; j++) {
        var thug = this.game.thugs[j];
        if(proj.intersects(thug)) {
          this.game.thugs.splice(j,1);
          if(this.onProjHit != null){
            this.onProjHit(thug);
          }
          j--;
          proj.destroy();
          this.projectiles.splice(i,1);
          i--;
          break;
        }
      }
      proj.move(proj.direction,proj.speed);
      proj.update()
    }
  }
}

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
  this.style = { font: "24px Arial", fill: "#000000"};
  this.button2 = null;
  this.button3 = null;
  this.ninja = null;
  this.current = 0;
  this.thugs = [];
  this.HPtext = null;
  this.HP = null;
  this.pointsText = null;
  this.numPoints = null;
  this.points = 0;
  this.restartButton = null;
  this.bgLVL1 = null;

  this.s1 = null;
  this.s2 = null;
  this.s3 = null;

  this.t1 = null;
  this.t2 = null;
  this.t3 = null;
  this.t4 = null;

  this.deathsound = null;
  this.shurikensound = null;

};

BasicGame.Game.prototype = {

    create: function () {
      this.current = 0;
      this.s1 = this.add.sprite(0, 0, 'letterScene');
      this.text1 = this.game.add.text(25, 25, "The letters I wrote to my wife... they just keep getting sent back...", this.style);
      this.next_button = this.add.button( 450, 400, 'next', this.scene2, this, 1,0,2);
    },


    scene2: function () {
      this.s1.destroy();
      this.text1.destroy();
      this.next_button.destroy();
      this.s2 = this.add.sprite(0,0,'scene2');
              this.text2 = this.game.add.text(25, 25, "My wife is gone... and I know who has her...", this.style);
              this.button2 = this.add.button( 450, 400, 'next', this.scene3, this, 1,0,2);
    },
    scene3: function (){
      this.s2.destroy();
      this.text2.destroy();
      this.button2.destroy();
      this.stage.backgroundColor = '#FFFFFF';
              this.game.add.text(200, 50, "After a lone ninja keeps getting returned letters", {font: '20px Arial', fill:'#000000'});
              this.game.add.text(200, 75, "  returned, he suspects the Japanese Mafia has", {font: '20px Arial', fill:'#000000'});
              this.game.add.text(200, 100, "  kidnapped his beloved. So he folds his letters into", {font: '20px Arial', fill:'#000000'});
              this.game.add.text(200, 125, "  shurikens, and goes out to find her...", {font: '20px Arial', fill:'#000000'});
              this.button3 = this.add.button( 450, 400, 'next', this.startGame, this, 1,0,2);
    },



    startGame: function (){


      this.button3.destroy();
      this.world.setBounds(0,0,1000,1212);
      this.bgLVL1 = this.add.sprite(0,0,'lvl1');
      console.log('reached!');
      this.HPtext = this.game.add.text(200,25,"HP: ",this.style);
      this.HPtext.fixedToCamera = true;
      this.HPtext.cameraOffset.setTo(200,25);
      this.HP = this.game.add.text(275,25, 100,this.style);
      this.HP.fixedToCamera = true;
      this.HP.cameraOffset.setTo(275,25);

      this.pointsText = this.game.add.text(500,25,"POINTS: ",this.style);
      this.pointsText.fixedToCamera = true;
      this.pointsText.cameraOffset.setTo(500,25);
      this.numPoints = this.game.add.text(650,25, this.points,this.style);
      this.numPoints.fixedToCamera = true;
      this.numPoints.cameraOffset.setTo(650,25);

      this.deathsound = this.add.audio('die');;
      this.shurikensound = this.add.audio('swish');

      this.t1 = this.add.text(150, 300, "But the Japanese Mafia won't stop there...", {font:"32px Arial", fill: "#34a4c9"});
      //console.log("logged");
      this.t2 = this.add.text(150, 350, "Total Points: " + this.points, {font:"32px Arial", fill: "#34a4c9"});
      this.t4 = this.add.text(25,100,"You're one step closer to finding your beloved!",  {font:"32px Arial", fill: "#34a4c9"});
      this.t3 = this.add.text(150, 500, "Refresh the page to try this level again!", {font:"32px Arial", fill: "#34a4c9"});


      this.t1.fixedToCamera = true;
      this.t1.cameraOffset.setTo(150,300);
      this.t1.visible = false;

      this.t2.fixedToCamera = true;
      this.t2.cameraOffset.setTo(150,350);
      this.t2.visible = false;

      this.t3.fixedToCamera = true;
      this.t3.cameraOffset.setTo(150,500);
      this.t3.visible = false;

      this.t4.fixedToCamera = true;
      this.t4.cameraOffset.setTo(25,100);
      this.t4.visible = false;

      this.ninja = new Player(this, this.add.sprite(350,25,'ninja'),30,48,0.5,0.58);
      this.ninja.setCodes(Phaser.Keyboard.W,Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.SHIFT);
      this.ninja.setIdleFrames(156,130,169,195);
      //this.ninja.drawDebug();


      this.ninja.addAnimation(MOVE,LEFT, [117,118,119,120,121,122,123,124,125]);
      this.ninja.addAnimation(MOVE,RIGHT, [143,144,145,146,147,148,149,150,151]);
      this.ninja.addAnimation(MOVE,UP, [104,105,106,107,108,109,110,111,112]);
      this.ninja.addAnimation(MOVE,DOWN, [130,131,132,133,134,135,136,137,138]);
      this.ninja.addAnimation(ATTACK,UP,    [156,,157,158,159,160,161]);//,220,156]);
      this.ninja.addAnimation(ATTACK,LEFT,  [169,170,171,172,173,174]);//,233,169]);
      this.ninja.addAnimation(ATTACK,DOWN,  [182,183,184,185,186,187]);//,246,182]);
      this.ninja.addAnimation(ATTACK,RIGHT, [195,196,197,198,199,200]);//,259,195]);

      this.ninja.onAttack = function() {
  			var proj = this.addProjectile('star',10,32,32,0.5,0.5);

        proj.sprite.animations.add('move', [0,1,2,3], 200, true);
        this.game.shurikensound.play();
        proj.sprite.animations.play('move');

      }
      this.ninja.onProjHit = function(thug){
        this.game.points+=100;
        this.game.numPoints.setText(this.game.points);
        this.game.deathsound.play();
        thug.destroy();

      }
var placeScale = 0.85;
      for (var i = 0; i < 20; i++) {
        this.thugs.push(new SpriteHandler(this, this.add.sprite(0,0,'thug'),30, 48, 0.5, 0.58))
      }

      for (var i in this.thugs) {
        var thug = this.thugs[i];
        thug.sprite.animations.add('WalkL', [117,118,119,120,121,122,123,124,125],15,false);
        thug.sprite.animations.add('WalkR', [143,144,145,146,147,148,149,150,151],15,false);
        var tAttL = thug.sprite.animations.add('AttL', [169,170,171,172,173,174],15,false);
        var tAttR = thug.sprite.animations.add('AttR', [195,196,197,198,199,200],15,false);
        tAttL.onStart.add(function(sprite,animation){
                            this.ninja.hp-=5;
        },this);
        tAttR.onStart.add(function(sprite,animation){
                            this.ninja.hp-=5;
        },this);


        //thug.drawDebug();
        var p = new Phaser.Point(
          Math.random()*this.world.width*placeScale+this.world.width*(1.0-placeScale)/2.0,
          Math.random()*this.world.height*placeScale+this.world.width*(1.0-placeScale)/2.0);
        thug.sprite.position =  p;
        thug.update();
        console.log(p);
        console.log(Math.random()*this.world.width*placeScale+this.world.width*(1.0-placeScale)/2.0);
      }




      //this.ninja = this.add.sprite(350,25,'ninja');
    //  this.ninja.animations.add('idle', [130], 15, false);
    //  this.ninja.animations.play('idle');
    this.current = 1;
    this.camera.follow(this.ninja.sprite);

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



  	updateThug:  function (thug) {
  		var targetPlayerPos = this.ninja.sprite.position;
  		var targetPlayerDistance;

  		targetPlayerDistance = this.distance(thug.sprite.position, targetPlayerPos);
  		if (targetPlayerDistance > 300) return;

            if(targetPlayerDistance <= 50){
              //  thug.sprite.animations.stop();
              console.log('thug attacks!');
              if((targetPlayerPos.x - thug.sprite.position.x) <= 0){
        //        console.log("touchy-touchy");
                thug.sprite.animations.play('AttL');
                //this.ninja.hp -= 1;
          //      console.log(this.ninja.hp);
              } else {
                thug.sprite.animations.play('AttR');
                //this.ninja.hp -= 1;
                }
              return;

            }
      var direction = new Phaser.Point(targetPlayerPos.x - thug.sprite.position.x, targetPlayerPos.y - thug.sprite.position.y);

      direction.x/=targetPlayerDistance;
  		direction.y/=targetPlayerDistance;
  		thug.sprite.position.y+=direction.y;
  		thug.sprite.position.x+=direction.x;


      if(direction.x <= 0){
        thug.sprite.animations.play('WalkL');

      } else {
        thug.sprite.animations.play('WalkR');

      }





  	},

    death: function (){

      for(var i in this.thugs){
        this.thugs[i].destroy();
      }
      this.ninja.destroy();
      this.bgLVL1.destroy();


      this.stage.backgroundColor = '#000000';
      var t1 = this.add.text(250, 300, "You are dead.", {font:"32px Arial", fill: "#c40303"});
      //console.log("logged");
      var t2 = this.add.text(250, 350, "Total Points: " + this.points, {font:"32px Arial", fill: "#c40303"});
      var t3 = this.add.text(250, 500, "Refresh the page to try again...", {font:"32px Arial", fill: "#c40303"});
      this.current = 0;
      console.log(this.current);
    },

    victory: function(){
      for(var i in this.thugs){
        this.thugs[i].destroy();
      }
      this.ninja.destroy();
      this.bgLVL1.destroy();


      this.stage.backgroundColor = '#000000';
      this.t1.visible = true;
      this.t2.visible = true;
      this.t3.visible = true;
      this.t2.setText("Total Points: " + this.points);
      this.t4.visible = true;
      this.current = 0;
      console.log(this.current);
    },

  	distance: function (p1, p2) {
  		var p = new Phaser.Point(p2.x - p1.x, p2.y - p1.y);
  		return this.magnitude(p);
  	},

  	magnitude: function (p) {
  		return Math.sqrt((p.x*p.x)+(p.y*p.y));
  	},



    update: function () {


    if(this.current == 1){
          if(this.ninja.hp <= 0){
            //he ded
            console.log('HP = 0 -- YOU ARE DEAD');
            this.death();
            this.current = 2;
            return;
          }
          this.ninja.update();

          for(var i in this.thugs){
            this.updateThug(this.thugs[i]);
            this.thugs[i].update();

          }

          if(this.thugs.length == 0){
            console.log("all enemies destroyed!");
            this.victory();
            this.current = 3;

          }

          this.HP.setText(this.ninja.hp < 0 ? 0 : this.ninja.hp);
    } else if(this.current == 2){
      console.log("in death state");
      //waiting...
    } else if(this.current == 3){

      this.current = 0;
      console.log("in victory state");
      //waiting
    }
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

        this.state.start('Game');

    }

};

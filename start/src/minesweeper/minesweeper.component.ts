import {Component, Input, CORE_DIRECTIVES} from 'angular2/angular2';
import {partition} from './util';
import {revealTile, isGameOver} from './game';
import {RowComponent} from './row.component';

@Component({
  selector: 'minesweeper',
  template: `
  <!-- 
  add a counter for gameplays
  <div class="gameinfo">Game Plays: {{plays}}</div>  
  -->
  <div class="board">
    <row *ng-for="#row of rows" [row]="row" (tile-click)="handleTileClick($event)"></row>
  </div>
  `,
  directives: [CORE_DIRECTIVES, RowComponent]
})
export class MinesweeperComponent {
  @Input() game: any;
  rows;

  // Add counter for gameplays
  //plays = 0;
  
  history = Immutable.List();
  
  onChanges(changes){

    // Only update game when game has actually changed
    if(changes.hasOwnProperty('game')){

      //Increment gameplays
      //this.plays++;

      // init soundmixer if not running
      //if( this.soundMixer.running == false ){
      //   this.soundMixer.init();
      //   this.soundMixer.running = true;
      //}

      // play backgroundsound if not playing
      //if( this.soundMixer.backgroundSound.paused ){
      //  this.soundMixer.reset( this.soundMixer.backgroundSound );
      //}

      // play the intro start sound
      //this.soundMixer.reset( this.soundMixer.startSound );  

      this.updateGame()
    }
  }
  
  updateGame(updateHistory = true){
    this.rows = partition(this.game.get('cols'), this.game.get('tiles'));
    if(updateHistory){
      this.history = this.history.push(this.game);
    }
  }
  
  handleTileClick(tile){

    if(!tile){
      return;
    }
    if (isGameOver(this.game)) {
      return;
    }
    const newGame = revealTile(this.game, tile.get('id'));
    if (newGame !== this.game) {
      this.game = newGame;
      this.updateGame();
      
      // play the check for mine sound
      //this.soundMixer.reset( this.soundMixer.checkSound );

    }
    if (isGameOver(this.game)) {
      
      // play the explosion sound and pause background sound
      //this.soundMixer.reset( this.soundMixer.explosionSound );
      //this.soundMixer.pause( this.soundMixer.backgroundSound );
    }
  }

  undo(){
    if (this.canUndo()) {

      // play the undosound and start background sound from last paused spot
      //this.soundMixer.play( this.soundMixer.undoSound );
      //this.soundMixer.play( this.soundMixer.backgroundSound );

      this.history = this.history.pop();
      this.game = this.history.last();

      // Don't update the history so we don't end up with
      // the same game twice in the end of the list
      this.updateGame(false);
    }
  }
  
  canUndo(){
    return this.history.size > 1;
  }

  // create SoundMixer Object to handle sounds
  /*soundMixer = {

    running: false,
    extension: '.mp3',
    sound: 'On', // On / Off

    ddPlus: Dolby.checkDDPlus(),

    init: function(){

      if( this.ddPlus === true ){    
        this.extension = '_Dolby.mp4'
      }

     this.startSound = new Audio()
     this.startSound.src = 'assets/startSound' + this.extension
     this.startSound.playbackRate = 1.25
     this.startSound.volume = 0.25

     this.backgroundSound = new Audio()
     this.backgroundSound.src = 'assets/RedStreams-jukedeck' + this.extension
     this.backgroundSound.playbackRate = 1
     this.backgroundSound.loop = true
     this.backgroundSound.volume = 0.5

     this.checkSound = new Audio()
     this.checkSound.src = 'assets/checkSound' + this.extension
     this.checkSound.volume = 0.25

     this.explosionSound = new Audio()
     this.explosionSound.src = 'assets/explosionSound' + this.extension

     this.undoSound = new Audio()
     this.undoSound.src = 'assets/undoSound' + this.extension
     this.undoSound.playbackRate = 2

    },

    play: function( sound ) {   
      if( this.sound === 'On' ){
        sound.play()        
      }    
    },
    pause: function( sound ){
      sound.pause()
    },
    reset: function( sound ){
      sound.currentTime = 0
      this.play( sound )
    },
    mute: function( ){

      if( this.sound == 'On' ){
        this.sound = 'Off'
        this.pause( this.backgroundSound )
      } else {
        this.sound = 'On'
        this.play( this.backgroundSound )
      }

    }

  }*/


}
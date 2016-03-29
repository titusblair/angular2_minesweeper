import {Component} from 'angular2/angular2';
import {MinesweeperComponent} from '../minesweeper/minesweeper.component';
import {createGame} from '../minesweeper/game';

@Component({
  selector: 'app',
  template: `
  <minesweeper [game]="game" #minesweeper></minesweeper>
  <ul class="actions">
    <li><a (click)="startNewGame()">New game</a></li>
    <li><a (click)="minesweeper.undo()" [hidden]="!minesweeper.canUndo()">Undo</a></li>
    <li><a (click)="minesweeper.soundMixer.mute()">Sound: {{minesweeper.soundMixer.sound}}</a></li>
   </ul>
   <br/>

    <div class="creditsbox">
      <p [hidden]="!minesweeper.soundMixer.ddPlus"><a href="https://developer.dolby.com/" target="_new"><img class="dolbylogo" src="assets/DolbyLogo.png" /></a></p>
      <p>Music: <a href="https://jukedeck.com/" target="_new">JukeDeck.com</a></p>
      <p>Sound Effects: <a href="http://freesound.org/" target="_new">FreeSound.org</a></p>
      <p>Code: <a href="http://www.jvandemo.com/how-to-build-minesweeper-using-angular-2-and-immutable-js/" target="_new">How to build Minesweeper using Angular 2 and Immutable.js</a></p>
    </div>

  <br/>
  `,
  directives: [MinesweeperComponent]
})
export class App {
  public game;

  constructor(){
    
  }
  onInit(){
    this.startNewGame();
  }
  startNewGame(){
    this.game = createGame({cols: 16, rows: 16, mines: 48});
  }

} 
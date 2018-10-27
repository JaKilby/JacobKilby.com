import { Component, OnInit } from '@angular/core';
import {GameService} from '../game-service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  animations: [
    trigger('play', [
      transition(':enter', [
        style({opacity: 0}),
        animate('.5s', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('2s', style({opacity:0}))
      ])
    ]),
    trigger('button', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1s', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('0s', style({opacity:0}))
      ])
    ])

  ]

})
export class GameBoardComponent implements OnInit {

  board: boolean[][];
  switch: boolean;
  blackhole: boolean;
  score: number;

  constructor(private gameService: GameService) {
    this.board = this.gameService.board;
    this.switch = true;
    this.blackhole = false;
   }

  setStyling() {
    return this.gameService.getStyling();
  }

  setFruit(col: number, row: number) {
    return this.gameService.getFruit(col, row);
  }

  setSnake(col: number, row: number) {
    this.score = this.gameService.score;
    return this.gameService.getSnake(col, row);
  }

  setHead(col: number, row: number) {
    return this.gameService.getSnakeHead(col, row);
  }

  gamePlaying() {
    return this.gameService.play;
  }
  

  ngOnInit() {
  }

  playSnake() {
    this.gameService.toggle();
    this.switch = false;
  }

  endSnake(event) {
    if(event.toState == "void")
    {
      this.switch = true;
    }
  }

  showBlackHole()
  {
    this.blackhole = true;
    setTimeout(() =>{
      this.blackhole = !this.blackhole
    }, 5000)
  }


}

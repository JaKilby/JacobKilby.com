import { Component, OnInit } from '@angular/core';
import {GameService} from '../game-service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';

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
  timer: number;
  mobile: boolean;

  constructor(private gameService: GameService, private deviceDetector: DeviceDetectorService) {
    this.board = this.gameService.board;
    this.switch = true;
    this.blackhole = false;
    this.timer = 5;
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
    if(this.deviceDetector.isMobile())
    {
      this.switch = true;
      this.mobile = true;
    }
    else {
      this.gameService.toggle();
      this.switch = false;
    }
  }

  endSnake(event) {
    if(event.toState == "void")
    {
      this.switch = true;
    }
  }

  resetBlackhole(interval) {
    clearInterval(interval);
    this.timer = 6;
    while(this.gameService.key_queue.length > 0)
    {
      console.log(this.gameService.key_queue.pop());
    }
  }

  showBlackHole()
  {
    let konami = "ABRLRLDDUU";
    this.blackhole = true;
    let count = 5;
    let interval = setInterval(() =>{
      if(count === 0){
        this.blackhole = !this.blackhole;
        this.resetBlackhole(interval);
      }
      this.timer+= -1;
      count += -1;
      let keys = "";
      if(this.gameService.key_queue.length === 10)
      {
      this.gameService.key_queue.forEach((key_code) => {
        console.log(key_code);
          if(key_code === 38)
          {
            keys += 'U';
          }
          else if(key_code === 40)
          {
            keys += 'D';
          }
          else if(key_code === 37)
          {
            keys += 'L';
          }
          else if(key_code === 39)
          {
            keys += 'R';
          }
          else if(key_code === 66)
          {
            keys += 'B';
          }
          else if(key_code === 65)
          {
            keys += 'A';
          }
      });
      if(keys === konami)
      {
        alert("You found the secret!");
        while(this.gameService.key_queue.length > 0)
        {
          this.gameService.key_queue.pop();
        }
      }
    }

    }, 1000)
  }

  

}

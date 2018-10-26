import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game-service';

@Component({
  selector: 'app-my-snake-head',
  templateUrl: './my-snake-head.component.html',
  styleUrls: ['./my-snake-head.component.css']
})
export class MySnakeHeadComponent implements OnInit {

  svg_img: string;

  constructor(private gameService: GameService) { 
    this.svg_img = gameService.getHeadType();
  }

  ngOnInit() {
  }

}

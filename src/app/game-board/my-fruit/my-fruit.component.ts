import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game-service';

@Component({
  selector: 'app-my-fruit',
  templateUrl: './my-fruit.component.html',
  styleUrls: ['./my-fruit.component.css']
})
export class MyFruitComponent implements OnInit {
  type: string;

  constructor(private gameService: GameService) { 
    this.type = this.gameService.fruit.type;
  }

  ngOnInit() {
  }

}

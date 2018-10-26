import { Component } from '@angular/core';
import * as _ from 'lodash/index';
import { GameService } from './game-service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private matIconRegistry: MatIconRegistry, private gameService: GameService,
                private domSanatizer: DomSanitizer) {

  _(this.gameService.fruitType).each((value: string) => {
    this.matIconRegistry.addSvgIcon(value, 
      this.domSanatizer.bypassSecurityTrustResourceUrl('../assets/icons/' + value + '.svg')
    );
  });
  this.matIconRegistry.addSvgIcon('square', 
      this.domSanatizer.bypassSecurityTrustResourceUrl('../assets/icons/square.svg')
  );
  this.matIconRegistry.addSvgIcon('snakeHead', 
      this.domSanatizer.bypassSecurityTrustResourceUrl('../assets/icons/snake-head.svg')
  );

  this.matIconRegistry.addSvgIcon('snakeLeft', 
      this.domSanatizer.bypassSecurityTrustResourceUrl('../assets/icons/snake-head-left.svg')
  );
  this.matIconRegistry.addSvgIcon('snakeUp', 
      this.domSanatizer.bypassSecurityTrustResourceUrl('../assets/icons/snake-head-up.svg')
  );
  this.matIconRegistry.addSvgIcon('snakeDown', 
      this.domSanatizer.bypassSecurityTrustResourceUrl('../assets/icons/snake-head-down.svg')
  );

}


}

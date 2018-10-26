import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { MyFruitComponent } from './game-board/my-fruit/my-fruit.component';
import { MySnakeComponent } from './game-board/my-snake/my-snake.component';
import { GameService } from './game-service';
import { HttpClientModule } from '@angular/common/http';
import { MySnakeHeadComponent } from './game-board/my-snake-head/my-snake-head.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    GameBoardComponent,
    MyFruitComponent,
    MySnakeComponent,
    MySnakeHeadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [ GameService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

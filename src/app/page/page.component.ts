import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0.0,
      })),
      transition('* => *', [
        animate('2s', style({opacity: 1}))
      ]),
      transition('closed => open', [
        animate('5s')
      ]),
    ]),
  ]
})
export class PageComponent implements OnInit {

    isOpen = true;
    title = 'Welcome to my website';
    subtitle = '';
    content = 'My name is Jacob Kilby.\
    I\'m currently a senior at the University of Michigan studying Computer Science, and\
    I built this website to showcase a small part of my skills in Angular.\
    I\'m currently searching for full time positions as a full stack or front end developer. \
    I hope you enjoy looking around, playing snake, and hunting for the secret!';

  constructor() { }

  ngOnInit() {
  }

  

}

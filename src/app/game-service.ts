import { Injectable } from '@angular/core';
import { Part, Fruit, Snake } from './data-model';
import { BOARD_SIZE, COLORS, KEYS } from './data-service';
import * as _ from 'lodash/index';

@Injectable()
export class GameService {
    board: boolean[][];
    snake: Snake;
    fruit: Fruit;
    isStarted: boolean;
    fruitType: Array<string>;
    score: number;
    play: boolean;
    private isGameOver: boolean;
    private interval: number;
    private tempDirection: number;
    other: boolean;
    key_queue: number[];

    constructor() {
        this.fruitType = [
            'apple',
            'avocado',
            'banana',
            'blueberries',
            'cherries',
            'grapes',
            'lemon',
            'lime',
            'orange',
            'peach',
            'pear',
            'pineapple',
            'pomegranate',
            'raspberry',
            'strawberry',
            'tomato'
        ];
        this.key_queue = [];
        this.score = 0;
        this.setupBoard();
        this.play = false;

        window.addEventListener('keyup', (e: any) => {
            switch (e.keyCode) {
                
                case KEYS.ESC:
                    if (this.isStarted) {
                        this.gameOver();
                    }
                    break;
                case KEYS.SPACE_BAR:
                case KEYS.ENTER:
                    this.toggle();
                    break;
                case KEYS.LEFT:
                    this.key_queue.unshift(KEYS.LEFT);
                    break;
                case KEYS.DOWN:
                    this.key_queue.unshift(KEYS.DOWN);
                    break;
                case KEYS.UP:
                    this.key_queue.unshift(KEYS.UP);
                    break;
                case KEYS.RIGHT:
                    this.key_queue.unshift(KEYS.RIGHT);
                    break;
                }
        });
    }

    setupBoard() {
        this.board = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            this.board[i] = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                this.board[i][j] = false;
            }
        }
        this.fruit = {
            x: -1,
            y: -1,
            type: this.getFruitType()
        };
        this.snake = {
            direction: KEYS.LEFT,
            parts: [{
                x: -1,
                y: -1
            }]
        };
    }

    start() {
        this.isStarted = true;
        this.isGameOver = false;
        this.score = 0;
        this.interval = 75;
        this.play = true;
        this.other = true;

        this.snake.direction = KEYS.LEFT;
        this.snake.parts = [];
        this.tempDirection = KEYS.LEFT;

        for (let i: number = 0; i < 3; i++) {
            this.snake.parts.push({x: 10 + i, y: 10});
        }
        this.resetFruit();
        this.update();
    }

    toggle() {
        if (this.isStarted) {
            this.gameOver();
        } else {
            this.start();
        }
    }

    update() {
        let self: GameService = this;
        if (this.isStarted) {
            setTimeout(() => {
                if(this.other) {
                if(this.key_queue.length != 0)
                {
                    self.tempDirection = this.key_queue.pop();
                }
                let newHead: Part = self.getNewHead();
                if (self.boardCollision(newHead) || self.selfCollision(newHead)) {
                    return self.gameOver();
                } else if (self.fruitCollision(newHead)) {
                    self.eatFruit();
                }

                // remove tail
                let oldTail: Part = self.snake.parts.pop();
                self.board[oldTail.y][oldTail.x] = false;

                // pop tail to head
                self.snake.parts.unshift(newHead);
                self.board[newHead.y][newHead.x] = true;

                // do it again
                self.snake.direction = self.tempDirection;
                
            }
            this.other = !this.other;
            this.update();
            }, this.interval);
        }
    }

    gameOver() {
        this.isGameOver = true;
        this.play = false;

        setTimeout(() => {
            this.isGameOver = false;
        }, 500);

        this.isStarted = false;
        this.setupBoard();
    }

    getNewHead() {
        let newHead: Part = _.cloneDeep(this.snake.parts[0]);

        // update Location
        if (this.tempDirection === KEYS.LEFT) {
            newHead.x -= 1;
        } else if (this.tempDirection === KEYS.RIGHT) {
            newHead.x += 1;
        } else if (this.tempDirection === KEYS.UP) {
            newHead.y -= 1;
        } else if (this.tempDirection === KEYS.DOWN) {
            newHead.y += 1;
        }
        return newHead;
    }

    boardCollision(part: Part) {
        return part.x === BOARD_SIZE || part.x === -1 || part.y === BOARD_SIZE || part.y === -1;
    }

    selfCollision(part: Part) {
        return this.board[part.y][part.x];
    }

    fruitCollision(part: Part) {
        return part.x === this.fruit.x && part.y === this.fruit.y;
    }

    eatFruit() {
        this.score++;

        let tail: Part = _.cloneDeep(this.snake.parts[this.snake.parts.length - 1]);
        this.snake.parts.push(tail);
        this.resetFruit();

        if (this.score % 5 === 0) {
            this.interval -= 7;
        }
    }

    resetFruit() {
        let x: number = Math.floor(Math.random() * BOARD_SIZE);
        let y: number = Math.floor(Math.random() * BOARD_SIZE);

        if (this.board[y][x]) {
            return this.resetFruit();
        }
        this.fruit = {
            x: x,
            y: y,
            type: this.getFruitType()
        };
    }

    getFruitType() {
        return this.fruitType[_.random(0, this.fruitType.length - 1)];
    }

    getStyling() {
        if (this.isGameOver) {
            return COLORS.GAME_OVER;
        }
        return COLORS.BOARD;
    }

    getFruit(col: number, row: number) {
        return (this.fruit.x === row && this.fruit.y === col);
    }

    getSnake(col: number, row: number) {
        return (!(this.snake.parts[0].x === row && this.snake.parts[0].y === col) && this.board[col][row]);
    }

    getSnakeHead(col: number, row: number) {
        return ((this.snake.parts.length > 0 && this.snake.parts[0].x === row && this.snake.parts[0].y === col));
    }

    getHeadType(){
        if(this.tempDirection == KEYS.LEFT) {
            return "snakeLeft";
        }
        else if(this.tempDirection == KEYS.RIGHT) {
            return "snakeHead";
        }
        else if(this.tempDirection == KEYS.DOWN) {
            return "snakeDown";
        }
        else if(this.tempDirection == KEYS.UP) {
            return "snakeUp";
        }
        else {
            return "snakeHead";
        }
    }

    
}
import { Level } from "./levels";
import { LEVELS } from "./levels";

const elementById = (id: string) => document.getElementById(id) as HTMLElement;

export class Cell {
  isOpen: boolean = false;
  mines: number = 0;
  isBomb: boolean = false;
  isFlag: boolean = false;
  isUnsure: boolean = false;
  //coordinates: number[] = [];
  coordinateX:number=0;
  coordinateY:number=0;
}

export class Minesweeper {
  private level: Level;
  private mineExplosionAudio: any;
  private supriseAudio: any;
  private winnerAudio: any;
  private cells: Cell[][] = [];
  questionMarksEnabled: boolean = false;
  customTemplateOn: boolean = false;
  lost: boolean = false;
  win: boolean = false;
  tense: boolean = false;
  timerOn: boolean = false;
  currentTime: number = 0;
  timerID: number = 0
  minesLeft: number = 0;


  constructor(level: Level) {
    this.mineExplosionAudio = elementById('explosion');
    this.supriseAudio = elementById('suprise');
    this.winnerAudio = elementById('winner');
    this.level = level;
    //this.template = TEMPLATE[0]
    this.initilazeCells();
    this.makeMines();
    this.countTouchingMines(level)
  }

  //Initialize and then populate two dimensional array with Cells objects
  initilazeCells() {
    for (let i = 0; i < this.level.columns; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.level.rows; j++) {
        this.cells[i][j] = new Cell();
        //recording each cells coordinates
        this.cells[i][j].coordinateX = i;
        this.cells[i][j].coordinateY = j;
      }
    }
  }

  //make mines at random locations in amount specified by current level
  makeMines() {
    if (this.customTemplateOn && this.level.mineLayout !== undefined) {
      let minesCreated = 0;
      while (minesCreated < this.level.mineLayout().length) {

        this.level.mineLayout().forEach(element => {
          this.cells[element[0]][element[1]].isBomb = true;
        });
        minesCreated++;

      }
    } else {
      while (this.countCreatedMines() < this.level.mines) {
        this.cells[Math.floor(Math.random()
          * (this.cells.length - 1))][Math.floor(Math.random()
            * (this.cells.length - 1))].isBomb = true;
      }
    }
    this.minesLeft = this.countCreatedMines();
  }

  columnsCount(): number {
    return this.cells.length;
  }

  getCells(): Cell[][] {
    return this.cells
  }

  onLeftMouseDown(x: number, y: number) {
    this.tense = true;
  }

  onLeftMouseUp(x: number, y: number) {

    //first check should run (game lost or won)
    if (this.isGameRunning()) {
      //if so - start the timer
      if (!this.timerOn) {
        this.timerOn = true;
        this.timerFunction()
      }

      this.tense = false;
      //call reveal zeros function and check if open cell contains bomb
      //if it does - it`s game over time
      if (this.containsMine(x, y)) {
        this.gameOver(x, y);
      }
      //if we managed this far, cell dioes not contain bomb, so open it up
      this.revealZeros(x, y)
    }
  }

  onRightMouseUp(x: number, y: number) {
    if (this.isGameRunning() && this.cells[x][y].isOpen === false) {
      if (!this.cells[x][y].isFlag && !this.cells[x][y].isUnsure) {
        this.cells[x][y].isFlag = true;
        this.minesLeft--;
      } else if (this.cells[x][y].isFlag) {
        this.minesLeft++;
        this.cells[x][y].isFlag = false;
        this.questionMarksEnabled ? this.cells[x][y].isUnsure = true : this.cells[x][y].isUnsure = false;
      } else if (this.cells[x][y].isUnsure) {
        this.cells[x][y].isUnsure = false;
        this.cells[x][y].isBomb = false;
      }
    }
  }

  isTense(): boolean {
    return this.tense;
  }

  timePassed(): number {
    return this.currentTime
  }

  minesLeftCount(): number {
    return this.minesLeft;
  }

  countCreatedMines(): number {
    let minesLeft: number = 0;

    this.cells.map((obj) => {
      obj.forEach(element => {
        element.isBomb ? minesLeft++ : minesLeft = minesLeft;
      });
    });
    return minesLeft;
  }

  isGameRunning(): boolean {
    if (this.lost) {
      return false;
    }
    if (this.win) {
      return false;
    }
    return true
  }

  gameOver(x: number, y: number) {
    const allMines: number[][] = this.returnBombCoordinates();

    for (let i = 0; i < allMines.length; i++) {
      const element = allMines[i];
      this.cells[element[0]][element[1]].isOpen = true;
    }
    if (this.isTemplatesEnabled()) {
      this.supriseAudio.play();
    } else {
      this.mineExplosionAudio.play();
    }

    this.cells[x][y].isOpen = true;
    this.lost = true;
    this.timerOn = false;
    clearInterval(this.timerID);
  }

  //Reset game when button is pressed
  reset() {
    this.timerOn = false;
    this.lost = false;
    this.tense = false;
    this.currentTime = 0;
    this.cells = [];
    clearInterval(this.timerID)
    this.initilazeCells();
    this.makeMines();
    this.countTouchingMines(this.level)
  }

  currentLevel(): Level {
    return this.level;
  }

  selectLevel(level: Level) {
    this.level = level;
    if (this.level.title !==LEVELS[3].title) {
      this.customTemplateOn = false;
    }
    this.reset();
  }

  isLost(): boolean {
    return this.lost;
  }

  isWon(): boolean {
    if (this.returnClosedCells().length === 0 && this.minesLeft === 0) {
      this.winnerAudio.play();
      clearInterval(this.timerID)
      this.timerOn = false;
      this.win = true;
      return true;
    } else {
      return false;
    }
  }

  isQuestionMarksEnabled(): boolean {
    return this.questionMarksEnabled;
  }

  isTemplatesEnabled(): boolean {
    return this.customTemplateOn;
  }

  toggleQuestionMarksEnabled() {
    this.questionMarksEnabled ? this.questionMarksEnabled = false : this.questionMarksEnabled = true;
  }

  toggleTemplatesEnabled() {
    this.customTemplateOn ? this.customTemplateOn = false : this.customTemplateOn = true;
    this.reset()
  }

  revealZeros(x: number, y: number): boolean {
    this.cells[x][y].isOpen = true;

    //first check if opened cell is bomb
    if (this.containsMine(x, y)) {
      return false;
    }

    //next check if opened cell contains number
    if (this.cells[x][y].mines !== 0) {
      return false;
    }

    //if we managed to get this far, opened cell is empty and function recursion can start
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i < 0 || i >= this.level.rows ||
          j < 0 || j >= this.level.columns)
          continue;

        //console.log(`Current cell to be checked is: x-->${i}  y-->${y}`)
        if (!this.cells[i][j].isOpen)
          this.revealZeros(i, j);
      }
    }
    return true
  }

  containsMine(x: number, y: number): boolean {
    if (this.cells[x][y].isBomb) {
      return true;
    } else {
      return false;
    }
  }

  countTouchingMines(level: Level) {
    level = this.level;

    for (let i = 0; i < level.columns; i++) {
      for (let j = 0; j < level.rows; j++) {
        //check if cell on the left contains bomb
        if (this.cells[i][j - 1] !== undefined && this.cells[i][j - 1].isBomb) {
          this.cells[i][j].mines++;
        }

        //check if cell on the right contains bomb
        if (this.cells[i][j + 1] !== undefined && this.cells[i][j + 1].isBomb) {
          this.cells[i][j].mines++;
        }

        //check if cell below contains bomb
        if (this.cells[i - 1] !== undefined && this.cells[i - 1][j].isBomb) {
          this.cells[i][j].mines++;
        }

        //check if cell above contains bomb
        if (this.cells[i + 1] !== undefined && this.cells[i + 1][j].isBomb) {
          this.cells[i][j].mines++;
        }

        //check if cell top left contains bomb
        if (this.cells[i + 1] !== undefined && this.cells[i + 1][j + 1] !== undefined && this.cells[i + 1][j + 1].isBomb) {
          this.cells[i][j].mines++;
        }

        //check if cell top right contains bomb
        if (this.cells[i - 1] !== undefined && this.cells[i - 1][j + 1] !== undefined && this.cells[i - 1][j + 1].isBomb) {
          this.cells[i][j].mines++;
        }

        //check if cell bottom left contains bomb
        if (this.cells[i + 1] !== undefined && this.cells[i + 1][j - 1] !== undefined && this.cells[i + 1][j - 1].isBomb) {
          this.cells[i][j].mines++;
        }

        //check if cell top right contains bomb
        if (this.cells[i - 1] !== undefined && this.cells[i - 1][j - 1] !== undefined && this.cells[i - 1][j - 1].isBomb) {
          this.cells[i][j].mines++;
        }
      }
    }
  }

  //helper function to return cells that contain bombs
  returnBombCoordinates(): number[][] {
    let bombsLeft: number[][] = [];
    this.cells.map((obj) => {
      obj.forEach(element => {
        if (element.isBomb) {
          bombsLeft.push(new Array(element.coordinateX,element.coordinateY))
        }
      });
    });
    return bombsLeft;
  }

  //helper function to return empty cells as array
  returnEmtyCellsCoord(): number[][] {
    let emptyCells: number[][] = [];
    this.cells.map((obj) => {
      obj.forEach(element => {
        if (element.mines === 0 && !element.isBomb) {
          emptyCells.push(new Array(element.coordinateX, element.coordinateY))
        }
      });
    });
    return emptyCells;
  }

  //helper function to return empty cells as array
  returnClosedCells(): number[][] {
    let closedCells: number[][] = [];
    this.cells.map((obj) => {
      obj.forEach(element => {
        if (!element.isOpen && !element.isBomb) {
          closedCells.push(new Array(element.coordinateX,element.coordinateY))
        }
      });
    });
    return closedCells;
  }

  //function that counts seconds during gameplay
  timerFunction() {
    this.timerID = setInterval(() => { this.currentTime = this.currentTime + 1 }, 1000);
  }
}
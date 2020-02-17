import { Cell } from "./Cell";
import { Direction } from "./Direction";

export class Snake {
  head: Cell = new Cell(2, 0);
  tail: Cell[] = [new Cell(0, 0), new Cell(1, 0)];
  currentDirection: Direction = 'Right';
  growCells: number = 0;

  setDirection(newDirection: Direction) {
    if (this.currentDirection === 'Right' && newDirection === 'Left') {
      return
    }
    if (this.currentDirection === 'Up' && newDirection === 'Down') {
      return
    }
    if (this.currentDirection === 'Down' && newDirection === 'Up') {
      return
    }
    if (this.currentDirection === 'Left' && newDirection === 'Right') {
      return
    }
    this.currentDirection = newDirection;
  }

  move() {
    const oldHeadDirection = new Cell(this.head.x, this.head.y);

    if (this.currentDirection === "Right") {
      this.head = new Cell(this.head.x + 1, this.head.y)
    } else if (this.currentDirection === "Down") {
      this.head = new Cell(this.head.x, this.head.y + 1)
    } else if (this.currentDirection === "Up") {
      this.head = new Cell(this.head.x, this.head.y - 1)
    } else if (this.currentDirection === "Left") {
      this.head = new Cell(this.head.x - 1, this.head.y)
    }

    if (this.growCells > 0) {
      this.growCells = this.growCells - 1;
    } else {
      this.tail.shift();
    }
    this.tail.push(oldHeadDirection);

  }

  grow() {
    this.growCells = 3
  }

  getHead(): Cell {
    return this.head
  }

  isSnake(cell: Cell): boolean {
    return this.getTail().find(touchingItsef => touchingItsef.x ===cell.x&&touchingItsef.y ===cell.y) !==undefined
  }

  getDirection(): Direction {
    return this.currentDirection;
  }

  getTail(): Cell[] {
    return this.tail;
  }
}

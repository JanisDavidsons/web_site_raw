import { Cell } from "./Cell";
import { Configuration } from "./Configuration";

export class Grid {
  private configuration: Configuration;
  apples: Cell[]= [
    new Cell(33, 22),
    new Cell(35, 22),
    new Cell(37, 22),
    new Cell(39, 22),
    new Cell(41, 22)
  ]

  constructor(configuration: Configuration) {
    this.configuration = configuration;
  }

  seed(): void {
    for (let i = 0; i < this.configuration.apples; i++) {
      const x = Math.floor(Math.random()*this.configuration.nbCellsX);
      const y = Math.floor(Math.random()*this.configuration.nbCellsY);
      this.apples.push(new Cell(x,y));
    }
  }

  isAppleInside(cell: Cell): boolean {

    return this.getApples().find(it=>it.x ===cell.x && it.y==cell.y)!==undefined;
  }

  removeApple(cell: Cell): void {

    const apple = this.apples.find(it=>it.x ===cell.x && it.y==cell.y)
    if (!apple){
      return
    }
    const i = this.apples.indexOf(apple);
    this.apples.splice(i,1)
  }

  isDone(): boolean {
    return this.apples.length ===0;;
  }

  getApples(): Cell[] {
    return this.apples;
  }
}

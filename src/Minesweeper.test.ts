import { Minesweeper, Cell } from "./Minesweeper";
import { LEVELS } from "./levels";

describe("Minesweeper", () => {
  const level = LEVELS[0];

  it("should have field with closed cells", () => {
    const minesweeper = new Minesweeper(level);
    const cells = minesweeper.getCells();

    expect(cells.length).toBe(10);
    cells.forEach(row => expect(row.length).toBe(10));
  });

  it("Should make random bombs depending on difficulty level", () => {
    const minesweeper = new Minesweeper(level);
    expect(minesweeper.countCreatedMines()).toBe(level.mines);
  });

  it("Should be able to open cells", () => {
    const minesweeper = new Minesweeper(level);
    const allCells = minesweeper.getCells()
    const emptyCells:number[][] = minesweeper.returnEmtyCellsCoord()
    let cells = minesweeper.getCells();

    minesweeper.onLeftMouseUp(emptyCells[0][0],emptyCells[0][1]);
    minesweeper.onLeftMouseUp(emptyCells[1][0],emptyCells[1][1]);
    minesweeper.onLeftMouseUp(emptyCells[2][0],emptyCells[2][1]);
    
    cells = minesweeper.getCells();

    expect(cells[emptyCells[0][0]][emptyCells[0][1]].isOpen).toBe(true);
    expect(cells[emptyCells[1][0]][emptyCells[1][1]].isOpen).toBe(true);
    expect(cells[emptyCells[2][0]][emptyCells[2][1]].isOpen).toBe(true);
  });

  it("Should return how many bombs are next to the current cell", () => {
    level.mines = 0;
    const minesweeper = new Minesweeper(level);
    const cells = minesweeper.getCells();
    cells[0][0].isBomb = true;
    cells[1][0].isBomb = true;
    cells[1][1].isBomb = true;
    minesweeper.countTouchingMines(level);
    expect(cells[0][1].mines).toBe(3);
    level.mines = 10;
  });

  it("If opened cell is empty, should open all touching empty cells", () => {
    const minesweeper = new Minesweeper(level);
    let emptyCells: number[][] = minesweeper.returnEmtyCellsCoord();
    let currentEmptyCells:number = emptyCells.length;

    expect(minesweeper.revealZeros(emptyCells[0][0], emptyCells[0][1])).toBe(true);
    emptyCells = minesweeper.returnEmtyCellsCoord();
    expect(currentEmptyCells!== minesweeper.returnClosedCells().length);
    expect(minesweeper.revealZeros(emptyCells[1][0], emptyCells[1][1])).toBe(true);
  });

  it("If opened cell is bomb, should loose the game", () => {
    const minesweeper = new Minesweeper(level);
    const bombCoord: number[][] = minesweeper.returnBombCoordinates();

    expect(minesweeper.containsMine(bombCoord[0][0], bombCoord[0][1])).toBe(true);
    expect(minesweeper.containsMine(bombCoord[1][0], bombCoord[1][1])).toBe(true);
    expect(minesweeper.containsMine(bombCoord[2][0], bombCoord[2][1])).toBe(true);
    expect(minesweeper.containsMine(bombCoord[3][0], bombCoord[3][1])).toBe(true);

    minesweeper.onLeftMouseUp(bombCoord[0][0], bombCoord[0][1])
    expect(minesweeper.lost).toBe(true);
  });

  it("Counter should start after first cell is opened", () => {
    const minesweeper = new Minesweeper(level);
    const emptyCellCoord: number[][] = minesweeper.returnEmtyCellsCoord();

    minesweeper.onLeftMouseUp(emptyCellCoord[0][0], emptyCellCoord[0][1]);
    expect(minesweeper.timerOn).toBe(true);
  });

  it("When reset button is pressed, it should start a new game", () => {
    const minesweeper = new Minesweeper(level);
    minesweeper.reset();

    expect(minesweeper.timerOn).toBe(false);
    expect(minesweeper.timerID).toBe(0);
    expect(minesweeper.returnClosedCells.length).toBe(minesweeper.getCells.length);
    expect(minesweeper.currentTime).toBe(0);
  });

  it("Should be able to change levels from menu bar", () => {
    const minesweeper = new Minesweeper(level);

    minesweeper.selectLevel(LEVELS[1]);
    expect(minesweeper.currentLevel()).toBe(LEVELS[1])
    expect(minesweeper.getCells().length).toBe(25)

    minesweeper.selectLevel(LEVELS[2]);
    expect(minesweeper.currentLevel()).toBe(LEVELS[2])
    expect(minesweeper.getCells().length).toBe(50)

    minesweeper.selectLevel(LEVELS[0]);
    expect(minesweeper.currentLevel()).toBe(LEVELS[0])
    expect(minesweeper.getCells().length).toBe(10)
  });

  it("Should be able to toggle question mark from menu bar", () => {
    const minesweeper = new Minesweeper(level);

    minesweeper.toggleQuestionMarksEnabled();
    expect(minesweeper.questionMarksEnabled).toBe(true);
    minesweeper.toggleQuestionMarksEnabled();
    expect(minesweeper.questionMarksEnabled).toBe(false);
  });

  it("Should be able to toggle between question mark and flag on cells", () => {

    const minesweeper = new Minesweeper(level);
    const cells = minesweeper.getCells();
    minesweeper.toggleQuestionMarksEnabled();

    minesweeper.onRightMouseUp(0,0);
    expect(cells[0][0].isFlag).toBe(true);

    minesweeper.onRightMouseUp(0,0);
    expect(cells[0][0].isFlag).toBe(false);
    expect(cells[0][0].isUnsure).toBe(true);

    minesweeper.onRightMouseUp(0,0);
    expect(cells[0][0].isFlag).toBe(false);
    expect(cells[0][0].isUnsure).toBe(false);
  });

  it("should count mines left", () => {

    const minesweeper = new Minesweeper(level);
    const cells = minesweeper.getCells();

    minesweeper.onRightMouseUp(0,0);
    expect(minesweeper.minesLeft).toBe(level.mines-1);
    minesweeper.onRightMouseUp(0,1);
    expect(minesweeper.minesLeft).toBe(level.mines-2);
    minesweeper.onRightMouseUp(4,8);
    expect(minesweeper.minesLeft).toBe(level.mines-3);

    minesweeper.onRightMouseUp(0,0);
    expect(minesweeper.minesLeft).toBe(level.mines-2);
    minesweeper.onRightMouseUp(0,1);
    expect(minesweeper.minesLeft).toBe(level.mines-1);
    minesweeper.onRightMouseUp(4,8);
    expect(minesweeper.minesLeft).toBe(level.mines);
  });
});

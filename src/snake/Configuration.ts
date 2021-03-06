export const CELLS_HORIZONTAL = 70;
export const CELLS_VERTICAL = 35;
export const SPEED = 100;
export const MAX_LEVEL = 10;

export interface Configuration {
  level: number;
  speed: number;
  nbCellsX: number;
  nbCellsY: number;
  width: number;
  height: number;
  cellWidth: number;
  cellHeight: number;
  apples: number;
}

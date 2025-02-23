export interface Pieces {
  name: string;
  left: string;
  src: string;
  chart: number;
  class: string;
  top: string;
  movements: number;
  validMovements: string[];
}

export interface Measures {
  column: number | null;
  row: number | null;
  screen: number | null;
  pieces: string | null;
  paintings: Paintings[];
}

export interface Paintings {
  classs: string;
  top: number;
  left: number;
}

export interface GameManipulator {
  piece: string;
  left: string;
  top: string;
}

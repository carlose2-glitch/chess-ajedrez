export interface Pieces {
  name: string;
  left: string;
  src: string;
  class: string;
  top: string;
  movements: number;
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
  left: number;
  top: number;
  movements: number;
}

export interface RulesPieces {
  top: number;
  left: number;
  co: boolean;
}

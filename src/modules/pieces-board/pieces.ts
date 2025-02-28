import { computed, ref } from 'vue';
import type { Pieces } from '../interfaces/pieces.interface';

export const piecesManipulator = () => {
  const pieces = ref<Pieces[]>(array);
  /*evento de mover pieza */

  const modifyBoard = (c: number, f: number, namePiece: string | null) => {
    pieces.value.find((e, i) => {
      if (e.name === namePiece) {
        pieces.value[i].class = `absolute duration-700 left-${c}/8 top-${f}/8 w-1/8 cursor-pointer`;
        pieces.value[i].left = `${c}/8`;
        pieces.value[i].top = `${f}/8`;
        pieces.value[i].movements++;
      }
    });
  };
  /*evento eliminar enemigo */
  const deletePiece = (p: string | null, c: number, f: number) => {
    const findEnemy = pieces.value.filter(
      (e) => Number(e.left.slice(0, 1)) === c && Number(e.top.slice(0, 1)) === f,
    );
    if (findEnemy.length === 2) {
      const deleteEnemy = findEnemy.find((e) => e.name !== p);
      const newArray = pieces.value.filter((e) => {
        if (e.name !== deleteEnemy?.name) {
          return e;
        }
      });
      pieces.value = newArray;
    }
  };

  return {
    pieces: computed(() => [...pieces.value]),
    modifyBoard,
    deletePiece,
  };
};

/* piezas */
const array: Pieces[] = [
  /*piezas negras */
  {
    name: 'black-rook1',
    left: '0/8',
    src: 'torre-negra.png',
    class: 'absolute left-0/8 top-0/8 w-1/8 cursor-pointer',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-knight1',
    left: '1/8',
    src: 'caballo-negro.png',
    class: 'absolute left-1/8 top-0/8 w-1/8 cursor-pointer',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-bishop1',
    left: '2/8',
    src: 'alfil-negro.png',
    class: 'absolute left-2/8 top-0/8 w-1/8 cursor-pointer',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-queen',
    left: '3/8',
    src: 'Dama-negra.png',
    class: 'absolute left-3/8 top-0/8 w-1/8 cursor-pointer',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-king',
    left: '4/8',
    src: 'rey-negro.png',
    class: 'absolute left-4/8 top-0/8 w-1/8 cursor-pointer',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-bishop2',
    left: '5/8',
    src: 'alfil-negro.png',
    class: 'absolute left-5/8 top-0/8 w-1/8 cursor-pointer',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-knight2',
    left: '6/8',
    src: 'caballo-negro.png',
    class: 'absolute left-6/8 top-0/8 w-1/8 cursor-pointer',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-rook2',
    left: '7/8',
    src: 'torre-negra.png',
    class: 'absolute left-7/8 top-0/8 w-1/8 cursor-pointer',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-pawn1',
    left: '0/8',
    src: 'peon-negro.png',
    class: 'absolute left-0/8 top-1/8 w-1/8 cursor-pointer',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn2',
    left: '1/8',
    src: 'peon-negro.png',
    class: 'absolute left-1/8 top-1/8 w-1/8 cursor-pointer',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn3',
    left: '2/8',
    src: 'peon-negro.png',
    class: 'absolute left-2/8 top-1/8 w-1/8 cursor-pointer',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn4',
    left: '3/8',
    src: 'peon-negro.png',
    class: 'absolute left-3/8 top-1/8 w-1/8 cursor-pointer',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn5',
    left: '4/8',
    src: 'peon-negro.png',
    class: 'absolute left-4/8 top-1/8 w-1/8 cursor-pointer',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn6',
    left: '5/8',
    src: 'peon-negro.png',
    class: 'absolute left-5/8 top-1/8 w-1/8 cursor-pointer',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn7',
    left: '6/8',
    src: 'peon-negro.png',
    class: 'absolute left-6/8 top-1/8 w-1/8 cursor-pointer',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn8',
    left: '7/8',
    src: 'peon-negro.png',
    class: 'absolute left-7/8 top-1/8 w-1/8 cursor-pointer',
    top: '1/8',
    movements: 0,
  },

  /*white pieces  */

  {
    name: 'white-rook1',
    left: '0/8',
    src: 'torre-blanca.png',
    class: 'absolute left-0/8 top-7/8 w-1/8 cursor-pointer',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-knight1',
    left: '1/8',
    src: 'caballo-blanco.png',
    class: 'absolute left-1/8 top-7/8 w-1/8 cursor-pointer',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-bishop1',
    left: '2/8',
    src: 'alfil-blanco.png',
    class: 'absolute left-2/8 top-7/8 w-1/8 cursor-pointer',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-queen',
    left: '3/8',
    src: 'dama-blanca.png',
    class: 'absolute left-3/8 top-7/8 w-1/8 cursor-pointer',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-king',
    left: '4/8',
    src: 'rey-blanco.png',
    class: 'absolute left-4/8 top-7/8 w-1/8 cursor-pointer',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-bishop2',
    left: '5/8',
    src: 'alfil-blanco.png',
    class: 'absolute left-5/8 top-7/8 w-1/8 cursor-pointer',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-knight2',
    left: '6/8',
    src: 'caballo-blanco.png',
    class: 'absolute left-6/8 top-7/8 w-1/8 cursor-pointer',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-rook2',
    left: '7/8',
    src: 'torre-blanca.png',
    class: 'absolute left-7/8 top-7/8 w-1/8 cursor-pointer',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-pawn1',
    left: '0/8',
    src: 'peon-blanco.png',
    class: 'absolute left-0/8 top-6/8 w-1/8 cursor-pointer',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn2',
    left: '1/8',
    src: 'peon-blanco.png',
    class: 'absolute left-1/8 top-6/8 w-1/8 cursor-pointer',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn3',
    left: '2/8',
    src: 'peon-blanco.png',
    class: 'absolute left-2/8 top-6/8 w-1/8 cursor-pointer',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn4',
    left: '3/8',
    src: 'peon-blanco.png',
    class: 'absolute left-3/8 top-6/8 w-1/8 cursor-pointer',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn5',
    left: '4/8',
    src: 'peon-blanco.png',
    class: 'absolute left-4/8 top-6/8 w-1/8 cursor-pointer',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn6',
    left: '5/8',
    src: 'peon-blanco.png',
    class: 'absolute left-5/8 top-6/8 w-1/8 cursor-pointer',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn7',
    left: '6/8',
    src: 'peon-blanco.png',
    class: 'absolute left-6/8 top-6/8 w-1/8 cursor-pointer',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn8',
    left: '7/8',
    src: 'peon-blanco.png',
    class: 'absolute left-7/8 top-6/8 w-1/8 cursor-pointer',
    top: '6/8',
    movements: 0,
  },
];

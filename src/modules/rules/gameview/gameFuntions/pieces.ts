import type {
  deletePiece,
  GameManipulator,
  Pieces,
} from '@/modules/interfaces/gamefuntions/pieces.interface';
import { computed, ref } from 'vue';

export const piecesManipulator = (arrayPieces: Pieces[]) => {
  /* orden de las piezas en el juego*/
  const pieces = ref<Pieces[]>(arrayPieces);
  const piecesCoronation = array;
  /*arreglo de las piezas borradas */
  const deletePieces = ref<deletePiece[]>([]);
  /*evento de mover pieza */

  const modifyBoard = (
    c: number,
    f: number,
    namePiece: string | null,
    orderGame: GameManipulator[],
    online: boolean | null,
  ) => {
    pieces.value.find((e, i) => {
      const rotate = ref<string>('');
      if (e.name === namePiece) {
        if (online) {
          rotate.value = namePiece.includes('black') ? '180' : '0';
        } else {
          rotate.value = e.class.includes('180') ? '180' : '360';
        }

        pieces.value[i].class =
          `absolute duration-700 left-${c}/8 top-${f}/8 w-1/8 cursor-pointer rotate-${rotate.value}`;
        pieces.value[i].left = `${c}/8`;
        pieces.value[i].top = `${f}/8`;
        pieces.value[i].movements++;
      }
    });
    /*movimiento enroque */
    const piece = orderGame.find((e) => e.piece === namePiece);

    if (piece?.piece.includes('king') && piece.left === 4 && piece.movements === 0) {
      if (c === 6) {
        pieces.value.find((e, i) => {
          const rotate = e.class.includes('180') ? '180' : '360';
          if (
            e.left === '7/8' &&
            e.name.includes('rook') &&
            e.movements === 0 &&
            e.top === `${piece.top}/8`
          ) {
            pieces.value[i].class =
              `absolute duration-700 left-5/8 top-${f}/8 w-1/8 cursor-pointer rotate-${rotate}`;
            pieces.value[i].left = '5/8';
            pieces.value[i].top = `${f}/8`;
            pieces.value[i].movements++;
          }
        });
      } else if (c === 2) {
        pieces.value.find((e, i) => {
          const rotate = e.class.includes('180') ? '180' : '360';
          if (
            e.left === '0/8' &&
            e.name.includes('rook') &&
            e.movements === 0 &&
            e.top === `${f}/8`
          ) {
            pieces.value[i].class =
              `absolute duration-700 left-3/8 top-${f}/8 w-1/8 cursor-pointer rotate-${rotate}`;
            pieces.value[i].left = '3/8';
            pieces.value[i].top = `${f}/8`;
            pieces.value[i].movements++;
          }
        });
      }
    }
  };
  /*evento eliminar enemigo */
  const deletePiece = (p: string | null, c: number, f: number, orderGame: GameManipulator[]) => {
    const findEnemy = pieces.value.filter(
      (e) => Number(e.left.slice(0, 1)) === c && Number(e.top.slice(0, 1)) === f,
    );
    if (findEnemy.length === 2) {
      const deleteEnemy = findEnemy.find((e) => e.name !== p);
      const newArray = pieces.value.filter((e) => e.name !== deleteEnemy?.name);
      pieces.value = newArray;

      if (deleteEnemy) {
        deletePieces.value.push({
          src: deleteEnemy?.src,
          name: deleteEnemy?.name,
        });
      }
    }

    /*captura al paso eliminar*/
    const findEnemyCap = orderGame.find((e) => e.left === c && e.top === f && e.piece === '');

    if (findEnemyCap && findEnemy[0].name.includes('pawn')) {
      const colorEnemy = findEnemy[0].name.includes('white') ? 'black' : 'white';
      if (colorEnemy === 'white') {
        const pawnEnemy = orderGame.find(
          (e) =>
            e.left === findEnemyCap.left &&
            e.top === findEnemyCap.top - 1 &&
            e.piece.includes('white-pawn') &&
            e.movements === 1,
        );

        const newArray = pieces.value.filter((e) => e.name !== pawnEnemy?.piece);
        const findEnemy = pieces.value.find((e) => e.name === pawnEnemy?.piece);
        pieces.value = newArray;

        if (findEnemy) {
          deletePieces.value.push({
            src: findEnemy?.src,
            name: findEnemy?.name,
          });
        }
      } else if (colorEnemy === 'black') {
        const pawnEnemy = orderGame.find(
          (e) =>
            e.left === findEnemyCap.left &&
            e.top === findEnemyCap.top + 1 &&
            e.piece.includes('black-pawn') &&
            e.movements === 1,
        );

        const newArray = pieces.value.filter((e) => e.name !== pawnEnemy?.piece);
        const findEnemy = pieces.value.find((e) => e.name === pawnEnemy?.piece);
        pieces.value = newArray;

        if (findEnemy) {
          deletePieces.value.push({
            src: findEnemy?.src,
            name: findEnemy?.name,
          });
        }
      }
    }
  };

  /*coronacion del peon */
  const coPawnEvent = (c: number, r: number, p: string | null, pchange: string | null) => {
    // console.log(c, r, p, pchange);
    /*extrae todas las piezas menos el peon a remover */
    const newArray = pieces.value.filter((e) => e.name !== p);

    /*extrae los datos de la pieza  */
    const newPiece = piecesCoronation.find((e) => e.src === pchange);

    /* extrae las piezas que hay en el tablero*/
    const sortPiece = pieces.value.filter((e) => e.src === pchange);
    /*orderna de mayor a menor cual es la pieza a sumar */
    if (sortPiece.length > 0) {
      const higherPiece = sortPiece.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      /*extrae el numero de la pieza mayor que hay en tablero */
      const number = Number(higherPiece[0].name.charAt(higherPiece[0].name.length - 1)) + 1;
      const newName = higherPiece[0].name.slice(0, -1);

      /* insertar nueva pieza */
      if (pchange) {
        newArray.push({
          name: newName + number,
          left: `${c}/8`,
          src: pchange,
          class: `absolute duration-700 left-${c}/8 top-${r}/8 w-1/8 cursor-pointer animate-grow`,
          top: `${r}/8`,
          movements: 0,
        });
      }
      pieces.value = newArray;
    } else {
      if (newPiece) {
        newArray.push({
          name: newPiece?.name.slice(0, -1) + 1,
          left: `${c}/8`,
          src: newPiece?.src,
          class: `absolute duration-700 left-${c}/8 top-${r}/8 w-1/8 cursor-pointer animate-grow`,
          top: `${r}/8`,
          movements: 0,
        });
      }
      pieces.value = newArray;
    }
  };

  const rotatePieces = (r: number) => {
    //console.log(pieces.value);

    const newArray = pieces.value.map((e) => {
      const newClass = e.class.slice(0, 59);

      const obj = {
        name: e.name,
        left: e.left,
        src: e.src,
        class: newClass + ` rotate-${r}`,
        top: e.top,
        movements: e.movements,
      };
      return obj;
    });
    //console.log(newArray);
    pieces.value = newArray;
  };

  return {
    pieces: computed(() => [...pieces.value]),
    deletes: computed(() => [...deletePieces.value]),
    modifyBoard,
    deletePiece,
    coPawnEvent,
    rotatePieces,
  };
};

/* piezas */
export const array: Pieces[] = [
  /*piezas negras */
  {
    name: 'black-rook1',
    left: '0/8',
    src: 'torre-negra.png',
    class: 'absolute duration-700 left-0/8 top-0/8 w-1/8 cursor-pointer rotate-360',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-knight1',
    left: '1/8',
    src: 'caballo-negro.png',
    class: 'absolute duration-700 left-1/8 top-0/8 w-1/8 cursor-pointer rotate-360',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-bishop1',
    left: '2/8',
    src: 'alfil-negro.png',
    class: 'absolute duration-700 left-2/8 top-0/8 w-1/8 cursor-pointer rotate-360',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-queen',
    left: '3/8',
    src: 'Dama-negra.png',
    class: 'absolute duration-700 left-3/8 top-0/8 w-1/8 cursor-pointer rotate-360',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-king',
    left: '4/8',
    src: 'rey-negro.png',
    class: 'absolute duration-700 left-4/8 top-0/8 w-1/8 cursor-pointer rotate-360',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-bishop2',
    left: '5/8',
    src: 'alfil-negro.png',
    class: 'absolute duration-700 left-5/8 top-0/8 w-1/8 cursor-pointer rotate-360',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-knight2',
    left: '6/8',
    src: 'caballo-negro.png',
    class: 'absolute duration-700 left-6/8 top-0/8 w-1/8 cursor-pointer rotate-360',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-rook2',
    left: '7/8',
    src: 'torre-negra.png',
    class: 'absolute duration-700 left-7/8 top-0/8 w-1/8 cursor-pointer rotate-360',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'black-pawn1',
    left: '0/8',
    src: 'peon-negro.png',
    class: 'absolute duration-700 left-0/8 top-1/8 w-1/8 cursor-pointer rotate-360',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn2',
    left: '1/8',
    src: 'peon-negro.png',
    class: 'absolute duration-700 left-1/8 top-1/8 w-1/8 cursor-pointer rotate-360',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn3',
    left: '2/8',
    src: 'peon-negro.png',
    class: 'absolute duration-700 left-2/8 top-1/8 w-1/8 cursor-pointer rotate-360',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn4',
    left: '3/8',
    src: 'peon-negro.png',
    class: 'absolute duration-700 left-3/8 top-1/8 w-1/8 cursor-pointer rotate-360',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn5',
    left: '4/8',
    src: 'peon-negro.png',
    class: 'absolute duration-700 left-4/8 top-1/8 w-1/8 cursor-pointer rotate-360',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn6',
    left: '5/8',
    src: 'peon-negro.png',
    class: 'absolute duration-700 left-5/8 top-1/8 w-1/8 cursor-pointer rotate-360',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn7',
    left: '6/8',
    src: 'peon-negro.png',
    class: 'absolute duration-700 left-6/8 top-1/8 w-1/8 cursor-pointer rotate-360',
    top: '1/8',
    movements: 0,
  },
  {
    name: 'black-pawn8',
    left: '7/8',
    src: 'peon-negro.png',
    class: 'absolute duration-700 left-7/8 top-1/8 w-1/8 cursor-pointer rotate-360',
    top: '1/8',
    movements: 0,
  },

  /*white pieces  */

  {
    name: 'white-rook1',
    left: '0/8',
    src: 'torre-blanca.png',
    class: 'absolute duration-700 left-0/8 top-7/8 w-1/8 cursor-pointer rotate-360',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-knight1',
    left: '1/8',
    src: 'caballo-blanco.png',
    class: 'absolute duration-700 left-1/8 top-7/8 w-1/8 cursor-pointer rotate-360',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-bishop1',
    left: '2/8',
    src: 'alfil-blanco.png',
    class: 'absolute duration-700 left-2/8 top-7/8 w-1/8 cursor-pointer rotate-360',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-queen',
    left: '3/8',
    src: 'dama-blanca.png',
    class: 'absolute duration-700 left-3/8 top-7/8 w-1/8 cursor-pointer rotate-360',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-king',
    left: '4/8',
    src: 'rey-blanco.png',
    class: 'absolute duration-700 left-4/8 top-7/8 w-1/8 cursor-pointer rotate-360',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-bishop2',
    left: '5/8',
    src: 'alfil-blanco.png',
    class: 'absolute duration-700 left-5/8 top-7/8 w-1/8 cursor-pointer rotate-360',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-knight2',
    left: '6/8',
    src: 'caballo-blanco.png',
    class: 'absolute duration-700 left-6/8 top-7/8 w-1/8 cursor-pointer rotate-360',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-rook2',
    left: '7/8',
    src: 'torre-blanca.png',
    class: 'absolute duration-700 left-7/8 top-7/8 w-1/8 cursor-pointer rotate-360',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'white-pawn1',
    left: '0/8',
    src: 'peon-blanco.png',
    class: 'absolute duration-700 left-0/8 top-6/8 w-1/8 cursor-pointer rotate-360',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn2',
    left: '1/8',
    src: 'peon-blanco.png',
    class: 'absolute duration-700 left-1/8 top-6/8 w-1/8 cursor-pointer rotate-360',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn3',
    left: '2/8',
    src: 'peon-blanco.png',
    class: 'absolute duration-700 left-2/8 top-6/8 w-1/8 cursor-pointer rotate-360',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn4',
    left: '3/8',
    src: 'peon-blanco.png',
    class: 'absolute duration-700 left-3/8 top-6/8 w-1/8 cursor-pointer rotate-360',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn5',
    left: '4/8',
    src: 'peon-blanco.png',
    class: 'absolute duration-700 left-4/8 top-6/8 w-1/8 cursor-pointer rotate-360',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn6',
    left: '5/8',
    src: 'peon-blanco.png',
    class: 'absolute duration-700 left-5/8 top-6/8 w-1/8 cursor-pointer rotate-360',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn7',
    left: '6/8',
    src: 'peon-blanco.png',
    class: 'absolute duration-700 left-6/8 top-6/8 w-1/8 cursor-pointer rotate-360',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'white-pawn8',
    left: '7/8',
    src: 'peon-blanco.png',
    class: 'absolute duration-700 left-7/8 top-6/8 w-1/8 cursor-pointer rotate-360',
    top: '6/8',
    movements: 0,
  },
];
/*arreglo para hacer pruebas */
/*const arrayTest: Pieces[] = [
  {
    name: 'white-pawn8',
    left: '5/8',
    src: 'peon-blanco.png',
    class: 'absolute duration-700 left-5/8 top-2/8 w-1/8 cursor-pointer rotate-360',
    top: '2/8',
    movements: 0,
  },
  {
    name: 'black-pawn5',
    left: '4/8',
    src: 'peon-negro.png',
    class: 'absolute duration-700 left-4/8 top-0/8 w-1/8 cursor-pointer rotate-360',
    top: '0/8',
    movements: 0,
  },
  {
    name: 'white-pawn9',
    left: '6/8',
    src: 'peon-blanco.png',
    class: 'absolute duration-700 left-6/8 top-7/8 w-1/8 cursor-pointer rotate-360',
    top: '7/8',
    movements: 0,
  },
  {
    name: 'black-pawn3',
    left: '2/8',
    src: 'peon-negro.png',
    class: 'absolute duration-700 left-2/8 top-6/8 w-1/8 cursor-pointer rotate-360',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'black-pawn4',
    left: '5/8',
    src: 'peon-negro.png',
    class: 'absolute duration-700 left-5/8 top-6/8 w-1/8 cursor-pointer rotate-360',
    top: '6/8',
    movements: 0,
  },
  {
    name: 'black-knight1',
    left: '1/8',
    src: 'caballo-negro.png',
    class: 'absolute duration-700 left-1/8 top-0/8 w-1/8 cursor-pointer rotate-360',
    top: '0/8',
    movements: 0,
  },
];*/

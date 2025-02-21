import type { Pieces } from '../interfaces/pieces.interface';

export const piecesManipulator = () => {
  const pieces: Pieces[] = [
    /*black pieces */
    {
      name: 'black-rook1',
      left: '0/8',
      src: 'torre-negra.png',
      chart: 1,
      class: 'absolute left-0/8 top-0/8 w-1/8 cursor-pointer',
      top: '0/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-knight1',
      left: '1/8',
      src: 'caballo-negro.png',
      chart: 2,
      class: 'absolute left-1/8 top-0/8 w-1/8 cursor-pointer',
      top: '0/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-bishop1',
      left: '2/8',
      src: 'alfil-negro.png',
      chart: 3,
      class: 'absolute left-2/8 top-0/8 w-1/8 cursor-pointer',
      top: '0/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-queen',
      left: '3/8',
      src: 'Dama-negra.png',
      chart: 4,
      class: 'absolute left-3/8 top-0/8 w-1/8 cursor-pointer',
      top: '0/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-King',
      left: '4/8',
      src: 'rey-negro.png',
      chart: 5,
      class: 'absolute left-4/8 top-0/8 w-1/8 cursor-pointer',
      top: '0/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-bishop2',
      left: '5/8',
      src: 'alfil-negro.png',
      chart: 6,
      class: 'absolute left-5/8 top-0/8 w-1/8 cursor-pointer',
      top: '0/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-Knight2',
      left: '6/8',
      src: 'caballo-negro.png',
      chart: 7,
      class: 'absolute left-6/8 top-0/8 w-1/8 cursor-pointer',
      top: '0/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-rook2',
      left: '7/8',
      src: 'torre-negra.png',
      chart: 8,
      class: 'absolute left-7/8 top-0/8 w-1/8 cursor-pointer',
      top: '0/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-pawn1',
      left: '0/8',
      src: 'peon-negro.png',
      chart: 9,
      class: 'absolute left-0/8 top-1/8 w-1/8 cursor-pointer',
      top: '1/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-pawn2',
      left: '1/8',
      src: 'peon-negro.png',
      chart: 10,
      class: 'absolute left-1/8 top-1/8 w-1/8 cursor-pointer',
      top: '1/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-pawn3',
      left: '2/8',
      src: 'peon-negro.png',
      chart: 11,
      class: 'absolute left-2/8 top-1/8 w-1/8 cursor-pointer',
      top: '1/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-pawn4',
      left: '3/8',
      src: 'peon-negro.png',
      chart: 12,
      class: 'absolute left-3/8 top-1/8 w-1/8 cursor-pointer',
      top: '1/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-pawn5',
      left: '4/8',
      src: 'peon-negro.png',
      chart: 13,
      class: 'absolute left-4/8 top-1/8 w-1/8 cursor-pointer',
      top: '1/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-pawn6',
      left: '5/8',
      src: 'peon-negro.png',
      chart: 14,
      class: 'absolute left-5/8 top-1/8 w-1/8 cursor-pointer',
      top: '1/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-pawn7',
      left: '6/8',
      src: 'peon-negro.png',
      chart: 15,
      class: 'absolute left-6/8 top-1/8 w-1/8 cursor-pointer',
      top: '1/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'black-pawn8',
      left: '7/8',
      src: 'peon-negro.png',
      chart: 16,
      class: 'absolute left-7/8 top-1/8 w-1/8 cursor-pointer',
      top: '1/8',
      movements: 0,
      validMovements: [''],
    },

    /*white pieces  */

    {
      name: 'white-rook1',
      left: '0/8',
      src: 'torre-blanca.png',
      chart: 49,
      class: 'absolute left-0/8 top-7/8 w-1/8 cursor-pointer',
      top: '7/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-knight1',
      left: '1/8',
      src: 'caballo-blanco.png',
      chart: 50,
      class: 'absolute left-1/8 top-7/8 w-1/8 cursor-pointer',
      top: '7/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-bishop1',
      left: '2/8',
      src: 'alfil-blanco.png',
      chart: 51,
      class: 'absolute left-2/8 top-7/8 w-1/8 cursor-pointer',
      top: '7/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-queen',
      left: '3/8',
      src: 'dama-blanca.png',
      chart: 52,
      class: 'absolute left-3/8 top-7/8 w-1/8 cursor-pointer',
      top: '7/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-King',
      left: '4/8',
      src: 'rey-blanco.png',
      chart: 53,
      class: 'absolute left-4/8 top-7/8 w-1/8 cursor-pointer',
      top: '7/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-bishop2',
      left: '5/8',
      src: 'alfil-blanco.png',
      chart: 54,
      class: 'absolute left-5/8 top-7/8 w-1/8 cursor-pointer',
      top: '7/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-Knight2',
      left: '6/8',
      src: 'caballo-blanco.png',
      chart: 55,
      class: 'absolute left-6/8 top-7/8 w-1/8 cursor-pointer',
      top: '7/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-rook2',
      left: '7/8',
      src: 'torre-blanca.png',
      chart: 56,
      class: 'absolute left-7/8 top-7/8 w-1/8 cursor-pointer',
      top: '7/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-pawn1',
      left: '0/8',
      src: 'peon-blanco.png',
      chart: 57,
      class: 'absolute left-0/8 top-6/8 w-1/8 cursor-pointer',
      top: '6/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-pawn2',
      left: '1/8',
      src: 'peon-blanco.png',
      chart: 58,
      class: 'absolute left-1/8 top-6/8 w-1/8 cursor-pointer',
      top: '6/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-pawn3',
      left: '2/8',
      src: 'peon-blanco.png',
      chart: 59,
      class: 'absolute left-2/8 top-6/8 w-1/8 cursor-pointer',
      top: '6/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-pawn4',
      left: '3/8',
      src: 'peon-blanco.png',
      chart: 60,
      class: 'absolute left-3/8 top-6/8 w-1/8 cursor-pointer',
      top: '6/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-pawn5',
      left: '4/8',
      src: 'peon-blanco.png',
      chart: 61,
      class: 'absolute left-4/8 top-6/8 w-1/8 cursor-pointer',
      top: '6/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-pawn6',
      left: '5/8',
      src: 'peon-blanco.png',
      chart: 62,
      class: 'absolute left-5/8 top-6/8 w-1/8 cursor-pointer',
      top: '6/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-pawn7',
      left: '6/8',
      src: 'peon-blanco.png',
      chart: 63,
      class: 'absolute left-6/8 top-6/8 w-1/8 cursor-pointer',
      top: '6/8',
      movements: 0,
      validMovements: [''],
    },
    {
      name: 'white-pawn8',
      left: '7/8',
      src: 'peon-blanco.png',
      chart: 64,
      class: 'absolute left-7/8 top-6/8 w-1/8 cursor-pointer',
      top: '6/8',
      movements: 0,
      validMovements: [''],
    },
  ];

  return {
    pieces,
  };
};

<template>
  <div class="w-full justify-center relative">
    <img
      src="/src/images/chess-background.jpg"
      alt="opacity"
      v-if="propsRotate.turnPlayer !== movements % 2"
      class="absolute z-10 w-full bg-gray-600 opacity-0"
    />
    <!-- tablero -->
    <img src="/src/images/chess-background.jpg" class="w-full" alt="tablero" />
    <!-- numeros y letras -->
    <p v-for="(n, index) in i" v-bind:key="n" :class="stylesNumbers(index)">{{ n }}</p>
    <p v-for="(l, index) in letters" v-bind:key="l" :class="stylesLetters(index)">{{ l }}</p>

    <!-- piezas -->

    <BoardPieces
      @information="choosePiece"
      :extract-position-pieces="extractPositionPieces.pieces.value"
      :turn="turn"
      :movements="movements"
    />
    <!-- color de los cuadros -->
    <ManipulatorBoard
      :column="c"
      :row="r"
      :screen="sc"
      :pieces="p"
      :paintings="paintings.array.value"
      @second-movement="finalMovement"
    />
    <CoronationPawn
      v-if="coronationView"
      :c="colCoronation"
      :r="rowCoronation"
      :p="pieceCo"
      @select-piece="coronationFuntion"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import BoardPieces from '@/modules/components/global/BoardPieces.vue';
import ManipulatorBoard from '@/modules/components/global/ManipulatorBoard.vue';

import { rulesGames } from '@/modules/rules/gameview/rulesGames/rulesOfPieces.ts';
import { coronation } from '@/modules/rules/gameview/gameFuntions/coronation';

import { check } from '@/modules/rules/gameview/gameFuntions/check.ts';
import { piecesManipulator } from '@/modules/rules/gameview/gameFuntions/pieces.ts';
import { funtionPaintins } from '@/modules/rules/gameview/gameFuntions/paintingPictures.ts';
import { game } from '@/modules/rules/gameview/gameFuntions/gameBoard.ts';
import type { deletePiece, Pieces } from '@/modules/interfaces/gamefuntions/pieces.interface.ts';
import { io } from 'socket.io-client';
import CoronationPawn from '../../global/CoronationPawn.vue';

interface StatusPlayer {
  user: string | null;

  online: boolean | null;
  g: boolean;
  b: number;
}

interface Props {
  change: number;
  turnPlayer: number;
  enemy: string;
  user: string;
  movementsGame: number;
  idGame: number;
  pieces: Pieces[];
  fGame: boolean;
  colorF: string | null;
  endTime: boolean;
}

const propsRotate = defineProps<Props>();
//import.meta.env.VITE_URL_API_PROD,
//import.meta.env.VITE_URL_API_LOCAL,
const socket = io(import.meta.env.VITE_URL_API_PROD, {
  auth: {
    user: propsRotate.user,
    game: true,
    board: propsRotate.idGame,
  },
});

const turn = ['white', 'black'];

/*mostrar piezas al hacer coronacion del peon */
const coronationView = ref<boolean>(false);
const coMovement = ref<boolean>(false);
interface Time {
  min: number;
  seg: number;
}
const rowCoronation = ref<number | null>(null);
const colCoronation = ref<number | null>(null);
const pieceCo = ref<string | null>(null);
const piechaCo = ref<string | null>('');
const sendTime = ref<Time | null>(null);

interface OnMovement {
  userTo: string;

  piece: string;

  col: number;

  row: number;

  movements: number;

  time: string;
}

interface winnerGame {
  color: string;

  user: string;

  idBoard: number;
}

const movements = ref<number>(propsRotate.movementsGame);

const onMovement = propsRotate.user + 'movement';
const finalEmit = propsRotate.user + 'winner';

/* piezas del tablero*/

const extractPositionPieces = piecesManipulator(propsRotate.pieces);

/*colores de los cuadros del tablero */

const paintings = funtionPaintins();

const c = ref<number>(0);
const r = ref<number>(0);
const sc = ref<number>(0);
const p = ref<string | null>(null);

const dataPieceBoard = reactive({
  c,
  r,
  p,
});
const checkmate = ref<boolean>(false);

const colorWin = ref<string | null>(null);

const datacheck = reactive({
  checkmate,
  colorWin,
});

/*control del juego */

const orderGame = game(extractPositionPieces.pieces.value);

/* estilos del diseño del tablero */
const i = [8, 7, 6, 5, 4, 3, 2, 1];
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const arrayStylesNumbers = [
  'absolute left-[3px] text-xs top-0/8 font-bold',
  'font-bold left-[3px] text-xs absolute top-1/8 text-[#bebaba]',
  'absolute left-[3px] text-xs top-2/8 font-bold',
  'font-bold left-[3px] text-xs absolute top-3/8 text-[#bebaba]',
  'absolute left-[3px] text-xs top-4/8 font-bold',
  'font-bold left-[3px] text-xs absolute top-5/8 text-[#bebaba]',
  'absolute left-[3px] text-xs top-6/8 font-bold',
  'font-bold left-[3px] text-xs absolute top-7/8 text-[#bebaba]',
];

const arrayStylesLetters = [
  'font-bold text-xs bottom-0/7 pr-1 right-7/8 absolute font-serif text-[#bebaba]',
  'absolute text-xs bottom-0/7 pr-1 right-6/8 font-serif font-bold',
  'font-bold right-5/8 text-xs pr-1 absolute font-serif bottom-0/7 text-[#bebaba]',
  'absolute right-4/8 text-xs pr-1 bottom-0/7 font-serif font-bold',
  'font-bold right-3/8 text-xs pr-1 absolute font-serif bottom-0/7 text-[#bebaba]',
  'absolute right-2/8 text-xs pr-1 bottom-0/7 font-serif font-bold',
  'font-bold right-1/8 text-xs pr-1 absolute font-serif bottom-0/7 text-[#bebaba]',
  'absolute right-0/8 text-xs pr-1 bottom-0/7 font-serif font-bold',
];

const stylesNumbers = (i: number) => {
  return arrayStylesNumbers[i];
};

const stylesLetters = (i: number) => {
  return arrayStylesLetters[i];
};

/* escucha la posicion del evento */

/*onMounted(() => manipulatorTable.value?.addEventListener('click', boardClick));

const boardClick = (e: { layerY: number; layerX: number; target: { clientHeight: number } }) => {
  /*evento del mouse para capturar la posicion
  const y = e.layerY;
  const x = e.layerX;

  /*tamaño del tablero
  const heightScreen = e.target.clientHeight;

  const row: number = Math.floor((y * 8) / heightScreen);
  const column: number = Math.floor((x * 8) / heightScreen);
  console.log(row);
};
*/
/*evento de la pieza seleccionada */

const choosePiece = (piece: string, column: number, row: number) => {
  coronationView.value = false;
  coMovement.value = false;
  c.value = column;
  r.value = row;
  p.value = piece;
};
/*escucha la nueva pieza seleccionada */
watch(dataPieceBoard, (d) => {
  paintings.reload();
  /*  Posicion de la pieza en la cual se va a colorear  */
  const position = paintings.array.value.findIndex((e) => e.left === c.value && e.top === r.value);

  /*pintar cuadro */

  paintings.paint(position, c.value, r.value);

  const paint = rulesGames(d.p, d.c, d.r, orderGame.array.value);

  /* Pintar movimientos disponibles*/

  paintings.paintingsAvailable(paint);

  /*coronacion */
  const coronationFuntion = coronation(paint);
  coronationView.value = coronationFuntion.d;
  rowCoronation.value = coronationFuntion.f;
  colCoronation.value = coronationFuntion.c;
  pieceCo.value = d.p;
});

/* segundo movimiento*/

const finalMovement = async (col: number, row: number, piece: string | null) => {
  /* mover pieza graficamente*/

  if (coMovement.value) {
    /*mover pieza */
    extractPositionPieces.modifyBoard(col, row, piece, orderGame.array.value, true);
    /* coronacion del peon */
    extractPositionPieces.coPawnEvent(col, row, piece, piechaCo.value);
    /*eliminar pieza*/
    extractPositionPieces.deletePiece(piece, col, row, orderGame.array.value);

    paintings.reload();
    orderGame.gameManipulator(extractPositionPieces.pieces.value);

    checkmate.value = check(orderGame.array.value, piece);

    coMovement.value = false;
  } else {
    /*mover pieza */
    extractPositionPieces.modifyBoard(col, row, piece, orderGame.array.value, true);

    /* eliminar pieza graficamente */
    extractPositionPieces.deletePiece(piece, col, row, orderGame.array.value);

    /* poner todos los cuadros verdes a transparentes */
    paintings.reload();
    /* control del juego */
    orderGame.gameManipulator(extractPositionPieces.pieces.value);
    checkmate.value = check(orderGame.array.value, piece);
  }

  colorWin.value = piece?.includes('white') ? 'Blancas' : 'Negras';

  const time = window.localStorage.getItem('time-chess');

  socket.emit('movement-piece', {
    userTo: propsRotate.enemy,

    piece: piece,

    col: col,

    row: row,

    movements: movements.value + 1,

    id: propsRotate.idGame,

    array: extractPositionPieces.pieces.value,

    time: time,
  });
  movements.value++;
};
/*coronacion del peon */
const coronationFuntion = (name: string | null) => {
  coMovement.value = coronationView.value;
  coronationView.value = false;
  piechaCo.value = name;
};

/*jaque mate */

const emits = defineEmits<{
  final: [
    jm: boolean /*jaque mate */,
    loss: boolean /* perdedor */,
    color: string | null /*color de las piezas */,
    deleteP: deletePiece[] /*piezas eliminadas */,
    time: Time | null /*tiempo transcurrido del enemigo */,
    dis: boolean /*jaque mate desconectado */,
  ];
}>();
/*si checkmate es verdadero (jaque mate) */
watch(datacheck, (check) => {
  emits(
    'final',
    check.checkmate,
    false,
    check.colorWin,
    extractPositionPieces.deletes.value,
    sendTime.value,
    false,
  );
  sendTime.value = null;
});

/*rotar piezas del tablero */
extractPositionPieces.rotatePieces(propsRotate.change);

/*movimiento del enemigo */
const movementF = (e: OnMovement) => {
  if (coMovement.value) {
    /*mover pieza */
    extractPositionPieces.modifyBoard(e.col, e.row, e.piece, orderGame.array.value, true);
    /* coronacion del peon */
    extractPositionPieces.coPawnEvent(e.col, e.row, e.piece, piechaCo.value);
    /*eliminar pieza*/
    extractPositionPieces.deletePiece(e.piece, e.col, e.row, orderGame.array.value);

    paintings.reload();
    orderGame.gameManipulator(extractPositionPieces.pieces.value);

    checkmate.value = check(orderGame.array.value, e.piece);

    coMovement.value = false;
  } else {
    /*mover pieza */
    extractPositionPieces.modifyBoard(e.col, e.row, e.piece, orderGame.array.value, true);

    /* eliminar pieza graficamente */
    extractPositionPieces.deletePiece(e.piece, e.col, e.row, orderGame.array.value);

    /* poner todos los cuadros verdes a transparentes */
    paintings.reload();
    /* control del juego */
    orderGame.gameManipulator(extractPositionPieces.pieces.value);
    checkmate.value = check(orderGame.array.value, e.piece);
  }
  colorWin.value = e.piece?.includes('white') ? 'Blancas' : 'Negras';

  movements.value = e.movements;

  sendTime.value = JSON.parse(e.time);
};
socket.on(onMovement, movementF);
/*final de la partida del perdedor jaque mate*/
watch(propsRotate, (final) => {
  if (final.fGame) {
    socket.emit('winner', {
      color: final.colorF,
      user: propsRotate.enemy,
      idBoard: propsRotate.idGame,
    });
  }
  /* pasa por aca solamente cuando se acaba el tiempo de cualquier usuario */
  if (final.endTime) {
    emits('final', true, false, final.colorF, extractPositionPieces.deletes.value, null, false);
  }
});

/*escuchar el final de la partida perdedor jaque mate*/

const timeOut = ref<boolean>(false);

const winner = (e: winnerGame) => {
  timeOut.value = true;
  emits('final', false, timeOut.value, e.color, extractPositionPieces.deletes.value, null, false);
};

socket.on(finalEmit, winner);

/* observacion de los que estan desconectados */

socket.on('clients-online', (a: StatusPlayer[]) => {
  const find = a.find(
    (e) => e.user === propsRotate.enemy && e.g === true && e.b === propsRotate.idGame,
  );
  /*observando que los 2 usuarios esten conetados */
  /*desconectado  */
  if (!find) {
    emits(
      'final',
      false,
      timeOut.value,
      propsRotate.colorF,
      extractPositionPieces.deletes.value,
      null,
      true,
    );
  } else {
    /*conectado */
    emits(
      'final',
      false,
      false,
      propsRotate.colorF,
      extractPositionPieces.deletes.value,
      null,
      false,
    );
  }
});
</script>

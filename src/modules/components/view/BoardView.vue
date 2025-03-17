<template>
  <div class="w-full flex justify-center relative">
    <!-- tablero -->
    <img
      src="/src/images/chess-background.jpg"
      ref="manipulatorTable"
      class="rounded-md w-full"
      alt="tablero"
    />
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
import BoardPieces from '../manipulationBoard/BoardPieces.vue';
import ManipulatorBoard from '../manipulationBoard/ManipulatorBoard.vue';
import { piecesManipulator } from '../../gameFuntions/pieces';
import { funtionPaintins } from '../../gameFuntions/paintingPictures';
import { game } from '../../gameFuntions/gameBoard';

import { rulesGames } from '../../rules/rulesGames/rulesOfPieces';
import { coronation } from '../../gameFuntions/coronation';
import CoronationPawn from '../manipulationBoard/CoronationPawn.vue';
import { check } from '@/modules/gameFuntions/check';

const turn = ['white', 'black'];

const movements = ref<number>(0);

/*mostrar piezas al hacer coronacion del peon */
const coronationView = ref<boolean>(false);
const coMovement = ref<boolean>(false);

const rowCoronation = ref<number | null>(null);
const colCoronation = ref<number | null>(null);
const pieceCo = ref<string | null>(null);
const piechaCo = ref<string | null>('');

/* piezas del tablero*/

const extractPositionPieces = piecesManipulator();

/*colores de los cuadros del tablero */

const paintings = funtionPaintins();

const manipulatorTable = ref<HTMLElement | null>(null);

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

const finalMovement = (col: number, row: number, piece: string | null) => {
  /* mover pieza graficamente*/

  if (coMovement.value) {
    /*mover pieza */
    extractPositionPieces.modifyBoard(col, row, piece, orderGame.array.value);
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
    extractPositionPieces.modifyBoard(col, row, piece, orderGame.array.value);

    /* eliminar pieza graficamente */
    extractPositionPieces.deletePiece(piece, col, row, orderGame.array.value);

    /* poner todos los cuadros verdes a transparentes */
    paintings.reload();
    /* control del juego */
    orderGame.gameManipulator(extractPositionPieces.pieces.value);
    checkmate.value = check(orderGame.array.value, piece);
  }

  movements.value++;
};
/*coronacion del peon */
const coronationFuntion = (name: string | null) => {
  coMovement.value = coronationView.value;
  coronationView.value = false;
  piechaCo.value = name;
};

/*jaque mate */

const emits = defineEmits<{ final: [f: boolean] }>();

watch(checkmate, (check) => {
  console.log(check);

  emits('final', check);
});
</script>

<template>
  <div class="w-full flex justify-center relative">
    <!-- tablero -->
    <img
      src="/src/images/Tablero de Ajedrez_.png"
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import BoardPieces from './BoardPieces.vue';
import ManipulatorBoard from './ManipulatorBoard.vue';
import { piecesManipulator } from '../pieces-board/pieces';
import { funtionPaintins } from '../pieces-board/paintingPictures';
import { game } from '../pieces-board/gameBoard';

/* piezas del tablero*/

const extractPositionPieces = piecesManipulator();

/*colores de los cuadros del tablero */

const paintings = funtionPaintins();

const manipulatorTable = ref<HTMLElement | null>(null);

const c = ref<number | null>(null);
const r = ref<number | null>(null);
const sc = ref<number | null>(null);
const p = ref<string | null>(null);

const dataPieceBoard = reactive({
  c,
  r,
  p,
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

onMounted(() => manipulatorTable.value?.addEventListener('click', boardClick));
/*evento del destino de la pieza */
const boardClick = (e: { layerY: number; layerX: number; target: { clientHeight: number } }) => {
  /*evento del mouse para capturar la posicion */
  const y = e.layerY;
  const x = e.layerX;

  /*tamaño del tablero */
  const heightScreen = e.target.clientHeight;

  const row: number = Math.floor((y * 8) / heightScreen);
  const column: number = Math.floor((x * 8) / heightScreen);
};

/*evento de la pieza seleccionada */

const choosePiece = (piece: string, column: number, row: number) => {
  console.log(piece, column, row);
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

  /* Pintar movimientos disponibles*/
  paintings.paintingsAvailable(orderGame.array.value);
});

/* segundo movimiento*/

const finalMovement = (col: number, row: number, piece: string | null) => {
  extractPositionPieces.modifyBoard(col, row, piece);
  paintings.reload();
  orderGame.gameManipulator(extractPositionPieces.pieces.value);
};
</script>

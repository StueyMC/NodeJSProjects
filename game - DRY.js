// The Game of Life

// Suppose you have an M by N board of cells, where each cell is marked as alive or dead.
// This arrangement of the board is called the state, and the next board state is found according to a set of rules:
// Neighbours: each cell has eight neighbours, up, down, left, right, and along the diagonals.
// Underpopulation: a live cell with zero or one live neighbours becomes dead in the next state.
// Survival: a live cell with exactly two or three live neighbours remains alive in the next state.
// Overpopulation: a live cell with four or more live neighbours becomes dead in the next state.
// Reproduction: a dead cell with exactly three neighbours becomes alive in the next state.

// Implement an algorithm for calculating the next state of a board, given the current state.
let acc = 'X';
let debug = false;
let liveNeighbours = 0;
let generations = 16;

const random = [
  [acc, " ", acc, acc, " ", acc, " ", acc, acc, " ", acc],
  [acc, " ", acc, acc, " ", acc, " ", acc, acc, " ", acc],
  [acc, " ", acc, " ", " ", acc, " ", acc, acc, " ", acc],
  [acc, " ", acc, acc, acc, acc, " ", acc, acc, " ", acc],
  [acc, " ", " ", acc, acc, acc, " ", acc, acc, " ", acc],
  [" ", acc, acc, acc, acc, acc, " ", acc, acc, " ", acc],
  [" ", acc, acc, acc, " ", acc, " ", " ", acc, " ", acc],
  [acc, " ", acc, acc, " ", acc, acc, " ", " ", " ", " "],
  [acc, " ", acc, acc, " ", acc, " ", " ", " ", acc, " "],
  [acc, " ", acc, acc, " ", " ", " ", " ", acc, " ", " "],
  [acc, " ", acc, acc, " ", acc, " ", " ", acc, acc, acc],
];

const glider = [
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", acc, " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", acc, " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", acc, acc, acc, " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
];

const pulsar = [
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", acc, acc, acc, " ", " ", " ", acc, acc, acc, " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", acc, " ", " ", " ", " ", acc, " ", acc, " ", " ", " ", " ", acc, " ", " "],
  [" ", " ", acc, " ", " ", " ", " ", acc, " ", acc, " ", " ", " ", " ", acc, " ", " "],
  [" ", " ", acc, " ", " ", " ", " ", acc, " ", acc, " ", " ", " ", " ", acc, " ", " "],
  [" ", " ", " ", " ", acc, acc, acc, " ", " ", " ", acc, acc, acc, " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", acc, acc, acc, " ", " ", " ", acc, acc, acc, " ", " ", " ", " "],
  [" ", " ", acc, " ", " ", " ", " ", acc, " ", acc, " ", " ", " ", " ", acc, " ", " "],
  [" ", " ", acc, " ", " ", " ", " ", acc, " ", acc, " ", " ", " ", " ", acc, " ", " "],
  [" ", " ", acc, " ", " ", " ", " ", acc, " ", acc, " ", " ", " ", " ", acc, " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", acc, acc, acc, " ", " ", " ", acc, acc, acc, " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
];

/**
 * Return the board state advanced by one iteration.
 */

const check_alive_cell = (element) => {
  liveNeighbours += element === acc;
};

const checkZeroIndex = (currentRow, altTable, altTable2, checkIndex) => {
  check_alive_cell(currentRow[currentRow.length - 1]);
  check_alive_cell(currentRow[checkIndex + 1]);
  check_alive_cell(altTable[0]);
  check_alive_cell(altTable[1]);
  check_alive_cell(altTable[currentRow.length - 1]);
  check_alive_cell(altTable2[0]);
  check_alive_cell(altTable2[1]);
  check_alive_cell(altTable2[currentRow.length - 1]);
};

const checkLastIndex = (currentRow, altTable, altTable2, checkIndex) => {
  check_alive_cell(currentRow[checkIndex - 1]);
  check_alive_cell(currentRow[0]);
  check_alive_cell(altTable[currentRow.length - 2]);
  check_alive_cell(altTable[currentRow.length - 1]);
  check_alive_cell(altTable[0]);
  check_alive_cell(altTable2[0]);
  check_alive_cell(altTable2[currentRow.length - 1]);
  check_alive_cell(altTable2[currentRow.length - 2]);
};

const checkOtherIndex = (currentRow, altTable, altTable2, checkIndex) => {
  check_alive_cell(currentRow[checkIndex - 1]);
  check_alive_cell(currentRow[checkIndex + 1]);
  check_alive_cell(altTable[checkIndex]);
  check_alive_cell(altTable[checkIndex - 1]);
  check_alive_cell(altTable[checkIndex + 1]);
  check_alive_cell(altTable2[checkIndex - 1]);
  check_alive_cell(altTable2[checkIndex]);
  check_alive_cell(altTable2[checkIndex + 1]);
};

const advance = (state) => {
  let newState = [];

  const firstTable = state[0];
  const lastTable = state[state.length - 1];

  for (let index = 0; index < state.length; index++) {
    const currentRow = state[index];
    const nextRow = state[index + 1];
    const prevRow = state[index - 1];

    newState[index] = [];

    for (let checkIndex = 0; checkIndex < currentRow.length; checkIndex++) {
      let element = currentRow[checkIndex];

      /* [!] Would this be neater with optional parameters in the function to remove else if (discuss w/ ben & alive) [!] */
      // Element Checking
      switch (index) {
        case 0: // First Row
          switch (checkIndex) {
            case 0:
              checkZeroIndex(currentRow, nextRow, lastTable, checkIndex);
              break;
            case currentRow.length - 1:
              checkLastIndex(currentRow, nextRow, lastTable, checkIndex);
              break;
            default:
              checkOtherIndex(currentRow, lastTable, nextRow, checkIndex);
              break;
          }
          break;
        case state.length - 1: // Last Row
          switch (checkIndex) {
            case 0:
              checkZeroIndex(currentRow, prevRow, firstTable, checkIndex);
              break;
            case currentRow.length - 1:
              checkLastIndex(currentRow, prevRow, firstTable, checkIndex);
              break;
            default:
              checkOtherIndex(currentRow, prevRow, firstTable, checkIndex);
              break;
          }
          break;
        default: // Other Rows
          switch (checkIndex) {
            case 0:
              checkZeroIndex(currentRow, nextRow, prevRow, checkIndex);
              break;
            case currentRow.length - 1:
              checkLastIndex(currentRow, nextRow, prevRow, checkIndex);
              break;
            default:
              checkOtherIndex(currentRow, nextRow, prevRow, checkIndex);
              break;
          }
          break;
      }

      // Cell State Check
      switch (liveNeighbours) {
        case 3: // Reproduction Check
          newState[index][checkIndex] = acc;
          break;

        case 2: // Survival Check
          element === acc
            ? (newState[index][checkIndex] = acc)
            : (newState[index][checkIndex] = " ");
          break;

        default: // 0, 1 or 4+
          newState[index][checkIndex] = " ";
          break;
      }

      liveNeighbours = 0;
    }
  }

  return newState;
};

/**
 * Runs the game of life.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const run = async () => {
  let state = pulsar;
  console.table(state);

  for (let i = 0; i < generations; i++) {
    state = advance(state);
    console.clear();

     state.forEach(row => {
       console.log(row.join(' '))
     });

    //console.table(state);
    await delay(650); /// waiting 650 ms.
  }
};

run();

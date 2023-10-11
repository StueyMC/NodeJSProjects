// The Game of Life

// Suppose you have an M by N board of cells, where each cell is marked as alive or dead.
// This arrangement of the board is called the state, and the next board state is found according to a set of rules:
// Neighbours: each cell has eight neighbours, up, down, left, right, and along the diagonals.
// Underpopulation: a live cell with zero or one live neighbours becomes dead in the next state.
// Survival: a live cell with exactly two or three live neighbours remains alive in the next state.
// Overpopulation: a live cell with four or more live neighbours becomes dead in the next state.
// Reproduction: a dead cell with exactly three neighbours becomes alive in the next state.

// Implement an algorithm for calculating the next state of a board, given the current state.

const random = [
  ["X", " ", "X", "X", " ", "X", " ", "X", "X", " ", "X"],
  ["X", " ", "X", "X", " ", "X", " ", "X", "X", " ", "X"],
  ["X", " ", "X", " ", " ", "X", " ", "X", "X", " ", "X"],
  ["X", " ", "X", "X", "X", "X", " ", "X", "X", " ", "X"],
  ["X", " ", " ", "X", "X", "X", " ", "X", "X", " ", "X"],
  [" ", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X"],
  [" ", "X", "X", "X", " ", "X", " ", " ", "X", " ", "X"],
  ["X", " ", "X", "X", " ", "X", "X", " ", " ", " ", " "],
  ["X", " ", "X", "X", " ", "X", " ", " ", " ", "X", " "],
  ["X", " ", "X", "X", " ", " ", " ", " ", "X", " ", " "],
  ["X", " ", "X", "X", " ", "X", " ", " ", "X", "X", "X"],
];

const glider = [
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "X", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", "X", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", "X", "X", "X", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
];

const pulsar = [
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", "X", "X", "X", " ", " ", " ", "X", "X", "X", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", "X", " ", " ", " ", " ", "X", " ", "X", " ", " ", " ", " ", "X", " ", " "],
  [" ", " ", "X", " ", " ", " ", " ", "X", " ", "X", " ", " ", " ", " ", "X", " ", " "],
  [" ", " ", "X", " ", " ", " ", " ", "X", " ", "X", " ", " ", " ", " ", "X", " ", " "],
  [" ", " ", " ", " ", "X", "X", "X", " ", " ", " ", "X", "X", "X", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", "X", "X", "X", " ", " ", " ", "X", "X", "X", " ", " ", " ", " "],
  [" ", " ", "X", " ", " ", " ", " ", "X", " ", "X", " ", " ", " ", " ", "X", " ", " "],
  [" ", " ", "X", " ", " ", " ", " ", "X", " ", "X", " ", " ", " ", " ", "X", " ", " "],
  [" ", " ", "X", " ", " ", " ", " ", "X", " ", "X", " ", " ", " ", " ", "X", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", "X", "X", "X", " ", " ", " ", "X", "X", "X", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
];

/**
 * Return the board state advanced by one iteration.
 */
let cellCount = 0;

const checkX = (element) => {
  // 45 Lines Reduced
  if (element === "X") {
    cellCount++;
  }
};

const advance = (state) => {
  let newState = [];

  for (let index = 0; index < state.length; index++) {
    let table = state[index];

    newState[index] = [];

    if (index == 0) {
      let altTable = state[index + 1];
      let lastTable = state[state.length - 1]

      for (let checkIndex = 0; checkIndex < table.length; checkIndex++) {
        let element = table[checkIndex];

        // Check how many X's surround element
        switch (checkIndex) {
          case 0:
            checkX(table[table.length - 1]); // OUT OF BORDER - Far Right
            checkX(table[checkIndex + 1]);
            checkX(altTable[0]);
            checkX(altTable[1]);
            checkX(altTable[table.length - 1]); // OUT OF BORDER - Far Right
            checkX(lastTable[0]); // OUT OF BORDER - Last Row
            checkX(lastTable[1]); // OUT OF BORDER - Last Row
            checkX(lastTable[table.length - 1]); // OUT OF BORDER - Last Row
            break;
          case table.length - 1:
            checkX(table[checkIndex - 1]);
            checkX(altTable[table.length - 2]);
            checkX(altTable[table.length - 1]);
            checkX(altTable[0]); // OUT OF BORDER - 2nd Row Start
            checkX(table[0]); // OUT OF BORDER - 1st Row Start
            checkX(lastTable[0]); // OUT OF BORDER - Last Row
            checkX(lastTable[table.length - 1]); // OUT OF BORDER - Last Row
            checkX(lastTable[table.length - 2]); // OUT OF BORDER - Last Row
            break;
          default:
            checkX(table[checkIndex - 1]);
            checkX(table[checkIndex + 1]);
            checkX(lastTable[checkIndex]); // OUT OF BORDER - Last Row
            checkX(lastTable[checkIndex - 1]); // OUT OF BORDER - Last Row
            checkX(lastTable[checkIndex + 1]); // OUT OF BORDER - Last Row
            checkX(altTable[checkIndex - 1]);
            checkX(altTable[checkIndex]);
            checkX(altTable[checkIndex + 1]);
            break;
        }

        // Cell Check
        switch (cellCount) {
          case 3: // Reproduction Check
            newState[index][checkIndex] = "X";
            break;

          case 2: // Survival Check
            element === "X"
              ? (newState[index][checkIndex] = "X")
              : (newState[index][checkIndex] = " ");
            break;

          default: // 0, 1 or 4+
            newState[index][checkIndex] = " ";
            break;
        }

        cellCount = 0;
      }
    } else if (index == state.length - 1) {
      let altTable = state[index - 1];
      let firstTable = state[0]

      for (let checkIndex = 0; checkIndex < table.length; checkIndex++) {
        let element = table[checkIndex];

        // Check how many X's surround element
        switch (checkIndex) {
          case 0:
            checkX(table[checkIndex + 1]);
            checkX(altTable[0]);
            checkX(altTable[1]);
            checkX(table[table.length - 1]); // OUT OF BORDER - Last Row
            checkX(altTable[table.length - 1]); // OUT OF BORDER
            checkX(firstTable[table.length - 1]); // OUT OF BORDER - First Row
            checkX(firstTable[0]); // OUT OF BORDER - First Row
            checkX(firstTable[1]); // OUT OF BORDER - First Row
            break;
          case table.length - 1:
            checkX(table[checkIndex - 1]);
            checkX(altTable[table.length - 2]);
            checkX(altTable[table.length - 1]);
            checkX(table[0]); // OUT OF BORDER
            checkX(firstTable[0]); // OUT OF BORDER - First Row
            checkX(firstTable[table.length - 1]); // OUT OF BORDER - First Row
            checkX(firstTable[table.length - 2]); // OUT OF BORDER - First Row
            checkX(altTable[0]); // OUT OF BORDER
            break;
          default:
            checkX(table[checkIndex - 1]);
            checkX(table[checkIndex + 1]);
            checkX(altTable[checkIndex - 1]);
            checkX(altTable[checkIndex]);
            checkX(altTable[checkIndex + 1]);
            checkX(firstTable[checkIndex]); // OUT OF BORDER - First Row
            checkX(firstTable[checkIndex - 1]); // OUT OF BORDER - First Row
            checkX(firstTable[checkIndex + 1]); // OUT OF BORDER - First Row
            break;
        }

        // Cell Check
        switch (cellCount) {
          case 3: // Reproduction Check
            newState[index][checkIndex] = "X";
            break;

          case 2: // Survival Check
            element === "X"
              ? (newState[index][checkIndex] = "X")
              : (newState[index][checkIndex] = " ");
            break;

          default: // 0, 1 or 4+
            newState[index][checkIndex] = " ";
            break;
        }

        cellCount = 0;
      }
    } else {
      let nextTable = state[index + 1];
      let prevTable = state[index - 1];

      for (let checkIndex = 0; checkIndex < table.length; checkIndex++) {
        let element = table[checkIndex];

        // Check how many X's surround element
        switch (checkIndex) {
          case 0:
            checkX(table[checkIndex + 1]);
            checkX(table[table.length - 1]); // OUT OF BORDER - End of Table
            checkX(nextTable[0]);
            checkX(nextTable[1]);
            checkX(nextTable[table.length - 1]); // OUT OF BORDER - End of Table
            checkX(prevTable[0]);
            checkX(prevTable[1]);
            checkX(prevTable[table.length - 1]); // OUT OF BORDER - End of Table
            break;
          case table.length - 1:
            checkX(table[checkIndex - 1]);
            checkX(table[0]); // OUT OF BORDER - Start of Table
            checkX(nextTable[table.length - 2]);
            checkX(nextTable[table.length - 1]);
            checkX(nextTable[0]); // OUT OF BORDER - Start of Table
            checkX(prevTable[table.length - 2]);
            checkX(prevTable[table.length - 1]);
            checkX(prevTable[0]); // OUT OF BORDER - Start of Table
            break;
          default:
            checkX(table[checkIndex - 1]);
            checkX(table[checkIndex + 1]);
            checkX(nextTable[checkIndex - 1]);
            checkX(nextTable[checkIndex]);
            checkX(nextTable[checkIndex + 1]);
            checkX(prevTable[checkIndex - 1]);
            checkX(prevTable[checkIndex]);
            checkX(prevTable[checkIndex + 1]);
            break;
        }

        // Cell Check
        switch (cellCount) {
          case 3: // Reproduction Check
            newState[index][checkIndex] = "X";
            break;

          case 2: // Survival Check
            element === "X"
              ? (newState[index][checkIndex] = "X")
              : (newState[index][checkIndex] = " ");
            break;

          default: // 0, 1 or 4+
            newState[index][checkIndex] = " ";
            break;
        }

        cellCount = 0;
      }
    }
  }

  return newState;
};

/**
 * Runs the game of life.
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const run = async () => {
  let state = pulsar;
  console.table(state);
  
  for (let i = 0; i < 50; i++) {
    state = advance(state);
    console.clear()
    console.table(state);
    await delay(450); /// waiting 450 ms.
  }
};

run();

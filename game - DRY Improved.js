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
let generations = 20;
let random_board_size = 50

let isTopRow, isLeftEdge;

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

const generateRandomBoard = (size) => {
  let cells = size / 2;

  let newState = [];

  for (let y = 0; y < size; y++) {
    row = [];

    for (let x = 0; x < size; x++) {
      cellStatus = Math.random() * 10 > 2 ? (' ') : (acc);
      row.push(cellStatus);
    }

    newState.push(row);
  }

  return newState;
};

random_generated = generateRandomBoard(random_board_size);

/**
 * Return the board state advanced by one iteration.
 */
const getCellStatus = (state, x, y) => {
  let cellStatus = false;
  if (state[y][x] === acc) {
    cellStatus = true;
  }

  return cellStatus;
};

const applyNewStatus = (liveNeighbourCount, isCellAlive) => {
  let newStatus = " ";

  if (isCellAlive) {
    if (liveNeighbourCount <= 1) {
      newStatus = " ";
    }

    if (liveNeighbourCount == 2 || liveNeighbourCount == 3) {
      newStatus = acc;
    }

    if (liveNeighbourCount >= 4) {
      newStatus = " ";
    }
  } else {
    if (liveNeighbourCount == 3) {
      newStatus = acc;
    }
  }

  return newStatus;
};

const getNeighbours = (offset, state, x, y) => {
  let liveNeighbours = 0;

  offset.forEach((cell) => {
    liveNeighbours += getCellStatus(state, x + cell[0], y + cell[1]);
  });

  return liveNeighbours;
};

const getCornerEdgeNeighbours = (state, x, y, isTopRow, isLeftEdge) => {
  let editedX = isLeftEdge ? +1 : -1;
  let editedY = isTopRow ? +1 : -1;
  let neighboursOffset = [
    [editedX, 0],
    [0, editedY],
    [editedX, editedY],
  ];

  return getNeighbours(neighboursOffset, state, x, y);
};

const getHorizontalEdgeNeighbours = (state, x, y, isTopRow) => {
  let editedY = isTopRow ? +1 : -1;
  let neighboursOffset = [
    [-1, 0],
    [+1, 0],
    [-1, editedY],
    [0, editedY],
    [+1, editedY],
  ];

  return getNeighbours(neighboursOffset, state, x, y);
};

const getVerticalEdgeNeighbours = (state, x, y, isLeftEdge) => {
  let editedX = isLeftEdge ? +1 : -1;
  let neighboursOffset = [
    [0, +1],
    [editedX, +1],
    [editedX, 0],
    [editedX, -1],
    [0, -1],
  ];

  return getNeighbours(neighboursOffset, state, x, y);
};

const getAllNeighbours = (state, x, y) => {
  let neighboursOffset = [
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, -1],
    [0, +1],
    [+1, -1],
    [+1, 0],
    [+1, +1],
  ];

  return getNeighbours(neighboursOffset, state, x, y);
};

const identicalCheck = (val1, val2, val3) => {
  return val1 === val2 || val1 === val3;
};

const getLiveNeighbours = (state, x, y) => {
  let liveNeighboursCount = 0;

  if (identicalCheck(y, 0, state.length - 1)) {
    isTopRow = y === 0;
    if (identicalCheck(x, 0, state[y].length - 1)) {
      isLeftEdge = x === 0;
      liveNeighboursCount = getCornerEdgeNeighbours(state, x, y, isTopRow, isLeftEdge);
    } else {
      liveNeighboursCount = getHorizontalEdgeNeighbours(state, x, y, isTopRow);
    }
  } else {
    if (identicalCheck(x, 0, state[y].length - 1)) {
      isLeftEdge = x === 0;
      liveNeighboursCount = getVerticalEdgeNeighbours(state, x, y, isLeftEdge);
    } else {
      liveNeighboursCount = getAllNeighbours(state, x, y);
    }
  }

  return liveNeighboursCount;
};

const advance = (state) => {
  let newState = [];

  for (let y = 0; y < state.length; y++) {
    row = [];

    for (let x = 0; x < state[y].length; x++) {
      let liveNeighbours = getLiveNeighbours(state, x, y);
      let cellStatus = getCellStatus(state, x, y);
      let newStatus = applyNewStatus(liveNeighbours, cellStatus);

      if (debug) {
        console.log(
          `Cell: ${x}, ${y}, Value: ${cellStatus}, Cell Live Neighbours: ${liveNeighbours}, New Status: ${newStatus}`
        );
      }

      row.push(newStatus);
    }

    newState.push(row);
  }

  return newState;
};

/**
 * Runs the game of life.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const run = async () => {
  let state = random_generated;
  state.forEach((row) => {
    console.log(row.join(" "));
  });

  if (state == random_generated) {
    generations = state.length;
  }

  for (let i = 0; i < generations; i++) {
    state = advance(state);
    console.clear();

    state.forEach((row) => {
      console.log(row.join(" "));
    });

    await delay(650); /// waiting 650 ms.
  }
};

run();

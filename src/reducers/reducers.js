import React from'react';
import { SET_SPACE_STATE, SET_BOARD_SIZE, SpaceStates } from '../actions/actions';
import Space from '../containers/Space'

/*
  Implements the functionality of minesweeper where if a space not touching bombs
  is clicked and the adjacent spaces that are 0 are revealed

  NEEDS WORK, ONLY CHECKS TILL FAILURE IN EACH OF 8 DIRECTIONS
*/
function propogateZeros(id, size, spaces, state){
  let dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

  let x = id % size;
  let y = parseInt(id / size, 10);
  let spacesToCheckFromAgain = [];

  dirs.forEach(dir => {
    let tempY = y + dir[0];
    let tempX = x + dir[1];
    while(tempY < spaces.length && tempY > -1 && tempX < spaces.length && tempX > -1){
      if(spaces[tempY][tempX].props.adjacentBombs === 0
        && !spaces[tempY][tempX].props.hasBomb
        && spaces[tempY][tempX].props.spaceState !== SpaceStates.IS_UNCOVERED){
        spaces[tempY][tempX] = spaceBuilder(spaces[tempY][tempX], state);
        spacesToCheckFromAgain.push(spaces[tempY][tempX]);
        tempY += dir[0];
        tempX += dir[1];
      }
      else break;
    }
  });

  spacesToCheckFromAgain.forEach(space => propogateZeros(space.props.id, size, spaces, state));

  return spaces;
}

function spaceBuilder(space, state){
  return <Space
    id={space.props.id}
    key={state.idGenerator++}
    adjacentBombs={space.props.adjacentBombs}
    hasBomb={space.props.hasBomb}
    boardSize={space.props.boardSize}
    spaceState={SpaceStates.IS_UNCOVERED} />
}

function checkForBombs(spaces, size, i, j){
  let bombsTouching = 0;
  let dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

  dirs.forEach(dir => {
    let y = i + dir[0];
    let x = j + dir[1];

    if(y > -1 && y < size && x > -1 && x < size && spaces[y][x]){
      if(spaces[y][x].props.hasBomb)
        bombsTouching++;
    }
  });

  return bombsTouching;
}

function generateBoard(state, size){
  let lim;
  switch(size){
    case 8:
      lim = .16;
      break
    case 12:
      lim = .26;
      break;
    case 15:
      lim = .41;
      break;
    default:
      lim = .61;
      break;
  }

  let spaces = Array(size).fill(0).map(row => new Array(size).fill(false));
  let bombsPlaced = 0;
  for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
      if(Math.random() < lim){
        spaces[i][j] = <Space
          id={i * size + j}
          key={state.idGenerator++}
          adjacentBombs={0}
          hasBomb={true}
          boardSize={size}
          spaceState={SpaceStates.IS_COVERED} />
          bombsPlaced++;
      }
    }
  }

  for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
      if(spaces[i][j] === false){
        let adjacentBombs = checkForBombs(spaces, size, i, j);
        spaces[i][j] = <Space
          id={i * size + j}
          key={state.idGenerator++}
          adjacentBombs={adjacentBombs}
          hasBomb={false}
          boardSize={size}
          spaceState={SpaceStates.IS_COVERED} />
      }
    }
  }

  return [spaces, bombsPlaced];
}

function board(state = { idGenerator: 0 }, action){
  switch(action.type){
    case SET_SPACE_STATE:
      let x = action.id % action.size;
      let y = parseInt(action.id / action.size, 10);
      let spaces = [...state.spaces];

      if(action.spaceState === SpaceStates.IS_FLAGGED){
        state.bombsRemaining--;
        if(state.bombsRemaining === 0){
          //send win message
        }
      }
      if(spaces[y][x].props.spaceState === SpaceStates.IS_FLAGGED && spaces[y][x].props.hasBomb)
        state.bombsRemaining++;
      if(action.spaceState === SpaceStates.IS_UNCOVERED && spaces[y][x].props.hasBomb){
        //send loss message
      }

      spaces[y][x] = <Space
        id={action.id}
        key={state.idGenerator++}
        adjacentBombs={spaces[y][x].props.adjacentBombs}
        hasBomb={spaces[y][x].props.hasBomb}
        boardSize={action.size}
        spaceState={action.spaceState} />
      if(action.spaceState !== SpaceStates.IS_FLAGGED
        && spaces[y][x].props.adjacentBombs === 0
        && !spaces[y][x].props.hasBomb){
        spaces = propogateZeros(action.id, action.size, spaces, state);
      }
      return Object.assign({}, state, {spaces: spaces});
    case SET_BOARD_SIZE:
      let boardStats = generateBoard(state, action.boardSize);
      return Object.assign({}, state, {spaces: boardStats[0], bombsRemaining: boardStats[1]});
    default:
      return state;
  }
}

export default board;

import React from'react';
import { SET_SPACE_STATE, SpaceStates } from '../actions/actions';
import Space from '../containers/Space'

/*
  Implements the functionality of minesweeper where if a space not touching bombs
  is clicked and the adjacent spaces that are 0 are revealed

  NEEDS WORK, ONLY CHECKS TILL FAILURE IN EACH OF 8 DIRECTIONS
*/
function propogateZeros(id, spaces, state, y, x){
  let dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

  dirs.forEach(dir => {
    let tempY = y + dir[0];
    let tempX = x + dir[1];
    while(tempY < spaces.length && tempY > -1 && tempX < spaces.length && tempX > -1){
      if(spaces[tempY][tempX].props.adjacentBombs === 0 && !spaces[tempY][tempX].props.hasBomb){
        spaces[tempY][tempX] = spaceBuilder(spaces[tempY][tempX],state);
        tempY += dir[0];
        tempX += dir[1]
      }
      else break;
    }
  });

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

function spaceState(state = Array([]), action){
  switch(action.type){
    case SET_SPACE_STATE:
      let x = action.id % action.size;
      let y = parseInt(action.id / action.size, 10);
      let spaces = [...state.spaces];
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
        spaces = propogateZeros(action.id, spaces, state, y, x);
      }
      return Object.assign({}, state, {spaces: spaces});
    default:
      return state;
  }
}

export default spaceState;

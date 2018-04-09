import React from'react';
import { SET_SPACE_STATE } from '../actions/actions';
import Space from '../containers/Space'

function spaceState(state = Array([]), action){
  switch(action.type){
    case SET_SPACE_STATE:
      let x = action.id % action.size;
      let y = parseInt(action.id / action.size, 10);
      let spaces = [...state.spaces];
      spaces[y][x] = <Space
        id={spaces[y][x].props.id}
        key={state.idGenerator++}
        numBombs={spaces[y][x].props.numBombs}
        boardSize={action.size}
        spaceState={action.spaceState} />;
        return Object.assign({}, state, {spaces: spaces});
    default:
      return state;
  }
}

export default spaceState;

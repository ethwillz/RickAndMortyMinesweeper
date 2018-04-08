import { combineReducers } from 'redux';
import { SET_SPACE_STATE, SpaceStates } from '../actions/actions';
const { IS_NORMAL } = SpaceStates;

function spaceState(state = IS_NORMAL, action){
  switch(action.type){
    case SET_SPACE_STATE:
      return state;
    default:
      return state;
  }
}

const game = combineReducers({
  spaceState
});

export default game;

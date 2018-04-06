import { combineReducers } from 'redux';
import {CLICK_BOMB, CLICK_ZERO, CLICK_NUM} from './actions';

function click(state = [], action){
  switch(action.type){
    case CLICK_BOMB:
      return [
        ...state,
        {
          img: action.img,
          h2Style: {display: 'none'}
        }
      ]
      default:
        return state;
  }
}

const game = combineReducers({

});

export default game;

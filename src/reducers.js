import { combineReducers } from 'redux';
import { SPACE_CLICK } from './actions';

/*
  DISCLAIMER: THIS IS EXPERIMENTATION I HAVE NO FUCKING CLUE HOW TO USE REDUX
*/

function space_click(state = [], action){
  switch(action.type){
    case SPACE_CLICK:
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

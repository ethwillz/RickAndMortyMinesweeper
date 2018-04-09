import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './containers/Board';
import Space from './containers/Space'
import registerServiceWorker from './registerServiceWorker';
import spaceState from './reducers/reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { SpaceStates } from './actions/actions';

function checkForBombs(spaces, size, i, j){
  let bombsTouching = 0;

  if(i > 0
    && spaces[i-1][j]
    && spaces[i-1][j].props.spaceState === SpaceStates.IS_COVERED_BOMB) bombsTouching++;
  if(i > 0
    && j < size - 1
    && spaces[i-1][j+1]
    && spaces[i-1][j+1].props.spaceState === SpaceStates.IS_COVERED_BOMB) bombsTouching++;
  if(j < size - 1
    && spaces[i][j+1]
    && spaces[i][j+1].props.spaceState === SpaceStates.IS_COVERED_BOMB) bombsTouching++;
  if(i < size - 1
    && j < size - 1
    && spaces[i+1][j+1]
    && spaces[i+1][j+1].props.spaceState === SpaceStates.IS_COVERED_BOMB) bombsTouching++;
  if(i < size - 1
    && spaces[i+1][j]
    && spaces[i+1][j].props.spaceState === SpaceStates.IS_COVERED_BOMB) bombsTouching++;
  if(i < size - 1
    && j > 0
    && spaces[i+1][j-1]
    && spaces[i+1][j-1].props.spaceState === SpaceStates.IS_COVERED_BOMB) bombsTouching++;
  if(j > 0
    && spaces[i][j-1]
    && spaces[i][j-1].props.spaceState === SpaceStates.IS_COVERED_BOMB) bombsTouching++;
  if(i > 0
    && j > 0
    && spaces[i-1][j-1]
    && spaces[i-1][j-1].props.spaceState === SpaceStates.IS_COVERED_BOMB) bombsTouching++;

  return bombsTouching;
}

let idGenerator = 0;
let size = 8;
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
for(let i = 0; i < size; i++){
  for(let j = 0; j < size; j++){
    if(Math.random() < lim){
      let key = idGenerator++;
      spaces[i][j] = <Space
        id={i * size + j}
        key={key}
        numBombs={0}
        boardSize={size}
        spaceState={SpaceStates.IS_COVERED_BOMB} />
    }
  }
}

for(let i = 0; i < size; i++){
  for(let j = 0; j < size; j++){
    if(spaces[i][j] === false){
      let bombsTouching = checkForBombs(spaces, size, i, j);
      let key = idGenerator++;
      spaces[i][j] = <Space
        id={i * size + j}
        key={key}
        numBombs={bombsTouching}
        boardSize={size}
        spaceState={SpaceStates.IS_NORMAL} />
    }
  }
}

const initialState = {
  spaces: spaces,
  idGenerator: idGenerator,
}

let store = createStore(spaceState, initialState)

ReactDOM.render(
  <Provider store={store}>
    <Board/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();

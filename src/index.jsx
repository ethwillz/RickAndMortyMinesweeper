import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board';
import Space from './components/Space'
import registerServiceWorker from './registerServiceWorker';
import game from './reducers/reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { SpaceStates } from './actions/actions';

function handleBombClick(){
  console.log("Bomb clicked");
}

function handleNormalClick(){
  console.log("Normal space clicked");
}

let idGenerator = 0;
let size = 8;
let spaces = Array(size).fill(0).map(row => new Array(size).fill(false));
for(let i = 0; i < size; i++){
  for(let j = 0; j < size; j++){
    let id = idGenerator++;
    spaces[i][j] = <Space
      id={id}
      key={id}
      numBombs={0}
      boardDimension={70 / size + 'vh'}
      spaceState={SpaceStates.IS_BOMB}
      onClick={handleBombClick} />
  }
}

for(let i = 0; i < size; i++){
  for(let j = 0; j < size; j++){
    if(spaces[i][j] === false){
      let bombsTouching = this.checkForBombs(spaces, size, i, j);
      let id = idGenerator++;
      spaces[i][j] = <Space
        id={id}
        key={id}
        numBombs={bombsTouching}
        boardDimension={70 / size + 'vh'}
        spaceState={SpaceStates.IS_NORMAL}
        onClick={handleNormalClick} />
    }
  }
}

let store = createStore(game)

ReactDOM.render(
  <Provider store={store}>
    <Board spaces={spaces}/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();

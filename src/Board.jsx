import React, { Component } from 'react';
import { createStore } from 'redux';
import _ from 'lodash';
import {PortalSpace, BombSpace} from './Spaces';
import './Board.css';
import game from './reducers';
const store = createStore(game);

/*
  EASY: 15% 8x8
  MEDI: 25% 12x12
  HARD: 40% 15x15
  EXTR: 60% 20x20
*/

class Board extends Component {
  constructor(props){
    super(props);
    this.mapSpacesToTable.bind(this);
    this.onSpaceClick = this.onSpaceClick.bind(this);
    let idGenerator = 0;
    let size = props.size;
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
          store.subscribe(() => {
            let prevState = store.getState();

            // alter state based on bomb click event?

            let newState = prevState; // Yes I know this is pointless, placeholder

            return newState;
          });
          let id = idGenerator++;
          spaces[i][j] = <BombSpace
            key = {id}
            id = {i * size + j}
            boardSize = {size}
            bombsTouching = {0}
            onSpaceClick = { this.onSpaceClick } />
        }
      }
    }

    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        if(spaces[i][j] === false){
          let bombsTouching = this.checkForBombs(spaces, size, i, j);
          let id = idGenerator++;
          spaces[i][j] = <PortalSpace
            key = {id}
            id = {i * size + j}
            bombsTouching = {bombsTouching}
            boardSize = {size}
            onSpaceClick = { this.onSpaceClick } />
        }
      }
    }

    spaces = this.mapSpacesToTable(spaces);
    this.state = {
      spaces,
      size,
      idGenerator
    };
  }

  getNewId(){ this.setState((prevState, props) => prevState.idGenerator++); }

  mapSpacesToTable(spaces){ return spaces.map((row, i) => <tr key={i}>{row}</tr> ); }

  checkForBombs(spaces, size, i, j){
      let bombsTouching = 0;

      if(i > 0 && spaces[i-1][j]) bombsTouching++;
      if(i > 0 && j < size - 1 && spaces[i-1][j+1]) bombsTouching++;
      if(j < size - 1 && spaces[i][j+1]) bombsTouching++;
      if(i < size - 1 && j < size - 1 && spaces[i+1][j+1]) bombsTouching++;
      if(i < size - 1 && spaces[i+1][j]) bombsTouching++;
      if(i < size - 1 && j > 0 && spaces[i+1][j-1]) bombsTouching++;
      if(j > 0 && spaces[i][j-1]) bombsTouching++;
      if(i > 0 && j > 0 && spaces[i-1][j-1]) bombsTouching++;

      return bombsTouching;
  }

  onSpaceClick(){

  }

  propogateZeros(spaceId){
    let size = this.state.size;
    let spaces = _.clone(this.state.spaces);
    let startRow = parseInt(spaceId / size, 10);
    let startColumn = spaceId % size;
    for(let i = startRow + 1; i < size; i++){
      if(spaces[i][startColumn].props.bombsTouching === 0){
        let id = this.getNewId();
        spaces[i][startColumn] = <PortalSpace
          key = {id}
          id = {i * size + startColumn}
          bombsTouching = {0}
          boardSize = {size}
          onSpaceClick = { this.onSpaceClick } />
      }
      else break;
    }

    this.setState({ spaces: this.mapSpacesToTable(spaces) });
  }

  render () {
    return (
      <div className='Board'>
        <table>
          <tbody>
            {this.state.spaces}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;

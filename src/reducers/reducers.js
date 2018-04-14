import React from'react';
import {
  SET_SPACE_STATE,
  SET_BOARD_SIZE,
  GENERATE_BOARD,
  START_TIMER,
  TIMER_TICK,
  STOP_TIMER,
  SEND_SCORE_TO_DB,
  SpaceStates } from '../actions/actions';
import Space from '../containers/Space';
import * as firebase from 'firebase';

/*
  If a space isn't touching any bombs then all spaces it can "reach" which aren't
  touching bombs are also uncovered
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
      if((spaces[tempY][tempX].props.adjacentBombs === 0
        && !spaces[tempY][tempX].props.hasBomb
        && spaces[tempY][tempX].props.spaceState !== SpaceStates.IS_UNCOVERED)){


        spaces[tempY][tempX] = <Space
          id={spaces[tempY][tempX].props.id}
          key={state.idGenerator++}
          adjacentBombs={spaces[tempY][tempX].props.adjacentBombs}
          hasBomb={spaces[tempY][tempX].props.hasBomb}
          boardSize={spaces[tempY][tempX].props.boardSize}
          spaceState={SpaceStates.IS_UNCOVERED} />

        spacesToCheckFromAgain.push(spaces[tempY][tempX]);

        tempY += dir[0];
        tempX += dir[1];
        continue;
      }
      else if(spaces[tempY][tempX].props.adjacentBombs !== 0
        && !spaces[tempY][tempX].props.hasBomb
        && spaces[tempY][tempX].props.spaceState !== SpaceStates.IS_UNCOVERED){
          spaces[tempY][tempX] = <Space
            id={spaces[tempY][tempX].props.id}
            key={state.idGenerator++}
            adjacentBombs={spaces[tempY][tempX].props.adjacentBombs}
            hasBomb={spaces[tempY][tempX].props.hasBomb}
            boardSize={spaces[tempY][tempX].props.boardSize}
            spaceState={SpaceStates.IS_UNCOVERED} />
        }
      break;
    }
  });

  spacesToCheckFromAgain.forEach((space) => propogateZeros(space.props.id, size, spaces, state));

  return spaces;
}

/*
  Checks 8 spaces immediately around given space and returns number of those
  spaces which contain bombs
*/
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

/*
  Generates board by randomly placing an amount of bombs approximate to the probability
  of a bomb given board size. Remaining spaces are filled in with covered spaces
*/
function generateBoard(state, id, size){
  let lim;
  switch(size){
    case 4:
      lim = .15;
      break;
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

  let spaces = [...state.spaces];
  let x = id % size;
  let y = parseInt(id / size, 10);

  let bombsPlaced = 0;
  for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
      if(Math.random() < lim && (i !== y || j !== x)){
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
      let adjacentBombs = checkForBombs(spaces, size, i, j);
      if(i === y && j === x){
        spaces[i][j] = <Space
          id={spaces[i][j].props.id}
          key={state.idGenerator++}
          adjacentBombs={adjacentBombs}
          hasBomb={false}
          boardSize={size}
          spaceState={SpaceStates.IS_UNCOVERED} />
      }
      else if(!spaces[i][j].props.hasBomb){
        spaces[i][j] = <Space
          id={spaces[i][j].props.id}
          key={state.idGenerator++}
          adjacentBombs={adjacentBombs}
          hasBomb={false}
          boardSize={size}
          spaceState={SpaceStates.IS_COVERED} />
      }
    }
  }

  if(spaces[y][x].props.adjacentBombs === 0)
    spaces = propogateZeros(id, size, spaces, state);

  return [spaces, bombsPlaced];
}

function board(state = { idGenerator: 0 }, action){
  switch(action.type){
    case SET_SPACE_STATE:
      let x = action.id % action.size;
      let y = parseInt(action.id / action.size, 10);
      let spaces = [...state.spaces];

      if(action.spaceState === SpaceStates.IS_FLAGGED && spaces[y][x].props.hasBomb){
        state.bombsRemaining--;
      }
      if(spaces[y][x].props.spaceState === SpaceStates.IS_FLAGGED && spaces[y][x].props.hasBomb){
        state.bombsRemaining++;
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
      spaces = Array(action.boardSize).fill(0).map(row => new Array(action.boardSize).fill(false));
      for(let i = 0; i < action.boardSize; i++){
        for(let j = 0; j < action.boardSize; j++){
        spaces[i][j] = <Space
          id={i * action.boardSize + j}
          key={state.idGenerator++}
          adjacentBombs={-1}
          hasBomb={false}
          boardSize={action.boardSize}
          spaceState={SpaceStates.IS_COVERED} />
        }
      }
      return Object.assign({}, state, {spaces: spaces});
    case GENERATE_BOARD:
      let boardInfo = generateBoard(state, action.id, action.boardSize);
      return Object.assign({}, state, {spaces: boardInfo[0], bombsRemaining: boardInfo[1]});
    case START_TIMER:
      return Object.assign({}, state, {timer: action.timer, interval: action.interval});
    case TIMER_TICK:
      let timer = state.timer;
      timer++;
      return Object.assign({}, state, {timer: timer});
    case STOP_TIMER:
      clearInterval(state.interval);
      return state;
    case SEND_SCORE_TO_DB:
      firebase.firestore().collection('scores').add({
        name: action.name,
        score: action.score,
        country: action.country,
      })
      .then((docRef) => {
        console.log('Score added with id ' + docRef.id)
      })
      .catch((error) => {
        console.log('Error with adding score: ' + error);
      });
      return state;
    default:
      return state;
  }
}

export default board;

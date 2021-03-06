import { push } from 'react-router-redux';

export const SET_SPACE_STATE = 'SET_SPACE_STATE';
export const SET_BOARD_SIZE = 'SET_BOARD_SIZE';
export const GENERATE_BOARD = 'GENERATE_BOARD';
export const START_TIMER = 'START_TIMER';
export const TIMER_TICK = 'TIMER_TICK';
export const STOP_TIMER = 'STOP_TIMER';
export const SEND_SCORE_TO_DB = 'SEND_SCORE_TO_DB';

export const SpaceStates = {
  IS_COVERED: 'IS_COVERED',
  IS_FLAGGED: 'IS_FLAGGED',
  IS_UNCOVERED: 'IS_UNCOVERED',
}

export function setSpaceState(id, size, spaceState){
  return {
    type: SET_SPACE_STATE,
    id,
    size,
    spaceState };
}

export function setBoardSize(boardSize){
  return {
    type: SET_BOARD_SIZE,
    boardSize,
  };
}

export function generateBoard(id, boardSize){
  return {
    type: GENERATE_BOARD,
    id,
    boardSize
  }
}

export function checkIfWon(){
  return (dispatch, getState) => {
    const { bombsRemaining } = getState();
    if(bombsRemaining === 0){
      dispatch(push('/end/win'));
      dispatch(stopTimer());
    }
  }
}

export function startTimer(){
  return (dispatch, getState) => {
    const interval = setInterval(() => {
      dispatch({ type: TIMER_TICK, });
    }, 1000);

    dispatch({
      type: START_TIMER,
      timer: 0,
      interval
    });
  }
}

export function stopTimer(){
  return {
    type: STOP_TIMER
  }
}

export function sendScoreToDB(name, score, country){
  return {
    type: SEND_SCORE_TO_DB,
    name,
    score,
    country
  }
}

export default {
  SET_SPACE_STATE,
  SET_BOARD_SIZE,
  GENERATE_BOARD,
  START_TIMER,
  TIMER_TICK,
  STOP_TIMER,
  SEND_SCORE_TO_DB,
  SpaceStates,
  setSpaceState,
  setBoardSize,
  generateBoard,
  checkIfWon,
  startTimer,
  stopTimer,
  sendScoreToDB,
}

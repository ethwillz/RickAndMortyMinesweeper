export const SET_SPACE_STATE = 'SET_SPACE_STATE';
export const SET_BOARD_SIZE = 'SET_BOARD_SIZE';

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

export default {
  SET_SPACE_STATE,
  SET_BOARD_SIZE,
  SpaceStates,
  setSpaceState,
  setBoardSize
}

export const SET_SPACE_STATE = 'SET_SPACE_STATE';

export const SpaceStates = {
  IS_NORMAL: 'IS_NORMAL',
  IS_FLAGGED: 'IS_FLAGGED',
  IS_NUMBER: 'IS_NUMBER',
  IS_BOMB: 'IS_BOMB',
}

export function setSpaceState(id, spaceState){
  return {
    type: SET_SPACE_STATE,
    id,
    spaceState };
}

export default {
  SET_SPACE_STATE,
  SpaceStates,
  setSpaceState
}

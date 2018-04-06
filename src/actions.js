export const CLICK_BOMB = 'CLICK_BOMB';
export const CLICK_ZERO = 'CLICK_ZERO';
export const CLICK_NUM = 'CLICK_NUM';

export function clickBomb(img){
  return { type: CLICK_BOMB, img };
}

export function clickZero(){
  return {type: CLICK_ZERO };
}

export function clickNum(){
  return { type: CLICK_NUM };
}

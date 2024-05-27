import { useReducer } from 'react';

import { ProfileModel } from '../models/model';

// type
export const MOVE_UP_BLOCKY = 'Move Up Blocky';
export const MOVE_DOWN_BLOCKY = 'Move Down Blocky';
export const SET_COMMON_COLOR = 'Set Common Color';
export const HIDE_BLOCKY = 'Hide Blocky';

/**
 * Move up blocky.
 */
const moveUpBlocky = (state, keyType: string | number) => {
  const stateClone = { ...state };
  let blockyOrder = stateClone.blocky_order;
  const oldIndex = blockyOrder.findIndex((item) => item === keyType);
  if (oldIndex > 0) {
    blockyOrder = moveItem(blockyOrder, oldIndex, oldIndex - 1);
    stateClone.blocky_order = blockyOrder;

    return stateClone;
  }

  return state;
};

/**
 * Move down blocky.
 */
const moveDownBlocky = (state, keyType) => {
  const stateClone = { ...state };
  let blockyOrder = stateClone.blocky_order;
  const oldIndex = blockyOrder.findIndex((item) => item === keyType);
  if (oldIndex < blockyOrder.length) {
    blockyOrder = moveItem(blockyOrder, oldIndex, oldIndex + 1);
    stateClone.blocky_order = blockyOrder;

    return stateClone;
  }

  return state;
};

/**
 * Hide blocky.
 */
const hideBlocky = (state, keyType) => {
  const stateClone = { ...state };
  const blockyOrder = stateClone.blocky_order;
  const oldIndex = blockyOrder.findIndex((item) => item === keyType);

  if (blockyOrder.length > 1) {
    blockyOrder.splice(oldIndex, 1);
    stateClone.blocky_order = blockyOrder;

    return stateClone;
  }

  return state;
};

/**
 * set common color page.
 */
const setCommonColor = (state, color: string) => {
  if (color === state.common_color) {
    return state;
  }

  const stateClone = { ...state };
  stateClone.common_color = color;

  return stateClone;
};

/**
 * Helper move item in array.
 */
const moveItem = (arr: any[], fromIndex: number, toIndex: number) => {
  const newArr = [...arr];
  const element = arr[fromIndex];
  newArr.splice(fromIndex, 1);
  newArr.splice(toIndex, 0, element);

  return newArr;
};

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case MOVE_UP_BLOCKY:
      return moveUpBlocky(state, action.keyType);

    case MOVE_DOWN_BLOCKY:
      return moveDownBlocky(state, action.keyType);

    case SET_COMMON_COLOR:
      return setCommonColor(state, action.color);

    case HIDE_BLOCKY:
      return hideBlocky(state, action.keyType);

    default:
      return action.payload;
  }
};

export const usePageBuilders = () => {
  const [state, dispatch] = useReducer(reducer, new ProfileModel().builders);

  // return hook
  return [state, dispatch];
};

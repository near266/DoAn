import { useReducer, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { has, isEmpty } from 'lodash-es';

import { ICvProfile } from '@/interfaces';
import { ProfileModel } from '../models/model';
import { BLOCKY_KEYS_MAP } from '@/shared/enums';
import { IRootState } from '@/store';

// Type
export const HANDLE_INPUT_CHANGE = 'Handle Input Change';
export const CLONE_FIELD = 'Clone Field';
export const REMOVE_FIELD = 'Remove Field';
export const REMOVE_REFER_KEYS_FROM_BLOCKY = 'Remove Refer Keys From Blocky';
export const SET_VALUE_BY_KEY = 'Set Value By Key';

/**
 * Event update data in form.
 */
const handleInputChange = (
  state: ICvProfile,
  inputType = 'text',
  name: string,
  evt: ChangeEvent<HTMLInputElement>
) => {
  let value = '';

  const splitName = name.split('.');
  const nameLength = splitName.length;

  switch (inputType) {
    case 'textarea':
      value = evt.target.value;
      break;
    case 'text':
      value = evt.currentTarget.innerText;
      break;
    case 'rawInput':
      value = evt.target.value;
      break;
    default:
      value = evt.target.value;
  }

  // update state by name of input
  const stateClone = { ...state };

  // case input name like a.b.c
  if (nameLength > 1) {
    let itemUpdate = stateClone;
    for (let i = 0; i < nameLength - 1; i++) {
      if (has(itemUpdate, splitName[i])) {
        itemUpdate = itemUpdate[splitName[i]];
      }
    }

    itemUpdate[splitName[nameLength - 1]] = value;
  } else {
    stateClone[name] = value;
  }

  return stateClone;
};

/**
 * Clone field.
 */
const cloneField = (
  state: ICvProfile,
  objectKey: string | number,
  fieldIndex: number
) => {
  const stateClone = { ...state };
  const cloneData = { ...stateClone[objectKey][fieldIndex] };
  stateClone[objectKey].splice(fieldIndex + 1, 0, cloneData);

  return stateClone;
};

/**
 * Remove field.
 */
const removeField = (
  state: ICvProfile,
  objectKey: string | number,
  fieldIndex: number
) => {
  const stateClone = { ...state };
  if (stateClone[objectKey].length > 1) {
    stateClone[objectKey].splice(fieldIndex, 1);

    return stateClone;
  }

  return state;
};

/**
 * Remove a key in profile data.
 */
const removeReferKeysFromBlocky = (state: ICvProfile, keyType: string) => {
  const stateClone = { ...state };
  const keysRefer = BLOCKY_KEYS_MAP[keyType];
  keysRefer.forEach((item) => {
    delete stateClone[item];
  });

  return stateClone;
};

/**
 * set a key in profile data.
 */
const setValueByKey = (state: ICvProfile, key: string, value: any) => {
  const stateClone = { ...state };
  stateClone[key] = value;

  return stateClone;
};

// reducer
const reducer = (state: ICvProfile, action) => {
  switch (action.type) {
    case HANDLE_INPUT_CHANGE:
      return handleInputChange(state, action.inputType, action.name, action.evt);

    case CLONE_FIELD:
      return cloneField(state, action.objectKey, action.fieldIndex);

    case REMOVE_FIELD:
      return removeField(state, action.objectKey, action.fieldIndex);

    case REMOVE_REFER_KEYS_FROM_BLOCKY:
      return removeReferKeysFromBlocky(state, action.keyType);

    case SET_VALUE_BY_KEY:
      return setValueByKey(state, action.key, action.value);

    default:
      return action.payload;
  }
};

export const useProfileData = () => {
  const me = useSelector((state: IRootState) => state.auth.me);
  const [state, dispatch] = useReducer(reducer, new ProfileModel());

  useEffect(() => {
    if (!isEmpty(me)) {
      const profileDefault = new ProfileModel();
      profileDefault.initDefault(me);

      dispatch({ payload: profileDefault });
    }
  }, [me]);

  // return hook
  return [state, dispatch];
};

import { Char } from '../models/char';
import { FORM } from '../actions/char';

export interface State {
  form: Char;
}

export const initialState: State = {
  form: {
    name: null,
    sex: null,
    race: null,
    alignment: null,

    abilities: {
      str: 18,
      int: 18,
      wis: 18,
      dex: 18,
      con: 18,
      cha: 18
    }
  }
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case FORM.UPDATE: {
      return {
        ...state,
        form: action.payload.formValue
      };
    }
    default: {
      return state;
    }
  }
}

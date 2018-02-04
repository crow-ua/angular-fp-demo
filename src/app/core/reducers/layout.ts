import { Action } from '@ngrx/store';
import { SIDENAV } from '../actions/layout';

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: false,
};

export function reducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case SIDENAV.CLOSE:
      return {
        showSidenav: false,
      };

    case SIDENAV.OPEN:
      return {
        showSidenav: true,
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;

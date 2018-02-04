import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../shared/utils';
import * as fromLayout from '../core/reducers/layout';

export interface State {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['layout', 'auth', 'char'],
    rehydrate: true
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);

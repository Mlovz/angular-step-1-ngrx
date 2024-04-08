import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { UserSchema, userReducer } from '../users/state/user.reducer';
import { isDevMode } from '@angular/core';
import { USER_KEY } from '../users/state/user.reducer';
import {
  GLOBAL_FEATURE_KEY,
  GlobalSchema,
  globalReducer,
} from './global.reducer';

export interface StateSchema {
  [USER_KEY]: UserSchema;
  [GLOBAL_FEATURE_KEY]: GlobalSchema;
}

export const reducers: ActionReducerMap<StateSchema> = {
  [USER_KEY]: userReducer,
  [GLOBAL_FEATURE_KEY]: globalReducer,
};

export const metaReducers: MetaReducer<StateSchema>[] = isDevMode() ? [] : [];
